import { fetchData } from "@/api-calls/dashboard-data/fetchData";
import Dashboard from "@/components/page-components/dashboard/Dashboard";
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
  const products = await fetchData(id, type_, auth_id, token, "products");
  const orders = await fetchData(id, type_, auth_id, token, "orders");
  const invoices = await fetchData(id, type_, auth_id, token, "invoices");
  const sales = await fetchData(id, type_, auth_id, token, "sales");
  const target_data_response = await fetchData(
    id,
    type_,
    auth_id,
    token,
    "analytics"
  );
  return (
    <div>
      <Dashboard
        target_data={target_data_response?.data?.target_data}
        response={{
          products: products?.data,
          orders: orders?.data,
          invoices: invoices?.data,
          sales: sales?.data,
        }}
      />
    </div>
  );
}
