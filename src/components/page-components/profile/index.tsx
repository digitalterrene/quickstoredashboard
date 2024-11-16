import ProfileComponent from "@/components/ui-components/profile";
import React from "react";

export default function ProfilePage({
  admin_information,
  account_information,
}: any) {
  return (
    <div>
      <ProfileComponent
        admin_information={admin_information}
        account_information={account_information?.account_information}
      />
    </div>
  );
}
