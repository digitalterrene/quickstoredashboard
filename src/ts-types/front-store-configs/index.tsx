export interface NavbarConfigurationInputsType {
  store_logo?: any;
  store_name: string;
  slogan?: string;
  description?: string;
  routes: object[];
  text_color?: string;
  background_color?: string;
  background_image?: any;
  hide_logo?: boolean;
  hide_store_name?: boolean;
  show_slogan?: boolean;
}
export interface BannerConfigurationInputsType {
  text_color?: any;
  background_color?: any;
  small_heading: string;
  big_heading: string;
  button_text: string;
  button_radius: number;
  background_image?: any;
  is_dismissable?: boolean;
  hide_small_heading?: boolean;
  hide_big_heading?: boolean;
  hide_button?: boolean;
}
export interface HeroConfigurationInputsType {
  text_color?: any;
  background_color?: any;
  small_heading?: string;
  big_heading?: string;
  big_heading_text_color?: string;
  featured_image?: string;
  description?: string;
  button_one_text?: string;
  button_one_radius?: number;
  button_two_text?: string;
  button_two_radius?: number;
  button_one_background_color?: string;
  button_one_text_color?: string;
  button_two_background_color?: string;
  button_two_text_color?: string;
  background_image?: any;
  hide_small_heading?: boolean;
  hide_big_heading?: boolean;
  hide_button_one?: boolean;
  hide_button_two?: boolean;
}
