import { z } from "zod";

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

export const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required for orders"),
  address: z
    .object({
      street: z.string().min(1, "Street address is required"),
      city: z.string().min(1, "City is required"),
      state: z.string().min(2, "State is required"),
      zip: z.string().min(5, "ZIP code is required"),
    })
    .optional(),
});

export const orderItemSchema = z.object({
  sku: z.string(),
  name: z.string(),
  quantity: z.number().int().positive(),
  unitPrice: z.number().positive(),
  lineTotal: z.number().positive(),
});

export const orderSchema = z.object({
  customer: customerSchema,
  items: z.array(orderItemSchema).min(1, "Order must have at least one item"),
  shipping: z.object({
    method: z.enum(["pickup", "ship"]),
    cost: z.number().min(0),
  }),
  payment: z.object({
    method: z.enum(["wire", "ach", "paypal"]),
    subtotal: z.number().positive(),
    paypalFee: z.number().min(0),
    total: z.number().positive(),
  }),
  notes: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type OrderData = z.infer<typeof orderSchema>;
