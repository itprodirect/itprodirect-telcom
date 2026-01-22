# AWS Integration Guide

> **Last Updated:** January 22, 2026
> **Status:** Lambda functions deployed and working

---

## Overview

This document covers the AWS backend setup for the IT Pro Direct telecom equipment site:
- **API Gateway:** HTTP API with POST /contact and POST /orders endpoints
- **Lambda:** Two Node.js 18 functions for handling forms
- **SES:** Email notifications to owner

---

## Current Setup (Deployed)

| Component | Name/ID | Region |
|-----------|---------|--------|
| API Gateway | HTTP API (vercel-itpro-telcom or similar) | us-east-1 |
| Lambda - Contact | itprodirect-contact | us-east-1 |
| Lambda - Orders | itprodirect-orders | us-east-1 |
| SES Verified Email | nick@itprodirect.com | us-east-1 |

**API Gateway Base URL:** `https://<apiId>.execute-api.us-east-1.amazonaws.com`

**Working Endpoints:**
- `POST /contact` - Contact form submissions
- `POST /orders` - Order request submissions

---

## Lambda Functions

### 1. Contact Form Handler

**File:** `lambda/contact/index.mjs`

```javascript
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: process.env.AWS_REGION || "us-east-1" });

const OWNER_EMAIL = process.env.OWNER_EMAIL || "nick@itprodirect.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "nick@itprodirect.com";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const body = JSON.parse(event.body || "{}");

    // Validation
    const errors = [];
    if (!body.name?.trim()) errors.push("Name is required");
    if (!body.email?.trim()) errors.push("Email is required");
    if (!body.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.push("Invalid email format");
    if (!body.message?.trim()) errors.push("Message is required");
    if (body.message?.trim().length < 10) errors.push("Message must be at least 10 characters");

    // Honeypot check
    if (body.website) {
      console.log("Honeypot triggered, ignoring submission");
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: "Thank you for your message." })
      };
    }

    if (errors.length > 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: "Validation failed", details: errors })
      };
    }

    const emailParams = {
      Source: FROM_EMAIL,
      Destination: { ToAddresses: [OWNER_EMAIL] },
      Message: {
        Subject: { Data: `[IT Pro Direct] Contact Form: ${body.name}` },
        Body: {
          Text: {
            Data: `
New contact form submission:

Name: ${body.name}
Email: ${body.email}
Phone: ${body.phone || "Not provided"}

Message:
${body.message}

---
Sent from IT Pro Direct Telecom Equipment Site
            `.trim()
          }
        }
      }
    };

    await ses.send(new SendEmailCommand(emailParams));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Thank you for your message. We'll respond within 24 hours."
      })
    };

  } catch (error) {
    console.error("Contact form error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: "Failed to send message. Please try again." })
    };
  }
};
```

---

### 2. Order Request Handler (Simplified)

**File:** `lambda/orders/index.mjs`

This handler implements the simplified "order request" model - no payment processing, just notification to owner.

```javascript
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: process.env.AWS_REGION || "us-east-1" });

const OWNER_EMAIL = process.env.OWNER_EMAIL || "nick@itprodirect.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "nick@itprodirect.com";

// Default OFF for MVP (SES sandbox + avoids emailing unverified customers)
const SEND_CUSTOMER_EMAIL = (process.env.SEND_CUSTOMER_EMAIL || "false").toLowerCase() === "true";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

const generateOrderId = () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${date}-${random}`;
};

const formatCurrency = (value) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return "$0.00";
  return `$${n.toFixed(2)}`;
};

const normalizeItem = (item = {}) => {
  const quantity = Number(item.quantity ?? item.qty ?? 1);
  const unitPrice = Number(item.unitPrice ?? item.price ?? item.unit_price ?? 0);
  const lineTotal = Number(item.lineTotal ?? item.line_total ?? (quantity * unitPrice));

  return {
    sku: item.sku ?? "",
    name: item.name ?? "Item",
    quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
    unitPrice: Number.isFinite(unitPrice) ? unitPrice : 0,
    lineTotal: Number.isFinite(lineTotal) ? lineTotal : 0
  };
};

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const body = JSON.parse(event.body || "{}");

    const customer = body.customer ?? {};
    const itemsRaw = Array.isArray(body.items) ? body.items : [];
    const items = itemsRaw.map(normalizeItem);

    // "shipping" might not exist — default to local pickup
    const fulfillment = body.shipping ?? body.fulfillment ?? { method: "pickup", cost: 0 };

    // Optional preference (NOT required)
    const paymentPreference =
      body.payment?.method ??
      body.payment_method ??
      body.paymentMethod ??
      body.paymentPreference ??
      "";

    const notes = (body.notes ?? "").toString().trim();

    // Validation (MVP)
    const errors = [];
    if (!customer?.name?.trim()) errors.push("Customer name is required");
    if (!customer?.phone?.trim()) errors.push("Phone number is required");
    if (!items.length) errors.push("Order must contain at least one item");

    if (errors.length > 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: "Validation failed", details: errors })
      };
    }

    const orderId = generateOrderId();

    const itemsList = items
      .map((i) => {
        const pricePart = i.unitPrice > 0 ? ` @ ${formatCurrency(i.unitPrice)}` : "";
        const totalPart = i.lineTotal > 0 ? ` = ${formatCurrency(i.lineTotal)}` : "";
        const skuPart = i.sku ? ` (${i.sku})` : "";
        return `- ${i.name}${skuPart} x${i.quantity}${pricePart}${totalPart}`;
      })
      .join("\n");

    const fulfillmentMethod = (fulfillment?.method ?? "pickup").toString();
    const isShip = fulfillmentMethod === "ship";

    const ownerEmailParams = {
      Source: FROM_EMAIL,
      Destination: { ToAddresses: [OWNER_EMAIL] },
      Message: {
        Subject: { Data: `[ORDER REQUEST] ${orderId} - ${customer.name}` },
        Body: {
          Text: {
            Data: `
NEW ORDER REQUEST RECEIVED

Order ID: ${orderId}
Date: ${new Date().toLocaleString()}

CUSTOMER:
Name: ${customer.name || ""}
Phone: ${customer.phone || ""}
Email: ${customer.email || "(not provided)"}

FULFILLMENT:
Method: ${fulfillmentMethod.toUpperCase()}
${isShip ? `Shipping address (if provided):
${customer.address?.street || ""}
${customer.address?.city || ""}, ${customer.address?.state || ""} ${customer.address?.zip || ""}` : "Local pickup / local follow-up (Palm Harbor, FL area)"}

ITEMS:
${itemsList}

PAYMENT:
Preference: ${paymentPreference ? paymentPreference.toUpperCase() : "To be confirmed by phone"}
(No online payment collected)

${notes ? `NOTES:\n${notes}` : ""}

---
Next step: Call/text customer to confirm inventory, pickup/shipping, and payment.
            `.trim()
          }
        }
      }
    };

    const sendPromises = [ses.send(new SendEmailCommand(ownerEmailParams))];

    // Optional customer confirmation (OFF by default)
    if (SEND_CUSTOMER_EMAIL && customer?.email?.trim()) {
      const customerEmailParams = {
        Source: FROM_EMAIL,
        Destination: { ToAddresses: [customer.email] },
        Message: {
          Subject: { Data: `Order Request Received - ${orderId} - IT Pro Direct` },
          Body: {
            Text: {
              Data: `
Thanks — we received your order request.

Order ID: ${orderId}
We do not take online payment. We will contact you within 24 hours to confirm availability, pickup/shipping, and payment.

ITEMS:
${itemsList}

Questions? Reply to this email or contact nick@itprodirect.com
              `.trim()
            }
          }
        }
      };

      sendPromises.push(ses.send(new SendEmailCommand(customerEmailParams)));
    }

    await Promise.all(sendPromises);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        orderId,
        message: "Order request received! We'll contact you to confirm details and payment."
      })
    };
  } catch (error) {
    console.error("Order error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: "Failed to process order. Please try again or contact us directly."
      })
    };
  }
};
```

---

## API Gateway Setup (Already Done)

The API Gateway HTTP API is configured with:

### CORS Settings
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: content-type
Access-Control-Allow-Methods: POST, OPTIONS
```

### Routes
- `POST /contact` → Lambda: itprodirect-contact
- `POST /orders` → Lambda: itprodirect-orders

### Stage
- `$default` with auto-deploy enabled

---

## SES Setup (Already Done)

### Verified Identity
- `nick@itprodirect.com` - verified for sending and receiving

### Lambda IAM Permissions
Both Lambda functions have IAM policies allowing `ses:SendEmail` on the verified identity.

### SES Sandbox Mode
Currently in sandbox mode:
- Can only send to verified email addresses
- Customer confirmation emails disabled by default (`SEND_CUSTOMER_EMAIL=false`)
- Request production access when ready for real customer emails

---

## Testing

### Test Contact Endpoint (curl)

```bash
curl -X POST https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message from the contact form."
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Thank you for your message. We'll respond within 24 hours."
}
```

### Test Orders Endpoint (curl)

```bash
curl -X POST https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {
      "name": "Nick",
      "phone": "555-555-5555",
      "email": "nick@itprodirect.com"
    },
    "items": [
      { "sku": "RocketM5-US", "name": "Ubiquiti RocketM5", "qty": 2 }
    ],
    "fulfillment": { "method": "pickup" },
    "notes": "Test order request"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "orderId": "ORD-20260122-XXXXXX",
  "message": "Order request received! We'll contact you to confirm details and payment."
}
```

---

## Lambda Environment Variables

| Variable | Value | Notes |
|----------|-------|-------|
| OWNER_EMAIL | nick@itprodirect.com | Receives all notifications |
| FROM_EMAIL | nick@itprodirect.com | Must be SES verified |
| SEND_CUSTOMER_EMAIL | false | Set to "true" to enable customer confirmations |

**Note:** `AWS_REGION` is a reserved environment variable in Lambda - do not set it manually. The SDK uses the default region.

---

## Troubleshooting

### Common Issues Encountered (and Fixed)

| Issue | Cause | Solution |
|-------|-------|----------|
| CORS errors | Missing CORS headers | Added CORS settings in API Gateway |
| "Network error" in browser | No CORS preflight handling | Enabled CORS in API Gateway console |
| SES "AccessDenied" | Missing IAM permissions | Added ses:SendEmail policy to Lambda role |
| "Cannot read properties of undefined" | Payload mismatch | Simplified payload, added `normalizeItem()` |
| AWS_REGION conflict | Reserved env var | Removed manual setting, SDK uses default |

### View Lambda Logs

```bash
# Contact function logs
aws logs tail /aws/lambda/itprodirect-contact --follow

# Orders function logs
aws logs tail /aws/lambda/itprodirect-orders --follow
```

---

## Deployment Notes

### Updating Lambda Code

1. Edit the `.mjs` file in `lambda/contact/` or `lambda/orders/`
2. Zip the contents (including `node_modules` if using external packages)
3. Upload via AWS Console or CLI:

```bash
# From the lambda/orders directory
zip -r ../orders.zip .
aws lambda update-function-code --function-name itprodirect-orders --zip-file fileb://../orders.zip
```

### Dependencies

Both Lambda functions use:
- `@aws-sdk/client-ses` (included in Node.js 18 runtime, but may need to be bundled for newer versions)

If bundling dependencies:
```bash
cd lambda/orders
npm init -y
npm install @aws-sdk/client-ses
```
