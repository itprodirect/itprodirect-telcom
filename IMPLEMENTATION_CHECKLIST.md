# Implementation Checklist - IT Pro Direct Telecom Equipment Site

> **Last Updated:** January 20, 2026  
> **How to use:** Work through tasks sequentially. Each task builds on the previous.

---

## Phase 0: Pre-Development Setup

### 0.1 Local Environment
- [ ] **Verify Node.js installed** (v18+ recommended)
  ```bash
  node --version
  npm --version
  ```
- [ ] **Verify Git Bash is working**
  ```bash
  git --version
  ```

### 0.2 Create GitHub Repository
- [ ] **Create new repo on GitHub**
  - Name: `itprodirect-telecom` (or similar)
  - Public or Private (your choice)
  - Initialize with README: No (we'll push our own)
- [ ] **Clone locally**
  ```bash
  cd /c/Dev/itprodirect  # or your preferred path
  git clone https://github.com/YOUR-USERNAME/itprodirect-telecom.git
  cd itprodirect-telecom
  ```

### 0.3 Copy Planning Docs
- [ ] **Copy all planning documents to repo**
  - `MIGRATION_PLAN.md` → repo root
  - `IMPLEMENTATION_CHECKLIST.md` → repo root
  - `docs/ARCHITECTURE.md`
  - `docs/AWS_INTEGRATION.md`
  - `docs/DATA_MODEL.md`
  - `.env.example` → repo root
  - `EXTERNAL_REQUIREMENTS.md` → repo root

### 0.4 Initial Commit
- [ ] **Commit planning docs**
  ```bash
  git add .
  git commit -m "Initial commit: planning documentation"
  git push origin main
  ```

---

## Phase 1: Next.js Foundation (Days 1-2)

### 1.1 Initialize Next.js Project
- [ ] **Create Next.js app with App Router**
  ```bash
  npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
  ```
  - When prompted, accept defaults or customize as needed
  - This creates in current directory since we already have the repo

### 1.2 Project Structure Setup
- [ ] **Create folder structure**
  ```bash
  mkdir -p components/layout
  mkdir -p components/products
  mkdir -p components/forms
  mkdir -p components/cart
  mkdir -p components/ui
  mkdir -p lib
  mkdir -p types
  mkdir -p data
  mkdir -p public/images/products/rocketm5
  mkdir -p public/images/products/rocket-prism
  mkdir -p public/images/products/am-5g20-90
  mkdir -p public/images/products/powerbeam
  mkdir -p public/images/products/meraki-poe
  ```

### 1.3 TypeScript Types
- [ ] **Create types/product.ts** from DATA_MODEL.md
- [ ] **Create types/order.ts** from DATA_MODEL.md
- [ ] **Create types/contact.ts** from DATA_MODEL.md

### 1.4 Product Data
- [ ] **Create data/products.json** from DATA_MODEL.md
- [ ] **Verify JSON is valid**
  ```bash
  node -e "require('./data/products.json')"
  ```

### 1.5 Utility Libraries
- [ ] **Create lib/products.ts** - product data loading functions
- [ ] **Create lib/pricing.ts** - pricing calculation functions
- [ ] **Create lib/validation.ts** - Zod schemas (install zod first)
  ```bash
  npm install zod
  ```

### 1.6 Tailwind Configuration
- [ ] **Update tailwind.config.ts** for custom colors/theme
  ```typescript
  // Add custom brand colors if desired
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          // ... blue-ish theme
          600: '#0284c7',
        }
      }
    }
  }
  ```

### 1.7 Base Layout
- [ ] **Create components/layout/Header.tsx**
  - Logo/site name
  - Navigation: Home, Products, Contact
  - Simple cart indicator (count)
- [ ] **Create components/layout/Footer.tsx**
  - Contact info
  - Location (Palm Harbor, FL)
  - Copyright
- [ ] **Create components/layout/Nav.tsx**
  - Responsive navigation
- [ ] **Update app/layout.tsx**
  - Import Header and Footer
  - Set metadata (title, description)
  - Wrap children in layout structure

### 1.8 Placeholder Image Component
- [ ] **Create components/ui/ProductImage.tsx**
  - Shows placeholder if image fails to load
- [ ] **Create public/images/placeholder.svg**
  - Simple gray placeholder with camera icon

### 1.9 Verify Foundation
- [ ] **Run dev server**
  ```bash
  npm run dev
  ```
- [ ] **Verify at http://localhost:3000**
  - Header displays
  - Footer displays
  - No console errors

### 1.10 Commit Phase 1
- [ ] **Commit progress**
  ```bash
  git add .
  git commit -m "Phase 1: Next.js foundation, types, layout"
  git push
  ```

---

## Phase 2: Core Pages (Days 3-4)

### 2.1 Home Page
- [ ] **Update app/page.tsx**
  - Hero section with headline
  - "Surplus Telecom Equipment from Tampa Bay"
  - Featured products grid (3-4 items)
  - "Local Pickup Available" callout
  - Contact CTA button

### 2.2 Product Components
- [ ] **Create components/products/ProductCard.tsx**
  - Image (with fallback)
  - Name, brand
  - Starting price ("From $XX")
  - Condition badge
  - Quantity available
  - "View Details" link
- [ ] **Create components/products/ProductGrid.tsx**
  - Grid layout for ProductCards
  - Responsive (1 col mobile, 2 tablet, 3 desktop)
- [ ] **Create components/products/ProductFilters.tsx**
  - Filter by brand (Ubiquiti / Cisco Meraki)
  - Filter by category (Radios / Antennas / Accessories)
  - Clear filters button
- [ ] **Create components/products/PricingTable.tsx**
  - Display tier pricing (1-4, 5-9, 10+)
  - Highlight savings percentages
- [ ] **Create components/products/ProductGallery.tsx**
  - Main image display
  - Thumbnail navigation (if multiple images)
  - Fallback placeholder

### 2.3 Products Listing Page
- [ ] **Create app/products/page.tsx**
  - Load all products via getProducts()
  - ProductFilters component
  - ProductGrid with all products
  - SEO metadata

### 2.4 Product Detail Page
- [ ] **Create app/products/[sku]/page.tsx**
  - Dynamic route for each product
  - ProductGallery
  - Full description
  - Condition notes
  - PricingTable
  - Specs table
  - Shipping notes (especially for heavy items)
  - "Add to Cart" / "Contact for Bulk" buttons
  - SEO metadata with product name

### 2.5 About Page
- [ ] **Create app/about/page.tsx**
  - About IT Pro Direct
  - Equipment backstory (family business, unused from big job)
  - Why buy from us (tested, local support)
  - Contact info

### 2.6 Contact Page
- [ ] **Create app/contact/page.tsx**
  - Contact form (UI only for now)
  - Direct email link
  - Phone (optional)
  - Location mention (Tampa Bay)
  - Map embed (optional, can add later)

### 2.7 UI Components
- [ ] **Create components/ui/Button.tsx**
  - Primary, secondary, outline variants
  - Loading state
- [ ] **Create components/ui/Input.tsx**
  - Text, email, tel, textarea variants
  - Error state display
- [ ] **Create components/ui/Badge.tsx**
  - Condition badges (New, Like-New, Tested)
  - Info badges (Bulk Available, Local Pickup)

### 2.8 Verify Pages
- [ ] **Test all pages manually**
  - Home: /
  - Products: /products
  - Product Detail: /products/RocketM5-US (and others)
  - About: /about
  - Contact: /contact
- [ ] **Check mobile responsiveness**
- [ ] **Fix any TypeScript errors**

### 2.9 Commit Phase 2
- [ ] **Commit progress**
  ```bash
  git add .
  git commit -m "Phase 2: Core pages - home, products, about, contact"
  git push
  ```

---

## Phase 3: AWS Backend (Days 5-6)

### 3.1 AWS Setup (Manual Steps)
- [ ] **Create Lambda functions in AWS Console**
  - `itprodirect-contact` - Contact form handler
  - `itprodirect-orders` - Order handler
  - Runtime: Node.js 18.x
  - Copy code from AWS_INTEGRATION.md
- [ ] **Create API Gateway REST API**
  - Name: `itprodirect-telecom-api`
  - Create resources: /contact, /orders
  - Create POST methods linked to Lambdas
  - Enable CORS
  - Deploy to `prod` stage
- [ ] **Note API endpoint URL**
  - Format: `https://XXXXXX.execute-api.us-east-1.amazonaws.com/prod`

### 3.2 SES Setup
- [ ] **Verify email in SES**
  - Add and verify: nick@itprodirect.com
- [ ] **Update Lambda environment variables**
  - OWNER_EMAIL=nick@itprodirect.com
  - FROM_EMAIL=nick@itprodirect.com (or noreply if verified)

### 3.3 Test AWS Endpoints
- [ ] **Test contact endpoint with curl**
  ```bash
  curl -X POST https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/prod/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@test.com","message":"Test message here"}'
  ```
- [ ] **Verify email received**

### 3.4 Environment Variables
- [ ] **Create .env.local file**
  ```bash
  cp .env.example .env.local
  ```
- [ ] **Add AWS API URL to .env.local**
  ```
  NEXT_PUBLIC_API_URL=https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/prod
  ```

### 3.5 API Client
- [ ] **Create lib/api.ts**
  ```typescript
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  export async function submitContactForm(data: ContactFormData) {
    const response = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  export async function submitOrder(data: OrderData) {
    const response = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }
  ```

### 3.6 Connect Contact Form
- [ ] **Create components/forms/ContactForm.tsx**
  - Form fields: name, email, phone (optional), message
  - Hidden honeypot field (website)
  - Client-side validation
  - Submit to API
  - Success/error states
  - Loading state
- [ ] **Update app/contact/page.tsx** to use ContactForm

### 3.7 Test Contact Form End-to-End
- [ ] **Submit test contact form**
- [ ] **Verify email received at nick@itprodirect.com**
- [ ] **Check form shows success message**

### 3.8 Commit Phase 3
- [ ] **Commit progress**
  ```bash
  git add .
  git commit -m "Phase 3: AWS backend integration - contact form working"
  git push
  ```

---

## Phase 4: Cart & Checkout (Days 7-8)

### 4.1 Cart State Management
- [ ] **Create lib/cart.ts**
  - Cart context and provider
  - Add/remove/update items
  - Persist to localStorage
  - Calculate totals
- [ ] **Create components/cart/CartProvider.tsx**
  - Wrap app in cart context
- [ ] **Update app/layout.tsx** to include CartProvider

### 4.2 Cart Components
- [ ] **Create components/cart/AddToCart.tsx**
  - Quantity selector
  - Add to cart button
  - Shows current price based on quantity
- [ ] **Create components/cart/CartSummary.tsx**
  - List of items in cart
  - Quantity adjusters
  - Remove item button
  - Subtotal
- [ ] **Update Header** to show cart count

### 4.3 Integrate Add to Cart
- [ ] **Update product detail page**
  - Add AddToCart component
  - Connect to cart context

### 4.4 Checkout Page
- [ ] **Create app/checkout/page.tsx**
  - Cart summary (editable)
  - Customer information form
  - Shipping method (Pickup / Ship)
  - Address form (if Ship selected)
  - Payment method selector
- [ ] **Create components/forms/CheckoutForm.tsx**
  - Full checkout form logic
  - Validation
  - Submit to orders API
- [ ] **Create components/forms/PaymentSelector.tsx**
  - Radio buttons: Wire, ACH, PayPal
  - Show +3% fee when PayPal selected
  - Update totals in real-time

### 4.5 Order Confirmation
- [ ] **Create app/checkout/confirmation/page.tsx**
  - Or use client-side state to show confirmation
  - Display order ID
  - Show payment instructions
  - "Continue Shopping" button

### 4.6 Test Order Flow
- [ ] **Add items to cart**
- [ ] **Go through checkout**
- [ ] **Submit test order**
- [ ] **Verify emails received (owner + customer)**
- [ ] **Verify confirmation displays**

### 4.7 Edge Cases
- [ ] **Test empty cart checkout (should redirect)**
- [ ] **Test PayPal fee calculation**
- [ ] **Test form validation errors**
- [ ] **Test shipping vs pickup flows**

### 4.8 Commit Phase 4
- [ ] **Commit progress**
  ```bash
  git add .
  git commit -m "Phase 4: Cart and checkout flow complete"
  git push
  ```

---

## Phase 5: Polish & Deploy (Days 9-10)

### 5.1 SEO Metadata
- [ ] **Update app/layout.tsx metadata**
  ```typescript
  export const metadata = {
    title: 'IT Pro Direct | Surplus Telecom Equipment',
    description: 'Quality tested Ubiquiti and Cisco Meraki networking gear. Tampa Bay area. Wire/ACH/PayPal accepted.',
    keywords: ['Ubiquiti', 'Meraki', 'WISP', 'airMAX', 'networking', 'Tampa Bay'],
  };
  ```
- [ ] **Add metadata to each page**
- [ ] **Create app/robots.txt** (via route or static file)
- [ ] **Create app/sitemap.ts** (dynamic sitemap)

### 5.2 Add Product Images
- [ ] **Take photos of each product** (see EXTERNAL_REQUIREMENTS.md for guidelines)
- [ ] **Process images** (resize, optimize)
- [ ] **Add to public/images/products/[sku]/**
- [ ] **Update products.json** if image paths change

### 5.3 Final Content Review
- [ ] **Review all product descriptions**
- [ ] **Verify pricing is correct**
- [ ] **Verify quantities match inventory**
- [ ] **Update any placeholder text**

### 5.4 Mobile Testing
- [ ] **Test on real mobile device**
- [ ] **Fix any responsive issues**
- [ ] **Test touch interactions (cart, forms)**

### 5.5 Performance Check
- [ ] **Run Lighthouse audit**
  - Target: 90+ Performance
  - Target: 90+ Accessibility
  - Target: 90+ Best Practices
  - Target: 90+ SEO
- [ ] **Optimize images if needed**
- [ ] **Fix any flagged issues**

### 5.6 Vercel Deployment
- [ ] **Connect GitHub repo to Vercel**
  - Go to vercel.com
  - Import project from GitHub
  - Select itprodirect-telecom repo
- [ ] **Configure environment variables in Vercel**
  - Add NEXT_PUBLIC_API_URL
  - Add any other env vars from .env.example
- [ ] **Deploy**
- [ ] **Note Vercel URL** (e.g., itprodirect-telecom.vercel.app)

### 5.7 Post-Deploy Testing
- [ ] **Test live site completely**
  - All pages load
  - Contact form works
  - Cart works
  - Checkout works (test order)
  - Emails received
- [ ] **Test on mobile (live URL)**
- [ ] **Share with family for feedback**

### 5.8 Update AWS CORS (Production)
- [ ] **Restrict CORS to Vercel domain**
  - Update API Gateway CORS settings
  - Allow only your-site.vercel.app
  - Redeploy API

### 5.9 Final Commit
- [ ] **Commit any final changes**
  ```bash
  git add .
  git commit -m "Phase 5: Polish, images, and production deployment"
  git push
  ```

### 5.10 Go Live! 🚀
- [ ] **Site is live and ready for promotion**
- [ ] **Start sharing with family/network**
- [ ] **Monitor for orders**

---

## Post-Launch Tasks

### Ongoing
- [ ] Update inventory quantities as items sell
- [ ] Add new products if more equipment surfaces
- [ ] Monitor AWS costs (should be minimal/free tier)
- [ ] Respond to inquiries promptly

### Future Enhancements (Optional)
- [ ] Add DynamoDB for order tracking
- [ ] Add inventory auto-decrement
- [ ] Custom domain setup
- [ ] Google Analytics integration
- [ ] Stripe payment integration

---

## Quick Reference Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run linter

# Git
git status               # Check changes
git add .                # Stage all changes
git commit -m "message"  # Commit
git push                 # Push to GitHub

# Testing
curl -X POST URL -H "Content-Type: application/json" -d '{...}'
```
