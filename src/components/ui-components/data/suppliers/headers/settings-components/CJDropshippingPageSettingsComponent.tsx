import { getAccessToken } from "@/api-calls/suppliers/cjdropshipping/getAccessToken";
import { logoutToken } from "@/api-calls/suppliers/cjdropshipping/logoutToken";
import { refreshAccessToken } from "@/api-calls/suppliers/cjdropshipping/refreshAccessToken";
import { useSideNavInputs } from "@/context";
import { useAuthContext } from "@/context/auth-context/AuthContext";
import { CJDUserData } from "@/ts-types/cjdropshipping";
import React, { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { SlRefresh } from "react-icons/sl";
import { toast } from "react-toastify";
import CJDAccountSettings from "../../components/CJDAccountSettings";
import { useRouter } from "next/navigation";

export default function CJDropshippingPageSettingsComponent() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [signinInputs, setSigninInputs] = useState<{
    email: string;
    password: string;
  }>({ email: user?.email, password: "" });

  const handleCJDSignin = async () => {
    const id = toast.loading("Logging in...");
    const { email, password } = signinInputs;

    try {
      const data = await getAccessToken(email, password);
      localStorage.setItem(
        "quickstoredashboard-cjd-user",
        JSON.stringify(data)
      );
      toast.update(id, {
        render: "Successfully logged in",
        type: "success",
        isLoading: false,
      });
      router.refresh();
      // console.log({ cjd: data });
    } catch (err: any) {
      toast.update(id, {
        render: err.message,
        type: "error",
        isLoading: false,
      });
      console.log({ cjd: err.message });
    }

    setTimeout(() => {
      toast.dismiss();
    }, 5000);
  };
  const handleTokenRefresh = async (): Promise<void> => {
    const id = toast.loading("Refreshing token...");

    try {
      const storedDataString = localStorage.getItem(
        "quickstoredashboard-cjd-user"
      );
      if (!storedDataString) {
        toast.update(id, {
          render: "Please login first",
          type: "error",
          isLoading: false,
        });
        throw new Error("No user data found in local storage");
      }

      const storedData: CJDUserData = JSON.parse(storedDataString);
      const refreshToken = storedData?.data?.refreshToken;

      if (!refreshToken) {
        toast.update(id, {
          render: "Please login first",
          type: "error",
          isLoading: false,
        });
        throw new Error("No refresh token found");
      }

      const data = await refreshAccessToken(refreshToken);
      localStorage.setItem(
        "quickstoredashboard-cjd-user",
        JSON.stringify(data)
      );
      toast.update(id, {
        render: "Token refreshed successfully",
        type: "success",
        isLoading: false,
      });
      console.log({ refreshedToken: data });
    } catch (err: any) {
      toast.update(id, {
        render: err.message,
        type: "error",
        isLoading: false,
      });
      console.error("Token refresh error:", err.message);
    }

    setTimeout(() => {
      toast.dismiss();
    }, 5000);
  };
  const handleCJDLogout = async (): Promise<void> => {
    const id = toast.loading("Logging out...");
    try {
      const storedDataString = localStorage.getItem(
        "quickstoredashboard-cjd-user"
      );
      if (!storedDataString) {
        toast.update(id, {
          render: "Please login first",
          type: "error",
          isLoading: false,
        });
        throw new Error("No user data found in local storage");
      }

      const storedData = JSON.parse(storedDataString);
      const accessToken = storedData?.data?.accessToken;

      if (!accessToken) {
        toast.update(id, {
          render: "Please provide access token by logging in again",
          type: "error",
          isLoading: false,
        });
        throw new Error("No access token found");
      }

      await logoutToken(accessToken);
      localStorage.removeItem("quickstoredashboard-cjd-user");
      toast.update(id, {
        render: "Logged out successfully",
        type: "success",
        isLoading: false,
      });
      console.log("Logged out successfully");
    } catch (err: any) {
      toast.update(id, {
        render: err.message,
        type: "error",
        isLoading: false,
      });
      console.error("Logout error:", err.message);
    }

    setTimeout(() => {
      toast.dismiss();
    }, 5000);
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
            aria-controls="hs-offcanvas-body-scrolling-cjd-user-account-settings"
            data-hs-overlay="#hs-offcanvas-body-scrolling-cjd-user-account-settings"
          >
            Account
          </button>

          <button
            type="button"
            className="flex items-center w-full cursor-pointer gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="hs-focus-management-modal"
            data-hs-overlay="#hs-focus-management-modal"
          >
            Signin
          </button>
          <button
            type="button"
            className="flex items-center w-full cursor-pointer gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="hs-focus-management-modal-access-token"
            data-hs-overlay="#hs-focus-management-modal-access-token"
          >
            Access Token
          </button>
          <button
            type="button"
            className="flex items-center w-full cursor-pointer gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="hs-sign-out-alert-small-window-cjd-access-token"
            data-hs-overlay="#hs-sign-out-alert-small-window-cjd-access-token"
          >
            Logout Token
          </button>
        </div>
      </div>
      {/* Sign in To CJ Droppshipping */}
      <div
        id="hs-focus-management-modal"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="hs-focus-management-modal-label"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
              <div>
                <h3
                  id="hs-focus-management-modal-label"
                  className="font-bold text-gray-800 dark:text-white"
                >
                  Developer Signin
                </h3>
                <div className="flex mt-1">
                  <div className="shrink-0">
                    <svg
                      className="shrink-0 size-4 text-blue-500 mt-0.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
                    </svg>
                  </div>
                  <div className="ms-3">
                    <p
                      id="hs-toast-normal-example-label"
                      className="text-sm text-gray-700 dark:text-neutral-400"
                    >
                      Please make sure the store API Key is activated
                    </p>
                  </div>
                </div>
              </div>{" "}
              <button
                type="button"
                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                aria-label="Close"
                data-hs-overlay="#hs-focus-management-modal"
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
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <label
                htmlFor="input-label"
                className="block text-sm font-medium mb-2 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                value={signinInputs?.email}
                onChange={(e) =>
                  setSigninInputs((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
                id="input-label"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:text-neutral-400"
                placeholder="you@site.com"
                autoFocus={true}
              />
            </div>
            <div className="p-4 overflow-y-auto">
              <label
                htmlFor="input-label-password"
                className="block text-sm font-medium mb-2 dark:text-white"
              >
                API Key
              </label>
              <input
                type="password"
                id="input-label-password"
                value={signinInputs?.password}
                onChange={(e) =>
                  setSigninInputs((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }))
                }
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:text-neutral-400"
              />
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                data-hs-overlay="#hs-focus-management-modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => handleCJDSignin()}
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Signin
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Manage Access Token */}
      <div
        id="hs-focus-management-modal-access-token"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="hs-focus-management-modal-label-access-token"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
              <h3
                id="hs-focus-management-modal-label-access-token"
                className="font-bold text-gray-800 dark:text-white"
              >
                Manage Access Token
              </h3>
              <div className="flex items-center justify-end  gap-3">
                <button
                  type="button"
                  onClick={() => handleTokenRefresh()}
                  className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-green-600 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                  aria-label="Close"
                >
                  <span className="sr-only">Refresh Token</span>
                  <SlRefresh />
                </button>
                <button
                  type="button"
                  className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                  aria-label="Close"
                  data-hs-overlay="#hs-focus-management-modal-access-token"
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
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4 overflow-y-auto">
              <label
                htmlFor="input-label-access-token"
                className="block text-sm font-medium mb-2 dark:text-white"
              >
                Access Token
              </label>
              <input
                type="email"
                value={signinInputs?.email}
                onChange={(e) =>
                  setSigninInputs((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
                readOnly
                id="input-label-access-token"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:placeholder-neutral-500 dark:text-neutral-400"
                placeholder="you@site.com"
                autoFocus={true}
              />
            </div>

            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                data-hs-overlay="#hs-focus-management-modal-access-token"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Signout otken */}
      <div
        id="hs-sign-out-alert-small-window-cjd-access-token"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="hs-sign-out-alert-small-window-label-cjd-access-token"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-xs sm:w-full m-3 sm:mx-auto">
          <div className="relative flex flex-col bg-white shadow-lg rounded-xl dark:bg-neutral-900">
            <div className="absolute top-2 end-2">
              <button
                type="button"
                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                aria-label="Close"
                data-hs-overlay="#hs-sign-out-alert-small-window-cjd-access-token"
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

            <div className="p-4 sm:p-10 text-center overflow-y-auto">
              <span className="mb-4 inline-flex justify-center items-center size-[62px] rounded-full border-4 border-yellow-50 bg-yellow-100 text-yellow-500 dark:bg-yellow-700 dark:border-yellow-600 dark:text-yellow-100">
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

              <h3
                id="hs-sign-out-alert-small-window-label-cjd-access-token"
                className="mb-2 text-2xl font-bold text-gray-800 dark:text-neutral-200"
              >
                Sign out
              </h3>
              <p className="text-gray-500 dark:text-neutral-500">
                Are you sure you would like to sign out of your CJ Dropshipping
                account?
              </p>

              <div className="mt-6 grid gap-y-2">
                <button
                  type="button"
                  onClick={() => handleCJDLogout()}
                  className="py-2.5 px-4 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                >
                  Sign out
                </button>
                <button
                  type="button"
                  className="py-2.5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  data-hs-overlay="#hs-sign-out-alert-small-window-cjd-access-token"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Account Settings */}
      <div
        id="hs-offcanvas-body-scrolling-cjd-user-account-settings"
        className="hs-overlay hs-overlay-open:translate-x-0 hidden translate-x-full fixed top-0 end-0 transition-all duration-300 transform h-full max-w-sm w-full z-[80] bg-white border-s dark:bg-neutral-800 dark:border-neutral-700 [--body-scroll:true] [--overlay-backdrop:false]"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="hs-offcanvas-body-scrolling-no-backdrop-label-cjd-user-account-settings"
      >
        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
          <h3
            id="hs-offcanvas-body-scrolling-no-backdrop-label-cjd-user-account-settings"
            className="font-bold text-gray-800 dark:text-white"
          >
            Account Settings
          </h3>
          <button
            type="button"
            className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
            aria-label="Close"
            data-hs-overlay="#hs-offcanvas-body-scrolling-cjd-user-account-settings"
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
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
        <div className="p-4">
          <CJDAccountSettings />
        </div>
      </div>
    </div>
  );
}
