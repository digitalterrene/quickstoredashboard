"use client";
import { addToSet } from "@/api-calls/dashboard-data/addToSet";
import { useAuthContext } from "@/context/auth-context/AuthContext";

import { CustomerSupportChatObject } from "@/ts-types/customer-support";
import { useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";

import { toast, ToastContainer } from "react-toastify";
const initialInputs: CustomerSupportChatObject = {
  customer_id: "",
  customer_name: "",
  customer_image: "",
  customer_email: "",
  latest_message: "",
  latest_message_created_at: "",
  created_at: "",
};

export default function CreateChat({
  closeButton,
}: {
  closeButton: ReactNode;
}) {
  const [inputs, setInputs] =
    useState<CustomerSupportChatObject>(initialInputs);
  const { user } = useAuthContext();

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

          setInputs((prevState) => ({
            ...prevState,
            customer_image: data.secure_url.toString(),
          }));
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
  const router = useRouter();
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const id = toast.loading("Creating new customer chat...");
    const res: any = await addToSet(user._id, user?._id, user?.token, {
      key_to_update: "customer_support",
      value_to_update: {
        data_type: "customer_support",
        ...inputs,
      },
    });
    if (res.response === "ok") {
      toast.update(id, {
        render: "New support chat created successfully",
        type: "success",
        isLoading: false,
      });
    } else {
      toast.update(id, {
        render: "Failed to create new support chat",
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
    <div className="w-full max-h-full overflow-hidden flex flex-col bg-white   shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
      <ToastContainer />{" "}
      <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
        <h3 className="font-bold text-gray-800 dark:text-white">
          Creating New Chat
        </h3>
        <div className="flex gap-4 items-center">
          <span>{closeButton}</span>
          <button
            type="button"
            onClick={() => handleSubmit()}
            data-hs-overlay="#hs-vertically-centered-scrollable-modal"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            Save changes
          </button>
        </div>
      </div>
      <div className="p-4 overflow-y-auto">
        <div className="space-y-4">
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
                    inputs?.customer_image ||
                    "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                  }
                  alt="Image Description"
                />
                <div className="flex gap-x-2">
                  <label htmlFor="uploadFile1">
                    <input
                      type="file"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleUploadImage(e.target.files[0], "image");
                        }
                      }}
                      id="uploadFile1"
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
                Customer Name
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
              <input
                id="af-account-full-customer_name"
                type="text"
                name="customer_name"
                value={inputs.customer_name}
                onChange={handleInputChange}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="John"
              />
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
                  id="af-account-customer_email"
                  type="email"
                  name="customer_email"
                  value={inputs.customer_email}
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
                Customer ID
              </label>
            </div>

            <div className="sm:col-span-9">
              <div className="space-y-2">
                <input
                  id="af-account-customer_id"
                  type="text"
                  name="customer_id"
                  value={inputs.customer_id}
                  onChange={handleInputChange}
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Enter current position"
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
                  type="datetime-local"
                  name="created_at"
                  value={inputs.created_at}
                  onChange={handleInputChange}
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-bio"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Message
              </label>
            </div>

            <div className="sm:col-span-9">
              <textarea
                id="af-account-latest_message"
                name="latest_message"
                value={inputs.latest_message}
                onChange={handleInputChange}
                className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                rows={6}
                placeholder="Write message..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
