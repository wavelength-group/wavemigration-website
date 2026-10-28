# Wavelength Migration Services website

Static website for Wavelength Migration Services (formerly RMS), built with [Eleventy](https://www.11ty.dev/) and edited
through [Sveltia CMS](https://sveltiacms.app/). Hosted on Netlify, owned by the
`wavelength-group` GitHub organisation. Same setup as `ccentric-website`.

## How it works

- **The homepage** is `src/index.njk` - hand-coded HTML and CSS, with the team
  and testimonials sections filled from data files.
- **Team profiles** live in `src/_data/team.json`; **testimonials** in
  `src/_data/testimonials.json`. Edit these (or use the CMS) rather than the HTML.
- **Images** are in `src/static/assets/img/` and publish at `/assets/img/`.
- `netlify.toml` tells Netlify to run `npm run build` (Eleventy) and publish `_site/`.

## Editing content

- **Admin**: `/admin` - team members and testimonials.
- Sign in with GitHub. Editors need a GitHub account in the `wavelength-group`
  organisation with write access to this repository.

## Local development

```bash
npm install
npm run build      # outputs to _site/
npm run serve      # local preview at http://localhost:8080
```
