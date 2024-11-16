import { fetchData } from "@/api-calls/dashboard-data/fetchData";
import StoreBannersPage from "@/components/page-components/front-store-configs/StoreBannersPage";
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
  const requested_key = "front_store_configuration";
  const response = await fetchData(id, type_, auth_id, token, requested_key);

  return (
    <div className="  ">
      <StoreBannersPage response={response?.data?.banner} />
    </div>
  );
}
