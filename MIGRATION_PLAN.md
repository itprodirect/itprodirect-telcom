# IT Pro Direct - Telecom Equipment Liquidation Site

> **Version:** 1.1
> **Last Updated:** January 22, 2026
> **Contact:** nick@itprodirect.com
> **Project Type:** Short-term liquidation site for surplus telecom equipment

---

## Executive Summary

**Purpose:** Sell surplus Ubiquiti airMAX and Cisco Meraki equipment from a family telecom business. Equipment was purchased for a large job that didn't happen several years ago.

**Target State:** Next.js static site on Vercel (free tier), AWS backend for contact/order forms, **simplified "order request" model** with local pickup emphasis.

**Business Model:** No online payment processing. Owner contacts customers to confirm availability, arrange pickup/shipping, and collect payment offline.

**Target Audience:**
1. Family members in the telecom/WISP business (warm leads)
2. Local Tampa Bay area buyers (for heavy items like sector antennas)
3. eBay/secondary market buyers for shippable items

**Status:** Phases 0-3 complete. Phase 4 (order request page) in progress.

---

## Key Decisions

| Decision | Choice |
|----------|--------|
| **Frontend** | Next.js 14+ on Vercel (free tier) |
| **Backend** | AWS Lambda + API Gateway (HTTP API) + SES |
| **Order Flow** | Simplified "order request" - no online payment |
| **Fulfillment** | Local pickup preferred, shipping available by arrangement |
| **Payment** | Handled offline (Wire/ACH/PayPal/Cash) after owner contact |
| **Domain** | Vercel subdomain for now |
| **Contact Email** | nick@itprodirect.com |
| **Location** | Palm Harbor, FL (Tampa Bay area) |

---

## Inventory Summary

| Product | SKU | Qty | Condition | Price Range |
|---------|-----|-----|-----------|-------------|
| Ubiquiti RocketM5 | RocketM5-US | 20+ | Tested/reset | $49-69 |
| Rocket Prism 5AC Gen2 | RP-5AC-Gen2-US | 20 | Tested/reset | $149-199 |
| airMAX Sector AM-5G20-90 | AM-5G20-90 | ~18 | Tested | $99-139 |
| PowerBeam AC Gen2 | PBE-5AC-Gen2-US | 2 | NEW/unopened | $169-199 |
| Meraki PoE Injector | MA-INJ-4 | 15 | Unused | $39-59 |

**Total Estimated Value:** $8,000 - $12,000+

---

## Pricing Strategy

### Volume Discount Tiers (Display Only)

| Tier | Discount | Notes |
|------|----------|-------|
| 1-4 units | List price | Standard pricing |
| 5-9 units | 10% off | Small bulk |
| 10+ units | 15-20% off | Contact for quote |

### Payment Methods (Handled Offline)

| Method | Fee | Notes |
|--------|-----|-------|
| Wire Transfer | Free | Preferred for large orders |
| ACH/Bank Transfer | Free | 2-3 business days |
| PayPal | +3% | Buyer pays fee if choosing PayPal |
| Cash | Free | Local pickup only |

### Fulfillment

- **Local Pickup (Preferred):** Free, Palm Harbor FL area
- **Shipping:** Contact owner to arrange - actual cost + handling
- **Heavy Items (Sector Antennas):** Local pickup strongly recommended

---

## Site Structure

```
/                       → Home (hero + featured products + contact CTA)
/products               → All products grid with filters
/products/[sku]         → Individual product detail
/contact                → Contact form (general inquiries)
/checkout               → Order request form (simplified)
/about                  → About IT Pro Direct + equipment backstory
```

### Order Request Flow

1. User browses products, sees pricing tiers (reference)
2. User clicks "Contact to Order" on product detail page
3. User goes to /checkout with product pre-selected
4. User fills simple form: name, phone, items, notes
5. Form submits to AWS → email sent to owner
6. Owner contacts customer to:
   - Confirm item availability
   - Arrange pickup time OR discuss shipping
   - Collect payment

**Key Point:** No cart, no payment processing on website. Simple request form.

---

## Phase Breakdown

### Phase 0: Pre-Development Setup [COMPLETE]
- [x] Create GitHub repo
- [x] Set up local dev environment
- [x] Create Vercel account
- [x] Verify AWS credentials

### Phase 1: Foundation [COMPLETE]
- [x] Initialize Next.js project with App Router
- [x] Configure Tailwind CSS
- [x] Create base layout (header, footer, nav)
- [x] Set up product data structure (JSON)
- [x] Create placeholder image system

### Phase 2: Core Pages [COMPLETE]
- [x] Home page with hero and featured products
- [x] Products listing page with filters
- [x] Product detail page
- [x] About page
- [x] Contact page with working form

### Phase 3: AWS Backend [COMPLETE]
- [x] Lambda function for contact form
- [x] Lambda function for order requests
- [x] API Gateway HTTP API with CORS
- [x] SES email configuration
- [x] Connect frontend contact form to AWS

### Phase 4: Order Request Page [IN PROGRESS]
- [ ] Create /checkout page with order request form
- [ ] Simple form: name, phone, email, items, notes
- [ ] Connect to AWS /orders endpoint
- [ ] Update product detail "Contact to Order" button
- [ ] Update header navigation

### Phase 5: Polish & Deploy [PENDING]
- [ ] Add real product images
- [ ] SEO metadata
- [ ] Mobile responsiveness testing
- [ ] Final Vercel deployment
- [ ] End-to-end testing
- [ ] Go live

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Images not ready | Medium | Medium | Placeholder system works without images |
| Heavy items don't sell | Medium | Low | Price aggressively, emphasize local pickup |
| Spam form submissions | Medium | Low | Honeypot fields, validation |
| AWS costs | Low | Low | Free tier covers expected volume |

---

## Success Metrics

| Metric | Target | Status |
|--------|--------|--------|
| Site live on Vercel | Week 1 | Complete |
| Contact form working | Week 1 | Complete |
| Order request form working | Week 2 | In Progress |
| First inquiry | Week 2 | - |
| First sale | Week 3 | - |
| 50% inventory sold | Month 2 | - |

---

## External Requirements

See `EXTERNAL_REQUIREMENTS.md` for items owner needs to provide:
- Product images (can be added incrementally)
- Final inventory counts
- Vercel environment variable (API URL)

---

## Next Steps

1. **Complete Phase 4** - Create order request page and form
2. **Test order flow** - Verify emails arrive with order details
3. **Add product images** - Take photos, upload to repo
4. **Go live** - Share with family/network

---

*This plan will be updated as we progress.*
