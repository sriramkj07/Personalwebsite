# Personal Website

This is my personal website built with Next.js and deployed on GitHub Pages. It serves as a digital portfolio and blog platform where I share my thoughts on technology, product management, and my personal interests.

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## Local Development

Fork the repository and start building away, let me know if you need any help!

## Watch collection

`/watchesilove` is unlisted and requests no search indexing. It has no password;
anyone with the URL can view it. Search exclusion is not access control.

Edit `app/watchesilove/collection.ts` to change the watches. Official product
images are served locally as compressed WebP files from `public/watches`, with
lazy loading for later entries. Original assets remain in `app/watchesilove/images`.
Viewing the page does not request images from third-party servers. No secret is required
for development or deployment.

## Deployment

Pushing `main` runs `.github/workflows/main.yml`: install the locked dependencies,
lint, build the static export, and deploy `out` to GitHub Pages. Routes export as
directories so direct visits and refreshes work on a static host.

GitHub Pages is configured for `sriramkj.com`. DNS at the domain provider must
point the apex to GitHub Pages and `www` to `sriramkj07.github.io`; then enable
Enforce HTTPS in the repository's Pages settings. The unused Twitter posting API
has been removed; the website needs no server functions.
