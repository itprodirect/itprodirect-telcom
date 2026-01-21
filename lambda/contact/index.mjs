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
