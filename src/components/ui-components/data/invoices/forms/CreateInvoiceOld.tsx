import { InvoiceType } from "@/ts-types/user-type";
import React, { useState } from "react";
import { FiBook } from "react-icons/fi";
const initialInputs: InvoiceType = {
  client_name: "",
  client_email: "",
  client_phone: "",
  client_address: "",
  client_company_name: "",
  billing_address_same_as_client: true,
  billing_address: "",
  invoice_number: "",
  invoice_date: "",
  due_date: "",
  payment_terms: "",
  purchase_order_number: "",
  project_or_service_description: "",
  quantity_hours: 0,
  rate_price_per_unit_hour: 0,
  subtotal: 0,
  total_amount_due: 0,
  payment_method: "",
  payment_instructions: "",
  payment_status: "",
  date_paid: "",
  notes: "",
  attachments: [],
  discount: 0,
  shipping_details: "",
  terms_and_conditions: "",
};

export default function CreateInvoiceOld() {
  const [inputs, setInputs] = useState<InvoiceType>(initialInputs);
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    // Use type assertion to specify that e.target is an HTMLInputElement
    const inputValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: inputValue,
    }));
  };

  return (
    <div className="bg-white w-96 border rounded-xl shadow dark:bg-neutral-900">
      <div className="pt-0 p-4 sm:pt-0 sm:p-7">
        <div className="flex justify-between pt-3 items-center">
          <p className="font-bold">Create Invoice</p>
          <button
            type="button"
            className="inline-flex flex-shrink-0 justify-center items-center  rounded text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200"
          >
            <FiBook className="text-lg" /> Docs
          </button>
        </div>
        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="client_name"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Client Name
            </label>

            <input
              id="client_name"
              name="client_name"
              type="text"
              value={inputs.client_name}
              onChange={handleInputChange}
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Enter client name"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="client_email"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Client Email
            </label>
            <input
              id="client_email"
              name="client_email"
              type="email"
              value={inputs.client_email}
              onChange={handleInputChange}
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Enter client email"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="client_phone"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Client Phone
            </label>
            <input
              id="client_phone"
              name="client_phone"
              type="tel"
              value={inputs.client_phone}
              onChange={handleInputChange}
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Enter client phone"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="client_address"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Client Address
            </label>
            <textarea
              id="client_address"
              name="client_address"
              value={inputs.client_address}
              onChange={handleInputChange}
              className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              rows={4}
              placeholder="Enter client address"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="client_company_name"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Company Name (optional)
            </label>
            <input
              id="client_company_name"
              name="client_company_name"
              type="text"
              value={inputs.client_company_name}
              onChange={handleInputChange}
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Enter client company name"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="billing_address_same_as_client"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Billing Address Same as Client
            </label>
            <input
              id="billing_address_same_as_client"
              name="billing_address_same_as_client"
              type="checkbox"
              checked={inputs.billing_address_same_as_client}
              onChange={handleInputChange}
              className="text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>

          {!inputs.billing_address_same_as_client && (
            <div className="space-y-2">
              <label
                htmlFor="billing_address"
                className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Billing Address
              </label>
              <textarea
                id="billing_address"
                name="billing_address"
                value={inputs.billing_address}
                onChange={handleInputChange}
                className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                rows={4}
                placeholder="Enter billing address"
              ></textarea>
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="invoice_number"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Invoice Number
            </label>
            <input
              id="invoice_number"
              name="invoice_number"
              type="text"
              value={inputs.invoice_number}
              onChange={handleInputChange}
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Enter invoice number"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="invoice_date"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Invoice Date
            </label>
            <input
              id="invoice_date"
              name="invoice_date"
              type="date"
              value={inputs.invoice_date}
              onChange={handleInputChange}
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="due_date"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Due Date
            </label>
            <input
              id="due_date"
              name="due_date"
              type="date"
              value={inputs.due_date}
              onChange={handleInputChange}
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="payment_terms"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Payment Terms
            </label>
            <input
              id="payment_terms"
              name="payment_terms"
              type="text"
              value={inputs.payment_terms}
              onChange={handleInputChange}
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Enter payment terms"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="purchase_order_number"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Purchase Order Number (optional)
            </label>
            <input
              id="purchase_order_number"
              name="purchase_order_number"
              type="text"
              value={inputs.purchase_order_number}
              onChange={handleInputChange}
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Enter purchase order number"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="project_or_service_description"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Project or Service Description
            </label>
            <textarea
              id="project_or_service_description"
              name="project_or_service_description"
              value={inputs.project_or_service_description}
              onChange={handleInputChange}
              className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              rows={4}
              placeholder="Enter project or service description"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="quantity_hours"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Quantity/Hours
            </label>
            <input
              id="quantity_hours"
              name="quantity_hours"
              type="number"
              value={inputs.quantity_hours}
              onChange={handleInputChange}
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Enter quantity or hours"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="rate_price_per_unit_hour"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Rate/Price per Unit or Hour
            </label>
            <input
              id="rate_price_per_unit_hour"
              name="rate_price_per_unit_hour"
              type="number"
              value={inputs.rate_price_per_unit_hour}
              onChange={handleInputChange}
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Enter rate or price per unit or hour"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="subtotal"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Subtotal
            </label>
            <input
              id="subtotal"
              name="subtotal"
              type="number"
              value={inputs.subtotal}
              onChange={handleInputChange}
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Enter subtotal"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="taxes"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Taxes (optional)
            </label>
            <input
              id="taxes"
              name="taxes"
              type="number"
              value={inputs.taxes}
              onChange={handleInputChange}
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Enter taxes"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="total_amount_due"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Total Amount Due
            </label>
            <input
              id="total_amount_due"
              name="total_amount_due"
              type="number"
              value={inputs.total_amount_due}
              onChange={handleInputChange}
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Enter total amount due"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="payment_method"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Payment Method
            </label>
            <input
              id="payment_method"
              name="payment_method"
              type="text"
              value={inputs.payment_method}
              onChange={handleInputChange}
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Enter payment method"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="payment_instructions"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Payment Instructions (optional)
            </label>
            <textarea
              id="payment_instructions"
              name="payment_instructions"
              value={inputs.payment_instructions}
              onChange={handleInputChange}
              className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              rows={4}
              placeholder="Enter payment instructions"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="payment_status"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Payment Status
            </label>
            <input
              id="payment_status"
              name="payment_status"
              type="text"
              value={inputs.payment_status}
              onChange={handleInputChange}
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Enter payment status"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="date_paid"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Date Paid (optional)
            </label>
            <input
              id="date_paid"
              name="date_paid"
              type="date"
              value={inputs.date_paid}
              onChange={handleInputChange}
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="notes"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Notes (optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={inputs.notes}
              onChange={handleInputChange}
              className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              rows={4}
              placeholder="Enter notes"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="discount"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Discount (optional)
            </label>
            <input
              id="discount"
              name="discount"
              type="number"
              value={inputs.discount}
              onChange={handleInputChange}
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Enter discount"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="shipping_details"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Shipping Details (optional)
            </label>
            <input
              id="shipping_details"
              name="shipping_details"
              type="text"
              value={inputs.shipping_details}
              onChange={handleInputChange}
              className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Enter shipping details"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="terms_and_conditions"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
            >
              Terms and Conditions (optional)
            </label>
            <textarea
              id="terms_and_conditions"
              name="terms_and_conditions"
              value={inputs.terms_and_conditions}
              onChange={handleInputChange}
              className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              rows={4}
              placeholder="Enter terms and conditions"
            ></textarea>
          </div>
        </div>

        <div className="mt-5 flex justify-center gap-x-2">
          <button
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            Submit your project
          </button>
        </div>
      </div>
    </div>
  );
}
