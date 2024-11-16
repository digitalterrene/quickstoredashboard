import React from "react";
import ProfileCard from "../account-information/cards/ProfileCard";

export default function ActiveChatProfileView({
  profile_information,
}: {
  profile_information: any;
}) {
  return (
    <div>
      <ProfileCard profile_information={profile_information} />
    </div>
  );
}
