import { useSideNavInputs } from "@/context";
import React, { useState } from "react";
import { FiDownload, FiEdit } from "react-icons/fi";
import {
  pullMultipleStoreData,
  pullSingleStoreData,
} from "@/api-calls/dashboard-data/pullStoreData";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-context/AuthContext";
import { MdOutlineDeleteOutline } from "react-icons/md";
import {
  BsFileEarmarkExcel,
  BsFileEarmarkPdf,
  BsFiletypeCsv,
} from "react-icons/bs";
import { AccountInformationShippingObject } from "@/ts-types/account-information";
import { IoPrintOutline } from "react-icons/io5";

const shippingModeIcon: {
  [key: string]: string;
} = {
  drone: "https://cdn-icons-png.flaticon.com/128/7504/7504459.png",
  standard: "https://cdn-icons-png.flaticon.com/128/6931/6931195.png",
  express: "https://cdn-icons-png.flaticon.com/128/726/726455.png",
  default: "https://cdn-icons-png.flaticon.com/128/756/756940.png",
};
export default function ShippingTable({
  shipping,
}: {
  shipping: AccountInformationShippingObject[];
}) {
  const { addItem, openSidenav, setSidenavInputs, setAddItem } =
    useSideNavInputs();
  const { user } = useAuthContext();
  const [customersPerPage, setCustomersPerPage] = useState(5);
  const [filteredCustomers, setFilteredCustomers] =
    useState<AccountInformationShippingObject[]>(shipping);
  const [selectedIDs, setSelectedIDs] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExportType, setSelectedExportType] = useState("excel");
  const [filterBy, setFilterBy] = useState<"name" | "price" | "created_at">(
    "name"
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomers?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredCustomers?.length / itemsPerPage);

  const router = useRouter();

  const handleDelete = async () => {
    console.log(selectedIDs);
    const id = toast.loading("Deleting selected shipping...");
    let res;
    if (selectedIDs?.length === 1) {
      res = await pullSingleStoreData(
        user?._id,
        user?._id,
        user?.token,
        "shipping",
        selectedIDs[0]
      );
    } else {
      res = await pullMultipleStoreData(
        user?._id,
        user?._id,
        user?.token,
        "shipping",
        selectedIDs
      );
    }
    if (res) {
      toast.update(id, {
        render: `${res?.message}`,
        type: `${res?.response === "ok" ? "success" : "error"}`,
        isLoading: false,
      });
      setTimeout(() => {
        router.refresh();
        toast.dismiss();
      }, 5000);
    }
  };
  const handleChangeCustomersPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomersPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page whenever the shipping per page changes
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedIDs(currentCustomers.map((shipping: any) => shipping._id));
    } else {
      setSelectedIDs([]);
    }
  };

  const handleSelectItem = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (event.target.checked) {
      setSelectedIDs((prev) => [...prev, id]);
    } else {
      setSelectedIDs((prev) => prev.filter((selectedID) => selectedID !== id));
    }
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value as "name" | "price" | "created_at");
    setCurrentPage(1);
  };

  return (
    <div className=" w-full   ">
      <div className="space-y-4 sm:space-y-6">
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

                      <div className="hs-dropdown z-50 [--placement:bottom-right] relative inline-block">
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
                              setAddItem("create_shipping");
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
                            Add Shipping
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
                            selectedIDs?.length === currentCustomers?.length
                          }
                          onChange={handleSelectAll}
                          className="shrink-0 mt-0.5 h-4 w-4 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                          id="hs-default-checkbox"
                        />
                      </th>
                      <th
                        scope="col"
                        className="px-6  whitespace-nowrap  py-3 text-start"
                      >
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Shipping ID
                          </span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6  whitespace-nowrap  py-3 text-start"
                      >
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Mode
                          </span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6  whitespace-nowrap  py-3 text-start"
                      >
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Delivery Person
                          </span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6  whitespace-nowrap  py-3 text-start"
                      >
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Delivery Address
                          </span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6  whitespace-nowrap  py-3 text-start"
                      >
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Status
                          </span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 whitespace-nowrap py-3 text-start"
                      >
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Est Delivery Date
                          </span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 whitespace-nowrap py-3 text-start"
                      >
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Tracking Number{" "}
                          </span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 whitespace-nowrap text-start"
                      >
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Started On{" "}
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-start"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y overflow-x-auto divide-gray-200 dark:divide-neutral-700">
                    {currentCustomers?.map(
                      ({
                        shipping_id,
                        shipping_mode,
                        delivery_address,
                        sale_id,
                        order_id,
                        invoice_id,
                        customer_id,
                        products,
                        delivery_person,
                        days_to_deliver,
                        created_at,
                        delivery_status,
                        estimated_delivery_date,
                        tracking_number,
                        _id,
                      }) => (
                        <tr>
                          <td className="size-px whitespace-nowrap">
                            <div className="p-3  py-3">
                              <label
                                htmlFor="hs-at-with-checkboxes-1"
                                className="flex"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedIDs.includes(_id || "")}
                                  onChange={(e) =>
                                    handleSelectItem(e, _id || "")
                                  }
                                  className="shrink-0 mt-0.5 h-4 w-4 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-default-checkbox"
                                />
                                <span className="sr-only">Checkbox</span>
                              </label>
                            </div>
                          </td>
                          <td className="h-px w-72 whitespace-nowrap">
                            <div className="px-6 capitalize py-3">
                              <span className="block text-sm text-gray-500 dark:text-neutral-500">
                                {shipping_id || ""}
                              </span>
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 -ml-2 py-3">
                              <span className="py-1 capitalize px-1.5 inline-flex items-center gap-x-1 text-xs font-medium   dark:bg-teal-500/10 dark:text-teal-500">
                                <img
                                  alt={shipping_mode}
                                  src={
                                    shipping_mode === "drone"
                                      ? shippingModeIcon?.drone
                                      : shipping_mode === "express"
                                      ? shippingModeIcon?.express
                                      : shipping_mode === "standard"
                                      ? shippingModeIcon?.standard
                                      : shippingModeIcon?.default
                                  }
                                  className=" w-8 mr-3"
                                />
                                {shipping_mode || ""}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-72 whitespace-nowrap">
                            <div className="px-6 capitalize py-3">
                              <span className="block text-sm text-gray-500 dark:text-neutral-500">
                                {delivery_person || ""}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-72 whitespace-nowrap">
                            <div className="px-6 capitalize py-3">
                              <span className="block text-sm text-gray-500 dark:text-neutral-500">
                                {delivery_address || ""}
                              </span>
                            </div>
                          </td>

                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-3">
                              <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium   rounded-full capitalize border bg-gray-50 border-pink-200 shadow">
                                {delivery_status || " "}
                              </span>
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-3">
                              <span className="text-sm text-gray-500 dark:text-neutral-500">
                                {tracking_number || 0}
                              </span>
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-3">
                              <span className="text-sm text-gray-500 dark:text-neutral-500">
                                {tracking_number || 0}
                              </span>
                            </div>
                          </td>
                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-3">
                              <span className="text-sm text-gray-500 dark:text-neutral-500">
                                {created_at || "created at"}
                              </span>
                            </div>
                          </td>
                          <td className="size-px   whitespace-nowrap p-6 align-top">
                            <div className=" ">
                              <div className=" gap-3 flex justify-start  ">
                                <button
                                  data-hs-overlay="#hs-overlay-body-scrolling"
                                  type="button"
                                  onClick={() => {
                                    setAddItem("edit_shipping");
                                    setSidenavInputs({
                                      shipping_id,
                                      shipping_mode,
                                      delivery_address,
                                      sale_id,
                                      order_id,
                                      invoice_id,
                                      customer_id,
                                      products,
                                      delivery_person,
                                      days_to_deliver,
                                      created_at,
                                      delivery_status,
                                      estimated_delivery_date,
                                      tracking_number,
                                      _id,
                                    });
                                    openSidenav();
                                  }}
                                  className="block"
                                >
                                  <span className="  py-1.5">
                                    <span className="py-1 px-2 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                                      <FiEdit className="text-lg" />
                                      Edit
                                    </span>
                                  </span>
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>

                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
                  <div className="max-w-sm w-24 space-y-3">
                    <input
                      id="customersPerPage"
                      type="number"
                      value={customersPerPage}
                      onChange={handleChangeCustomersPerPage}
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
      </div>
    </div>
  );
}