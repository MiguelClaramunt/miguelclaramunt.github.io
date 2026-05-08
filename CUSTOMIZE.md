# Customize

Here we will give you some tips on how to customize the website. One important thing to note is that **ALL** the changes you make should be done on the **main** branch of your repository. The `gh-pages` branch is automatically overwritten every time you make a change to the main branch.

    ├── 📂 font-awesome/: contains the SCSS files for Font Awesome
    ├── 📄 _blog.scss: blog post, tags, and pagination styles
    ├── 📄 _components.scss: reusable component styles (cards, profiles, CV, projects)
    ├── 📄 _cv.scss: style of the CV page
    ├── 📄 _distill.scss: style of the Distill articles
    ├── 📄 _footer.scss: footer styles
    ├── 📄 _layout.scss: overall layout styles
    ├── 📄 _navbar.scss: navigation bar and dropdown menu styles
    ├── 📄 _publications.scss: publication list and bibliography styles
    ├── 📄 _tabs.scss: tabbed content styles
    ├── 📄 _teachings.scss: course and teaching styles
    ├── 📄 _themes.scss: theme colors and icons
    ├── 📄 _typograms.scss: typogram diagram styles
    ├── 📄 _typography.scss: text, headings, links, tables, and blockquote styles
    ├── 📄 _utilities.scss: utility styles (code highlighting, forms, modals, animations)
    └── 📄 _variables.scss: variables used in the SASS files

```

## Configuration

The configuration file [\_config.yml](_config.yml) contains the main configuration of the website. Most of the settings is self-explanatory and we also tried to add as much comments as possible. If you have any questions, please check if it was not already answered in the [FAQ](FAQ.md).

> Note that the `url` and `baseurl` settings are used to generate the links of the website, as explained in the [install instructions](INSTALL.md).

All changes made to this file are only visible after you rebuild the website. That means that you need to run `bundle exec jekyll serve` again if you are running the website locally or push your changes to GitHub if you are using GitHub Pages. All other changes are visible immediately, you only need to refresh the page.

```
