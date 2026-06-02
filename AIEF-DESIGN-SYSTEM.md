# AIEF Design System

This build follows the Figma `DEXTOP` page as the visual source of truth.

## Colors

- Page light: `#ffffff`
- Pale section: `#eaf3ff`
- Primary navy text: `#081938`
- Primary blue: `#0a46a3`
- Bright action blue: `#1573ff`
- Gold accent: `#f8c14a`
- Dark page: `#061022`
- Dark section: `#071c3d`
- Dark card: `#081932`
- Footer: `#061832`

## Typography

- Font family: Inter/system sans-serif.
- Desktop hero: `clamp(46px, 6.3vw, 86px)`.
- Desktop section heading: `clamp(32px, 4.2vw, 58px)`.
- Body: `16px`, `1.75` line height.
- Mobile hero: max around `40px`.
- Mobile body: `15px`, comfortable line height.

## Components

- Navbar: rounded floating pill, translucent surface, active lower stroke.
- Buttons: 48px minimum height on desktop, full-width option on mobile, hover lift, pressed scale.
- Cards: 20px radius, semantic border, icon disc, pattern band at bottom.
- Pattern bands: imported AIEF pattern assets from the uploaded files.
- CTA blocks: dark navy panels with pattern treatment at the top.
- Footer: dark navy, pattern strip, grouped links.

## Interactions

- All nav links route via hash routes.
- Initiative dropdown links to Conference, Mentorship, and Leadership/Speaking.
- Theme toggle switches Light/Dark using CSS variables.
- Cards and buttons include hover/pressed states.
- Conference gallery includes previous/next controls.
- Contact form has a success state.

## Responsive Rules

- Desktop is the primary fidelity target.
- Tablet collapses large grids to two columns.
- iPhone/mobile collapses to one column with 44px+ tap targets.
- No horizontal scroll.
- Images preserve aspect ratio with fixed visual heights.

## Assets Used

- AIEF logo from local brand assets.
- AI in Action Now event imagery from the local gallery folder.
- AIEF pattern SVG/PNG files from the uploaded pattern folders.
- Sponsor logos from the local sponsor assets folder.
