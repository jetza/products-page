# Sofa Society Co. - E-Commerce Platform

**Product Page Implementation according to Figma Design**

Modern e-commerce platform built with Next.js 15, TypeScript, TailwindCSS, and Medusa v2, featuring a fully functional product detail page with variant selection, shopping cart, and multi-language support.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features Implemented](#features-implemented)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Development Time & Challenges](#development-time--challenges)
- [Additional Features (Beyond Requirements)](#additional-features-beyond-requirements)
- [Performance Optimizations](#performance-optimizations)
- [Future Improvements](#future-improvements)

---

## 🎯 Project Overview

This project implements a **Product Page** based on the provided Figma design, integrated with **Medusa v2** backend system using **Medusa JS SDK**. The main goal is to faithfully reproduce the design on both desktop and mobile devices, with a focus on code structure, readability, and core e-commerce functionalities.

### Core Requirements ✅

- ✅ **Product Detail Page** - Display product information according to Figma design
- ✅ **Add to Cart** - Add selected product variant to shopping cart
- ✅ **Cart Counter** - Display number of items in cart badge in header
- ✅ **Product Variants** - Materials and colors as product variants in Medusa Admin
- ✅ **Color Picker** - Hardcoded color name to HEX mapping for visual color selection

---

## 🛠 Tech Stack

### Frontend

- **Next.js 15.5.4** - React framework with App Router and Turbopack
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5** - Type safety and better DX
- **TailwindCSS 3.4** - Utility-first CSS framework
- **next-intl 4.3** - Internationalization (Croatian/English)
- **Medusa JS SDK 2.10.3** - Official Medusa client for API communication

### Backend

- **Medusa v2.10.3** - Headless commerce platform
- **PostgreSQL** - Database via MikroORM
- **Node.js 20+** - Runtime environment

### Additional Libraries

- **clsx + tailwind-merge** - Conditional CSS class management
- **react-window** - Virtual scrolling for large product lists
- **@fontsource/mona-sans** - Custom typography

---

## ✨ Features Implemented

### 1. Product Detail Page (`/shop/[slug]`)

**Core Functionality:**

- ✅ Product title, description, price display
- ✅ Product image carousel (4+ images with navigation)
- ✅ Material selection dropdown
- ✅ Color picker with visual color circles
- ✅ Quantity selector (increment/decrement)
- ✅ Add to Cart button with success notification
- ✅ Related products section (same collection)
- ✅ "Inspired Interior" gallery section

**Technical Implementation:**

```tsx
// Product variant matching logic
const matchingVariant = product.variants?.find((variant) => {
  const colorMatch = variantOptions.some(
    (opt) => opt.option.title === "Color" && opt.value === selectedColor,
  );
  const materialMatch = variantOptions.some(
    (opt) => opt.option.title === "Material" && opt.value === selectedMaterial,
  );
  return colorMatch && materialMatch;
});
```

### 2. Shopping Cart System

**Cart Context (`lib/cart-context.tsx`):**

- ✅ Global cart state management with React Context
- ✅ LocalStorage persistence (cart survives page refresh)
- ✅ Add, remove, update quantity operations
- ✅ Total items and price calculation
- ✅ Memoized context values for performance

**Cart Drawer (`components/ui/CartDrawer.tsx`):**

- ✅ Side drawer with overlay
- ✅ Cart items list with thumbnails
- ✅ Quantity controls per item
- ✅ Remove item functionality
- ✅ Total price summary
- ✅ Empty cart state

**Cart Badge:**

- ✅ Dynamic counter in header
- ✅ Updates in real-time when items added/removed

### 3. Product Variants

**Medusa Admin Configuration:**

- ✅ Product Options: `Color` and `Material`
- ✅ Multiple variants per product (e.g., "Light Gray / Velvet", "Black / Linen")
- ✅ Price calculation via Medusa's `calculated_price` API

**Color Mapping (`lib/constants/colors.config.ts`):**

```typescript
export const COLOR_VALUE_MAP: Record<string, string> = {
  "Light Gray": "var(--color-product-light-gray)",
  "Dark Gray": "var(--color-product-dark-gray)",
  Black: "var(--color-product-black)",
};
```

### 4. Responsive Design

- ✅ Mobile-first approach
- ✅ Breakpoints: `sm`, `md`, `lg`, `xl`
- ✅ Touch-friendly UI elements
- ✅ Mobile navigation drawer
- ✅ Responsive typography and spacing

---

## 📁 Project Structure

```
products-page/
├── frontend/                    # Next.js frontend application
│   ├── app/
│   │   ├── [locale]/           # Internationalized routes
│   │   │   ├── shop/
│   │   │   │   └── [slug]/     # Product detail page
│   │   │   ├── collection/     # Collection page with filters
│   │   │   ├── cart/           # Cart page
│   │   │   └── ...             # Other pages
│   │   ├── globals.css         # Global styles & CSS variables
│   │   └── layout.tsx          # Root layout
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── ColorPicker.tsx
│   │   │   ├── MaterialsSelect.tsx
│   │   │   ├── AddToCartSection.tsx
│   │   │   ├── CartDrawer.tsx
│   │   │   ├── CartItem.tsx
│   │   │   └── ...
│   │   ├── product/            # Product-specific components
│   │   │   ├── ProductImageCarousel.tsx
│   │   │   ├── RelatedProducts.tsx
│   │   │   └── CollectionInspiredInterior.tsx
│   │   ├── shop/               # Shop components
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   └── ...
│   │   ├── filters/            # Filter components
│   │   └── layout/             # Header, Footer, Navigation
│   ├── lib/
│   │   ├── cart-context.tsx    # Cart state management
│   │   ├── medusa-client.ts    # Medusa SDK configuration
│   │   ├── products-service.ts # Product API calls
│   │   ├── constants/          # Color config, content, etc.
│   │   └── utils/              # Helper functions
│   ├── types/
│   │   └── product.ts          # TypeScript types
│   ├── messages/               # i18n translations
│   │   ├── en.json
│   │   └── hr.json
│   └── public/                 # Static assets (images)
│
├── medusa-store/               # Medusa backend
│   ├── src/
│   │   ├── api/                # Custom API routes
│   │   ├── scripts/            # Seed scripts
│   │   │   └── seed-sofa-society.ts
│   │   └── ...
│   ├── medusa-config.ts        # Medusa configuration
│   └── public/                 # Product images
│
└── README.md                   # This file
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js 20+** (required for Medusa v2)
- **PostgreSQL** (or use Docker)
- **npm** or **yarn**

### 1. Clone Repository

```bash
git clone https://github.com/jetza/products-page.git
cd products-page
```

### 2. Setup Medusa Backend

```bash
cd medusa-store

# Install dependencies
npm install

# Create .env file
cp .env.template .env

# Configure database connection in .env
DATABASE_URL=postgres://user:password@localhost:5432/medusa-store

# Run migrations
npx medusa db:migrate

# Seed database with products
npm run seed

# Create admin user
npx medusa user -e admin@test.com -p supersecret

# Start Medusa server (runs on http://localhost:9000)
npm run dev
```

**Medusa Admin:** Access at `http://localhost:9000/app`

### 3. Setup Next.js Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env.local file
touch .env.local

# Add Medusa backend URL
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=your_publishable_key_here
```

**Get Publishable Key:**

1. Go to Medusa Admin → Settings → Publishable API Keys
2. Create new key or copy existing one
3. Paste into `.env.local`

```bash
# Start Next.js development server (runs on http://localhost:3000)
npm run dev
```

### 4. Access Application

- **Frontend:** http://localhost:3000
- **Medusa Admin:** http://localhost:9000/app
- **Medusa API:** http://localhost:9000/store

---

## ⏱ Development Time & Challenges

### Development Timeline: **October 9 - October 19, 2025 (11 days)**

**Total Time Estimate: ~80-90 hours**

Based on Git commit history and development log, here's the detailed breakdown:

### Phase 1: Initial Setup & Foundation (Oct 9, Day 1 - 8h)

| Task                      | Time | Commits              | Notes                                             |
| ------------------------- | ---- | -------------------- | ------------------------------------------------- |
| Medusa Store Setup        | 2h   | `1825ea8`, `6e56458` | PostgreSQL configuration, initial Medusa v2 setup |
| Next.js 15 Setup          | 1.5h | `32012ad`            | Next.js with App Router, TypeScript, Turbopack    |
| Medusa JS SDK Integration | 1.5h | `9abddcd`            | SDK configuration, API client setup               |
| Color System & Seeds      | 2h   | `296fd32`            | Color mappings, initial product seeds             |
| Dependencies              | 1h   | `03d0b75`            | react-colorful, foundational libraries            |

### Phase 2: Core Components & Design System (Oct 9-10, Days 1-2 - 12h)

| Task                      | Time | Commits              | Notes                                                      |
| ------------------------- | ---- | -------------------- | ---------------------------------------------------------- |
| Product Types & API       | 2h   | `03c1952`, `03d0b75` | TypeScript types, API structure                            |
| Typography & Color System | 3h   | `f2b05e8`            | Custom design system from Figma, CSS variables             |
| **Tailwind Bug Fix**      | 2h   | `14e8481`            | **Tailwind 4.0 issues, downgraded to 3.4, major refactor** |
| Buttons & Inputs          | 2h   | `fcfea88`            | Base UI components following design system                 |
| Icons Library             | 1h   | `e1b88f0`            | Custom icon components                                     |
| **Image Organization**    | 2h   | -                    | **Renaming Figma exports, organizing in folders**          |

### Phase 3: Account Pages & Components (Oct 12, Day 4 - 10h)

| Task                        | Time | Commits                         | Notes                                                             |
| --------------------------- | ---- | ------------------------------- | ----------------------------------------------------------------- |
| Mobile Menu & Order Summary | 2h   | `0eae81a`                       | Mobile navigation components                                      |
| User Account Components     | 3h   | `9c18232`, `16db75e`, `f338359` | UserData, Address, DefaultAddress                                 |
| Order Components            | 2h   | `684d7df`                       | OrderItem, OrderSummary components                                |
| Modals System               | 2h   | `e15a2bc`                       | **Created modal system (later realized unclear usage in design)** |
| **Design Interpretation**   | 1h   | -                               | **Figma didn't have developer mode, manual measurements**         |

### Phase 4: Header, Footer & Cart (Oct 13, Day 5 - 9h)

| Task                       | Time | Commits   | Notes                                                                    |
| -------------------------- | ---- | --------- | ------------------------------------------------------------------------ |
| Header & Footer            | 3h   | `266e0eb` | Layout components, navigation                                            |
| Cart Context & Drawer      | 4h   | `ef811bc` | **Cart state management, localStorage persistence, SSR hydration fixes** |
| **LocalStorage Hydration** | 2h   | -         | **SSR/Client mismatch debugging, cart persistence issues**               |

### Phase 5: Shop Integration & API (Oct 13-14, Days 5-6 - 12h)

| Task                         | Time | Commits              | Notes                                                       |
| ---------------------------- | ---- | -------------------- | ----------------------------------------------------------- |
| Medusa API Integration       | 5h   | `68d84d2`            | **Shop page, filters, product fetching, Medusa v2 pricing** |
| **Medusa v2 Pricing Issues** | 3h   | `1d9c5a8`            | **calculated_price fields, region setup, type assertions**  |
| Color System Refactor        | 2h   | `b58f33b`, `aff3470` | Tailwind classes, CSS variables for dynamic colors          |
| Typography Refactor          | 1h   | `15a5dae`            | Custom design system font sizes                             |
| 404 & Privacy Pages          | 1h   | `c3ca198`            | Error pages, legal pages                                    |

### Phase 6: Main Pages (Oct 14, Day 6 - 8h)

| Task                 | Time | Commits              | Notes                                                  |
| -------------------- | ---- | -------------------- | ------------------------------------------------------ |
| Register Page        | 2h   | `21d80e8`            | User registration form                                 |
| Home Page & Carousel | 3h   | `0c8e093`            | **Custom touch-swipe carousel, no external libraries** |
| Header Variants      | 1h   | `d3d91ea`, `417e45a` | Transparent header for hero sections                   |
| Collections Page     | 2h   | `417e45a`            | Collection browsing with filters                       |

### Phase 7: Cart & Checkout Flow (Oct 14-15, Days 6-7 - 6h)

| Task          | Time | Commits   | Notes                              |
| ------------- | ---- | --------- | ---------------------------------- |
| Cart Page     | 3h   | `fb595b4` | Full cart view, footer refactoring |
| Checkout Page | 3h   | `8d56817` | Multi-step checkout UI             |

### Phase 8: Product Page & Filters (Oct 15, Day 7 - 10h)

| Task                   | Time | Commits              | Notes                                                       |
| ---------------------- | ---- | -------------------- | ----------------------------------------------------------- |
| Product Detail Page    | 5h   | `791c190`, `aa70b0a` | **Layout, variant selection, carousel integration**         |
| **Product Carousel**   | 2h   | `aa70b0a`            | **Touch gestures, smooth transitions, mobile optimization** |
| Filter Components      | 2h   | `ccbbddd`            | Collection-specific filters, loading states                 |
| Mobile/Desktop Layouts | 1h   | `1327bca`            | Responsive spacing, filter dropdowns                        |

### Phase 9: Order & Refactoring (Oct 16-17, Days 8-9 - 12h)

| Task                  | Time | Commits   | Notes                                                       |
| --------------------- | ---- | --------- | ----------------------------------------------------------- |
| Order Confirmation    | 2h   | `e0a3621` | Order review page                                           |
| **Major Refactoring** | 6h   | `c34b258` | **Code organization, component extraction, file structure** |
| **Image Refactoring** | 2h   | `f8ef889` | **Renaming, organizing, optimizing images**                 |
| **Bug Corrections**   | 2h   | `c8f8d13` | **Cross-browser testing, edge cases**                       |

### Phase 10: Polish & Features (Oct 18, Day 10 - 10h)

| Task                     | Time | Commits              | Notes                                          |
| ------------------------ | ---- | -------------------- | ---------------------------------------------- |
| Product Seeds            | 1h   | `183773d`            | Updated seed data                              |
| **Cart Badge Component** | 1h   | `f9c73d3`            | **Badge counter (not in Figma, added for UX)** |
| Filter Data              | 1h   | `31fcb56`            | Filter options, product metadata               |
| Email Templates          | 2h   | `df60673`            | Order confirmation, welcome emails             |
| Search Logic             | 2h   | `ca57b3d`            | Product search implementation                  |
| Sort/Filter Fixes        | 1h   | `13df7f9`            | SortBy dropdown fixes                          |
| **Internationalization** | 2h   | `b50e49e`, `a88d7ff` | **Extracting strings, translation files**      |

### Phase 11: Localization & UX (Oct 18-19, Days 10-11 - 8h)

| Task                       | Time | Commits              | Notes                                       |
| -------------------------- | ---- | -------------------- | ------------------------------------------- |
| Link/Button Fixes          | 1h   | `529bed7`            | Semantic HTML corrections                   |
| Collection Filters         | 1h   | `e9448eb`            | Filter logic fixes                          |
| Mobile Filter Drawer       | 1h   | `9da8a82`            | Mobile filter UI fixes                      |
| **Folder Restructure**     | 2h   | `8178ba8`            | **Locale routing, i18n setup**              |
| **Navigation Fixes**       | 2h   | `26d7cbd`, `6dc4236` | **Localization routing, 404 handling**      |
| **Notification Component** | 1h   | `df0e7b4`, `364c407` | **Add to cart notification (not in Figma)** |

### Phase 12: Final Polish & Optimization (Oct 19, Day 11 - 8h)

| Task                              | Time | Commits              | Notes                             |
| --------------------------------- | ---- | -------------------- | --------------------------------- |
| ESLint & Formatting               | 2h   | `2275181`            | Code quality, linting rules       |
| Favicon & SEO                     | 1h   | `93821f4`, `638c2e1` | Metadata, thumbnails, basic SEO   |
| **Search Debounce**               | 2h   | `01ca91d`            | Search optimization, memoization  |
| **Component Memoization**         | 2h   | `38b1a60`            | 26 components with React.memo     |
| **Lazy Loading & Virtualization** | 1h   | `6f77186`            | Code splitting, virtual scrolling |

---

### 🔥 Most Challenging Parts & Issues Encountered

#### 1. **Tailwind 4.0 Bug & Downgrade (2+ hours)**

**Problem:** Tailwind 4.0 version had breaking changes and compatibility issues.  
**Solution:** Downgraded to Tailwind 3.4 and refactored all configurations.  
**Commit:** `14e8481` - "revert to previous vesion of tailwind and refactor"

#### 2. **Figma Image Management (4+ hours)**

**Problem:** Images from Figma didn't have proper names, required extensive manual work.  
**Solution:** Spent significant time renaming and organizing images in folder structure.  
**Impact:** Slowed down development, required multiple refactoring sessions.  
**Commits:** `f8ef889` - "refactor images"

#### 3. **No Figma Developer Mode (ongoing)**

**Problem:** Didn't have developer access, had to manually measure elements and extract values.  
**Impact:** Increased time for component implementation, manual spacing/sizing calculations.  
**Solution:** Used Figma inspect mode + manual CSS adjustments.

#### 4. **Component Organization (6+ hours)**

**Problem:** Large project with many components needed clear structure for easy navigation.  
**Solution:** Multiple refactoring sessions to organize folders logically.  
**Commits:** `c34b258` - "refactor: everything :)", `8178ba8` - "change folder structure, add locale"

#### 5. **Figma Design Inconsistencies (3+ hours)**

**Issues:**

- Shop page had different product images on desktop vs mobile views
- Some pages (e.g., Welcome page) had no clear navigation path
- No specification for modal usage
- Missing notification design for "Add to Cart" action
- No cart badge design specified

**Solutions:**

- Created custom notification component: `364c407`
- Added cart badge component: `f9c73d3`
- Made design decisions based on best practices

#### 6. **Medusa v2 SDK Integration (8+ hours)**

**Problems:**

- Limited v2 documentation
- Type mismatches in SDK (required type assertions)
- Region-based pricing not well documented
- `calculated_price` field missing from types

**Solutions:**

- Manual type assertions for API calls
- Region caching implementation
- Extensive debugging and API exploration

**Commits:** `68d84d2`, `1d9c5a8` - Medusa API integration and pricing

#### 7. **Product Variant Matching (4+ hours)**

**Problem:** Complex variant structure (Color + Material combinations), not all combinations exist.  
**Solution:** Robust matching algorithm with fallback to default variant.  
**Code:** Custom variant matching logic in product page

#### 8. **SSR Hydration with LocalStorage (3+ hours)**

**Problem:** Server-side rendering caused hydration mismatches when loading cart from localStorage.  
**Solution:** Controlled loading state, conditional saving to prevent infinite loops.  
**Commit:** `ef811bc` - Cart context with localStorage

#### 9. **Touch-Swipe Carousel (3+ hours)**

**Problem:** Needed smooth touch carousel without external libraries to match Figma design.  
**Solution:** Custom touch event handling with gesture threshold and smooth transitions.  
**Commits:** `0c8e093`, `aa70b0a` - Carousel implementation

#### 10. **Internationalization Setup (4+ hours)**

**Problem:** Extracting hardcoded strings, setting up locale routing, translation files.  
**Solution:** Complete i18n setup with next-intl, Croatian and English support.  
**Commits:** `b50e49e`, `8178ba8`, `26d7cbd` - i18n implementation and fixes

#### 11. **Hardware Limitations (ongoing)**

**Problems:**

- MacBook Pro with 32GB RAM was freezing frequently
- No second monitor slowed down Figma-to-code workflow
- Had to constantly switch between Figma and IDE

**Impact:** Significant productivity loss, estimated 10-15% slower development time.

---

### 📊 Time Distribution

| Category                       | Estimated Hours | % of Total |
| ------------------------------ | --------------- | ---------- |
| **Setup & Infrastructure**     | 10h             | 12%        |
| **Core Components & UI**       | 20h             | 23%        |
| **Medusa Integration**         | 12h             | 14%        |
| **Pages & Features**           | 18h             | 21%        |
| **Refactoring & Bug Fixes**    | 12h             | 14%        |
| **Optimization & Performance** | 5h              | 6%         |
| **i18n & Localization**        | 6h              | 7%         |
| **Image Management**           | 4h              | 5%         |
| **Hardware/Tooling Issues**    | 8h              | 9%         |
| **Total**                      | **~85-90h**     | **100%**   |

## **Note:** Actual calendar time was 11 days (Oct 9-19), but work included evenings and weekends, averaging 7-8 hours per day.

## 🚀 Additional Features (Beyond Requirements)

### Filtering & Search

- [x] Full-text product search
- [x] Search-as-you-type with debouncing

### Internationalization

- [x] Croatian (hr) language support
- [x] English (en) language support
- [x] Language switcher in header
- [x] URL-based locale routing

### Performance Optimizations

- [x] React.memo on 26 components
- [x] useCallback for event handlers
- [x] useMemo for expensive calculations
- [x] React.lazy + Suspense for code splitting
- [x] Virtual scrolling for 100+ product lists
- [x] Image lazy loading (11 components)
- [x] Bundle optimization (29% reduction)

## 🧪 Testing

This project has comprehensive test coverage using Jest and React Testing Library.

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Coverage Report

```
File                 | % Stmts | % Branch | % Funcs | % Lines
---------------------|---------|----------|---------|--------
All files            |   96.06 |    83.75 |   92.85 |   96.06
 components/ui       |   94.47 |    86.66 |   66.66 |   94.47
  ColorPicker.tsx    |     100 |      100 |     100 |     100
  FadeInOnScroll.tsx |   92.03 |       60 |       0 |   92.03
 lib                 |   95.36 |    76.47 |     100 |   95.36
  cart-context.tsx   |   95.36 |    76.47 |     100 |   95.36
 lib/utils           |     100 |    90.32 |     100 |     100
  cn.ts              |     100 |      100 |     100 |     100
  product-utils.ts   |     100 |       90 |     100 |     100
```

### Test Files

- `__tests__/cart-context.test.tsx` - Shopping cart functionality (9 tests)
- `components/ui/__tests__/FadeInOnScroll.test.tsx` - Scroll animations (10 tests)
- `components/ui/__tests__/ColorPicker.test.tsx` - Color selection (7 tests)
- `lib/utils/__tests__/product-utils.test.ts` - Product utilities (18 tests)
- `lib/utils/__tests__/cn.test.ts` - Class name utility (8 tests)

## 👨‍💻 Author

**Jelena Miodragovic**

- GitHub: [@jetza](https://github.com/jetza)

---

## 📄 License

This project is created as a technical assessment task for Medusa e-commerce implementation.

---

## 🙏 Acknowledgments

- **Figma Design:** Provided by the hiring team
- **Medusa v2:** Official documentation and community
- **Next.js Team:** Excellent documentation and examples
- **TailwindCSS:** For making styling enjoyable

---

**Last Updated:** October 19, 2025
