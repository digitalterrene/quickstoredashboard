"use client";
import AdminActionsComponent from "@/components/ui-components/admin-actions";
import React from "react";

export default function AdminActionsPage({ admin_information }: any) {
  return (
    <div className="">
      <AdminActionsComponent admin_information={admin_information} />
    </div>
  );
}
