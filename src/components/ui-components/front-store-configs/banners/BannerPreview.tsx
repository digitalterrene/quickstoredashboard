"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useFrontStoreConfig } from "@/context";
import { MobileDevice } from "../devices/MobileDevice";
import { TabletDevice } from "../devices/TabletDevice";
import { DesktopDevice } from "../devices/DesktopDevice";
import { templates } from "./templates";

export default function BannerPreview() {
  const { previewDevice, frontStoreConfigInputs } = useFrontStoreConfig();
  const [ActiveTemplate, setActiveTemplate] = useState<ReactNode>(() => {
    const matchedTemplate = templates?.find(
      (template_element) =>
        template_element?.template_name ===
        frontStoreConfigInputs?.template_name
    );
    return matchedTemplate?.template || null;
  });
  useEffect(() => {
    const matchedTemplate = templates?.find(
      (template_element) =>
        template_element?.template_name ===
        frontStoreConfigInputs?.template_name
    );
    setActiveTemplate(matchedTemplate?.template || null);
  }, [templates, frontStoreConfigInputs]);
  return (
    <div
      className={`w-full sticky top-10   flex  ${
        previewDevice ? "justify-start" : "justify-end"
      } max-w-full`}
    >
      {previewDevice === "mobile" ? (
        <MobileDevice>{ActiveTemplate}</MobileDevice>
      ) : previewDevice === "tablet" ? (
        <TabletDevice>{ActiveTemplate}</TabletDevice>
      ) : (
        <DesktopDevice>{ActiveTemplate}</DesktopDevice>
      )}
    </div>
  );
}
