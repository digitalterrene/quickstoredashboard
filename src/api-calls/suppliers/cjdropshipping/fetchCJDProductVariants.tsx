import {
  CJDVariantResponse,
  FetchCJDVariantsParams,
} from "@/ts-types/cjdropshipping";

export const fetchCJDProductVariants = async (
  accessToken: string,
  params: FetchCJDVariantsParams
): Promise<CJDVariantResponse> => {
  const url = new URL(
    "https://developers.cjdropshipping.com/api2.0/v1/product/variant/query"
  );

  // Append query parameters to the URL
  Object.keys(params).forEach((key) => {
    if (params[key as keyof FetchCJDVariantsParams] !== undefined) {
      url.searchParams.append(
        key,
        String(params[key as keyof FetchCJDVariantsParams])
      );
    }
  });

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "CJ-Access-Token": accessToken,
    },
  });

  const result: CJDVariantResponse = await response.json();
  // console.log("Product Variants Response status:", response.status);
  console.log("Product Variants Response body:", result);

  if (!response.ok || result.result === false) {
    // throw new Error(result.message || "Failed to fetch product variants");
  }

  return result;
};
