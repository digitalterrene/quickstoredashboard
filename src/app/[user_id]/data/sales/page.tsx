import { fetchData } from "@/api-calls/dashboard-data/fetchData";
import SalesPage from "@/components/page-components/data/sales/SalesPage";
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
  const requested_key = "sales";
  const response = await fetchData(id, type_, auth_id, token, requested_key);
  const customers = await fetchData(id, type_, auth_id, token, "customers");

  return (
    <div className=" ">
      <SalesPage response={response} customers={customers?.data || []} />
    </div>
  );
}
