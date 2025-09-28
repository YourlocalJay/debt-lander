# Debt Lander

This repository contains the static landing page for DebtRelief Solutions.

## Icon Generation

All favicons and PWA icons are generated from the master image at `assets/images/icon-1024.png`.

To rebuild the icon set locally:

```sh
npm install
npm run build:icons
```

A GitHub Actions workflow (`.github/workflows/build-icons.yml`) runs the same commands on each push and pull request, failing the build when the generated icons are not committed.
