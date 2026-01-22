# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Telecom equipment liquidation e-commerce site for IT Pro Direct. Sells surplus Ubiquiti airMAX and Cisco Meraki networking equipment. Target: Tampa Bay area buyers with emphasis on local pickup.

**Status:** Phases 0-3 complete. Phase 4 (order request page) in progress.

**Business Model:** Simplified "order request" flow - no online payment processing. Owner contacts customers to confirm availability, arrange pickup/shipping, and collect payment offline.

## Technology Stack

- **Frontend:** Next.js 14+ with App Router, TypeScript, Tailwind CSS
- **Hosting:** Vercel (free tier)
- **Backend:** AWS Lambda (Node.js 18) + API Gateway (HTTP API) + SES for email
- **State:** React useState for forms (no cart state needed)
- **Validation:** Zod schemas

## Build & Development Commands

```bash
npm run dev              # Start dev server at localhost:3000
npm run build            # Production build
npm run start            # Start production server
npm run lint             # ESLint
```

## Architecture

```
app/
├── layout.tsx              # Root layout with Header/Footer
├── page.tsx                # Home page
├── products/
│   ├── page.tsx            # Products listing with filters
│   └── [sku]/page.tsx      # Product detail (dynamic route)
├── contact/page.tsx        # Contact form
├── checkout/page.tsx       # Order request form (to be created)
└── about/page.tsx

components/
├── layout/                 # Header, Footer, Nav
├── products/               # ProductCard, ProductGrid, PricingTable, ProductGallery
├── forms/                  # ContactForm, OrderRequestForm (to be created)
└── ui/                     # Button, Input, Badge, ProductImage

lib/
├── products.ts             # Product data loading from JSON
├── pricing.ts              # formatCurrency, getTierLabel (display helpers)
├── validation.ts           # Zod schemas for forms
└── api.ts                  # AWS API client functions

data/products.json          # Product inventory (manual updates)
```

## Key Domain Concepts

- **Tiered Pricing (Display Only):** Products show 3 tiers (1-4 units, 5-9 units, 10+ units) for reference. Actual pricing confirmed by owner.
- **Order Request Flow:** No cart, no online payment. User submits request → owner emails → owner contacts customer.
- **Fulfillment:** Local pickup in Palm Harbor, FL preferred. Shipping available by arrangement.
- **Product Conditions:** new, like-new, tested-working, as-is

## Environment Variables

For local development, create `.env.local`:
```
NEXT_PUBLIC_API_URL=https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com
```

For Vercel, set in dashboard:
- `NEXT_PUBLIC_API_URL` - AWS API Gateway endpoint (required)

## AWS Lambda Functions

Located in `lambda/` folder:
- `itprodirect-contact` - Contact form handler, sends email via SES
- `itprodirect-orders` - Order request handler, sends notification to owner

**Working API Endpoints:**
- POST /contact - `{ name, email, message }`
- POST /orders - `{ customer: { name, phone, email }, items: [{ sku, name, qty }], fulfillment: { method }, notes }`

## Current Phase: Phase 4 Tasks

See `IMPLEMENTATION_CHECKLIST.md` for detailed tasks. Summary:

1. Create `/checkout` page with order request form
2. Create `OrderRequestForm` component
3. Update validation schema for simplified order
4. Update API client to match Lambda payload
5. Update product detail page "Contact to Order" button
6. Update header navigation (change "Cart" to "Order")

## Reference Documentation

- `ARCHITECTURE.md` - System diagrams, component tree, API contracts
- `DATA_MODEL.md` - TypeScript interfaces, products.json schema, validation schemas
- `AWS_INTEGRATION.md` - Lambda code, API Gateway setup, SES configuration
- `IMPLEMENTATION_CHECKLIST.md` - Phase tasks with checkboxes
- `MIGRATION_PLAN.md` - Overall project plan and status
