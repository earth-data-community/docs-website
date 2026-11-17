---
title: How to contribute to Earth Data Community
date: 2026-10-30
weight: 2
---

{{< lead >}}
There are two ways to publish your documentation on this site: keep your files in an external repository and have them mounted here, or write directly in this repository. Both end up in the Documentation menu.
{{< /lead >}}

## Option 1 — Link an external repository

Your documentation stays in its own repository (on GitHub or elsewhere). We mount it into this site, so it appears as a regular section of the Documentation menu without copying any files.

**To get started:** open an issue on [earth-data-community/docs-website](https://github.com/earth-data-community/docs-website) (or email [helpdesk@earth-data.eu](mailto:helpdesk@earth-data.eu)) with the Git link to your repository and the title you want for the section. A maintainer will wire it up — see [below](#for-maintainers) for what that involves.

### Requirements for the source files

- Each Markdown file must include a [front matter](https://gohugo.io/content-management/front-matter/) block at the top, with at least a `title`. The same fields as described in [Front matter reference](#front-matter-reference) apply.
- The section's landing page must come from a file named `_index.md` or `README.md` at the root of the documentation folder.
- Use complete image URLs (starting with `https://…`, e.g. `https://raw.githubusercontent.com/…/image.png`), rather than relative paths, so images keep working once the page is mounted on this site.

### How updates are picked up

The mounted version of your repository is **pinned** in this site's `go.mod`, like a dependency. Pushing to your repository does not change the live site by itself — a maintainer bumps the pin, and the site rebuild picks up your latest content. If you have published a significant update, let us know (issue or helpdesk) so we can refresh it.

### For maintainers

External content is integrated as a [Hugo Module](https://gohugo.io/hugo-modules/) in three steps:

1. Add the module and its mounts in `config/_default/hugo.toml` under `[module]`, mapping your files to `content/docs/<topic>/…` (single-file mounts or a whole subtree both work).
2. Add an `[[editLinks]]` entry in `config/_default/params.toml` so the **Edit** button on each page points back to your repository.
3. Pin the module version with `go get github.com/<org>/<repo>@<ref>` and commit the updated `go.mod` / `go.sum`.

To refresh the pin later, repeat step 3. Note that all module imports must live in `hugo.toml` — Hugo does not merge module arrays across config files.

See `galaxy-tools` in the config files for a complete working example.

## Option 2 — Add your documentation directly in this repository

Place your files in the `content/docs/` folder, following this structure:

```
content/docs/
└── my-topic/
    ├── _index.md            # my-topic landing page, describing what's in the folder (required)
    ├── featured.webp        # image shown on the section's card in the parent listing,
    │                        # and as the header background on the landing page (optional)
    ├── getting-started.md   # a regular page
    └── section-1/
        ├── _index.md        # sub-section landing page (required)
        └── section-1.md     # my-topic's section 1 content
```

- Every folder should contain an `_index.md` file; it defines the section's title and weight (menu order).
- Use kebab-case folder names (`my-topic`) — they become the page URL. If a folder name has spaces or uppercase letters, set a clean `slug` in its `_index.md`, as done for the existing sections.
- Open a pull request against this repository. Once it is merged into `main`, the site rebuilds and deploys automatically.

### Front matter reference

Use a front matter block in every Markdown file:

```
---
title: "My page title"   # required — shown in the menu, cards and browser tab
slug: "my-page"          # optional — overrides the URL segment derived from the file name
date: 2026-10-30         # optional — falls back to the first git commit date
draft: false             # true = excluded from the published site (shown locally with hugo server -D)
weight: 10               # optional — menu order within the section, lower = higher
tags: ["tools"]          # optional — keywords shown at the bottom of the page
---
```

`_index.md` files use the same fields; `title` and `weight` are the ones that matter most, since they drive the section's card in the parent listing and its position in the menu.

### Images

- For an image on a section's card and header background, drop `featured.webp` (or any file matching `featured`) next to the section's `_index.md`. Image size ratio of 3:2 is recommanded.
- For images inside a page, use a [page bundle](https://gohugo.io/content-management/page-bundles/): name a folder after the page, put `index.md` and the images inside it, and reference them with `![alt text](diagram.png)` or `{{</* figure src="diagram.png" alt="…" */>}}`. Hugo then optimises and fingerprints the images automatically.
- Prefer PNG or WebP, keep files under ~500 KB, and always write meaningful alt text.

### Links between pages

Use standard relative Markdown links — they keep working regardless of where the site is hosted:

```
[User access policy](../policies/user-access/)
```

Avoid root-relative links (`/docs/…`): the site is served under a subpath (`/docs-website/`), so they would point to the wrong location.

## Available shortcodes

Blowfish provides [many shortcodes](https://blowfish.page/docs/shortcodes/). The most useful ones for documentation:

| Shortcode | Purpose |
|---|---|
| `{{</* lead */>}}…{{</* /lead */>}}` | Introductory paragraph at the top of a page |
| `{{</* alert */>}}…{{</* /alert */>}}` | Callout box (warning triangle by default; `icon="circle-info"`, `icon="lightbulb"`, …) |
| `{{</* figure src="…" alt="…" caption="…" */>}}` | Image with caption, auto-optimised |
| `{{</* steps */>}}` / `{{</* step title="…" */>}}` | Numbered step-by-step instructions |
| `{{</* tabs */>}}` / `{{</* tab label="…" */>}}` | Tabbed content (e.g. per operating system) |
| `{{</* accordion */>}}` / `{{</* accordionItem title="…" */>}}` | Collapsible sections |
| `{{</* gallery */>}}` … `{{</* /gallery */>}}` | Responsive image grid |
| `{{</* mermaid */>}}` … `{{</* /mermaid */>}}` | Diagrams (flowchart, sequence, etc.) |
| `{{</* katex */>}}` … `{{</* /katex */>}}` | LaTeX maths |
| `{{</* github repo="org/repo" */>}}` | Repository card with stats |
| `{{</* cta url="…" label="…" */>}}` | Call-to-action button |
| `{{</* button href="…" */>}}Label{{</* /button */>}}` | Inline button/link |
| `{{</* icon "star" */>}}` | Inline icon from the theme's SVG set (`star`, `github`, `circle-info`, …) |

Maths can also be written inline with `$…$` or `$$…$$` directly in the Markdown.

Callout box can also be written with 
```
>[!Note] 
>Text here
```
>[!Note] 
>Text here


## Preview your changes locally

To build the site on your machine you need [Hugo **extended**](https://gohugo.io/installation/) (the CI uses 0.165.0) and [Go](https://go.dev/dl/) (used to fetch the theme and mounted modules):

```bash
git clone https://github.com/earth-data-community/docs-website.git
cd docs-website
hugo server
```

Open the local address printed in the terminal (by default `http://localhost:1313/`). Draft pages appear when you run `hugo server -D`.

> **Tip:** the [Front Matter](https://frontmatter.codes/) VS Code extension is pre-configured for this repository (`frontmatter.json`) and offers a GUI for creating pages, editing front matter and previewing the site.

## Submit your changes

1. Create a branch and commit your files.
2. Open a pull request against `main`.
3. A maintainer reviews the content and layout.
4. Once merged, the GitHub Actions workflow rebuilds and deploys the site — your changes are live within a few minutes.

Every published page has an **Edit** button in its header that links straight to the source file, so fixes and improvements are always one click away.

Questions? Contact the [helpdesk](mailto:helpdesk@earth-data.eu) or open an issue on [GitHub](https://github.com/earth-data-community/docs-website/issues).
