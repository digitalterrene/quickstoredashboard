import { months } from "../other";

type Month = (typeof months)[number];

type Category =
  | "ads"
  | "social_accounts"
  | "promotions"
  | "coupons"
  | "newsletters";

export const TargetDatainitialState: Record<Category, Record<Month, number>> = {
  ads: {
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
  social_accounts: {
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
  promotions: {
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
  coupons: {
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
  newsletters: {
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
