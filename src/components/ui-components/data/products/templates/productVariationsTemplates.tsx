// productVariationsTemplates.ts
import {
  agricultureVariations,
  automotiveVariations,
  constructionVariations,
  educationVariations,
  energyVariations,
  entertainmentVariations,
  environmentalVariations,
  fashionAndApparelVariations,
  financialServicesVariations,
  foodAndBeverageVariations,
  healthcareVariations,
  hospitalityAndTourismVariations,
  manufacturingVariations,
  realEstateVariations,
  retailVariations,
  technologyVariations,
  telecommunicationsVariations,
  transportationVariations,
} from "@/data/front-store-data/productVariations";
import { ProductVariationsObjectType } from "@/ts-types/data";

// Export a map of industry attributes
export const industryVariationsTemplates: {
  [key: string]: ProductVariationsObjectType[];
} = {
  retail: retailVariations,
  "food-and-beverage": foodAndBeverageVariations,
  "hospitality-and-tourism": hospitalityAndTourismVariations,
  automotive: automotiveVariations,
  healthcare: healthcareVariations,
  technology: technologyVariations,
  entertainment: entertainmentVariations,
  "real-estate": realEstateVariations,
  "financial-services": financialServicesVariations,
  energy: energyVariations,
  education: educationVariations,
  agriculture: agricultureVariations,
  transportation: transportationVariations,
  manufacturing: manufacturingVariations,
  construction: constructionVariations,
  telecommunications: telecommunicationsVariations,
  "fashion-and-apparel": fashionAndApparelVariations,
  environmental: environmentalVariations,
};
