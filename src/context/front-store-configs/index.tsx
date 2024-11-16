import { create } from "zustand";

export const useFrontStoreHeroConfig = create((set: any) => ({
  frontStoreConfigHeroInputs: {
    text_color: null,
    background_color: "",
    small_heading: "",
    template_name: "",
    big_heading: "",
    big_heading_text_color: "",
    featured_image: "",
    isGradient: false,
    description: "",
    button_one_text: "",
    button_one_radius: 0,
    button_two_text: "",
    button_two_radius: 0,
    button_one_background_color: "",
    button_one_text_color: "",
    button_two_background_color: "",
    button_two_text_color: "",
    background_image: "",
    hide_small_heading: false,
    hide_big_heading: false,
    hide_button_one: false,
    hide_button_two: false,
  },
  setFrontStoreConfigHeroInputs: (newInputs: any) =>
    set((state: any) => ({
      frontStoreConfigHeroInputs: {
        ...state.frontStoreConfigHeroInputs,
        ...newInputs,
      },
    })),
}));
export const useFrontStoreNavbarConfig = create((set: any) => ({
  frontStoreConfigNavbarInputs: {
    store_logo: null,
    store_name: "",
    store_name_text_color: "",
    slogan: "",
    routes: [
      "New Arrivals",
      "Product Range",
      "Live Chat",
      "Return Policy",
      "Contact Store",
    ],
    template_name: "",
    routes_link_color: "",
    routes_link_hover_color: "",
    background_color: "",
    background_image: null,
    hide_logo: false,
    hide_store_name: false,
    show_slogan: false,
  },
  setFrontStoreConfigNavbarInputs: (newInputs: any) =>
    set((state: any) => ({
      frontStoreConfigNavbarInputs: {
        ...state.frontStoreConfigNavbarInputs,
        ...newInputs,
      },
    })),
}));
