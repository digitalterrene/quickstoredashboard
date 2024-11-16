"use client";
import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { IoAddOutline } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import { ProductVariationsObjectType } from "@/ts-types/data";
import { useDataCreateProductVariationsInputs } from "@/context/data";
import { industryVariationsTemplates } from "../templates/productVariationsTemplates";
// Import variation templates for different industries

const initialInputs: ProductVariationsObjectType = {
  data_type: "",
  label: "",
  name: "",
  description: "",
  image: "",
  icon: "",
};

export default function ProductVariationsForm() {
  const { inputs, setInputs } = useDataCreateProductVariationsInputs();
  const [newVariationInputs, setNewVariationInputs] =
    useState<ProductVariationsObjectType>(initialInputs);

  const { variations: actual_variations } = inputs; // Destructure variations from inputs
  const outer_variations: any = Array.isArray(actual_variations)
    ? actual_variations
    : []; // Default to empty array if not an array
  const inner_variations = outer_variations[0]?.variations
    ? outer_variations[0].variations // If the first item has `variations` inside
    : []; // Default to empty array if not present

  // Combine outer and inner variations into one array
  const variations = [...outer_variations, ...inner_variations];

  // console.log({ variations, outer_variations, inner_variations }); // You should now see all the variations
  const addNewVariation = () => {
    setInputs({
      variations: [...variations, newVariationInputs], // Add new variation to the array
    });
  };

  const removeVariation = (variationName: string) => {
    setInputs({
      variations: variations.filter(
        (variation: ProductVariationsObjectType) =>
          variation.name !== variationName
      ), // Remove variation by name
    });
  };

  const handleUploadImage = (image: File, image_type: string) => {
    const id = toast.loading(`Uploading ${image_type}...`);
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
            render: `${image_type} successfully uploaded`,
            type: "success",
            isLoading: false,
          });
          setNewVariationInputs((prevState) => ({
            ...prevState,
            [image_type]: data.secure_url.toString(),
          }));
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewVariationInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  // Function to handle industry change
  const handleIndustryChange = (industry: string) => {
    setInputs({
      variations: industryVariationsTemplates[industry] || [], // Load variations based on industry
    });
  };

  return (
    <div className="space-y-12 w-full">
      <div className="border-gray-900/10">
        <div className="gap-x-6 gap-y-8">
          <label
            htmlFor="industry"
            className="block sr-only col-span-full text-sm font-medium leading-6 text-gray-900"
          >
            Select Industry
          </label>
          <select
            name="industry"
            id="industry"
            className="block w-full py-2 px-4 rounded-lg border-gray-200 shadow-sm text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            onChange={(e) => handleIndustryChange(e.target.value)}
          >
            <option value="">Select Industry</option>
            {Object.keys(industryVariationsTemplates).map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
          <div className="space-y-4 gap-8 items-center">
            {inputs?.variations &&
              inputs?.variations?.map((variation: any) => (
                <ul key={variation.name} role="list" className="-mb-8">
                  <li>
                    <div className="relative pb-8">
                      <div className="relative flex items-start space-x-3">
                        <div className="min-w-0 space-y-3 flex-1">
                          <div className="relative flex gap-2 items-start">
                            <img
                              className="flex h-10 w-10 items-center justify-center rounded bg-gray-400 ring-8 ring-white"
                              src={variation?.icon}
                              alt="icon"
                            />
                            <div>
                              <div className="text-sm">
                                <a
                                  href="#"
                                  className="font-medium text-gray-900"
                                >
                                  {variation?.name}
                                </a>
                              </div>
                              <p className="mt-0.5 text-sm text-gray-500">
                                {variation?.label}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeVariation(variation.name)}
                              className="p-2 ml-auto w-fit z-10  inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-100 text-red-600 hover:bg-red-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-900 dark:text-red-500 dark:hover:text-red-400"
                            >
                              <MdClear className="text-lg" />
                            </button>
                          </div>
                          <div className="mt-2 text-sm text-gray-700">
                            <p>{variation?.description}</p>
                          </div>
                          <div className="relative">
                            <img
                              className="flex h-44 w-full items-center justify-center rounded-lg bg-gray-400 ring-8 ring-white"
                              src={variation?.image}
                              alt="icon"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              ))}
          </div>
          <div className="mt-4 space-y-4 border p-3 rounded-xl gap-5">
            <div>
              <span className="col-span-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="sm:flex shadow-sm">
                  <input
                    type="text"
                    value={newVariationInputs?.name}
                    name="name"
                    onChange={handleChange}
                    className="py-2 px-4 pe-11 block rounded-lg w-full border-gray-200 sm:shadow-sm -mt-px -ms-px text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />
                </div>
              </span>
            </div>
            <div>
              <span className="col-span-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="sm:flex shadow-sm">
                  <textarea
                    value={newVariationInputs?.description}
                    name="description"
                    onChange={handleChange}
                    rows={6}
                    className="py-2 px-4 pe-11 block rounded-lg w-full border-gray-200 sm:shadow-sm -mt-px -ms-px text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />
                </div>
              </span>{" "}
            </div>
            <div>
              <span className="col-span-4">
                <label
                  htmlFor="data_type"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Data Type
                </label>
                <div className="sm:flex shadow-sm">
                  <input
                    type="text"
                    value={newVariationInputs?.data_type}
                    name="data_type"
                    onChange={handleChange}
                    className="py-2 px-4 pe-11 block rounded-lg w-full border-gray-200 sm:shadow-sm -mt-px -ms-px text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />
                </div>
              </span>
            </div>
            <div>
              <span className="col-span-4">
                <label
                  htmlFor="label"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Label
                </label>
                <div className="sm:flex shadow-sm">
                  <input
                    type="text"
                    value={newVariationInputs?.label}
                    name="label"
                    onChange={handleChange}
                    className="py-2 px-4 pe-11 block rounded-lg w-full border-gray-200 sm:shadow-sm -mt-px -ms-px text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />
                </div>
              </span>
            </div>
            <div>
              <span className="col-span-2">
                <label
                  htmlFor="variations-image"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Choose Image
                </label>
                <form className="col-span-full mt-2">
                  <input
                    type="file"
                    name="variations-image"
                    onChange={async (e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleUploadImage(e.target.files[0], "image");
                      }
                    }}
                    id="variations-image"
                    className="block w-full mt-2 border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 file:bg-gray-50 file:border-0 file:me-4 file:py-2 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400"
                  />
                </form>
              </span>
            </div>
            <div>
              <span className="col-span-2">
                <label
                  htmlFor="variations-icon"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Choose Icon
                </label>
                <form className="col-span-full mt-2">
                  <input
                    type="file"
                    name="variations-icon"
                    onChange={async (e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleUploadImage(e.target.files[0], "icon");
                      }
                    }}
                    id="variations-icon"
                    className="block w-full mt-2 border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 file:bg-gray-50 file:border-0 file:me-4 file:py-2 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400"
                  />
                </form>
              </span>{" "}
            </div>
            <div className="col-span-2 flex justify-end">
              <button
                type="button"
                onClick={addNewVariation}
                className="py-2 mt-8 px-2 inline-flex items-center gap-x-1 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700"
              >
                <IoAddOutline className="text-xl" />
                Add Variation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
