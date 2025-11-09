---
regenerate: true
layout: page
permalink: /publications-talks/
title: publications & talks
nav: true
nav_order: 2
toc:
  sidebar: right
  hide_title: true
hide_title: true
---

{% include bib_search.liquid %}

{% comment %} Capture both bibliographies first so we can decide whether to show a spacer between sections {% endcomment %}

{% capture papers_bib %}{% bibliography -f papers %}{% endcapture %}
{% assign papers_bib_str = papers_bib | strip %}

{% capture talks_bib %}{% bibliography -f talks %}{% endcapture %}
{% assign talks_bib_str = talks_bib | strip %}

{% if papers_bib_str != "" %}

<section class="bib-section" data-section="publications">
  <h1 class="section-title">publications</h1>

  <div class="publications">
    <div class="bib-entries">
      {{ papers_bib }}
    </div>
  </div>
</section>
{% endif %}

{% comment %} show spacer only if both sections have server-rendered content {% endcomment %}
{% if papers_bib_str != "" and talks_bib_str != "" %}

  <div class="bib-spacer" aria-hidden="true"></div>
{% endif %}

{% if talks_bib_str != "" %}

<section class="bib-section" data-section="talks">
  <h1 class="section-title">talks</h1>

  <div class="publications">
    <div class="bib-entries">
      {{ talks_bib }}
    </div>
  </div>
</section>
{% endif %}
