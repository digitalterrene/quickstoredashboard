// productAttributesTemplates.ts
import {
  agricultureAttributes,
  automotiveAttributes,
  constructionAttributes,
  educationAttributes,
  energyAttributes,
  entertainmentAttributes,
  environmentalAttributes,
  fashionAndApparelAttributes,
  financialServicesAttributes,
  foodAndBeverageAttributes,
  healthcareAttributes,
  hospitalityAndTourismAttributes,
  manufacturingAttributes,
  realEstateAttributes,
  retailAttributes,
  technologyAttributes,
  telecommunicationsAttributes,
  transportationAttributes,
} from "@/data/front-store-data/productAttributes";
import { ProductAttributesObjectType } from "@/ts-types/data";

// Export a map of industry attributes
export const industryAttributesTemplates: {
  [key: string]: ProductAttributesObjectType[];
} = {
  retail: retailAttributes,
  "food-and-beverage": foodAndBeverageAttributes,
  "hospitality-and-tourism": hospitalityAndTourismAttributes,
  automotive: automotiveAttributes,
  healthcare: healthcareAttributes,
  technology: technologyAttributes,
  entertainment: entertainmentAttributes,
  "real-estate": realEstateAttributes,
  "financial-services": financialServicesAttributes,
  energy: energyAttributes,
  education: educationAttributes,
  agriculture: agricultureAttributes,
  transportation: transportationAttributes,
  manufacturing: manufacturingAttributes,
  construction: constructionAttributes,
  telecommunications: telecommunicationsAttributes,
  "fashion-and-apparel": fashionAndApparelAttributes,
  environmental: environmentalAttributes,
};
