"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { submitOrderRequest } from "@/lib/api";
import { orderRequestSchema, OrderRequestData } from "@/lib/validation";
import { getProducts, getProductBySku } from "@/lib/products";
import { Product } from "@/types/product";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface OrderItem {
  sku: string;
  name: string;
  qty: number;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  items?: string;
  general?: string;
}

export function OrderRequestForm() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);

  // Customer info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Order items
  const [items, setItems] = useState<OrderItem[]>([]);
  const [selectedSku, setSelectedSku] = useState("");
  const [selectedQty, setSelectedQty] = useState(1);

  // Fulfillment
  const [fulfillmentMethod, setFulfillmentMethod] = useState<"pickup" | "ship">("pickup");
  const [notes, setNotes] = useState("");

  // Form state
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [orderId, setOrderId] = useState("");

  // Load products and pre-populate from URL params
  useEffect(() => {
    const allProducts = getProducts();
    setProducts(allProducts);

    // Check for sku in URL params
    const skuParam = searchParams.get("sku");
    const qtyParam = searchParams.get("qty");

    if (skuParam) {
      const product = getProductBySku(skuParam);
      if (product) {
        const qty = qtyParam ? parseInt(qtyParam, 10) : 1;
        setItems([{ sku: product.sku, name: product.name, qty: Math.max(1, qty) }]);
      }
    }
  }, [searchParams]);

  const addItem = () => {
    if (!selectedSku) return;

    const product = products.find(p => p.sku === selectedSku);
    if (!product) return;

    // Check if item already in list
    const existingIndex = items.findIndex(i => i.sku === selectedSku);
    if (existingIndex >= 0) {
      // Update quantity
      const updated = [...items];
      updated[existingIndex].qty += selectedQty;
      setItems(updated);
    } else {
      // Add new item
      setItems([...items, { sku: product.sku, name: product.name, qty: selectedQty }]);
    }

    setSelectedSku("");
    setSelectedQty(1);
    setErrors(prev => ({ ...prev, items: undefined }));
  };

  const removeItem = (sku: string) => {
    setItems(items.filter(i => i.sku !== sku));
  };

  const updateItemQty = (sku: string, qty: number) => {
    if (qty < 1) return;
    setItems(items.map(i => i.sku === sku ? { ...i, qty } : i));
  };

  const validateForm = (): boolean => {
    const data: OrderRequestData = {
      customer: { name, email: email || undefined, phone },
      items,
      fulfillment: { method: fulfillmentMethod },
      notes: notes || undefined,
    };

    const result = orderRequestSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((err) => {
        const path = err.path.join(".");
        if (path.startsWith("customer.name")) fieldErrors.name = err.message;
        else if (path.startsWith("customer.email")) fieldErrors.email = err.message;
        else if (path.startsWith("customer.phone")) fieldErrors.phone = err.message;
        else if (path.startsWith("items")) fieldErrors.items = err.message;
        else fieldErrors.general = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus("submitting");
    setErrors({});

    const data: OrderRequestData = {
      customer: { name, email: email || undefined, phone },
      items,
      fulfillment: { method: fulfillmentMethod },
      notes: notes || undefined,
    };

    try {
      const response = await submitOrderRequest(data);

      if (response.success && response.data) {
        setStatus("success");
        setOrderId(response.data.orderId);
      } else {
        setStatus("error");
        if (response.details && response.details.length > 0) {
          setErrors({ general: response.details.join(", ") });
        } else {
          setErrors({
            general: response.error || "Failed to submit order request. Please try again.",
          });
        }
      }
    } catch {
      setStatus("error");
      setErrors({
        general: "Network error. Please try again or contact us directly.",
      });
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center dark:border-green-800 dark:bg-green-900/20">
        <svg
          className="mx-auto h-12 w-12 text-green-500 dark:text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-4 text-lg font-semibold text-green-800 dark:text-green-300">
          Order Request Received!
        </h3>
        <p className="mt-2 text-green-700 dark:text-green-400">
          Your order ID is: <strong>{orderId}</strong>
        </p>
        <p className="mt-2 text-sm text-green-600 dark:text-green-500">
          We&apos;ll contact you within 24 hours to confirm availability, arrange {fulfillmentMethod === "pickup" ? "pickup" : "shipping"}, and discuss payment.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link href="/products">
            <Button variant="outline">Continue Browsing</Button>
          </Link>
          <Button onClick={() => {
            setStatus("idle");
            setItems([]);
            setName("");
            setEmail("");
            setPhone("");
            setNotes("");
          }}>
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          {errors.general}
        </div>
      )}

      {/* Customer Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Information</h3>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
            Name <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors(prev => ({ ...prev, name: undefined }));
            }}
            placeholder="Your name"
            className={errors.name ? "border-red-500" : ""}
            disabled={status === "submitting"}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
            Phone <span className="text-red-500">*</span>
          </label>
          <Input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setErrors(prev => ({ ...prev, phone: undefined }));
            }}
            placeholder="(555) 123-4567"
            className={errors.phone ? "border-red-500" : ""}
            disabled={status === "submitting"}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
          <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">We&apos;ll call or text to confirm your order</p>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
            Email <span className="text-gray-400 dark:text-slate-500">(optional)</span>
          </label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors(prev => ({ ...prev, email: undefined }));
            }}
            placeholder="you@example.com"
            className={errors.email ? "border-red-500" : ""}
            disabled={status === "submitting"}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>
      </div>

      {/* Items */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Items</h3>

        {errors.items && (
          <p className="text-sm text-red-500">{errors.items}</p>
        )}

        {/* Current items list */}
        {items.length > 0 && (
          <div className="rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-slate-300">Product</th>
                  <th className="px-4 py-2 text-center font-medium text-gray-700 dark:text-slate-300">Qty</th>
                  <th className="px-4 py-2 text-right font-medium text-gray-700 dark:text-slate-300"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                {items.map((item) => (
                  <tr key={item.sku} className="bg-white dark:bg-slate-900">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                      <div className="text-xs text-gray-500 dark:text-slate-400">{item.sku}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateItemQty(item.sku, item.qty - 1)}
                          className="h-8 w-8 rounded border border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-800"
                          disabled={item.qty <= 1 || status === "submitting"}
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-gray-900 dark:text-white">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateItemQty(item.sku, item.qty + 1)}
                          className="h-8 w-8 rounded border border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-800"
                          disabled={status === "submitting"}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => removeItem(item.sku)}
                        className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                        disabled={status === "submitting"}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add item selector */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="product-select" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              Add Product
            </label>
            <select
              id="product-select"
              value={selectedSku}
              onChange={(e) => setSelectedSku(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-slate-600 px-3 py-2.5 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={status === "submitting"}
            >
              <option value="">Select a product...</option>
              {products.map((p) => (
                <option key={p.sku} value={p.sku}>
                  {p.name} ({p.quantity} available)
                </option>
              ))}
            </select>
          </div>
          <div className="w-24">
            <label htmlFor="qty-select" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              Qty
            </label>
            <Input
              type="number"
              id="qty-select"
              min="1"
              value={selectedQty}
              onChange={(e) => setSelectedQty(Math.max(1, parseInt(e.target.value) || 1))}
              disabled={status === "submitting"}
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={addItem}
            disabled={!selectedSku || status === "submitting"}
          >
            Add
          </Button>
        </div>
      </div>

      {/* Fulfillment */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Fulfillment</h3>

        <div className="flex flex-col gap-3 sm:flex-row">
          <label className={`flex-1 cursor-pointer rounded-lg border-2 p-4 transition-colors ${
            fulfillmentMethod === "pickup"
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600"
          }`}>
            <input
              type="radio"
              name="fulfillment"
              value="pickup"
              checked={fulfillmentMethod === "pickup"}
              onChange={() => setFulfillmentMethod("pickup")}
              className="sr-only"
              disabled={status === "submitting"}
            />
            <div className="font-medium text-gray-900 dark:text-white">Local Pickup</div>
            <div className="text-sm text-gray-500 dark:text-slate-400">Palm Harbor, FL area (recommended)</div>
          </label>

          <label className={`flex-1 cursor-pointer rounded-lg border-2 p-4 transition-colors ${
            fulfillmentMethod === "ship"
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600"
          }`}>
            <input
              type="radio"
              name="fulfillment"
              value="ship"
              checked={fulfillmentMethod === "ship"}
              onChange={() => setFulfillmentMethod("ship")}
              className="sr-only"
              disabled={status === "submitting"}
            />
            <div className="font-medium text-gray-900 dark:text-white">Shipping</div>
            <div className="text-sm text-gray-500 dark:text-slate-400">We&apos;ll contact you to arrange</div>
          </label>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
          Notes <span className="text-gray-400 dark:text-slate-500">(optional)</span>
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-slate-600 px-3 py-2.5 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
          placeholder="Any special requests or questions..."
          disabled={status === "submitting"}
        />
      </div>

      {/* Submit */}
      <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
        <p className="mb-4 text-sm text-gray-500 dark:text-slate-400">
          This is an order request, not a final order. We&apos;ll contact you to confirm availability, arrange {fulfillmentMethod === "pickup" ? "pickup" : "shipping"}, and discuss payment options (Wire, ACH, PayPal, or cash for local pickup).
        </p>
        <Button
          type="submit"
          className="w-full"
          isLoading={status === "submitting"}
          disabled={status === "submitting" || items.length === 0}
        >
          {status === "submitting" ? "Submitting..." : "Submit Order Request"}
        </Button>
      </div>
    </form>
  );
}
