# Design System Strategy: The Adaptive Flow

## 1. Overview & Creative North Star
This design system is built upon the Creative North Star of **"The Intellectual Playground."** Our goal is to dismantle the clinical, rigid feel of traditional Learning Management Systems (LMS) and replace it with an environment that feels alive, fluid, and premium. 

We move beyond the "template" look by embracing **Intentional Asymmetry**. Rather than perfectly centered grids, we use breathing room (negative space) and overlapping layers to guide the eye. This system rejects the boxy constraints of the early web, opting instead for organic depth and sophisticated "editorial" compositions that make learning feel like a curated experience rather than a chore.

---

## 2. Colors & Surface Architecture
The color strategy avoids the "flatness" of standard UI by utilizing Material Design-inspired tonal tiers. 

### The Palette
*   **Primary (The Deep Intelligence):** `primary` (#005DA7) and `primary_container` (#68ABFF). Used for core actions and brand recognition.
*   **Secondary (The Gamified Spark):** `secondary` (#843AA3) used to highlight progression, XP, and achievement milestones.
*   **Tertiary (The Reward):** `tertiary` (#6F5900) for high-value gamification elements like "XP Yellow" highlights.

### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders to define sections. We define boundaries through background color shifts. A `surface_container_low` section sitting on a `surface` background provides enough contrast to denote a change in context without the visual "noise" of a stroke.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine paper.
*   **Level 0 (Background):** `surface` (#F5F7FA).
*   **Level 1 (Sections):** `surface_container`.
*   **Level 2 (Cards/Modules):** `surface_container_lowest` (#FFFFFF).
*   **Level 3 (Floating Modals):** `surface_bright` with Glassmorphism.

### The "Glass & Gradient" Rule
To inject "soul" into the platform, use Glassmorphism for floating navigation and top bars. Apply a `backdrop-blur` (16px–24px) with a semi-transparent `surface` color (80% opacity). Main CTAs should use a subtle linear gradient from `primary` to `primary_dim` to create a tactile, pressable feel.

---

## 3. Typography: Editorial Authority
We utilize a dual-typeface approach to balance "Professional" with "Playful."

*   **Display & Headlines (Plus Jakarta Sans):** Used for large-scale motivation and chapter titles. These should feel bold and authoritative.
    *   `display-lg` (3.5rem): Use for "Hero" moments and major achievement splashes.
    *   `headline-md` (1.75rem): Standard for page headers.
*   **Body & UI (Inter):** Used for readability in long-form educational content and micro-copy.
    *   `body-lg` (1rem): The default for lesson content.
    *   `label-md` (0.75rem): Used for metadata like "Time to read" or "Category."

The hierarchy conveys the brand identity by using tight tracking on headlines for a modern look, while maintaining generous leading (line-height) in body text to prevent "learning fatigue."

---

## 4. Elevation & Depth
Depth in this system is achieved through **Tonal Layering** rather than structural lines.

*   **The Layering Principle:** Place a `surface_container_lowest` card on a `surface_container_low` section. This creates a soft, natural lift that mimics natural paper stacking.
*   **Ambient Shadows:** For floating elements (like an active quiz card), use an extra-diffused shadow: `box-shadow: 0 12px 40px rgba(44, 47, 50, 0.06)`. The shadow color is a tinted version of the `on_surface` token, not a generic grey.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline_variant` token at **15% opacity**. Never use a 100% opaque border.
*   **Glassmorphism:** Use semi-transparent `surface_container_highest` for "Overlays." This allows the background brand colors to bleed through, keeping the UI integrated.

---

## 5. Components & Interaction
All components utilize the **`xl` (3rem) or `lg` (2rem)** roundedness scale to feel approachable and "soft."

*   **Buttons:**
    *   **Primary:** `primary` background with `on_primary` text. Use `xl` (full rounded) corners.
    *   **Secondary:** No background; `primary` text with a subtle `primary_container` hover state.
*   **The Course Card:**
    *   No border. Background: `surface_container_lowest`. 
    *   Corner Radius: `md` (1.5rem).
    *   On hover: Shift background to `surface_bright` and apply the Ambient Shadow.
*   **XP Progress Bar:**
    *   Track: `surface_container_high`.
    *   Indicator: Gradient from `secondary` to `secondary_fixed`.
*   **Inputs:**
    *   Background: `surface_container_low`. 
    *   Interaction: On focus, the background shifts to `surface_container_lowest` with a 2px `primary` ghost-border.
*   **Gamified Chips:** Use `secondary_container` with `on_secondary_container` text for level badges (e.g., "Lvl 5").

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use the Spacing Scale `8` (2rem) and `10` (2.5rem) to let content breathe.
*   **Do** use "Surface Nesting" to separate a sidebar from a main content area instead of a vertical line.
*   **Do** use `tertiary_container` for positive feedback loops (XP gained, Level Up).

### Don’t:
*   **Don’t** use pure black (#000000) for text. Use `on_background` (#2C2F32) for better readability.
*   **Don’t** use more than one "Floating Shadow" element on a screen at once; it creates visual clutter.
*   **Don’t** use sharp corners. Every interaction point must have at least a `sm` (0.5rem) radius, but ideally `DEFAULT` (1rem+).
*   **Don’t** use dividers. Use a `12` (3rem) vertical gap from the spacing scale to separate content blocks.

---

## 7. Token Reference Summary

| Token Name | Value | Usage |
| :--- | :--- | :--- |
| `primary` | #005DA7 | Main CTA, Active States |
| `secondary` | #843AA3 | Gamification, Progress, Rewards |
| `surface` | #F5F7FA | Main App Background |
| `surface_container_lowest`| #FFFFFF | Cards, Content Containers |
| `radius-lg` | 2rem | Large Cards, Feature Blocks |
| `radius-full` | 9999px | Buttons, Tags, Avatars |
| `spacing-4` | 1rem | Internal Card Padding |
| `spacing-8` | 2rem | Section Gaps (The "No-Divider" Gap) |