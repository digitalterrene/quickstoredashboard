export interface UserProfileType {
  name?: string;
  username?: string;
  email?: string;
  image?: string;
  token?: string;
  banner?: string;
  password?: string;
  access_key?: string;
  security_key?: string;
  remember_me?: string;
  _id?: string;
}
export interface InvoiceType {
  client_name: string;
  client_email: string;
  client_phone: string;
  client_address: string;
  client_company_name?: string;
  billing_address_same_as_client: boolean;
  billing_address?: string;
  invoice_number: string;
  invoice_date: string; // Consider using Date type if you prefer
  due_date: string; // Consider using Date type if you prefer
  payment_terms: string;
  purchase_order_number?: string;
  project_or_service_description: string;
  quantity_hours: number;
  rate_price_per_unit_hour: number;
  subtotal: number;
  taxes?: number;
  total_amount_due: number;
  payment_method: string;
  payment_instructions?: string;
  payment_status: string;
  date_paid?: string; // Consider using Date type if you prefer
  notes?: string;
  attachments?: string[]; // Array of attachment URLs
  discount?: number;
  shipping_details?: string;
  terms_and_conditions?: string;
}
