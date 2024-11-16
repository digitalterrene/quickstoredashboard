"use client";
import React, { useState } from "react";
import { useFrontStoreConfig } from "@/context";

import { HeroConfigurationInputsType } from "@/ts-types/front-store-configs";
import { toast } from "react-toastify";
import ColorPicker, { useColorPicker } from "react-best-gradient-color-picker";
import CategoriesPreview from "./CategoriesPreview";
import { AiOutlineLink } from "react-icons/ai";
import { IoAddOutline } from "react-icons/io5";
import { MdClear } from "react-icons/md";

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

export default function CategoriesConfiguration() {
  const { previewInFullScreen, setFrontStoreConfigInputs } =
    useFrontStoreConfig();
  const [color, setColor] = useState("rgba(255,255,255,1)");
  const [colorOption, setColorOption] = useState("background_color");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryLink, setNewCategoryLink] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const { valueToHex, isGradient } = useColorPicker(color, setColor);
  const [categoryImage, setCategoryImage] = useState("");
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
          setCategoryImage(data.secure_url.toString());
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
        <CategoriesPreview />
      ) : (
        <div className="flex w-full gap-4">
          <form className="w-1/2">
            <div className="space-y-12">
              <div className="  border-gray-900/10  ">
                <div className="  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <label
                    htmlFor="first-name"
                    className="block col-span-full text-sm font-medium leading-6 text-gray-900"
                  >
                    Created Categories
                  </label>
                  <div className="col-span-full gap-8 items-center grid  grid-cols-3">
                    {categories.map((category) => (
                      <a
                        key={category.category_name}
                        href={category.href}
                        className="relative flex h-64 p-2 w-56 flex-col overflow-hidden rounded-lg border  shadow-xl hover:opacity-75 xl:w-auto"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setCategories(
                              categories.filter(
                                (cat) =>
                                  cat.category_name !== category.category_name
                              )
                            );
                            setFrontStoreConfigInputs({
                              categories: categories.filter(
                                (cat) =>
                                  cat.category_name !== category.category_name
                              ),
                            });
                          }}
                          className="p-2 ml-auto w-fit z-10  inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-100 text-red-600 hover:bg-red-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-900 dark:text-red-500 dark:hover:text-red-400"
                        >
                          <MdClear className="text-lg" />
                        </button>
                        <span aria-hidden="true" className="absolute inset-0">
                          <img
                            src={category.category_image}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </span>
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                        />
                        <span className="relative mt-auto text-center text-xl font-bold text-white">
                          {category.category_name}
                        </span>
                      </a>
                    ))}
                  </div>
                  <div className="col-span-full border p-3 rounded-xl gap-5 grid grid-cols-4">
                    <span className="col-span-4">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Category Name
                      </label>
                      <div className="sm:flex rounded-lg shadow-sm">
                        <input
                          type="text"
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          className="py-2 px-4 pe-11 block w-full border-gray-200 sm:shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        />
                        <span className="py-2 px-4 inline-flex items-center min-w-fit w-full border border-gray-200 bg-gray-50 text-sm text-gray-500 -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:w-auto sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg dark:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-400">
                          <AiOutlineLink className="text-xl" />
                        </span>
                        <input
                          type="text"
                          value={newCategoryLink}
                          onChange={(e) => setNewCategoryLink(e.target.value)}
                          className="py-2 px-4 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        />
                      </div>
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
                                "category_image"
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
                    <div className="col-span-2 flex justify-end">
                      <button
                        type="button"
                        id="hs-copy-content"
                        onClick={() => {
                          setFrontStoreConfigInputs({
                            categories: [
                              ...categories,
                              {
                                category_name: newCategoryName,
                                link: newCategoryLink,
                                category_image: categoryImage,
                              },
                            ],
                          });
                          setCategories((prevState) => [
                            ...prevState,
                            {
                              category_name: newCategoryName,
                              link: newCategoryLink,
                              category_image: categoryImage,
                            },
                          ]);
                        }}
                        className="py-2 mt-8 px-2 inline-flex items-center gap-x-1 text-xs font-medium rounded-lg border  border-gray-200 bg-white text-gray-800 hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700"
                      >
                        <IoAddOutline className="text-xl" />
                        Add Category
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="w-1/2">
            <CategoriesPreview />
          </div>
        </div>
      )}
    </>
  );
}
