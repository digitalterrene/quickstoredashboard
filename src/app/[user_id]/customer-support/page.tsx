import { fetchData } from "@/api-calls/dashboard-data/fetchData";
import CustomerSupportPage from "@/components/page-components/customer-support/CustomerSupportPage";
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
  const requested_key = "customer_support";
  const response = await fetchData(id, type_, auth_id, token, requested_key);

  const auto_messages_response = await fetchData(
    id,
    type_,
    auth_id,
    token,
    "auto_messages"
  );
  // console.log({ auto_messages_response: auto_messages_response?.data });
  return (
    <div>
      <CustomerSupportPage
        response={response}
        auto_messages={auto_messages_response?.data}
      />
    </div>
  );
}
