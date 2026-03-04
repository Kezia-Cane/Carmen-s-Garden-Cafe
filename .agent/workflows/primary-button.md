---
description: How to use the primary CTA button in Carmen's Garden Café project
---

# Primary Button Standard: BotanicalButton

All primary CTA buttons in this project **MUST** use the `BotanicalButton` component.

## Import
```tsx
import { BotanicalButton } from "@/components/ui/botanical-button";
```

## Usage
```tsx
// Basic button
<BotanicalButton>Visit the Garden</BotanicalButton>

// With click handler
<BotanicalButton onClick={() => handleClick()}>Reserve Now</BotanicalButton>

// As a link
<BotanicalButton href="https://example.com">Open Link</BotanicalButton>

// With extra classes
<BotanicalButton className="mt-8">Custom Spacing</BotanicalButton>
```

## Design Details
- **Background**: Gold (`--color-gold`) with animated gradient on hover
- **Text**: Forest Green (`--color-forest-green`), uppercase, Montserrat tracking
- **Decorations**: Three botanical vine/leaf SVGs that sway on hover
- **CSS**: Animations defined in `globals.css` under `.botanical-btn`

## Do NOT use
- `motion.button` with manual gold styling
- Plain `<button>` elements for primary CTAs
- Any non-botanical CTA button styling

Always use `<BotanicalButton>` for consistency across the entire project.
