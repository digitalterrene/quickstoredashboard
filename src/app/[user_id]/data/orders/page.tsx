import { fetchData } from "@/api-calls/dashboard-data/fetchData";
import OrdersPage from "@/components/page-components/data/orders/OrdersPage";
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
  const requested_key = "orders";
  const response = await fetchData(id, type_, auth_id, token, requested_key);
  const customers_response = await fetchData(
    id,
    type_,
    auth_id,
    token,
    "customers"
  );

  return (
    <div>
      <OrdersPage
        response={response}
        customers={customers_response?.data || []}
      />
    </div>
  );
}
