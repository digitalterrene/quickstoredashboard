"use client";
import React from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { TbLayoutNavbar } from "react-icons/tb";
import { useFrontStoreConfig } from "@/context";
import { templates } from "./templates";
import CategoriesPreview from "./CategoriesPreview";
import { BiCategoryAlt } from "react-icons/bi";

export default function CategoriesTemplates() {
  const {
    previewInFullScreen,
    frontStoreConfigInputs,
    setFrontStoreConfigInputs,
  } = useFrontStoreConfig();
  return (
    <>
      {previewInFullScreen ? (
        <CategoriesPreview />
      ) : (
        <div className="flex h-full">
          <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
            <main className="flex gap-4 items-start overflow-hidden">
              <div
                aria-labelledby="primary-heading"
                className="gap-2  rounded-lg p-2 border shadow-inner h-fit w-full grid grid-cols-3 items-start  overflow-y-auto "
              >
                {templates
                  ?.slice(0, 1)
                  ?.map(({ template_name, template, installations }) => (
                    <div
                      key={template_name}
                      onClick={() =>
                        setFrontStoreConfigInputs({
                          template_name: template_name,
                        })
                      }
                      className="bg-slate-100 cursor-pointer w-full p-0.5  h-fit rounded-lg"
                    >
                      <div
                        className={`rounded-lg bg-${
                          template_name ===
                          frontStoreConfigInputs?.template_name
                            ? "blue-100"
                            : "white"
                        } p-4`}
                      >
                        <div className="flex items-center">
                          <span className="relative rounded-lg  bg-purple-200 p-1.5">
                            <BiCategoryAlt className="text-2xl text-purple-500" />
                          </span>
                          <p className="text-sm capitalize ml-2 text-black">
                            {template_name?.replaceAll("_", " ")}
                          </p>
                        </div>
                        <div className="flex flex-col justify-start">
                          <p className="my-4 text-left text-4xl font-bold text-gray-700">
                            {installations}
                          </p>
                          <div className="flex items-center text-sm text-green-500">
                            <AiOutlineDownload />
                            <span className="ml-2 text-gray-400">
                              Active Installations
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="   lg:flex-shrink-0">
                <div className="relative flex h-full w-96 flex-col overflow-y-auto border-r border-gray-200 bg-white">
                  <CategoriesPreview />
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}
