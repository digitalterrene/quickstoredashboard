export interface CustomerSupportChatObject {
  customer_id: string;
  customer_name: string;
  customer_image: string;
  customer_email: string;
  latest_message: string;
  latest_message_created_at: string;
  messages?: {
    sender: string;
    receiver: string;
    message: string;
    created_at: string;
    _id: string;
  }[];
  created_at?: string;
  _id?: string;
}
