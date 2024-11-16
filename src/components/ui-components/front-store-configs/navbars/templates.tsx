import BaseHeader from "./BaseHeader";
import CenterAlignedInLime from "./CenterAlignedInLime";
import PrimaryBackground from "./PrimaryBackground";
import WithTopBar from "./WithTopBar";

export const templates = [
  {
    template_name: "base_header",
    installations: 39,
    template: <BaseHeader />,
  },
  {
    template_name: "center_aligned_in_line",
    installations: 9,
    template: <CenterAlignedInLime />,
  },
  {
    template_name: "primary_background",
    installations: 19,
    template: <PrimaryBackground />,
  },
  {
    template_name: "with_top_bar",
    installations: 3,
    template: <WithTopBar />,
  },
];
