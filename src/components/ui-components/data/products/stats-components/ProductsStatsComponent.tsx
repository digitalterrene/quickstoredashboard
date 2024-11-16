import React from "react";
import { BsBoxSeam } from "react-icons/bs";
import { CiDollar } from "react-icons/ci";
import { GrTag } from "react-icons/gr";
import { LuShoppingCart } from "react-icons/lu";

export default function ProductsStatsComponent({ stats }: { stats: any }) {
  console.log({ productStates: stats });
  return (
    <div>
      <div className="max-w-[85rem]  mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
            <div className="p-4 md:p-5 flex gap-x-4">
              <div className="flex-shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg dark:bg-neutral-800">
                <BsBoxSeam className="text-xl text-blue-500" />
              </div>

              <div className="grow">
                <div className="flex items-center gap-x-2">
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                    Unique Products
                  </p>
                  <div className="hs-tooltip">
                    <div className="hs-tooltip-toggle">
                      <svg
                        className="flex-shrink-0 size-4 text-gray-500 dark:text-neutral-500"
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
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <path d="M12 17h.01" />
                      </svg>
                      <span
                        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                        role="tooltip"
                      >
                        The number of unique products
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-1 flex items-center gap-x-2">
                  <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                    {stats?.unique_products || 0}
                  </h3>
                  <span className="inline-flex items-center gap-x-1 px-2 rounded-full bg-green-100 text-green-900 dark:bg-green-800 dark:text-green-100">
                    $
                    <span className="inline-block text-xs font-medium">
                      {stats?.unique_products_total}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
            <div className="p-4 md:p-5 flex gap-x-4">
              <div className="flex-shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg dark:bg-neutral-800">
                <GrTag className="text-xl text-violet-500" />
              </div>

              <div className="grow">
                <div className="flex items-center gap-x-2">
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                    Stock
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2">
                  <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                    {stats?.stock_count}
                  </h3>
                  <span className="inline-flex items-center gap-x-1 px-2 rounded-full bg-green-100 text-green-900 dark:bg-green-800 dark:text-green-100">
                    $
                    <span className="inline-block text-xs font-medium">
                      {stats?.stock_total}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* 
          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
            <div className="p-4 md:p-5 flex gap-x-4">
              <div className="flex-shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg dark:bg-neutral-800">
                <CiDollar className="text-2xl text-green-500" />
              </div>

              <div className="grow">
                <div className="flex items-center gap-x-2">
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                    Purchases
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2">
                  <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                    {stats?.total_value}
                  </h3>
                  <span className="inline-flex items-center gap-x-1 py-0.5 px-2 rounded-full bg-red-100 text-red-900 dark:bg-red-800 dark:text-red-100">
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
                    <span className="inline-block text-xs font-medium">
                      1.7%
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div> */}

          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
            <div className="p-4 md:p-5 flex gap-x-4">
              <div className="flex-shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg dark:bg-neutral-800">
                <LuShoppingCart className="text-xl text-pink-500" />
              </div>

              <div className="grow">
                <div className="flex items-center gap-x-2">
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                    Sales
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2">
                  <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                    {stats?.units_sold}
                  </h3>
                  <span className="inline-flex items-center gap-x-1 px-2 rounded-full bg-green-100 text-green-900 dark:bg-green-800 dark:text-green-100">
                    $
                    <span className="inline-block text-xs font-medium">
                      {stats?.total_sales}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
