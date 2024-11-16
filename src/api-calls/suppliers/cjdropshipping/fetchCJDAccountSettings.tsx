import { CJDAccountSettingsResponse } from "@/ts-types/cjdropshipping";

export const fetchCJDAccountSettings = async (
  accessToken: string
): Promise<CJDAccountSettingsResponse> => {
  const url = "https://developers.cjdropshipping.com/api2.0/v1/setting/get";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "CJ-Access-Token": accessToken,
    },
  });

  const result: CJDAccountSettingsResponse = await response.json();
  // console.log("Account Settings Response status:", response.status);
  // console.log("Account Settings Response body:", result);

  if (!response.ok || result.result === false) {
    throw new Error(result.message || "Failed to fetch account settings");
  }

  return result;
};
