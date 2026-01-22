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

    // “shipping” might not exist — default to local pickup
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
    // Email is optional for MVP; keep if you want to follow up by email

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
