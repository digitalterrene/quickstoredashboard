import { addToSet } from "@/api-calls/dashboard-data/addToSet";
import { updateStoreData } from "@/api-calls/dashboard-data/updateStoreData";
import { useSideNavInputs } from "@/context";
import { useAuthContext } from "@/context/auth-context/AuthContext";
import { AccountInformationMarketingCouponObject } from "@/ts-types/account-information";
import { getCurrentDateFormatted } from "@/utils/getCurrentDateFormatted";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { toast } from "react-toastify";

const EditCouponForm: React.FC = () => {
  const { closeSidenav, sidenavInputs, setSidenavInputs } = useSideNavInputs();
  const [formData, setFormData] = useState({
    image_url: "",
    coupon_code: "",
    description: "",
    discount_type: "",
    discount_value: "",
    expiration_date: "",
    click: 0,
    subscriptions: 0,
    views: 0,
    created_at: getCurrentDateFormatted(),
    location: "United States",
    applicable_products: "",
    _id: "",
    ...sidenavInputs,
  });
  const { user } = useAuthContext();
  const router = useRouter();
  const [updatedInputs, setUpdatedInputs] = useState<
    { key: string; value: string | number }[]
  >([]);
  const keysToUpdate: {
    key: keyof AccountInformationMarketingCouponObject;
    value: any;
  }[] = [];

  const [updatedKeys, setUpdatedKeys] = useState<string[]>([""]);

  const handleUploadImage = async (image: File | Blob) => {
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

        setFormData((prevState) => ({
          ...prevState,
          image_url: data.imgUrl.toString(),
        }));
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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

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
    const id = toast.loading("Updating social account...");

    updatedKeys.forEach((key) => {
      // Assert that key is one of the keys of ProductObjectType
      const typedKey = key as keyof AccountInformationMarketingCouponObject;
      const value = formData[typedKey];

      // Remove existing entry for the key, if any
      const existingIndex = keysToUpdate.findIndex(
        (entry) => entry.key === typedKey
      );
      if (existingIndex !== -1) {
        keysToUpdate.splice(existingIndex, 1);
      }
      // Add the updated key-value pair
      keysToUpdate.push({ key: typedKey, value });
    });
    const data_ = {
      _id: formData?._id || "",
      keys_to_update: updatedInputs,
    };
    const response = await updateStoreData(
      user?._id,
      `${user?._id ? "logged-in" : "not-logged-in"}`,
      user?._id,
      user?.token,
      `${"coupons"}`,
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
  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg space-y-4">
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
            type="submit"
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
      <div className="cols-span-full">
        <div className=" ">
          <label className="block  text-sm font-medium text-gray-700">
            Image
          </label>
        </div>
        <div className="mt-4 ">
          <div className="flex items-center gap-5">
            <img
              className="inline-block size-12  rounded-lg ring-2 ring-white dark:ring-neutral-900"
              src={
                formData?.image_url ||
                "https://cdn-icons-png.flaticon.com/128/4904/4904233.png"
              }
              alt="Image Description"
            />
            <div className="flex gap-x-2">
              <label htmlFor="uploadFile-EditCouponForm">
                <input
                  type="file"
                  onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleUploadImage(e.target.files[0]);
                    }
                  }}
                  id="uploadFile-EditCouponForm"
                  className="hidden"
                />
                <span className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                  <svg
                    className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" x2="12" y1="3" y2="15" />
                  </svg>
                  Upload image
                </span>
              </label>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="coupon_code"
            className="block text-sm font-medium text-gray-700"
          >
            Coupon Code
          </label>
          <input
            type="text"
            name="coupon_code"
            id="coupon_code"
            value={formData.coupon_code}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="discount_type"
            className="block text-sm font-medium text-gray-700"
          >
            Discount Type
          </label>
          <select
            name="discount_type"
            id="discount_type"
            value={formData.discount_type}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="">Select Type</option>
            <option value="percentage">Percentage</option>
            <option value="fixedAmount">Fixed Amount</option>
          </select>
        </div>
        <div className="col-span-2">
          <label
            htmlFor="discount_value"
            className="block text-sm font-medium text-gray-700"
          >
            Discount Value
          </label>
          <input
            type="number"
            name="discount_value"
            id="discount_value"
            value={formData.discount_value}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={6}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="created_at"
            className="block text-sm font-medium text-gray-700"
          >
            Created At
          </label>
          <input
            type="date"
            name="created_at"
            id="created_at"
            value={formData?.created_at}
            required
            onChange={handleInputChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="expiration_date"
            className="block text-sm font-medium text-gray-700"
          >
            Expiration Date
          </label>
          <input
            type="date"
            name="expiration_date"
            id="expiration_date"
            value={formData.expiration_date}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-2 ">
          <label
            htmlFor="profile_photo_url"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData?.location}
            required
            onChange={handleInputChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-2">
          <label
            htmlFor="applicable_products"
            className="block text-sm font-medium text-gray-700"
          >
            Applicable Products
          </label>
          <input
            type="text"
            name="applicable_products"
            id="applicable_products"
            value={formData.applicable_products}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="Comma-separated product IDs or names"
          />
        </div>
      </div>
    </div>
  );
};

export default EditCouponForm;
