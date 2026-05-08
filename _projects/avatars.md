---
regenerate: true
layout: page
title: Vectorizing Barcelona Metro Tickets
description: "From low-res image to physical bookmark: vectorizing Barcelona's forgotten transit history"
img: assets/img/projects/tmb_0.webp
importance: 1
category: personal
images:
  spotlight: true
---

This page contains a tiny, client-side avatar generator for testing Habbo avatar imaging URLs.

Usage: the script below programmatically builds Habbo figure strings from selectable parts (hair, skin, clothes, shoes, prints, etc.), assigns random actions/gestures, and renders images plus their complete imaging URLs so you can copy or inspect them.

### Demo generator

<div id="generator">
  <label
    >How many avatars to generate:
    <input id="count" type="number" value="2" min="1" max="6"
  /></label>
  <button id="gen">Generate</button>
  <button id="examples">Show provided examples</button>
  <div
    id="avatars"
    style="display: flex; flex-wrap: wrap; gap: 12px; margin-top: 12px"
  ></div>
</div>

<!-- CSS and JS moved out to project assets:
     - styles: _sass/_avatars.scss (imported from assets/css/main.scss)
     - script: assets/js/avatar-gen.js
     The footer include (`_includes/footer.liquid`) loads the JS so the footer avatar
     is available on every page; the demo page only needs the HTML controls below. -->

<!-- Include the site JS (footer include will also load this file; loading it here is harmless if not already loaded) -->
<script src="{{ '/assets/js/avatar-gen.js' | relative_url }}"></script>
