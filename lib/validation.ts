import { z } from "zod";

// Contact form validation
export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000),
  website: z.string().optional(), // Honeypot
});

// Order request validation (simplified - no payment processing)
export const orderRequestSchema = z.object({
  customer: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    phone: z.string().min(10, "Phone number is required"),
  }),
  items: z
    .array(
      z.object({
        sku: z.string(),
        name: z.string(),
        qty: z.number().int().positive(),
      })
    )
    .min(1, "At least one item is required"),
  fulfillment: z.object({
    method: z.enum(["pickup", "ship"]).default("pickup"),
  }),
  notes: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type OrderRequestData = z.infer<typeof orderRequestSchema>;
