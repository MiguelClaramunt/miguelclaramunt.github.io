// General-purpose Audio (base64/data:) loader/player
// Scans the document for elements with `data-audio-src` and attaches a playable
// behavior. Supports plain base64 text files or full data:audio/...;base64,... URLs.
// Adds `playing` and `error` classes to the element to integrate with existing
// styles (e.g. `_sass/_pronunciation.scss`).

(function (window, document) {
  "use strict";

  function ready(fn) {
    if (document.readyState !== "loading") return fn();
    document.addEventListener("DOMContentLoaded", fn);
  }

  function fetchText(url) {
    return fetch(url, { cache: "no-cache" }).then(function (res) {
      if (!res.ok) throw new Error("Fetch failed: " + res.status);
      return res.text();
    });
  }

  function b64ToUint8Array(b64) {
    var clean = (b64 || "").replace(/\s+/g, "");
    var bin = atob(clean);
    var len = bin.length;
    var arr = new Uint8Array(len);
    for (var i = 0; i < len; i++) arr[i] = bin.charCodeAt(i);
    return arr;
  }

  function detectMimeFromBytes(bytes) {
    try {
      if (!bytes || bytes.length < 4) return "audio/mpeg";
      var s0 = String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3]);
      if (s0 === "RIFF") return "audio/wav";
      if (s0 === "OggS") return "audio/ogg";
      // ID3
      if (String.fromCharCode(bytes[0], bytes[1], bytes[2]) === "ID3") return "audio/mpeg";
      if (bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0) return "audio/mpeg";
    } catch (e) {}
    return "audio/mpeg";
  }

  function setState(el, state, on) {
    if (on) el.classList.add(state);
    else el.classList.remove(state);
  }

  function attachToElement(el) {
    if (el.__audioBase64Attached) return; // idempotent
    el.__audioBase64Attached = true;

    var url = el.getAttribute("data-audio-src");
    if (!url) return;

    // mode: "auto" (default) will prefer data: URL if present, otherwise create a blob objectURL
    // 'force-data' will always create a data: URL (may be memory heavy)
    // 'force-blob' will always create a Blob and objectURL
    var mode = el.getAttribute("data-audio-mode") || "auto";
    var overrideMime = el.getAttribute("data-audio-mime") || null;

    var audioSrc = null; // string src usable by Audio or <audio>
    var objectUrl = null; // if we created one, store here to revoke later
    var loaded = false;

    // create a hidden <audio> element for blob/objectURL playback when needed
    var audioEl = document.createElement("audio");
    audioEl.preload = "auto";
    audioEl.style.display = "none";
    document.body.appendChild(audioEl);

    function cleanupObjectUrl() {
      if (objectUrl) {
        try {
          URL.revokeObjectURL(objectUrl);
        } catch (e) {}
        objectUrl = null;
      }
    }

    function setPlayingFlag(on) {
      setState(el, "playing", on);
    }
    function setErrorFlag(on) {
      setState(el, "error", on);
    }

    // attempt to load audio early so clicks play instantly
    fetchText(url)
      .then(function (text) {
        var t = (text || "").trim();
        if (!t) throw new Error("Empty audio file");

        // If the fetched text is already a data: URL, use it directly
        if (/^data:audio\/.+;base64,/.test(t) && mode !== "force-blob") {
          audioSrc = t;
          loaded = true;
          return;
        }

        // otherwise `t` is expected to be raw base64 bytes
        var bytes = b64ToUint8Array(t);
        var mime = overrideMime || detectMimeFromBytes(bytes) || "audio/mpeg";

        if (mode === "force-data") {
          // build a data: URL (may be large)
          audioSrc = "data:" + mime + ";base64," + (t || "");
          loaded = true;
          return;
        }

        // default: create a Blob and object URL
        var blob = new Blob([bytes], { type: mime });
        objectUrl = URL.createObjectURL(blob);
        audioSrc = objectUrl;
        loaded = true;
      })
      .catch(function (err) {
        console.warn("AudioBase64 failed to load", url, err);
        setErrorFlag(true);
        setTimeout(function () {
          setErrorFlag(false);
        }, 1000);
      });

    function play() {
      try {
        if (!loaded || !audioSrc) {
          // not yet loaded - visual feedback
          setErrorFlag(true);
          setTimeout(function () {
            setErrorFlag(false);
          }, 700);
          return;
        }

        // if audioSrc is a data: url, we can use new Audio(audioSrc)
        // otherwise use audioEl with object URL
        var player;
        if (audioSrc.indexOf("data:") === 0) {
          player = new Audio(audioSrc);
        } else {
          // reuse the hidden audio element with object URL
          cleanupObjectUrl();
          // If objectUrl was revoked, recreate from the original source if possible (not available here).
          // We assume objectUrl still valid and stored in audioSrc.
          audioEl.src = audioSrc;
          player = audioEl;
        }

        setPlayingFlag(true);

        var playPromise = player.play();
        if (playPromise && typeof playPromise.then === "function") {
          playPromise.catch(function (error) {
            console.warn("Playback failed", error);
            setPlayingFlag(false);
            setErrorFlag(true);
            setTimeout(function () {
              setErrorFlag(false);
            }, 1000);
          });
        }

        // when using new Audio(), we need to attach ended/error handlers
        if (player !== audioEl) {
          player.addEventListener("ended", function () {
            setPlayingFlag(false);
          });
          player.addEventListener("error", function () {
            setPlayingFlag(false);
            setErrorFlag(true);
            setTimeout(function () {
              setErrorFlag(false);
            }, 1000);
          });
        } else {
          // audioEl will fire events itself
          audioEl.onended = function () {
            setPlayingFlag(false);
          };
          audioEl.onerror = function () {
            setPlayingFlag(false);
            setErrorFlag(true);
            setTimeout(function () {
              setErrorFlag(false);
            }, 1000);
          };
        }
      } catch (e) {
        console.error("AudioBase64 play error", e);
      }
    }

    // keyboard activation
    el.addEventListener("click", function () {
      play();
    });
    el.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        play();
      }
    });

    // expose some controls for programmatic usage
    el.__audioBase64 = {
      play: play,
      unload: function () {
        cleanupObjectUrl();
        try {
          if (audioEl && audioEl.parentNode) audioEl.parentNode.removeChild(audioEl);
        } catch (e) {}
      },
    };
  }

  ready(function () {
    var nodes = document.querySelectorAll("[data-audio-src]");
    for (var i = 0; i < nodes.length; i++) attachToElement(nodes[i]);
  });

  // Lightweight global API
  window.AudioBase64 = {
    attach: attachToElement,
  };
})(window, document);
