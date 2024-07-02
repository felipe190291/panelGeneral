export type Customer = {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  city: string;
  createdAt:string
};
export type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  createdAt:string
};
export type Order = {
  id: string;
  order_date: string;
  order_status: "pending" | "on_route"| "delivered"| "cancelled";
  order_paid: boolean;
  client_id: number;
  shipping_rule: 'home_delivery' | 'pickup_point';
  observations: string;
  Customer: Customer;
  products: Product[]; 
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  
};