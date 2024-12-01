import { addToSet } from "@/api-calls/dashboard-data/addToSet";
import { useSideNavInputs } from "@/context";
import { useAuthContext } from "@/context/auth-context/AuthContext";
import { getCurrentDateFormatted } from "@/utils/getCurrentDateFormatted";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { toast } from "react-toastify";

const CreateNewsletterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    image_url: "",
    title: "",
    description: "",
    email_subject: "",
    email_body: "",
    recipients: "",
    created_at: getCurrentDateFormatted(),
    location: "United States",
    clicks: "",
    views: "",
    subscriptions: "",
  });
  const { closeSidenav, setSidenavInputs } = useSideNavInputs();
  const { user } = useAuthContext();
  const router = useRouter();

  const handleUploadImage = async (image: File | Blob) => {
    const id = toast.loading("Uploading image to the server..."); // Show initial loading notification

    try {
      // Create FormData and append the file
      const formData = new FormData();
      formData.append("file", image); // Ensure the key matches the API expectations

      // Send the POST request to the server
      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      // Parse the JSON response
      const data = await res.json();

      if (res.ok && data.message === "success") {
        // Handle successful upload
        toast.update(id, {
          render: "Image successfully uploaded!",
          type: "success",
          isLoading: false,
        });

        // Update form data and inputs with the uploaded image URL

        setFormData((prevState) => ({
          ...prevState,
          image_url: data.imgUrl.toString(),
        }));
      } else {
        // Handle server-side errors
        toast.update(id, {
          render: data.error || "Error uploading image.",
          type: "error",
          isLoading: false,
        });
      }
    } catch (error: any) {
      // Handle client-side errors
      toast.update(id, {
        render: error.message || "Something went wrong.",
        type: "error",
        isLoading: false,
      });
      console.error("Upload error:", error);
    } finally {
      // Dismiss toast after a delay
      setTimeout(() => toast.dismiss(id), 6000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = toast.loading("Creating a new newsletter...");
    const res: any = await addToSet(user?._id, user?._id, user?.token, {
      key_to_update: "newsletters",
      value_to_update: {
        data_type: "newsletters",
        ...formData,
      },
    });
    if (res.response === "ok") {
      toast.update(id, {
        render: "New newsletter created successfully",
        type: "success",
        isLoading: false,
      });
    } else {
      toast.update(id, {
        render: "Failed to create a new newsletter",
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
              <label htmlFor="uploadFile-CreateNewsletterForm">
                <input
                  type="file"
                  onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleUploadImage(e.target.files[0]);
                    }
                  }}
                  id="uploadFile-CreateNewsletterForm"
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
        <div className="col-span-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
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
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-2">
          <label
            htmlFor="email_subject"
            className="block text-sm font-medium text-gray-700"
          >
            Email Subject
          </label>
          <input
            type="text"
            name="email_subject"
            id="email_subject"
            value={formData.email_subject}
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-2">
          <label
            htmlFor="email_body"
            className="block text-sm font-medium text-gray-700"
          >
            Email Body
          </label>
          <textarea
            name="email_body"
            id="email_body"
            value={formData.email_body}
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
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
            value={formData?.created_at}
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="clicks"
            className="block text-sm font-medium text-gray-700"
          >
            Clicks
          </label>
          <input
            type="number"
            name="clicks"
            id="clicks"
            value={formData.clicks}
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="views"
            className="block text-sm font-medium text-gray-700"
          >
            Views
          </label>
          <input
            type="number"
            name="views"
            id="views"
            value={formData?.views}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="subscriptions"
            className="block text-sm font-medium text-gray-700"
          >
            Subscriptions
          </label>
          <input
            type="number"
            name="subscriptions"
            id="subscriptions"
            value={formData.subscriptions}
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-2">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-2">
          <label
            htmlFor="recipients"
            className="block text-sm font-medium text-gray-700"
          >
            Recipients
          </label>
          <input
            type="text"
            name="recipients"
            id="recipients"
            value={formData.recipients}
            onChange={handleChange}
            required
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="Comma-separated email addresses"
          />
        </div>
      </div>
    </form>
  );
};

export default CreateNewsletterForm;
