"use client";
import { useState } from "react";
import useNavigation from "@/utils/handleNavigate";
import { useAuthContext } from "@/context/auth-context/AuthContext";
import { IoHeartOutline } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

type Variation = {
  data_type: string;
  label: string;
  name: string;
  description: string;
  image: string;
  icon: JSX.Element;
};

type GroupedVariations = {
  [key: string]: Variation[];
};
export default function ProductView({ product, product_reviews }: any) {
  const { user } = useAuthContext();
  const [productQuantity, setProductQuantity] = useState(1);
  // console.log({ product_reviews });
  const [selectedImage, setSelectedImage] = useState(
    product?.image || product?.productImage || ""
  );
  const [selectedOptions, setSelectedOptions] = useState<any>({});
  const handleChange = (type: string, value: any) => {
    setSelectedOptions((prev: any) => ({ ...prev, [type]: value }));
  };
  const groupVariations = (variations: Variation[]): GroupedVariations => {
    return variations?.reduce(
      (acc: GroupedVariations, variation: Variation) => {
        if (!acc[variation?.data_type]) {
          acc[variation?.data_type] = [];
        }
        acc[variation?.data_type].push(variation);
        return acc;
      },
      {}
    );
  };
  type ProductData = {
    [key: string]: string | number | object | Array<any> | null | undefined;
  };
  const renderFieldValue = (field: string, value: any) => {
    if (Array.isArray(value)) {
      return (
        <ul className="ml-4 list-disc">
          {value.map((item, index) => (
            <li key={index}>{renderFieldValue(field, item)}</li>
          ))}
        </ul>
      );
    } else if (typeof value === "object" && value !== null) {
      return (
        <ul className="ml-4">
          {Object.entries(value).map(([innerField, innerValue]) => (
            <li key={innerField}>
              <strong>{innerField?.replaceAll("_", " ")}:</strong>{" "}
              {renderFieldValue(innerField, innerValue)}
            </li>
          ))}
        </ul>
      );
    } else if (typeof value === "string" && value.startsWith("http")) {
      // Assuming the value is an image URL
      return <img src={value} alt={field} className="max-w-xs h-32 rounded" />;
    } else {
      return <span>{value}</span>;
    }
  };

  const actual_images = product?.images;
  const images = actual_images || [];

  return (
    <div className="px-6 py-2">
      <div className="">
        <div className="mt-2 md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              View Product
            </h2>
          </div>
          <div className="inline-flex rounded-lg shadow-sm">
            <a
              href={`https://quickstoredashboard.vercel.app/stores/${product?.user_id}/products/${product?._id}`}
              className="py-2 px-3 hover:bg-blue-500 hover:text-white inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm   disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            >
              Visit In Store
            </a>
            <a
              href={`https://quickstoredashboard.vercel.app/stores/${product?.user_id}`}
              className="py-2 px-3 hover:bg-blue-500 hover:text-white inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            >
              Visit Store
            </a>
            <button
              type="button"
              onClick={() => {
                location.href = "/";
              }}
              className="py-2 px-3 inline-flex hover:bg-blue-500 hover:text-white  justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm   disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            >
              Goto Home
            </button>
          </div>
        </div>
      </div>
      <div className="mt-3 w-full text-center   gap-8 sm:mt-0   sm:text-left">
        <div className="sm:col-span-8 w-full lg:col-span-7">
          <ul className="mt-3 divide-y   border rounded-lg py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
            {Object.entries(product).map(([field, value]) => (
              <li
                key={field}
                className={`flex ${
                  typeof value === "object"
                    ? "flex-col text-start"
                    : "items-start"
                } py-3 gap-3 text-sm`}
              >
                <p className="capitalize">{field?.replaceAll("_", " ")}</p>
                <span className="ml-auto">
                  <span className="rounded-full py-1 text-xs font-medium text-blue-700">
                    {renderFieldValue(field, value)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
