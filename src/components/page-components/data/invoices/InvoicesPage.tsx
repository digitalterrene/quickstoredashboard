"use client";
import DataHeaderPanel from "@/components/ui-components/data/DataHeaderPanel";
import CreateInvoiceForm from "@/components/ui-components/data/invoices/forms/CreateInvoiceForm";
import ViewInvoiceComponent from "@/components/ui-components/data/invoices/other/ViewInvoiceComponent";
import InvoicesStatsComponent from "@/components/ui-components/data/invoices/stats-components/InvoicesStatsComponent";
import InvoicesTable from "@/components/ui-components/data/invoices/tables/InvoicesTable";

import { useSideNavInputs } from "@/context";

import { CustomerObjectType, OrderObjectType } from "@/ts-types/data";
import { calculateTotalCustomers } from "@/utils/data/invoices/calculateTotalCustomers";
import { calculateTotalInvoicedProducts } from "@/utils/data/invoices/calculateTotalInvoicedProducts";
import { calculateTotalInvoicesValue } from "@/utils/data/invoices/calculateTotalInvoicesValue";
import React, { useEffect } from "react";
import { FaWpforms } from "react-icons/fa6";

import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
interface ResponseType {
  data?: OrderObjectType[];
  response: string;
  message: string;
}

export default function InvoicesPage({
  response,
  customers,
}: {
  response: ResponseType;
  customers: CustomerObjectType[];
}) {
  console.log({ customers });
  const { addItem, closeSidenav, isSidenavOpen } = useSideNavInputs();
  useEffect(() => {
    if (response?.response === "error") {
      toast.error(`${response?.message}`);
    }
    setTimeout(() => {
      toast.dismiss();
    }, 6000);
  }, [response?.response]);
  const stats = {
    unique_invoices: response?.data?.length,
    customers_count: calculateTotalCustomers(response?.data || []),
    products_count: calculateTotalInvoicedProducts(response?.data || []),
    total_value: calculateTotalInvoicesValue(response?.data || []),
  };
  return (
    <div className="flex items-start  ">
      <div className="space-y-6 w-full py-3 px-6">
        <DataHeaderPanel
          title="Invoices"
          description="Add invoice,edit and more"
        />
        <InvoicesStatsComponent stats={stats} />

        <InvoicesTable invoices={response?.data || []} />
      </div>

      {isSidenavOpen && (
        <div
          id="hs-overlay-body-scrolling"
          className="hs-overlay hs-overlay-open:-translate-x-0 border-t    hidden translate-x-full fixed right-0 top-14  transition-all duration-300 transform h-full max-w-2xl w-full z-[80] bg-white border-s dark:bg-neutral-800 dark:border-neutral-700 [--body-scroll:true] [--overlay-backdrop:false]"
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
          <div className="  scrollbar-thumb-gray-300 scrollbar-thin scrollbar-thumb-rounded-full active:scrollbar-thumb-sky-400 scrollbar-thumb-rounded-full hover:scrollbar-thumb-blue-500 scrollbar-track-gray-100 h-full overflow-auto">
            {addItem?.includes("create_invoice") ? (
              <div>
                <CreateInvoiceForm customers={customers} />
                {/* <CreateInvoice /> */}
              </div>
            ) : (
              <div className="bg-red-900">
                <ViewInvoiceComponent />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
