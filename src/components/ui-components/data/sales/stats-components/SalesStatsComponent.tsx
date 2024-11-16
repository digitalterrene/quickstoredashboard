import React from "react";
import { BiArrowToRight, BiRightArrow } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { FiBox } from "react-icons/fi";
import { HiArrowRight, HiOutlineCash } from "react-icons/hi";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdKeyboardArrowRight, MdTurnRight } from "react-icons/md";

export default function SalesStatsComponent({ stats }: { stats: any }) {
  return (
    <div className=" mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
          <div className="p-4 md:p-5 flex justify-between gap-x-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                Customers
              </p>
              <div className="mt-1 flex items-center gap-x-2">
                <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                  {stats?.customers || 0}
                </h3>
                <span className="flex items-center gap-x-1 text-green-600">
                  <svg
                    className="inline-block size-5 self-center"
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
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                  <span className="inline-block text-lg">1.7%</span>
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 flex justify-center items-center size-[46px] bg-blue-600 text-white rounded-full dark:bg-blue-900 dark:text-blue-200">
              <svg
                className="flex-shrink-0 size-5"
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
          <div className="p-4 md:p-5 flex justify-between gap-x-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                Orders
              </p>
              <div className="mt-1 flex items-center gap-x-2">
                <h3 className="mt-1 text-xl font-medium text-gray-800 dark:text-neutral-200">
                  {stats?.invoices || 0}
                </h3>
              </div>
            </div>
            <div className="flex-shrink-0 flex justify-center items-center size-[46px] bg-blue-600 text-white rounded-full dark:bg-blue-900 dark:text-blue-200">
              <FiBox className="text-xl" />
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
          <div className="p-4 md:p-5 flex justify-between gap-x-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                Products
              </p>
              <div className="mt-1 flex items-center gap-x-2">
                <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                  {stats?.products || 0}
                </h3>
                <span className="flex items-center gap-x-1 text-red-600">
                  <svg
                    className="inline-block size-4 self-center"
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
                    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                    <polyline points="16 17 22 17 22 11" />
                  </svg>
                  <span className="inline-block text-lg">1.7%</span>
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 flex justify-center items-center size-[46px] bg-blue-600 text-white rounded-full dark:bg-blue-900 dark:text-blue-200">
              <IoPricetagsOutline className="text-xl" />
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
          <div className="p-4 md:p-5 flex justify-between gap-x-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                Sales
              </p>
              <div className="mt-1 flex items-center gap-x-2">
                <h3 className="mt-1 text-xl font-medium text-gray-800 dark:text-neutral-200">
                  {stats?.revenue || 0}
                </h3>
              </div>
            </div>
            <div className="flex-shrink-0 flex justify-center items-center size-[46px] bg-blue-600 text-white rounded-full dark:bg-blue-900 dark:text-blue-200">
              <HiOutlineCash className="text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}