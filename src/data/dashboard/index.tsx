import { months } from "../other";

type Month = (typeof months)[number];

type Category = "products" | "orders" | "invoices" | "sales";

export const TargetDataInitialState: Record<Category, Record<Month, number>> = {
  products: {
    Jan: 10,
    Feb: 10,
    Mar: 10,
    Apr: 10,
    May: 10,
    Jun: 10,
    Jul: 10,
    Aug: 10,
    Sep: 10,
    Oct: 10,
    Nov: 10,
    Dec: 10,
  },
  orders: {
    Jan: 10,
    Feb: 10,
    Mar: 10,
    Apr: 10,
    May: 10,
    Jun: 10,
    Jul: 10,
    Aug: 10,
    Sep: 10,
    Oct: 10,
    Nov: 10,
    Dec: 10,
  },
  invoices: {
    Jan: 10,
    Feb: 10,
    Mar: 10,
    Apr: 10,
    May: 10,
    Jun: 10,
    Jul: 10,
    Aug: 10,
    Sep: 10,
    Oct: 10,
    Nov: 10,
    Dec: 10,
  },
  sales: {
    Jan: 10,
    Feb: 10,
    Mar: 10,
    Apr: 10,
    May: 10,
    Jun: 10,
    Jul: 10,
    Aug: 10,
    Sep: 10,
    Oct: 10,
    Nov: 10,
    Dec: 10,
  },
};
