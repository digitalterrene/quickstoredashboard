import { BsPeople } from "react-icons/bs";
import { FiBox } from "react-icons/fi";
import { HiOutlineCash } from "react-icons/hi";
import { IoPricetagsOutline, IoStorefrontOutline } from "react-icons/io5";

import { TbInvoice } from "react-icons/tb";

export const store_data_routes = [
  { name: "products", icon: <IoPricetagsOutline /> },
  { name: "orders", icon: <FiBox /> },
  { name: "invoices", icon: <TbInvoice /> },
  { name: "customers", icon: <BsPeople /> },
  { name: "sales", icon: <HiOutlineCash /> },
  { name: "suppliers", icon: <IoStorefrontOutline /> },
];
export const categories = [
  "retail",
  "food_and_beverage",
  "hospitality_and_tourism",
  "automotive",
  "healthcare",
  "technology",
  "entertainment",
  "real_estate",
  "financial_services",
  "energy",
  "education",
  "agriculture",
  "transportation ",
  "manufacturing",
  "construction",
  "telecommunications",
  "fashion_and_apparel",
  "environmental",
];
