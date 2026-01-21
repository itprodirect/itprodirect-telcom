# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Telecom equipment liquidation e-commerce site for IT Pro Direct. Sells surplus Ubiquiti airMAX and Cisco Meraki networking equipment. Target: Tampa Bay area buyers with emphasis on local pickup for heavy items.

**Status:** Pre-development planning phase. No code exists yet - only documentation.

## Technology Stack

- **Frontend:** Next.js 14+ with App Router, TypeScript, Tailwind CSS
- **Hosting:** Vercel (free tier)
- **Backend:** AWS Lambda (Node.js 18) + API Gateway + SES for email
- **State:** React Context + localStorage for cart persistence
- **Validation:** Zod schemas

## Build & Development Commands

```bash
# After Phase 1 initialization (not yet done)
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
├── checkout/page.tsx       # Cart + checkout flow
├── about/page.tsx
└── api/
    ├── contact/route.ts    # Proxy to AWS Lambda
    └── orders/route.ts     # Proxy to AWS Lambda

components/
├── layout/                 # Header, Footer, Nav
├── products/               # ProductCard, ProductGrid, PricingTable, ProductGallery
├── forms/                  # ContactForm, CheckoutForm, PaymentSelector
├── cart/                   # CartProvider, CartSummary, AddToCart
└── ui/                     # Button, Input, Badge, ProductImage

lib/
├── products.ts             # Product data loading from JSON
├── pricing.ts              # Tier pricing calculations, formatCurrency
├── cart.ts                 # Cart context/state management
├── validation.ts           # Zod schemas for forms
└── api.ts                  # AWS API client functions

data/products.json          # Product inventory (manual updates)
```

## Key Domain Concepts

- **Tiered Pricing:** Products have 3 tiers (1-4 units, 5-9 units, 10+ units) with bulk discounts
- **Payment Methods:** Wire (free), ACH (free), PayPal (+3% fee passed to buyer)
- **Shipping:** Local pickup in Palm Harbor, FL preferred for heavy items (sector antennas); USPS/UPS for shippable items
- **Product Conditions:** new, like-new, tested-working, as-is

## Environment Variables

Copy `.env.example` to `.env.local`:
- `NEXT_PUBLIC_API_URL` - AWS API Gateway endpoint (required after AWS setup)
- `NEXT_PUBLIC_PAYPAL_FEE_PERCENT` - PayPal fee percentage (default: 3)

## AWS Lambda Functions

Located in `lambda/` folder (code templates in AWS_INTEGRATION.md):
- `itprodirect-contact` - Contact form handler, sends email via SES
- `itprodirect-orders` - Order handler, sends confirmation emails to owner and buyer

## Implementation Phases

Follow `IMPLEMENTATION_CHECKLIST.md` sequentially:
1. **Phase 0:** Pre-dev setup (repo, local env)
2. **Phase 1:** Next.js foundation, types, layout, product data
3. **Phase 2:** Core pages (home, products, detail, about, contact)
4. **Phase 3:** AWS backend (Lambda, API Gateway, SES)
5. **Phase 4:** Cart and checkout flow
6. **Phase 5:** Polish, images, Vercel deployment

## Reference Documentation

- `ARCHITECTURE.md` - System diagrams, component tree, API contracts
- `DATA_MODEL.md` - TypeScript interfaces, products.json schema, helper functions
- `AWS_INTEGRATION.md` - Lambda code, API Gateway setup, SES configuration
- `EXTERNAL_REQUIREMENTS.md` - Items owner must provide (AWS creds, product images, payment details)
