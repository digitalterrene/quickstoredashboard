"use client";
import { updateStoreData } from "@/api-calls/dashboard-data/updateStoreData";
import { useSideNavInputs } from "@/context";
import { useAuthContext } from "@/context/auth-context/AuthContext";

import { CustomerObjectType } from "@/ts-types/data";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { AiOutlineSave } from "react-icons/ai";
import { FaStar } from "react-icons/fa6";
import { IoPricetagsOutline } from "react-icons/io5";
import { toast } from "react-toastify";

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}
const StarRating: React.FC<StarRatingProps> = ({ rating, setRating }) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const starRating = index + 1;
        return (
          <button
            key={index}
            type="button"
            className="focus:outline-none"
            onClick={() => setRating(starRating)}
            onMouseEnter={() => setHover(starRating)}
            onMouseLeave={() => setHover(null)}
          >
            <FaStar
              className={`w-6 h-6 ${
                starRating <= (hover ?? rating)
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default function EditCustomer() {
  const { sidenavInputs, closeSidenav, setSidenavInputs } = useSideNavInputs();

  const [inputs, setInputs] = useState<CustomerObjectType>(sidenavInputs);
  const [updatedKeys, setUpdatedKeys] = useState<string[]>([]);
  const [rating, setRating] = useState(0);

  const [updatedInputs, setUpdatedInputs] = useState<
    { key: string; value: string | number }[]
  >([]);
  const keysToUpdate: { key: keyof CustomerObjectType; value: any }[] = [];

  const { user } = useAuthContext();
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

        setInputs((prevState) => ({
          ...prevState,
          image: data.imgUrl.toString(),
        }));
        //return { image_url: inputs.secure_url.toString() };
        setUpdatedInputs((prevState) => [
          ...prevState,
          { key: "image", value: data.imgUrl.toString() },
        ]);
        setInputs({ image: data.imgUrl });
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

  const router = useRouter();

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
    const id = toast.loading("Updating customer...");

    updatedKeys.forEach((key) => {
      // Assert that key is one of the keys of ProductObjectType
      const typedKey = key as keyof CustomerObjectType;
      const value = inputs[typedKey];

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
      _id: inputs?._id || "",
      keys_to_update: [...updatedInputs, { key: "rating", value: rating }],
    };
    const response = await updateStoreData(
      user?._id,
      `${user?._id ? "logged-in" : "not-logged-in"}`,
      user?._id,
      user?.token,
      `${"customers"}`,
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
    <div className="  rounded-lg w-full">
      <div className="flex justify-between items-center">
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
      </div>

      <div className=" ">
        <div className="bg-white rounded-xl     dark:bg-neutral-800">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
              Profile
            </h2>
            <p className="text-sm text-gray-600 dark:text-neutral-400">
              Manage your name, password and account settings.
            </p>
          </div>

          <form>
            <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
              <div className="sm:col-span-3">
                <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                  Profile photo
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="flex items-center gap-5">
                  <img
                    className="inline-block size-16 rounded-full ring-2 ring-white dark:ring-neutral-900"
                    src={
                      inputs?.image ||
                      "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                    }
                    alt="Image Description"
                  />
                  <div className="flex gap-x-2">
                    <label htmlFor="uploadFile-EditCustomer">
                      <input
                        type="file"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleUploadImage(e.target.files[0]);
                          }
                        }}
                        id="uploadFile-EditCustomer"
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
                        Upload photo
                      </span>
                    </label>
                    <div></div>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-full-name"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                >
                  Full name
                </label>
                <div className="hs-tooltip inline-block">
                  <button type="button" className="hs-tooltip-toggle ms-1">
                    <svg
                      className="inline-block size-3 text-gray-400 dark:text-neutral-600"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                  </button>
                  <span
                    className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                    role="tooltip"
                  >
                    Displayed on public forums, such as Preline
                  </span>
                </div>
              </div>

              <div className="sm:col-span-9">
                <div className="sm:flex">
                  <input
                    id="af-account-full-name"
                    type="text"
                    name="name"
                    value={inputs.name}
                    onChange={handleInputChange}
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="John"
                  />
                  <input
                    type="text"
                    name="lastname"
                    value={inputs.lastname}
                    onChange={handleInputChange}
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-value"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                >
                  Email
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="space-y-2">
                  <input
                    id="af-account-email"
                    type="email"
                    name="email"
                    value={inputs.email}
                    onChange={handleInputChange}
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="name@company.com"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-password"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                >
                  Employment
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="space-y-2">
                  <input
                    id="af-account-password"
                    type="text"
                    name="position"
                    value={inputs.position}
                    onChange={handleInputChange}
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Enter current position"
                  />
                  <input
                    type="text"
                    name="company"
                    value={inputs.company}
                    onChange={handleInputChange}
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Enter company name"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-password"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                >
                  Created At
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="space-y-2">
                  <input
                    id="af-account-password"
                    type="date"
                    name="created_at"
                    value={inputs.created_at}
                    onChange={handleInputChange}
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-password"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                >
                  Category
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="space-y-2">
                  <input
                    id="af-account-password"
                    type="text"
                    name="category"
                    value={inputs.category}
                    onChange={handleInputChange}
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Category"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-value"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                >
                  Value
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="space-y-2">
                  <input
                    id="af-account-value"
                    type="number"
                    name="value"
                    value={inputs.value}
                    onChange={handleInputChange}
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="$"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-orders"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                >
                  Orders
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="space-y-2">
                  <input
                    id="af-account-orders"
                    type="number"
                    name="orders"
                    value={inputs.orders}
                    onChange={handleInputChange}
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="$"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-purchases"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                >
                  Purchases
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="space-y-2">
                  <input
                    id="af-account-purchases"
                    type="number"
                    name="purchases"
                    value={inputs.purchases}
                    onChange={handleInputChange}
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="$"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-location"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                >
                  Country
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="space-y-2">
                  <input
                    id="af-account-location"
                    type="location"
                    name="location"
                    value={inputs.location}
                    onChange={handleInputChange}
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="United States"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <div className="inline-block">
                  <label
                    htmlFor="af-account-phone"
                    className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                  >
                    Rating
                  </label>
                </div>
              </div>

              <div className="sm:col-span-9">
                <StarRating rating={rating} setRating={setRating} />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-gender-checkbox"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                >
                  Gender
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="sm:flex">
                  <label
                    htmlFor="af-account-gender-checkbox"
                    className="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={inputs?.gender === "male"}
                      onChange={handleInputChange}
                      className="shrink-0 mt-0.5 border-gray-300 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="af-account-gender-checkbox"
                    />
                    <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">
                      Male
                    </span>
                  </label>

                  <label
                    htmlFor="af-account-gender-checkbox-female"
                    className="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={inputs?.gender === "female"}
                      onChange={handleInputChange}
                      className="shrink-0 mt-0.5 border-gray-300 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="af-account-gender-checkbox-female"
                    />
                    <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">
                      Female
                    </span>
                  </label>

                  <label
                    htmlFor="af-account-gender-checkbox-other"
                    className="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      checked={inputs?.gender === "other"}
                      onChange={handleInputChange}
                      className="shrink-0 mt-0.5 border-gray-300 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="af-account-gender-checkbox-other"
                    />
                    <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">
                      Other
                    </span>
                  </label>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-bio"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                >
                  BIO
                </label>
              </div>

              <div className="sm:col-span-9">
                <textarea
                  id="af-account-bio"
                  name="description"
                  value={inputs.description}
                  onChange={handleInputChange}
                  className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  rows={6}
                  placeholder="Bio comes here..."
                ></textarea>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
