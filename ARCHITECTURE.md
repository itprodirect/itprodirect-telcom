# Architecture - IT Pro Direct Telecom Equipment Site

> **Last Updated:** January 22, 2026

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
│  │  • Direct calls to AWS API Gateway                        │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AWS (Backend)                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│  │  API Gateway    │  │    Lambda       │  │      SES       │  │
│  │  (HTTP API)     │──│  (Node.js 18)   │──│  (Email)       │  │
│  │                 │  │                 │  │                │  │
│  │  POST /contact  │  │  contactHandler │  │  To: owner     │  │
│  │  POST /orders   │  │  orderHandler   │  │                │  │
│  └─────────────────┘  └─────────────────┘  └────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Business Model: "Order Request" Flow

This site uses a **simplified order request model** optimized for local pickup:

1. **No online payment processing** - Payment is arranged after contact
2. **Local pickup preferred** - Palm Harbor, FL (Tampa Bay area)
3. **Shipping available** - Contact owner to arrange shipping for shippable items
4. **Owner follows up** - All order requests trigger email to owner who contacts customer

This approach works well for:
- Low-volume liquidation sales
- Heavy items where shipping is complex
- Building customer relationships before payment

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
│   └── page.tsx            # Order request form
└── about/
    └── page.tsx            # About page

components/
├── layout/
│   ├── Header.tsx          # Site header with nav
│   ├── Footer.tsx          # Site footer
│   └── Nav.tsx             # Navigation component
├── products/
│   ├── ProductCard.tsx     # Product grid card
│   ├── ProductGrid.tsx     # Products grid container
│   ├── ProductGallery.tsx  # Image gallery for detail page
│   ├── PricingTable.tsx    # Tier pricing display (reference only)
│   └── ProductFilters.tsx  # Brand/category filters
├── forms/
│   ├── ContactForm.tsx     # Contact form component
│   └── OrderRequestForm.tsx # Simple order request form
└── ui/
    ├── Button.tsx          # Reusable button
    ├── Input.tsx           # Form input
    ├── Badge.tsx           # Status/info badges
    └── ProductImage.tsx    # Image with fallback

lib/
├── products.ts             # Product data loader + helpers
├── pricing.ts              # Price display helpers (formatCurrency, getTierLabel)
├── validation.ts           # Zod schemas for forms
└── api.ts                  # AWS API client

data/
└── products.json           # Product inventory data

public/
├── images/
│   ├── products/           # Product images (added by owner)
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
2. Client-side Zod validation
3. Form submits to AWS API Gateway /contact
4. Lambda processes request
5. SES sends email to nick@itprodirect.com
6. Lambda returns success/error
7. Frontend shows confirmation message
```

### Order Request Submission

```
1. User clicks "Contact to Order" on product page
2. User redirected to /checkout (or /contact with product context)
3. User fills order request form:
   - Name, phone, email
   - Items interested in (SKU, name, quantity)
   - Fulfillment preference (pickup preferred)
   - Notes (special requests)
4. Form submits to AWS API Gateway /orders
5. Lambda:
   a. Validates required fields (name, phone, at least one item)
   b. Generates order ID (ORD-YYYYMMDD-XXXXXX)
   c. Sends email to owner with order details
   d. (Optional) Sends acknowledgment to customer
6. Frontend shows confirmation with order ID
7. Owner contacts customer to:
   - Confirm item availability
   - Arrange pickup time OR discuss shipping
   - Collect payment (wire/ACH/PayPal/cash)
```

---

## API Contracts

### POST /contact

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

### POST /orders

**Request (Simplified Order Request):**
```json
{
  "customer": {
    "name": "string (required)",
    "email": "string (optional but recommended)",
    "phone": "string (required)"
  },
  "items": [
    {
      "sku": "RocketM5-US",
      "name": "Ubiquiti RocketM5",
      "qty": 5
    }
  ],
  "fulfillment": {
    "method": "pickup"
  },
  "notes": "string (optional)"
}
```

**Response (Success):**
```json
{
  "success": true,
  "orderId": "ORD-20260122-ABC123",
  "message": "Order request received! We'll contact you to confirm details and payment."
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": ["Customer name is required", "Phone number is required"]
}
```

---

## Technology Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| **Frontend Framework** | Next.js 14+ (App Router) | Server components, static generation |
| **Styling** | Tailwind CSS | Utility-first, dark mode support |
| **State Management** | React useState | Simple form state, no cart needed |
| **Validation** | Zod | Schema validation for forms |
| **Hosting** | Vercel (free tier) | Automatic deployments |
| **Backend** | AWS Lambda (Node.js 18) | Serverless functions |
| **API Gateway** | AWS API Gateway (HTTP API) | CORS configured |
| **Email** | AWS SES | Transactional emails |
| **Version Control** | GitHub | CI/CD with Vercel |

---

## Environment Variables

### Vercel (Frontend)
```bash
# AWS API endpoint (no /prod suffix for HTTP API)
NEXT_PUBLIC_API_URL=https://xxxxxx.execute-api.us-east-1.amazonaws.com

# Site config
NEXT_PUBLIC_SITE_NAME="IT Pro Direct - Telecom Equipment"
NEXT_PUBLIC_CONTACT_EMAIL=nick@itprodirect.com
NEXT_PUBLIC_LOCATION="Palm Harbor, FL"

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### AWS Lambda
```bash
# Email config
OWNER_EMAIL=nick@itprodirect.com
FROM_EMAIL=nick@itprodirect.com  # Must be verified in SES

# Optional: Send customer confirmation (default: false in SES sandbox)
SEND_CUSTOMER_EMAIL=false
```

---

## Security Considerations

1. **CORS:** API Gateway configured with `Access-Control-Allow-Origin: *` (can restrict to Vercel domain in production)
2. **Input Validation:** Both client-side (Zod) and Lambda-side validation
3. **Honeypot Fields:** Hidden form fields to catch bots on contact form
4. **No Sensitive Data:** No payment info collected online
5. **SES Sandbox:** Customer emails optional until production access granted

---

## Scalability Notes

This is a low-volume liquidation site. Current architecture is intentionally simple:

- **No database required** - Orders sent via email, owner tracks manually
- **No user accounts** - Single seller, anonymous buyers
- **No real-time inventory** - Manual updates to products.json
- **No payment processing** - Payments handled offline after contact

If volume increases unexpectedly:
1. Add DynamoDB for order tracking
2. Add inventory management
3. Consider Stripe for payment processing
