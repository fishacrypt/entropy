# Entropy Contributor Card

A community activation site where visitors enter their X handle, see a live card preview, generate a personalised Entropy Community Pass, download it as a PNG, and share it on X. No wallet, email or login is needed.

## Tech stack

React, Vite, TypeScript, Tailwind CSS, Framer Motion, `qrcode` and `html-to-image`.

## Development

Prerequisites: [Bun](https://bun.sh).

```bash
bun install
bun run dev
```

Other scripts: `bun run check` (lint and typecheck).

### Environment variables

None.

## Notes

- The pass is community-generated and commemorative. It is not an official or verified Entropy credential, and the site does not verify X accounts.
- Official logo: save a transparent-background SVG of the Entropy "iO" mark to `public/brand/entropy-mark.svg`. It is picked up automatically on the nav, hero and both card panels. Without it, a vector redraw is shown.
