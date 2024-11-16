import {
  CJDProductDetailsResponse,
  FetchCJDProductDetailsParams,
} from "@/ts-types/cjdropshipping";

export const fetchCJDProductDetails = async (
  accessToken: string,
  params: FetchCJDProductDetailsParams
): Promise<CJDProductDetailsResponse> => {
  const url = new URL(
    "https://developers.cjdropshipping.com/api2.0/v1/product/query"
  );

  // Append query parameters to the URL
  Object.keys(params).forEach((key) => {
    if (params[key as keyof FetchCJDProductDetailsParams] !== undefined) {
      url.searchParams.append(
        key,
        String(params[key as keyof FetchCJDProductDetailsParams])
      );
    }
  });

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "CJ-Access-Token": accessToken,
    },
  });

  const result: CJDProductDetailsResponse = await response.json();
  // console.log("Product Details Response status:", response.status);
  // console.log("Product Details Response body:", result);

  if (!response.ok || result.result === false) {
    // throw new Error(result.message || "Failed to fetch product details");
  }

  return result;
};
