import { addToSet } from "@/api-calls/dashboard-data/addToSet";
import { useSideNavInputs } from "@/context";
import { useAuthContext } from "@/context/auth-context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { toast } from "react-toastify";

// Under Permissions
// -->Visit Front Store
// -->Visit Dahboard
// -->View Store Data
// -->View Account Information

// Under Tracking & Profiling
// --> Track Location
// --> Track Activity
// --> Track Devices
// --> Profile Account
type Permissions = {
  visit_front_store: boolean;
  visit_dashboard: boolean;
  view_store_data: boolean;
  view_account_information: boolean;
};

type Tracking = {
  track_location: boolean;
  track_activity: boolean;
  track_devices: boolean;
  profile_account: boolean;
};

type FormData = {
  email: string;
  description: string;
  url: string;
  country: string;
  image_url: string;
  firstname: string;
  lastname: string;
  access_key: string;
  management_id: string;
  created_at: string;
  custom_label: string;
  profile_url: string;
  permissions: Permissions;
  tracking: Tracking;
};
const CreateManagementForm = ({ pok }: { pok: string }) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    description: "",
    country: "",
    url: "",
    image_url: "",
    firstname: "",
    lastname: "",
    access_key: "",
    management_id: "",
    created_at: "",
    custom_label: "",
    profile_url: "",
    permissions: {
      visit_front_store: false,
      visit_dashboard: false,
      view_store_data: false,
      view_account_information: false,
    },
    tracking: {
      track_location: false,
      track_activity: false,
      track_devices: false,
      profile_account: false,
    },
  });
  const { closeSidenav, setSidenavInputs } = useSideNavInputs();
  const { user } = useAuthContext();
  const router = useRouter();
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

          setFormData((prevState) => ({
            ...prevState,
            image_url: data.secure_url.toString(),
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
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      const { checked } = e.target;
      const [section, field] = name.split(".");
      setFormData((prevState: any) => ({
        ...prevState,
        [section]: {
          ...prevState[section],
          [field]: checked,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = toast.loading(`Adding new entry to ${pok}...`);
    const res: any = await addToSet(user?._id, user?._id, user?.token, {
      key_to_update: pok,
      value_to_update: {
        data_type: pok,
        ...formData,
      },
    });
    if (res.response === "ok") {
      toast.update(id, {
        render: `New entry added successfully to ${pok}...`,
        type: "success",
        isLoading: false,
      });
    } else {
      toast.update(id, {
        render: `Failed to add new entry to ${pok}...`,
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
      className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg space-y-4"
    >
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
            type="submit"
            onClick={() => {
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
      <div className="cols-span-full">
        <div className=" ">
          <label className="block  text-sm font-medium text-gray-700">
            Image
          </label>
        </div>
        <div className="mt-4 ">
          <div className="flex items-center gap-5">
            <img
              className="inline-block size-12  rounded-lg ring-2 ring-white dark:ring-neutral-900"
              src={
                formData?.image_url ||
                "https://cdn-icons-png.flaticon.com/128/4904/4904233.png"
              }
              alt="Image Description"
            />
            <div className="flex gap-x-2">
              <label htmlFor="uploadFile1">
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
                    <line x1="12" x2="12" y1="3" y2="15" />
                  </svg>
                  Upload image
                </span>
              </label>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="cta_text"
            className="block text-sm font-medium text-gray-700"
          >
            Firstname
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>{" "}
        <div>
          <label
            htmlFor="cta_text"
            className="block text-sm font-medium text-gray-700"
          >
            Lastname
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-2 ">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-2 ">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Access Key
          </label>
          <input
            type="text"
            name="access_key"
            id="access_key"
            value={formData.access_key}
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-2 ">
          <label
            htmlFor="management_id"
            className="block text-sm font-medium text-gray-700"
          >
            Management ID
          </label>
          <input
            type="text"
            name="management_id"
            id="management_id"
            value={formData.management_id}
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="budget"
            className="block text-sm font-medium text-gray-700"
          >
            Custom Label
          </label>
          <input
            type="text"
            name="custom_label"
            id="custom_label"
            value={formData.custom_label}
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="start_date"
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
        <div className="col-span-2 ">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <input
            type="text"
            name="country"
            id="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-2">Permissions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          "visit_front_store",
          "visit_dashboard",
          "view_store_data",
          "view_account_information",
        ].map((perm) => (
          <div key={perm} className="flex items-center">
            <input
              type="checkbox"
              name={`permissions.${perm}`}
              id={perm}
              checked={formData.permissions[perm as keyof Permissions]}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor={perm}
              className="block text-sm font-medium text-gray-700 capitalize ml-2"
            >
              {perm?.replaceAll("_", " ")}
            </label>
          </div>
        ))}
      </div>
      <h3 className="text-lg font-semibold mt-6 mb-2">Tracking & Profiling</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          "track_location",
          "track_activity",
          "track_devices",
          "profile_account",
        ].map((track) => (
          <div key={track} className="flex items-center">
            <input
              type="checkbox"
              name={`tracking.${track}`}
              id={track}
              checked={formData.tracking[track as keyof Tracking]}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor={track}
              className="block text-sm font-medium text-gray-700 capitalize ml-2"
            >
              {track?.replaceAll("_", " ")}
            </label>
          </div>
        ))}
      </div>
    </form>
  );
};

export default CreateManagementForm;
