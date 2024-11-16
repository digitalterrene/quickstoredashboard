"use client";
import ProfileHeader from "./profileheader";
import LegalInformationBlock from "./tabs/LegalInformationBlock";
import BillingInfoBlock from "./tabs/BillingInfoBlock";

import LocationBlock from "./tabs/LocationBlock";
import ProfileCard from "../account-information/cards/ProfileCard";

export default function ProfileComponent({
  admin_information,
  account_information,
}: {
  admin_information: any;
  account_information: any;
}) {
  const {
    billing_information,
    fwc_information,
    legal_information,
    location_information,
    profile_information,
  } = account_information;

  return (
    <div className="min-h-full p-4">
      <main className="space-y-6">
        <ProfileHeader admin_information={admin_information} />
        <div className=" lg:px-8 px-2 max-w-3xl mx-auto grid grid-cols-1 gap-6  lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 w-full  lg:col-start-1 lg:col-span-2">
            <LegalInformationBlock legal_information={legal_information} />
          </div>
          <section
            aria-labelledby="timeline-title"
            className="lg:col-start-3 space-y-6 lg:col-span-1"
          >
            <ProfileCard profile_information={profile_information} />
            <BillingInfoBlock billing_information={billing_information} />
            <LocationBlock location_information={location_information} />
          </section>
        </div>
      </main>
    </div>
  );
}
