import { useAuthContext } from "@/context/auth-context/AuthContext";
import React, { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { toast } from "react-toastify";
import { SiWoo } from "react-icons/si";
import { IoKeyOutline } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";
import { GoLock } from "react-icons/go";
import { useRouter } from "next/navigation";
import { addToSet } from "@/api-calls/dashboard-data/addToSet";
import { pullSingleStoreData } from "@/api-calls/dashboard-data/pullStoreData";

export default function WoocommercePageSettingsComponent({
  suppliers_configurations,
}: {
  suppliers_configurations: {
    BASE_URL: string;
    WC_CONSUMER_KEY: string;
    WC_CONSUMER_SECRET: string;
    _id: string;
  };
}) {
  const { user } = useAuthContext();
  const [signinInputs, setSigninInputs] = useState<{
    BASE_URL: string;
    WC_CONSUMER_KEY: string;
    WC_CONSUMER_SECRET: string;
  }>({
    BASE_URL: suppliers_configurations?.BASE_URL,
    WC_CONSUMER_KEY: suppliers_configurations?.WC_CONSUMER_KEY,
    WC_CONSUMER_SECRET: suppliers_configurations?.WC_CONSUMER_SECRET,
  });
  const router = useRouter();
  const handleAPISetupSubmit = async () => {
    const id = toast.loading("Updating Woocommerce suppliers configs...");
    const res: any = await addToSet(user._id, user?._id, user?.token, {
      key_to_update: "suppliers-configurations",
      value_to_update: {
        data_type: "suppliers-configurations",
        ...signinInputs,
        publisher: {
          name: user?.username,
          email: user?.email,
          _id: user?._id,
          image: user?.image,
        },
        supplier: "woocommerce",
        user_id: user?._id,
      },
    });
    if (res.response === "ok") {
      toast.update(id, {
        render: "Woocommerce configs created successfully",
        type: "success",
        isLoading: false,
      });
    } else {
      toast.update(id, {
        render: "Failed to Woocommerce configs",
        type: "error",
        isLoading: false,
      });
    }
    setTimeout(() => {
      toast.dismiss();
      router.refresh();
    }, 6000);
  };
  const handleDelete = async (_id: string) => {
    const id = toast.loading("Deleting Woocommerce configs...");
    let res;
    if (_id) {
      res = await pullSingleStoreData(
        user?._id,
        user?._id,
        user?.token,
        "suppliers-configurations",
        _id
      );
    }
    if (res) {
      toast.update(id, {
        render: `${res?.message}`,
        type: `${res?.response === "ok" ? "success" : "error"}`,
        isLoading: false,
      });
      setTimeout(() => {
        router.refresh();
        toast.dismiss();
      }, 5000);
    }
  };
  return (
    <div>
      <div className="hs-dropdown relative inline-flex [--placement:bottom-left]">
        <button
          id="hs-dropdown"
          type="button"
          className="hs-dropdown-toggle p-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
          aria-haspopup="menu"
          aria-expanded="false"
          aria-label="Dropdown"
        >
          <IoMdSettings className="text-lg text-green-600" />
        </button>

        <div
          className="hs-dropdown-menu border w-fit transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 bg-white shadow-md rounded-lg p-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="hs-dropdown"
        >
          <button
            type="button"
            className="flex items-center w-full cursor-pointer gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="hs-focus-management-modal-woocommerce-user-account-settings"
            data-hs-overlay="#hs-focus-management-modal-woocommerce-user-account-settings"
          >
            API Setup
          </button>

          <div className="text-center">
            <button
              type="button"
              className="flex items-center w-full cursor-pointer gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="hs-notifications-view-coocommerce-store-details"
              data-hs-overlay="#hs-notifications-view-coocommerce-store-details"
            >
              Woocomerce Details
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="flex items-center w-full cursor-pointer gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="hs-danger-alert-delete-woocommerce-store"
              data-hs-overlay="#hs-danger-alert-delete-woocommerce-store"
            >
              Delete Store
            </button>
          </div>
        </div>
      </div>
      {/* Sign in To CJ Droppshipping */}
      <div
        id="hs-focus-management-modal-woocommerce-user-account-settings"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="hs-focus-management-modal-label-woocommerce-user-account-settings"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col p-4 sm:p-7 bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <div className=" overflow-y-auto">
              <div className="  bg-white  px-4 dark:bg-neutral-900 dark:border-neutral-700">
                <div className="">
                  <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                      Woocommerce Integration
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                      Don't have a website?
                      <a
                        className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                        href="#"
                      >
                        Create one for free
                      </a>
                    </p>
                  </div>

                  <div className="mt-5">
                    <button
                      type="button"
                      className="w-full h-fit   text-xl inline-flex justify-center  gap-x-2 items-center font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    >
                      <SiWoo className="text-[#7B51AD] text-5xl " />{" "}
                      <span className="-mt-1.5">Commerce</span>
                    </button>

                    <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
                      Provide Variables
                    </div>

                    <form>
                      <div className="grid gap-y-4">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm mb-2 dark:text-white"
                          >
                            BASE_URL
                          </label>
                          <div className="relative">
                            <input
                              name="BASE_URL"
                              value={signinInputs?.BASE_URL}
                              onChange={(e) =>
                                setSigninInputs((prevState) => ({
                                  ...prevState,
                                  BASE_URL: e.target.value,
                                }))
                              }
                              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                              required
                            />
                            <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                              <svg
                                className="size-5 text-red-500"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                aria-hidden="true"
                              >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                              </svg>
                            </div>
                          </div>
                          <p
                            className="hidden text-xs text-red-600 mt-2"
                            id="email-error"
                          >
                            Please include a valid and working url so we can get
                            connect to your store
                          </p>
                        </div>

                        <div>
                          <label
                            htmlFor="password"
                            className="block text-sm mb-2 dark:text-white"
                          >
                            WC_CONSUMER_KEY (USERNAME)
                          </label>
                          <div className="relative">
                            <input
                              name="WC_CONSUMER_KEY"
                              value={signinInputs?.WC_CONSUMER_KEY}
                              onChange={(e) =>
                                setSigninInputs((prevState) => ({
                                  ...prevState,
                                  WC_CONSUMER_KEY: e.target.value,
                                }))
                              }
                              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                              required
                            />
                            <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                              <svg
                                className="size-5 text-red-500"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                aria-hidden="true"
                              >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="confirm-password"
                            className="block text-sm mb-2 dark:text-white"
                          >
                            WC_CONSUMER_SECRET (PASSWORD)
                          </label>
                          <div className="relative">
                            <input
                              name="WC_CONSUMER_SECRET"
                              value={signinInputs?.WC_CONSUMER_SECRET}
                              onChange={(e) =>
                                setSigninInputs((prevState) => ({
                                  ...prevState,
                                  WC_CONSUMER_SECRET: e.target.value,
                                }))
                              }
                              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                              required
                              aria-describedby="confirm-password-error"
                            />
                            <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                              <svg
                                className="size-5 text-red-500"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                aria-hidden="true"
                              >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="flex">
                            <input
                              id="remember-me"
                              name="remember-me"
                              type="checkbox"
                              className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                            />
                          </div>
                          <div className="ms-3">
                            <label
                              htmlFor="remember-me"
                              className="text-sm dark:text-white"
                            >
                              I accept the{" "}
                              <a
                                className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                                href="#"
                              >
                                Terms and Conditions
                              </a>
                            </label>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                data-hs-overlay="#hs-focus-management-modal-woocommerce-user-account-settings"
              >
                Close
              </button>
              <button
                type="button"
                disabled={
                  !signinInputs?.BASE_URL ||
                  !signinInputs?.WC_CONSUMER_SECRET ||
                  !signinInputs?.WC_CONSUMER_KEY
                }
                data-hs-overlay="#hs-focus-management-modal-woocommerce-user-account-settings"
                onClick={() => handleAPISetupSubmit()}
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* View Store Detail  */}
      <div
        id="hs-notifications-view-coocommerce-store-details"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="hs-notifications-label-view-coocommerce-store-details"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="relative flex flex-col bg-white border shadow-sm rounded-xl overflow-hidden dark:bg-neutral-900 dark:border-neutral-800">
            <div className="absolute top-2 end-2">
              <button
                type="button"
                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                aria-label="Close"
                data-hs-overlay="#hs-notifications-view-coocommerce-store-details"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 sm:p-10 overflow-y-auto">
              <div className="mb-6 text-center">
                <h3
                  id="hs-notifications-label-view-coocommerce-store-details"
                  className="mb-2 text-xl font-bold text-gray-800 dark:text-neutral-200"
                >
                  Notifications
                </h3>
                <p className="text-gray-500 dark:text-neutral-500">
                  Get notified of activity at Preline
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
                  <label
                    htmlFor="hs-account-activity"
                    className="flex gap-x-5 p-4 md:p-5"
                  >
                    <span className="flex gap-x-5 items-start">
                      <span className="grow">
                        <span className="  flex items-center gap-3 font-medium text-gray-800 dark:text-neutral-200">
                          <CiGlobe className=" " size={30} />
                          Base URL
                        </span>
                        <span className="block text-sm pl-10 text-gray-500 dark:text-neutral-500">
                          The base URL is the main address of your WooCommerce
                          website, typically in the format
                          https://your-site.com. This is used as the starting
                          point for all API requests to interact with the
                          WooCommerce store's data.
                        </span>
                        <div className="pl-10 mt-2">
                          {" "}
                          <span className="block text-sm p-2 rounded-lg -ml-1 text-blue-600 bg-gray-100   dark:text-neutral-500">
                            {suppliers_configurations?.BASE_URL || "[base_url]"}
                          </span>
                        </div>
                      </span>
                    </span>
                  </label>
                </div>

                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
                  <label
                    htmlFor="hs-meetups-near-you"
                    className="flex gap-x-5 p-4 md:p-5"
                  >
                    <span className="flex gap-x-5 items-start">
                      <span className="grow">
                        <span className="  flex items-center gap-3 font-medium text-gray-800 dark:text-neutral-200">
                          <IoKeyOutline className=" " size={30} />
                          Consumer Key
                        </span>
                        <span className="block text-sm pl-10 text-gray-500 dark:text-neutral-500">
                          The Consumer Key is a unique identifier provided by
                          WooCommerce when you create a REST API key. It is used
                          to authenticate requests to the WooCommerce API and
                          grants access to the store's data.
                        </span>
                        <div className="pl-10 mt-2">
                          {" "}
                          <span className="block text-sm p-2 rounded-lg -ml-1 text-blue-600 bg-gray-100   dark:text-neutral-500">
                            {suppliers_configurations?.WC_CONSUMER_KEY ||
                              "[wc_consumer_key]"}
                          </span>
                        </div>
                      </span>
                    </span>
                  </label>
                </div>

                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
                  <label
                    htmlFor="hs-preline-communication"
                    className="flex gap-x-5 p-4 md:p-5"
                  >
                    {" "}
                    <span className="flex gap-x-5 items-start">
                      <span className="grow">
                        <span className="  flex items-center gap-3 font-medium text-gray-800 dark:text-neutral-200">
                          <GoLock className=" " size={30} />
                          Consumer Secret
                        </span>
                        <span className="block text-sm pl-10 text-gray-500 dark:text-neutral-500">
                          The Consumer Secret is a secret key paired with the
                          Consumer Key, provided by WooCommerce during API key
                          creation. It is used to sign requests to the
                          WooCommerce API, ensuring secure communication between
                          your app and the WooCommerce store.
                        </span>
                        <div className="pl-10 mt-2">
                          <span className="block text-sm p-2 rounded-lg -ml-1 text-blue-600 bg-gray-100   dark:text-neutral-500">
                            {suppliers_configurations?.WC_CONSUMER_SECRET ||
                              "[wc_consumer_secret]"}
                          </span>
                        </div>
                      </span>
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t dark:bg-neutral-950 dark:border-neutral-800">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                data-hs-overlay="#hs-notifications-view-coocommerce-store-details"
              >
                Cancel
              </button>
              <a
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
                href="#"
                aria-controls="hs-danger-alert-delete-woocommerce-store"
                data-hs-overlay="#hs-danger-alert-delete-woocommerce-store"
              >
                Delete Variables
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Deleting Woocommerce Store  */}
      <div
        id="hs-danger-alert-delete-woocommerce-store"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="hs-danger-alert-label-delete-woocommerce-store"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all md:max-w-2xl md:w-full m-3 md:mx-auto">
          <div className="relative flex flex-col bg-white border shadow-sm rounded-xl overflow-hidden dark:bg-neutral-900 dark:border-neutral-800">
            <div className="absolute top-2 end-2">
              <button
                type="button"
                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                aria-label="Close"
                data-hs-overlay="#hs-danger-alert-delete-woocommerce-store"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 sm:p-10 overflow-y-auto">
              <div className="flex gap-x-4 md:gap-x-7">
                <span className="shrink-0 inline-flex justify-center items-center size-[46px] sm:w-[62px] sm:h-[62px] rounded-full border-4 border-red-50 bg-red-100 text-red-500 dark:bg-red-700 dark:border-red-600 dark:text-red-100">
                  <svg
                    className="shrink-0 size-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                </span>

                <div className="grow">
                  <h3
                    id="hs-danger-alert-label-delete-woocommerce-store"
                    className="mb-2 text-xl font-bold text-gray-800 dark:text-neutral-200"
                  >
                    Delete Woocommerce Account
                  </h3>
                  <p className="text-gray-500 dark:text-neutral-500">
                    Permanently remove your Woocommerce Account and all of its
                    contents from the Quick Stores Dashboard platform. This
                    action is not reversible, so please continue with caution.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t dark:bg-neutral-950 dark:border-neutral-800">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                data-hs-overlay="#hs-danger-alert-delete-woocommerce-store"
              >
                Cancel
              </button>
              <a
                onClick={() => handleDelete(suppliers_configurations?._id)}
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-overlay="#hs-danger-alert-delete-woocommerce-store"
              >
                Delete personal account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
