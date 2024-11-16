import { CustomerSupportChatObject } from "./customer-support";
import { CustomerObjectType } from "./data";

export interface ResponseType {
  data?: CustomerObjectType[] | CustomerSupportChatObject[];
  response: string;
  message: string;
}
