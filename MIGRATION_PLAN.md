# IT Pro Direct - Telecom Equipment Liquidation Site

> **Version:** 1.0  
> **Last Updated:** January 20, 2026  
> **Contact:** nick@itprodirect.com  
> **Project Type:** Short-term liquidation site for surplus telecom equipment

---

## Executive Summary

**Purpose:** Sell surplus Ubiquiti airMAX and Cisco Meraki equipment from a family telecom business. Equipment was purchased for a large job that didn't happen several years ago.

**Target State:** Next.js static site on Vercel (free tier), AWS backend for contact/order forms, simple payment options (Wire/ACH free, PayPal +3%), local pickup emphasis for heavy items.

**Target Audience:** 
1. Family members in the telecom/WISP business (warm leads, already sold to some)
2. Local Tampa Bay area buyers (for heavy items like sector antennas)
3. eBay/secondary market buyers for shippable items

**Timeline:** 1-2 weeks for MVP launch

---

## Key Decisions

| Decision | Choice |
|----------|--------|
| **Frontend** | Next.js on Vercel (free tier) |
| **Backend** | AWS Lambda + API Gateway + SES |
| **Domain** | Vercel subdomain for now (e.g., `itprodirect-telecom.vercel.app`) |
| **Contact Email** | nick@itprodirect.com |
| **Payment - Free** | Wire transfer, ACH/bank transfer |
| **Payment - Fee** | PayPal (+3% to cover fees) |
| **Local Pickup** | Palm Harbor, FL / Tampa Bay area |
| **Bulk Tiers** | 5 units, 10+ units |
| **Product Images** | Placeholder system, owner adds real photos |

---

## Inventory Summary

| Product | SKU | Qty | Condition | Price Range (each) |
|---------|-----|-----|-----------|-------------------|
| Ubiquiti RocketM5 | RocketM5-US | 20+ | Tested/reset | $49-69 |
| Rocket Prism 5AC Gen2 | RP-5AC-Gen2-US | 20 | Tested/reset | $149-199 |
| airMAX Sector AM-5G20-90 | AM-5G20-90 | ~18 | Tested, rough boxes | $99-139 |
| PowerBeam AC Gen2 | PBE-5AC-Gen2-US | 2 | NEW/unopened | $169-199 |
| Meraki PoE Injector | MA-INJ-4 | 15 | Unused/open box | $39-59 |

**Total Estimated Value:** $8,000 - $12,000+ depending on sale method

---

## Pricing Strategy

### Individual Unit Pricing
Prices listed are "realistic" range - expect negotiation on larger orders.

### Bulk Discount Tiers

| Tier | Discount | Notes |
|------|----------|-------|
| 1-4 units | List price | Standard pricing |
| 5-9 units | 10% off | Small bulk |
| 10+ units | 15-20% off | Contact for quote |

### Payment Methods

| Method | Fee | Processing Time | Notes |
|--------|-----|-----------------|-------|
| Wire Transfer | Free | 1-2 business days | Preferred for large orders |
| ACH/Bank Transfer | Free | 2-3 business days | Good for domestic |
| PayPal | +3% | Immediate | Buyer pays fee |

### Shipping Notes
- **Sector Antennas (AM-5G20-90):** Heavy/bulky - local pickup strongly preferred, or buyer arranges freight
- **All other items:** USPS Priority or UPS Ground, actual cost + handling
- **Local pickup:** Free, Palm Harbor FL area

---

## Site Structure

```
/                       → Home (hero + featured products + contact CTA)
/products               → All products grid
/products/[sku]         → Individual product detail
/contact                → Contact form
/checkout               → Order form (selected items + payment choice)
/about                  → About IT Pro Direct + equipment backstory
```

### Pages Detail

**Home Page:**
- Hero: "Surplus Telecom Equipment - Ubiquiti & Meraki"
- Tagline: "Quality tested gear from a Tampa Bay telecom business"
- Featured products (3-4 items)
- "Local pickup available" callout
- Contact CTA

**Products Page:**
- Grid of all products with images, name, price range
- Filter by brand (Ubiquiti / Cisco Meraki)
- Filter by category (Radios / Antennas / Accessories)
- "Bulk pricing available" badge on items with 5+ qty

**Product Detail Page:**
- Large image gallery (placeholder system)
- Full description
- Condition notes
- Quantity available
- Pricing table (1-4, 5-9, 10+)
- "Add to Inquiry" or "Buy Now" buttons
- Shipping notes (especially for heavy items)

**Contact Page:**
- Simple form: Name, Email, Phone (optional), Message
- Direct email link as backup
- Location mention (Tampa Bay area)

**Checkout/Order Page:**
- Cart summary
- Payment method selection (Wire/ACH/PayPal)
- PayPal shows +3% fee in real-time
- Shipping vs. Local Pickup selection
- Order submission → triggers email to nick@itprodirect.com

---

## Phase Breakdown

### Phase 0: Pre-Development Setup
- [ ] Create GitHub repo
- [ ] Set up local dev environment (Node.js, Git Bash)
- [ ] Create Vercel account (if not exists)
- [ ] Verify AWS credentials available

### Phase 1: Foundation (Days 1-2)
- [ ] Initialize Next.js project with App Router
- [ ] Configure Tailwind CSS
- [ ] Create base layout (header, footer, nav)
- [ ] Set up product data structure (JSON)
- [ ] Create placeholder image system

### Phase 2: Core Pages (Days 3-4)
- [ ] Home page with hero and featured products
- [ ] Products listing page with filters
- [ ] Product detail page template
- [ ] About page
- [ ] Contact page (form UI only)

### Phase 3: AWS Backend (Days 5-6)
- [ ] Lambda function for contact form
- [ ] Lambda function for order submission
- [ ] API Gateway setup with CORS
- [ ] SES email configuration
- [ ] Connect frontend forms to AWS

### Phase 4: Checkout & Payment (Days 7-8)
- [ ] Shopping cart state (localStorage or React state)
- [ ] Checkout page with payment selection
- [ ] PayPal fee calculator (+3%)
- [ ] Order confirmation flow
- [ ] Email notifications (to owner + buyer)

### Phase 5: Polish & Deploy (Days 9-10)
- [ ] Add real product images
- [ ] SEO metadata
- [ ] Mobile responsiveness testing
- [ ] Vercel deployment
- [ ] End-to-end testing
- [ ] Go live

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Images not ready | Medium | Medium | Placeholder system works without images |
| PayPal integration complexity | Low | Medium | Use simple PayPal.me link + manual fee calc |
| Heavy items don't sell | Medium | Low | Price aggressively, emphasize local pickup |
| Spam form submissions | Medium | Low | Honeypot fields, rate limiting |
| AWS costs | Low | Low | Free tier covers expected volume |

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Site live on Vercel | Week 1 | Deployment successful |
| Forms working | Week 1 | Test submission received |
| First inquiry | Week 2 | Email received from site |
| First sale | Week 3 | Order completed |
| 50% inventory sold | Month 2 | Revenue tracking |

---

## External Requirements Checklist

See `EXTERNAL_REQUIREMENTS.md` for the complete list of items Nick needs to provide outside of Claude Code.

---

## Next Steps

1. **Review this plan** and confirm all decisions
2. **Initialize the GitHub repo** 
3. **Run Claude Code** with: "Read MIGRATION_PLAN.md and start with Phase 1 of IMPLEMENTATION_CHECKLIST.md"

---

*This plan will be updated as we progress.*
