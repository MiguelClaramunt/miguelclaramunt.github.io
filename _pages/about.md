---
permalink: /about
title: "About me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% assign count = 0 %}
{% for file in site.static_files %}
  {% if file.path contains 'assets/images/avatars/avatarimage_' %}
    {% assign count = count | plus: 1 %}
  {% endif %}
{% endfor %}

<figure style="float: right;" class="align-right">
  <img id="randomImage" src=""/>
  <figcaption style="text-align: center;">
    <a href="https://www.sulake.com/">© Sulake</a>
  </figcaption>
</figure>

<script>
  const randNum = Math.floor(Math.random() * {{ count }});
  document.getElementById('randomImage').src = 'assets/images/avatars/avatarimage_' + randNum + '.png';
</script>

Hello! I am Miguel Claramunt (he/him).

I am a [Research Engineer](https://www.bsc.es/claramunt-argote-miguel), currently working at the Barcelona Supercomputing Center's [Language Technologies Unit](https://www.bsc.es/discover-bsc/organisation/research-departments/language-technologies-unit).

I am pursuing a Master's degree in [Intelligent Interactive Systems](https://www.upf.edu/web/iis) at Universitat Pompeu Fabra. 

My primary areas of interest are Natural Language Processing and Algorithmic Fairness. During my undergraduate studies, I conducted research on fake news detection using large language models.