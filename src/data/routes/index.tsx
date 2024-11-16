import { RiUserSettingsLine } from "react-icons/ri";
import {
  MdOutlineDonutSmall,
  MdOutlineLocalShipping,
  MdOutlineSpaceDashboard,
} from "react-icons/md";

import { TbUserScan } from "react-icons/tb";

export const routes = [
  { name: "dashboard", icon: <MdOutlineSpaceDashboard /> },
  { name: "account-information", icon: <TbUserScan /> },
  { name: "management", icon: <RiUserSettingsLine /> },
  { name: "marketing", icon: <MdOutlineDonutSmall /> },
  { name: "shipping", icon: <MdOutlineLocalShipping /> },
];
export const forms_of_ownership = [
  "sole_proprietorship_or_sole_trader",
  "partnership_general",
  "partnership_limited",
  "limited_liability_partnership",
  "corporation_c",
  "corporation_s",
  "public_limited_company_plc",
  "private_limited_company_ltd",
  "cooperative",
  "limited_liability_company_llc",
  "trust",
  "franchise",
];
