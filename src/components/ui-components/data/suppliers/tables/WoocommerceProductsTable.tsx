import { useSideNavInputs } from "@/context";
import { ProductObjectType } from "@/ts-types/data";
import React, { useEffect, useState } from "react";
import { FiDownload, FiEdit } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-context/AuthContext";
import { IoPrintOutline } from "react-icons/io5";
import {
  BsFileEarmarkExcel,
  BsFileEarmarkPdf,
  BsFiletypeCsv,
} from "react-icons/bs";
import { toast } from "react-toastify";
import { CiImport } from "react-icons/ci";
import { productSuppliersAddToSet } from "@/api-calls/dashboard-data/productSuppliersAddToSet";
import { addToSet } from "@/api-calls/dashboard-data/addToSet";

export default function WoocommerceProductsTable({
  products,
}: {
  products: ProductObjectType[];
}) {
  const { openSidenav, setSidenavInputs, setAddItem } = useSideNavInputs();
  const { user } = useAuthContext();
  const [selectedExportType, setSelectedExportType] = useState("excel");

  const locaProductsString = localStorage.getItem("cjd_product_list");
  const locaProducts = locaProductsString ? JSON.parse(locaProductsString) : [];

  const [filteredProducts, setFilteredProducts] = useState<ProductObjectType[]>(
    products || locaProducts
  );
  const [selectedIDs, setSelectedIDs] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductsForImport, setSelectedProductsForImport] =
    useState<any>([]);
  const [filterBy, setFilterBy] = useState<"name" | "price" | "created_at">(
    "name"
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math?.ceil(filteredProducts?.length / itemsPerPage);

  const router = useRouter();

  useEffect(() => {
    let newFilteredProducts = products?.filter((product: any) =>
      product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );

    switch (filterBy) {
      case "price":
        newFilteredProducts = newFilteredProducts?.sort(
          (a, b) => (a.price ?? 0) - (b.price ?? 0)
        );
        break;
      case "created_at":
        newFilteredProducts = newFilteredProducts?.sort(
          (a, b) =>
            new Date(a?.created_at).getTime() -
            new Date(b?.created_at)?.getTime()
        );
        break;
      case "name":
      default:
        newFilteredProducts = newFilteredProducts?.sort((a, b) =>
          (a?.name ?? "").localeCompare(b?.name ?? "")
        );
        break;
    }

    setFilteredProducts(newFilteredProducts || locaProducts);
  }, [searchQuery, filterBy, products]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const additionalInfo = {
      data_type: "products",
      publisher: {
        name: user?.username,
        email: user?.email,
        _id: user?._id,
        image: user?.image,
      },
      created_at: currentTimestamp?.toISOString(),
      user_id: user?._id,
    };

    if (event.target.checked) {
      setSelectedIDs(currentProducts.map((product: any) => product?.id));
      setSelectedProductsForImport(
        currentProducts.map((product: any) => ({
          ...product,
          ...additionalInfo,
        }))
      );
    } else {
      setSelectedIDs([]);
      setSelectedProductsForImport([]);
    }
  };

  const handleSelectItem = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const additionalInfo = {
      data_type: "products",
      publisher: {
        name: user?.username,
        email: user?.email,
        _id: user?._id,
        image: user?.image,
      },
      created_at: currentTimestamp?.toISOString(),
      user_id: user?._id,
    };

    if (event.target.checked) {
      setSelectedIDs((prev) => [...prev, id]);
      const product = currentProducts?.find(
        (product: any) => product?.id === id
      );
      if (product) {
        setSelectedProductsForImport((prev: any) => [
          ...prev,
          {
            ...product,
            ...additionalInfo,
          },
        ]);
      }
    } else {
      setSelectedIDs((prev) => prev.filter((selectedID) => selectedID !== id));
      setSelectedProductsForImport((prev: any) =>
        prev.filter((product: any) => product?.id !== id)
      );
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentTimestamp: Date = new Date();
  const handleImportClick = async () => {
    const id = toast.loading("Importing selected products...");

    try {
      const importPromises = selectedProductsForImport.map((product: any) =>
        addToSet(user._id, user._id, user.token, {
          key_to_update: "products",
          value_to_update: {
            data_type: "products",
            ...product,
            publisher: {
              name: user?.username,
              email: user?.email,
              _id: user?._id,
              image: user?.image,
            },
            store_id: user?._id,
            external_supplier: "woocommerce",
            user_id: user?._id,
          },
        })
      );

      const results = await Promise.allSettled(importPromises);

      const allSuccess = results.every(
        (result) =>
          result.status === "fulfilled" && result.value.response === "ok"
      );

      if (allSuccess) {
        toast.update(id, {
          render: "All products imported successfully",
          type: "success",
          isLoading: false,
        });
      } else {
        toast.update(id, {
          render: "Failed to import some products",
          type: "error",
          isLoading: false,
        });

        results.forEach((result: any) => {
          if (result.status === "rejected") {
            console.error("Import failed:", result.reason);
          } else if (
            result.status === "fulfilled" &&
            result.value.response !== "ok"
          ) {
            console.error("Import failed for product:", result.value);
          }
        });
      }
    } catch (error: any) {
      console.error("Error importing products:", error);
      toast.update(id, {
        render: `Error importing products: ${error.message}`,
        type: "error",
        isLoading: false,
      });
    } finally {
      setTimeout(() => {
        toast.dismiss(id);
        router.refresh();
      }, 6000);
    }
  };

  return (
    <div className="w-full">
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
                <div className="px-4 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                  {/* Search and Filter Components */}
                  <div className="relative w-72">
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
                  <div className="flex space-x-4">
                    <div className="sm:col-span-2 md:grow">
                      <div className="flex justify-end gap-x-2">
                        <div className="inline-flex rounded-lg shadow-sm">
                          <button
                            type="button"
                            className="py-2 px-3 inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                          >
                            Filter By
                          </button>
                          <div className="w-32 space-y-3">
                            <select
                              id="filterBy"
                              value={filterBy}
                              onChange={handleFilterChange}
                              className="px-4 block w-full border-gray-200 rounded-r-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
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
                            <FiDownload className="text-blue-500" />
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
                                className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white dark:focus:ring-neutral-600"
                                href="#"
                                onClick={() => setSelectedExportType("excel")}
                              >
                                <BsFileEarmarkExcel className="text-blue-500" />
                                Excel
                              </a>
                              <a
                                className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white dark:focus:ring-neutral-600"
                                href="#"
                                onClick={() => setSelectedExportType("pdf")}
                              >
                                <BsFileEarmarkPdf className="text-red-500" />
                                PDF
                              </a>
                              <a
                                className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white dark:focus:ring-neutral-600"
                                href="#"
                                onClick={() => setSelectedExportType("csv")}
                              >
                                <BsFiletypeCsv className="text-green-500" />
                                CSV
                              </a>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleImportClick()}
                          className="  py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                          aria-haspopup="menu"
                          aria-expanded="false"
                        >
                          <CiImport className="text-xl text-green-700" />
                          Import products
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                    <thead className="bg-gray-50 dark:bg-neutral-800">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          <input
                            type="checkbox"
                            className="shrink-0 mt-0.5 h-4 w-4 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                            onChange={handleSelectAll}
                            checked={
                              selectedIDs.length === currentProducts?.length
                            }
                          />
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Image
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Created At
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-neutral-900 dark:divide-neutral-700">
                      {currentProducts?.map((product: any) => (
                        <tr key={product?.id}>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              className="shrink-0 mt-0.5 h-4 w-4 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                              onChange={(event) =>
                                handleSelectItem(event, product?.id)
                              }
                              checked={selectedIDs.includes(product?.id)}
                            />
                          </td>
                          <td className="px-4 py-2  whitespace-nowrap">
                            <img
                              src={
                                product?.images[0]?.src || "/default-image.png"
                              }
                              alt={product?.name}
                              className="w-12 h-auto object-cover rounded"
                            />
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                            <div className="w-96 overflow-hidden">
                              <p className="truncate">{product?.name}</p>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            ${product?.price}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(product?.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="px-4 py-3 bg-gray-50 dark:bg-neutral-800">
                  <nav className="flex items-center justify-between">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-700 dark:text-gray-400">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
