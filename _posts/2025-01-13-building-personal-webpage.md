---
regenerate: true
layout: post
title: "Building a Simple Personal Webpage with GitHub Pages and Jekyll"
date: 2025-01-13
pretty_table: true
tags: jekyll github-pages
toc:
  beginning: true
---

> **👋 (12/11/2025) Heads-Up: This Post contains some parts that are obsolete**
>
> This article is still a decent introduction to the *general* concepts of GitHub Pages and Jekyll, but my personal site has moved on:
>
> * **Theme:** I no longer use or recommend **Minimal Mistakes**. I found it limiting as I wanted to expand. My site now runs on **al-folio**, which I chose for its superior features.
>
> For the most current story and setup, please read the follow-up post:
>
> **[Read the Update: Why I Migrated from Minimal Mistakes to al-folio](/blog/2025/updates-personal-website)**

As developers, we often find ourselves wanting to share our work, showcase our projects, and keep track of our milestones. Creating a personal webpage can be an effective way to document and centralize all aspects of my life, including education, work, and research experiences. In this blog post, I'll walk you through the process of building a simple personal webpage using GitHub Pages and Jekyll.

## Building the site

**Why GitHub Pages and Jekyll?**

[GitHub Pages](https://pages.github.com/) is a free service provided by GitHub that allows you to host your website directly on their platform. You can easily deploy your website to the internet with just a few clicks. [Jekyll](https://jekyllrb.com/), on the other hand, is a popular static site generator that allows you to build websites quickly and efficiently. The latter is deeply integrated into GitHub Pages, generating a really interesting synergy by leveraging a free hosting site with templating.

**How does it work?**

Here's an overview of how GitHub Pages and Jekyll work together:

1. **Jekyll**: You write your website's content in Markdown or HTML files, using Jekyll's syntax to generate a static site.
2. **Jekyll Build**: Jekyll builds your website by compiling the Markdown or HTML files into a static HTML file.
3. **GitHub Pages**: GitHub Pages hosts your static HTML file and makes it publicly accessible over the internet.

**Benefits**

Using GitHub Pages and Jekyll has several benefits:

- **Easy deployment**: You can deploy your website to the internet with just a few clicks.
- **Fast performance**: Since your website is built statically, it loads quickly even on slow networks.
- **Seamless version control**: Your website's history is automatically tracked by GitHub, so you can easily revert to previous versions or collaborate with others.

**Choosing a Theme**

Jekyll comes with a wide range of pre-built themes that can be easily installed as packages. For my personal webpage, I chose [Minimal Mistakes](https:/mmistakes.github.io/minimal-mistakes/), which is a straightforward theme that provides a solid foundation for building my site. The documentation is extensive, making it easy to customize.

**Liquid Template Engine**

Jekyll uses the [Liquid template engine](https://shopify.github.io/liquid/), developed by [Shopify](https://www.shopify.com/), provides an easy-to-use way to load dynamic content within static webpages.

Liquid also provides a range of built-in functions and filters that make it easy to perform common tasks, such as looping through data, formatting strings, and manipulating variables. This means you can focus on building your website's content and layout, without getting bogged down in the technical details of template rendering.

**Setting up Analytics**

Analytics provides valuable insights into your website's performance and helps you make data-driven decisions to improve engagement and conversions. I opted for [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/), as this tool provides a range of features that make it easy to track your website's traffic, engagement, and other key metrics.

One of the things I like about this tool is that it's GDPR compliant, which makes it an ideal choice for websites that need to comply with data protection regulations. Furthermore, it doesn't require cookies for its functionality, meaning you can track your website's performance and user behavior without compromising on security or privacy.

## Customizing the site: Dynamically display different avatars on loading

To add some personality to my website, I created a simple script that dynamically displays different avatars on my [About](/about) and [404](/404) pages when loading using Liquid syntax and JavaScript.

**Folder Structure**

Here's my project folder structure, this will be useful for understanding the following steps:

```
.
└── assets/
    └── images/
        └── avatars/
            ├── avatarimage_0.png
            ├── avatarimage_1.png
            ├── avatarimage_2.png
            └── ...
```

First, we need to determine how many images we have available in our directory. In this section, we're looping through all static files, checking if their path contains the string `'assets/images/avatars/avatarimage_'`. If it does, we increment a counter variable `count`.

{% raw %}

```
{% assign count = 0 %}
{% for file in site.static_files %}
  {% if file.path contains 'assets/images/avatars/avatarimage_' %}
    {% assign count = count | plus: 1 %}
  {% endif %}
{% endfor %}
```

{% endraw %}

To create an image placeholder named `randomImage`, I used the following code:

```html
<img id="randomImage" src="" />

<script>
  const randNum = Math.floor(Math.random() * {{ count }});
  document.getElementById('randomImage').src = 'assets/images/avatars/avatarimage_' + randNum + '.png';
</script>
```

Every time the page loads, a random number `randNum` within the range `[0, count)`, applies a floor function to extract the integer part, and uses it to build the path of an image from the `avatarimage_` naming scheme.

**Conclusion**

Building my personal webpage using GitHub Pages and Jekyll has been an incredibly rewarding experience. By leveraging these tools and technologies, I've created a dynamic and customizable website that showcases my projects, milestones, and experiences. If you're interested in learning how to build your own webpages or centralize your life documents, I highly recommend giving GitHub Pages and Jekyll a try!
