import { ContactFormData, OrderData } from "./validation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  details?: string[];
  data?: T;
}

interface ContactResponse {
  success: boolean;
  message: string;
}

interface OrderResponse {
  success: boolean;
  orderId: string;
  message: string;
  paymentInstructions: {
    method: string;
    details: string;
  };
}

/**
 * Submit contact form to AWS Lambda via API Gateway
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<ApiResponse<ContactResponse>> {
  // If no API URL configured, return mock success for development
  if (!API_URL) {
    console.warn("NEXT_PUBLIC_API_URL not configured - using mock response");
    return {
      success: true,
      message: "Thank you for your message. We'll respond within 24 hours.",
      data: {
        success: true,
        message: "Thank you for your message. We'll respond within 24 hours.",
      },
    };
  }

  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || "Failed to send message",
        details: result.details,
      };
    }

    return {
      success: true,
      message: result.message,
      data: result,
    };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return {
      success: false,
      error: "Network error. Please try again or email us directly.",
    };
  }
}

/**
 * Submit order to AWS Lambda via API Gateway
 */
export async function submitOrder(
  data: OrderData
): Promise<ApiResponse<OrderResponse>> {
  // If no API URL configured, return mock success for development
  if (!API_URL) {
    console.warn("NEXT_PUBLIC_API_URL not configured - using mock response");
    const mockOrderId = `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    return {
      success: true,
      message: "Order received! Check your email for payment instructions.",
      data: {
        success: true,
        orderId: mockOrderId,
        message: "Order received! Check your email for payment instructions.",
        paymentInstructions: {
          method: data.payment.method,
          details: `Mock payment instructions for ${data.payment.method}. Configure NEXT_PUBLIC_API_URL for real submissions.`,
        },
      },
    };
  }

  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || "Failed to process order",
        details: result.details,
      };
    }

    return {
      success: true,
      message: result.message,
      data: result,
    };
  } catch (error) {
    console.error("Order submission error:", error);
    return {
      success: false,
      error: "Network error. Please try again or contact us directly.",
    };
  }
}
