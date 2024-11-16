"use client";
import { fetchCJDAccountSettings } from "@/api-calls/suppliers/cjdropshipping/fetchCJDAccountSettings";
import { CJDAccessTokenResponse } from "@/ts-types/cjdropshipping";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface AccountSettingsProps {
  openId: number;
  openName: string;
  openEmail: string;
  setting: {
    quotaLimits: {
      quotaUrl: string;
      quotaLimit: number;
      quotaType: number;
    }[];
    qpsLimit: number;
  };
  callback: {
    productType: string;
    productCallbackUrls: string[];
  };
  root: string;
  isSandbox: boolean;
}

const CJDAccountSettings: React.FC = () => {
  const [accountSettings, setAccountSettings] =
    useState<AccountSettingsProps | null>(null);
  const [messageToDisplay, setMessageToDisplay] = useState(
    "Loading account settings..."
  );
  useEffect(() => {
    const handleFetchAccountSettings = async (): Promise<void> => {
      // const id = toast.loading("Fetching account settings...");

      try {
        const storedDataString = localStorage.getItem(
          "quickstoredashboard-cjd-user"
        );
        if (!storedDataString) {
          setMessageToDisplay("No CJ Dropshipping user found");
          throw new Error("No user data found in local storage");
        }

        const storedData: CJDAccessTokenResponse = JSON.parse(storedDataString);
        const accessToken = storedData?.data?.accessToken;

        if (!accessToken) {
          setMessageToDisplay("No CJ Dropshipping user found");
          throw new Error("No CJ Dropshipping access token found");
        }

        const accountSettings = await fetchCJDAccountSettings(accessToken);
        localStorage.setItem(
          "quickstoredashboard-cjd-account-settings",
          JSON.stringify(accountSettings)
        );
        setAccountSettings(accountSettings.data);
        // toast.update(id, {
        //   render: "Account settings fetched successfully",
        //   type: "success",
        //   isLoading: false,
        // });
        console.log({ accountSettings });
      } catch (err: any) {
        setMessageToDisplay("No CJ Dropshipping user found");
        // toast.update(id, {
        //   render: err.message,
        //   type: "error",
        //   isLoading: false,
        // });
        console.error("Fetch account settings error:", err.message);
      }

      setTimeout(() => {
        toast.dismiss();
      }, 5000);
    };

    const storedSettings = localStorage.getItem(
      "quickstoredashboard-cjd-account-settings"
    );
    if (storedSettings) {
      setAccountSettings(JSON.parse(storedSettings).data);
    } else {
      handleFetchAccountSettings();
    }
  }, []);

  if (!accountSettings) {
    return (
      <div className="flex items-center justify-center h-screen">
        {messageToDisplay}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
      <p className="mb-2">
        <strong>ID:</strong> {accountSettings?.openId}
      </p>
      <p className="mb-2">
        <strong>Name:</strong> {accountSettings?.openName}
      </p>
      <p className="mb-2">
        <strong>Email:</strong> {accountSettings?.openEmail}
      </p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Quota Limits</h2>
        <ul className="list-disc list-inside">
          {accountSettings?.setting?.quotaLimits?.map((quota, index) => (
            <li key={index} className="mb-2">
              <p>
                <strong>URL:</strong> {quota?.quotaUrl}
              </p>
              <p>
                <strong>Limit:</strong> {quota?.quotaLimit}
              </p>
              <p>
                <strong>Type:</strong> {quota?.quotaType}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <p className="mb-4">
        <strong>QPS Limit:</strong> {accountSettings?.setting?.qpsLimit}
      </p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Callback</h2>
        <p className="mb-2">
          <strong>Product Type:</strong>{" "}
          {accountSettings?.callback?.productType}
        </p>
        <ul className="list-disc list-inside">
          {accountSettings?.callback?.productCallbackUrls?.map((url, index) => (
            <li key={index} className="mb-2">
              {url}
            </li>
          ))}
        </ul>
      </div>
      <p className="mb-2">
        <strong>Root:</strong> {accountSettings.root}
      </p>
      <p className="mb-2">
        <strong>Sandbox Mode:</strong>{" "}
        {accountSettings.isSandbox ? "Yes" : "No"}
      </p>
    </div>
  );
};

export default CJDAccountSettings;
