"use client";
import { addToSet } from "@/api-calls/dashboard-data/addToSet";
import { useSideNavInputs } from "@/context";
import { useAuthContext } from "@/context/auth-context/AuthContext";
import { categories } from "@/data/front-store-data";
import { ProductObjectType } from "@/ts-types/data";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { CiShare1 } from "react-icons/ci";
import {
  IoBookOutline,
  IoCloudUploadOutline,
  IoPricetagsOutline,
} from "react-icons/io5";
import { MdClear } from "react-icons/md";
import { toast } from "react-toastify";

const initialInputs: ProductObjectType = {
  name: "",
  price: 0,
  tagline: "",
  description: "",
  atributes: [],
  images: [],
  units_sold: 0,
  category: "",
  quickstoredashboard_stores_category: "",
  publisher: {},
  specs: [],
  created_at: "",
};
export default function CreateProductCopy() {
  const [inputs, setInputs] = useState<ProductObjectType>(initialInputs);
  const { sidenavInputs, closeSidenav, setSidenavInputs } = useSideNavInputs();
  const [productImages, setProductImages] = useState<string[]>([]);
  const { user } = useAuthContext();
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
          setProductImages((prevState) => [
            ...prevState,
            data.secure_url.toString(),
          ]);
          setSidenavInputs({
            images: [data.secure_url.toString(), ...productImages],
          });
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
  const router = useRouter();
  const handleSubmit = async () => {
    const id = toast.loading("Creating new product...");
    const res: any = addToSet(user._id, user?._id, user?.token, {
      key_to_update: "products",
      value_to_update: {
        ...inputs,
        image: inputs && inputs?.images && inputs?.images[0],
        data_type: "products",
      },
    });
    if (res.response === "ok") {
      toast.update(id, {
        render: `${res?.message}`,
        type: "error",
        isLoading: false,
      });
    } else {
      toast.update(id, {
        render: `${res?.message}`,
        type: "error",
        isLoading: false,
      });
    }
    setTimeout(() => {
      toast.dismiss();
      router.refresh();
    }, 6000);
    // console.log(sidenavInputs);
  };
  return (
    <div className="border p-3 rounded-lg w-full">
      <h5 className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">
        <IoPricetagsOutline className="text-lg mr-3 text-blue-500" /> New
        Product
      </h5>
      <div className=" flex mb-6 items-center justify-between ">
        <div className="inline-flex rounded-lg shadow-sm">
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
        <div className="inline-flex border gap-3 border-gray-200 rounded-lg p-1 dark:border-neutral-700">
          <button
            type="button"
            className={`inline-flex flex-shrink-0 justify-center items-center p-1 rounded   hover:bg-blue-100   hover:text-blue-800 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200`}
          >
            <IoBookOutline className="text-lg" />
          </button>
          <button
            type="button"
            className={`inline-flex flex-shrink-0 justify-center items-center p-1 rounded   hover:bg-blue-100   hover:text-blue-800 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200`}
          >
            <CiShare1 className="text-lg" strokeWidth={0.3} />
          </button>
        </div>
      </div>
      <form action="#">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              value={inputs?.name}
              onChange={(e) => {
                setInputs((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }));
                setSidenavInputs({ name: e.target.value });
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Product name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="brand"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Short Description
            </label>
            <input
              type="text"
              value={inputs?.tagline}
              onChange={(e) => {
                setInputs((prevState) => ({
                  ...prevState,
                  tagline: e.target.value,
                }));
                setSidenavInputs({ tagline: e.target.value });
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Short description"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                value={inputs?.price}
                onChange={(e) => {
                  setInputs((prevState) => ({
                    ...prevState,
                    price: parseInt(e.target.value),
                  }));
                  setSidenavInputs({ price: parseInt(e.target.value) });
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$"
                min={0}
                max={10000}
                required
              />
            </div>
            <div>
              <label
                htmlFor="created_at"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date Created
              </label>
              <input
                type="date"
                value={inputs?.created_at}
                onChange={(e) => {
                  setInputs((prevState) => ({
                    ...prevState,
                    created_at: e.target.value,
                  }));
                  setSidenavInputs({ created_at: e.target.value });
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="product images"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Images
            </label>
            <div className="grid grid-cols-3 pb-6 gap-3">
              {productImages?.map((image, i: any) => (
                <li
                  key={i}
                  className="inline-flex w-full h-32 relative items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-slate-900 dark:border-gray-700 dark:text-white"
                >
                  <div className="flex justify-between items-center w-full">
                    <span
                      onClick={() => {
                        // Filter out the entry to remove
                        const newList = productImages?.filter(
                          (product, index) => index !== i
                        );
                        // Update state with the new list
                        setProductImages(newList);
                      }}
                      className="inline-flex items-center absolute -top-2 -right-2 p-1 rounded-full font-medium hover:bg-red-500  bg-red-100 hover:text-white text-red-600 cursor-pointer"
                    >
                      <MdClear />
                    </span>

                    <img src={image} />
                  </div>
                </li>
              ))}
            </div>

            <label
              htmlFor="uploadFile1"
              className="bg-white h-32 text-gray-500 font-semibold text-base rounded max-w-md  flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
            >
              <IoCloudUploadOutline className="text-4xl" />
              Upload file
              <input
                type="file"
                onChange={async (e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleUploadImage(e.target.files[0], "image");
                  }
                }}
                id="uploadFile1"
                className="hidden"
              />
              <p className="text-xs font-medium text-gray-400 mt-2">
                PNG, JPG , JPeg, are Allowed.
              </p>
            </label>
          </div>
          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            <select
              id="category"
              value={inputs?.category}
              onChange={(e) => {
                setInputs((prevState) => ({
                  ...prevState,
                  category: e.target.value,
                }));
                setSidenavInputs({ category: e.target.value });
              }}
              className="bg-gray-50 border capitalize border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              {["category_one", "category_two"]?.map((category) => (
                <option key={category} value={category} className="capitalize">
                  {category?.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </div>{" "}
          <div>
            <label
              htmlFor="quickstoredashboard_stores_category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Quick Stores Category
            </label>
            <select
              id="quickstoredashboard_stores_category"
              value={inputs?.quickstoredashboard_stores_category}
              onChange={(e) => {
                setInputs((prevState) => ({
                  ...prevState,
                  quickstoredashboard_stores_category: e.target.value,
                }));
                setSidenavInputs({
                  quickstoredashboard_stores_category: e.target.value,
                });
              }}
              className="bg-gray-50 border capitalize border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              {categories?.map((category) => (
                <option key={category} value={category} className="capitalize">
                  {category?.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              value={inputs?.description}
              onChange={(e) => {
                setInputs((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }));
                setSidenavInputs({ description: e.target.value });
              }}
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Enter event description here"
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  );
}
