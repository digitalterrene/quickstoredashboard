import { addToSet } from "@/api-calls/dashboard-data/addToSet";
import { useSideNavInputs } from "@/context";
import { useAuthContext } from "@/context/auth-context/AuthContext";
import { CustomerObjectType } from "@/ts-types/data";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { IoAddOutline } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import { toast } from "react-toastify";

interface InvoiceFormProps {
  customers: CustomerObjectType[];
}

const CreateSaleForm: React.FC<InvoiceFormProps> = ({ customers }) => {
  const [saleData, setSaleData] = useState({
    sale_number: "",
    sale_date: "",
    seller_name: "",
    seller_address: "",
    seller_contact: "",
    buyer_name: "",
    buyer_address: "",
    buyer_contact: "",
    items: [],
    payment_method: "",
    payment_terms: "",
    tax_rate: 0,
    tax_amount: 0,
    subtotal: 0,
    total_amount: 0,
    notes: "",
    customer_id: "",
    invoice_id: "",
    order_id: "",
  });

  const handleCustomerChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCustomer: any = customers.find(
      (customer: any) => customer._id === event.target.value
    );
    if (selectedCustomer) {
      setSaleData({
        ...saleData,
        buyer_name: `${selectedCustomer.name} ${selectedCustomer.lastname}`,
        buyer_address: selectedCustomer.company,
        buyer_contact: selectedCustomer.email,
      });
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setSaleData({
      ...saleData,
      [name]: value,
    });
  };
  const handleUploadImage = (image: File, image_type: string) => {
    const id = toast.loading("Uploading image...");
    if (image === undefined) {
      toast.update(id, {
        render: "Something went wrong",
        type: "error",
        isLoading: false,
      });
      return;
    }
    if (image.type === "image/jpeg" || image.type === "image/png") {
      const data = new FormData();
      data.append("file", image);
      data.append(
        "upload_preset",
        `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
      );
      data.append(
        "cloud_name",
        `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`
      );
      fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "post",
          body: data,
        }
      )
        .then((res) => res.json())
        .then(async (data) => {
          toast.update(id, {
            render: "Image successfully uploaded",
            type: "success",
            isLoading: false,
          });
          // console.log("Image in the server" + data.secure_url.toString());

          setNewProductInputs((prevState) => ({
            ...prevState,
            image: data.secure_url.toString(),
          }));
          //return { image_url: data.secure_url.toString() };
        })
        .catch((err) => {
          toast.update(id, {
            render: `${err?.message}`,
            type: "error",
            isLoading: false,
          });
          console.log(err);
        });
    } else {
      toast.update(id, {
        render: "Please select an image",
        type: "error",
        isLoading: false,
      });
      return;
    }
    setTimeout(() => {
      toast.dismiss();
    }, 6000);
  };
  const calculateTotal = () => {
    return selectedProducts?.reduce((total, item: any) => {
      return total + item.total_price;
    }, 0);
  };
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [newProductInputs, setNewProductInputs] = useState({
    name: "",
    _id: "",
    price: 0,
    quantity: 1,
    image: "",
  });

  const handleAddProduct = () => {
    setSelectedProducts((prevState) => [...prevState, { ...newProductInputs }]);
    setNewProductInputs({
      name: "",
      _id: "",
      price: 0,
      quantity: 1,
      image: "",
    });
  };

  const handleRemoveProduct = (id: any) => {
    setSelectedProducts((prevState) =>
      prevState.filter((product: any) => product._id !== id)
    );
  };
  const { closeSidenav, setSidenavInputs } = useSideNavInputs();
  const router = useRouter();
  const { user } = useAuthContext();
  const handleSubmit = async () => {
    const id = toast.loading("Creating new sale...");
    const res: any = await addToSet(user._id, user?._id, user?.token, {
      key_to_update: "sales",
      value_to_update: {
        data_type: "sales",
        ...saleData,
        products: selectedProducts,
      },
    });
    if (res.response === "ok") {
      toast.update(id, {
        render: "New sale created successfully",
        type: "success",
        isLoading: false,
      });
    } else {
      toast.update(id, {
        render: "Failed to create new sale",
        type: "error",
        isLoading: false,
      });
    }
    setTimeout(() => {
      toast.dismiss();
      router.refresh();
    }, 6000);
    // console.log({
    //   data_type: "orders",
    //   ...inputs,
    //   products: selectedProducts,
    // });
  };
  return (
    <div className="max-w-4xl mx-auto p-6 pb-44 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Create Sale</h2>{" "}
      <div className=" flex mb-6 items-center justify-between ">
        <div className="inline-flex   rounded-lg shadow-sm">
          <button
            type="button"
            onClick={() => {
              setSidenavInputs({});
              closeSidenav();
            }}
            className="py-1.5 px-3 cursor-pointer group hover:text-white hover:bg-red-500 inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm  disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              handleSubmit();
              setTimeout(() => {
                closeSidenav();
              }, 3000);
            }}
            className="py-1.5 cursor-pointer  px-3 group hover:text-white hover:bg-blue-500 inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm  disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
          >
            <AiOutlineSave className="text-blue-500 text-lg group-hover:text-white" />{" "}
            Save
          </button>
        </div>
      </div>
      <div>
        {/* Customer Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label
              htmlFor="buyer_name"
              className="block text-sm font-medium text-gray-700"
            >
              Customer
            </label>
            <select
              id="buyer_name"
              name="buyer_name"
              value={saleData.buyer_name}
              onChange={handleCustomerChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Customer</option>
              {customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name} {customer.lastname} - {customer.company}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="buyer_address"
              className="block text-sm font-medium text-gray-700"
            >
              Company
            </label>
            <input
              id="buyer_address"
              name="buyer_address"
              value={saleData.buyer_address}
              onChange={handleInputChange}
              readOnly
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="buyer_contact"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="buyer_contact"
              name="buyer_contact"
              value={saleData.buyer_contact}
              onChange={handleInputChange}
              readOnly
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="mt-10 lg:mt-0">
          <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
          <label
            htmlFor="first-name"
            className="block col-span-full text-sm font-medium leading-6 text-gray-900"
          >
            Selected Products
          </label>
          <div className="col-span-full gap-8 items-center py-4">
            {selectedProducts.map(({ name, _id, price, quantity, image }) => (
              <a
                key={_id}
                className="relative flex items-center bg-center bg-cover p-2 w-full overflow-hidden rounded-lg border hover:opacity-75 xl:w-auto"
              >
                <img
                  src={image}
                  className="w-12 border shadow h-12 rounded object-center object-cover"
                />
                <div className="mx-3 flex-col flex">
                  <span className="relative text font-medium ">{name}</span>
                  <span className="relative text-sm ">{quantity}</span>
                </div>
                <div className="mx-3 ml-auto flex-col flex">
                  <span className="relative text-sm ">${price}</span>
                  <span className="relative text-sm ">
                    ${((price || 0) * (quantity || 0)).toFixed(2)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(_id)}
                  className="p-1 ml-auto w-fit z-10 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-100 text-red-600 hover:bg-red-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none"
                >
                  <MdClear className="text-lg" />
                </button>
              </a>
            ))}
          </div>
          <div className="col-span-full grid grid-cols-2 border p-3 rounded-xl gap-5">
            <div className="sm:col-span-2">
              <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                Product image
              </label>
            </div>
            <div className="sm:col-span-2">
              <div className="flex items-center gap-5">
                <img
                  className="inline-block size-16 ring-2 ring-white dark:ring-neutral-900"
                  src={
                    newProductInputs.image ||
                    "https://cdn-icons-png.flaticon.com/128/4904/4904233.png"
                  }
                  alt="Image Description"
                />
                <div className="flex gap-x-2">
                  <label htmlFor="uploadFile1">
                    <input
                      type="file"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleUploadImage(e.target.files[0], "image");
                        }
                      }}
                      id="uploadFile1"
                      className="hidden"
                    />
                    <span className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
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
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      Upload Image
                    </span>
                  </label>
                  <div></div>
                </div>
              </div>
            </div>
            <span className="col-span-2">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Product Name
              </label>
              <div className="sm:flex rounded-lg shadow-sm">
                <input
                  type="text"
                  value={newProductInputs.name}
                  onChange={(e) =>
                    setNewProductInputs((prevState) => ({
                      ...prevState,
                      name: e.target.value,
                    }))
                  }
                  className="py-2 px-4 pe-11 block w-full border-gray-200 sm:shadow-sm first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                />
                <span className="py-2 px-4 inline-flex items-center min-w-fit w-full border border-gray-200 bg-gray-50 text-sm text-gray-500 first:rounded-t-lg last:rounded-b-lg sm:w-auto sm:first:rounded-s-lg sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg dark:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-400">
                  #
                </span>
                <input
                  type="text"
                  value={newProductInputs._id}
                  onChange={(e) =>
                    setNewProductInputs((prevState) => ({
                      ...prevState,
                      _id: e.target.value,
                    }))
                  }
                  className="py-2 px-4 pe-11 block w-full border-gray-200 shadow-sm first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                />
              </div>
            </span>
            <div className="col-span-2 gap-4 grid grid-cols-2">
              <span>
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="sm:flex rounded-lg shadow-sm">
                  <input
                    type="number"
                    name="region"
                    value={newProductInputs.price}
                    onChange={(e) =>
                      setNewProductInputs((prevState) => ({
                        ...prevState,
                        price: parseInt(e.target.value),
                      }))
                    }
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </span>
              <span>
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Quantity
                </label>
                <div className="sm:flex rounded-lg shadow-sm">
                  <input
                    type="number"
                    name="region"
                    value={newProductInputs.quantity}
                    onChange={(e) =>
                      setNewProductInputs((prevState) => ({
                        ...prevState,
                        quantity: parseInt(e.target.value),
                      }))
                    }
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </span>
            </div>
          </div>
          <div className="col-span-2 flex justify-end">
            <button
              type="button"
              onClick={handleAddProduct}
              className="py-2 mt-8 px-2 inline-flex items-center gap-x-1 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none"
            >
              <IoAddOutline className="text-xl" />
              Add Product
            </button>
          </div>
        </div>

        {/* Sale Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label
              htmlFor="sale_number"
              className="block text-sm font-medium text-gray-700"
            >
              Sale Number
            </label>
            <input
              type="text"
              id="sale_number"
              name="sale_number"
              value={saleData.sale_number}
              onChange={handleInputChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="sale_date"
              className="block text-sm font-medium text-gray-700"
            >
              Sale Date
            </label>
            <input
              type="date"
              id="sale_date"
              name="sale_date"
              value={saleData.sale_date}
              onChange={handleInputChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Payment Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label
              htmlFor="payment_method"
              className="block text-sm font-medium text-gray-700"
            >
              Payment Method
            </label>
            <input
              type="text"
              id="payment_method"
              name="payment_method"
              value={saleData.payment_method}
              onChange={handleInputChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="payment_terms"
              className="block text-sm font-medium text-gray-700"
            >
              Payment Terms
            </label>
            <input
              type="text"
              id="payment_terms"
              name="payment_terms"
              value={saleData.payment_terms}
              onChange={handleInputChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Tax and Total */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label
              htmlFor="tax_rate"
              className="block text-sm font-medium text-gray-700"
            >
              Tax Rate (%)
            </label>
            <input
              type="number"
              id="tax_rate"
              name="tax_rate"
              value={saleData.tax_rate}
              onChange={handleInputChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="tax_amount"
              className="block text-sm font-medium text-gray-700"
            >
              Tax Amount
            </label>
            <input
              type="number"
              id="tax_amount"
              name="tax_amount"
              value={saleData.tax_amount}
              onChange={handleInputChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="subtotal"
              className="block text-sm font-medium text-gray-700"
            >
              Subtotal
            </label>
            <input
              type="number"
              id="subtotal"
              name="subtotal"
              value={saleData.subtotal}
              onChange={handleInputChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="total_amount"
              className="block text-sm font-medium text-gray-700"
            >
              Total Amount
            </label>
            <input
              type="number"
              id="total_amount"
              name="total_amount"
              value={saleData.total_amount}
              onChange={handleInputChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="terms_and_conditions"
            className="block text-sm font-medium text-gray-700"
          >
            Customer ID
          </label>
          <input
            id="customer_id"
            name="customer_id"
            value={saleData?.customer_id}
            onChange={handleInputChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="terms_and_conditions"
            className="block text-sm font-medium text-gray-700"
          >
            Order ID
          </label>
          <input
            id="order_id"
            name="order_id"
            value={saleData?.order_id}
            onChange={handleInputChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="terms_and_conditions"
            className="block text-sm font-medium text-gray-700"
          >
            Invoice ID
          </label>
          <input
            id="invoice_id"
            name="invoice_id"
            value={saleData?.invoice_id}
            onChange={handleInputChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        {/* Additional Information */}
        <div className="mb-6">
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700"
          >
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={saleData.notes}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateSaleForm;
