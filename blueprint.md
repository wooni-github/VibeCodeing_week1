# Lotto Number Generator - High-Quality GUI Upgrade

## Overview
A modern, high-performance, and visually stunning Lotto number generator. It features a realistic "lotto machine" animation, vibrant color palettes, and a premium user experience using the latest web standards.

## Features & Design
- **Modern UI/UX:** Glassmorphism, deep shadows, and subtle textures for a premium feel.
- **Bonus Number Drawing:** Draws 7 unique numbers (6 main + 1 bonus) following the standard Lotto 6/45 format.
- **Visual Distinction:** Separates the bonus number with a "+" symbol for clarity in both main display and history.
- **Web Components:** Encapsulated `<lotto-ball>` and `<lotto-machine>` components.
- **Modern CSS:**
    - `@layer` for style organization.
    - `oklch()` for vibrant, perceptually uniform colors.
    - Container queries for responsive component design.
    - `:has()` for interactive state management.
    - CSS Variables for dynamic theming.
- **Dynamic Animations:** Smooth entry animations and physics-inspired interactions.
- **Theme Support:** Polished light and dark modes with elegant transitions.
- **Accessibility:** Semantic HTML and ARIA support for a wide range of users.

## Project Structure
- `index.html`: Main entry point with component placeholders.
- `style.css`: Modern CSS with layers and advanced visual effects.
- `main.js`: Core logic using ES Modules and Custom Elements.

## Implementation Plan
1.  **Refine Structure:** Clean up `index.html`, fix typos, and add modern typography (Google Fonts).
2.  **Aesthetic Styles:** Implement `style.css` with layers, `oklch` colors, and noise textures.
3.  **Component Logic:** Develop Web Components in `main.js` for balls and the generator interface.
4.  **Bonus Number Integration:** Update logic to draw 7 numbers, sort the first 6, and display the last one as a bonus with a "+" separator.
5.  **Interactivity:** Add glow effects, refined transitions, and sound-like visual feedback.
6.  **Validation:** Ensure cross-browser compatibility and error-free execution.
