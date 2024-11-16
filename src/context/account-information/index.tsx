import { create } from "zustand";

export const useAccountInformationCreateDashboardInputs = create(
  (set: any) => ({
    inputs: {
      email: "",
      password: "",
      access_key: "",
      security_key: "",
    },
    setInputs: (newInputs: any) =>
      set((state: any) => ({
        inputs: {
          ...state.inputs,
          ...newInputs,
        },
      })),
  })
);
export const useAccountInformationProfileInformationInputs = create(
  (set: any) => ({
    inputs: {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      gender: "",
      bio: "",
      image: "",
    },
    setInputs: (newInputs: any) =>
      set((state: any) => ({
        inputs: {
          ...state.inputs,
          ...newInputs,
        },
      })),
  })
);
export const useAccountInformationLegalInformationInputs = create(
  (set: any) => ({
    inputs: {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      gender: "",
      bio: "",
      image: "",
      street_address: "",
      apartment: "",
      postal_code: "",
      city: "",
      state: "",
      country: "",
    },
    setInputs: (newInputs: any) =>
      set((state: any) => ({
        inputs: {
          ...state.inputs,
          ...newInputs,
        },
      })),
  })
);
export const useAccountInformationFWCInformationInputs = create((set: any) => ({
  inputs: {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    gender: "",
    bio: "",
    image: "",
    street_address: "",
    apartment: "",
    postal_code: "",
    city: "",
    state: "",
    country: "",
  },
  setInputs: (newInputs: any) =>
    set((state: any) => ({
      inputs: {
        ...state.inputs,
        ...newInputs,
      },
    })),
}));
export const useAccountInformationLocationInformationInputs = create(
  (set: any) => ({
    inputs: {
      country: "",
      city: "",
      state: "",
      postal_code: "",
      street_address: "",
    },
    setInputs: (newInputs: any) =>
      set((state: any) => ({
        inputs: {
          ...state.inputs,
          ...newInputs,
        },
      })),
  })
);
export const useAccountInformationBillingInformationInputs = create(
  (set: any) => ({
    inputs: {
      first_name: "",
      last_name: "",
      phone_number: "",
      street_address: "",
      apartment: "",
      postal_code: "",
      city: "",
      state: "",
      name_on_card: "",
      card_number: "",
      expiration_date: "",
      cvv_code: "",
    },
    setInputs: (newInputs: any) =>
      set((state: any) => ({
        inputs: {
          ...state.inputs,
          ...newInputs,
        },
      })),
  })
);
