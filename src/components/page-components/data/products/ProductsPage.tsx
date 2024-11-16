"use client";
import CreateProduct from "@/components/ui-components/data/products/forms/CreateProduct";
import EditProduct from "@/components/ui-components/data/products/forms/EditProduct";

import ProductsHeaderPanel from "@/components/ui-components/data/products/headers/ProductsHeaderPanel";
import StatsComponent from "@/components/ui-components/data/products/stats-components/ProductsStatsComponent";
import ProductsTable from "@/components/ui-components/data/products/tables/ProductsTable";

import { useSideNavInputs } from "@/context";
import { ProductObjectType } from "@/ts-types/data";
import { calculateStockCount } from "@/utils/data/products/calculateStockCount";
import { calculateUnitsSold } from "@/utils/data/products/calculateUnitsSold";
import { calculateValue } from "@/utils/data/products/calculateValue";
import React from "react";

import { FaWpforms } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import ProductCard from "./ProductCard";
import { calculateTotalSales } from "@/utils/data/products/calculateTotalSales";
import { calculateStockTotal } from "@/utils/data/products/calculateStockTotal";
import { calculateUniqueProductsTotal } from "@/utils/data/products/calculateUniqueProductsTotal";

interface ResponseType {
  data?: ProductObjectType[];
  response: string;
  message: string;
}
export default function ProductsPage({
  response,
  product_categories,
  front_store_configuration,
  suppliers_configurations_response,
}: {
  response: ResponseType;
  product_categories: any;
  front_store_configuration: any;
  suppliers_configurations_response: any;
}) {
  const { addItem, closeSidenav, isGridMode, isSidenavOpen } =
    useSideNavInputs();

  const stats = {
    unique_products: response?.data?.length,
    stock_count: calculateStockCount(response?.data || []),
    stock_total: calculateStockTotal(response?.data || []),
    total_value: calculateValue(response?.data || []),
    unique_products_total: calculateUniqueProductsTotal(response?.data || []),
    units_sold: calculateUnitsSold(response?.data || []),
    total_sales: calculateTotalSales(response?.data || []),
  };
  // console.log({ products: response?.data });
  return (
    <div className="flex items-start  ">
      <div className="space-y-6 w-full py-3 px-6">
        <ProductsHeaderPanel />
        <StatsComponent stats={stats} />
        {isGridMode ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
            {response?.data?.map((product) => (
              <div key={product?._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <ProductsTable products={response?.data || []} />
        )}
      </div>

      {isSidenavOpen && (
        <div
          id="hs-overlay-body-scrolling"
          className="hs-overlay hs-overlay-open:-translate-x-0 border-t    hidden translate-x-full fixed right-0 top-14  transition-all duration-300 transform h-full max-w-lg w-full z-[80] bg-white border-s dark:bg-neutral-800 dark:border-neutral-700 [--body-scroll:true] [--overlay-backdrop:false]"
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
          <div className="p-4 pb-32    scrollbar-thumb-gray-300 scrollbar-thin scrollbar-thumb-rounded-full active:scrollbar-thumb-sky-400 scrollbar-thumb-rounded-full hover:scrollbar-thumb-blue-500 scrollbar-track-gray-100 h-full overflow-auto">
            {addItem?.includes("create_product") ? (
              <div>
                <CreateProduct
                  predefined_filters={front_store_configuration?.filters}
                  product_categories={product_categories}
                />
              </div>
            ) : addItem?.includes("edit_product") ? (
              <div>
                <EditProduct
                  suppliers_configurations_response={
                    suppliers_configurations_response
                  }
                  predefined_filters={front_store_configuration?.filters}
                  product_categories={product_categories}
                />
              </div>
            ) : (
              <div>View Product</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
{
  /* <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
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
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="icon"
                      name="icon"
                      value={searchQuery}
                      onChange={handleSearchQueryChange}
                      className="py-2 pe-4 ps-10 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Search"
                    />
                  </div>
                  <div className="sm:col-span-2 md:grow">
                    <div className="flex justify-end gap-x-2">
                      <div className="inline-flex rounded-lg shadow-sm">
                        <button
                          type="button"
                          className="py-2 px-3 inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                        >
                          Filter By
                        </button>
                        <div className=" w-32 space-y-3">
                          <select
                            id="filterBy"
                            value={filterBy}
                            onChange={handleFilterChange}
                            className="  px-4 block w-full border-gray-200 rounded-r-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                          >
                            <option value="name">Name</option>
                            <option value="price">Price</option>
                            <option value="created_at">Created At</option>
                          </select>
                        </div>
                      </div>
                      <div className="hs-dropdown [--placement:bottom-right] relative inline-block">
                        <button
                          id="hs-as-table-table-export-dropdown"
                          type="button"
                          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                        >
                          <FiDownload className="  text-blue-500" />
                          Export
                        </button>
                        <div
                          className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden divide-y divide-gray-200 min-w-48 z-10 bg-white shadow-md rounded-lg p-2 mt-2 dark:divide-neutral-700 dark:bg-neutral-800 dark:border dark:border-neutral-700"
                          aria-labelledby="hs-as-table-table-export-dropdown"
                        >
                          <div className="py-2 first:pt-0 last:pb-0">
                            <span className="block py-2 px-3 text-xs font-medium uppercase text-gray-400 dark:text-neutral-600">
                              Options
                            </span>
                            <a
                              className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                              href="#"
                            >
                              <FiDownload className="text-xl text-blue-500" />
                              Download
                            </a>
                            <a
                              className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                              href="#"
                            >
                              <IoPrintOutline className="text-xl text-blue-500" />
                              Print
                            </a>
                          </div>
                          <div className="py-2 first:pt-0 last:pb-0">
                            <span className="block py-2 px-3 text-xs font-medium uppercase text-gray-400 dark:text-neutral-600">
                              Download options
                            </span>
                            {[
                              {
                                name: "excel",
                                icon: <BsFileEarmarkExcel />,
                              },
                              {
                                name: ".csv",
                                icon: <BsFiletypeCsv />,
                              },
                              {
                                name: ".pdf",
                                icon: <BsFileEarmarkPdf />,
                              },
                            ]?.map((option) => (
                              <a
                                className={`flex ${
                                  selectedExportType === option?.name
                                    ? "bg-blue-500 text-white "
                                    : "bg-transparent hover:bg-gray-100 "
                                } capitalize items-center gap-x-3 py-2 px-3 cursor-pointer rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300`}
                                onClick={() =>
                                  setSelectedExportType(option?.name)
                                }
                              >
                                <span
                                  className={`"text-xl text-${
                                    selectedExportType === option?.name
                                      ? "white"
                                      : "green-600"
                                  }`}
                                >
                                  {option?.icon}
                                </span>
                                {option?.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="inline-flex gap-x-2">
                          <button
                            disabled={selectedIDs?.length === 0}
                            className="py-2 px-3 inline-flex bg-red-50 group items-center gap-x-2 text-sm font-medium rounded-lg border border-red-500 hover:bg-red-500 hover:text-white  text-gray-800 shadow-sm  disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                            onClick={() => {
                              handleDelete();
                            }}
                          >
                            <MdOutlineDeleteOutline className="text-lg group-hover:text-white text-red-500" />
                            Delete
                          </button>

                          <button
                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                            onClick={() => {
                              openSidenav();
                              setAddItem("create_product");
                            }}
                            data-hs-overlay="#hs-overlay-body-scrolling"
                          >
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
                              <path d="M5 12h14" />
                              <path d="M12 5v14" />
                            </svg>
                            Add Product
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <table className="  divide-y w-full divide-gray-200 dark:divide-neutral-700">
                  <thead className="bg-gray-50 dark:bg-neutral-800">
                    <tr>
                      <th scope="col" className="pl-3 py-3 text-start">
                        <input
                          type="checkbox"
                          checked={
                            selectedIDs.length === currentProducts.length
                          }
                          onChange={handleSelectAll}
                          className="shrink-0 mt-0.5 h-4 w-4 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                          id="hs-default-checkbox"
                        />
                      </th>
                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Product
                          </span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-6 whitespace-nowrap py-3 text-start"
                      >
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Short Description
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Price
                          </span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 whitespace-nowrap py-3 text-start"
                      >
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Stock Count
                          </span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 whitespace-nowrap py-3 text-start"
                      >
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Units Sold
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Category
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Industry
                          </span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 whitespace-nowrap text-start"
                      >
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Date Created
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-start"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                    {currentProducts.map((product: any) => (
                      <tr key={product?.pid}>
                        <td className="relative py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <input
                            id={`select-${product?.pid}`}
                            type="checkbox"
                            className="shrink-0 mt-0.5 h-4 w-4 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                            onChange={(e) => handleSelectItem(e, product?.pid)}
                            checked={selectedIDs.includes(product?.pid)}
                          />
                          <span className="sr-only">
                            Select {product?.name}
                          </span>
                        </td>
                        <td className="whitespace-nowrap flex gap-2 px-3 py-4 text-sm text-gray-900 dark:text-white">
                          <img
                            src={product?.productImage}
                            className="w-10 h-10 rounded"
                          />
                          <div className="w-72  line-clamp-1">
                            <p> {product?.productNameEn}</p>
                            <p className="text-sm text-gray-500">
                              {product?.categoryName}
                            </p>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white">
                          {product?.productSku}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white">
                          {product?.productWeight}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white">
                          {product?.productUnit}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white">
                          ${product?.sellPrice}
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white">
                          {product?.sourceFrom}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
                  <div className="max-w-sm w-24 space-y-3">
                    <input
                      id="productsPerPage"
                      type="number"
                      value={productsPerPage}
                      onChange={handleChangeProductsPerPage}
                      className="border   border-gray-300 rounded px-2 py-1"
                      min={2}
                    />
                  </div>

                  <div>
                    <div className="inline-flex gap-x-2">
                      <button
                        type="button"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                      >
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
                          <path d="m15 18-6-6 6-6" />
                        </svg>
                        Prev
                      </button>

                      <button
                        type="button"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                      >
                        Next
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
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */
}
