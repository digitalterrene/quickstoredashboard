"use client";
import React, { useState } from "react";
import BannerPreview from "./BannerPreview";
import { useFrontStoreConfig } from "@/context";

import { BannerConfigurationInputsType } from "@/ts-types/front-store-configs";
import { toast } from "react-toastify";
import ColorPicker, { useColorPicker } from "react-best-gradient-color-picker";

const initialInputs: BannerConfigurationInputsType = {
  text_color: "",
  background_color: "",
  small_heading: "",
  big_heading: "",
  button_text: "",
  button_radius: 0,
  background_image: null,
  is_dismissable: false,
  hide_small_heading: false,
  hide_big_heading: false,
  hide_button: false,
};

export default function BannerConfiguration() {
  const {
    previewInFullScreen,
    frontStoreConfigInputs,
    setFrontStoreConfigInputs,
  } = useFrontStoreConfig();
  const [color, setColor] = useState("rgba(255,255,255,1)");
  const [colorOption, setColorOption] = useState("background_color");
  const { valueToHex, isGradient } = useColorPicker(color, setColor);
  const [inputs, setInputs] =
    useState<BannerConfigurationInputsType>(initialInputs);

  const handleUploadImage = async (image: File | Blob, image_type: string) => {
    const id = toast.loading("Uploading image to the server..."); // Show initial loading notification

    try {
      // Create FormData and append the file
      const formData = new FormData();
      formData.append("file", image); // Ensure the key matches the API expectations

      // Send the POST request to the server
      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      // Parse the JSON response
      const data = await res.json();

      if (res.ok && data.message === "success") {
        // Handle successful upload
        toast.update(id, {
          render: "Image successfully uploaded!",
          type: "success",
          isLoading: false,
        });

        // Update form data and inputs with the uploaded image URL

        if (image_type === "image") {
          setFrontStoreConfigInputs({
            store_logo: data.imgUrl.toString(),
          });
        } else {
          setFrontStoreConfigInputs({
            background_image: data.imgUrl.toString(),
          });
        }
      } else {
        // Handle server-side errors
        toast.update(id, {
          render: data.error || "Error uploading image.",
          type: "error",
          isLoading: false,
        });
      }
    } catch (error: any) {
      // Handle client-side errors
      toast.update(id, {
        render: error.message || "Something went wrong.",
        type: "error",
        isLoading: false,
      });
      console.error("Upload error:", error);
    } finally {
      // Dismiss toast after a delay
      setTimeout(() => toast.dismiss(id), 6000);
    }
  };

  return (
    <div className="h-full">
      {previewInFullScreen ? (
        <BannerPreview />
      ) : (
        <div className="flex w-full h-full   gap-4">
          <form className="w-1/2 ">
            <div className="space-y-12">
              <div className="  border-gray-900/10  ">
                <div className="  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <div className="  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="col-span-full">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Small Heading
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            value={inputs?.small_heading}
                            onChange={(e) => {
                              setInputs((prevState) => ({
                                ...prevState,
                                small_heading: e.target.value,
                              }));
                              setFrontStoreConfigInputs({
                                small_heading: e.target.value,
                              });
                            }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Big Heading
                    </label>
                    <div className="mt-2">
                      <textarea
                        value={inputs?.big_heading}
                        onChange={(e) => {
                          setInputs((prevState) => ({
                            ...prevState,
                            big_heading: e.target.value,
                          }));
                          setFrontStoreConfigInputs({
                            big_heading: e.target.value,
                          });
                        }}
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="col-span-full gap-5 grid grid-cols-4">
                    <span className="col-span-3">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Button Text
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          value={inputs?.button_text}
                          onChange={(e) => {
                            setInputs((prevState) => ({
                              ...prevState,
                              button_text: e.target.value,
                            }));
                            setFrontStoreConfigInputs({
                              button_text: e.target.value,
                            });
                          }}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </span>
                    <span className="col-span-1">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Radius
                      </label>
                      <div className="mt-2">
                        <div
                          className="bg-white border border-gray-200 rounded-lg dark:bg-neutral-700 dark:border-neutral-700"
                          data-hs-input-number=""
                        >
                          <div className="w-full flex justify-between items-center gap-x-1">
                            <div className="grow py-1.5 px-3">
                              <input
                                className="w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 dark:text-white"
                                type="number"
                                value={inputs?.button_radius}
                                onChange={(e) => {
                                  setInputs((prevState) => ({
                                    ...prevState,
                                    button_radius: parseInt(e.target.value),
                                  }));
                                  setFrontStoreConfigInputs({
                                    button_radius: parseInt(e.target.value),
                                  });
                                }}
                                data-hs-input-number-input=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                  </div>
                  <form className="col-span-full">
                    <label htmlFor="small-file-input" className=" ">
                      Choose Background Image
                    </label>
                    <input
                      type="file"
                      name="small-file-input"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleUploadImage(
                            e.target.files[0],
                            "background_image"
                          );
                        }
                      }}
                      id="small-file-input"
                      className="block w-full mt-2  border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                                  file:bg-gray-50 file:border-0
                                    file:me-4
                                    file:py-2 file:px-4
                                  dark:file:bg-neutral-700 dark:file:text-neutral-400"
                    />
                  </form>
                  <div className="col-span-full gap-8 items-center grid  ">
                    <div className="   ">
                      <label
                        htmlFor="hs-color-input"
                        className="block space-y-3  text-sm font-medium mb-2 dark:text-white"
                      >
                        <div className="  grid grid-cols-6">
                          <select
                            onChange={(e) => {
                              setFrontStoreConfigInputs({});
                              setColorOption(e.target.value);
                              if (
                                isGradient &&
                                e.target.value === "background_color"
                              ) {
                                setFrontStoreConfigInputs({
                                  background_image: null,
                                });
                              }
                            }}
                            className="py-1.5 col-span-3 px-4 pe-9 block w-full  border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                          >
                            <option value="background_color">
                              Background Color
                            </option>
                            <option value="text_color">Text Color</option>
                            <option value="button_background_color">
                              Button Background
                            </option>
                            <option value="button_text_color">
                              Button Text Color
                            </option>
                          </select>
                          <div className="col-span-3 justify-end flex items-center">
                            <button
                              type="button"
                              onClick={() => {
                                setFrontStoreConfigInputs({
                                  background_image: null,
                                });
                                setFrontStoreConfigInputs({
                                  [colorOption]: isGradient
                                    ? color
                                    : valueToHex(),
                                  isGradient,
                                });
                              }}
                              className="py-2 px-4 inline-flex w-fit items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-100 text-red-600 hover:bg-red-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-900 dark:text-red-500 dark:hover:text-red-400"
                            >
                              Set Color
                            </button>
                          </div>
                        </div>
                      </label>
                    </div>
                    <ColorPicker value={color} onChange={setColor} />
                  </div>
                </div>
              </div>

              <div className="  border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Preferrences
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Choose when to conditionally show your Navba components.
                  However keep in mind that there are defau;t settings that
                  Quick Dashboard Store may not overide
                </p>

                <div className="  space-y-10">
                  <fieldset>
                    <div className="mt-6 space-y-6">
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            type="checkbox"
                            checked={inputs?.is_dismissable}
                            onChange={(e) => {
                              setInputs((prevState) => ({
                                ...prevState,
                                is_dismissable: e.target.checked,
                              }));
                              setFrontStoreConfigInputs({
                                is_dismissable: e.target.checked,
                              });
                            }}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor="comments"
                            className="font-medium text-gray-900"
                          >
                            Is Dismissable
                          </label>
                        </div>
                      </div>
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            checked={inputs?.hide_small_heading}
                            onChange={(e) => {
                              setInputs((prevState) => ({
                                ...prevState,
                                hide_small_heading: e.target.checked,
                              }));
                              setFrontStoreConfigInputs({
                                hide_small_heading: e.target.checked,
                              });
                            }}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor="candidates"
                            className="font-medium text-gray-900"
                          >
                            Hide Small Heading
                          </label>
                        </div>
                      </div>
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            checked={
                              frontStoreConfigInputs?.hide_big_heading ||
                              inputs?.hide_big_heading
                            }
                            onChange={(e) => {
                              setInputs((prevState) => ({
                                ...prevState,
                                hide_big_heading: e.target.checked,
                              }));
                              setFrontStoreConfigInputs({
                                hide_big_heading: e.target.checked,
                              });
                            }}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor="offers"
                            className="font-medium text-gray-900"
                          >
                            Hide Big Heading
                          </label>
                        </div>
                      </div>
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            checked={
                              frontStoreConfigInputs?.hide_button ||
                              inputs?.hide_button
                            }
                            onChange={(e) => {
                              setInputs((prevState) => ({
                                ...prevState,
                                hide_button: e.target.checked,
                              }));
                              setFrontStoreConfigInputs({
                                hide_button: e.target.checked,
                              });
                            }}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor="offers"
                            className="font-medium text-gray-900"
                          >
                            Hide Big Heading
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </form>
          <div className="w-1/2 h-full sticky top-24">
            <BannerPreview />
          </div>
        </div>
      )}
    </div>
  );
}
