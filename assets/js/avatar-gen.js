/* Avatar generator module: encapsulates data and behaviour so we can reuse
   the same logic for the demo grid and the single footer avatar.
   This file is intended to live at /assets/js/avatar-gen.js and be included
   from templates (the footer include loads it so the footer avatar appears
   across the site). */
(function () {
  'use strict';

  // Resource hints: add dns-prefetch / preconnect for habbo early so the
  // browser can start DNS/TCP/TLS work before the image request is issued.
  // This runs as soon as the script is parsed (if the script is in head)
  // or when the script file is executed.
  (function addHabboHints() {
    try {
      const host = 'https://www.habbo.com';
      const head = document && document.head;
      if (!head) return;
      // dns-prefetch
      if (!head.querySelector(`link[rel="dns-prefetch"][href="${host}"]`)) {
        const lp = document.createElement('link');
        lp.rel = 'dns-prefetch';
        lp.href = host;
        head.appendChild(lp);
      }
      // preconnect (with crossorigin) — helps reduce TLS/TCP setup time
      if (!head.querySelector(`link[rel="preconnect"][href="${host}"]`)) {
        const pc = document.createElement('link');
        pc.rel = 'preconnect';
        pc.href = host;
        pc.crossOrigin = '';
        head.appendChild(pc);
      }
    } catch (e) {
      // defensive — ignore if document isn't available or DOM operations fail
    }
  })();

  const AvatarGen = {
    // Simple in-memory cache for preloaded Image objects keyed by URL.
    _imageCache: {},

    // Preload an image and cache the Image object. Returns a Promise that
    // resolves with the Image. Multiple calls for the same URL share the
    // same Promise / Image.
    preloadImage(url) {
      if (!url) return Promise.reject(new Error('no url'));
      const existing = this._imageCache[url];
      if (existing) return existing.promise;
      const img = new Image();
      const promise = new Promise((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
      });
      // Kick off load
      img.src = url;
      this._imageCache[url] = { img, promise };
      return promise;
    },

    // Return cached Image object for a URL if available (may not be loaded yet)
    getCachedImage(url) {
      const entry = this._imageCache[url];
      return entry ? entry.img : null;
    },
    BASE_PARTS: "hr-3322-37-61.hd-185-1-61.lg-270-82-61.ea-3727-1327-1327",
    GENDER: "M",
    PRINTS: [
      { name: "duck", code: "cp-3312-61-61" },
      { name: "cherry", code: "cp-3402-96-1414" },
      { name: "habbo_script", code: "cp-3204-84-1414" },
      { name: "smiley", code: "cp-3310-1321-70" },
    ],
    PRINT_PROBABILITY: 0.5,
    SHIRTS: [
      { name: "black_tshirt", fig: "ch-215-64-61", printable: true },
      { name: "brown_tshirt", fig: "ch-215-90-100", printable: true },
      { name: "white_tshirt", fig: "ch-215-1408-100", printable: true },
      { name: "mustard_tshirt", fig: "ch-215-66-100", printable: true },
      { name: "forest_green_tshirt", fig: "ch-215-85-73", printable: true },
      { name: "light_blue_shirt", fig: "ch-225-77-61", printable: false },
      { name: "red_striped_sweater", fig: "ch-3001-100-73", printable: false },
      { name: "black_windowpane_shirt", fig: "ch-3792-64-92", printable: false },
      { name: "brown_tshirt_logo", fig: "ch-4219-91-100", printable: false },
      { name: "blue_sweater_tie", fig: "ch-3077-73-1425", printable: false },
    ],
    PANTS: [
      { name: "blue_jeans", fig: "lg-285-82-61" },
      { name: "beige_jeans", fig: "lg-285-1320-61" },
      { name: "black_jeans", fig: "lg-285-64-61" },
      { name: "olive_jeans", fig: "lg-285-88-1408" },
      { name: "brown_jeans", fig: "lg-285-91-1408" },
    ],
    SHOES: [
      { name: "duck_flippers", fig: "sh-3275-92-61" },
      { name: "white_sneakers", fig: "sh-290-92-61" },
      { name: "black_adidas", fig: "sh-906-1408-61" },
      { name: "bunny_flippers", fig: "sh-905-92-91" },
      { name: "blue_sneakers", fig: "sh-305-82-91" },
    ],
    COATS: [],
    CHRISTMAS_HAT: { name: "christmas_hat", fig: "ha-1006-61-61" },
    EASTER_HAT: { name: "bunny_hat", fig: "ha-1008-61-61" },
    ACCESSORIES: [
      { name: "none", fig: "" },
      { name: "glasses", fig: "lg-270-82-61" },
    ],
    ACTIONS: ["wav", ""],
    GESTURES: ["nrm"],
    OBJECTS: [
      { name: "coffee", action: "crr=6" },
      { name: "ice_cream", action: "crr=3" },
      { name: "water", action: "crr=1" },
      { name: "soda", action: "crr=44" },
    ],

    rand(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    buildFigure({ shirt, shirtPrint, pants, shoes, accessory, coat, hat }) {
      const parts = [this.BASE_PARTS];
      if (shirt) parts.push(shirt);
      if (coat) parts.push(coat);
      if (pants) parts.push(pants);
      if (shoes) parts.push(shoes);
      if (accessory) parts.push(accessory);
      if (shirtPrint) parts.push(shirtPrint);
      if (hat) parts.push(hat);
      return parts.filter(Boolean).join(".");
    },

    buildUrl(figure, action, gesture, head_direction = "3", size = "l") {
      const base = "https://www.habbo.com/habbo-imaging/avatarimage";
      const params = {
        figure,
        gender: this.GENDER,
        direction: "2",
        head_direction: head_direction,
        gesture: gesture,
        size: size,
      };
      const q = new URLSearchParams(params);
      if (typeof action !== "undefined") q.append("action", action);
      let qs = q.toString();
      if (action && action.includes("=")) {
        qs = qs.replace(encodeURIComponent(action), action);
      }
      return `${base}?${qs}`;
    },

    renderAvatarCard(container, figureOrUrl, action, gesture, headDir, holding) {
      const img = document.createElement("img");
      img.className = "avatar-img";
      img.alt = "Habbo avatar";
      // Encourage immediate download / decoding and reduce perceived latency
      img.loading = 'eager';
      img.decoding = 'async';

      if (typeof figureOrUrl === "string" && figureOrUrl.startsWith("http")) {
        img.src = figureOrUrl;
        container.appendChild(img);
        return img;
      }

      const figure = figureOrUrl;
  const initialHead = "2";

  // Request only the large image (size=l) and prioritize it so it loads
  // with high priority even when other resources are being fetched.
  const initialUrl = this.buildUrl(figure, action, gesture, initialHead, "l");

  // Create a preload hint to raise the image's network priority where
  // supported. Avoid duplicating preload links for the same href.
  try {
    const existing = Array.from(document.head.querySelectorAll('link[rel="preload"][as="image"]')).find(l => l.href === initialUrl);
    if (!existing) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = initialUrl;
      document.head.appendChild(link);
    }
  } catch (e) {
    // Defensive: if document/head isn't available or DOM throws, ignore.
  }

  // Set the image src to the large image directly and signal high priority
  // where possible. Keep decoding async so painting can happen as soon as
  // pixels arrive.
  img.setAttribute('fetchpriority', 'high');
  try { img.fetchPriority = 'high'; } catch (e) { /* ignore if not supported */ }
  img.src = initialUrl;

  const smileUrl = this.buildUrl(figure, action, "sml", "3", "l");
  const revertUrl = this.buildUrl(figure, action, gesture, "2", "l");

      let holdAction = "drk=44";
      if (typeof action === "string" && action.startsWith("crr=")) {
        holdAction = action.replace(/^crr=/, "drk=");
      }
  const holdPreviewUrl = this.buildUrl(figure, holdAction, "nrm", "2", "l");
  const originalHoldingUrl = this.buildUrl(figure, action, "nrm", "2", "l");

      // Do not preload interaction images now to avoid competing with the
      // main prioritized avatar request. We will fetch them after the avatar
      // has painted to keep the network focus on LCP.

      // When the avatar has loaded, warm up the interaction images so that
      // interactions are snappy without competing for bandwidth during LCP.
      img.addEventListener('load', () => {
        // Wait until the whole page has finished loading before preloading
        // interaction images so they don't compete with critical page
        // resources. If the page is already complete, start immediately.
        const startPreloads = () => {
          try {
            [smileUrl, revertUrl, holdPreviewUrl, originalHoldingUrl].forEach((u) => {
              if (!u) return;
              this.preloadImage(u).catch(() => {/* ignore preload failures */});
            });
          } catch (e) {
            // ignore
          }
        };

        if (document.readyState === 'complete') {
          startPreloads();
        } else {
          window.addEventListener('load', startPreloads, { once: true });
        }
      }, { once: true });

      img.style.cursor = "pointer";
      img.addEventListener("click", () => {
        // On click, prefer using cached preloaded Image objects so the
        // browser can swap instantly without refetching. If the cached image
        // isn't available yet, fall back to setting the URL directly and
        // start preloading it for subsequent clicks.
        if (holding) {
          const cached = this.getCachedImage(holdPreviewUrl);
          if (cached && cached.complete) {
            img.src = cached.src;
          } else {
            img.src = holdPreviewUrl;
            this.preloadImage(originalHoldingUrl).catch(() => {});
          }
          setTimeout(() => {
            const cachedOrig = this.getCachedImage(originalHoldingUrl);
            img.src = (cachedOrig && cachedOrig.complete) ? cachedOrig.src : originalHoldingUrl;
          }, 1000);
          return;
        }

        const cachedSmile = this.getCachedImage(smileUrl);
        if (cachedSmile && cachedSmile.complete) {
          img.src = cachedSmile.src;
        } else {
          img.src = smileUrl;
          // preload revert in background for next swap
          this.preloadImage(revertUrl).catch(() => {});
        }

        setTimeout(() => {
          const cachedRevert = this.getCachedImage(revertUrl);
          img.src = (cachedRevert && cachedRevert.complete) ? cachedRevert.src : revertUrl;
        }, 1000);
      });

      container.appendChild(img);
      return img;
    },

    buildRandomAvatar() {
      const shirtObj = this.rand(this.SHIRTS);
      const pantsObj = this.rand(this.PANTS);
      const shoesObj = this.rand(this.SHOES);
      const coatObj = Math.random() < 0.25 ? this.rand(this.COATS) : null;
      const acc = "";
      const maybeObject = Math.random() < 0.18 ? this.rand(this.OBJECTS) : null;
      const month = new Date().getMonth();
      let hatObj = null;
      if (month === 11 && Math.random() < 0.25) hatObj = this.CHRISTMAS_HAT;
      else if (month === 3 && Math.random() < 0.18) hatObj = this.EASTER_HAT;
      const action = maybeObject ? maybeObject.action : this.rand(this.ACTIONS);
      const gesture = maybeObject ? "nrm" : this.rand(this.GESTURES);
      const headDir = maybeObject ? "2" : "3";

      let chosenPrint;
      if (shirtObj.printable && Math.random() < this.PRINT_PROBABILITY) {
        const p = this.rand(this.PRINTS);
        chosenPrint = p.code;
      }

      const figure = this.buildFigure({
        shirt: shirtObj.fig,
        shirtPrint: chosenPrint,
        coat: coatObj ? coatObj.fig : undefined,
        pants: pantsObj.fig,
        shoes: shoesObj.fig,
        accessory: acc,
        hat: hatObj ? hatObj.fig : undefined,
      });

      return { figure, action, gesture, headDir, holding: !!maybeObject };
    },

    generateOneInto(containerOrSelector) {
      const container = (typeof containerOrSelector === "string")
        ? document.querySelector(containerOrSelector)
        : containerOrSelector;
      if (!container) return;
      container.innerHTML = "";
      const data = this.buildRandomAvatar();
      this.renderAvatarCard(container, data.figure, data.action, data.gesture, data.headDir, data.holding);
    },

    showExamples() {
      const container = document.getElementById("avatars");
      if (!container) return;
      container.innerHTML = "";
      if (typeof EXAMPLES === "undefined") return;
      EXAMPLES.forEach((url) => this.renderAvatarCard(container, url));
    },
  };

  // Expose API for debugging
  window.AvatarGen = AvatarGen;

  // Initialize when DOM is ready (works whether script is included in head or footer)
  function init() {
    // Wire up demo UI if present
    const genBtn = document.getElementById('gen');
    if (genBtn) {
      document.getElementById('gen').addEventListener('click', () => {
        const n = parseInt(document.getElementById('count').value, 10) || 6;
        AvatarGen.generate(n);
      });
    }
    const exBtn = document.getElementById('examples');
    if (exBtn) {
      exBtn.addEventListener('click', () => AvatarGen.showExamples());
    }

    // render footer avatar if container exists
    const footerContainer = document.getElementById('avatar-footer');
    if (footerContainer) {
      AvatarGen.generateOneInto(footerContainer);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM already ready
    init();
  }

})();
