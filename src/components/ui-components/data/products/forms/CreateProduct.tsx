"use client";
import { addToSet } from "@/api-calls/dashboard-data/addToSet";
import { useSideNavInputs } from "@/context";

import { useAuthContext } from "@/context/auth-context/AuthContext";
import { categories } from "@/data/front-store-data";
import { ProductObjectType } from "@/ts-types/data";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";

import {
  IoAddOutline,
  IoCloudUploadOutline,
  IoPricetagsOutline,
} from "react-icons/io5";
import { MdClear } from "react-icons/md";
import { toast } from "react-toastify";
import ProductVariationsForm from "./ProductVariationsForm";
import ProductAttributesForm from "./ProductAttributesForm";
import {
  useDataCreateProductAttributesInputs,
  useDataCreateProductVariationsInputs,
} from "@/context/data";

const initialInputs: ProductObjectType = {
  name: "",
  price: 0,
  stock_count: 1,
  tagline: "",
  description: "",
  atributes: [],
  images: [],
  units_sold: 0,
  category: "",
  quickstoredashboard_stores_category: "",
  publisher: {},
  specs: [],
  created_at: "",
};
export default function CreateProduct({
  product_categories,
  predefined_filters,
}: any) {
  const [inputs, setInputs] = useState<ProductObjectType>(initialInputs);
  const { inputs: variationInputs } = useDataCreateProductVariationsInputs();
  const { inputs: attributesInputs } = useDataCreateProductAttributesInputs();
  const { sidenavInputs, closeSidenav, setSidenavInputs } = useSideNavInputs();
  const [productImages, setProductImages] = useState<string[]>([]);
  const [productFilters, setProductFilters] = useState<
    { key: string; value: string }[]
  >([]);

  const router = useRouter();
  const { user } = useAuthContext();

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

        setProductImages((prevState) => [
          ...prevState,
          data.imgUrl?.toString(),
        ]);
        if (image_type === "image") {
          setInputs((prevState) => ({
            ...prevState,
            image: data.imgUrl.toString(),
          }));
        } else {
          setInputs((prevState) => ({
            ...prevState,
            images: [data.imgUrl.toString(), ...productImages],
          }));
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

  const handleSubmit = async () => {
    const id = toast.loading("Creating new product...");
    console.log({
      image: inputs && inputs?.images && inputs?.images[0],
      data_type: "products",
      ...sidenavInputs,
      user_id: user?._id,
    });
    const res: any = await addToSet(user._id, user?._id, user?.token, {
      key_to_update: "products",
      value_to_update: {
        data_type: "products",
        ...inputs,
        publisher: {
          name: user?.username,
          email: user?.email,
          _id: user?._id,
          image: user?.image,
        },
        ...sidenavInputs,
        ...variationInputs,
        ...attributesInputs,
        filters: productFilters,
        user_id: user?._id,
      },
    });
    if (res.response === "ok") {
      toast.update(id, {
        render: "New product created successfully",
        type: "success",
        isLoading: false,
      });
    } else {
      toast.update(id, {
        render: "Failed to create new product",
        type: "error",
        isLoading: false,
      });
    }
    setTimeout(() => {
      toast.dismiss();
      router.refresh();
    }, 6000);
    console.log(inputs);
  };
  const [selectedFilter, setSelectedFilter] = useState<{
    key: string;
    value: string;
  }>({ key: "", value: "" });
  const [customFilter, setCustomFilter] = useState({
    key: "",
    value: "",
  });

  const handleAddFilter = () => {
    if (selectedFilter.key && selectedFilter.value) {
      setProductFilters((prev) => [...prev, selectedFilter]);
      setSelectedFilter({ key: "", value: "" });
    }
  };

  const handleAddCustomFilter = () => {
    if (customFilter.key && customFilter.value) {
      setProductFilters((prev) => [...prev, customFilter]);
      setCustomFilter({ key: "", value: "" });
    }
  };

  return (
    <div className="border p-3 rounded-lg w-full">
      <h5 className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">
        <IoPricetagsOutline className="text-lg mr-3 text-blue-500" /> New
        Product
      </h5>
      <div className=" flex mb-6 items-center justify-between ">
        <div className="inline-flex rounded-lg shadow-sm">
          <button
            type="button"
            onClick={() => {
              setSidenavInputs({});
              closeSidenav();
            }}
            className="py-1.5 px-3 cursor-pointer group hover:text-white hover:bg-red-500 inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm  disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              handleSubmit();
              setTimeout(() => {
                closeSidenav();
              }, 3000);
            }}
            className="py-1.5 cursor-pointer  px-3 group hover:text-white hover:bg-blue-500 inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm  disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
          >
            <AiOutlineSave className="text-blue-500 text-lg group-hover:text-white" />{" "}
            Save
          </button>
        </div>
      </div>
      <form action="#">
        <div>
          <span className="col-span-2 ">
            <label
              htmlFor="variations-image"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Choose product Image
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
                className="block w-full mt-2  border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                                  file:bg-gray-50 file:border-0
                                    file:me-4
                                    file:py-2 file:px-4
                                  dark:file:bg-neutral-700 dark:file:text-neutral-400"
              />
            </form>
          </span>
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              value={inputs?.name}
              onChange={(e) => {
                setInputs((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }));
                setSidenavInputs({ name: e.target.value });
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Product name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="brand"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Short Description
            </label>
            <input
              type="text"
              value={inputs?.tagline}
              onChange={(e) => {
                setInputs((prevState) => ({
                  ...prevState,
                  tagline: e.target.value,
                }));
                setSidenavInputs({ tagline: e.target.value });
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Short description"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                value={inputs?.price}
                onChange={(e) => {
                  setInputs((prevState) => ({
                    ...prevState,
                    price: parseInt(e.target.value),
                  }));
                  setSidenavInputs({ price: parseInt(e.target.value) });
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$"
                min={0}
                max={10000}
                required
              />
            </div>
            <div>
              <label
                htmlFor="stock"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Stock Count
              </label>
              <input
                type="number"
                value={inputs?.stock_count}
                onChange={(e) => {
                  setInputs((prevState) => ({
                    ...prevState,
                    stock_count: parseInt(e.target.value),
                  }));
                  setSidenavInputs({ stock_count: parseInt(e.target.value) });
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="1"
                min={0}
                max={10000}
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="created_at"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Units Sold
            </label>
            <input
              type="number"
              value={inputs?.units_sold}
              onChange={(e) => {
                setInputs((prevState) => ({
                  ...prevState,
                  units_sold: parseInt(e.target.value),
                }));
                setSidenavInputs({ units_sold: parseInt(e.target.value) });
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="created_at"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date Created
            </label>
            <input
              type="date"
              value={inputs?.created_at}
              onChange={(e) => {
                setInputs((prevState) => ({
                  ...prevState,
                  created_at: e.target.value,
                }));
                setSidenavInputs({ created_at: e.target.value });
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="product images"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Images
            </label>
            <div className="grid grid-cols-3 pb-6 gap-3">
              {productImages?.map((image, i: any) => (
                <li
                  key={i}
                  className="inline-flex w-full h-32 relative items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-slate-900 dark:border-gray-700 dark:text-white"
                >
                  <div className="flex justify-between items-center w-full">
                    <span
                      onClick={() => {
                        // Filter out the entry to remove
                        const newList = productImages?.filter(
                          (product, index) => index !== i
                        );
                        // Update state with the new list
                        setProductImages(newList);
                      }}
                      className="inline-flex items-center absolute -top-2 -right-2 p-1 rounded-full font-medium hover:bg-red-500  bg-red-100 hover:text-white text-red-600 cursor-pointer"
                    >
                      <MdClear />
                    </span>

                    <img src={image} />
                  </div>
                </li>
              ))}
            </div>

            <label
              htmlFor="uploadFile-CreateProduct"
              className="bg-white h-32 text-gray-500 font-semibold text-base rounded max-w-md  flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
            >
              <IoCloudUploadOutline className="text-4xl" />
              Upload Product Images
              <input
                type="file"
                onChange={async (e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleUploadImage(e.target.files[0], "images");
                  }
                }}
                id="uploadFile-CreateProduct"
                className="hidden"
              />
              <p className="text-xs font-medium text-gray-400 mt-2">
                PNG, JPG , JPeg, are Allowed.
              </p>
            </label>
          </div>
          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            <select
              id="category"
              value={inputs?.category}
              onChange={(e) => {
                setInputs((prevState) => ({
                  ...prevState,
                  category: e.target.value,
                }));
                setSidenavInputs({ category: e.target.value });
              }}
              className="bg-gray-50 border capitalize border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              {product_categories &&
                Array.from(product_categories)?.map(
                  (category: any, index: number) => (
                    <option
                      key={index}
                      value={category?.link}
                      className="capitalize"
                    >
                      {category?.category_name?.replaceAll("_", " ")}
                    </option>
                  )
                )}
            </select>
          </div>{" "}
          <div>
            <label
              htmlFor="quickstoredashboard_stores_category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Quick Stores Category
            </label>
            <select
              id="quickstoredashboard_stores_category"
              value={inputs?.quickstoredashboard_stores_category}
              onChange={(e) => {
                setInputs((prevState) => ({
                  ...prevState,
                  quickstoredashboard_stores_category: e.target.value,
                }));
                setSidenavInputs({
                  quickstoredashboard_stores_category: e.target.value,
                });
              }}
              className="bg-gray-50 border capitalize border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              {Array.from(categories)?.map((category) => (
                <option key={category} value={category} className="capitalize">
                  {category?.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              value={inputs?.description}
              onChange={(e) => {
                setInputs((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }));
                setSidenavInputs({ description: e.target.value });
              }}
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Enter event description here"
            ></textarea>
          </div>
        </div>
      </form>
      <div>
        {/* Added Filters */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Selected Filters</h3>
          <ul className="mt-2 space-y-2">
            {productFilters.map((filter, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                  {filter.key}: {filter.value}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Predefined Filters */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Filters
          </label>
          <div className="flex space-x-2 items-center lg:grid gap-3 grid-cols-3 mt-2">
            <select
              className="bg-gray-50 border h-fit  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              value={selectedFilter.key}
              onChange={(e) => {
                const key = e.target.value;
                setSelectedFilter((prev) => ({ ...prev, key, value: "" })); // Reset value when key changes
              }}
            >
              <option value="">Choose filter key</option>
              {predefined_filters?.filters?.map((filter: any) => (
                <option key={filter?.key} value={filter?.key}>
                  {filter?.key}
                </option>
              ))}
            </select>

            {selectedFilter?.key && (
              <select
                className="p-2 border border-gray-300 rounded-md"
                value={selectedFilter.value}
                onChange={(e) =>
                  setSelectedFilter((prev) => ({
                    ...prev,
                    value: e.target.value,
                  }))
                }
              >
                <option value="">Choose filter value</option>
                {predefined_filters?.filters
                  .find((filter: any) => filter.key === selectedFilter?.key)
                  ?.options?.map((option: any) => (
                    <option key={option?.value} value={option?.value}>
                      {option?.value}
                    </option>
                  ))}
              </select>
            )}
            <button
              type="button"
              onClick={handleAddFilter}
              disabled={!selectedFilter?.key || !selectedFilter?.value}
              className="py-2   px-2 inline-flex items-center gap-x-1 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700"
            >
              <IoAddOutline className="text-xl" />
              Add Filter
            </button>
          </div>
        </div>

        {/* Custom Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Add Custom Filter
          </label>
          <div className="flex space-x-2  items-center lg:grid gap-3 grid-cols-3 mt-2">
            <input
              type="text"
              placeholder="Custom key"
              value={customFilter.key}
              onChange={(e) =>
                setCustomFilter((prev) => ({ ...prev, key: e.target.value }))
              }
              className="bg-gray-50 border h-fit  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            <input
              type="text"
              placeholder="Custom value"
              value={customFilter.value}
              onChange={(e) =>
                setCustomFilter((prev) => ({ ...prev, value: e.target.value }))
              }
              className="bg-gray-50 border h-fit border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            <button
              type="button"
              onClick={handleAddCustomFilter}
              disabled={!customFilter.key || !customFilter.value}
              className="py-2  px-2 inline-flex items-center gap-x-1 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700"
            >
              <IoAddOutline className="text-xl" />
              Add Filter
            </button>
          </div>
        </div>
      </div>
      <div className="pt-10 ">
        <div className="hs-accordion-group">
          <div
            className="hs-accordion"
            id="hs-basic-with-title-and-arrow-stretched-heading-two"
          >
            <button
              className="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:outline-none dark:focus:text-neutral-400"
              aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two"
            >
              Variations
              <svg
                className="hs-accordion-active:hidden block size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
              <svg
                className="hs-accordion-active:block hidden size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m18 15-6-6-6 6"></path>
              </svg>
            </button>
            <div
              id="hs-basic-with-title-and-arrow-stretched-collapse-two"
              className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
              aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two"
            >
              <ProductVariationsForm />
            </div>
          </div>
          <div
            className="hs-accordion"
            id="hs-basic-with-title-and-arrow-stretched-heading-one"
          >
            <button
              className="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:outline-none dark:focus:text-neutral-400"
              aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
            >
              Attributes
              <svg
                className="hs-accordion-active:hidden block size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
              <svg
                className="hs-accordion-active:block hidden size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m18 15-6-6-6 6"></path>
              </svg>
            </button>
            <div
              id="hs-basic-with-title-and-arrow-stretched-collapse-one"
              className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
              aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
            >
              <ProductAttributesForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
