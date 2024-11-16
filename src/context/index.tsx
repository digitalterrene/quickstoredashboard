import { getCurrentMonth } from "@/utils/getCurrentMonth";
import { create } from "zustand";
// interface SidenavInputsStore {
//   sidenavInputs: Record<string, any>; // This allows any key-value pairs
//   setSidenavInputs: (inputs: Record<string, any>) => void;
//   addItem: Record<string, any>;
//   toggleSidebarState: Record<string, any>;
//   setAddItem: (inputs: Record<string, any>) => void;
//   isSidenavOpen: Record<string, any>;
//   isGridMode: Record<string, any>;
//   isFullScreen: Record<string, any>;
//   openSidenav: (inputs: Record<string, any>) => void;
//   closeSidenav: (inputs: Record<string, any>) => void;
//   toggleIsGridMode: (inputs: Record<string, any>) => void;
//   toggleIsFullScreen: (inputs: Record<string, any>) => void;
//   toggleSidebar: (inputs: Record<string, any>) => void;
// }
export const useFrontStoreConfig = create((set: any) => ({
  previewInFullScreen: false,
  previewDevice: "desktop",
  changePreviewDevice: (newDevice: string) => set({ previewDevice: newDevice }),
  frontStoreConfigInputs: {
    template_name: "",
    routes: [],
    categories: [],
    store_name: "",
    text_color: "",
    background_color: "",
    isGradient: false,
    store_logo: null,
    background_image: null,
    small_heading: "",
    description: "",
    button_one_text: "",
    button_two_text: "",
    big_heading: "",
    button_text: "",
    button_radius: 0,
    is_dismissable: false,
    hide_small_heading: false,
    hide_big_heading: false,
    hide_button: false,
  },
  resetFrontStoreConfigInputs: () =>
    set(() => ({
      frontStoreConfigInputs: {
        template: "",
        routes: [],
        store_name: "",
        text_color: "",
        backround_color: "",
        store_logo: null,
        background_image: null,
      },
    })),
  setFrontStoreConfigInputs: (newInputs: any) =>
    set((state: any) => ({
      frontStoreConfigInputs: { ...state.frontStoreConfigInputs, ...newInputs },
    })),
  togglePreviewInFullScreen: () =>
    set((state: any) => ({ previewInFullScreen: !state.previewInFullScreen })),
}));

export const useSideNavInputs = create((set: any) => ({
  addItem: "",
  sidenavInputs: {
    products: [],
    customer: { name: "", email: "", password: "", image: "" },
  },
  toggleSidebarState: true,
  setAddItem: (addItem: string) => set({ addItem }),
  isSidenavOpen: false,
  isGridMode: false,
  isFullScreen: false,
  openSidenav: () => set({ isSidenavOpen: true }),
  closeSidenav: () => set({ isSidenavOpen: false }),
  setSidenavInputs: (newInputs: Record<string, any>) =>
    set((state: any) => ({
      sidenavInputs: { ...state.sidenavInputs, ...newInputs },
    })),
  toggleIsGridMode: () =>
    set((state: any) => ({ isGridMode: !state.isGridMode })),
  toggleIsFullScreen: () =>
    set((state: any) => ({ isFullScreen: !state.isFullScreen })),
  toggleSidebar: () =>
    set((state: any) => ({ toggleSidebarState: !state.toggleSidebarState })),
}));
export const useGlobalStates = create((set: any) => ({
  selectedAnalyicsMonth: getCurrentMonth(),
  setSelectedAnalyicsMonth: (selectedAnalyicsMonth: string) =>
    set({ selectedAnalyicsMonth }),
}));
export const useClientActions = create((set: any) => ({
  clientAction: "place_an_order",
  isClientMode: false,
  toggleIsClientMode: () =>
    set((state: any) => ({ isClientMode: !state.isClientMode })),
  setClientAction: (clientAction: string) => set({ clientAction }),
}));
export const useFrontStoreSidePanelFilterConfig = create((set: any) => ({
  frontStoreSidePanelFilterConfigInputs: {
    template_name: "",
    filters: [],
  },
  resetFrontStoreSidePanelFilterConfigInputs: () =>
    set(() => ({
      frontStoreSidePanelFilterConfigInputs: {
        template_name: "",
        filters: [],
      },
    })),
  setFrontStoreSidePanelFilterConfigInputs: (newInputs: any) =>
    set((state: any) => ({
      frontStoreSidePanelFilterConfigInputs: {
        ...state.frontStoreSidePanelFilterConfigInputs,
        ...newInputs,
      },
    })),
}));
