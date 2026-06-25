# Kiddo SDUI — Server Driven UI Homepage

Production-grade Server Driven UI (SDUI) renderer for **Kiddo**, a Kids & Baby Essentials Q-Commerce platform. The frontend is a dumb renderer — all UI is driven from JSON payloads.

## Project Overview

This project demonstrates a scalable SDUI architecture inspired by Blinkit/Zepto/Swiggy Instamart. A backend JSON payload defines themes, campaigns, hero banners, product grids, horizontal collections, and full-screen Lottie overlays. The React Native client dynamically resolves and renders blocks via a **Component Registry (Factory Pattern)**.

## Architecture

```
Backend JSON
     ↓
Theme Provider (OTA theme from payload)
     ↓
Campaign Provider (3 campaigns + overlay config)
     ↓
FlashList (vertical feed)
     ↓
Block Renderer (memoized)
     ↓
Component Registry (factory lookup)
     ↓
Block Components (BannerHero, ProductGrid, DynamicCollection)
     ↓
Action Dispatcher (business logic)
     ↓
Zustand Store (cart state)
```

## Folder Structure

```
src/
├── assets/lottie/          # Local Lottie JSON (school, splash, confetti)
├── blocks/                 # SDUI block components
├── campaigns/              # Campaign engine + overlay
├── components/             # CartBadge, StickyHeader, DebugPanel
├── context/                # ThemeContext (OTA theme)
├── engine/
│   ├── registry/           # ComponentRegistry factory
│   ├── renderer/           # BlockRenderer
│   ├── dispatcher/           # ActionDispatcher
│   └── validation/           # blockValidation
├── hooks/                  # useProductCatalog, useDebugInfo
├── mocks/                  # homepage + campaign JSON payloads
├── screens/                # HomeScreen
├── state/                  # cartStore (Zustand)
├── types/                  # Strict TypeScript interfaces
├── utils/                  # formatters
└── App.tsx
```

## Setup Instructions

**Requirements:** Node.js 20+, Expo Go (SDK 54) on your device

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go. No EAS Build, prebuild, pod install, or native linking required.

```bash
npm run typecheck   # Verify TypeScript strict mode
```

## Features

| Feature | Description |
|---------|-------------|
| **BANNER_HERO** | Full-width hero banners with CTA actions |
| **PRODUCT_GRID_2X2** | 2×2 product grid sections |
| **DYNAMIC_COLLECTION** | Horizontal FlashList collections |
| **FULL_SCREEN_OVERLAY** | Lottie overlay with `pointerEvents="none"` |
| **Component Registry** | Factory pattern — no giant switch statements |
| **Action Dispatcher** | ADD_TO_CART, DEEP_LINK, OPEN_PRODUCT, APPLY_MYSTERY_GIFT_COUPON |
| **Campaign Engine** | Back To School, Summer Playhouse, Mystery Gift Carnival |
| **OTA Theme Engine** | Dynamic colors from JSON payload |
| **Debug Panel** | Campaign, components, cart, theme observability |
| **Resilience** | Gracefully skips `NEW_COMPONENT_V2` and unknown blocks |

## Performance Optimizations

- **React.memo** on ProductCard, all blocks, BlockRenderer, CartBadge, HomeScreen
- **useCallback** for FlashList `renderItem`, action handlers, campaign switcher
- **useMemo** for themed StyleSheets and block list derivation
- **Zustand selectors** — `useCartCount()` so only CartBadge re-renders on add-to-cart
- **FlashList** for vertical feed + nested horizontal collections
- **Stable keyExtractor** functions (`feedKeyExtractor`, `collectionKeyExtractor`)
- **Nested scroll** enabled on horizontal lists to avoid gesture conflicts

## State Management Strategy

Zustand powers cart state with selector-based subscriptions:

```typescript
// Only re-renders when cartCount changes
const cartCount = useCartStore((state) => state.cartCount);
```

UI components dispatch actions via `handleAction()` — they never mutate store directly except through the dispatcher for ADD_TO_CART.

## Campaign Engine

| Campaign | Theme | Overlay | Special |
|----------|-------|---------|---------|
| Back To School | Yellow + Blue | Flying paper airplanes (school.json) | Lunchboxes & Bags collection |
| Summer Playhouse | Ocean Blue | Water splash (splash.json) | Petting Zoo Tickets |
| Mystery Gift Carnival | Carnival Red | Confetti (confetti.json) | APPLY_MYSTERY_GIFT_COUPON action |

Switch campaigns via the sticky header chips. Theme updates instantly via ThemeContext.

## Theme Engine

Payload includes:

```json
{
  "theme": {
    "primary": "#FF9933",
    "background": "#FFF5E6"
  }
}
```

`ThemeProvider` merges payload with defaults. All components consume `useTheme()` — no hardcoded colors.

## Action Dispatcher

Centralized business logic in `ActionDispatcher.ts`:

- **ADD_TO_CART** — resolves product, updates Zustand store
- **DEEP_LINK** — logs/navigates to deep link URL
- **OPEN_PRODUCT** — product detail navigation hook
- **APPLY_MYSTERY_GIFT_COUPON** — applies carnival coupon via campaign handler

Components remain dumb — they only call `handleAction(action)`.

## Resilience Strategy

`blockValidation.ts` validates each block before render:

1. Unknown types (e.g. `NEW_COMPONENT_V2`) → console warning, skip block
2. Invalid data → skip with reason logged
3. Missing registry entry → UnsupportedBlock fallback (no crash)
4. App stability preserved at all times

## Screenshots Section

> Run the app in Expo Go and capture screenshots of:
> - Homepage with Popular Products grid
> - Back To School campaign with paper airplane overlay
> - Debug panel showing theme values and unsupported components
> - Cart badge after adding products

## Assumptions

- Product images use Unsplash CDN URLs (network required for images)
- Mock JSON replaces live backend API
- Deep link / navigation actions log to console (no react-navigation)
- Single homepage screen scope
- Expo Go SDK 54 compatibility verified with allowed dependencies only

## Future Improvements

- Wire real backend API with caching and stale-while-revalidate
- Add react-navigation for DEEP_LINK / OPEN_PRODUCT
- Skeleton loaders and image placeholders
- Analytics hooks in ActionDispatcher
- A/B test support via payload versioning
- Offline payload persistence with AsyncStorage
- Unit tests for validation and dispatcher
- E2E tests with Maestro

## Tech Stack

- Expo SDK 54 / React Native 0.81 / React 19.1
- TypeScript (strict mode)
- Zustand
- @shopify/flash-list
- expo-image
- lottie-react-native
- react-native-reanimated

## License

MIT — Assignment project for SDUI demonstration.
