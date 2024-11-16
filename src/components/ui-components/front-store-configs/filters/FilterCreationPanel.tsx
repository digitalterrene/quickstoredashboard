"use client";
import React, { ChangeEvent, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoAddOutline } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import FiltersPreview from "./FiltersPreview";
import { useFrontStoreSidePanelFilterConfig } from "@/context";

interface FilterOption {
  value: string;
}

interface Filter {
  key: string;
  options: FilterOption[];
}

export default function FilterCreationPanel() {
  const [filters, setFilters] = useState<Filter[]>([]);
  const {
    setFrontStoreSidePanelFilterConfigInputs,
    frontStoreSidePanelFilterConfigInputs,
  } = useFrontStoreSidePanelFilterConfig();
  const [newFilterKey, setNewFilterKey] = useState<string>("");
  const [newFilterOption, setNewFilterOption] = useState<string>("");

  const addNewFilter = () => {
    if (newFilterKey.trim() === "") return;
    setFilters((prevFilters) => [
      ...prevFilters,
      { key: newFilterKey, options: [] },
    ]);
    setNewFilterKey("");
  };

  const addOptionToFilter = (index: number) => {
    if (newFilterOption.trim() === "") return;
    const updatedFilters = [...filters];
    updatedFilters[index].options.push({ value: newFilterOption });
    setFilters(updatedFilters);
    setNewFilterOption("");
  };

  const removeFilter = (index: number) => {
    const updatedFilters = filters.filter((_, i) => i !== index);
    setFilters(updatedFilters);
  };

  const handleSubmit = () => {
    setFrontStoreSidePanelFilterConfigInputs({ filters });
    console.log("Filters:", frontStoreSidePanelFilterConfigInputs);
  };

  return (
    <div className="w-full gap-8 flex">
      <div className="flex w-1/2 flex-col gap-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newFilterKey}
            onChange={(e) => setNewFilterKey(e.target.value)}
            placeholder="Enter filter key"
            className="py-2 px-4 pe-11 block rounded-lg w-full border-gray-200 sm:shadow-sm -mt-px -ms-px text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          />
          <button
            onClick={addNewFilter}
            className="py-2  w-40 px-2 inline-flex items-center gap-x-1 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            <AiOutlinePlus className="text-lg " />
            Add Filter Key
          </button>
        </div>

        {filters.map((filter, index) => (
          <div
            key={index}
            className="  border p-3 rounded-lg space-y-3 gap-2 items-center"
          >
            <div className="flex-grow">
              <h3 className="font-semibold">{filter.key}</h3>
              <ul className="ml-4 space-y-1">
                {filter.options.map((option, i) => (
                  <li
                    key={i}
                    className="flex p-1.5 text-xs rounded-md bg-gray-100 items-center"
                  >
                    <span>{option.value}</span>
                    <button
                      onClick={() => {
                        const updatedOptions = filter.options.filter(
                          (_, j) => j !== i
                        );
                        const updatedFilters = [...filters];
                        updatedFilters[index].options = updatedOptions;
                        setFilters(updatedFilters);
                      }}
                      className="text-md bg-red-100 p-1.5 hover:bg-red-600 hover:text-white rounded ml-auto text-red-500"
                    >
                      <MdClear />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <input
              type="text"
              value={newFilterOption}
              onChange={(e) => setNewFilterOption(e.target.value)}
              placeholder="Add option"
              className="py-2 px-4 pe-11 block rounded-lg w-full border-gray-200 sm:shadow-sm -mt-px -ms-px text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            />
            <div className="flex gap-4 items-center justify-end py-6">
              <button
                onClick={() => addOptionToFilter(index)}
                className="py-2   px-2 inline-flex items-center gap-x-1 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700"
              >
                Add Option
              </button>
              <button
                onClick={() => removeFilter(index)}
                className="py-2   px-2 inline-flex text-red-600 items-center gap-x-1 text-xs font-medium rounded-lg border border-red-200 bg-white   hover:bg-red-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700"
              >
                <RiDeleteBin6Line className=" text-lg" />
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="py-2 px-4 bg-gray-100 border:blue-500 text-blue-500    border-blue-500 hover:bg-blue-500 hover:text-white rounded-lg"
        >
          Done
        </button>
      </div>
      <div>
        <FiltersPreview />
      </div>
    </div>
  );
}
