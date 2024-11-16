import { useClientActions, useSideNavInputs } from "@/context";
import { useAuthContext } from "@/context/auth-context/AuthContext";
import useNavigation from "@/utils/handleNavigate";
import React from "react";

import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";
import {
  MdOutlineShoppingCart,
  MdOutlineStoreMallDirectory,
} from "react-icons/md";

export default function ProductsHeaderPanel() {
  const { isGridMode, toggleIsGridMode } = useSideNavInputs();
  const { handleQuickNavigate } = useNavigation();
  const { user } = useAuthContext();
  const { isClientMode, toggleIsClientMode } = useClientActions();
  return (
    <div className="flex items-center  justify-between">
      <nav className="flex   space-x-1">
        <div className="sm:col-span-1">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
            Products
          </h2>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            Add products, edit and more.
          </p>
        </div>
      </nav>
      <div className="items-center   flex   space-x-4">
        <div className="hs-dropdown relative inline-flex [--placement:bottom-left]">
          <button
            id="hs-dropdown"
            type="button"
            className="hs-dropdown-toggle py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            aria-haspopup="menu"
            aria-expanded="false"
            aria-label="Dropdown"
          >
            {" "}
            <MdOutlineStoreMallDirectory className="text-lg text-red-600" />
            Suppliers
            <svg
              className="hs-dropdown-open:rotate-180 size-4"
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
          </button>

          <div
            className="hs-dropdown-menu w-72 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 bg-white shadow-md rounded-lg p-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="hs-dropdown"
          >
            <a
              className="flex items-center cursor-pointer gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
              onClick={() =>
                handleQuickNavigate("data/suppliers/cjdropshipping", user)
              }
            >
              CJ Dropshipping
            </a>
            <a
              className="flex items-center cursor-pointer gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
              onClick={() =>
                handleQuickNavigate("data/suppliers/woocommerce", user)
              }
            >
              Woocommerce
            </a>
            <a
              className="flex items-center cursor-pointer gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
              onClick={() => handleQuickNavigate("data/suppliers/eprolo", user)}
            >
              Eprolo
            </a>
            <a
              className="flex items-center cursor-pointer gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
              onClick={() => handleQuickNavigate("data/suppliers", user)}
            >
              All Suppliers
            </a>
          </div>
        </div>
        <button
          type="button"
          onClick={() => toggleIsClientMode()}
          className={`py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-${
            isClientMode ? "gray-800" : "white"
          } text-${
            isClientMode ? "white" : "gray-800"
          }  focus:outline-none border-gray-900  disabled:opacity-50 disabled:pointer-events-none dark:bg-white dark:text-neutral-800`}
        >
          <MdOutlineShoppingCart className="text-lg" />
          Client Mode
        </button>
        {/* <button
          type="button"
          onClick={() => toggleIsGridMode()}
          className={`inline-flex flex-shrink-0 justify-center items-center p-1 rounded text-${
            !isGridMode ? "gray-500" : "white"
          } hover:bg-blue-100 bg-${
            isGridMode ? "blue-500" : "transparent"
          } hover:text-blue-800 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200`}
        >
          <MdOutlineShoppingCart className="text-lg" />
          Client Mode
        </button> */}
        <div className="inline-flex border gap-3 border-gray-200 rounded-lg p-1 dark:border-neutral-700">
          <button
            type="button"
            onClick={() => toggleIsGridMode()}
            className={`inline-flex flex-shrink-0 justify-center items-center p-1 rounded text-${
              !isGridMode ? "gray-500" : "white"
            } hover:bg-blue-100 bg-${
              isGridMode ? "blue-500" : "transparent"
            } hover:text-blue-800 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200`}
          >
            <HiOutlineViewList className="text-lg" />
          </button>

          <button
            type="button"
            onClick={() => toggleIsGridMode()}
            className={`inline-flex flex-shrink-0 justify-center items-center p-1 rounded text-${
              isGridMode ? "gray-500" : "white"
            } hover:bg-blue-100 bg-${
              !isGridMode ? "blue-500" : "transparent"
            } hover:text-blue-800 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200`}
          >
            <HiOutlineViewGrid className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}
