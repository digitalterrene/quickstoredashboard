import { useSideNavInputs } from "@/context";
import React, { useState } from "react";
import {
  pullMultipleStoreData,
  pullSingleStoreData,
} from "@/api-calls/dashboard-data/pullStoreData";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-context/AuthContext";
import {
  MdAlternateEmail,
  MdOutlineDeleteOutline,
  MdOutlineLock,
} from "react-icons/md";
import { HiOutlineDotsVertical, HiOutlineMail } from "react-icons/hi";
import { HiArrowUpRight } from "react-icons/hi2";
import { FiDownload, FiEdit } from "react-icons/fi";
import { IoPrintOutline } from "react-icons/io5";
import {
  BsFileEarmarkExcel,
  BsFileEarmarkPdf,
  BsFiletypeCsv,
} from "react-icons/bs";
import { BiFilterAlt } from "react-icons/bi";

export default function MarketingTable({
  data,
  active_tab,
  tableHeadings,
}: {
  data: Record<string, any>[];
  active_tab: { name: string; icon: any };
  tableHeadings: string[];
}) {
  const { addItem, openSidenav, setSidenavInputs, setAddItem } =
    useSideNavInputs();
  const { user } = useAuthContext();
  const [selectedIDs, setSelectedIDs] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState<"name" | "price" | "created_at">(
    "name"
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const router = useRouter();

  const handleDelete = async () => {
    console.log(selectedIDs);
    const id = toast.loading("Deleting selected elements...");
    let res;
    if (selectedIDs?.length === 1) {
      res = await pullSingleStoreData(
        user?._id,
        user?._id,
        user?.token,
        `${active_tab?.name}`,
        selectedIDs[0]
      );
    } else {
      res = await pullMultipleStoreData(
        user?._id,
        user?._id,
        user?.token,
        `${active_tab?.name}`,
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

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedIDs(data.map((customers: any) => customers._id));
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
                          <BiFilterAlt className="text-blue-600" />
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
                            <a
                              className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                              href="#"
                            >
                              <BsFileEarmarkExcel className="text-xl text-green-600" />
                              Excel
                            </a>
                            <a
                              className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                              href="#"
                            >
                              <BsFiletypeCsv className="text-xl text-green-600" />
                              .CSV
                            </a>
                            <a
                              className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                              href="#"
                            >
                              <BsFileEarmarkPdf className="text-xl text-green-600" />
                              .PDF
                            </a>
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
                              setAddItem(
                                `create_marketing_${active_tab?.name}`
                              );
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
                            Add New
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <table className="divide-y w-full divide-gray-200 dark:divide-neutral-700">
                  <thead className="bg-gray-50 dark:bg-neutral-800">
                    <tr>
                      <th scope="col" className="pl-3 py-3 text-start">
                        <input
                          type="checkbox"
                          checked={selectedIDs.length === data.length}
                          onChange={handleSelectAll}
                          className="shrink-0 mt-0.5 h-4 w-4 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                          id="hs-default-checkbox"
                        />
                      </th>
                      {tableHeadings.map((heading, index) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-6 whitespace-nowrap py-3 text-start"
                        >
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                              {heading
                                ?.replaceAll("profile_photo_url", "Photo")
                                ?.replaceAll(
                                  "social_media_platform",
                                  "Platform"
                                )
                                ?.replaceAll("_", " ")}
                            </span>
                          </div>
                        </th>
                      ))}
                      {active_tab?.name === "social_accounts" && (
                        <th scope="col" className="pl-3 py-3 text-start"></th>
                      )}
                    </tr>
                  </thead>

                  <tbody className="divide-y overflow-x-auto divide-gray-200 dark:divide-neutral-700">
                    {data.map((elementData, rowIndex) => (
                      <tr key={rowIndex}>
                        <td className="size-px whitespace-nowrap">
                          <div className="p-3 py-3">
                            <label
                              htmlFor={`checkbox-${rowIndex}`}
                              className="flex"
                            >
                              <input
                                type="checkbox"
                                checked={selectedIDs.includes(
                                  elementData?._id || ""
                                )}
                                onChange={(e) =>
                                  handleSelectItem(e, elementData?._id || "")
                                }
                                className="shrink-0 mt-0.5 h-4 w-4 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                id={`checkbox-${rowIndex}`}
                              />
                              <span className="sr-only">Checkbox</span>
                            </label>
                          </div>
                        </td>
                        {tableHeadings.map((heading, colIndex) => (
                          <td
                            key={colIndex}
                            className="  w-72 max-w-96   truncate h-px whitespace-nowrap"
                          >
                            <div className="px-6   py-3">
                              <span className="block text-sm text-gray-500 dark:text-neutral-500">
                                {heading === "profile_photo_url" ||
                                heading === "image_url" ? (
                                  <img
                                    src={elementData[heading]}
                                    className="w-10 h-10 shadow-md object-cover border rounded-full object-center"
                                    alt="Profile Image"
                                  />
                                ) : (
                                  elementData[heading] || ""
                                )}
                              </span>
                            </div>
                          </td>
                        ))}
                        <td className="h-px  whitespace-nowrap">
                          <div className=" px-6">
                            <div className=" flex gap-3 justify-start  ">
                              {active_tab?.name === "social_accounts" && (
                                <div className="hs-dropdown  relative inline-flex">
                                  <button
                                    id="hs-dropdown-custom-icon-trigger"
                                    type="button"
                                    className="hs-dropdown-toggle py-1.5 flex justify-center items-center size-9 text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                                  >
                                    <HiOutlineDotsVertical className="text-lg text-blue-500" />
                                  </button>

                                  <div
                                    className="hs-dropdown-menu border z-50 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-32 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700"
                                    aria-labelledby="hs-dropdown-custom-icon-trigger"
                                  >
                                    <a
                                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                                      href="#"
                                    >
                                      <HiOutlineMail className="text-lg text-blue-500" />{" "}
                                      Copy Email
                                    </a>
                                    <a
                                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                                      href="#"
                                    >
                                      <MdAlternateEmail className="text-lg text-blue-500" />{" "}
                                      Copy Username
                                    </a>
                                    <a
                                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                                      href="#"
                                    >
                                      <MdOutlineLock className="text-lg text-blue-500" />
                                      Copy Password
                                    </a>
                                    <a
                                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                                      href="#"
                                    >
                                      Visit Link{" "}
                                      <HiArrowUpRight className="text-lg text-blue-500" />
                                    </a>
                                  </div>
                                </div>
                              )}
                              <button
                                data-hs-overlay="#hs-overlay-body-scrolling"
                                type="button"
                                onClick={() => {
                                  setAddItem(
                                    `edit_marketing_${active_tab?.name}`
                                  );
                                  setSidenavInputs(elementData);
                                  openSidenav();
                                }}
                                className="block"
                              >
                                <span className="py-1.5 px-2 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                                  <FiEdit className="text-lg text-blue-600" />
                                  Edit
                                </span>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
                  <div className="max-w-sm w-24 space-y-3"></div>

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
