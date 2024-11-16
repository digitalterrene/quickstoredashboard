"use client";
import { updateStoreData } from "@/api-calls/dashboard-data/updateStoreData";
import { fetchCJDProductDetails } from "@/api-calls/suppliers/cjdropshipping/fetchCJDProductDetails";
import { useSideNavInputs } from "@/context";

import { useAuthContext } from "@/context/auth-context/AuthContext";
import { categories } from "@/data/front-store-data";
import { ProductObjectType } from "@/ts-types/data";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiShare1 } from "react-icons/ci";

import { GoSync } from "react-icons/go";
import {
  IoAddOutline,
  IoBookOutline,
  IoCloudUploadOutline,
  IoPricetagsOutline,
} from "react-icons/io5";

import { toast } from "react-toastify";
import useNavigation from "@/utils/handleNavigate";
import { MdClear } from "react-icons/md";

import ProductVariationsForm from "./ProductVariationsForm";
import ProductAttributesForm from "./ProductAttributesForm";
import { fetchCJDProductVariants } from "@/api-calls/suppliers/cjdropshipping/fetchCJDProductVariants";

import {
  useDataCreateProductAttributesInputs,
  useDataCreateProductVariationsInputs,
} from "@/context/data";
import { fetchWooCommerceProductVariations } from "@/api-calls/suppliers/woocommerce/fetchWooCommerceProductVariations";
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

export default function EditProduct({
  product,
  product_categories,
  suppliers_configurations_response,
  predefined_filters,
}: any) {
  const { sidenavInputs, closeSidenav, setSidenavInputs } = useSideNavInputs();
  const { inputs: variationsInputs } = useDataCreateProductVariationsInputs();
  const { inputs: attributesInputs } = useDataCreateProductAttributesInputs();

  const { user } = useAuthContext();
  const router = useRouter();
  const { handleQuickNavigate } = useNavigation();

  const [inputs, setInputs] = useState<ProductObjectType>({
    ...initialInputs,
    ...sidenavInputs,
    ...product,
  });

  const [productFilters, setProductFilters] = useState<
    { key: string; value: string }[]
  >(product?.filters || []);

  const [updatedInputs, setUpdatedInputs] = useState<
    { key: string; value: string | any }[]
  >([]);

  const keysToUpdate: { key: keyof ProductObjectType; value: any }[] = [];
  const [productImages, setProductImages] = useState<string[]>(
    inputs?.images && inputs.images.length > 0 ? inputs.images : []
  );

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
      const inputs = new FormData();
      inputs.append("file", image);
      inputs.append(
        "upload_preset",
        `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
      );
      inputs.append(
        "cloud_name",
        `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`
      );
      fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "post",
          body: inputs,
        }
      )
        .then((res) => res.json())
        .then(async (files_inputs) => {
          toast.update(id, {
            render: "Image successfully uploaded",
            type: "success",
            isLoading: false,
          });
          // console.log("Image in the server" + inputs.secure_url.toString());
          if (!product?.image) {
            setUpdatedInputs((prev) => [
              ...prev,
              { key: "image", value: `${files_inputs.secure_url.toString()}` },
            ]);
          }

          setProductImages((prevState) => [
            ...prevState,
            files_inputs.secure_url.toString(),
          ]);
          setSidenavInputs({
            images: [files_inputs.secure_url.toString(), ...productImages],
          });
          keysToUpdate.push({
            key: "images",
            value: [files_inputs.secure_url.toString(), ...productImages],
          });
          setUpdatedInputs((prev) => [
            ...prev,
            {
              key: "images",
              value: [files_inputs.secure_url.toString(), ...productImages],
            },
          ]);

          setInputs((prevState) => ({
            ...prevState,
            images: [files_inputs.secure_url.toString(), ...productImages],
          }));
          //return { image_url: inputs.secure_url.toString() };
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
  //fetching variations for the woocomerce product
  const init_suppliers_configurations_response: any[] =
    suppliers_configurations_response || [];

  const wc_suppliers_configurations: any =
    init_suppliers_configurations_response.find(
      (config: any) => config.supplier === "woocommerce"
    ) || [];
  // fetch woocommerce configs

  const getWCVariations = async () => {
    console.log({ product });
    if (product?.external_supplier !== "woocommerce") {
      const result = await fetchWooCommerceProductVariations(
        wc_suppliers_configurations?.BASE_URL,
        wc_suppliers_configurations?.WC_CONSUMER_KEY,
        wc_suppliers_configurations?.WC_CONSUMER_SECRET,
        inputs?.id
      );
      if (result.response === "ok") {
        return result.data;

        // console.log({ variations: result.data });
      }
    } else {
      console.log({ variations: "Product is not from woocomerce" });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    // Update the updatedInputs array without duplicating keys
    setUpdatedInputs((prev) => {
      const existingIndex = prev.findIndex((input) => input.key === name);
      if (existingIndex !== -1) {
        const updatedList = [...prev];
        updatedList[existingIndex] = { key: name, value };
        return updatedList;
      } else {
        return [...prev, { key: name, value }];
      }
    });
  };

  const handleSubmit = async () => {
    const id = toast.loading("Updating product...");

    const data_ = {
      _id: inputs?._id || "",
      keys_to_update: [
        ...updatedInputs,
        { key: "variations", value: variationsInputs },
        { key: "filters", value: productFilters },
        { key: "attributes", value: attributesInputs },
      ],
    };
    const response = await updateStoreData(
      user?._id,
      `${user?._id ? "logged-in" : "not-logged-in"}`,
      user?._id,
      user?.token,
      `${"products"}`,
      data_
    );
    if (response) {
      toast.update(id, {
        render: `${response?.message}`,
        type: `${response?.response === "ok" ? "success" : "error"}`,
        isLoading: false,
      });
      setTimeout(() => {
        router.refresh();
        toast.dismiss();
      }, 5000);
    }
  };

  const handleSyncProduct = async () => {
    // Initialize the toast notification with a loading message
    const id = toast.loading("Updating product...");

    // Retrieve necessary values from inputs
    const pid = inputs?.pid || "";
    const productSku = inputs?.productSku;

    // Retrieve user data from localStorage
    const quickstoredashboard_cjd_user_chunk: any = localStorage.getItem(
      "quickstoredashboard-cjd-user"
    );
    const quickstoredashboard_cjd_user = JSON.parse(
      quickstoredashboard_cjd_user_chunk
    );

    try {
      // Fetch product details and variants
      const sync_response = await fetchCJDProductDetails(
        quickstoredashboard_cjd_user?.data?.accessToken,
        {
          pid,
          productSku,
        }
      );
      const sync_variants_response = await fetchCJDProductVariants(
        quickstoredashboard_cjd_user?.data?.accessToken,
        {
          pid,
          productSku,
        }
      );

      // Check if both responses are valid
      if (!sync_response || !sync_variants_response) {
        throw new Error("Failed to fetch product details or variants");
      }

      // Update the toast message based on the fetch responses
      toast.update(id, {
        render: `${
          sync_response?.data
            ? "Successfully synced product"
            : sync_response?.message
        }`,
        type: `${sync_response?.data ? "success" : "error"}`,
        isLoading: false,
      });
      const wc_product_variations = await getWCVariations();
      // Prepare data for updating the store
      const data_: any = {
        _id: inputs?._id || "",
        keys_to_update: {
          ...sync_response?.data,
          variants:
            inputs?.external_supplier !== "woocommerce"
              ? sync_variants_response?.data
              : [],
          variations: [
            inputs?.external_supplier === "woocommerce"
              ? wc_product_variations
              : sync_variants_response?.data,
            ...variationsInputs?.variations,
          ],
        },
      };

      // Convert the object to an array of {key, value} objects
      // and filter out entries where the value is undefined
      const keysToUpdateArray: any = Object.entries(data_.keys_to_update)
        .filter(([key, value]) => value !== undefined) // Filter out undefined values
        .map(([key, value]) => ({ key, value }));

      // Check if keysToUpdateArray is a valid array
      if (!Array.isArray(keysToUpdateArray) || keysToUpdateArray.length === 0) {
        throw new Error("No valid data to update.");
      }

      // Log debugging information before calling updateStoreData
      console.log(
        "About to call updateStoreData with keys:",
        keysToUpdateArray,
        {
          user,
          additionalInfo: `${user?._id ? "logged-in" : "not-logged-in"}`,
        }
      );
    } catch (error: any) {
      // Handle any errors that occur during the fetch or update process
      console.error("Error during product sync or update:", error);
      toast.update(id, {
        render: `Error: ${error.message}`,
        type: "error",
        isLoading: false,
      });
    } finally {
      // Ensure the toast is dismissed after a certain timeout
      setTimeout(() => {
        toast?.dismiss();
      }, 6000);
    }
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
        <button
          type="button"
          onClick={() => {
            handleSubmit();
            setTimeout(() => {
              closeSidenav();
            }, 3000);
          }}
          className="py-1.5 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:hover:text-white"
        >
          Save
        </button>
        <div className="flex items-center gap-2">
          {" "}
          <button
            type="button"
            onClick={() => handleSyncProduct()}
            className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
          >
            <GoSync className="text-lg text-blue-600" />
            Sync Product
          </button>{" "}
          <div className="inline-flex border gap-3 border-gray-200 rounded-lg p-1 dark:border-neutral-700">
            <button
              type="button"
              className={`inline-flex flex-shrink-0 justify-center items-center p-1 rounded   hover:bg-blue-100   hover:text-blue-800 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200`}
            >
              <IoBookOutline className="text-lg" />
            </button>
            <button
              type="button"
              onClick={() =>
                handleQuickNavigate(
                  `data/products/${inputs?._id}/edit-product`,
                  user
                )
              }
              className={`inline-flex flex-shrink-0 justify-center items-center p-1 rounded   hover:bg-blue-100   hover:text-blue-800 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200`}
            >
              <CiShare1 className="text-lg" strokeWidth={0.3} />
            </button>
          </div>
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
              name="name"
              value={inputs.name}
              onChange={handleInputChange}
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
              name="tagline"
              value={inputs.tagline}
              onChange={handleInputChange}
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
                name="price"
                value={inputs?.price}
                onChange={handleInputChange}
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
                name="stock_count"
                value={inputs?.stock_count}
                onChange={handleInputChange}
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
              name="units_sold"
              value={inputs?.units_sold}
              onChange={handleInputChange}
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
              name="created_at"
              value={inputs?.created_at}
              onChange={handleInputChange}
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
              {productImages?.map((image: any, i: number) => {
                let src: string;

                if (typeof image === "string") {
                  // If image is a string, use it as the src
                  src = image;
                } else if (typeof image?.src === "string") {
                  // If image is an object with src, use image.src
                  src = image.src;
                } else if (image[0]) {
                  // Fallback to images[0], if available
                  src =
                    typeof image[0] === "string"
                      ? image[0]
                      : image[0]?.src || "";
                } else {
                  // Fallback in case none of the above is valid
                  src = "";
                }

                return (
                  <li
                    key={i}
                    className="inline-flex w-full h-32 relative items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-slate-900 dark:border-gray-700 dark:text-white"
                  >
                    <div className="flex justify-between items-center w-full">
                      <span
                        onClick={() => {
                          // Filter out the entry to remove
                          const newList = productImages?.filter(
                            (product: any, index: number) => index !== i
                          );
                          // Update state with the new list
                          setProductImages(newList);
                        }}
                        className="inline-flex items-center absolute -top-2 -right-2 p-1 rounded-full font-medium hover:bg-red-500 bg-red-100 hover:text-white text-red-600 cursor-pointer"
                      >
                        <MdClear />
                      </span>

                      <img src={src} alt={`Product image ${i}`} />
                    </div>
                  </li>
                );
              })}
            </div>

            <label
              htmlFor="uploadFile1"
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
                id="uploadFile1"
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
              name="category"
              value={inputs?.category}
              onChange={handleInputChange}
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
              name="quickstoredashboard_stores_category"
              value={inputs?.quickstoredashboard_stores_category}
              onChange={handleInputChange}
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
              name="description"
              onChange={handleInputChange}
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
