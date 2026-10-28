# RMS website - context for Claude

Public website for RMS (Regulatory & Migration Services), a division of Wavelength Group.
Owner: Dr John Bethell. Same architecture as `wavelength-group/ccentric-website`.

## Where things live
- **Code:** GitHub `wavelength-group/wavemigration-website` (public repo, branch `main`).
- **Hosting:** Netlify project `wave-migration` (team: jbethell66's team). Every push to `main` auto-deploys.
- **Netlify URL:** https://wave-migration.netlify.app
- **Domain:** wavemigrationservices.com (primary; www redirects to it). Registered at GoDaddy,
  nameservers pointed to Netlify DNS (dns1-4.p09.nsone.net). DNSSEC off at GoDaddy - keep it off.
- **CMS:** Sveltia CMS at /admin (config in `admin/config.yml`), GitHub sign-in.

## Structure
- `src/index.njk` - the single-page site (hand-coded HTML/CSS, Nunjucks loops for team and testimonials).
- `src/_data/team.json`, `src/_data/testimonials.json` - editable content (also via CMS).
- `src/static/assets/img/` - logos, mark, team photos (published at /assets/img/).
- Build: Eleventy 3 (`npm run build` -> `_site/`), settings in `netlify.toml`.

## Origin
Converted on 28 Oct 2026 from a Claude artifact ("RMS Regulatory and Migration") built in John's
personal Claude account. The artifact is now superseded - edit this repo, not the artifact.

## Open items (as of 28 Oct 2026)
- Set up CMS GitHub sign-in on the Netlify project (same method as Ccentric); give Elinor Faulkner
  (RMS manager) and Deanna Daly (marketing) write access to the repo.
- Replace mailto enquiry buttons with a Netlify Forms enquiry form (Ccentric has one to copy).
- Site copy uses em dashes; John's house style prefers hyphens/commas - confirm before changing.

## John's working preferences
Australian English. Conclusions first, concise, executive register. No em dashes in Claude's own writing.
