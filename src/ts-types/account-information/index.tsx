export interface AccountInformationLocationObject {
  street_address?: string;
  city?: string;
  postal_code?: string;
  state?: string;
  country?: string;
}
export interface AccountInformationBillingObject {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  street_address?: string;
  apartment?: string;
  postal_code?: string;
  city?: string;
  state?: string;
  name_on_card?: string;
  card_number?: string;
  expiration_date?: string;
  cvv_code?: string;
}
export interface AccountInformationProfileObject {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email?: string;
  gender?: string;
  bio?: string;
  image?: string;
}
export interface AccountInformationFWCObject {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email?: string;
  gender?: string;
  bio?: string;
  image?: string;
  street_address?: string;
  apartment?: string;
  postal_code?: string;
  city?: string;
  state?: string;
  country?: string;
}
export interface AccountInformationLegalInformationObject {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email?: string;
  gender?: string;
  bio?: string;
  image?: string;
  street_address?: string;
  apartment?: string;
  postal_code?: string;
  city?: string;
  state?: string;
  country?: string;
}
export interface AccountInformationShippingObject {
  shipping_id?: string;
  shipping_mode?: string;
  delivery_address?: string;
  sale_id?: string;
  order_id?: string;
  invoice_id?: string;
  customer_id?: string;
  products?: any;
  delivery_person?: string;
  days_to_deliver?: number;
  created_at?: string;
  delivery_status?: string;
  estimated_delivery_date?: string;
  tracking_number?: string;
  _id?: string;
}
export interface AccountInformationMarketingSocialAccountsObject {
  username?: string;
  email?: string;
  password?: string;
  created_at?: string;
  profile_photo_url?: string;
  social_media_platform?: string;
  bio?: string;
  firstname?: string;
  login_url?: string;
  lastname?: number;
  location?: string;
  phone_number?: string;
  _id?: string;
}
export interface AccountInformationMarketingAdObject {
  title?: string;
  description?: string;
  url?: string;
  image_url?: string;
  ad_type?: string;
  target_audience?: string;
  created_at?: string;
  location?: string;
  end_date?: string;
  budget?: number;
  cta_text?: string;
  cta_url?: string;
  _id?: string;
}
export interface AccountInformationMarketingPromotionObject {
  image_url?: string;
  promotion_name?: string;
  description?: string;
  discount_type?: string;
  discount_value?: string;
  created_at?: string;
  location?: string;
  clicks?: number;
  subscriptions?: number;
  end_date?: string;
  applicable_products?: string;
  _id?: string;
}
export interface AccountInformationMarketingCouponObject {
  image_url: string;
  coupon_code: string;
  description: string;
  discount_type: string;
  discount_value: string;
  expiration_date: string;
  click: number;
  subscriptions: number;
  views: number;
  created_at: string;
  location: string;
  applicable_products: string;
  _id?: string;
}
export interface AccountInformationMarketingNewsletterObject {
  image_url: string;
  title: string;
  description: string;
  email_subject: string;
  email_body: string;
  recipients: string;
  created_at: string;
  clicks: number;
  views: number;
  subscriptions: number;
  location: string;
  _id: string;
}
