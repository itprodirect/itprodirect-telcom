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
