import { fetchMultipleStoreData } from "@/api-calls/dashboard-data/fetchSingleData";
import { fetchData } from "@/api-calls/dashboard-data/products/fetchData";
import ProductView from "@/components/page-components/data/products/ProductView";
import React from "react";

export default async function page({
  searchParams,
  params,
}: {
  searchParams: any;
  params: any;
}) {
  const id = params.user_id;
  const auth_id = searchParams.authenticationID;
  const page = searchParams.page || 1;
  const token = searchParams.authenticationToken;
  const search_key = "_id";
  const search_value = params.product_id;
  const requested_key = "products";
  const product = await fetchData(
    id,
    auth_id,
    token,
    search_key,
    search_value,
    requested_key,
    page
  );

  const product_reviews = await fetchData(
    product?.data?.results[0]?.user_id, //this should be the user_id of the fetched product
    auth_id,
    token,
    "product_id",
    `${params.product_id}`,
    "reviews",
    page
  );
  return (
    <div>
      <ProductView
        product={product?.data?.results[0]}
        product_reviews={product_reviews?.data}
      />
    </div>
  );
}
