import CenterAlignedInDarkBackground from "./CenterAlignedInDarkBackground";
import CenterAlignedWithVideoPlayButtonOnImage from "./CenterAlignedWithVideoPlayButtonOnImage";

import GradientBackground from "./GradientBackground";

import PolygonBackgroundElement from "./PolygonBackgroundElement";
import RoundedImageCarousel from "./RoundedImageCarousel";
import SquareBackgroundElement from "./SquareBackgroundElement";
import TwoTierWithImageAndCTA from "./TwoTierWithImageAndCTA";

export const templates = [
  {
    template_name: "two_tier_with_image_and_cta",
    template: <TwoTierWithImageAndCTA />,
    installations: 0,
  },
  {
    template_name: "center_aligned_with_video_play_button_on_image",
    template: <CenterAlignedWithVideoPlayButtonOnImage />,
    installations: 30,
  },
  {
    template_name: "rounded_image_carousel",
    template: <RoundedImageCarousel />,
    installations: 32,
  },
  {
    template_name: "center_aligned_in_dark_background",
    template: <CenterAlignedInDarkBackground />,
    installations: 3,
  },

  {
    template_name: "gradient_background",
    template: <GradientBackground />,
    installations: 10,
  },
  {
    template_name: "polygon_background_element",
    template: <PolygonBackgroundElement />,
    installations: 12,
  },
  {
    template_name: "square_background_element",
    template: <SquareBackgroundElement />,
    installations: 3,
  },
];
