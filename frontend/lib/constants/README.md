# Constants Directory Structure

This directory contains all application constants organized by purpose.

## 📁 Directory Structure

```
constants/
├── content.ts                          # 🌍 UI text content (i18n ready)
├── seo.ts                              # SEO metadata
│
├── *.config.ts                         # ⚙️ Configuration files
│   ├── colors.config.ts                # Color palette mappings
│   ├── countries.config.ts             # Country list for forms
│   ├── filter-options.config.ts        # Shop filter options
│   ├── furniture-filters.config.ts     # Furniture-specific filters
│   ├── footer-links.config.ts          # Footer navigation links
│   └── supported-countries.config.ts   # Supported shipping countries
│
├── *.data.ts                           # 📊 Data files
│   ├── collections.data.ts             # Collection definitions
│   ├── mock-email-order.data.ts        # Mock order for email templates
│   └── mock-orders.data.ts             # Mock orders for testing
│
└── pages/                              # 📄 Page-specific content
    ├── home.content.ts                 # Home page content
    ├── about.content.ts                # About page content
    └── inspiration.content.ts          # Inspiration page content
```

## 📝 File Naming Convention

- **`content.ts`** - Main UI text content for internationalization
- **`*.config.ts`** - Configuration & settings (colors, countries, options)
- **`*.data.ts`** - Data structures (collections, mock data)
- **`pages/*.content.ts`** - Page-specific content

## 🎯 Usage Guidelines

### UI Text (`content.ts`)

Use for **all user-facing text** that needs translation:

```typescript
import { CONTENT } from "@/lib/constants/content";

// ✅ Good
<h1>{CONTENT.product.title}</h1>
<button>{CONTENT.common.addToCart}</button>

// ❌ Bad
<h1>Product</h1>
<button>Add to cart</button>
```

### Configuration (`*.config.ts`)

Use for **settings and options**:

```typescript
import { getColorValue } from "@/lib/constants/colors.config";
import { FILTER_OPTIONS } from "@/lib/constants/filter-options.config";
```

### Data (`*.data.ts`)

Use for **structured data**:

```typescript
import { collections } from "@/lib/constants/collections.data";
import { mockOrders } from "@/lib/constants/mock-orders.data";
```

### Page Content (`pages/*.content.ts`)

Use for **page-specific content** (images, sections):

```typescript
import { homeContent } from "@/lib/constants/pages/home.content";
```

## 🌍 Internationalization (i18n)

The `content.ts` file is the **single source of truth** for all UI text. When implementing i18n:

1. All text is centralized in `content.ts`
2. Use nested structure for organization
3. Keep data/config separate from translatable content
4. Page content (`pages/*.content.ts`) contains page structure, not UI text

## 🔄 Migration Notes

**Previous → New naming:**

- `collections.ts` → `collections.data.ts`
- `mockOrders.ts` → `mock-orders.data.ts`
- `mock-data.ts` → `mock-email-order.data.ts`
- `colors.ts` → `colors.config.ts`
- `countries.ts` → `countries.config.ts`
- `filter-options.ts` → `filter-options.config.ts`
- `furniture-filter-options.ts` → `furniture-filters.config.ts`
- `footer-links.ts` → `footer-links.config.ts`
- `supported-countries.ts` → `supported-countries.config.ts`
- `home/home-content.ts` → `pages/home.content.ts`
- `about/about-content.ts` → `pages/about.content.ts`
- `inspiration/inspiration-content.ts` → `pages/inspiration.content.ts`

**Deleted files:**

- `index.ts` - Unused barrel export
- `collection-details.ts` - Unused collection details
