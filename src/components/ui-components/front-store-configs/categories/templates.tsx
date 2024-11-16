import CategoriesWithExtraScrolling from "./CategoriesWithExtraScrolling";
import TwoColumnGridLayoutWithCardComponents from "./TwoColumnGridLayoutWithCardComponents";
import TwoColumnLayoutWithCardGroups from "./TwoColumnLayoutWithCardGroups";
import TwoColumnLayoutWithHeroImages from "./TwoColumnLayoutWithHeroImages";
import TwoTieredHeaderWithImageOverlayAndCTAButton from "./TwoTieredHeaderWithImageOverlayAndCTAButton";

export const templates = [
  {
    template_name: "categories_with_extra_scrolling",
    template: <CategoriesWithExtraScrolling />,
    installations: 0,
  },
  {
    template_name: "two_column_grid_layout_with_card_components",
    template: <TwoColumnGridLayoutWithCardComponents />,
    installations: 30,
  },
  {
    template_name: "two_column_layout_with_card_groups",
    template: <TwoColumnLayoutWithCardGroups />,
    installations: 32,
  },
  {
    template_name: "two_column_layout_with_hero_images",
    template: <TwoColumnLayoutWithHeroImages />,
    installations: 3,
  },

  {
    template_name: "two_tiered_header_with_image_overlay_and_cta_button",
    template: <TwoTieredHeaderWithImageOverlayAndCTAButton />,
    installations: 10,
  },
];
