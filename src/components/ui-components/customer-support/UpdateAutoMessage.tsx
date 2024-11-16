// ActiveChat.js
import React, { useState } from "react";
import { useAuthContext } from "@/context/auth-context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

import { useRouter } from "next/navigation";
import { BsFillBagCheckFill } from "react-icons/bs";
import {
  MdCancel,
  MdCheckCircle,
  MdOutlineAdsClick,
  MdOutlineEmojiEmotions,
} from "react-icons/md";

import { AiOutlineEye, AiOutlineInbox } from "react-icons/ai";
import { IoCheckmark, IoMicOutline } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";

import Clipboard from "react-clipboard.js";
import { TbSend } from "react-icons/tb";
import { updateStoreData } from "@/api-calls/dashboard-data/updateStoreData";
import dynamic from "next/dynamic";
import { TfiShortcode } from "react-icons/tfi";
const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);
export default function UpdateAutoMessage({ msg }: { msg?: any }) {
  const { user } = useAuthContext();
  const [inputs, setInputs] = useState(msg?.message || "");
  const [activeOption, setActiveOption] = useState(
    msg?.message_type || "auto_message_order_placed"
  );
  const [textCopied, setTextCopied] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiObject: any) => {
    setInputs((prevInputs: any) => prevInputs + emojiObject.emoji);
    setShowEmojiPicker(false); // Hide the picker after selecting an emoji
  };
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const id = toast.loading("Updating auto message");

    if (isSubmitting) return;

    setIsSubmitting(true);

    const keys_to_update = [];

    if (inputs !== msg?.message) {
      keys_to_update.push({ key: "message", value: inputs });
    }

    if (activeOption !== msg?.message_type) {
      keys_to_update.push({ key: "message_type", value: activeOption });
    }

    if (keys_to_update.length === 0) {
      toast.update(id, {
        render: "No changes detected",
        type: "info",
        isLoading: false,
      });
      setIsSubmitting(false);
      setTimeout(() => {
        toast.dismiss();
      }, 2000);
      return;
    }

    const data_ = {
      _id: msg?._id || "",
      keys_to_update,
    };

    try {
      const response = await updateStoreData(
        user?._id,
        `${user?._id ? "logged-in" : "not-logged-in"}`,
        user?._id,
        user?.token,
        `${"auto_messages"}`,
        data_
      );

      if (response?.response === "error") {
        toast.update(id, {
          render: response?.message,
          type: "error",
          isLoading: false,
        });
        setTimeout(() => {
          router.refresh();
          toast.dismiss();
        }, 5000);
      }

      if (response?.response === "ok") {
        toast.update(id, {
          render: response?.message,
          type: "success",
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.update(id, {
        render: "An error occurred",
        type: "error",
        isLoading: false,
      });
    } finally {
      setIsSubmitting(false);
    }

    setTimeout(() => {
      toast.dismiss();
    }, 4000);
  };

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <ToastContainer />
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 w-full rounded-2xl bg-gray-100 h-full p-4">
            <div className="relative w-full">
              <div className="bg-white p-4 space-y-3 rounded-md  ">
                <div className="flex items-center gap-3">
                  <TfiShortcode className="text-xl text-blue-600" />
                  <p className="  font-bold text-gray-600">Shortcodes</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries({
                    "Customer Name": "[customer_name]",
                    "Customer Image": "[customer_image]",
                    "Customer Email": "[customer_email]",
                    "Customer ID": "[customer_id]",
                    "Order ID": "[order_id]",
                  }).map(([field, value]) => (
                    <div key={field} className=" w-full rounded-md">
                      {field !== "image" && (
                        <Clipboard
                          className="w-full"
                          data-clipboard-text={value}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setTextCopied(value);
                              setTimeout(() => {
                                setTextCopied("");
                              }, 3000);
                            }}
                            className="js-clipboard-example w-full justify-between    relative py-3 px-4 inline-flex   items-center gap-x-2 text-sm font-mono rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                            data-clipboard-target=" "
                            data-clipboard-action="copy"
                            data-clipboard-success-text="Copied"
                          >
                            <p className="capitalize mr-auto text-xs">
                              {field
                                ?.replaceAll("_", " ")
                                ?.replaceAll("Customer", "")}
                            </p>
                            <span className="text-blue-600">
                              {value || field}
                            </span>
                            <span className="border-s ps-3.5 dark:border-neutral-700">
                              {textCopied === value ? (
                                <div className="p-1 rounded bg-blue-100 text-blue-600">
                                  <IoCheckmark className="text-blue-600 text-md" />
                                </div>
                              ) : (
                                <svg
                                  className="js-clipboard-default size-4 group-hover:rotate-6 transition"
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
                                  <rect
                                    width="8"
                                    height="4"
                                    x="8"
                                    y="2"
                                    rx="1"
                                    ry="1"
                                  ></rect>
                                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                </svg>
                              )}
                            </span>
                          </button>
                        </Clipboard>
                      )}
                    </div>
                  ))}{" "}
                </div>
              </div>
              <div className="grid grid-cols-4 mt-4 mb-4 items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveOption("auto_message_order_placed")}
                  className={`py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border-2 ${
                    activeOption === "auto_message_order_placed"
                      ? "bg-gray-100 text-gray-800 border-blue-500"
                      : "bg-white text-gray-500 border-transparent"
                  } hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <MdOutlineAdsClick />
                  Order Placed
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveOption("auto_message_order_in_process")
                  }
                  className={`py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent ${
                    activeOption === "auto_message_order_in_process"
                      ? "bg-gray-100 text-gray-800 border-gray-300"
                      : "bg-white text-gray-500 border-gray-200"
                  } hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <AiOutlineInbox />
                  Order Accepted
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveOption("auto_message_order_in_shipping")
                  }
                  className={`py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border-2 ${
                    activeOption === "auto_message_order_in_shipping"
                      ? "bg-teal-100 text-teal-800 border-blue-500"
                      : "bg-white text-gray-500 border-transparent"
                  } hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500`}
                >
                  <BsFillBagCheckFill />
                  Order Shipped
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveOption("auto_message_order_delivered")
                  }
                  className={`py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border-2 ${
                    activeOption === "auto_message_order_delivered"
                      ? "bg-blue-100 text-blue-800 border-blue-500"
                      : "bg-white text-gray-500 border-transparent"
                  } hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <AiOutlineEye />
                  Order Delivered
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveOption("auto_message_order_cancelled")
                  }
                  className={`py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border-2 ${
                    activeOption === "auto_message_order_cancelled"
                      ? "bg-red-100 text-red-800 border-blue-500"
                      : "bg-white text-gray-500 border-transparent"
                  } hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500`}
                >
                  <MdCancel />
                  Order Cancelled
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveOption("auto_message_order_payment_failed")
                  }
                  className={`py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border-2 ${
                    activeOption === "auto_message_order_payment_failed"
                      ? "bg-yellow-100 text-yellow-800 border-blue-500"
                      : "bg-white text-gray-500 border-transparent"
                  } hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                >
                  <MdCheckCircle />
                  Payment Failed
                </button>
              </div>
              <textarea
                className="p-4 pb-12 block w-full bg-gray-100 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ask me anything..."
                rows={8}
                value={inputs}
                onChange={(e) => setInputs(e.target.value)}
              ></textarea>

              <div className="absolute bottom-px inset-x-px p-2 rounded-b-lg bg-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <MdOutlineEmojiEmotions className="text-xl text-pink-800" />
                    </button>
                    {showEmojiPicker && (
                      <Picker
                        reactionsDefaultOpen={true}
                        onEmojiClick={handleEmojiClick}
                      />
                    )}
                    <button
                      type="button"
                      className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <GrAttachment className="text-lg text-blue-500" />
                    </button>
                  </div>

                  <div className="flex items-center gap-x-1">
                    <button
                      type="button"
                      className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <IoMicOutline className="text-2xl text-red-500" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSubmit()}
                      className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <TbSend className="text-xl text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
