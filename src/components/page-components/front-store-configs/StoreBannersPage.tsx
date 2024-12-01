"use client";
import { updateFrontStoreConfigData } from "@/api-calls/front-store-config/updateFrontStoreConfigData";
import { useFrontStoreConfig } from "@/context";
import { useAuthContext } from "@/context/auth-context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import plugin from "grapesjs-tailwind";

import "grapesjs/dist/css/grapes.min.css";
import { IoSaveOutline } from "react-icons/io5";
import { toast } from "react-toastify";

export default function StoreBannersPage({ response }: { response: any }) {
  const {
    frontStoreConfigInputs,
    resetFrontStoreConfigInputs,
    setFrontStoreConfigInputs,
  } = useFrontStoreConfig();
  const { user } = useAuthContext();
  const router = useRouter();
  const [editor, setEditor] = useState<any>(null);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    setFrontStoreConfigInputs(response);
  }, [response]);
  useEffect(() => {
    if (!editorRef.current) {
      const editorInstance = grapesjs.init({
        container: "#gjs",
        plugins: [plugin],
        pluginsOpts: {
          [plugin]: {
            /* options */
          },
        },
      });

      setEditor(editorInstance);
      editorRef.current = editorInstance;
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);
  const handleSubmit = async () => {
    // Handle form submission logic
    const pok = "front_store_configuration";
    const key_to_update = "banner";
    let value_to_update = {};
    if (editor) {
      // const code = editor.getHtml() + "\n" + editor.getCss();
      value_to_update = { html: editor.getHtml(), css: editor.getCss() };
      localStorage.removeItem("gjsProject"); // Clear saved code
      localStorage.removeItem("savedCode"); // Clear saved code
    }
    const id = toast.loading("Updating banner information...");
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
        render: "Banner updated successfully",
        type: "success",
        isLoading: false,
      });
    } else {
      toast.update(id, {
        render: "Failed to update banner information",
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
    <div className="relative h-full ">
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
            Configuration
          </button>
        </nav>
        <div className="items-center   flex   space-x-4">
          <button
            type="button"
            onClick={() => resetFrontStoreConfigInputs()}
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
            {frontStoreConfigInputs?.template_name && (
              <button
                type="button"
                className="py-2 px-3 inline-flex capitalize justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
              >
                {frontStoreConfigInputs?.template_name?.replaceAll("_", " ")}
              </button>
            )}
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="py-2 px-3 inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            >
              <IoSaveOutline className="text-blue-500 text-lg" />
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <div
          id="tabs-with-badges-1"
          role="tabpanel"
          className="p-6"
          aria-labelledby="tabs-with-badges-item-1"
        >
          <div key={0}>
            Store Banner Comming Soon
            {/* <div id="gjs" className="rounded-lg bg-red-900 p-0"></div> */}
          </div>
        </div>
        <div
          id="tabs-with-badges-2"
          className="hidden p-6"
          role="tabpanel"
          aria-labelledby="tabs-with-badges-item-2"
        >
          <div>
            <div>Preview</div>
          </div>
        </div>
      </div>
    </div>
  );
}
