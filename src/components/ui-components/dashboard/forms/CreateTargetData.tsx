import React, { FormEvent, useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { useSideNavInputs } from "@/context";
import { useAuthContext } from "@/context/auth-context/AuthContext";
import { useRouter } from "next/navigation";
import { months } from "@/data/other";
import { toast } from "react-toastify";
import { updateAccountInformationData } from "@/api-calls/account-information/updateAccountInformationData";
import { TargetDataInitialState } from "@/data/dashboard";

type Month = (typeof months)[number];

type Category = "products" | "orders" | "invoices" | "sales";

type TargetData = Record<Category, Record<Month, number>>;
interface CreateTargetDataProps {
  target_data: TargetData;
}
const CreateTargetData: React.FC<CreateTargetDataProps> = ({ target_data }) => {
  const [formData, setFormData] = useState<TargetData>({
    ...TargetDataInitialState,
    ...target_data,
  });
  const { closeSidenav, setSidenavInputs } = useSideNavInputs();
  const { user } = useAuthContext();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, dataset } = e.target;
    const category = dataset.category as Category;
    const month = name as Month;

    setFormData((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [month]: parseInt(value),
      },
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pok = "analytics";
    const key_to_update = "target_data";
    const value_to_update = formData;
    const id = toast.loading("Updating target data...");
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
        render: "Target data updated successfully",
        type: "success",
        isLoading: false,
      });
    } else {
      toast.update(id, {
        render: "Failed to update target data",
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
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-4   bg-white shadow-md rounded-lg space-y-4"
    >
      <div className="flex mb-6 items-center justify-between">
        <div className="inline-flex rounded-lg shadow-sm">
          <button
            type="button"
            onClick={() => {
              setSidenavInputs({});
              closeSidenav();
            }}
            className="py-1.5 px-3 cursor-pointer group hover:text-white hover:bg-red-500 inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
          >
            Cancel
          </button>

          <button
            type="submit"
            onClick={() => {
              setTimeout(() => {
                closeSidenav();
              }, 3000);
            }}
            className="py-1.5 cursor-pointer px-3 group hover:text-white hover:bg-blue-500 inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
          >
            <AiOutlineSave className="text-blue-500 text-lg group-hover:text-white" />{" "}
            Save
          </button>
        </div>
      </div>

      {Object.keys(TargetDataInitialState).map((category) => (
        <div key={category}>
          <h3 className="block text-sm font-medium text-gray-700 capitalize">
            {category.replace("_", " ")}
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {months.map((month) => (
              <div key={month} className="mt-1 block w-full">
                <label
                  htmlFor={`${category}-${month}`}
                  className="block text-xs font-medium text-gray-500"
                >
                  {month}
                </label>
                <input
                  type="number"
                  min={0}
                  name={month}
                  id={`${category}-${month}`}
                  data-category={category}
                  value={formData[category as Category][month as Month]}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </form>
  );
};

export default CreateTargetData;
