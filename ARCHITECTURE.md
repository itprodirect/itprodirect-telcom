# Architecture - IT Pro Direct Telecom Equipment Site

> **Last Updated:** January 20, 2026

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     VERCEL (Frontend)                           │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   Next.js App Router                      │  │
│  │  • Static pages (products, about)                         │  │
│  │  • Server components for product data                     │  │
│  │  • API routes as thin proxies to AWS                      │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AWS (Backend)                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│  │  API Gateway    │  │    Lambda       │  │      SES       │  │
│  │  (REST API)     │──│  (Node.js 18)   │──│  (Email)       │  │
│  │                 │  │                 │  │                │  │
│  │  POST /contact  │  │  contactHandler │  │  To: owner     │  │
│  │  POST /orders   │  │  orderHandler   │  │  To: buyer     │  │
│  └─────────────────┘  └─────────────────┘  └────────────────┘  │
│                                │                                │
│                                ▼                                │
│                       ┌─────────────────┐                       │
│                       │   DynamoDB      │                       │
│                       │   (Optional)    │                       │
│                       │   Order history │                       │
│                       └─────────────────┘                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Tree

```
app/
├── layout.tsx              # Root layout (header, footer, metadata)
├── page.tsx                # Home page
├── globals.css             # Tailwind + custom styles
├── products/
│   ├── page.tsx            # Products listing
│   └── [sku]/
│       └── page.tsx        # Product detail (dynamic route)
├── contact/
│   └── page.tsx            # Contact form
├── checkout/
│   └── page.tsx            # Order/checkout flow
├── about/
│   └── page.tsx            # About page
└── api/
    ├── contact/
    │   └── route.ts        # Proxy to AWS contact Lambda
    └── orders/
        └── route.ts        # Proxy to AWS orders Lambda

components/
├── layout/
│   ├── Header.tsx          # Site header with nav
│   ├── Footer.tsx          # Site footer
│   └── Nav.tsx             # Navigation component
├── products/
│   ├── ProductCard.tsx     # Product grid card
│   ├── ProductGrid.tsx     # Products grid container
│   ├── ProductGallery.tsx  # Image gallery for detail page
│   ├── PricingTable.tsx    # Tier pricing display
│   └── ProductFilters.tsx  # Brand/category filters
├── forms/
│   ├── ContactForm.tsx     # Contact form component
│   ├── CheckoutForm.tsx    # Order/checkout form
│   └── PaymentSelector.tsx # Payment method selector with fee calc
├── cart/
│   ├── CartProvider.tsx    # Cart context provider
│   ├── CartSummary.tsx     # Cart display component
│   └── AddToCart.tsx       # Add to cart button
└── ui/
    ├── Button.tsx          # Reusable button
    ├── Input.tsx           # Form input
    ├── Badge.tsx           # Status/info badges
    └── Placeholder.tsx     # Image placeholder

lib/
├── products.ts             # Product data loader + helpers
├── pricing.ts              # Price calculation functions
├── cart.ts                 # Cart state management
└── api.ts                  # AWS API client

data/
└── products.json           # Product inventory data

public/
├── images/
│   ├── products/           # Product images (added by owner)
│   │   ├── rocketm5/
│   │   ├── rocket-prism/
│   │   ├── am-5g20-90/
│   │   ├── powerbeam/
│   │   └── meraki-poe/
│   └── placeholder.svg     # Default placeholder image
└── favicon.ico
```

---

## Data Flow Diagrams

### Page Load (Products)

```
1. User visits /products
2. Next.js Server Component loads
3. getProducts() reads data/products.json
4. ProductGrid renders with ProductCards
5. Static HTML sent to browser
6. Hydration completes (filters become interactive)
```

### Contact Form Submission

```
1. User fills ContactForm
2. Client-side validation
3. Form submits to /api/contact (Next.js API route)
4. API route forwards to AWS API Gateway
5. Lambda processes request
6. SES sends email to nick@itprodirect.com
7. Lambda returns success/error
8. Frontend shows confirmation message
```

### Order Submission

```
1. User adds items to cart (localStorage)
2. User goes to /checkout
3. Selects payment method
4. PayPal selected? → Show +3% fee
5. Form submits to /api/orders
6. API route forwards to AWS
7. Lambda:
   a. Validates order data
   b. (Optional) Saves to DynamoDB
   c. Sends email to owner with order details
   d. Sends confirmation email to buyer
8. Frontend shows order confirmation with payment instructions
```

---

## API Contracts

### POST /api/contact

**Request:**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "phone": "string (optional)",
  "message": "string (required, min 10 chars)"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Thank you for your message. We'll respond within 24 hours."
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": ["Email is required", "Message must be at least 10 characters"]
}
```

### POST /api/orders

**Request:**
```json
{
  "customer": {
    "name": "string (required)",
    "email": "string (required)",
    "phone": "string (required for orders)",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zip": "string"
    }
  },
  "items": [
    {
      "sku": "RocketM5-US",
      "name": "Ubiquiti RocketM5",
      "quantity": 5,
      "unitPrice": 62.10,
      "lineTotal": 310.50
    }
  ],
  "shipping": {
    "method": "pickup" | "ship",
    "cost": 0
  },
  "payment": {
    "method": "wire" | "ach" | "paypal",
    "subtotal": 310.50,
    "paypalFee": 0,
    "total": 310.50
  },
  "notes": "string (optional)"
}
```

**Response (Success):**
```json
{
  "success": true,
  "orderId": "ORD-20260120-ABC123",
  "message": "Order received! Check your email for payment instructions.",
  "paymentInstructions": {
    "method": "wire",
    "details": "Wire transfer instructions will be sent via email."
  }
}
```

---

## Technology Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| **Frontend Framework** | Next.js 14+ (App Router) | Server components, static generation |
| **Styling** | Tailwind CSS | Utility-first, dark mode support |
| **State Management** | React Context + localStorage | Cart persistence |
| **Forms** | React Hook Form (optional) | Or native form handling |
| **Hosting** | Vercel (free tier) | Automatic deployments |
| **Backend** | AWS Lambda (Node.js 18) | Serverless functions |
| **API Gateway** | AWS API Gateway (REST) | CORS configured |
| **Email** | AWS SES | Transactional emails |
| **Database** | DynamoDB (optional) | Order history if needed |
| **Version Control** | GitHub | CI/CD with Vercel |

---

## Environment Variables

### Vercel (Frontend)
```bash
# AWS API endpoint
NEXT_PUBLIC_API_URL=https://xxxxxx.execute-api.us-east-1.amazonaws.com/prod

# Site config
NEXT_PUBLIC_SITE_NAME="IT Pro Direct - Telecom Equipment"
NEXT_PUBLIC_CONTACT_EMAIL=nick@itprodirect.com
NEXT_PUBLIC_PAYPAL_FEE_PERCENT=3

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### AWS Lambda
```bash
# Email config
OWNER_EMAIL=nick@itprodirect.com
FROM_EMAIL=orders@itprodirect.com  # Must be verified in SES

# Optional: DynamoDB
ORDERS_TABLE_NAME=itprodirect-telecom-orders
```

---

## Security Considerations

1. **CORS:** API Gateway configured to only accept requests from Vercel domain
2. **Rate Limiting:** API Gateway throttling to prevent abuse
3. **Input Validation:** Both client-side and Lambda-side validation
4. **Honeypot Fields:** Hidden form fields to catch bots
5. **No Sensitive Data in Frontend:** Payment details never stored, only method selected
6. **SES Sandbox:** Start in sandbox mode, request production access when ready

---

## Scalability Notes

This is a low-volume liquidation site. Current architecture is intentionally simple:

- **No database required initially** - Orders sent via email
- **No user accounts** - Single seller, anonymous buyers
- **No real-time inventory** - Manual updates to products.json
- **No payment processing** - Wire/ACH/PayPal handled externally

If volume increases unexpectedly:
1. Add DynamoDB for order tracking
2. Add inventory management
3. Consider Stripe for payment processing
