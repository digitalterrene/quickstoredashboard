import { useAuthContext } from "@/context/auth-context/AuthContext";
import useNavigation from "@/utils/handleNavigate";
import React from "react";
import { LuStore } from "react-icons/lu";

export default function ProfileHeader({ admin_information }: any) {
  const { handleNavigate, handleQuickNavigate } = useNavigation();
  const { user } = useAuthContext();
  const {
    email,
    username,
    image,
    banner,
    password,
    access_key,
    security_key,
    user_id,
    tagline,
    description,
  } = admin_information;
  return (
    <div className="relative pt-40 ">
      <img
        src={
          banner ||
          "https://img.freepik.com/free-vector/business-presentation-banner-with-blue-geometric-shape_1017-32330.jpg?t=st=1733049988~exp=1733053588~hmac=a116b3a00f2df0d7e122e0c2a2bcc8fe5c3e61859d6dc8caa312e29571d7a872&w=900"
        }
        alt="cover-image"
        className="w-full object-cover  rounded-lg object-center absolute top-0 left-0 z-0 h-60"
      />
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col sm:flex-row max-sm:gap-5 items-center justify-between mb-5">
          <div className="block mt-5 ">
            <img
              src={
                image ||
                "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
              }
              alt="user-avatar-image"
              className="border-4 border-solid h-28 w-28 z-20   relative border-white rounded-full"
            />
            <h3 className="font-manrope font-bold text-4xl text-gray-900 mb-1">
              {username}
            </h3>
            <p className="font-normal   text-gray-500">{tagline}</p>
          </div>
        </div>
        <div className="flex flex-col text-sm lg:flex-row max-lg:gap-5 items-center justify-between py-0.5">
          <div className="flex items-center gap-4">
            <button className="py-1.5 px-5 rounded-md bg-blue-600 text-white font-semibold   shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-100 hover:bg-blue-700">
              Profile Cards
            </button>
            <button
              onClick={() => handleNavigate("account-information", user)}
              className="py-1.5 px-5 rounded-md bg-blue-50 text-blue-600 font-semibold   shadow-sm shadow-transparent transition-all duration-500 hover:bg-blue-100"
            >
              Edit Profile
            </button>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6 ">
            <a
              target="blank"
              href={`https://quickstoredashboard.vercel.app/stores/${user?._id}`}
              className="flex items-center gap-2  hover:text-blue-500  text-gray-400 "
            >
              <LuStore className="text-xl text-blue-600" />
              Front Store
            </a>
            <ul className="flex items-center max-sm:justify-center max-sm:flex-wrap gap-2.5">
              <li
                onClick={() => handleQuickNavigate("data/products", user)}
                className="py-1.5 px-4 cursor-pointer hover:bg-blue-500 hover:text-white rounded-lg border font-semibold   text-gray-700"
              >
                Products
              </li>
              <li
                onClick={() => handleQuickNavigate("data/orders", user)}
                className="py-1.5 px-4 cursor-pointer hover:bg-blue-500 hover:text-white rounded-lg border font-semibold   text-gray-700"
              >
                Orders
              </li>
              <li
                onClick={() => handleQuickNavigate("data/invoices", user)}
                className="py-1.5 px-4 cursor-pointer hover:bg-blue-500 hover:text-white rounded-lg border font-semibold   text-gray-700"
              >
                Invoices
              </li>
              <li
                onClick={() => handleQuickNavigate("data/sales", user)}
                className="py-1.5 px-4 cursor-pointer hover:bg-blue-500 hover:text-white rounded-lg border font-semibold   text-gray-700"
              >
                Sales
              </li>
              <li
                onClick={() => handleQuickNavigate("data/customers", user)}
                className="py-1.5 px-4 cursor-pointer hover:bg-blue-500 hover:text-white rounded-lg border font-semibold   text-gray-700"
              >
                Customers
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
