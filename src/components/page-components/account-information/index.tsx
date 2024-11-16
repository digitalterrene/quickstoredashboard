"use client";
import AccountInformationComponent from "@/components/ui-components/account-information";
import React from "react";

export default function AccountInformationPage({ account_information }: any) {
  return (
    <div className="">
      <AccountInformationComponent account_information={account_information} />
    </div>
  );
}
