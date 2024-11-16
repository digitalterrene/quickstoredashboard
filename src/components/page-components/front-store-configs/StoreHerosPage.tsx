"use client";
import { updateFrontStoreConfigData } from "@/api-calls/front-store-config/updateFrontStoreConfigData";
import HeroConfiguration from "@/components/ui-components/front-store-configs/heros/HeroConfiguration";
import HeroPreview from "@/components/ui-components/front-store-configs/heros/HeroPreview";

import HeroTemplates from "@/components/ui-components/front-store-configs/heros/HeroTemplates";
import { useFrontStoreConfig } from "@/context";
import { useAuthContext } from "@/context/auth-context/AuthContext";

import { useFrontStoreHeroConfig } from "@/context/front-store-configs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { HiOutlineDeviceMobile } from "react-icons/hi";
import { HiMiniDeviceTablet } from "react-icons/hi2";

import { IoSaveOutline } from "react-icons/io5";
import { TbDeviceDesktop } from "react-icons/tb";
import { toast } from "react-toastify";

export default function StoreHerosPage({ response }: { response: any }) {
  const {
    changePreviewDevice,
    togglePreviewInFullScreen,
    previewInFullScreen,
  } = useFrontStoreConfig();
  const { user } = useAuthContext();
  const router = useRouter();

  const { setFrontStoreConfigHeroInputs, frontStoreConfigHeroInputs } =
    useFrontStoreHeroConfig();
  useEffect(() => {
    setFrontStoreConfigHeroInputs(response);
  }, [response]);

  const handleSubmit = async () => {
    // Handle form submission logic
    const pok = "front_store_configuration";
    const key_to_update = "hero";
    const value_to_update = frontStoreConfigHeroInputs;
    const id = toast.loading("Updating hero information...");
    const res: any = await updateFrontStoreConfigData(
      user?._id,
      user?._id,
      user?.token,
      pok,
      key_to_update,
      value_to_update
    );
    if (res.response === "ok") {
      toast.update(id, {
        render: "Hero updated successfully",
        type: "success",
        isLoading: false,
      });
    } else {
      toast.update(id, {
        render: "Failed to update hero information",
        type: "error",
        isLoading: false,
      });
    }
    setTimeout(() => {
      toast.dismiss();
      router.refresh();
    }, 6000);
    // console.log(inputs);
  };
  return (
    <div className="relative ">
      <div className="border-b flex justify-between items-center px-6 border-gray-200 dark:border-neutral-700">
        <nav className="flex    space-x-1" aria-label="Tabs" role="tablist">
          <button
            type="button"
            className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500"
            id="tabs-with-badges-item-2"
            data-hs-tab="#tabs-with-badges-2"
            aria-controls="tabs-with-badges-2"
            role="tab"
          >
            Preview
          </button>
          <button
            type="button"
            className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500 active"
            id="tabs-with-badges-item-1"
            data-hs-tab="#tabs-with-badges-1"
            aria-controls="tabs-with-badges-1"
            role="tab"
          >
            Templates
            <span className="hs-tab-active:bg-blue-100 hs-tab-active:text-blue-600 dark:hs-tab-active:bg-blue-800 dark:hs-tab-active:text-white ms-1 py-0.5 px-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-neutral-700 dark:text-neutral-300">
              1
            </span>
          </button>
          <button
            type="button"
            className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500"
            id="tabs-with-badges-item-3"
            data-hs-tab="#tabs-with-badges-3"
            aria-controls="tabs-with-badges-3"
            role="tab"
          >
            Configuration
          </button>
        </nav>
        <div className="items-center   flex   space-x-4">
          <button
            type="button"
            onClick={() => setFrontStoreConfigHeroInputs({})}
            className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-100 text-red-600 hover:bg-red-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-900 dark:text-red-500 dark:hover:text-red-400"
          >
            Reset
          </button>
          <div className="inline-flex rounded-lg shadow-sm">
            <button
              type="button"
              className="py-2 px-3 inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            >
              Template
            </button>
            {frontStoreConfigHeroInputs?.template_name && (
              <button
                type="button"
                className="py-2 px-3 inline-flex capitalize justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
              >
                {frontStoreConfigHeroInputs?.template_name?.replaceAll(
                  "_",
                  " "
                )}
              </button>
            )}
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="py-2 px-3 inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            >
              <IoSaveOutline className="text-blue-500 text-lg" />
              Saves
            </button>
          </div>
          <div className="inline-flex border gap-3 border-gray-200 rounded-lg p-1 dark:border-neutral-700">
            <button
              type="button"
              onClick={() => changePreviewDevice("mobile")}
              className="inline-flex flex-shrink-0 justify-center items-center p-1 rounded text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200"
            >
              <HiOutlineDeviceMobile className="text-lg" />
            </button>
            <button
              type="button"
              onClick={() => changePreviewDevice("tablet")}
              className="inline-flex flex-shrink-0 justify-center items-center p-1 rounded text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200"
            >
              <HiMiniDeviceTablet className="text-lg" />
            </button>{" "}
            <button
              type="button"
              onClick={() => changePreviewDevice("desktop")}
              className="inline-flex flex-shrink-0 justify-center items-center p-1 rounded text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200"
            >
              <TbDeviceDesktop className="text-lg" />
            </button>
          </div>{" "}
          <button
            type="button"
            onClick={() => togglePreviewInFullScreen()}
            className="inline-flex border flex-shrink-0 justify-center items-center p-1.5 rounded text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200"
          >
            {!previewInFullScreen ? (
              <BsFullscreen className=" text-lg" />
            ) : (
              <BsFullscreenExit className="text-lg " />
            )}
          </button>
        </div>
      </div>

      <div className="mt-3">
        <div
          id="tabs-with-badges-1"
          role="tabpanel"
          className="p-6"
          aria-labelledby="tabs-with-badges-item-1"
        >
          <div>
            <HeroTemplates />
          </div>
        </div>
        <div
          id="tabs-with-badges-2"
          className="hidden p-6"
          role="tabpanel"
          aria-labelledby="tabs-with-badges-item-2"
        >
          <div>
            <HeroPreview />
          </div>
        </div>
        <div
          id="tabs-with-badges-3"
          className="hidden p-6"
          role="tabpanel"
          aria-labelledby="tabs-with-badges-item-3"
        >
          <div>
            <HeroConfiguration />
          </div>
        </div>
      </div>
    </div>
  );
}
