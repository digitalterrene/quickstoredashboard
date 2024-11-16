import { useSideNavInputs } from "@/context";
import { ProductObjectType } from "@/ts-types/data";
import React, { useEffect, useState } from "react";
import { FiDownload, FiEdit } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-context/AuthContext";
import {
  BsFileEarmarkExcel,
  BsFileEarmarkPdf,
  BsFiletypeCsv,
} from "react-icons/bs";
import { toast } from "react-toastify";
import { CiImport } from "react-icons/ci";
import { addToSet } from "@/api-calls/dashboard-data/addToSet";

export default function CJDProductsTable({
  products,
}: {
  products: ProductObjectType[];
}) {
  const { openSidenav, setSidenavInputs, setAddItem } = useSideNavInputs();
  const { user } = useAuthContext();
  const [selectedExportType, setSelectedExportType] = useState("excel");

  const locaProductsString = localStorage.getItem("cjd_product_list");
  const locaProducts = locaProductsString ? JSON.parse(locaProductsString) : [];

  // Assuming products is defined elsewhere in your code
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
  console.log({ same_cj_product: products[0] });
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

    setFilteredProducts(products || locaProducts);
  }, [searchQuery, filterBy, products]);

  // const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.checked) {
  //     setSelectedIDs(currentProducts.map((product: any) => product?.pid));
  //     setSelectedProductsForImport(
  //       currentProducts.map((product: any) => product)
  //     );
  //   } else {
  //     setSelectedIDs([]);
  //     setSelectedProductsForImport([]);
  //   }
  // };

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
      setSelectedIDs(currentProducts.map((product: any) => product?.pid));
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

  const currentTimestamp: Date = new Date();
  const handleImportClickTest = () => {
    // Implement your import logic here
    console.log("Import clicked");
    console.log({ selectedProductsForImport });
  };
  const handleImportClick = async () => {
    // console.log({ selectedProductsForImport });
    const id = toast.loading("Importing selected products...");

    try {
      // Create an array of promises for each product

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
            external_supplier: "cjdropshipping",
            user_id: user?._id,
          },
        })
      );

      // Execute all promises and wait for them to complete
      const results = await Promise.allSettled(importPromises);

      // Determine overall success and handle individual results
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

        // Log detailed errors
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
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                    <thead className="bg-gray-50 dark:bg-neutral-800">
                      <tr>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6"
                        >
                          <input
                            id="select-all"
                            type="checkbox"
                            className="shrink-0 mt-0.5 h-4 w-4 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                            onChange={handleSelectAll}
                            checked={
                              selectedIDs.length === currentProducts.length
                            }
                          />
                          <span className="sr-only">Select All</span>
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          Product Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          SKU
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          Weight
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          Unit
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          Source From
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          Source From
                        </th>
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
                              onChange={(e) =>
                                handleSelectItem(e, product?.pid)
                              }
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
                </div>
                <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-neutral-700 sm:px-6">
                  <div className="flex flex-1 justify-between sm:hidden">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:ring-neutral-700 dark:focus:ring-neutral-600 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:ring-neutral-700 dark:focus:ring-neutral-600 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex sm:flex-1 sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700 dark:text-neutral-400">
                        Showing{" "}
                        <span className="font-medium">
                          {indexOfFirstItem + 1}
                        </span>{" "}
                        to{" "}
                        <span className="font-medium">{indexOfLastItem}</span>{" "}
                        of{" "}
                        <span className="font-medium">
                          {filteredProducts.length}
                        </span>{" "}
                        results
                      </p>
                    </div>
                    <div>
                      <nav
                        className="relative inline-flex items-center gap-2"
                        aria-label="Pagination"
                      >
                        <button
                          type="button"
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage((prev) => prev - 1)}
                          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:ring-neutral-700 dark:focus:ring-neutral-600 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          Previous
                        </button>
                        <button
                          type="button"
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage((prev) => prev + 1)}
                          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:ring-neutral-700 dark:focus:ring-neutral-600 disabled:opacity-50 disabled:pointer-events-none"
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
      </div>
    </div>
  );
}
