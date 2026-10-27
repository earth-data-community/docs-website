# Earth Data theme

Custom theme for the Earth Data Community documentation website
([docs-website](https://github.com/earth-data-community/docs-website)).

It is a maintained fork of [`hugo-book`](https://github.com/alex-shpak/hugo-book)
v0.14.0 (MIT, kept under `LICENSE`) restyled with the
[earth-data.eu](https://www.earth-data.eu/) design system:

| Token | Value |
|---|---|
| Teal primary | `#1F4F4F` (500), `#4C7272` (400), `#112B2B` (800), `#98AEAE` (200) |
| Surfaces | `#FFFFFF`, `#F7F8F8`, `#FAFAFA`, greys `#EAEAEA` `#E9EDED` `#BAC8C8` `#698989` |
| Accents | magenta `#A8148A`, pink `#DA6582` |
| Type | Quicksand (headings, 300–700) + Roboto (body, 100–900) — self-hosted woff2 |
| Buttons | pill radius `15px`, gradient hover `linear-gradient(274deg, #1F4F4F 12%, #4C7272 100%)` |
| Container | `1140px` (kit), breakpoints at `1024px` and `767px` |

## Features added by this fork

* **Design tokens** — `assets/_variables.scss` maps the earth-data.eu Elementor
  kit into Hugo Book's theme mixins (`theme-light`, `theme-dark`, `theme-auto`
  in `assets/_defaults.scss`).
* **Self-hosted webfonts** — `static/fonts/*.woff2` + `@font-face` in
  `assets/_fonts.scss` (`font-display: swap`). No Google Fonts request.
* **Light/dark toggle** — a button in the top utility bar cycles light ⇄ dark,
  persists the choice in `localStorage` (`ed-theme`) and falls back to the OS
  preference (`BookTheme = 'auto'`) when no stored choice exists.
  Implementation: `layouts/_partials/docs/theme-toggle.html` (markup),
  `docs/inject/head.html` (pre-paint application), `docs/inject/body.html`
  (click handler), and the `html[data-theme]` overrides at the end of
  `assets/book.scss`.
* **Top utility bar** — helpdesk mail + GitHub link + theme toggle, mirroring
  the thin strip at the top of earth-data.eu. Configured through site params:
  `Helpdesk`, `HelpdeskLabel`, `SiteGithub`. Partial:
  `layouts/_partials/docs/topbar.html`.
* **Dual brand logos** — `BookLogo` (light) / `BookLogoDark` (dark) are
  swapped automatically with the active theme (`docs/brand.html`).
* **Component layer** — `assets/_earth-data.scss` restyles typography,
  buttons, landing hero and `{{% columns %}}` cards, topbar/search/footer.

## Editing guidelines

* Change colors/typography in `assets/_variables.scss` + `_defaults.scss`
  (theme mixins) only — never hardcode hex values in components.
* Site-specific tweaks belong to `assets/_custom.scss` (project volume can
  override any file of this theme with the same path).
* Keep `theme-light` / `theme-dark` / `theme-auto` mixin names: `book.scss`
  generates the correct mixin from the `BookTheme` site parameter.
