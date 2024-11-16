"use client";
import React, { useState } from "react";
import { GrHomeOption } from "react-icons/gr";

import { FiEdit, FiShoppingCart, FiUsers } from "react-icons/fi";
import { GoArrowSwitch, GoLaw } from "react-icons/go";
import { RiShieldUserLine } from "react-icons/ri";

import { FaWpforms } from "react-icons/fa6";
import { useSideNavInputs } from "@/context";

import CreateManagementForm from "@/components/ui-components/management/forms/CreateManagementForm";
import ManagementTable from "@/components/ui-components/management/tables";
import { WorldMap } from "../dashboard/charts/WordMap";

import { calculateTotalGlobalCountriesForManagement } from "@/utils/calculateTotalGlobalCountries";
import ManagementStatsComponent from "@/components/ui-components/management/stats-components/ManagementStatsComponent";
import { ManagementStatsCardComponentObjectType } from "@/ts-types/management";
import ManagementDashboardStatsComponent from "@/components/ui-components/management/stats-components/ManagementDashboardStatsComponent";

import { BiSupport } from "react-icons/bi";

export default function ManagementPage({ response }: { response: any }) {
  const { addItem, closeSidenav, isSidenavOpen } = useSideNavInputs();
  const [activeTab, setActiveTab] = useState<{ name: string; icon: any }>({
    name: "dashboard",
    icon: "",
  });
  const chartKeys = [
    "administrators",
    "employees",
    "customers",
    "quickstoredashboard_assistants",
    "participations",
    ,
    "legal_entities",
  ];
  const [selectedChartData, setSelectedChartData] = useState<any>(
    chartKeys[0]?.replaceAll("_", " ")
  );

  const mapStats = calculateTotalGlobalCountriesForManagement(
    response?.[selectedChartData || "administrators"] || []
  );
  const iconsMap: any = {
    administrators: <RiShieldUserLine />,
    employees: <FiUsers />,
    customers: <FiShoppingCart />,
    quickstoredashboard_assistants: <BiSupport />,
    participations: <GoArrowSwitch />,
    legal_entities: <GoLaw />,
  };

  function transformData() {
    return Object.keys(response)?.map((key) => {
      const categoryData = response[key];
      const total = categoryData?.length;

      // const permissions =
      //   categoryData?.reduce((acc: any, user: any) => {
      //     Object?.keys(user?.permissions)?.forEach((permissionKey) => {
      //       acc[permissionKey] =
      //         (acc[permissionKey] || 0) + user?.permissions[permissionKey];
      //     });
      //     return acc;
      //   }, {}) || [];
      const permissions = categoryData?.reduce((acc: any, user: any) => {
        // Check if user.permissions is defined and is an object
        if (user?.permissions && typeof user.permissions === "object") {
          Object.keys(user.permissions).forEach((permissionKey) => {
            acc[permissionKey] =
              (acc[permissionKey] || 0) + user.permissions[permissionKey];
          });
        }
        return acc;
      }, {});

      // const tracking = categoryData.reduce((acc: any, user: any) => {
      //   Object?.keys(user?.tracking)?.forEach((trackingKey) => {
      //     acc[trackingKey] =
      //       (acc[trackingKey] || 0) + user?.tracking[trackingKey];
      //   });
      //   return acc;
      // }, {});
      const tracking = categoryData.reduce((acc: any, user: any) => {
        // Check if user.tracking is defined and is an object
        if (user?.tracking && typeof user.tracking === "object") {
          Object.keys(user.tracking).forEach((trackingKey) => {
            acc[trackingKey] =
              (acc[trackingKey] || 0) + user.tracking[trackingKey];
          });
        }
        return acc;
      }, {});

      return {
        name: key,
        icon: iconsMap[key],
        total,
        permissions,
        tracking,
      };
    });
  }
  const statsData: any = transformData();
  const filteredStatsData = statsData.filter(
    (stats: any) => stats.name === activeTab?.name
  );
  console.log({ statsData });
  return (
    <div className="w-full h-full  pb-6 overflow-hidden space-y-3 pt-3 px-6 ">
      <div className="  items-center justify-between">
        <nav className="flex     " aria-label="Tabs" role="tablist">
          <button
            type="button"
            onClick={() =>
              setActiveTab({ name: "dashboard", icon: <GrHomeOption /> })
            }
            className="hs-tab-active:bg-blue-50  hs-tab-active:text-blue-500 hs-tab-active:hover:text-blue-400  py-1.5 h-fit hs-tab-active:dark:text-white  px-4 inline-flex items-center gap-x-2 bg-transparent text-sm font-medium text-center text-gray-500 hover:text-blue-600 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-neutral-300 active"
            id="pills-with-brand-color-item-1"
            data-hs-tab="#pills-with-brand-color-1"
            aria-controls="pills-with-brand-color-1"
            role="tab"
          >
            <GrHomeOption /> Dashboard
          </button>
          <button
            type="button"
            onClick={() =>
              setActiveTab({
                name: "administrators",
                icon: <RiShieldUserLine />,
              })
            }
            className="hs-tab-active:bg-blue-50 hs-tab-active:text-blue-500 hs-tab-active:hover:text-blue-400  py-1.5 h-fit px-4 inline-flex items-center gap-x-2 bg-transparent text-sm font-medium text-center text-gray-500 hover:text-blue-600 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-neutral-300"
            id="pills-with-brand-color-item-2"
            data-hs-tab="#pills-with-brand-color-2"
            aria-controls="pills-with-brand-color-2"
            role="tab"
          >
            <RiShieldUserLine className="text-xl" /> Administrators
          </button>
          <button
            type="button"
            onClick={() =>
              setActiveTab({
                name: "employees",
                icon: <FiUsers />,
              })
            }
            className="hs-tab-active:bg-blue-50 hs-tab-active:text-blue-500 hs-tab-active:hover:text-blue-400  py-1.5 h-fit px-4 inline-flex items-center gap-x-2 bg-transparent text-sm font-medium text-center text-gray-500 hover:text-blue-600 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-neutral-300"
            id="pills-with-brand-color-item-3"
            data-hs-tab="#pills-with-brand-color-3"
            aria-controls="pills-with-brand-color-3"
            role="tab"
          >
            <FiUsers className="text-xl" /> Employees
          </button>
          <button
            type="button"
            onClick={() =>
              setActiveTab({
                name: "customers",
                icon: <FiShoppingCart />,
              })
            }
            className="hs-tab-active:bg-blue-50 hs-tab-active:text-blue-500 hs-tab-active:hover:text-blue-400  py-1.5 h-fit px-4 inline-flex items-center gap-x-2 bg-transparent text-sm font-medium text-center text-gray-500 hover:text-blue-600 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-neutral-300"
            id="pills-with-brand-color-item-4"
            data-hs-tab="#pills-with-brand-color-4"
            aria-controls="pills-with-brand-color-4"
            role="tab"
          >
            <FiShoppingCart className="text-xl" /> Customers
          </button>
          <button
            type="button"
            onClick={() =>
              setActiveTab({
                name: "quickstoredashboard_assistants",
                icon: <BiSupport />,
              })
            }
            className="hs-tab-active:bg-blue-50 hs-tab-active:text-blue-500 hs-tab-active:hover:text-blue-400  py-1.5 h-fit px-4 inline-flex items-center gap-x-2 bg-transparent text-sm font-medium text-center text-gray-500 hover:text-blue-600 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-neutral-300"
            id="pills-with-brand-color-item-5"
            data-hs-tab="#pills-with-brand-color-5"
            aria-controls="pills-with-brand-color-5"
            role="tab"
          >
            <BiSupport className="text-xl" /> Quick Dashboard Assistants
          </button>
          <button
            type="button"
            onClick={() =>
              setActiveTab({
                name: "participations",
                icon: <GoArrowSwitch />,
              })
            }
            className="hs-tab-active:bg-blue-50 hs-tab-active:text-blue-500 hs-tab-active:hover:text-blue-400  py-1.5 h-fit px-4 inline-flex items-center gap-x-2 bg-transparent text-sm font-medium text-center text-gray-500 hover:text-blue-600 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-neutral-300"
            id="pills-with-brand-color-item-6"
            data-hs-tab="#pills-with-brand-color-6"
            aria-controls="pills-with-brand-color-6"
            role="tab"
          >
            <GoArrowSwitch className="text-lg" />
            Participations
          </button>
          <button
            type="button"
            onClick={() =>
              setActiveTab({
                name: "legal_entities",
                icon: <GoLaw />,
              })
            }
            className="hs-tab-active:bg-blue-50 hs-tab-active:text-blue-500 hs-tab-active:hover:text-blue-400  py-1.5 h-fit px-4 inline-flex items-center gap-x-2 bg-transparent text-sm font-medium text-center text-gray-500 hover:text-blue-600 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-neutral-300"
            id="pills-with-brand-color-item-7"
            data-hs-tab="#pills-with-brand-color-7"
            aria-controls="pills-with-brand-color-7"
            role="tab"
          >
            <GoLaw className="text-lg" />
            Legal Entities
          </button>
        </nav>

        <div className="mt-3  ">
          <div
            id="pills-with-brand-color-1"
            role="tabpanel"
            aria-labelledby="pills-with-brand-color-item-1"
          >
            <div className="grid grid-cols-3  gap-4 py-4">
              {statsData?.map(
                (stats: ManagementStatsCardComponentObjectType) => (
                  <ManagementStatsComponent data={stats} />
                )
              )}
            </div>
            <div>
              <div className="border flex justify-between  rounded-lg p-4">
                <div className="w-72 truncate flex flex-col rounded-lg shadow-sm">
                  <div className="py-2 px-4 inline-flex items-center bg-blue-500 text-white gap-x-2 rounded-t-md text-sm font-medium focus:z-10  disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                    <p className="text-xs uppercase">
                      Total {selectedChartData}
                    </p>
                  </div>
                  {Object.entries(mapStats).map(([country, total], index) => (
                    <button
                      key={index}
                      type="button"
                      className="-mt-px last:rounded-b-lg py-1 px-4 inline-flex items-center gap-x-2 text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                    >
                      <div className="flex justify-between w-full items-center gap-x-2">
                        <p className="text-xs uppercase text-gray-500 dark:text-neutral-500">
                          {country}
                        </p>
                        <div className="mt-1 flex items-center gap-x-2">
                          <span className="inline-flex items-center gap-x-1 py-0.5 px-2 rounded-full bg-green-100 text-green-900 dark:bg-green-800 dark:text-green-100">
                            <span className="inline-block text-xs font-medium">
                              {total}
                            </span>
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="w-full">
                  <select
                    onChange={(e) => setSelectedChartData(e.target.value)}
                    className="py-1 capitalize ml-auto px-4  block w-48  border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  >
                    {chartKeys?.map((chartKey) => (
                      <option value={chartKey}>
                        {chartKey?.replaceAll("_", " ")}
                      </option>
                    ))}
                  </select>
                  <WorldMap
                    selectedChartData={selectedChartData}
                    stats={mapStats}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            id="pills-with-brand-color-2"
            className="hidden"
            role="tabpanel"
            aria-labelledby="pills-with-brand-color-item-2"
          >
            <div className=" py-4">
              {filteredStatsData?.map(
                (stats: ManagementStatsCardComponentObjectType) => (
                  <ManagementDashboardStatsComponent data={stats} />
                )
              )}
            </div>
            <ManagementTable
              data={response?.administrators || []}
              active_tab={activeTab}
              tableHeadings={["access_key", "custom_label", "created_at"]}
            />
          </div>
          <div
            id="pills-with-brand-color-3"
            className="hidden"
            role="tabpanel"
            aria-labelledby="pills-with-brand-color-item-3"
          >
            <div className=" py-4">
              {filteredStatsData?.map(
                (stats: ManagementStatsCardComponentObjectType) => (
                  <ManagementDashboardStatsComponent data={stats} />
                )
              )}
            </div>
            <div>
              <ManagementTable
                data={response?.employees || []}
                active_tab={activeTab}
                tableHeadings={["access_key", "custom_label", "created_at"]}
              />
            </div>
          </div>{" "}
          <div
            id="pills-with-brand-color-4"
            className="hidden"
            role="tabpanel"
            aria-labelledby="pills-with-brand-color-item-4"
          >
            <div className=" py-4">
              {filteredStatsData?.map(
                (stats: ManagementStatsCardComponentObjectType) => (
                  <ManagementDashboardStatsComponent data={stats} />
                )
              )}
            </div>
            <div>
              <ManagementTable
                data={response?.customers || []}
                active_tab={activeTab}
                tableHeadings={["access_key", "custom_label", "created_at"]}
              />
            </div>
          </div>
          <div
            id="pills-with-brand-color-5"
            className="hidden"
            role="tabpanel"
            aria-labelledby="pills-with-brand-color-item-5"
          >
            <div className=" py-4">
              {filteredStatsData?.map(
                (stats: ManagementStatsCardComponentObjectType) => (
                  <ManagementDashboardStatsComponent data={stats} />
                )
              )}
            </div>
            <div>
              <ManagementTable
                data={response?.quickstoredashboard_assistants || []}
                active_tab={activeTab}
                tableHeadings={["access_key", "custom_label", "created_at"]}
              />
            </div>
          </div>
          <div
            id="pills-with-brand-color-6"
            className="hidden"
            role="tabpanel"
            aria-labelledby="pills-with-brand-color-item-6"
          >
            <div className=" py-4">
              {filteredStatsData?.map(
                (stats: ManagementStatsCardComponentObjectType) => (
                  <ManagementDashboardStatsComponent data={stats} />
                )
              )}
            </div>
            <div>
              <ManagementTable
                data={response?.participations || []}
                active_tab={activeTab}
                tableHeadings={["access_key", "custom_label", "created_at"]}
              />
            </div>
          </div>
          <div
            id="pills-with-brand-color-7"
            className="hidden"
            role="tabpanel"
            aria-labelledby="pills-with-brand-color-item-7"
          >
            <div className=" py-4">
              {filteredStatsData?.map(
                (stats: ManagementStatsCardComponentObjectType) => (
                  <ManagementDashboardStatsComponent data={stats} />
                )
              )}
            </div>
            <div>
              <ManagementTable
                data={response?.legal_entities || []}
                active_tab={activeTab}
                tableHeadings={["access_key", "custom_label", "created_at"]}
              />
            </div>
          </div>
        </div>
      </div>
      {isSidenavOpen && (
        <div
          id="hs-overlay-body-scrolling"
          className="hs-overlay hs-overlay-open:-translate-x-0 border-t    hidden translate-x-full fixed right-0 top-[43px]  transition-all duration-300 transform h-full max-w-[24rem] w-full z-[80] bg-white border-s dark:bg-neutral-800 dark:border-neutral-700 [--body-scroll:true] [--overlay-backdrop:false]"
        >
          <div className="flex justify-between items-center  py-2 px-4 border-b dark:border-neutral-700">
            <h3 className="font-bold capitalize flex gap-3  items-center text-gray-800 dark:text-white">
              {addItem?.includes("edit") ? (
                <FiEdit className="text-lg text-blue-500" />
              ) : (
                <FaWpforms className="text-lg text-blue-500" />
              )}{" "}
              {addItem?.replaceAll("_", " ")}
            </h3>
            <button
              type="button"
              onClick={() => closeSidenav()}
              className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
              data-hs-overlay="#hs-overlay-body-scrolling"
            >
              <span className="sr-only">Close modal</span>
              <svg
                className="flex-shrink-0 size-4"
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
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
          <div className="p-4 pb-32   scrollbar-thumb-gray-300 scrollbar-thin scrollbar-thumb-rounded-full active:scrollbar-thumb-sky-400 scrollbar-thumb-rounded-full hover:scrollbar-thumb-blue-500 scrollbar-track-gray-100 h-full overflow-auto">
            {addItem?.includes("create_management") ? (
              <div>
                <CreateManagementForm pok={activeTab?.name} />
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
