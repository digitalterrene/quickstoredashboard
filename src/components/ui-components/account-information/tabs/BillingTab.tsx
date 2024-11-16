"use client";
import { updateAccountInformationData } from "@/api-calls/account-information/updateAccountInformationData";
import { useAccountInformationBillingInformationInputs } from "@/context/account-information";
import { useAuthContext } from "@/context/auth-context/AuthContext";
import { AccountInformationBillingObject } from "@/ts-types/account-information";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { BiSave } from "react-icons/bi";
import { toast } from "react-toastify";

export default function BillingTab({
  billing_information,
  save_button_disabled,
}: {
  billing_information: AccountInformationBillingObject;
  save_button_disabled?: boolean;
}) {
  const { user } = useAuthContext();
  const { inputs, setInputs } = useAccountInformationBillingInformationInputs();
  const [formData, setFormData] = useState<AccountInformationBillingObject>({
    ...inputs,
    ...billing_information,
  });
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setInputs({ [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic
    const pok = "account_information";
    const key_to_update = "billing_information";
    const value_to_update = formData;
    const id = toast.loading("Updating billing information...");
    const res: any = await updateAccountInformationData(
      user?._id,
      user?._id,
      user?.token,
      pok,
      key_to_update,
      value_to_update
    );
    if (res.response === "ok") {
      toast.update(id, {
        render: "Billing information updated successfully",
        type: "success",
        isLoading: false,
      });
    } else {
      toast.update(id, {
        render: "Failed to update billing information",
        type: "error",
        isLoading: false,
      });
    }
    setTimeout(() => {
      toast.dismiss();
      router.refresh();
    }, 6000);
    // console.log(inputs);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="  border-gray-900/10 pb-12">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Billing Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Manage your payment methods. Please provide correct details
              htmlFor successful account linking
            </p>
          </div>
          {save_button_disabled !== true && (
            <button
              type="submit"
              className="py-2 focus:outline-none focus:ring-1 focus:text-blue-500 focus:ring-blue-500 h-fit px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800  hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            >
              <BiSave className="text-xl" />
              Save
            </button>
          )}
        </div>
        <div className="  mx-auto">
          <form className="space-y-6">
            <div className="py-6 first:pt-0 mt-4 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
              <label
                htmlFor="af-payment-billing-contact"
                className="inline-block text-sm font-medium dark:text-white"
              >
                Billing contact
              </label>

              <div className="mt-2 space-y-3">
                <input
                  id="af-payment-billing-contact"
                  type="text"
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="First Name"
                  name="first_name"
                  value={formData?.first_name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Last Name"
                  name="last_name"
                  value={formData?.last_name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Phone Number"
                  name="phone_number"
                  value={formData?.phone_number}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
              <label
                htmlFor="af-payment-billing-address"
                className="inline-block text-sm font-medium dark:text-white"
              >
                Billing address
              </label>

              <div className="mt-2 space-y-3">
                <input
                  id="af-payment-billing-address"
                  type="text"
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Street Address"
                  name="street_address"
                  value={formData?.street_address}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Apt, Syuite, Building (Optional)"
                  name="apartment"
                  value={formData?.apartment}
                  onChange={handleChange}
                />
                <div className="grid sm:flex gap-3">
                  <input
                    type="text"
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Postal Code"
                    name="postal_code"
                    value={formData?.postal_code}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="City"
                    name="city"
                    value={formData?.city}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="State"
                    name="state"
                    value={formData?.state}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
              <label
                htmlFor="af-payment-payment-method"
                className="inline-block text-sm font-medium dark:text-white"
              >
                Payment method
              </label>

              <div className="mt-2 space-y-3">
                <input
                  id="af-payment-payment-method"
                  type="text"
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Name on Card"
                  name="name_on_card"
                  value={formData?.name_on_card}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Card Number"
                  name="card_number"
                  value={formData?.card_number}
                  onChange={handleChange}
                  required
                />
                <div className="grid sm:flex gap-3">
                  <input
                    type="text"
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Expiration Date"
                    name="expiration_date"
                    value={formData?.expiration_date}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="CVV Code"
                    name="cvv_code"
                    value={formData?.cvv_code}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </form>
  );
}
