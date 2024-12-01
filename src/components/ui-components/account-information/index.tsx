import { useState } from "react";
import { ImProfile } from "react-icons/im";

import { BiCreditCard, BiLock, BiNotification } from "react-icons/bi";
import { MdMenu } from "react-icons/md";
import LocationTab from "./tabs/LocationTab";

import BillingTab from "./tabs/BillingTab";
import LegalInformationTab from "./tabs/LegalInformationTab";
import ProfileTab from "./tabs/ProfileTab";

import ProfileCard from "./cards/ProfileCard";
import LocationCard from "./cards/LocationCard";
import BillingCard from "./cards/BillingCard";
import { GoLaw } from "react-icons/go";

import { GrLocation } from "react-icons/gr";
import LegalInformationCard from "./cards/LegalInformationCard";

const subNavigation = [
  { name: "profile", href: "#", icon: <ImProfile />, current: true },
  { name: "legal_information", href: "#", icon: <BiLock />, current: false },
  { name: "fwc_credentials", href: "#", icon: <BiLock />, current: false },
  {
    name: "location",
    href: "#",
    icon: <BiNotification />,
    current: false,
  },
  { name: "billing", href: "#", icon: <BiCreditCard />, current: false },
  { name: "permissions", href: "#", icon: <MdMenu />, current: false },
];

export default function AccountInformationComponent({
  account_information,
}: any) {
  const [activeTab, setActiveTab] = useState<string>(subNavigation[0]?.name);
  return (
    <div>
      <main className="relative ">
        <div className="max-w-screen-2xl mx-auto   px-4 sm:px-6  lg:px-8">
          <div className="bg-white   overflow-hidden">
            <div className="  h-full lg:flex items-start   ">
              <div className=" w-full lg:w-4/12  py-5 h-full ">
                <nav className="space-y-1 ">
                  <div className="flex   flex-wrap">
                    <div className="  border-gray-200   dark:border-neutral-700">
                      <header className="relative  mb-3">
                        <div className="max-w-7xl mx-auto ">
                          <h1 className="text-3xl font-bold ">Settings</h1>
                        </div>
                      </header>{" "}
                      <nav
                        className="flex flex-col space-y-2"
                        aria-label="Tabs"
                        role="tablist"
                        data-hs-tabs-vertical="true"
                      >
                        <div className="flex  pr-5  items-start w-full flex-wrap">
                          <div className=" w-full items-start dark:border-neutral-700">
                            <nav
                              className="flex items-center lg:items-start w-full flex-wrap lg:flex-col  space-y-2"
                              aria-label="Tabs"
                              role="tablist"
                              data-hs-tabs-vertical="true"
                            >
                              <button
                                type="button"
                                onClick={() => setActiveTab("profile")}
                                className="hs-tab-active:border-blue-500 w-full hs-tab-active:bg-blue-100   hs-tab-active:text-blue-600 pl-3 dark:hs-tab-active:text-blue-600 py-1.5 pe-4 inline-flex items-center gap-x-2 border-s-[8px] rounded-lg border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500 active"
                                id="vertical-tab-with-border-item-1"
                                data-hs-tab="#vertical-tab-with-border-1"
                                aria-controls="vertical-tab-with-border-1"
                                role="tab"
                              >
                                <ImProfile className="text-xl" />
                                <span>Profile</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setActiveTab("legal")}
                                className="hs-tab-active:border-blue-500 w-full hs-tab-active:bg-blue-100 rounded-lg hs-tab-active:text-blue-600 pl-3 dark:hs-tab-active:text-blue-600 py-1.5 pe-4 inline-flex items-center gap-x-2 border-s-[8px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500"
                                id="vertical-tab-with-border-item-2"
                                data-hs-tab="#vertical-tab-with-border-2"
                                aria-controls="vertical-tab-with-border-2"
                                role="tab"
                              >
                                {" "}
                                <GoLaw className="text-xl" />
                                <span>Legal Information</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setActiveTab("location")}
                                className="hs-tab-active:border-blue-500 w-full hs-tab-active:bg-blue-100 rounded-lg hs-tab-active:text-blue-600 pl-3 dark:hs-tab-active:text-blue-600 py-1.5 pe-4 inline-flex items-center gap-x-2 border-s-[8px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500"
                                id="vertical-tab-with-border-item-4"
                                data-hs-tab="#vertical-tab-with-border-4"
                                aria-controls="vertical-tab-with-border-4"
                                role="tab"
                              >
                                <GrLocation className="text-xl" />
                                <span>Location</span>
                              </button>{" "}
                              <button
                                type="button"
                                onClick={() => setActiveTab("billing")}
                                className="hs-tab-active:border-blue-500 w-full hs-tab-active:bg-blue-100 rounded-lg hs-tab-active:text-blue-600 pl-3 dark:hs-tab-active:text-blue-600 py-1.5 pe-4 inline-flex items-center gap-x-2 border-s-[8px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500"
                                id="vertical-tab-with-border-item-5"
                                data-hs-tab="#vertical-tab-with-border-5"
                                aria-controls="vertical-tab-with-border-5"
                                role="tab"
                              >
                                <BiCreditCard className="text-xl" />
                                <span>Billing</span>
                              </button>
                            </nav>
                          </div>
                        </div>
                      </nav>
                    </div>
                  </div>
                </nav>
              </div>
              <div className="bg-gray-50 border-r h-full border-l w-full  ">
                <div
                  id="vertical-tab-with-border-1"
                  role="tabpanel"
                  className="p-6"
                  aria-labelledby="vertical-tab-with-border-item-1"
                >
                  <ProfileTab
                    profile_information={
                      account_information?.profile_information
                    }
                  />
                </div>
                <div
                  id="vertical-tab-with-border-2"
                  className="hidden p-6"
                  role="tabpanel"
                  aria-labelledby="vertical-tab-with-border-item-2"
                >
                  <div>
                    <LegalInformationTab
                      legal_information={account_information?.legal_information}
                    />
                  </div>
                </div>

                <div
                  id="vertical-tab-with-border-4"
                  className="hidden p-6"
                  role="tabpanel"
                  aria-labelledby="vertical-tab-with-border-item-4"
                >
                  <div>
                    <LocationTab
                      location_information={
                        account_information?.location_information
                      }
                    />
                  </div>
                </div>
                <div
                  id="vertical-tab-with-border-5"
                  className="hidden p-6"
                  role="tabpanel"
                  aria-labelledby="vertical-tab-with-border-item-5"
                >
                  <div>
                    <BillingTab
                      billing_information={
                        account_information?.billing_information
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="min-w-4/12 p-4   ">
                <div className="lg:w-[380px] w-full space-y-4">
                  {activeTab === "profile" ? (
                    <ProfileCard
                      profile_information={
                        account_information?.profile_information
                      }
                    />
                  ) : activeTab === "location" ? (
                    <LocationCard
                      location_information={
                        account_information?.location_information
                      }
                    />
                  ) : activeTab === "billing" ? (
                    <BillingCard
                      billing_information={
                        account_information?.billing_information
                      }
                    />
                  ) : activeTab === "legal" ? (
                    <LegalInformationCard
                      legal_information={account_information?.legal_information}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
