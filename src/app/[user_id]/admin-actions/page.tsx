import { fetchData } from "@/api-calls/dashboard-data/fetchData";
import AdminActionsPage from "@/components/page-components/admin-actions";
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
  const email = await fetchData(id, type_, auth_id, token, "email");
  const username = await fetchData(id, type_, auth_id, token, "username");
  const image = await fetchData(id, type_, auth_id, token, "image");
  const password = await fetchData(id, type_, auth_id, token, "password");
  const access_key = await fetchData(id, type_, auth_id, token, "access_key");
  const security_key = await fetchData(
    id,
    type_,
    auth_id,
    token,
    "security_key"
  );
  const user_id = await fetchData(id, type_, auth_id, token, "user_id");
  const tagline = await fetchData(id, type_, auth_id, token, "tagline");
  const description = await fetchData(id, type_, auth_id, token, "description");

  return (
    <div className=" ">
      <AdminActionsPage
        admin_information={{
          email: email?.data,
          username: username?.data,
          image: image?.data,
          password: password?.data,
          access_key: access_key?.data,
          security_key: security_key?.data,
          user_id: user_id?.data,
          tagline: tagline?.data,
          description: description?.data,
        }}
      />
    </div>
  );
}
