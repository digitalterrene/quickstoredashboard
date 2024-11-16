import { fetchData } from "@/api-calls/dashboard-data/fetchData";
import ManagementPage from "@/components/page-components/management/ManagementPage";
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
  const administrators = await fetchData(
    id,
    type_,
    auth_id,
    token,
    "administrators"
  );
  const employees = await fetchData(id, type_, auth_id, token, "employees");
  const customers = await fetchData(id, type_, auth_id, token, "customers");
  const quickstoredashboard_assistants = await fetchData(
    id,
    type_,
    auth_id,
    token,
    "quickstoredashboard_assistants"
  );
  const participations = await fetchData(
    id,
    type_,
    auth_id,
    token,
    "participations"
  );
  const legal_entities = await fetchData(
    id,
    type_,
    auth_id,
    token,
    "legal_entities"
  );

  return (
    <div>
      <ManagementPage
        response={{
          administrators: administrators?.data,
          employees: employees?.data,
          customers: customers?.data,
          quickstoredashboard_assistants: quickstoredashboard_assistants?.data,
          participations: participations?.data,
          legal_entities: legal_entities?.data,
        }}
      />
    </div>
  );
}
