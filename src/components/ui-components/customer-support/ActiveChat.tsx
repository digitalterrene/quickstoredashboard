// ActiveChat.js
import React, { useState } from "react";
import ChatMessage from "./ChatMessage";
import { useAuthContext } from "@/context/auth-context/AuthContext";

import { toast } from "react-toastify";
import { updateStoreData } from "@/api-calls/dashboard-data/updateStoreData";
import { useRouter } from "next/navigation";

import { IoMicOutline } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
import dynamic from "next/dynamic";

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);
export default function ActiveChat({
  messages,
  customer_profile_info,
  active_chat_id,
}: {
  messages: {
    created_at: string;
    sender: string;
    receiver: string;
    message: string;
    isSelf: string;
  }[];
  customer_profile_info: any;
  active_chat_id: string;
}) {
  // console.log({ messages });
  const { user } = useAuthContext();
  const [inputs, setInputs] = useState("");
  const [activeOption, setActiveOption] = useState("auto_message_order_placed");

  const router = useRouter();
  const prev_messages = messages || [];
  const handleEmojiClick = (emojiObject: any) => {
    setInputs((prevInputs) => prevInputs + emojiObject.emoji);
  };
  const handleSubmit = async () => {
    const response = await updateStoreData(
      user?._id,
      `${user?._id ? "logged-in" : "not-logged-in"}`,
      user?._id,
      user?.token,
      `${"customer_support"}`,
      {
        _id: active_chat_id,
        keys_to_update: [
          {
            key: "messages",
            value: [
              ...prev_messages,
              {
                message: inputs,
                sender: user?._id,
                receiver: active_chat_id,
                created_at: new Date().toLocaleString(),
              },
            ],
          },
        ],
      }
    );
    if (response?.response !== "ok") {
      toast.error(`${response?.response === "ok" ? "success" : "error"}`);
      setTimeout(() => {
        router.refresh();
        toast.dismiss();
      }, 5000);
    }
  };
  // console.log({ messages });
  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 w-full rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="  ">
                  {messages?.map((msg, index) => (
                    <ChatMessage
                      key={index}
                      created_at={msg?.created_at}
                      sender={msg?.sender}
                      customer_profile_info={customer_profile_info}
                      user_profile_info={{
                        _id: user?._id,
                        name: user?.username,
                        image: user?.image,
                        email: user?.email,
                      }}
                      message={msg?.message}
                      isSelf={msg?.sender === user?._id}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="relative w-full">
              <textarea
                className="p-4 pb-12 block w-full bg-gray-100 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="Type message..."
                value={inputs}
                onChange={(e) => setInputs(e.target.value)}
              ></textarea>

              <div className="absolute bottom-px inset-x-px p-2 rounded-b-lg bg-gray-100 dark:bg-neutral-800">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Picker
                      onEmojiClick={handleEmojiClick}
                      reactionsDefaultOpen={true}
                    />

                    <button
                      type="button"
                      className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:text-blue-500"
                    >
                      <GrAttachment className="text-lg text-blue-500" />
                    </button>
                  </div>

                  <div className="flex items-center gap-x-1">
                    <button
                      type="button"
                      className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:text-blue-500"
                    >
                      <IoMicOutline className="text-2xl text-red-500" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSubmit()}
                      className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <svg
                        className="flex-shrink-0 size-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                      </svg>
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
