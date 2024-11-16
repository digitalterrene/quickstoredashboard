import { fetchData } from "@/api-calls/dashboard-data/fetchData";
import ProductsPage from "@/components/page-components/data/products/ProductsPage";
import React from "react";

export default async function page({
  searchParams,
  params,
}: {
  searchParams: any;
  params: any;
}) {
  const id = params.user_id;
  const type_ = searchParams.authenticationStatus;
  const auth_id = searchParams.authenticationID;
  const token = searchParams.authenticationToken;
  const requested_key = "products";
  const response = await fetchData(id, type_, auth_id, token, requested_key);
  const categories_response = await fetchData(
    id,
    type_,
    auth_id,
    token,
    "front_store_configuration"
  );
  const suppliers_configurations_response = await fetchData(
    id,
    type_,
    auth_id,
    token,
    "suppliers-configurations"
  );
  const predefined_filters_response = await fetchData(
    id,
    type_,
    auth_id,
    token,
    "front_store_configuration"
  );
  return (
    <div>
      <ProductsPage
        response={response}
        suppliers_configurations_response={
          suppliers_configurations_response?.data
        }
        front_store_configuration={predefined_filters_response?.data}
        product_categories={categories_response?.data?.categories?.categories}
      />
    </div>
  );
}
