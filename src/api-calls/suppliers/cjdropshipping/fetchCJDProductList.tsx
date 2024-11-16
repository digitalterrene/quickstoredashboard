import {
  CJDProductResponse,
  FetchCJDProductsParams,
} from "@/ts-types/cjdropshipping";

export const fetchCJDProductList = async (
  accessToken: string,
  params: FetchCJDProductsParams
): Promise<CJDProductResponse> => {
  const url = new URL(
    "https://developers.cjdropshipping.com/api2.0/v1/product/list"
  );

  // Append query parameters to the URL
  Object.keys(params).forEach((key) => {
    if (params[key as keyof FetchCJDProductsParams] !== undefined) {
      url.searchParams.append(
        key,
        String(params[key as keyof FetchCJDProductsParams])
      );
    }
  });

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "CJ-Access-Token": accessToken,
    },
  });

  const result: CJDProductResponse = await response.json();
  // console.log("Product List Response status:", response.status);
  // console.log("Product List Response body:", result);

  if (!response.ok || result.result === false) {
    //   throw new Error(result.message || "Failed to fetch product list");
  }

  return result;
};
