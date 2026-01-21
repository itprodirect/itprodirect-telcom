export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

export interface OrderItem {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  orderId?: string;
  customer: CustomerInfo;
  items: OrderItem[];
  shipping: {
    method: "pickup" | "ship";
    cost: number;
  };
  payment: {
    method: "wire" | "ach" | "paypal";
    subtotal: number;
    paypalFee: number;
    total: number;
  };
  notes?: string;
  createdAt?: string;
}
