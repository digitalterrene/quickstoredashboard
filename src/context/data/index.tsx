import { ProductVariationsObjectType } from "@/ts-types/data";
import { create } from "zustand";
export const useDataCreateProductAttributesInputs = create((set: any) => ({
  inputs: {
    attributes: [], // Initialize attributes as an empty array
  },
  setInputs: (newInputs: any) =>
    set((state: any) => ({
      inputs: {
        ...state.inputs,
        ...newInputs,
      },
    })),
}));

export const useDataCreateProductVariationsInputs = create((set: any) => ({
  inputs: {
    variations: [], // Initialize variations as an empty array
  },
  setInputs: (newInputs: any) =>
    set((state: any) => ({
      inputs: {
        ...state.inputs,
        ...newInputs,
      },
    })),
}));
