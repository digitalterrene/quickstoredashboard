import { useClientActions, useSideNavInputs } from "@/context";
import { ProductObjectType } from "@/ts-types/data";
import React, { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import {
  pullMultipleStoreData,
  pullSingleStoreData,
} from "@/api-calls/dashboard-data/pullStoreData";
import { toast } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-context/AuthContext";
import { MdOutlineDeleteOutline, MdOutlineShoppingCart } from "react-icons/md";
import { IoPrintOutline } from "react-icons/io5";
import {
  BsFileEarmarkExcel,
  BsFileEarmarkPdf,
  BsFiletypeCsv,
} from "react-icons/bs";
import { formatDate } from "@/utils/formatDate";
import { addToSet } from "@/api-calls/dashboard-data/addToSet";
import { updateStoreData } from "@/api-calls/dashboard-data/updateStoreData";
import {
  useDataCreateProductAttributesInputs,
  useDataCreateProductVariationsInputs,
} from "@/context/data";

export default function ProductsTable({
  products,
}: {
  products: ProductObjectType[];
}) {
  const { openSidenav, setSidenavInputs, setAddItem } = useSideNavInputs();
  const { user } = useAuthContext();
  const { setInputs: setVariationsInputs } =
    useDataCreateProductVariationsInputs();
  const { setInputs: setAttributesInputs } =
    useDataCreateProductAttributesInputs();
  const [selectedExportType, setSelectedExportType] = useState("excel");
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [filteredProducts, setFilteredProducts] = useState<ProductObjectType[]>(
    products || []
  );
  const { clientAction, isClientMode, setClientAction } = useClientActions();
  const [selectedIDs, setSelectedIDs] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState<"name" | "price" | "created_at">(
    "name"
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  console.log({
    products: products?.length,
    filteredProducts: filteredProducts?.length,
    currentProducts: currentProducts?.length,
  });
  const router = useRouter();

  const handleDelete = async () => {
    // console.log(selectedIDs);
    const id = toast.loading("Deleting selected products...");
    let res;
    if (selectedIDs?.length === 1) {
      res = await pullSingleStoreData(
        user?._id,
        user?._id,
        user?.token,
        "products",
        selectedIDs[0]
      );
    } else {
      res = await pullMultipleStoreData(
        user?._id,
        user?._id,
        user?.token,
        "products",
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
  const handleChangeProductsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProductsPerPage(Number(event.target.value));
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const currentTimestamp: Date = new Date();
  useEffect(() => {
    let newFilteredProducts = products?.filter(
      (product: any) =>
        product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.productNameEn
          ?.toLowerCase()
          ?.includes(searchQuery?.toLowerCase())
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
        newFilteredProducts = newFilteredProducts?.sort(
          (a, b) =>
            (a?.name ?? "").localeCompare(b?.name ?? "") ||
            (a?.productNameEn ?? "").localeCompare(b?.productNameEn ?? "")
        );
      default:
        newFilteredProducts = products?.filter(
          (product: any) =>
            product?.name
              ?.toLowerCase()
              ?.includes(searchQuery?.toLowerCase()) ||
            product?.productNameEn
              ?.toLowerCase()
              ?.includes(searchQuery?.toLowerCase())
        );
        break;
    }

    setFilteredProducts(newFilteredProducts);
  }, [searchQuery, filterBy, products]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedIDs(currentProducts.map((product: any) => product._id));
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
  const generateOrderNumber = () => {
    // Get the current timestamp
    const timestamp = Date.now();
    // Convert the timestamp to a string and take the last 8 digits
    const orderNumber = timestamp.toString().slice(-8);
    return orderNumber;
  };
  // Utility function to validate ObjectID format
  const handleClientAction = async () => {
    const id = toast.loading("Processing action...");

    if (!selectedIDs?.length || !products?.length) {
      toast.update(id, {
        render: "No products or IDs selected",
        type: "error",
        isLoading: false,
      });
      setTimeout(() => toast.dismiss(), 2000);
      return;
    }

    try {
      for (const _id of selectedIDs) {
        const product = products.find((p) => p?._id === _id);

        if (!product) {
          toast.update(id, {
            render: `Product with ID ${_id} not found`,
            type: "error",
            isLoading: false,
          });
          continue;
        }

        const res: any = await addToSet(
          product.store_id,
          user?._id,
          user?.token,
          {
            key_to_update:
              clientAction === "place_an_order" ? "orders" : "returns",
            value_to_update: {
              data_type:
                clientAction === "place_an_order" ? "orders" : "returns",
              products: [product],
              customer: {
                name: user?.username,
                email: user?.email,
                _id: user?._id,
                image: user?.image,
              },
              customer_id: user?._id,
              order_number: `${generateOrderNumber()}`,
              status: "processing",
              user_id: product.store_id,
              location: {},
              user_info: {},
              created_at: currentTimestamp?.toISOString(),
            },
          }
        );

        if (res.response === "ok") {
          await addToSet(product.store_id, user?._id, user?.token, {
            key_to_update: "customers",
            value_to_update: {
              data_type: "customers",
              name: user?.username,
              email: user?.email,
              _id: user?._id,
              customer_id: user?._id,
              image: user?.image,
              location: {},
              user_id: product.store_id,
              created_at: currentTimestamp?.toISOString(),
            },
          });

          //updating the units sold for that product
          const data_ = {
            _id: _id || "",
            keys_to_update: [
              { key: "units_sold", value: (product?.units_sold ?? 0) + 1 },
              { key: "stock_count", value: (product?.stock_count ?? 0) - 1 },
            ],
          };

          await updateStoreData(
            product.store_id || user?._id,
            `${user?._id ? "logged-in" : "not-logged-in"}`,
            user?._id,
            user?.token,
            "products",
            data_
          );

          toast.update(id, {
            render: `Order placed successfully for ${product.name}`,
            type: "success",
            isLoading: false,
          });
          setTimeout(() => {
            router.refresh();
          }, 5000);
        } else {
          toast.update(id, {
            render: `Failed to place order for ${product.name}`,
            type: "error",
            isLoading: false,
          });
        }
      }
    } catch (error: any) {
      toast.update(id, {
        render: `Error: ${error.message}`,
        type: "error",
        isLoading: false,
      });
    } finally {
      setTimeout(() => toast.dismiss(), 2000);
    }
  };

  return (
    <div className=" w-full   ">
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto scrollbar-thumb-gray-300 scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded-2xl scrollbar-thumb-rounded-full">
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
                      name="search_query"
                      value={searchQuery}
                      onChange={handleSearchQueryChange}
                      className="py-2 pe-4 ps-10 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Search"
                    />
                  </div>
                  <div className="sm:col-span-2 md:grow">
                    <div className="flex justify-end gap-x-2">
                      {isClientMode && (
                        <div className="inline-flex rounded-lg shadow-sm">
                          <button
                            type="button"
                            className="py-2 px-3 inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                          >
                            {" "}
                            <MdOutlineShoppingCart className="text-lg text-blue-600" />
                            Client Action
                          </button>
                          <div className=" w-40 space-y-3">
                            <select
                              id="filterBy"
                              value={clientAction}
                              onChange={(e) => setClientAction(e.target.value)}
                              className="  px-4 block w-full border-gray-200 rounded-r-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                            >
                              <option value="place_an_order">
                                Place An Order
                              </option>
                              <option value="return_product">
                                Return Product
                              </option>
                            </select>
                          </div>
                        </div>
                      )}
                      {isClientMode && (
                        <button
                          onClick={() => handleClientAction()}
                          type="button"
                          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                        >
                          <MdOutlineShoppingCart className="text-lg text-blue-600" />
                          Save Actions
                        </button>
                      )}
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
                <table className="divide-y w-full divide-gray-200 dark:divide-neutral-700">
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
                  <tbody className="divide-y overflow-x-auto divide-gray-200 dark:divide-neutral-700">
                    {currentProducts.map((product: any) => (
                      <tr
                        key={product?.pid || product?._id}
                        className="bg-white overflow-x-auto hover:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                      >
                        <td className="size-px pl-3 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedIDs.includes(
                              product?.pid || product?._id
                            )}
                            onChange={(e) =>
                              handleSelectItem(e, product?.pid || product?._id)
                            }
                            className="shrink-0 mt-0.5 h-4 w-4 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                            id="hs-default-checkbox"
                          />
                        </td>
                        <td className="size-px p-6 whitespace-nowrap align-top">
                          <a className="block" href="#">
                            <div className="flex items-center gap-x-4">
                              <img
                                className="flex-shrink-0 size-[38px] rounded-lg"
                                src={
                                  product?.image || // Use `product.image` if it's directly available
                                  (typeof product?.productImage === "string" &&
                                  product?.productImage.startsWith("[")
                                    ? JSON.parse(product.productImage)[0] // Parse the serialized array string and use the first image URL
                                    : product?.productImage) || // If `productImage` is a valid single string image URL, use it directly
                                  (Array.isArray(product?.images) &&
                                  product?.images.length > 0
                                    ? product.images[0]?.src ||
                                      product?.images[0] // If `images` is an array, use the first image
                                    : typeof product?.images === "string"
                                    ? product.images
                                    : null) || // If `images` is a string, use it directly
                                  "https://cdn-icons-png.flaticon.com/128/15234/15234678.png" // Fallback URL if no image is available
                                }
                                alt={
                                  product?.name ||
                                  product?.productNameEn ||
                                  "Image Description"
                                }
                              />
                              <div>
                                <span className="block text-sm font-semibold line-clamp-2 text-ellipsis w-96 text-gray-800 dark:text-neutral-200">
                                  {product?.name || product?.productNameEn}
                                </span>
                              </div>
                            </div>
                          </a>
                        </td>
                        <td className="size-px whitespace-wrap w-px align-top">
                          <a className="block p-6" href="#">
                            <div className="flex items-center gap-x-3">
                              <span className="block text-sm truncate max-w-44 text-gray-500 dark:text-neutral-500">
                                {product?.tagline || product?.productSku}
                              </span>
                            </div>
                          </a>
                        </td>
                        <td className="h-px p-6 align-top">
                          <span className="text-sm text-gray-600 dark:text-neutral-400">
                            ${product?.price || product?.sellPrice}
                          </span>
                        </td>
                        <td className="size-px whitespace-nowrap align-top">
                          <a className="block p-6" href="#">
                            <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium border border-blue-300 text-blue-600 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                              {product?.stock_count || product?.productUnit}
                            </span>
                          </a>
                        </td>
                        <td className="size-px whitespace-nowrap align-top">
                          <a className="block p-6" href="#">
                            <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium text-red-600 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                              {product?.units_sold}
                            </span>
                          </a>
                        </td>
                        <td className="size-px whitespace-nowrap align-top">
                          <a className="block p-6" href="#">
                            <span className="text-sm text-gray-600 dark:text-neutral-400">
                              {product?.category || product?.categoryName}
                            </span>
                          </a>
                        </td>
                        <td className="size-px whitespace-nowrap align-top">
                          <a className="block p-6" href="#">
                            <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                              {product?.quickstoredashboard_stores_category?.replaceAll(
                                "_",
                                " "
                              )}
                            </span>
                          </a>
                        </td>
                        <td className="size-px whitespace-nowrap align-top">
                          <a className="block p-6" href="#">
                            <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium text-blue-500 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                              {formatDate(product?.created_at)}
                            </span>
                          </a>
                        </td>
                        <td className="size-px whitespace-nowrap p-6 align-top">
                          <div className="gap-3 flex justify-start">
                            <button
                              data-hs-overlay="#hs-overlay-body-scrolling"
                              type="button"
                              onClick={() => {
                                setAddItem("edit_product");
                                setSidenavInputs({
                                  name: product?.name || product?.productNameEn,
                                  description: product?.description,
                                  image:
                                    product?.image || product?.productImage,
                                  tagline:
                                    product?.tagline || product?.productSku,
                                  units_sold: product?.units_sold,
                                  price: product?.price || product?.sellPrice,
                                  category:
                                    product?.category || product?.categoryName,
                                  created_at: product?.created_at,
                                  images: product?.images,
                                  quickstoredashboard_stores_category:
                                    product?.quickstoredashboard_stores_category ||
                                    product?.sourceFrom,
                                  _id: product?._id,
                                  id: product?.id,
                                  ...product,
                                });
                                setVariationsInputs(product?.variations);
                                setAttributesInputs(product?.attributes);
                                openSidenav();
                              }}
                              className="block"
                            >
                              <span className="py-1.5">
                                <span className="py-1 px-2.5 inline-flex items-center gap-x-1 text-sm hover:text-blue-500  text-black hover:border-blue-500 border-black border  rounded-md hover:bg-gray-50 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:bg-neutral-800">
                                  Edit
                                  <FaRegEdit />
                                </span>
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
                  <div className="max-w-sm flex border rounded-lg p-2 py-1 gap-2 items-center  ">
                    <p className="text-gray-500">Single Page Items</p>
                    <input
                      id="productsPerPage"
                      type="number"
                      value={productsPerPage}
                      max={100}
                      onChange={handleChangeProductsPerPage}
                      className="border  h-fit border-gray-300 w-16 rounded px-2 py-1"
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
