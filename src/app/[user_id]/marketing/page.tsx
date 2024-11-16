import { fetchData } from "@/api-calls/dashboard-data/fetchData";
import Dashboard from "@/components/page-components/dashboard/Dashboard";
import MarketingPage from "@/components/page-components/marketing/MarketingPage";
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
  const social_accounts = await fetchData(
    id,
    type_,
    auth_id,
    token,
    "social_accounts"
  );
  const featured_products = await fetchData(
    id,
    type_,
    auth_id,
    token,
    "featured_products"
  );
  const ads = await fetchData(id, type_, auth_id, token, "ads");
  const promotions = await fetchData(id, type_, auth_id, token, "promotions");
  const coupons = await fetchData(id, type_, auth_id, token, "coupons");
  const newsletters = await fetchData(id, type_, auth_id, token, "newsletters");

  const target_data_response = await fetchData(
    id,
    type_,
    auth_id,
    token,
    "analytics"
  );
  return (
    <div>
      <MarketingPage
        target_data={target_data_response?.data?.target_data}
        response={{
          social_accounts: social_accounts?.data,
          featured_products: featured_products?.data,
          ads: ads?.data,
          promotions: promotions?.data,
          coupons: coupons?.data,
          newsletters: newsletters?.data,
        }}
      />
    </div>
  );
}
