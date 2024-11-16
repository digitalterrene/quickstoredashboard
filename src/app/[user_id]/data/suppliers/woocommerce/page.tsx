import WoocommercePage from "@/components/page-components/data/suppliers/WoocommercePage";
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
  const requested_key = "suppliers-configurations";
  const suppliers_configurations_response = await fetchData(
    id,
    type_,
    auth_id,
    token,
    requested_key
  );

  return (
    <div>
      <WoocommercePage
        suppliers_configurations={suppliers_configurations_response?.data}
      />
    </div>
  );
}
