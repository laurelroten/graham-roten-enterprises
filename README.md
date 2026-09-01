# GR Enterprises Website

This repository hosts the static website for **GR Enterprises** located in Boone, NC. The site is deployed to Cloudflare Workers and uses plain HTML, CSS and a small amount of JavaScript.

Live at **https://grenterprisesllc.com**

## Development

To view the site locally, simply open `index.html` in your browser. Edits to styling can be made in `style.css` and interactive behavior is located in `script.js`.

## Deployment

Deployment is manual, via Wrangler:

```bash
npm run cf:deploy
```

That runs `scripts/build.sh` to assemble `dist/` (site files only — no `node_modules`,
tests or docs), then deploys it to Cloudflare Workers. The Worker serves the static
assets and handles `POST /api/contact`.

Custom domains `grenterprisesllc.com` and `www.grenterprisesllc.com` are attached in
`wrangler.jsonc`; Cloudflare manages their DNS records.

The site was previously auto-deployed to GitHub Pages. That workflow has been removed —
Cloudflare is now the only deployment target.

## Future Work

A company logo will be added in a future update. The current site uses a text placeholder for the logo.
