import React from "react";

export default function ProflieInformationBlock({
  admin_information,
  profile_information,
}: any) {
  const { bio, email, first_name, gender, image, last_name, phone_number } =
    profile_information;
  return (
    <div className="mx-auto  flex max-w-xs flex-col items-center rounded-xl border px-4 py-4 h-72 text-center md:max-w-lg md:flex-row md:items-start md:text-left">
      <div className="mb-4 md:mr-6 md:mb-0">
        <img
          className="h-56 rounded-lg object-cover md:w-56"
          src={
            image || "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
          }
          alt=""
        />
      </div>
      <div className="">
        <p className="text-xl font-medium text-gray-700">
          {first_name} {last_name}
        </p>
        <p className="mb-4 text-sm font-medium text-gray-500">{email}</p>
        <div className="flex space-x-2">
          <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
            <p className="text-sm font-medium text-gray-500">Articles</p>
            <p className="text-3xl font-medium text-gray-600">13</p>
          </div>
          <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
            <p className="text-sm font-medium text-gray-500">Papers</p>
            <p className="text-3xl font-medium text-gray-600">7</p>
          </div>
          <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
            <p className="text-sm font-medium text-gray-500">Followers</p>
            <p className="text-3xl font-medium text-gray-600">2.5k</p>
          </div>
          <div className=""></div>
        </div>
        <div className="mb-3"></div>
        <div className="flex space-x-2">
          <button className="w-full rounded-lg border-2 bg-white px-4 py-2 font-medium text-gray-500">
            Message
          </button>
          <button className="w-full rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}
