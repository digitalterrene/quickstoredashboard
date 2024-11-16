export interface ProductObjectType {
  name?: string;
  units_sold: number;
  image?: string;
  price?: number;
  stock_count?: number;
  tagline?: string;
  description?: string;
  atributes?: object[];
  images?: string[];
  reviews?: object[];
  category?: string;
  quickstoredashboard_stores_category?: string;
  publisher?: object;
  specs?: object[];
  created_at?: any;
  _id?: string;
  id?: any;
  pid?: string;
  productSku?: "";
  [key: string]: any;
}
export interface CustomerObjectType {
  name?: string;
  lastname?: string;
  email?: string;
  position?: string;
  phone?: string;
  company?: string;
  gender?: string;
  image?: string;
  value?: number;
  tagline?: string;
  description?: string;
  products?: object[];
  orders?: string[];
  rating?: number;
  category?: string;
  invoices?: string[];
  purchases?: string[];
  reviews?: object[];
  publisher?: object;
  created_at?: any;
  location?: string;
  _id?: string;
}
export interface SidenavInputsType {
  rating?: string;
  [key: string]: any; // Add this line if there are other dynamic properties
}
export interface OrderObjectType {
  order_id: string;
  order_number?: string;
  created_at: string;
  order_status: string;
  customer_image: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  shipping_method: any;
  status?: string;
  customer?: any;
  shipping_cost: number;
  billing_address: string;
  billing_card_number?: string;
  billing_name_on_card?: string;
  billing_expiration_date?: string;
  billing_cvc?: string;
  payment_method: string;
  total_cost: number;
  products?: any;
  discounts?: number;
  tax_details?: number;
  special_instructions?: string;
  _id?: string;
  customer_information?: any;
  payment_information?: any;
  shipping_information?: any;
  billing_information?: any;
  [key: string]: any;
}

export interface InvoiceObjectType {
  invoice_number?: string;
  invoice_date?: string;
  due_date?: string;
  seller_name?: string;
  seller_address?: string;
  seller_contact?: string;
  buyer_name?: string;
  buyer_address?: string;
  buyer_contact?: string;
  products?: Array<{
    description: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
  payment_method?: string;
  payment_terms?: string;
  tax_rate?: number;
  tax_amount?: number;
  subtotal?: number;
  total_amount?: number;
  notes?: string;
  terms_and_conditions?: string;
  _id?: string;
}
export interface SalesObjectType {
  sale_number?: string;
  sale_date?: string;
  buyer_name?: string;
  invoice_id?: string;
  order_id?: string;
  customer_id?: string;
  buyer_address?: string;
  buyer_contact?: string;
  products?: Array<{
    description: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
  payment_method?: string;
  payment_terms?: string;
  tax_rate?: number;
  tax_amount?: number;
  subtotal?: number;
  total_amount?: number;
  notes?: string;
  terms_and_conditions?: string;
  _id?: string;
}
export interface ProductAttributesObjectType {
  data_type?: string;
  label?: string;
  name?: string;
  description?: string;
  image?: string;
  icon?: string;
}
export interface ProductVariationsObjectType {
  data_type?: string;
  label?: string;
  name?: string;
  description?: string;
  image?: string;
  icon?: string;
  [key: string]: any;
}
