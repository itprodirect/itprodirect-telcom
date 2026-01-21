# AWS Integration Guide

> **Last Updated:** January 20, 2026

---

## Overview

This document covers AWS setup for the IT Pro Direct telecom equipment site backend:
- **API Gateway:** REST API endpoints
- **Lambda:** Serverless functions for form handling
- **SES:** Email notifications

---

## Prerequisites

- AWS account with appropriate permissions
- AWS CLI configured locally (or use AWS Console)
- Verified email address in SES (nick@itprodirect.com)

---

## Lambda Functions

### 1. Contact Form Handler

**File:** `lambda/contact/index.mjs`

```javascript
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: process.env.AWS_REGION || "us-east-1" });

const OWNER_EMAIL = process.env.OWNER_EMAIL || "nick@itprodirect.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@itprodirect.com";

// CORS headers
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*", // Restrict to Vercel domain in production
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

export const handler = async (event) => {
  // Handle preflight
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
    
    // Honeypot check (if website field is filled, it's a bot)
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

    // Send email to owner
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

### 2. Order Handler

**File:** `lambda/orders/index.mjs`

```javascript
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: process.env.AWS_REGION || "us-east-1" });

const OWNER_EMAIL = process.env.OWNER_EMAIL || "nick@itprodirect.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@itprodirect.com";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

// Generate simple order ID
const generateOrderId = () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${date}-${random}`;
};

// Format currency
const formatCurrency = (amount) => `$${amount.toFixed(2)}`;

// Get payment instructions
const getPaymentInstructions = (method, total) => {
  switch (method) {
    case "wire":
      return `
WIRE TRANSFER INSTRUCTIONS:
Bank: [Your Bank Name]
Routing: [Routing Number]
Account: [Account Number]
Reference: [Order ID]
Amount: ${formatCurrency(total)}

Please include your Order ID in the wire reference.
      `.trim();
    
    case "ach":
      return `
ACH/BANK TRANSFER INSTRUCTIONS:
Bank: [Your Bank Name]
Routing: [Routing Number]
Account: [Account Number]
Reference: [Order ID]
Amount: ${formatCurrency(total)}

ACH transfers typically take 2-3 business days.
      `.trim();
    
    case "paypal":
      return `
PAYPAL PAYMENT:
Send payment to: nick@itprodirect.com
Amount: ${formatCurrency(total)} (includes 3% PayPal fee)

Please include your Order ID in the PayPal note.
      `.trim();
    
    default:
      return "Payment instructions will be sent separately.";
  }
};

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { customer, items, shipping, payment, notes } = body;

    // Validation
    const errors = [];
    if (!customer?.name?.trim()) errors.push("Customer name is required");
    if (!customer?.email?.trim()) errors.push("Customer email is required");
    if (!customer?.phone?.trim()) errors.push("Phone number is required for orders");
    if (!items?.length) errors.push("Order must contain at least one item");
    if (!payment?.method) errors.push("Payment method is required");

    if (errors.length > 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: "Validation failed", details: errors })
      };
    }

    const orderId = generateOrderId();
    const paymentInstructions = getPaymentInstructions(payment.method, payment.total);

    // Format items for email
    const itemsList = items.map(item => 
      `- ${item.name} (${item.sku}) x${item.quantity} @ ${formatCurrency(item.unitPrice)} = ${formatCurrency(item.lineTotal)}`
    ).join("\n");

    // Email to owner
    const ownerEmailParams = {
      Source: FROM_EMAIL,
      Destination: { ToAddresses: [OWNER_EMAIL] },
      Message: {
        Subject: { Data: `[NEW ORDER] ${orderId} - ${customer.name}` },
        Body: {
          Text: {
            Data: `
NEW ORDER RECEIVED

Order ID: ${orderId}
Date: ${new Date().toLocaleString()}

CUSTOMER:
Name: ${customer.name}
Email: ${customer.email}
Phone: ${customer.phone}
${shipping.method === "ship" ? `
Address:
${customer.address?.street || ""}
${customer.address?.city || ""}, ${customer.address?.state || ""} ${customer.address?.zip || ""}
` : "Local Pickup - Palm Harbor, FL"}

ITEMS:
${itemsList}

TOTALS:
Subtotal: ${formatCurrency(payment.subtotal)}
${payment.paypalFee > 0 ? `PayPal Fee (3%): ${formatCurrency(payment.paypalFee)}` : ""}
Shipping: ${shipping.method === "pickup" ? "Local Pickup (Free)" : formatCurrency(shipping.cost || 0)}
TOTAL: ${formatCurrency(payment.total)}

PAYMENT METHOD: ${payment.method.toUpperCase()}

${notes ? `NOTES:\n${notes}` : ""}

---
Action Required: Send payment instructions to customer if not already included in their confirmation.
            `.trim()
          }
        }
      }
    };

    // Email to customer
    const customerEmailParams = {
      Source: FROM_EMAIL,
      Destination: { ToAddresses: [customer.email] },
      Message: {
        Subject: { Data: `Order Confirmation - ${orderId} - IT Pro Direct` },
        Body: {
          Text: {
            Data: `
Thank you for your order!

Order ID: ${orderId}
Date: ${new Date().toLocaleString()}

ITEMS ORDERED:
${itemsList}

TOTALS:
Subtotal: ${formatCurrency(payment.subtotal)}
${payment.paypalFee > 0 ? `PayPal Fee (3%): ${formatCurrency(payment.paypalFee)}` : ""}
Shipping: ${shipping.method === "pickup" ? "Local Pickup (Free)" : formatCurrency(shipping.cost || 0)}
TOTAL: ${formatCurrency(payment.total)}

${shipping.method === "pickup" ? `
PICKUP LOCATION:
Palm Harbor, FL area
We'll contact you to arrange pickup time.
` : `
SHIPPING TO:
${customer.address?.street || ""}
${customer.address?.city || ""}, ${customer.address?.state || ""} ${customer.address?.zip || ""}
`}

PAYMENT INSTRUCTIONS:
${paymentInstructions}

---
Questions? Reply to this email or contact nick@itprodirect.com

IT Pro Direct - Telecom Equipment
            `.trim()
          }
        }
      }
    };

    // Send both emails
    await Promise.all([
      ses.send(new SendEmailCommand(ownerEmailParams)),
      ses.send(new SendEmailCommand(customerEmailParams))
    ]);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        orderId,
        message: "Order received! Check your email for payment instructions.",
        paymentInstructions: {
          method: payment.method,
          details: paymentInstructions
        }
      })
    };

  } catch (error) {
    console.error("Order error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: "Failed to process order. Please try again or contact us directly." })
    };
  }
};
```

---

## API Gateway Setup

### Create REST API

1. Go to AWS Console → API Gateway
2. Create REST API (not HTTP API for more control)
3. Name: `itprodirect-telecom-api`

### Create Resources and Methods

```
/contact
  POST → Lambda: itprodirect-contact
  OPTIONS → Mock (for CORS preflight)

/orders
  POST → Lambda: itprodirect-orders
  OPTIONS → Mock (for CORS preflight)
```

### CORS Configuration

For each OPTIONS method, configure mock integration with these response headers:

```
Access-Control-Allow-Headers: 'Content-Type'
Access-Control-Allow-Methods: 'POST,OPTIONS'
Access-Control-Allow-Origin: '*'  # Or your Vercel domain
```

### Deploy API

1. Create stage: `prod`
2. Deploy to stage
3. Note the Invoke URL: `https://xxxxxx.execute-api.us-east-1.amazonaws.com/prod`

---

## SES Setup

### Verify Email Addresses

In SES sandbox mode, you must verify both sender and recipient emails:

1. Go to SES Console → Verified Identities
2. Add and verify: `nick@itprodirect.com`
3. (Optional) Verify a "from" address like `noreply@itprodirect.com`

### Request Production Access

When ready for real customers:

1. SES Console → Account Dashboard
2. Request production access
3. Explain use case: transactional emails for e-commerce orders

---

## SAM Template (Optional)

For infrastructure-as-code deployment:

**File:** `template.yaml`

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: IT Pro Direct Telecom Equipment Site Backend

Globals:
  Function:
    Timeout: 10
    Runtime: nodejs18.x
    Environment:
      Variables:
        OWNER_EMAIL: nick@itprodirect.com
        FROM_EMAIL: noreply@itprodirect.com

Resources:
  ContactFunction:
    Type: AWS::Serverless::Function
    Properties:
      FunctionName: itprodirect-contact
      CodeUri: lambda/contact/
      Handler: index.handler
      Policies:
        - SESCrudPolicy:
            IdentityName: "*"
      Events:
        Contact:
          Type: Api
          Properties:
            Path: /contact
            Method: post
            RestApiId: !Ref ApiGateway

  OrdersFunction:
    Type: AWS::Serverless::Function
    Properties:
      FunctionName: itprodirect-orders
      CodeUri: lambda/orders/
      Handler: index.handler
      Policies:
        - SESCrudPolicy:
            IdentityName: "*"
      Events:
        Orders:
          Type: Api
          Properties:
            Path: /orders
            Method: post
            RestApiId: !Ref ApiGateway

  ApiGateway:
    Type: AWS::Serverless::Api
    Properties:
      Name: itprodirect-telecom-api
      StageName: prod
      Cors:
        AllowMethods: "'POST,OPTIONS'"
        AllowHeaders: "'Content-Type'"
        AllowOrigin: "'*'"

Outputs:
  ApiUrl:
    Description: API Gateway endpoint URL
    Value: !Sub "https://${ApiGateway}.execute-api.${AWS::Region}.amazonaws.com/prod"
```

### Deploy with SAM

```bash
# Build
sam build

# Deploy (guided first time)
sam deploy --guided

# Subsequent deploys
sam deploy
```

---

## Testing

### Test Contact Form (curl)

```bash
curl -X POST https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/prod/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "555-1234",
    "message": "This is a test message from the contact form."
  }'
```

### Test Order (curl)

```bash
curl -X POST https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/prod/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {
      "name": "Test Buyer",
      "email": "test@example.com",
      "phone": "555-1234"
    },
    "items": [
      {
        "sku": "RocketM5-US",
        "name": "Ubiquiti RocketM5",
        "quantity": 2,
        "unitPrice": 59.00,
        "lineTotal": 118.00
      }
    ],
    "shipping": {
      "method": "pickup",
      "cost": 0
    },
    "payment": {
      "method": "wire",
      "subtotal": 118.00,
      "paypalFee": 0,
      "total": 118.00
    }
  }'
```

---

## Troubleshooting

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| CORS errors | Missing headers | Ensure OPTIONS returns proper CORS headers |
| Email not received | SES sandbox | Verify recipient email in SES |
| 500 errors | Lambda crash | Check CloudWatch logs for Lambda |
| "Access Denied" | IAM permissions | Ensure Lambda has SES permissions |

### CloudWatch Logs

```bash
# View Lambda logs
aws logs tail /aws/lambda/itprodirect-contact --follow
aws logs tail /aws/lambda/itprodirect-orders --follow
```
