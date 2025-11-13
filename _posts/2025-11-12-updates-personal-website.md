---

layout: post

title: "Site Update: Migrating to al-folio for a Data-Driven Resume"

date: 2025-11-12

tags: jekyll github-pages al-folio migration typst json-resume

toc:

  beginning: true

---



I previously wrote about [building a simple webpage]({% post_url 2025-01-13-building-personal-webpage %}) using the [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) theme. It was an excellent starting point, but I’ve recently migrated the site to [al-folio](https://github.com/alshedivat/al-folio).



While Minimal Mistakes was great for getting off the ground, I began to feel limited. I wanted a platform I could expand on and learn from, and al-folio offered features that were simply too good to pass up.



## The Reason: A Systematic Way of Building Resumes



The main draw was al-folio's support for generating a structured resume from a single source.



My previous setup—a raw LaTeX resume—became cumbersome as my projects grew. Plus, [compile timeouts on Overleaf](https://www.overleaf.com/blog/changes-to-free-compile-timeouts-and-servers) had become a real pain.



With this new approach, I aim to maintain a single file for my experience, education, and skills. Adopting the [JSON Resume](https://jsonresume.org/) philosophy allows for standardization, version control, and easy updates. Currently, I generate an interactive [web-based CV](/cv) via the theme and a [PDF version](/assets/pdf/cv.pdf) leveraged by [rendercv](https://github.com/rendercv/rendercv).



## Future-Proofing with RenderCV and Typst



The ecosystem is evolving fast. Contributors are planning to migrate the main [resume logic to the rendercv schema](https://github.com/alshedivat/al-folio/pull/2969). This will eventually allow a single YAML file to render both the web and PDF versions of the resume seamlessly.



`rendercv` is built on **[Typst](https://typst.app/)**, a modern typesetting system that offers considerable advantages over LaTeX, Markdown, and Word. Typst features real-time rendering, a more intuitive syntax, and superior handling of complex layouts.



Moving toward a workflow that leverages Typst for typesetting while keeping my data in a structured format feels like the right long-term play.



## Final Thoughts



Minimal Mistakes remains a solid choice for a blog-focused site. However, if you want a portfolio that handles technical content well and turns your CV into a managed data object rather than a layout nightmare, I highly recommend checking out al-folio.