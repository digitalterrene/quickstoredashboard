// ChatMessage.js
import React from "react";
// sender, message, isSelf;
export default function ChatMessage({
  created_at,
  sender,
  customer_profile_info,
  user_profile_info,
  message,
  isSelf,
}: any) {
  return (
    <li
      className={`max-w-lg py-3 flex ${
        isSelf ? "flex-row-reverse gap-2 ml-auto" : "flex mr-auto"
      }`}
    >
      <img
        className="inline-block size-9 rounded-full"
        src={
          isSelf
            ? user_profile_info?.image
            : customer_profile_info?.customer_image
        }
        alt={
          isSelf
            ? user_profile_info?.name
            : customer_profile_info?.customer_name
        }
      />
      <div className={`flex flex-col ${isSelf ? "items-end" : "items-start"}`}>
        <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
          <h2 className="font-medium text-gray-800 dark:text-white">
            {isSelf
              ? user_profile_info?.name
              : customer_profile_info?.customer_name}
          </h2>
          <p className="text-sm text-gray-800 dark:text-white">{message}</p>
          <span className="text-xs text-gray-500 dark:text-neutral-500">
            {created_at}
          </span>
        </div>
      </div>
    </li>
  );
}
