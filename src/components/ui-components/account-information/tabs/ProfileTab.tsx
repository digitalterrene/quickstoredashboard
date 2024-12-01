"use client";
import { updateAccountInformationData } from "@/api-calls/account-information/updateAccountInformationData";
import { useAccountInformationProfileInformationInputs } from "@/context/account-information";
import { useAuthContext } from "@/context/auth-context/AuthContext";
import { AccountInformationProfileObject } from "@/ts-types/account-information";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { BiSave } from "react-icons/bi";
import { toast } from "react-toastify";

export default function ProfileTab({
  profile_information,
  save_button_disabled,
}: {
  profile_information: AccountInformationProfileObject;
  save_button_disabled?: boolean;
}) {
  const { user } = useAuthContext();
  const { inputs, setInputs } = useAccountInformationProfileInformationInputs();
  const [gender, setGender] = useState<string>("male"); // Default to 'male'
  const [formData, setFormData] = useState<AccountInformationProfileObject>({
    ...inputs,
    ...profile_information,
  });
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setInputs({ [name]: value });
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic
    const pok = "account_information";
    const key_to_update = "profile_information";
    const value_to_update = { ...formData, gender };
    const id = toast.loading("Updating profile information...");
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
        render: "Profile information updated successfully",
        type: "success",
        isLoading: false,
      });
    } else {
      toast.update(id, {
        render: "Failed to update profile information",
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
          image: data.imgUrl, // Assuming `imgUrl` is the key in response
        }));
        setInputs({ image: data.imgUrl });
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
  return (
    <form onSubmit={handleSubmit} className="  space-y-12">
      <div className="  border-gray-900/10 pb-12">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Manage your basic profile information. For email and password
              update, visit the authentication settings page.
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
        <div className="  mt-6">
          <div className="  dark:bg-neutral-800">
            <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
              <div className="sm:col-span-3">
                <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                  Profile photo
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="flex items-center gap-5">
                  <img
                    className="inline-block size-16 rounded-full ring-2 ring-white dark:ring-neutral-900"
                    src={
                      formData?.image ||
                      "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                    }
                    alt="Image Description"
                  />
                  <div className="flex gap-x-2">
                    <label htmlFor="uploadFile-ProfileTab">
                      <input
                        type="file"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleUploadImage(e.target.files[0]);
                          }
                        }}
                        id="uploadFile-ProfileTab"
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
                        Upload photo
                      </span>
                    </label>
                    <div></div>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-full-name"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                >
                  Full name
                </label>
                <div className="hs-tooltip inline-block">
                  <button type="button" className="hs-tooltip-toggle ms-1">
                    <svg
                      className="inline-block size-3 text-gray-400 dark:text-neutral-600"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                  </button>
                  <span
                    className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                    role="tooltip"
                  >
                    Displayed on public forums, such as Preline
                  </span>
                </div>
              </div>

              <div className="sm:col-span-9">
                <div className="sm:flex">
                  <input
                    id="af-account-full-name"
                    type="text"
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="John"
                    name="first_name"
                    value={formData?.first_name}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Doe"
                    name="last_name"
                    value={formData?.last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-email"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                >
                  Email
                </label>
              </div>

              <div className="sm:col-span-9">
                <input
                  id="af-account-email"
                  type="email"
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="john@doe.com"
                  name="email"
                  value={formData?.email}
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-3">
                <div className="inline-block">
                  <label
                    htmlFor="af-account-phone"
                    className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                  >
                    Phone
                  </label>
                  <span className="text-sm text-gray-400 dark:text-neutral-600">
                    (Optional)
                  </span>
                </div>
              </div>

              <div className="sm:col-span-9">
                <div className="sm:flex">
                  <input
                    id="af-account-phone"
                    type="text"
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="+x(xxx)xxx-xx-xx"
                    name="phone_number"
                    value={formData?.phone_number}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-gender-checkbox"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                >
                  Gender
                </label>
              </div>
              <div className="sm:col-span-9">
                <div className="sm:flex">
                  <label
                    htmlFor="af-account-gender-checkbox-male"
                    className="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  >
                    <input
                      type="radio"
                      name="af-account-gender-checkbox"
                      className="shrink-0 mt-0.5 border-gray-300 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="af-account-gender-checkbox-male"
                      value="male"
                      checked={gender === "male"}
                      onChange={handleGenderChange}
                    />
                    <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">
                      Male
                    </span>
                  </label>

                  <label
                    htmlFor="af-account-gender-checkbox-female"
                    className="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  >
                    <input
                      type="radio"
                      name="af-account-gender-checkbox"
                      className="shrink-0 mt-0.5 border-gray-300 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="af-account-gender-checkbox-female"
                      value="female"
                      checked={gender === "female"}
                      onChange={handleGenderChange}
                    />
                    <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">
                      Female
                    </span>
                  </label>

                  <label
                    htmlFor="af-account-gender-checkbox-other"
                    className="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  >
                    <input
                      type="radio"
                      name="af-account-gender-checkbox"
                      className="shrink-0 mt-0.5 border-gray-300 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="af-account-gender-checkbox-other"
                      value="other"
                      checked={gender === "other"}
                      onChange={handleGenderChange}
                    />
                    <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">
                      Other
                    </span>
                  </label>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-bio"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                >
                  BIO
                </label>
              </div>

              <div className="sm:col-span-9">
                <textarea
                  id="af-account-bio"
                  className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  rows={6}
                  placeholder="Type your message..."
                  name="bio"
                  value={formData?.bio}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
