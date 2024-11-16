import { getAccessToken } from "@/api-calls/suppliers/cjdropshipping/getAccessToken";
import { useSideNavInputs } from "@/context";

import { useAuthContext } from "@/context/auth-context/AuthContext";
import React, { ReactNode, useState } from "react";

import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";
import { toast } from "react-toastify";

import { refreshAccessToken } from "@/api-calls/suppliers/cjdropshipping/refreshAccessToken";
import { logoutToken } from "@/api-calls/suppliers/cjdropshipping/logoutToken";

import CJDCategorySearchBox from "../components/CJDCategorySearchBox";
import { CJDUserData } from "@/ts-types/cjdropshipping";
import { CiShare1 } from "react-icons/ci";
import useNavigation from "@/utils/handleNavigate";

export default function SuppliersHeaderPanel({
  title,
  supplier,
  description,
  SETTINGS_COMPONENT,
}: {
  title: string;
  description: string;
  supplier: string;
  SETTINGS_COMPONENT: ReactNode;
}) {
  const { isGridMode, toggleIsGridMode } = useSideNavInputs();
  const { user } = useAuthContext();
  const { handleQuickNavigate } = useNavigation();
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
      console.log({ cjd: data });
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
    <div className="flex items-center  justify-between">
      <nav className="flex   space-x-1">
        <div className="sm:col-span-1">
          <h2 className="text-xl capitalize font-semibold text-gray-800 dark:text-neutral-200">
            {title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            {description}
          </p>
        </div>
      </nav>
      <div className="items-center   flex   space-x-4">
        <button
          type="button"
          onClick={() =>
            handleQuickNavigate(`data/suppliers/${supplier}`, user)
          }
          className="hs-dropdown-toggle text-2xl font-bold stroke-2 p-2 inline-flex items-center gap-x-2   rounded-lg   border-gray-200 bg-blue-100 hover:bg-blue-600 hover:text-white text-blue-600 shadow-sm  focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
        >
          <CiShare1 className="text-lg " />
        </button>
        <div className="  relative inline-flex gap-4 ">
          <div className="  h-fit flex items-center">
            <CJDCategorySearchBox />
          </div>
        </div>
        <div className="inline-flex border gap-3 border-gray-200 rounded-lg p-1 dark:border-neutral-700">
          <button
            type="button"
            onClick={() => toggleIsGridMode()}
            className={`inline-flex flex-shrink-0 justify-center items-center p-1 rounded text-${
              !isGridMode ? "gray-500" : "white"
            } hover:bg-blue-100 bg-${
              isGridMode ? "blue-500" : "transparent"
            } hover:text-blue-800 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200`}
          >
            <HiOutlineViewList className="text-lg" />
          </button>

          <button
            type="button"
            onClick={() => toggleIsGridMode()}
            className={`inline-flex flex-shrink-0 justify-center items-center p-1 rounded text-${
              isGridMode ? "gray-500" : "white"
            } hover:bg-blue-100 bg-${
              !isGridMode ? "blue-500" : "transparent"
            } hover:text-blue-800 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200`}
          >
            <HiOutlineViewGrid className="text-lg" />
          </button>
        </div>

        {SETTINGS_COMPONENT}
      </div>
    </div>
  );
}
