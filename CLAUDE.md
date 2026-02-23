# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing/landing page for Atlas of Scales, a 2.5D online multiplayer strategy game. Hosted on **GitHub Pages** with custom domain `atlasofscales.com` (see `CNAME`).

## Architecture

This is a **vanilla static site** — no build system, no bundler, no package manager, no framework.

- `index.html` — Single-page site with all content inline. Sections: hero, about, world/biomes, city building, dragons, combat/units, alliances, espionage, devlog, contact, footer.
- `css/style.css` — All styles. Uses CSS custom properties defined in `:root` for the dark fantasy theme.
- `js/main.js` — All interactivity in a single IIFE. Handles: sticky nav (IntersectionObserver), smooth scroll, active section highlighting, mobile hamburger menu, scroll-reveal animations, image lightbox, dragon base/armoured toggle, biome unit tabs.
- `assets/` — Static images: `logo.jpg`, `concepts/` (concept art), `dragons/` (base + armoured variants per civilization), `units/` (organized by biome subdirectories).

## Development

Open `index.html` directly in a browser or use any static file server. No install or build step required.

## Key Patterns

- **Design tokens:** Colors (`--bg-primary`, `--accent-gold`, `--accent-emerald`), fonts (`--font-heading: Cinzel`, `--font-body: Raleway`), spacing (`--nav-height`, `--max-width`) are all CSS custom properties in `:root`.
- **Scroll reveal:** Elements with class `reveal` animate in when they enter the viewport (observer in `js/main.js`, styles in `css/style.css`). Add `reveal` to any new section content.
- **Dragon cards:** Each `.dragon-card` has base and armoured image variants toggled via `.show-armoured` class. Some dragons show a "Coming Soon" overlay on their armoured variant (`.dragon-coming-soon`).
- **Unit tabs:** Biome-based tab system using `data-biome` attributes on `.tab-btn` and `.tab-panel` elements.
- **Lightbox:** Shared lightbox (`#lightbox`) used by both dragon cards and unit cards for full-size image viewing.
- **Mobile menu:** Hamburger button toggles `.mobile-overlay` — nav links are duplicated there and must be kept in sync with `.nav-links`.
