"use client";
import React from "react";
import CJDropshippingPage from "./CJDropshippingPage";
import WoocommercePage from "./WoocommercePage";

export default function AllSuppliersPage({
  cjd_category_list,
  cjd_product_list,
  suppliers_configurations_response,
}: any) {
  const wc_suppliers_configurations: any =
    suppliers_configurations_response.find(
      (config: any) => config.supplier === "woocommerce"
    );
  return (
    <div>
      <div className="border-b border-gray-200 dark:border-neutral-700">
        <nav
          className="flex gap-x-1  "
          aria-label="Tabs"
          role="tablist"
          aria-orientation="horizontal"
        >
          <button
            type="button"
            className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500 active"
            id="tabs-with-underline-item-1"
            aria-selected="true"
            data-hs-tab="#tabs-with-underline-1"
            aria-controls="tabs-with-underline-1"
            role="tab"
          >
            CJ Dropshipping
          </button>
          <button
            type="button"
            className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500"
            id="tabs-with-underline-item-2"
            aria-selected="false"
            data-hs-tab="#tabs-with-underline-2"
            aria-controls="tabs-with-underline-2"
            role="tab"
          >
            Woocomerce
          </button>
          <button
            type="button"
            className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500"
            id="tabs-with-underline-item-3"
            aria-selected="false"
            data-hs-tab="#tabs-with-underline-3"
            aria-controls="tabs-with-underline-3"
            role="tab"
          >
            AliExpress
          </button>
          <button
            type="button"
            className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500"
            id="tabs-with-underline-item-4"
            aria-selected="false"
            data-hs-tab="#tabs-with-underline-4"
            aria-controls="tabs-with-underline-4"
            role="tab"
          >
            Eprolo
          </button>
        </nav>
      </div>

      <div className="mt-3">
        <div
          id="tabs-with-underline-1"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-1"
        >
          <div>
            <CJDropshippingPage
              cjd_category_list={cjd_category_list || []}
              cjd_product_list={cjd_product_list || []}
            />
          </div>
        </div>
        <div
          id="tabs-with-underline-2"
          className="hidden"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-2"
        >
          <div>
            <WoocommercePage
              suppliers_configurations={wc_suppliers_configurations}
            />
          </div>
        </div>
        <div
          id="tabs-with-underline-3"
          className="hidden"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-3"
        >
          <p className="text-gray-500 dark:text-neutral-400">
            Coming{" "}
            <em className="font-semibold text-gray-800 dark:text-neutral-200">
              Soon
            </em>
          </p>
        </div>
        <div
          id="tabs-with-underline-4"
          className="hidden"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-4"
        >
          <p className="text-gray-500 dark:text-neutral-400">
            Coming{" "}
            <em className="font-semibold text-gray-800 dark:text-neutral-200">
              Soon
            </em>
          </p>
        </div>
      </div>
    </div>
  );
}
