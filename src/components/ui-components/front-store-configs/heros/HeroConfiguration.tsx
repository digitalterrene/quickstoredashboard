"use client";
import React, { useState } from "react";
import { useFrontStoreConfig } from "@/context";

import { HeroConfigurationInputsType } from "@/ts-types/front-store-configs";
import { toast } from "react-toastify";
import ColorPicker, { useColorPicker } from "react-best-gradient-color-picker";

import HeroPreview from "./HeroPreview";
import { useFrontStoreHeroConfig } from "@/context/front-store-configs";
const initialInputs: HeroConfigurationInputsType = {
  text_color: "",
  background_color: "",
  small_heading: "",
  big_heading: "",
  big_heading_text_color: "",
  featured_image: "",
  description: "",
  button_one_text: "",
  button_one_radius: 0,
  button_two_text: "",
  button_two_radius: 0,
  button_one_background_color: "",
  button_one_text_color: "",
  button_two_background_color: "",
  button_two_text_color: "",
  background_image: "",
  hide_small_heading: false,
  hide_big_heading: false,
  hide_button_one: false,
  hide_button_two: false,
};

export default function HeroConfiguration() {
  const { previewInFullScreen } = useFrontStoreConfig();
  const { setFrontStoreConfigHeroInputs } = useFrontStoreHeroConfig();

  const [color, setColor] = useState("rgba(255,255,255,1)");
  const [colorOption, setColorOption] = useState("background_color");
  const { valueToHex, isGradient } = useColorPicker(color, setColor);

  const [inputs, setInputs] =
    useState<HeroConfigurationInputsType>(initialInputs);
  const handleUploadImage = (image: File, image_type: string) => {
    const id = toast.loading("Uploading image...");
    if (image === undefined) {
      toast.update(id, {
        render: "Something went wrong",
        type: "error",
        isLoading: false,
      });
      return;
    }
    if (image.type === "image/jpeg" || image.type === "image/png") {
      const data = new FormData();
      data.append("file", image);
      data.append(
        "upload_preset",
        `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
      );
      data.append(
        "cloud_name",
        `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`
      );
      fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "post",
          body: data,
        }
      )
        .then((res) => res.json())
        .then(async (data) => {
          toast.update(id, {
            render: "Image successfully uploaded",
            type: "success",
            isLoading: false,
          });
          // console.log("Image in the server" + data.secure_url.toString());
          setFrontStoreConfigHeroInputs({
            [image_type]: data.secure_url.toString(),
          });
          //return { image_url: data.secure_url.toString() };
        })
        .catch((err) => {
          toast.update(id, {
            render: `${err?.message}`,
            type: "error",
            isLoading: false,
          });
          console.log(err);
        });
    } else {
      toast.update(id, {
        render: "Please select an image",
        type: "error",
        isLoading: false,
      });
      return;
    }
    setTimeout(() => {
      toast.dismiss();
    }, 6000);
  };

  return (
    <>
      {previewInFullScreen ? (
        <HeroPreview />
      ) : (
        <div className="flex w-full gap-4">
          <form className="w-1/2">
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
                              setFrontStoreConfigHeroInputs({
                                small_heading: e.target.value,
                              });
                            }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="col-span-full">
                    <div className="  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="col-span-full">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Big Heading
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            value={inputs?.big_heading}
                            onChange={(e) => {
                              setInputs((prevState) => ({
                                ...prevState,
                                big_heading: e.target.value,
                              }));
                              setFrontStoreConfigHeroInputs({
                                big_heading: e.target.value,
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
                      Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        value={inputs?.description}
                        onChange={(e) => {
                          setInputs((prevState) => ({
                            ...prevState,
                            description: e.target.value,
                          }));
                          setFrontStoreConfigHeroInputs({
                            description: e.target.value,
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
                        Button One Text
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          value={inputs?.button_one_text}
                          onChange={(e) => {
                            setInputs((prevState) => ({
                              ...prevState,
                              button_one_text: e.target.value,
                            }));
                            setFrontStoreConfigHeroInputs({
                              button_one_text: e.target.value,
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
                                value={inputs?.button_one_radius}
                                onChange={(e) => {
                                  setInputs((prevState) => ({
                                    ...prevState,
                                    button_one_radius: parseInt(e.target.value),
                                  }));
                                  setFrontStoreConfigHeroInputs({
                                    button_one_radius: parseInt(e.target.value),
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
                  <div className="col-span-full gap-5 grid grid-cols-4">
                    <span className="col-span-3">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Button Two Text
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          value={inputs?.button_two_text}
                          onChange={(e) => {
                            setInputs((prevState) => ({
                              ...prevState,
                              button_two_text: e.target.value,
                            }));
                            setFrontStoreConfigHeroInputs({
                              button_two_text: e.target.value,
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
                                value={inputs?.button_two_radius}
                                onChange={(e) => {
                                  setInputs((prevState) => ({
                                    ...prevState,
                                    button_two_radius: parseInt(e.target.value),
                                  }));
                                  setFrontStoreConfigHeroInputs({
                                    button_two_radius: parseInt(e.target.value),
                                  });
                                }}
                                data-hs-input-number-input=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                  </div>{" "}
                  <div className="col-span-full gap-5 grid grid-cols-4">
                    <span className="col-span-2">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Choose Background Image
                      </label>
                      <form className="col-span-full">
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
                    </span>
                    <span className="col-span-2">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Choose Featured Images
                      </label>
                      <form className="col-span-full mt-2">
                        <input
                          type="file"
                          name="small-file-input"
                          onChange={async (e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleUploadImage(
                                e.target.files[0],
                                "featured_image"
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
                    </span>
                  </div>
                  <div className="col-span-full gap-8 items-center grid  ">
                    <div className="   ">
                      <label
                        htmlFor="hs-color-input"
                        className="block space-y-3  text-sm font-medium mb-2 dark:text-white"
                      >
                        <div className="  grid grid-cols-6">
                          <select
                            onChange={(e) => {
                              setColorOption(e.target.value);
                              if (
                                isGradient &&
                                e.target.value === "background_color"
                              ) {
                                setFrontStoreConfigHeroInputs({
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
                                setFrontStoreConfigHeroInputs({
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
                            checked={inputs?.hide_small_heading}
                            onChange={(e) => {
                              setInputs((prevState) => ({
                                ...prevState,
                                hide_small_heading: e.target.checked,
                              }));
                              setFrontStoreConfigHeroInputs({
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
                            checked={inputs?.hide_big_heading}
                            onChange={(e) => {
                              setInputs((prevState) => ({
                                ...prevState,
                                hide_big_heading: e.target.checked,
                              }));
                              setFrontStoreConfigHeroInputs({
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
                            checked={inputs?.hide_button_one}
                            onChange={(e) => {
                              setInputs((prevState) => ({
                                ...prevState,
                                hide_button_one: e.target.checked,
                              }));
                              setFrontStoreConfigHeroInputs({
                                hide_button_one: e.target.checked,
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
                            Hide Button One
                          </label>
                        </div>
                      </div>
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            checked={inputs?.hide_button_two}
                            onChange={(e) => {
                              setInputs((prevState) => ({
                                ...prevState,
                                hide_button_two: e.target.checked,
                              }));
                              setFrontStoreConfigHeroInputs({
                                hide_button_two: e.target.checked,
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
                            Hide Button Two
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </form>
          <div className="w-1/2">
            <HeroPreview />
          </div>
        </div>
      )}
    </>
  );
}
