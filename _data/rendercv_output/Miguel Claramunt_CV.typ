// Import the rendercv function and all the refactored components
#import "@preview/rendercv:0.3.0": *

// Apply the rendercv template with custom configuration
#show: rendercv.with(
  name: "Miguel Claramunt",
  title: "Miguel Claramunt - CV",
  footer: context { [#emph[#strong\[]#emph[Miguel Claramunt]#emph[\] -- #str(here().page())\/#str(counter(page).final().first())]] },
  top-note: [ #emph[Last updated in May 2026] ],
  locale-catalog-language: "en",
  text-direction: ltr,
  page-size: "a4",
  page-top-margin: 0.7in,
  page-bottom-margin: 0.7in,
  page-left-margin: 0.7in,
  page-right-margin: 0.7in,
  page-show-footer: false,
  page-show-top-note: true,
  colors-body: rgb(0, 0, 0),
  colors-name: rgb(0, 0, 0),
  colors-headline: rgb(0, 0, 0),
  colors-connections: rgb(0, 79, 144),
  colors-section-titles: rgb(0, 0, 0),
  colors-links: rgb(0, 79, 144),
  colors-footer: rgb(128, 128, 128),
  colors-top-note: rgb(128, 128, 128),
  typography-line-spacing: 0.6em,
  typography-alignment: "justified-with-no-hyphenation",
  typography-date-and-location-column-alignment: right,
  typography-font-family-body: "XCharter",
  typography-font-family-name: "XCharter",
  typography-font-family-headline: "XCharter",
  typography-font-family-connections: "XCharter",
  typography-font-family-section-titles: "XCharter",
  typography-font-size-body: 10pt,
  typography-font-size-name: 25pt,
  typography-font-size-headline: 10pt,
  typography-font-size-connections: 10pt,
  typography-font-size-section-titles: 1.2em,
  typography-small-caps-name: false,
  typography-small-caps-headline: false,
  typography-small-caps-connections: false,
  typography-small-caps-section-titles: false,
  typography-bold-name: false,
  typography-bold-headline: false,
  typography-bold-connections: false,
  typography-bold-section-titles: true,
  links-underline: true,
  links-show-external-link-icon: true,
  header-alignment: center,
  header-photo-width: 3.5cm,
  header-space-below-name: 0.7cm,
  header-space-below-headline: 0.7cm,
  header-space-below-connections: 0.7cm,
  header-connections-hyperlink: true,
  header-connections-show-icons: true,
  header-connections-display-urls-instead-of-usernames: false,
  header-connections-separator: "|",
  header-connections-space-between-connections: 0.5cm,
  section-titles-type: "with_full_line",
  section-titles-line-thickness: 0.5pt,
  section-titles-space-above: 0.5cm,
  section-titles-space-below: 0.3cm,
  sections-allow-page-break: true,
  sections-space-between-text-based-entries: 0.15cm,
  sections-space-between-regular-entries: 0.42cm,
  entries-date-and-location-width: 4.15cm,
  entries-side-space: 0cm,
  entries-space-between-columns: 0.1cm,
  entries-allow-page-break: false,
  entries-short-second-row: false,
  entries-degree-width: 1cm,
  entries-summary-space-left: 0cm,
  entries-summary-space-above: 0.08cm,
  entries-highlights-bullet:  text(13pt, [•], baseline: -0.6pt) ,
  entries-highlights-nested-bullet:  text(13pt, [•], baseline: -0.6pt) ,
  entries-highlights-space-left: 0cm,
  entries-highlights-space-above: 0.08cm,
  entries-highlights-space-between-items: 0.08cm,
  entries-highlights-space-between-bullet-and-text: 0.3em,
  date: datetime(
    year: 2026,
    month: 5,
    day: 8,
  ),
)


= #strong[Miguel Claramunt]

#connections(
  [#connection-with-icon("location-dot")[Barcelona, ES]],
  [#link("mailto:miguel@claramunt.es", icon: false, if-underline: false, if-color: false)[#connection-with-icon("envelope")[miguel\@claramunt.es]]],
  [#link("https://claramunt.es/", icon: false, if-underline: false, if-color: false)[#connection-with-icon("globe")[Website]]],
  [#link("https://www.linkedin.com/in/miguelclaramunt", icon: false, if-underline: false, if-color: false)[#connection-with-icon("linkedin")[LinkedIn]]],
  [#link("https://github.com/MiguelClaramunt", icon: false, if-underline: false, if-color: false)[#connection-with-icon("github")[GitHub]]],
)


== Professional Summary

Data Scientist with a strong foundation in AI data science, and analytics, combining academic and industry experience to deliver scalable solutions. Specialized in Natural Language Processing, Large Language Models, and High-Performance Computing.

== Experience

#regular-entry(
  [
    #strong[Research Engineer], Barcelona Supercomputing Center -- Barcelona, ES

  ],
  [
    Nov 2024 – present

  ],
  main-column-second-row: [
    #summary[Engineering state-of-the-art machine translation systems and multilingual NLP pipelines. Current projects involved: ELOQUENCE (EU), AINA (CA), ALIA (ES).]

  ],
)

#regular-entry(
  [
    #strong[Support Infrastructure Engineer], Leeos Merch -- Barcelona, ES

  ],
  [
    July 2024 – Sept 2024

  ],
  main-column-second-row: [
    #summary[Architected a scalable Freshdesk infrastructure for high-volume platforms, automating workflows to manage 5.5K+ monthly tickets.]

  ],
)

#regular-entry(
  [
    #strong[Data Engineer (Client: CaixaBank)], SDG Group -- Barcelona, ES

  ],
  [
    Sept 2023 – Apr 2024

  ],
  main-column-second-row: [
    #summary[Maintained a real-time analytics platform for 40K+ daily users and engineered enterprise ETL pipelines processing 500K+ records monthly.]

  ],
)

#regular-entry(
  [
    #strong[Undergraduate Research Assistant], Universitat de València -- València, ES

  ],
  [
    Apr 2022 – July 2022

  ],
  main-column-second-row: [
    #summary[Developed end-to-end NLP applications for fake news classification.]

  ],
)

== Education

#education-entry(
  [
    #strong[Universitat Pompeu Fabra], Master of Science in Intelligent Interactive Systems -- Barcelona, ES

  ],
  [
    2024 – 2026

  ],
  main-column-second-row: [
  ],
)

#education-entry(
  [
    #strong[Universitat de València], Bachelor of Science in Data Science -- València, ES

  ],
  [
    2019 – 2023

  ],
  main-column-second-row: [
  ],
)

== Honors & Awards

#regular-entry(
  [
    #strong[City of Valencia Data Visualization Award] -- #strong[València, ES]

  ],
  [
    July 2021

  ],
  main-column-second-row: [
    #summary[Awarded by the Chair of Gamification and Open Government of València (Càtedra de Ludificació i Govern Obert a la Ciutat de València)]

  ],
)

== Skills

#strong[Languages:] Spanish (native proficiency), English (full professional proficiency), Catalan (professional proficiency)

== Volunteering Activities

#regular-entry(
  [
    #strong[Group Leader & Instructor], Juniors Santa María de Jesús -- València, ES

  ],
  [
    2017 – 2022

  ],
  main-column-second-row: [
    #summary[Led a 9-monitor team for 2 years, organizing weekly activities for up to 20 children. Coordinated an 11-day summer camp with a 14-member team, overseeing activities for 50+ children.]

  ],
)

== Publications

#regular-entry(
  [
    #strong[From SALAMANDRA to SALAMANDRATA: BSC Submission for WMT25 General Machine Translation Shared Task]

  ],
  [
    Aug 2025

  ],
  main-column-second-row: [
    Javier García-Gilabert, Xixian Liao, Severino Da-Dalt, Ella Bohman, Audrey Mash, Francesca De-Luca-Fornaciari, Irene Baucells, Joan Llop, #strong[Miguel Claramunt], Carlos Escolano, Maite Melero

    #link("https://doi.org/10.18653/v1/2025.wmt-1.37")[10.18653\/v1\/2025.wmt-1.37] (Proceedings of the Tenth Conference on Machine Translation)

  ],
)

#regular-entry(
  [
    #strong[Culture-aware machine translation: the case study of low-resource language pair Catalan-Chinese]

  ],
  [
    June 2025

  ],
  main-column-second-row: [
    Xixian Liao, Carlos Escolano, Audrey Mash, Francesca De-Luca-Fornaciari, Javier García-Gilabert, #strong[Miguel Claramunt], Ella Bohman, Maite Melero

    #link("https://aclanthology.org/2025.mtsummit-1.12/")[aclanthology.org\/2025.mtsummit-1.12] (Proceedings of Machine Translation Summit XX)

  ],
)

== Presentation & Talks

#regular-entry(
  [
    #strong[Detecting and Mitigating Bias in AI Systems: Webcafé]

  ],
  [
    Aug 2025

  ],
  main-column-second-row: [
    Javier García-Gilabert, #strong[Miguel Claramunt]

    #link("https://youtube.com/watch?v=AHfP29vU6k4")[youtube.com\/watch?v=AHfP29vU6k4] (ELOQUENCE AI)

  ],
)
