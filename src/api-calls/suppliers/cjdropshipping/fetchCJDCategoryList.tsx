import { CJDCategoryResponse } from "@/ts-types/cjdropshipping";

export const fetchCJDCategoryList = async (
  accessToken: string
): Promise<CJDCategoryResponse> => {
  const url =
    "https://developers.cjdropshipping.com/api2.0/v1/product/getCategory";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "CJ-Access-Token": accessToken,
      },
    });

    const result: CJDCategoryResponse = await response.json();
    // console.log("Category List Response status:", response.status);
    // console.log("Category List Response body:", result);

    if (!response.ok || result.result === false) {
      const errorMessage = result.message || "Failed to fetch category list";
      console.error("Error:", errorMessage);

      // throw new Error(errorMessage);
    }

    return result;
  } catch (error) {
    console.error("Exception caught:", error);
    throw error; // Ensure that the exception propagates
  }
};
