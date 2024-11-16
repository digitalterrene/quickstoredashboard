import { addToSet } from "@/api-calls/dashboard-data/addToSet";
import { useAuthContext } from "@/context/auth-context/AuthContext";
import { AccountInformationShippingObject } from "@/ts-types/account-information";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiSave } from "react-icons/bi";
import { toast } from "react-toastify";

const CreateShippingForm = () => {
  const [formData, setFormData] = useState<AccountInformationShippingObject>({
    shipping_id: "",
    shipping_mode: "standard",
    delivery_address: "",
    sale_id: "",
    order_id: "",
    invoice_id: "",
    customer_id: "",
    products: "",
    delivery_person: "",
    days_to_deliver: 0,
    created_at: new Date().toISOString().slice(0, 10),
    delivery_status: "pending",
    estimated_delivery_date: "",
    tracking_number: "",
  });

  const { user } = useAuthContext();

  const router = useRouter();
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = toast.loading(`Adding new entry to shipping...`);
    const res: any = await addToSet(user?._id, user?._id, user?.token, {
      key_to_update: "shipping",
      value_to_update: {
        data_type: "shipping",
        ...formData,
      },
    });
    if (res.response === "ok") {
      toast.update(id, {
        render: `New entry added successfully to shipping...`,
        type: "success",
        isLoading: false,
      });
    } else {
      toast.update(id, {
        render: `Failed to add new entry to shipping...`,
        type: "error",
        isLoading: false,
      });
    }
    setTimeout(() => {
      toast.dismiss();
      router.refresh();
    }, 6000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 p-6 bg-white shadow-md rounded-md"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Shipping Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Manage all the shipping details form the delivery logistics to
            customer information
          </p>
        </div>
        <button
          type="submit"
          className="py-2 focus:outline-none focus:ring-1 focus:text-blue-500 focus:ring-blue-500 h-fit px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800  hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
        >
          <BiSave className="text-xl" />
          Save
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2 md:col-span-1">
          <label
            htmlFor="shipping_id"
            className="block text-sm font-medium text-gray-700"
          >
            Shipping ID
          </label>
          <input
            type="text"
            name="shipping_id"
            id="shipping_id"
            value={formData.shipping_id}
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label
            htmlFor="shipping_mode"
            className="block text-sm font-medium text-gray-700"
          >
            Shipping Mode
          </label>
          <select
            name="shipping_mode"
            id="shipping_mode"
            value={formData.shipping_mode}
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="standard">Standard</option>
            <option value="express">Express</option>
            <option value="drone">Drone</option>
          </select>
        </div>

        <div className="col-span-2">
          <label
            htmlFor="delivery_address"
            className="block text-sm font-medium text-gray-700"
          >
            Delivery Address
          </label>
          <textarea
            name="delivery_address"
            id="delivery_address"
            value={formData.delivery_address}
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label
            htmlFor="sale_id"
            className="block text-sm font-medium text-gray-700"
          >
            Sale ID
          </label>
          <input
            type="text"
            name="sale_id"
            id="sale_id"
            value={formData.sale_id}
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label
            htmlFor="order_id"
            className="block text-sm font-medium text-gray-700"
          >
            Order ID
          </label>
          <input
            type="text"
            name="order_id"
            id="order_id"
            value={formData.order_id}
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label
            htmlFor="invoice_id"
            className="block text-sm font-medium text-gray-700"
          >
            Invoice ID
          </label>
          <input
            type="text"
            name="invoice_id"
            id="invoice_id"
            value={formData.invoice_id}
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label
            htmlFor="customer_id"
            className="block text-sm font-medium text-gray-700"
          >
            Customer ID
          </label>
          <input
            type="text"
            name="customer_id"
            id="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-2">
          <label
            htmlFor="products"
            className="block text-sm font-medium text-gray-700"
          >
            Products
          </label>
          <textarea
            name="products"
            id="products"
            value={formData.products}
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label
            htmlFor="delivery_person"
            className="block text-sm font-medium text-gray-700"
          >
            Delivery Person
          </label>
          <input
            type="text"
            name="delivery_person"
            id="delivery_person"
            value={formData.delivery_person}
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label
            htmlFor="days_to_deliver"
            className="block text-sm font-medium text-gray-700"
          >
            Days to Deliver
          </label>
          <input
            type="number"
            name="days_to_deliver"
            id="days_to_deliver"
            value={formData.days_to_deliver}
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label
            htmlFor="created_at"
            className="block text-sm font-medium text-gray-700"
          >
            Created At
          </label>
          <input
            type="date"
            name="created_at"
            id="created_at"
            value={formData.created_at}
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label
            htmlFor="delivery_status"
            className="block text-sm font-medium text-gray-700"
          >
            Delivery Status
          </label>
          <select
            name="delivery_status"
            id="delivery_status"
            value={formData.delivery_status}
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="col-span-2 md:col-span-1">
          <label
            htmlFor="estimated_delivery_date"
            className="block text-sm font-medium text-gray-700"
          >
            Estimated Delivery Date
          </label>
          <input
            type="date"
            name="estimated_delivery_date"
            id="estimated_delivery_date"
            value={formData.estimated_delivery_date}
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label
            htmlFor="tracking_number"
            className="block text-sm font-medium text-gray-700"
          >
            Tracking Number
          </label>
          <input
            type="text"
            name="tracking_number"
            id="tracking_number"
            value={formData.tracking_number}
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
    </form>
  );
};

export default CreateShippingForm;
