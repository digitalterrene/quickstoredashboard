import { AccountInformationLegalInformationObject } from "@/ts-types/account-information";
import React from "react";

export default function LegalInformationCard({
  legal_information,
}: {
  legal_information: AccountInformationLegalInformationObject;
}) {
  return (
    <div className="rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg">
      <div className="relative mx-auto w-36 rounded-full">
        <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
        <img
          className="mx-auto h-auto w-full rounded-full"
          src={
            legal_information?.image ||
            "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
          }
          alt=""
        />
      </div>
      <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">
        {`${legal_information?.first_name} ${legal_information?.last_name}` ||
          "Full Name"}
      </h1>
      <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">
        {legal_information?.phone_number || "Phone"}
      </h3>
      <p className="text-center text-sm leading-6 text-gray-500 hover:text-gray-600">
        {legal_information?.bio || "Bio"}
      </p>
      <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
        <li className="flex items-center py-3 text-sm">
          <span>Email</span>
          <span className="ml-auto">
            <span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">
              {legal_information?.email || "Email"}
            </span>
          </span>
        </li>
        <li className="flex items-center py-3 text-sm">
          <span>Gender</span>
          <span className="ml-auto">
            {legal_information?.gender || "Gender"}
          </span>
        </li>
      </ul>
    </div>
  );
}
