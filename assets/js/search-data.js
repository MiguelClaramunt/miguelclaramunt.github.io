// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-publications-amp-talks",
          title: "publications &amp; talks",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications-talks/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "A showcase of projects I&#39;ve worked on and contributed to over the years.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "news-participated-in-eloquence-webcafé-detecting-and-mitigating-bias-in-ai-systems-with-javier-garcía-gilabert-we-discussed-practical-approaches-to-detect-bias-mitigation-strategies-evaluation-metrics-and-operational-considerations-for-deploying-fairer-models",
          title: 'Participated in ELOQUENCE Webcafé: “Detecting and Mitigating Bias in AI Systems” with Javier...',
          description: "",
          section: "News",},{id: "projects-eloquence",
          title: 'ELOQUENCE',
          description: "ELOQUENCE is pioneering the development of advanced voice/chat bot technologies aimed at transforming unstructured dialogues into comprehensible, safe, and unbiased interactions.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/eloquence/";
            },},{id: "projects-vectorizing-barcelona-metro-tickets",
          title: 'Vectorizing Barcelona Metro Tickets',
          description: "From low-res image to physical bookmark: vectorizing Barcelona&#39;s forgotten transit history",
          section: "Projects",handler: () => {
              window.location.href = "/projects/tmb/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6D%69%67%75%65%6C@%63%6C%61%72%61%6D%75%6E%74.%65%73", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/MiguelClaramunt", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/miguelclaramunt", "_blank");
        },
      },{
        id: 'social-discord',
        title: 'Discord',
        section: 'Socials',
        handler: () => {
          window.open("https://discord.com/users/1207672611689996288", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=k6cuY98AAAAJ", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0009-0008-6562-1533", "_blank");
        },
      },{
        id: 'social-work',
        title: 'Work',
        section: 'Socials',
        handler: () => {
          window.open("https://www.bsc.es/es/claramunt-argote-miguel", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
