"use client";
import { updateAccountInformationData } from "@/api-calls/account-information/updateAccountInformationData";
import { useAccountInformationLocationInformationInputs } from "@/context/account-information";
import { useAuthContext } from "@/context/auth-context/AuthContext";
import { AccountInformationLocationObject } from "@/ts-types/account-information";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { BiSave } from "react-icons/bi";
import { toast } from "react-toastify";

export default function LocationTab({
  location_information,
  save_button_disabled,
}: {
  location_information: AccountInformationLocationObject;
  save_button_disabled?: boolean;
}) {
  const { user } = useAuthContext();
  const { inputs, setInputs } =
    useAccountInformationLocationInformationInputs();
  const [formData, setFormData] = useState<AccountInformationLocationObject>({
    ...inputs,
    ...location_information,
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
    const key_to_update = "location_information";
    const value_to_update = formData;
    const id = toast.loading("Updating location information...");
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
        render: "Location information updated successfully",
        type: "success",
        isLoading: false,
      });
    } else {
      toast.update(id, {
        render: "Failed to update location information",
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
              Location Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
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
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="region"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Country
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="country"
                value={formData?.country}
                onChange={handleChange}
                required
                className="block w-full rounded-md border border-gray-200  py-1.5 text-gray-900    ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus: focus:ring-blue-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Street address
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="street_address"
                value={formData?.street_address}
                onChange={handleChange}
                required
                className="block w-full rounded-md border border-gray-200  py-1.5 text-gray-900    ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus: focus:ring-blue-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="city"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              City
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="city"
                value={formData?.city}
                onChange={handleChange}
                required
                className="block w-full rounded-md border border-gray-200  py-1.5 text-gray-900    ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus: focus:ring-blue-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="region"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              State / Province
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="state"
                value={formData?.state}
                onChange={handleChange}
                required
                className="block w-full rounded-md border border-gray-200  py-1.5 text-gray-900    ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus: focus:ring-blue-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="postal-code"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              ZIP / Postal code
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="postal_code"
                value={formData?.postal_code}
                onChange={handleChange}
                required
                className="block w-full rounded-md border border-gray-200  py-1.5 text-gray-900    ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus: focus:ring-blue-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
