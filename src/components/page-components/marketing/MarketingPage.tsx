"use client";
import React, { useState } from "react";
import { GrHomeOption } from "react-icons/gr";
import { IoShareSocialOutline } from "react-icons/io5";

import { FiEdit } from "react-icons/fi";
import { GoShareAndroid } from "react-icons/go";
import { MdAdsClick } from "react-icons/md";
import { TfiTarget } from "react-icons/tfi";
import { RiAdvertisementLine, RiCoupon2Line } from "react-icons/ri";
import { FaRegNewspaper, FaWpforms } from "react-icons/fa6";
import { HiOutlineMegaphone } from "react-icons/hi2";

import MarketingTable from "@/components/ui-components/marketing/tables";
import { useGlobalStates, useSideNavInputs } from "@/context";
import CreateSocialAccountForm from "@/components/ui-components/marketing/forms/CreateSocialAccountForm";

import CreateAdForm from "@/components/ui-components/marketing/forms/CreateAdForm";
import CreatePromotionForm from "@/components/ui-components/marketing/forms/CreatePromotionForm";
import CreateCouponForm from "@/components/ui-components/marketing/forms/CreateCouponForm";

import CreateNewsletterForm from "@/components/ui-components/marketing/forms/CreateNewsletterForm";
import { WorldMap } from "../dashboard/charts/WordMap";
import ColumnChart from "../dashboard/charts/ColumnChart";

import { prepareChartData } from "@/utils/prepareChartData";
import { months } from "@/data/other";
import ColumnChartWithMarkers from "../dashboard/charts/ColumnChartWithMarkers";
import EditSocialAccountForm from "@/components/ui-components/marketing/forms/EditSocialAccountForm";
import EditAdForm from "@/components/ui-components/marketing/forms/EditAdForm";
import EditPromotionForm from "@/components/ui-components/marketing/forms/EditPromotionForm";
import EditCouponForm from "@/components/ui-components/marketing/forms/EditCouponForm";
import { calculateTotalGlobalCountries } from "@/utils/calculateTotalGlobalCountries";
import CreateTargetData from "@/components/ui-components/marketing/forms/CreateTargetData";
import { TargetDatainitialState } from "@/data/marketing";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";

export default function MarketingPage({
  target_data,
  response,
}: {
  target_data: any;
  response: any;
}) {
  console.log({ response });
  const d = new Date();
  let currentMonth = months[d.getMonth()];
  const { setSelectedAnalyicsMonth } = useGlobalStates();
  const { addItem, setAddItem, openSidenav, closeSidenav, isSidenavOpen } =
    useSideNavInputs();
  const chartKeys = ["social_accounts", "ads", "coupons"];
  const [selectedChartData, setSelectedChartData] = useState("social_accounts");

  const [activeTab, setActiveTab] = useState<{ name: string; icon: any }>({
    name: "dashboard",
    icon: "",
  });
  const chartData = prepareChartData(response, chartKeys);
  const monthlyGoals = target_data || TargetDatainitialState;
  const mapStats = calculateTotalGlobalCountries(
    response?.[selectedChartData || "social_accounts"] || []
  );
  const getCurrentMonth = () => new Date().getMonth();

  // const calculateCurrentMonthSummary = (chartData: any) => {
  //   const currentMonth = getCurrentMonth();

  //   // Initialize an object to hold the summary
  //   const summary: any = { current_month: currentMonth };

  //   // Iterate through each stats object in chartData
  //   chartData?.forEach((stats: any) => {
  //     // Check if stats is an object with a data array
  //     if (stats && Array.isArray(stats.data)) {
  //       // Calculate the total for the current month
  //       const currentMonthTotal = stats.data[currentMonth] || 0;

  //       // Add the total to the summary object with the category name as the key
  //       summary[stats.name] = currentMonthTotal;
  //     }
  //   });

  //   return summary;
  // };
  const calculateCurrentMonthSummary = (chartData: any) => {
    const currentMonth = getCurrentMonth();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1; // Handle January edge case

    // Initialize an object to hold the summary
    const summary: any = {
      current_month: currentMonth,
      previous_month: previousMonth,
      changes: {},
    };
    let totals_current_month = 0;
    let totals_previous_month = 0;
    let totals_percent_chage = 0;
    // Iterate through each stats object in chartData
    chartData?.forEach((stats: any) => {
      // Check if stats is an object with a data array
      if (stats && Array.isArray(stats.data)) {
        // Calculate totals for current month
        const currentMonthTotal = stats.data[currentMonth] || 0;

        // Calculate totals for previous month, defaulting to 0 if not available
        const previousMonthTotal = stats.data[previousMonth] || 0;
        totals_current_month += currentMonthTotal || 0;
        totals_previous_month += previousMonthTotal || 0;

        // Calculate percentage change, handle division by zero scenario
        let percentChange = 0;
        if (previousMonthTotal !== 0) {
          percentChange =
            ((currentMonthTotal - previousMonthTotal) /
              Math.abs(previousMonthTotal)) *
            100;
          totals_current_month += previousMonthTotal;
        } else if (currentMonthTotal !== 0) {
          percentChange = 100; // Assume infinite change if current month has data and previous doesn't
        }

        // Add totals and percentage change to summary object
        summary.changes[stats.name] = {
          current_month: currentMonthTotal || 0,
          previous_month: previousMonthTotal || 0,
          percent_change: percentChange,
        };

        // Debug logs
        console.log(
          `Stats: ${stats.name}, Current: ${currentMonthTotal}, Previous: ${previousMonthTotal}, Percent Change: ${percentChange}`
        );
      }
    });
    if (totals_previous_month !== 0) {
      totals_percent_chage =
        ((totals_current_month - totals_previous_month) /
          Math.abs(totals_previous_month)) *
        100;
    } else if (totals_current_month !== 0) {
      totals_percent_chage = 100; // Assume infinite change if current month has data and previous doesn't
    }
    return {
      summary,
      totals_current_month,
      totals_previous_month,
      totals_percent_chage,
    };
  };

  const currentMonthTotalsPrev = calculateCurrentMonthSummary(chartData);
  const currentMonthTotals = currentMonthTotalsPrev?.summary;
  const totals_current_month = currentMonthTotalsPrev?.totals_current_month;
  const totals_percent_chage = currentMonthTotalsPrev?.totals_percent_chage;
  return (
    <div className="w-full h-full  pb-6 overflow-hidden space-y-3 pt-3 px-4 sm:px-6 ">
      <div className="space-y-4 items-center ">
        <div className="w-full overflow-auto space-y-4 lg:space-y-0 lg:flex justify-between">
          <nav
            className="flex w-full overflow-auto space-x-1"
            aria-label="Tabs"
            role="tablist"
          >
            <button
              type="button"
              onClick={() =>
                setActiveTab({ name: "dashboard", icon: <GrHomeOption /> })
              }
              className="hs-tab-active:bg-blue-50 hs-tab-active:text-blue-500 hs-tab-active:hover:text-blue-400  py-1.5 h-fit hs-tab-active:dark:text-white  px-4 inline-flex items-center gap-x-2 bg-transparent text-sm font-medium text-center text-gray-500 hover:text-blue-600 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-neutral-300 active"
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
                  name: "social_accounts",
                  icon: <GoShareAndroid />,
                })
              }
              className="hs-tab-active:bg-blue-50 whitespace-nowrap hs-tab-active:text-blue-500 hs-tab-active:hover:text-blue-400  py-1.5 h-fit px-4 inline-flex items-center gap-x-2 bg-transparent text-sm font-medium text-center text-gray-500 hover:text-blue-600 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-neutral-300"
              id="pills-with-brand-color-item-2"
              data-hs-tab="#pills-with-brand-color-2"
              aria-controls="pills-with-brand-color-2"
              role="tab"
            >
              <GoShareAndroid className="text-xl" /> Social Accounts
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveTab({
                  name: "ads",
                  icon: <RiAdvertisementLine />,
                })
              }
              className="hs-tab-active:bg-blue-50 hs-tab-active:text-blue-500 hs-tab-active:hover:text-blue-400  py-1.5 h-fit px-4 inline-flex items-center gap-x-2 bg-transparent text-sm font-medium text-center text-gray-500 hover:text-blue-600 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-neutral-300"
              id="pills-with-brand-color-item-4"
              data-hs-tab="#pills-with-brand-color-4"
              aria-controls="pills-with-brand-color-4"
              role="tab"
            >
              <RiAdvertisementLine className="text-xl" /> Ads
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveTab({
                  name: "promotions",
                  icon: <HiOutlineMegaphone />,
                })
              }
              className="hs-tab-active:bg-blue-50 hs-tab-active:text-blue-500 hs-tab-active:hover:text-blue-400  py-1.5 h-fit px-4 inline-flex items-center gap-x-2 bg-transparent text-sm font-medium text-center text-gray-500 hover:text-blue-600 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-neutral-300"
              id="pills-with-brand-color-item-5"
              data-hs-tab="#pills-with-brand-color-5"
              aria-controls="pills-with-brand-color-5"
              role="tab"
            >
              <HiOutlineMegaphone className="text-xl" /> Promotions
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveTab({
                  name: "coupons",
                  icon: <RiCoupon2Line />,
                })
              }
              className="hs-tab-active:bg-blue-50 hs-tab-active:text-blue-500 hs-tab-active:hover:text-blue-400  py-1.5 h-fit px-4 inline-flex items-center gap-x-2 bg-transparent text-sm font-medium text-center text-gray-500 hover:text-blue-600 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-neutral-300"
              id="pills-with-brand-color-item-6"
              data-hs-tab="#pills-with-brand-color-6"
              aria-controls="pills-with-brand-color-6"
              role="tab"
            >
              <RiCoupon2Line className="text-xl" /> Coupons
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveTab({
                  name: "newsletters",
                  icon: <FaRegNewspaper />,
                })
              }
              className="hs-tab-active:bg-blue-50 hs-tab-active:text-blue-500 hs-tab-active:hover:text-blue-400  py-1.5 h-fit px-4 inline-flex items-center gap-x-2 bg-transparent text-sm font-medium text-center text-gray-500 hover:text-blue-600 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-neutral-300"
              id="pills-with-brand-color-item-7"
              data-hs-tab="#pills-with-brand-color-7"
              aria-controls="pills-with-brand-color-7"
              role="tab"
            >
              <FaRegNewspaper className="text-lg" />
              Newsletters
            </button>
          </nav>
          <button
            type="button"
            onClick={() => {
              openSidenav();
              setAddItem("create_target_data");
            }}
            data-hs-overlay="#hs-overlay-body-scrolling"
            className="py-1 w-fit    whitespace-nowrap ml-auto focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 inline-flex justify-center items-center gap-2 -ms-px   first:ms-0  rounded-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
          >
            <span className="text-lg text-blue-600">
              <TfiTarget />
            </span>
            <span className=" ">Update Target Data</span>
          </button>
        </div>
        <div className="mt-3 space-y-4 ">
          <div
            id="pills-with-brand-color-1"
            role="tabpanel"
            aria-labelledby="pills-with-brand-color-item-1"
          >
            <div className="space-y-4 ">
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4  ">
                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                  <div className="p-4 md:p-5">
                    <div className="flex items-center justify-between gap-x-2">
                      <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                        Social Accounts
                      </p>
                      <IoShareSocialOutline className="p-1 text-white text-2xl rounded bg-[#3B82F6]" />
                    </div>

                    <div className="mt-1 flex items-center gap-x-2">
                      <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                        {response?.social_accounts?.length || 0}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                  <div className="p-4 md:p-5">
                    <div className="flex items-center justify-between gap-x-2">
                      <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                        ads
                      </p>
                      <MdAdsClick className="p-1 text-white text-2xl rounded bg-pink-500" />
                    </div>

                    <div className="mt-1 flex items-center gap-x-2">
                      <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                        {response?.ads?.length || 0}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                  <div className="p-4 md:p-5">
                    <div className="flex items-center justify-between gap-x-2">
                      <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                        promotions
                      </p>
                      <HiOutlineMegaphone className="p-1 text-white text-2xl rounded bg-green-500" />
                    </div>

                    <div className="mt-1 flex items-center gap-x-2">
                      <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                        {response?.promotions?.length || 0}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                  <div className="p-4 md:p-5">
                    <div className="flex items-center justify-between gap-x-2">
                      <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                        coupons
                      </p>
                      <RiCoupon2Line className="p-1 text-white text-2xl rounded bg-purple-500" />
                    </div>

                    <div className="mt-1 flex items-center gap-x-2">
                      <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                        {response?.coupons?.length || 0}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                  <div className="p-4 md:p-5">
                    <div className="flex items-center justify-between  gap-x-2">
                      <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                        newsletters
                      </p>
                      <FaRegNewspaper className="p-1 text-white text-2xl rounded bg-yellow-500" />
                    </div>

                    <div className="mt-1 flex items-center gap-x-2">
                      <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                        {response?.newsletters?.length || 0}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:grid lg:grid-cols-3 gap-4 space-y-4 lg:space-y-0  ">
                <div className="p-4   md:p-5   min-h-[410px] col-span-2 flex flex-col bgs-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                  <div className="flex justify-between items-center">
                    <div className="w-full ">
                      <div className="flex w-full justify-between">
                        <h2 className="text-sm text-gray-500 dark:text-neutral-500">
                          Current Month Clicks
                        </h2>
                        <div className="gap-4 flex items-center">
                          <p className="font-bold">{totals_current_month}</p>
                          <span className="py-[5px] px-1.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-md bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500">
                            {totals_percent_chage > 0 ? (
                              <IoIosArrowRoundUp className="text-lg text-green-500" />
                            ) : (
                              <IoIosArrowRoundDown className="text-lg text-red-500" />
                            )}
                            {totals_percent_chage}%
                          </span>
                        </div>
                      </div>

                      <ul className="grid-cols-2    my-3 w-full lg:w-fit grid lg:grid-cols-5 gap-4  ">
                        <li className="items-center p-2 space-y-2 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px rounded-lg first:mt-0  sm:-ms-px sm:mt-0     dark:bg-neutral-900 dark:border-neutral-700 dark:text-white">
                          <div className="inline-flex  gap-x-2.5">
                            <div className="flex justify-between   w-full">
                              Social Accounts
                            </div>
                          </div>
                          <div className="justify-between gap-3 flex items-center">
                            <span className="inline-flex justify-end  items-center text-end ml-auto py-1 px-2 rounded-md w-full text-xs font-medium text-blue-500 bg-blue-100">
                              <span>
                                {currentMonthTotals?.changes.social_accounts
                                  .current_month || 0}
                              </span>
                            </span>
                            <span className="flex">
                              {currentMonthTotals?.changes.social_accounts
                                .percent_change > 0 ? (
                                <IoIosArrowRoundUp className="text-lg text-green-500" />
                              ) : (
                                <IoIosArrowRoundDown className="text-lg text-red-500" />
                              )}
                              {currentMonthTotals?.changes.social_accounts
                                .percent_change || 0}
                              %
                            </span>
                          </div>
                        </li>
                        <li className="items-center p-2 space-y-2 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px rounded-lg first:mt-0  sm:-ms-px sm:mt-0     dark:bg-neutral-900 dark:border-neutral-700 dark:text-white">
                          <div className="inline-flex  gap-x-2.5">
                            <div className="flex justify-between   w-full">
                              Ads
                            </div>
                          </div>
                          <div className="justify-between gap-3 flex items-center">
                            <span className="inline-flex justify-end  items-center text-end ml-auto py-1 px-2 rounded-md w-full text-xs font-medium text-pink-600 bg-pink-100">
                              <span>
                                {currentMonthTotals?.changes.ads
                                  .current_month || 0}
                              </span>
                            </span>
                            <span className="flex">
                              {currentMonthTotals?.changes.ads.percent_change >
                              0 ? (
                                <IoIosArrowRoundUp className="text-lg text-green-500" />
                              ) : (
                                <IoIosArrowRoundDown className="text-lg text-red-500" />
                              )}
                              {currentMonthTotals?.changes.ads.percent_change ||
                                0}
                              %
                            </span>
                          </div>
                        </li>
                        <li className="items-center p-2 space-y-2 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px rounded-lg first:mt-0  sm:-ms-px sm:mt-0     dark:bg-neutral-900 dark:border-neutral-700 dark:text-white">
                          <div className="inline-flex  gap-x-2.5">
                            <div className="flex justify-between   w-full">
                              Promotions
                            </div>
                          </div>
                          <div className="justify-between gap-3 flex items-center">
                            <span className="inline-flex justify-end  items-center text-end ml-auto py-1 px-2 rounded-md w-full text-xs font-medium text-green-500 bg-green-100">
                              <span>
                                {(currentMonthTotals?.changes?.promotions &&
                                  currentMonthTotals.changes?.promotions
                                    .current_month) ||
                                  0}
                              </span>
                            </span>
                            <span className="flex">
                              {currentMonthTotals?.changes?.promotions &&
                              currentMonthTotals.changes?.promotions
                                .percent_change > 0 ? (
                                <IoIosArrowRoundUp className="text-lg text-green-500" />
                              ) : (
                                <IoIosArrowRoundDown className="text-lg text-red-500" />
                              )}
                              {(currentMonthTotals?.changes?.promotions &&
                                currentMonthTotals.changes?.promotions
                                  .percent_change) ||
                                0}
                              %
                            </span>
                          </div>
                        </li>
                        <li className="items-center p-2 space-y-2 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px rounded-lg first:mt-0  sm:-ms-px sm:mt-0     dark:bg-neutral-900 dark:border-neutral-700 dark:text-white">
                          <div className="inline-flex  gap-x-2.5">
                            <div className="flex justify-between   w-full">
                              Coupons
                            </div>
                          </div>
                          <div className="justify-between gap-3 flex items-center">
                            <span className="inline-flex justify-end  items-center text-end ml-auto py-1 px-2 rounded-md w-full text-xs font-medium text-purple-500 bg-purple-100">
                              <span>
                                {(currentMonthTotals?.changes?.coupons &&
                                  currentMonthTotals.changes?.coupons
                                    .current_month) ||
                                  0}
                              </span>
                            </span>
                            <span className="flex">
                              {currentMonthTotals?.changes?.coupons &&
                              currentMonthTotals.changes?.coupons
                                ?.percent_change > 0 ? (
                                <IoIosArrowRoundUp className="text-lg text-green-500" />
                              ) : (
                                <IoIosArrowRoundDown className="text-lg text-red-500" />
                              )}
                              {(currentMonthTotals?.changes?.coupons &&
                                currentMonthTotals.changes?.coupons
                                  .percent_change) ||
                                0}
                              %
                            </span>
                          </div>
                        </li>
                        <li className="items-center p-2 space-y-2 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px rounded-lg first:mt-0  sm:-ms-px sm:mt-0     dark:bg-neutral-900 dark:border-neutral-700 dark:text-white">
                          <div className="inline-flex  gap-x-2.5">
                            <div className="flex justify-between   w-full">
                              Newsletters
                            </div>
                          </div>
                          <div className="justify-between gap-3 flex items-center">
                            <span className="inline-flex justify-end  items-center text-end ml-auto py-1 px-2 rounded-md w-full text-xs font-medium text-yellow-500 bg-yellow-100">
                              <span>
                                {(currentMonthTotals?.changes?.newsletters &&
                                  currentMonthTotals.changes?.newsletters
                                    .current_month) ||
                                  0}
                              </span>
                            </span>
                            <span className="flex">
                              {currentMonthTotals?.changes?.newsletters &&
                              currentMonthTotals.changes?.newsletters
                                ?.percent_change > 0 ? (
                                <IoIosArrowRoundUp className="text-lg text-green-500" />
                              ) : (
                                <IoIosArrowRoundDown className="text-lg text-red-500" />
                              )}
                              {(currentMonthTotals?.changes?.newsletters &&
                                currentMonthTotals.changes?.newsletters
                                  .percent_change) ||
                                0}
                              %
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div id="hs-multiple-bar-charts">
                    <ColumnChart
                      chart_keys={chartKeys}
                      chart_data={chartData}
                    />
                  </div>
                </div>

                <div className="p-4 col-span-3 lg:col-span-1  md:p-5 min-h-[410px] flex flex-col   border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-sm text-gray-500 dark:text-neutral-500">
                        Expected
                      </h2>
                      <p className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                        Clicks
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        onChange={(e) =>
                          setSelectedAnalyicsMonth(e.target.value)
                        }
                        className="py-1  px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      >
                        <option value={currentMonth}>{currentMonth}</option>

                        {months?.map((month) => (
                          <option value={month}>{month}</option>
                        ))}
                      </select>
                      <span className="py-1.5 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-md bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500">
                        <svg
                          className="inline-block size-3.5"
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
                          <path d="M12 5v14" />
                          <path d="m19 12-7 7-7-7" />
                        </svg>
                        2%
                      </span>
                    </div>
                  </div>

                  <div
                    id="hs-single-area-chart "
                    className=" flex items-baseline w-full flex-col justify-end h-full"
                  >
                    <ColumnChartWithMarkers
                      chartKeys={chartKeys}
                      chartData={response}
                      monthlyGoals={monthlyGoals}
                    />
                  </div>
                </div>
              </div>
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
                      className="-mt-px  py-1 px-4 inline-flex items-center gap-x-2 text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
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
            <div>
              <MarketingTable
                data={response?.social_accounts || []}
                active_tab={activeTab}
                tableHeadings={[
                  "username",
                  "profile_photo_url",
                  "email",
                  "firstname",
                  "lastname",
                  "phone_number",
                  "social_media_platform",
                  "login_url",
                  "created_at",
                ]}
              />
            </div>
          </div>
          <div
            id="pills-with-brand-color-4"
            className="hidden"
            role="tabpanel"
            aria-labelledby="pills-with-brand-color-item-4"
          >
            <div>
              <MarketingTable
                data={response?.ads || []}
                active_tab={activeTab}
                tableHeadings={[
                  "title",
                  "image_url",
                  "url",
                  "cta_text",
                  "ad_type",
                  "target_audience",
                  "start_date",
                  "end_date",
                ]}
              />
            </div>
          </div>{" "}
          <div
            id="pills-with-brand-color-5"
            className="hidden"
            role="tabpanel"
            aria-labelledby="pills-with-brand-color-item-5"
          >
            <div>
              <MarketingTable
                data={response?.promotions || []}
                active_tab={activeTab}
                tableHeadings={[
                  "promotion_name",
                  "discount_type",
                  "discount_value",
                  "applicable_products",
                  "start_date",
                  "end_date",
                ]}
              />
            </div>
          </div>{" "}
          <div
            id="pills-with-brand-color-6"
            className="hidden"
            role="tabpanel"
            aria-labelledby="pills-with-brand-color-item-6"
          >
            <div>
              <MarketingTable
                data={response?.coupons || []}
                active_tab={activeTab}
                tableHeadings={[
                  "coupon_code",
                  "image_url",
                  "discount_type",
                  "discount_value",
                  "applicable_products",
                  "expiration_date",
                ]}
              />
            </div>
          </div>{" "}
          <div
            id="pills-with-brand-color-7"
            className="hidden"
            role="tabpanel"
            aria-labelledby="pills-with-brand-color-item-7"
          >
            <div>
              <MarketingTable
                data={response?.newsletters || []}
                active_tab={activeTab}
                tableHeadings={[
                  "image_url",
                  "title",
                  "description",
                  "email_body",
                  "recipients",
                ]}
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
            {addItem?.includes("social_accounts") ? (
              <div>
                {addItem?.includes("create") ? (
                  <CreateSocialAccountForm />
                ) : (
                  <EditSocialAccountForm />
                )}
              </div>
            ) : addItem?.includes("ads") ? (
              <div>
                {addItem?.includes("create") ? (
                  <CreateAdForm />
                ) : (
                  <EditAdForm />
                )}
              </div>
            ) : addItem?.includes("promotions") ? (
              <div>
                {addItem?.includes("create") ? (
                  <CreatePromotionForm />
                ) : (
                  <EditPromotionForm />
                )}
              </div>
            ) : addItem?.includes("coupons") ? (
              <div>
                {addItem?.includes("create") ? (
                  <CreateCouponForm />
                ) : (
                  <EditCouponForm />
                )}
              </div>
            ) : addItem?.includes("newsletters") ? (
              <div>
                {addItem?.includes("create") ? (
                  <CreateNewsletterForm />
                ) : (
                  <EditCouponForm />
                )}
              </div>
            ) : addItem?.includes("target_data") ? (
              <CreateTargetData target_data={target_data} />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
