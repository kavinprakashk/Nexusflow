---
name: Nexus Industrial
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#20201f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e4beb3'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#ab897f'
  outline-variant: '#5b4038'
  surface-tint: '#ffb59e'
  primary: '#ffb59e'
  on-primary: '#5e1700'
  primary-container: '#ff5a1f'
  on-primary-container: '#541400'
  inverse-primary: '#ae3200'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#8ecdff'
  on-tertiary: '#00344f'
  tertiary-container: '#009ae1'
  on-tertiary-container: '#002e47'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59e'
  on-primary-fixed: '#3a0b00'
  on-primary-fixed-variant: '#852400'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#cbe6ff'
  tertiary-fixed-dim: '#8ecdff'
  on-tertiary-fixed: '#001e30'
  on-tertiary-fixed-variant: '#004b71'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353535'
  safety-orange: '#FF5A1F'
  charcoal: '#1A1A1A'
  pure-white: '#FFFFFF'
  status-green: '#00FF41'
typography:
  display-xl:
    fontFamily: Anton
    fontSize: 120px
    fontWeight: '400'
    lineHeight: 100px
    letterSpacing: -0.04em
  display-xl-mobile:
    fontFamily: Anton
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 60px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Anton
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 48px
  headline-md:
    fontFamily: Anton
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 36px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-mono:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
  data-display:
    fontFamily: Anton
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 24px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 64px
  section-padding: 120px
---

## Brand & Style

This design system is built on **Industrial Minimalism** and the principles of the **Swiss Grid**. It evokes a sense of technical precision, urgency, and raw engineering power. The aesthetic is strictly utilitarian, stripping away decorative fluff in favor of high-contrast communication and structured data. 

The target audience is the developer and maker community—users who value efficiency, transparency, and a "builder-first" mindset. The UI should feel like a high-performance terminal or an editorial broadsheet: authoritative, structured, and uncompromisingly sharp.

**Key Stylistic Pillars:**
- **Raw Brutalism:** Use of thin, sharp borders and high-contrast monochrome backgrounds.
- **Editorial Impact:** Massive, tight-leading headlines that command attention.
- **Information Density:** Strategic use of monospaced fonts for technical data points and status indicators.
- **Strict Geometry:** No rounded corners or soft gradients; every element is defined by its mathematical grid position.

## Colors

The palette is strictly limited to ensure maximum visual impact. **Safety Orange** is the sole chromatic accent, reserved exclusively for primary actions, critical alerts, and branding highlights. 

- **Primary (Safety Orange):** Used for CTA buttons, active status indicators, and major brand marks.
- **Secondary (Pure White):** Used for primary typography on dark backgrounds and section backgrounds in alternating layouts.
- **Neutral (Charcoal):** The foundation of the "Dark" sections. It provides a deep, matte base that makes the safety orange pop without the harshness of pure black.
- **Status Green:** A secondary functional color used only for "Live" or "Active" system states.

**Usage Rule:** Sections should alternate between Charcoal backgrounds (with White text) and White backgrounds (with Charcoal text) to create a rhythmic, structural flow.

## Typography

The typography system relies on extreme contrast between the expressive, condensed weight of **Anton** and the technical precision of **Space Mono**. 

- **Headlines:** Always uppercase. Tracking should be tight to create a "blocky" editorial feel. Headlines should feel like they are physically pushing against the boundaries of their containers.
- **Body Text:** Use **Hanken Grotesk** for long-form content. It provides a modern, neutral balance to the aggressive headlines.
- **Technical Labels:** Use **Space Mono** for all metadata, including dates, registration fees, and status labels. This reinforces the "industrial" and "developer" nature of the design.
- **Marquee:** Text in tickers should use `label-mono` or `data-display` to maintain legibility while in motion.

## Layout & Spacing

This system utilizes a **12-column Swiss Grid** with a "Modular Block" philosophy. Every component is aligned to a strict vertical and horizontal rhythm.

- **Alternating Sections:** Content is divided into full-bleed horizontal bands that alternate between Charcoal and White. 
- **The Ticker:** Edge-to-edge marquee banners act as separators between major sections, providing a sense of constant motion.
- **Info Bars:** Key data (Mode, Team Size, Price) should be presented in a high-density, multi-column row immediately following the hero section.
- **Grid Dividers:** Use thin (1px) solid borders to separate grid cells rather than relying on whitespace alone. This mimics the look of a technical blueprint.

## Elevation & Depth

This design system is **flat**. It rejects shadows, blurs, and skeuomorphism in favor of structural layering.

- **Z-Axis Hierarchy:** Depth is created through **Bold Borders** and **High Contrast**.
- **Outlines:** Use 1px or 2px solid strokes (`#FFFFFF` on Charcoal, `#1A1A1A` on White) to define card boundaries.
- **Inversion:** Interactive states are conveyed by inverting colors (e.g., a white card becomes black on hover, or an orange button becomes white).
- **No Overlays:** Modals and menus should be full-screen or hard-edged drawers with no backdrop blur, maintaining the raw industrial aesthetic.

## Shapes

The shape language is strictly **Sharp (0px roundedness)**. 

- **Rectangles:** Every card, button, and input field must have square 90-degree corners. 
- **Dividers:** Use horizontal and vertical rules to create a "boxed" layout. 
- **Icons:** Use text-based glyphs (✦, ●, →, ←) instead of rounded illustrative icons. These should be treated as typographic elements.

## Components

- **Buttons:** Large, rectangular blocks. Primary buttons use Safety Orange background with White text. Use an arrow glyph (`→`) for movement. Hover states should either invert or shift to a slightly lighter tint of orange.
- **Cards:** Defined by thin 1px borders. In "Problem Statement" cards, use a header row with a monospaced ID (e.g., `PS-01`) separated by a horizontal rule from the description.
- **Status Chips:** Small, monospaced text blocks. For "LIVE" status, use a small green dot (`●`) prefix.
- **Input Fields:** Flat, bottom-border only or full 1px box. Use monospaced placeholder text. 
- **Progress Indicators:** Use numbered steps (01, 02, 03) in a large display font to denote phases or rounds. 
- **Ticker/Marquee:** A continuous horizontal scroll containing high-priority announcements. Use the ✦ symbol as a separator between phrases.
- **Lists:** Bulleted lists should use square blocks or the ✦ symbol instead of circular bullets.