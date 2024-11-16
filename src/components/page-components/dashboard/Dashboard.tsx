"use client";
import React, { useState } from "react";
import { WorldMap } from "./charts/WordMap";
import { GrHomeOption } from "react-icons/gr";

import { IoPricetagsOutline } from "react-icons/io5";
import { FiBox, FiEdit } from "react-icons/fi";
import { TbInvoice } from "react-icons/tb";

import { HiOutlineCash } from "react-icons/hi";
import ProductsStatsComponent from "@/components/ui-components/data/products/stats-components/ProductsStatsComponent";
import OrdersStatsComponent from "@/components/ui-components/data/orders/stats-components/OrdersStatsComponent";

import SalesStatsComponent from "@/components/ui-components/data/sales/stats-components/SalesStatsComponent";
import OrdersTable from "@/components/ui-components/data/orders/tables/OrdersTable";
import InvoicesTable from "@/components/ui-components/data/invoices/tables/InvoicesTable";

import SalesTable from "@/components/ui-components/data/sales/tables/SalesTable";
import ProductsTable from "@/components/ui-components/data/products/tables/ProductsTable";
import useNavigation from "@/utils/handleNavigate";

import { useAuthContext } from "@/context/auth-context/AuthContext";
import InvoicesStatsComponent from "@/components/ui-components/data/invoices/stats-components/InvoicesStatsComponent";

import { calculateTotalGlobalCountries } from "@/utils/calculateTotalGlobalCountries";
import ColumnChartWithMarkers from "./charts/ColumnChartWithMarkers";
import { prepareChartData } from "@/utils/prepareChartData";

import { useGlobalStates, useSideNavInputs } from "@/context";
import { months } from "@/data/other";
import ColumnChart from "./charts/ColumnChart";

import { TfiTarget } from "react-icons/tfi";
import { FaWpforms } from "react-icons/fa6";
import CreateTargetData from "@/components/ui-components/dashboard/forms/CreateTargetData";

import { TargetDataInitialState } from "@/data/dashboard";
import CreateProduct from "@/components/ui-components/data/products/forms/CreateProduct";
import EditProduct from "@/components/ui-components/data/products/forms/EditProduct";

import CreateOrderForm from "@/components/ui-components/data/orders/forms/CreateOrderForm";
import CreateSaleForm from "@/components/ui-components/data/sales/forms/CreateSaleForm";
import CreateInvoiceForm from "@/components/ui-components/data/invoices/forms/CreateInvoiceForm";

import { calculateStockCount } from "@/utils/data/products/calculateStockCount";
import { calculateValue } from "@/utils/data/products/calculateValue";
import { calculateUnitsSold } from "@/utils/data/products/calculateUnitsSold";

import { calculateTotalCustomers } from "@/utils/data/global/calculateTotalCustomers";
import { calculateTotalOrderedProducts } from "@/utils/data/orders/calculateTotalOrderedProducts";
import { calculateTotalOrdersValue } from "@/utils/data/orders/calculateTotalOrdersValue";

import { calculateTotalInvoicedProducts } from "@/utils/data/invoices/calculateTotalInvoicedProducts";
import { calculateTotalInvoicesValue } from "@/utils/data/invoices/calculateTotalInvoicesValue";
import { calculateTotalMaleCustomers } from "@/utils/data/customers/calculateTotalMaleCustomers";

import { calculateTotalFemaleCustomers } from "@/utils/data/customers/calculateTotalFemaleCustomers";
import { calculateTotalCountries } from "@/utils/data/customers/calculateTotalCountries";
import { calculateTotalPurchases } from "@/utils/data/customers/calculateTotalPurchases";

import { calculateTotalOrders } from "@/utils/data/sales/calculateTotalInvoices";
import { calculateTotalSales } from "@/utils/data/sales/calculateTotalSales";
import { calculateTotalSoldProducts } from "@/utils/data/sales/calculateTotalSoldProducts";

type TabObject = {
  name: string;
  icon: any;
};
const tabs: TabObject[] = [
  {
    name: "all",
    icon: <GrHomeOption />,
  },
  {
    name: "products",
    icon: <IoPricetagsOutline />,
  },
  {
    name: "orders",
    icon: <FiBox />,
  },
  {
    name: "invoices",
    icon: <TbInvoice />,
  },
  {
    name: "sales",
    icon: <HiOutlineCash />,
  },
];

export default function Dashboard({
  response,
  target_data,
}: {
  response: any;
  target_data: any;
}) {
  const [activeTab, setActiveTab] = useState<TabObject>(tabs[0]);
  const { user } = useAuthContext();
  const { addItem, setAddItem, isSidenavOpen, closeSidenav, openSidenav } =
    useSideNavInputs();

  const { handleQuickNavigate } = useNavigation();
  const chartKeys = ["products", "orders", "invoices", "sales"];
  const [selectedChartData, setSelectedChartData] = useState(
    chartKeys[0]?.replaceAll("_", " ")
  );

  const d = new Date();
  const monthlyGoals = target_data || TargetDataInitialState;

  const mapStats = calculateTotalGlobalCountries(
    response?.[selectedChartData] || []
  );

  let currentMonth = months[d.getMonth()];
  const { setSelectedAnalyicsMonth } = useGlobalStates();
  const chartData = prepareChartData(response || [], chartKeys);
  const dashboardStats = {
    products: response?.products?.length,
    orders: response?.orders?.length,
    invoices: response?.invoices?.length,
    sales: response?.sales?.length,
  };
  const productsStats = {
    unique_products: response?.products?.length,
    stock_count: calculateStockCount(response?.products || []),
    total_value: calculateValue(response?.products || []),
    units_sold: calculateUnitsSold(response?.products || []),
  };
  const ordersStats = {
    unique_orders: response?.orders?.length,
    customers_count: calculateTotalCustomers(response?.orders || []),
    products_count: calculateTotalOrderedProducts(response?.orders || []),
    total_value: calculateTotalOrdersValue(response?.orders || []),
  };
  const invoicesStats = {
    unique_invoices: response?.invoices?.length,
    customers_count: calculateTotalCustomers(response?.invoices || []),
    products_count: calculateTotalInvoicedProducts(response?.invoices || []),
    total_value: calculateTotalInvoicesValue(response?.invoices || []),
  };
  const customersStats = {
    males: calculateTotalMaleCustomers(response?.customers || []),
    females: calculateTotalFemaleCustomers(response?.customers || []),
    countries: calculateTotalCountries(response?.customers || []),
    purchases: calculateTotalPurchases(response?.data || []),
  };
  const salesStats = {
    customers: calculateTotalCustomers(response?.data || []),
    invoices: calculateTotalOrders(response?.data || []),
    revenue: calculateTotalSales(response?.data || []),
    products: calculateTotalSoldProducts(response?.data || []),
  };
  return (
    <div className="w-full h-full  pb-6 overflow-hidden space-y-3 pt-3 px-4 sm:px-6 ">
      <div className="lg:flex lg:space-y-0 space-y-3 items-center justify-between">
        <nav className="flex  overflow-auto  space-x-1">
          {tabs?.map(({ name, icon }) => (
            <button
              type="button"
              key={name}
              onClick={() => setActiveTab({ name, icon })}
              className={` bg-[#E5E7EB]  capitalize ${
                activeTab?.name === name
                  ? "text-blue-600 bg-blue-100"
                  : "text-gray-500 bg-transparent"
              } rounded-lg hover:text-blue-600      py-1.5 px-4 inline-flex items-center gap-x-2  text-sm font-medium text-center  disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-500 dark:hover:text-neutral-400  `}
            >
              <span className="text-xl"> {icon}</span>
              <span>{name}</span>
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {activeTab?.name !== "all" && (
            <button
              type="button"
              onClick={() =>
                handleQuickNavigate(`data/${activeTab?.name}`, user)
              }
              className="py-1.5 px-4 capitalize inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            >
              View {activeTab?.name}
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
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              openSidenav();
              setAddItem("create_target_data");
            }}
            data-hs-overlay="#hs-overlay-body-scrolling"
            className="py-1.5 w-fit whitespace-nowrap ml-auto focus:outline-none focus:ring-1 focus:ring-blue-500 px-3 inline-flex justify-center items-center gap-2 -ms-px   first:ms-0  rounded-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
          >
            <span className="text-lg text-blue-600">
              <TfiTarget />
            </span>
            <span className=" ">Update Target Data</span>
          </button>
        </div>
      </div>
      <div className=" space-y-4 sm:space-y-6">
        {/* Stats starts here */}
        <>
          {activeTab?.name == "products" ? (
            <ProductsStatsComponent stats={productsStats} />
          ) : activeTab?.name === "orders" ? (
            <OrdersStatsComponent stats={ordersStats} />
          ) : activeTab?.name === "invoices" ? (
            <InvoicesStatsComponent stats={invoicesStats} />
          ) : activeTab?.name === "sales" ? (
            <SalesStatsComponent stats={salesStats} />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                <div className="p-4 md:p-5">
                  <div className="flex items-center gap-x-2">
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                      Products
                    </p>
                  </div>

                  <div className="mt-1 flex items-center gap-x-2">
                    <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                      {dashboardStats?.products}
                    </h3>
                    <span className="flex items-center gap-x-1 text-green-600">
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
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                        <polyline points="16 7 22 7 22 13" />
                      </svg>
                      <span className="inline-block text-sm">1.7%</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                <div className="p-4 md:p-5">
                  <div className="flex items-center gap-x-2">
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                      Orders
                    </p>
                  </div>

                  <div className="mt-1 flex items-center gap-x-2">
                    <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                      {dashboardStats?.orders}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                <div className="p-4 md:p-5">
                  <div className="flex items-center gap-x-2">
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                      Invoices
                    </p>
                  </div>

                  <div className="mt-1 flex items-center gap-x-2">
                    <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                      {dashboardStats?.invoices}
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
                      <span className="inline-block text-sm">1.7%</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                <div className="p-4 md:p-5">
                  <div className="flex items-center gap-x-2">
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                      Sales
                    </p>
                  </div>

                  <div className="mt-1 flex items-center gap-x-2">
                    <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                      {dashboardStats?.sales}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
        {/* Stats ends here */}

        <div>
          <div className="grid lg:grid-cols-3   gap-4  ">
            <div className="p-4 md:p-5 min-h-[410px] lg:col-span-2 flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-sm text-gray-500 dark:text-neutral-500">
                    Income
                  </h2>
                  <p className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                    ${0}
                  </p>
                </div>
                <div>
                  <span className="py-[5px] px-1.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-md bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500">
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
                    {0}%
                  </span>
                </div>
              </div>

              <div id="hs-multiple-bar-charts   ">
                <ColumnChart chart_keys={chartKeys} chart_data={chartData} />
              </div>
            </div>

            <div className="p-4 md:p-5 min-h-[410px] flex flex-col    border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-sm text-gray-500 dark:text-neutral-500">
                    Visitors
                  </h2>
                  <p className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                    {79}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    onChange={(e) => setSelectedAnalyicsMonth(e.target.value)}
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
                <p className="text-xs uppercase">Total {selectedChartData}</p>
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
        <>
          {activeTab?.name == "products" ? (
            <ProductsTable products={response?.products || []} />
          ) : activeTab?.name === "orders" ? (
            <OrdersTable orders={response?.orders || []} />
          ) : activeTab?.name === "invoices" ? (
            <InvoicesTable invoices={response?.invoices || []} />
          ) : activeTab?.name === "sales" ? (
            <SalesTable sales={response?.sales || []} />
          ) : (
            <></>
          )}
        </>
      </div>
      {isSidenavOpen && (
        <div
          id="hs-overlay-body-scrolling"
          className={`hs-overlay hs-overlay-open:-translate-x-0 border-t    hidden translate-x-full fixed right-0 top-[43px]  transition-all duration-300 transform h-full max-w-${
            addItem === "create_order" ? "3xl" : "[24rem]"
          } w-full z-[80] bg-white border-s dark:bg-neutral-800 dark:border-neutral-700 [--body-scroll:true] [--overlay-backdrop:false]`}
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
            {addItem?.includes("product") ? (
              <div>
                {addItem?.includes("create") ? (
                  <CreateProduct />
                ) : (
                  <EditProduct />
                )}
              </div>
            ) : addItem?.includes("order") ? (
              <div>
                {addItem?.includes("create") ? (
                  <CreateOrderForm customers={[]} />
                ) : (
                  <CreateOrderForm customers={[]} />
                )}
              </div>
            ) : addItem?.includes("invoice") ? (
              <div>
                <CreateInvoiceForm customers={[]} />
              </div>
            ) : addItem?.includes("sale") ? (
              <CreateSaleForm customers={[]} />
            ) : addItem?.includes("target_data") ? (
              <CreateTargetData target_data={target_data} />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
