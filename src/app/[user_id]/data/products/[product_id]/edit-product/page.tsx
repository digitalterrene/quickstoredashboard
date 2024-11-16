import { fetchData } from "@/api-calls/dashboard-data/products/fetchData";
import ProductEditPage from "@/components/page-components/data/products/ProductEditPage";
import { fetchData as fetchFilterData } from "@/api-calls/dashboard-data/fetchData";
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
  const type_ = searchParams.authenticationStatus;
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
  const predefined_filters_response = await fetchFilterData(
    id,
    type_,
    auth_id,
    token,
    "front_store_configuration"
  );
  return (
    <div className="h-full">
      <ProductEditPage
        product={product?.data?.results[0]}
        front_store_configuration={predefined_filters_response?.data}
        product_reviews={product_reviews?.data}
      />
    </div>
  );
}
