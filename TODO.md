# TODO

Things worth doing, not yet done. Roughly in value order.

## Blocked on a decision

- **Contact form delivery backend.** The form is written, tested and hidden
  (commented out in `index.html`). Cloudflare Email Sending needs the Workers
  Paid plan ($5/mo); the free alternative is proxying to Web3Forms from the
  existing Worker. Until one is chosen the form stays off the page.
- **Contact email is a personal Gmail address.** Now `grahamroten@gmail.com`,
  which is deliverable and owned — an improvement on the previous
  `info@grahamroten.com`, which belonged to an unrelated site. Still worth
  moving to `info@grenterprisesllc.com`: it matches the domain and reads as a
  business rather than a person. Cloudflare Email *Routing* is free on the
  current plan and forwards to any inbox, including this one. Set the mailbox
  up before changing the link, or mail silently drops.

## SEO

- **LocalBusiness structured data (JSON-LD).** Highest-value item left. Drives
  Google's local results and map pack for searches like "hauling Boone NC".
  Should carry the phone number, service area, and the licence numbers already
  in the footer. The site currently has zero `application/ld+json` blocks.
- **`sitemap.xml`.** Does not exist (404). Cheap; helps crawlers find all 13
  pages, several of which are only linked from the services grid.
- **`favicon.ico`.** Returns 404. The PNG icons are declared and work in
  browsers, but some crawlers probe `/favicon.ico` directly.

## Performance

- **Image weight.** 836 KB total. The two logo PNGs are the largest files on
  the site — `logo.png` at 227 KB and `Logo-transparent.png` at 110 KB —
  despite displaying at 40–50 px. Resize and convert to WebP.

## Testing

- **Firefox and WebKit have never run.** `playwright.config.js` defines both,
  but only Chromium is installed locally, so all testing so far has been
  Chromium desktop + Mobile Chrome. Install the others and check.
- **12 skipped tests.** The Payment Form suite and the homepage payment test
  cover a section that no longer exists — delete them if billing is not coming
  back. The Contact Form suite and keyboard-navigation test should be
  re-enabled with the form.

## Housekeeping

- **`.DS_Store` is tracked.** It shows up modified in every `git status` and
  every diff. Needs `git rm --cached .DS_Store` plus a `.gitignore` entry.
- **GitHub Pages is still serving a copy.** The deploy workflow was removed, so
  it no longer updates, but the old site stays live until Pages is disabled in
  the repository settings.
