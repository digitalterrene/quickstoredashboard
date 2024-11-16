"use client";
import { useFrontStoreSidePanelFilterConfig } from "@/context";
import React, { useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { IoIosRefresh } from "react-icons/io";

const designStyles = [
  {
    type: "button",
    className:
      "p-2 gap-1 md:gap-3 text-sm  flex items-center rounded-md bg-gray-100 font-bold",
  },
  {
    type: "checkbox",
    className:
      "shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800",
  },
  {
    type: "checkbox-form",
    className: "space-y-2",
    layout: [{ checked: false }, { checked: true }],
  },
  {
    type: "checkbox-simple",
    className: "space-y-2",
    layout: [{ checked: false }, { checked: true }],
  },
];

interface FilterOption {
  value: string;
}

interface Filter {
  key: string;
  options: FilterOption[];
}

interface FiltersPreviewProps {
  filters: Filter[];
}

export default function DefaultSidePanelFilter({}) {
  const [priceRange, setPriceRange] = useState(50);
  const { frontStoreSidePanelFilterConfigInputs } =
    useFrontStoreSidePanelFilterConfig();
  const [sortCriteria, setSortCriteria] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<any>(null);
  const filters: any = frontStoreSidePanelFilterConfigInputs?.filters || [];
  const handleFilter = (criteria: string, order: any) => {
    setSortCriteria(criteria);
    setSortOrder(order);

    // Update the URL without refreshing the page
    const url = new URL(window.location.href);
    url.searchParams.set(`filter-by-${criteria}`, order);
    window.history.pushState({}, "", url.toString());
  };

  return (
    <div className="w-80 border rounded-lg px-4 h-full sticky pb-20 top-20">
      <div className="mb-6 py-4 flex flex-col items-start md:flex-row md:justify-between border-b border-gray-200">
        <p className="text-xl font-bold">Filters</p>
        <button
          type="button"
          className="p-2 flex justify-center items-center text-xl font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          <BiFilterAlt />
        </button>
      </div>

      <div className="flex w-full mb-6 md:mb-10 md:px-6 px-2 items-center border border-gray-400 rounded-md">
        <div className="mr-1 md:mr-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.0005 14.0005L10.5359 10.5359M10.5359 10.5359C11.4736 9.59814 12.0004 8.32632 12.0004 7.00019C12.0004 5.67406 11.4736 4.40224 10.5359 3.46452C9.59814 2.5268 8.32632 2 7.00019 2C5.67406 2 4.40224 2.5268 3.46452 3.46452C2.5268 4.40224 2 5.67406 2 7.00019C2 8.32632 2.5268 9.59814 3.46452 10.5359C4.40224 11.4736 5.67406 12.0004 7.00019 12.0004C8.32632 12.0004 9.59814 11.4736 10.5359 10.5359Z"
              stroke="#9CA3AF"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="py-2 w-full border-none focus:ring-0 outline-none focus:outline-none text-sm md:text-base rounded-md placeholder:text-gray-500"
        />
      </div>

      <div className="w-full">
        {filters?.map((filter: any, index: any) => {
          const design = designStyles[index % designStyles.length];
          const filterOptions = filter.options;
          return (
            <div
              key={filter.key}
              className="pb-3 md:pb-6 border-b border-gray-100 mb-3 md:mb-6"
            >
              <p className="font-bold capitalize mb-6">{filter.key}</p>
              <div
                className={`flex flex-wrap gap-2 ${
                  design.type === "button" ? "flex-row" : ""
                }`}
              >
                {filterOptions.map((option: any, optionIndex: any) => {
                  switch (design.type) {
                    case "button":
                      return (
                        <button
                          onClick={() => handleFilter(filter.key, option.value)}
                          key={optionIndex}
                          className={`${design.className} capitalize p-2 inline-flex items-center gap-x-2 font-medium rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white dark:focus:bg-white/20 dark:focus:text-white`}
                        >
                          {option.value}
                        </button>
                      );
                    case "checkbox":
                      return (
                        <div key={optionIndex} className="flex items-center">
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              e.target.checked
                                ? handleFilter(filter.key, option.value)
                                : handleFilter(filter.key, "asc")
                            }
                            className={design.className}
                            id={`${filter.key}-${optionIndex}`}
                          />
                          <label
                            htmlFor={`${filter.key}-${optionIndex}`}
                            className="text-sm text-gray-500 ms-3"
                          >
                            {option.value}
                          </label>
                        </div>
                      );
                    case "checkbox-form":
                    case "checkbox-simple":
                      return (
                        <div
                          key={optionIndex}
                          className={`${design.className} w-full`}
                        >
                          <label
                            htmlFor={`${filter.key}-${optionIndex}`}
                            className="w-full flex p-3 bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
                          >
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                e.target.checked
                                  ? handleFilter(filter.key, option.value)
                                  : handleFilter(filter.key, "asc")
                              }
                              className={`${design.className} shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800`}
                              id={`${filter.key}-${optionIndex}`}
                            />
                            <span className="text-sm ms-3 text-gray-500 dark:text-neutral-400">
                              {option.value}
                            </span>
                          </label>
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-start w-full mb-4 justify-between">
        <label htmlFor="basic-range-slider-usage">Price</label>
        <button
          type="button"
          className="py-1.5 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          {priceRange}
        </button>
      </div>

      <input
        type="range"
        className="w-full bg-transparent cursor-pointer   disabled:opacity-50 disabled:pointer-events-none focus:outline-none"
        id="basic-range-slider-usage"
        value={priceRange}
        onChange={(e) => setPriceRange(parseInt(e.target.value))}
      />

      <div className="w-full py-3">
        <button
          type="button"
          className="py-3 w-full items-center justify-center px-4 inline-flex   gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-800 focus:outline-none focus:bg-red-800 disabled:opacity-50 disabled:pointer-events-none"
        >
          <IoIosRefresh />
          Clear filters
        </button>
      </div>
    </div>
  );
}
