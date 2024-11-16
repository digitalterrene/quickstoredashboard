import { useFrontStoreConfig } from "@/context";
import { BannerConfigurationInputsType } from "@/ts-types/front-store-configs";
import React, { useEffect } from "react";

export default function AButtonOnGradientBackground() {
  const {
    previewInFullScreen,
    setFrontStoreConfigInputs,
    frontStoreConfigInputs,
  } = useFrontStoreConfig();
  useEffect(() => {
    setFrontStoreConfigInputs({
      background_color: "linear-gradient(to right, #ef4444, #a855f7, #3b82f6)",
    });
  }, []);

  return (
    <div
      style={{
        backgroundImage: frontStoreConfigInputs?.background_image
          ? `url(${frontStoreConfigInputs.background_image})`
          : frontStoreConfigInputs?.background_color &&
            frontStoreConfigInputs?.isGradient
          ? `${frontStoreConfigInputs.background_color}`
          : undefined,
        backgroundColor: frontStoreConfigInputs?.background_color || undefined,
        color: frontStoreConfigInputs?.text_color || "black",
      }}
      className="bg-no-repeat bg-center bg-cover"
    >
      <div className="max-w-[85rem] px-4 py-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid justify-center md:grid-cols-2 md:justify-between md:items-center gap-2">
          <div className="text-center md:text-start">
            {!frontStoreConfigInputs?.hide_small_heading && (
              <p className={`text-xs text-white  uppercase tracking-wider`}>
                {frontStoreConfigInputs?.small_heading || "small heading"}
              </p>
            )}
            {!frontStoreConfigInputs?.hide_big_heading && (
              <p className="mt-1   font-medium">
                {frontStoreConfigInputs?.big_heading ||
                  " Sign up to get unlimited updates. No credit card required."}
              </p>
            )}
          </div>
          {!frontStoreConfigInputs?.hide_button && (
            <div className="mt-3 text-center md:text-start md:flex md:justify-end md:items-center">
              <a
                style={{
                  borderRadius: frontStoreConfigInputs?.button_radius || 0,
                }}
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold  border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                href="#"
              >
                {frontStoreConfigInputs?.button_text || "Sign up free"}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
