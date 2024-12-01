import { toast } from "react-toastify";
import { useAuthContext } from "@/context/auth-context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BiSave } from "react-icons/bi";
import { updateAdminData } from "@/api-calls/admin-actions/updateAdminData";
import { AdminObjectType, intialInputs } from "@/ts-types/admin-actions";

export default function AdminActionsComponent({ admin_information }: any) {
  const [formData, setFormData] = useState<AdminObjectType>({
    ...intialInputs,
    ...admin_information,
  });
  const router = useRouter();

  const [updatedInputs, setUpdatedInputs] = useState<
    { key: keyof AdminObjectType; value: any }[]
  >([]);
  const [keysToUpdate, setKeysToUpdate] = useState<
    { key: keyof AdminObjectType; value: any }[]
  >([]);

  const { user } = useAuthContext();

  const handleUploadImage = async (image: File | Blob, image_type: string) => {
    const id = toast.loading(`Uploading ${image_type}`);

    if (!image) {
      toast.update(id, {
        render: "Something went wrong",
        type: "error",
        isLoading: false,
      });
      return;
    }

    if (image.type === "image/jpeg" || image.type === "image/png") {
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
          const imageUrl = data.imgUrl.toString();
          console.log({ [image_type]: imageUrl });
          setFormData((prevState) => ({
            ...prevState,
            [image_type]: imageUrl,
          }));
          setUpdatedInputs((prevState: any) => [
            ...prevState,
            { key: image_type, value: imageUrl },
          ]);

          // Update the user data on your server
          const updateResponse = await updateAdminData(
            user?._id,
            user?._id,
            user?.token,
            image_type,
            imageUrl
          );

          if (updateResponse && updateResponse.response === "ok") {
            // Update local storage with the new image URL
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
              const user = JSON.parse(storedUser);
              user[image_type] = imageUrl; // Correctly update the image_type field
              localStorage.setItem("user", JSON.stringify(user));
            }

            toast.update(id, {
              render: "Image successfully uploaded and updated",
              type: "success",
              isLoading: false,
            });
            router.refresh();
          } else {
            toast.update(id, {
              render: "Failed to update image on the server",
              type: "error",
              isLoading: false,
            });
          }
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
    }
  };
  // Update form data and track updated inputs
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Update the updatedInputs array without duplicating keys
    setUpdatedInputs((prev) => {
      const existingIndex = prev.findIndex((input) => input.key === name);
      if (existingIndex !== -1) {
        const updatedList = [...prev];
        updatedList[existingIndex] = {
          key: name as keyof AdminObjectType,
          value,
        };
        return updatedList;
      } else {
        return [...prev, { key: name as keyof AdminObjectType, value }];
      }
    });
  };

  const handleSubmit = async () => {
    const id = toast.loading("Updating customer...");

    // Prepare keysToUpdate with all updated keys
    updatedInputs.forEach((input) => {
      const { key, value } = input;

      // Check if the key is already in keysToUpdate and update if found
      const existingIndex = keysToUpdate.findIndex(
        (entry) => entry.key === key
      );
      if (existingIndex !== -1) {
        keysToUpdate[existingIndex] = { key, value };
      } else {
        keysToUpdate.push({ key, value });
      }
    });

    // Function to update a single key
    const updateKey = async (key: keyof AdminObjectType, value: any) => {
      try {
        const response: any = await updateAdminData(
          user?._id,
          user?._id,
          user?.token,
          key,
          value
        );

        if (response && response.response === "ok") {
          // Update local storage with the new value for specific keys
          if (["email", "username"].includes(key)) {
            const updatedUser = { ...user, [key]: value };
            localStorage.setItem("user", JSON.stringify(updatedUser));
          }
          router.refresh();
          return true;
        } else {
          throw new Error(response?.message || "Failed to update");
        }
      } catch (error) {
        console.error(`Error updating ${key}:`, error);
        return false;
      }
    };

    // Update each key individually and collect results
    const updateResults = await Promise.all(
      keysToUpdate.map(async ({ key, value }) => {
        const result = await updateKey(key, value);
        return { key, result };
      })
    );

    // Check if all updates were successful
    const allSuccessful = updateResults.every((res) => res.result);

    if (allSuccessful) {
      toast.update(id, {
        render: "All information saved successfully",
        type: "success",
        isLoading: false,
      });
    } else {
      const failedUpdates = updateResults
        .filter((res) => !res.result)
        .map((res) => res.key)
        .join(", ");
      toast.update(id, {
        render: `Failed to update: ${failedUpdates}`,
        type: "error",
        isLoading: false,
      });
    }

    setTimeout(() => {
      router.refresh();
      toast.dismiss();
    }, 5000);
  };

  return (
    <div className="max-w-screen-2xl mx-auto pb-6 p-4 lg:p-8 ">
      <div className="bg-white p-4 border rounded-lg shadow overflow-hidden">
        <div className="space-y-12">
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
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="py-2 focus:outline-none focus:ring-1 focus:text-blue-500 focus:ring-blue-500 h-fit px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800  hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
              >
                <BiSave className="text-xl" />
                Save
              </button>
            </div>
            <div className="  mt-6">
              <div className="  dark:bg-neutral-800">
                <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
                  <div className="sm:col-span-2">
                    <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                      Profile photo
                    </label>
                  </div>
                  <div className="sm:col-span-4">
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
                        <label htmlFor="uploadFile-AdminActions">
                          <input
                            type="file"
                            onChange={async (e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleUploadImage(e.target.files[0], "image");
                              }
                            }}
                            id="uploadFile-AdminActions"
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
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="af-account-email"
                      className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                    >
                      Email
                    </label>
                  </div>
                  <div className="sm:col-span-4">
                    <input
                      id="af-account-email"
                      type="email"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      name="email"
                      value={formData?.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                      Banner Image
                    </label>
                  </div>
                  <div className="sm:col-span-4">
                    <div className="flex w-full ">
                      <label
                        htmlFor="uploadFile-AdminActionsComponent"
                        className="w-full"
                      >
                        <input
                          type="file"
                          onChange={async (e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleUploadImage(e.target.files[0], "banner");
                            }
                          }}
                          id="uploadFile-AdminActionsComponent"
                          className="hidden"
                        />
                        <span className="py-2 pl-3 w-full   inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200  text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
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

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="af-account-username"
                      className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                    >
                      Username
                    </label>
                  </div>
                  <div className="sm:col-span-4">
                    <input
                      id="af-account-username"
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      name="username"
                      value={formData?.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="af-account-password"
                      className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                    >
                      Password
                    </label>
                  </div>
                  <div className="sm:col-span-4">
                    <input
                      id="af-account-password"
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      name="password"
                      value={formData?.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="af-account-access_key"
                      className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                    >
                      Access Key
                    </label>
                  </div>
                  <div className="sm:col-span-4">
                    <input
                      id="af-account-access_key"
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      name="access_key"
                      value={formData?.access_key}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="af-account-security_key"
                      className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                    >
                      Security Key
                    </label>
                  </div>
                  <div className="sm:col-span-4">
                    <input
                      id="af-account-security_key"
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      name="security_key"
                      value={formData?.security_key}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="af-account-user_id"
                      className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                    >
                      Owner ID (User ID)
                    </label>
                  </div>
                  <div className="sm:col-span-4">
                    <input
                      id="af-account-user_id"
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      name="user_id"
                      value={formData?.user_id}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="af-account-tagline"
                      className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                    >
                      Tagline
                    </label>
                  </div>
                  <div className="sm:col-span-4">
                    <input
                      id="af-account-user_id"
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      name="user_id"
                      value={formData?.user_id}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="af-account-bio"
                      className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                    >
                      Description
                    </label>
                  </div>
                  <div className="sm:col-span-4">
                    <textarea
                      id="af-account-bio"
                      className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      rows={6}
                      name="bio"
                      value={formData?.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
