import React, { useEffect, useState } from "react";
import { BiCheck, BiSave } from "react-icons/bi";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";

import DataHeaderPanel from "../data/DataHeaderPanel";
import ProfileTab from "../account-information/tabs/ProfileTab";
import ProfileCard from "../account-information/cards/ProfileCard";

import LegalInformationTab from "../account-information/tabs/LegalInformationTab";
import LegalInformationCard from "../account-information/cards/LegalInformationCard";
import BillingTab from "../account-information/tabs/BillingTab";

import BillingCard from "../account-information/cards/BillingCard";
import LocationTab from "../account-information/tabs/LocationTab";
import LocationCard from "../account-information/cards/LocationCard";

import { toast } from "react-toastify";
import { dashboard_server } from "@/data/urls";
import { useRouter } from "next/navigation";
import {
  useAccountInformationBillingInformationInputs,
  useAccountInformationCreateDashboardInputs,
  useAccountInformationFWCInformationInputs,
  useAccountInformationLegalInformationInputs,
  useAccountInformationLocationInformationInputs,
  useAccountInformationProfileInformationInputs,
} from "@/context/account-information";
import { updateAccountInformationData } from "@/api-calls/account-information/updateAccountInformationData";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function GettingStartedComponent() {
  // Define types for form data
  type SectionInputs = Record<string, any>;
  type FormData = {
    profile_information?: SectionInputs;
    legal_information?: SectionInputs;
    fwc_information?: SectionInputs;
    location_information?: SectionInputs;
    billing_information?: SectionInputs;
    create_dashboard?: SectionInputs;
  };

  const [steps, setSteps] = useState([
    {
      name: "create_dashboard",
      description: "Create your Quick Stores dashboard account",
      status: "current",
    },
    {
      name: "profile_information",
      description: "Update your profile information",
      status: "upcoming",
    },
    {
      name: "legal_information",
      description: "Update your legal information",
      status: "upcoming",
    },
    {
      name: "location_information",
      description: "Update your location information",
      status: "upcoming",
    },
    {
      name: "billing_information",
      description: "Update your billing information",
      status: "upcoming",
    },
    {
      name: "preview",
      description: "Preview your information",
      status: "upcoming",
    },
  ]);
  const {
    inputs: create_dashboard_inputs,
    setInputs: setCreateDashboardInputs,
  } = useAccountInformationCreateDashboardInputs();
  const { inputs: profile_information_inputs } =
    useAccountInformationProfileInformationInputs();
  const { inputs: legal_information_inputs } =
    useAccountInformationLegalInformationInputs();

  const { inputs: fwc_information_inputs } =
    useAccountInformationFWCInformationInputs();
  const { inputs: location_information_inputs } =
    useAccountInformationLocationInformationInputs();
  const { inputs: billing_information_inputs } =
    useAccountInformationBillingInformationInputs();
  let inputsToSave;

  const determineInitialFormData = (stepName: string): SectionInputs => {
    switch (stepName) {
      case "create_dashboard":
        return create_dashboard_inputs;
      case "profile_information":
        return profile_information_inputs;
      case "legal_information":
        return legal_information_inputs;
      case "fwc_information":
        return fwc_information_inputs;
      case "location_information":
        return location_information_inputs;
      case "billing_information":
        return billing_information_inputs;
      default:
        return {};
    }
  };
  const [currentStep, setCurrentStep] = useState(0);
  const stepName = steps[currentStep]?.name;

  const initialFormData = determineInitialFormData(stepName);
  const [formData, setFormData] = useState<FormData>({
    [stepName]: initialFormData,
  });

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      [stepName]: { ...determineInitialFormData(stepName) },
    }));
  }, [
    stepName,
    create_dashboard_inputs,
    profile_information_inputs,
    legal_information_inputs,
    fwc_information_inputs,
    location_information_inputs,
    billing_information_inputs,
  ]);

  const handleNext = () => {
    setSteps((prevSteps) => {
      const newSteps = [...prevSteps];
      if (currentStep < newSteps.length - 1) {
        newSteps[currentStep].status = "complete";
        newSteps[currentStep + 1].status = "current";
      }
      return newSteps;
    });
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };
  const router = useRouter();
  const handleBack = () => {
    setSteps((prevSteps) => {
      const newSteps = [...prevSteps];
      if (currentStep > 0) {
        newSteps[currentStep].status = "upcoming";
        newSteps[currentStep - 1].status = "current";
      }
      return newSteps;
    });
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const isStepCompleted = (stepIndex: number): boolean => {
    const sectionKeys = Object.keys(formData) as Array<keyof FormData>;
    const fields = sectionKeys.reduce((acc: string[], key) => {
      return acc.concat(Object.keys(formData[key] || {}));
    }, []);

    const stepFields = fields.filter((field) => {
      const section = sectionKeys.find((key) =>
        Object.keys(formData[key] || {}).includes(field)
      );
      return section
        ? stepIndex < steps.length - 1
        : stepIndex === steps.length - 1;
    });

    return stepFields.every((field) => !!formData[field as keyof FormData]);
  };

  const handleSaveSteps = async () => {
    const id = toast.loading("Processing...");

    try {
      let createDashboardResponse: any = null; // Variable to hold create_dashboard response

      // Execute create_dashboard step first
      const createDashboardResponsePromise = fetch(
        `${dashboard_server}/dashboards/upsert-new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          credentials: "include",
          body: JSON.stringify(create_dashboard_inputs),
        }
      ).then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          createDashboardResponse = data;
        }
        return response;
      });

      // Wait for create_dashboard response
      const createDashboardResult = await createDashboardResponsePromise;

      // Check if create_dashboard was successful
      if (createDashboardResult.ok && createDashboardResponse) {
        // Prepare promises for other steps only if create_dashboard was successful
        const promises = steps.map((step) => {
          switch (step.name) {
            case "profile_information":
              return updateAccountInformationData(
                createDashboardResponse._id,
                createDashboardResponse._id,
                createDashboardResponse.token,
                "account_information",
                "profile_information",
                profile_information_inputs
              );

            case "legal_information":
              return updateAccountInformationData(
                createDashboardResponse._id,
                createDashboardResponse._id,
                createDashboardResponse.token,
                "account_information",
                "legal_information",
                legal_information_inputs
              );

            case "fwc_information":
              return updateAccountInformationData(
                createDashboardResponse._id,
                createDashboardResponse._id,
                createDashboardResponse.token,
                "account_information",
                "fwc_information",
                fwc_information_inputs
              );

            case "location_information":
              return updateAccountInformationData(
                createDashboardResponse._id,
                createDashboardResponse._id,
                createDashboardResponse.token,
                "account_information",
                "location_information",
                location_information_inputs
              );

            case "billing_information":
              return updateAccountInformationData(
                createDashboardResponse._id,
                createDashboardResponse._id,
                createDashboardResponse.token,
                "account_information",
                "billing_information",
                billing_information_inputs
              );

            default:
              return null; // Return null for steps that don't require update
          }
        });

        // Wait for all promises to resolve
        const responses = await Promise.all(promises);

        // Check if all operations were successful
        const allSuccessful = responses.every((res) => {
          if (res instanceof Response) {
            return res.ok; // Check if fetch response is ok
          } else {
            return res && res.response === "ok"; // Check if custom response object has "response" property
          }
        });

        if (createDashboardResponse?._id) {
          toast.update(id, {
            render: "All information saved successfully",
            type: "success",
            isLoading: false,
          });

          localStorage.setItem("user", JSON.stringify(createDashboardResponse));
          const authenticationStatus = createDashboardResponse._id
            ? "logged-in"
            : "not-logged-in";
          const authenticationToken = createDashboardResponse.token
            ? `${createDashboardResponse.token}`
            : "No auth token provided";
          setTimeout(() => {
            router.push(
              `/${createDashboardResponse._id}/home?authenticationStatus=${authenticationStatus}&&authenticationToken=${authenticationToken}`
            );
          }, 2000);
        } else {
          toast.update(id, {
            render: "Failed to create dashboard",
            type: "error",
            isLoading: false,
          });
        }
      } else {
        // Handle case where create_dashboard failed
        toast.update(id, {
          render: "Failed to create dashboard",
          type: "error",
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.update(id, {
        render: "An error occurred while processing",
        type: "error",
        isLoading: false,
      });
    }

    setTimeout(() => {
      toast.dismiss();
    }, 5000);

    router.refresh(); // Refresh router to reflect changes
  };

  // console.log({ formData });
  return (
    <div className="lg:flex space-y-8 gap-4 items-start w-full px-2">
      <nav aria-label="Progress" className="space-y-6 w-full lg:w-1/4">
        <DataHeaderPanel
          title="Create An Account"
          description="New to Quick Stores Dashboard?. Create an account and a dashboard to get started"
        />

        <ol role="list" className="overflow-hidden w-full  ">
          {steps.map((step, stepIdx) => (
            <li
              key={step.name}
              className={classNames(
                stepIdx !== steps.length - 1 ? "pb-10" : "",
                "relative"
              )}
            >
              {isStepCompleted(stepIdx) || step.status === "complete" ? (
                <>
                  {stepIdx !== steps.length - 1 ? (
                    <div
                      className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-blue-500"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a
                    href="#"
                    // onClick={() => setCurrentStep(stepIdx)}
                    className="group relative flex items-start"
                  >
                    <span className="flex h-9 items-center">
                      <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 group-hover:bg-blue-600">
                        <BiCheck
                          className="h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                    <span className="ml-4 flex min-w-0 flex-col">
                      <span className="text-sm capitalize font-medium">
                        {step.name?.replaceAll("_", " ")}
                      </span>
                      <span className="text-sm text-gray-500">
                        {step.description}
                      </span>
                    </span>
                  </a>
                </>
              ) : step.status === "current" ? (
                <>
                  {stepIdx !== steps.length - 1 ? (
                    <div
                      className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a
                    href="#"
                    // onClick={() => setCurrentStep(stepIdx)}
                    className="group relative flex items-start"
                    aria-current="step"
                  >
                    <span className="flex h-9 items-center" aria-hidden="true">
                      <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-500 bg-white">
                        <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                      </span>
                    </span>
                    <span className="ml-4 flex min-w-0 flex-col">
                      <span className="text-sm font-medium text-blue-500">
                        {step.name?.replaceAll("_", " ")}
                      </span>
                      <span className="text-sm text-gray-500">
                        {step.description}
                      </span>
                    </span>
                  </a>
                </>
              ) : (
                <>
                  {stepIdx !== steps.length - 1 ? (
                    <div
                      className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a
                    href="#"
                    // onClick={() => setCurrentStep(stepIdx)}
                    className="group relative flex items-start"
                  >
                    <span className="flex h-9 items-center" aria-hidden="true">
                      <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                        <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                      </span>
                    </span>
                    <span className="ml-4 flex min-w-0 flex-col">
                      <span className="text-sm font-medium text-gray-500">
                        {step.name?.replaceAll("_", " ")}
                      </span>
                      <span className="text-sm text-gray-500">
                        {step.description}
                      </span>
                    </span>
                  </a>
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <div className="flex-1   px-2 w-full lg:w-3/4 space-y-4 ">
        <div className="flex  items-center justify-between">
          <div className="inline-flex   ">
            <button
              type="button"
              onClick={() => handleBack()}
              disabled={currentStep === 0}
              className="py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            >
              <span className="lg:hidden">
                <IoMdArrowBack />
              </span>
              <span className="hidden lg:block">Back</span>
            </button>
            <button
              type="button"
              onClick={() => handleNext()}
              disabled={currentStep === steps.length - 1}
              className="py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            >
              <span className="lg:hidden">
                <IoMdArrowForward />
              </span>
              <span className="hidden lg:block">
                {" "}
                {currentStep === steps.length - 2 ? "Finish" : "Next"}
              </span>
            </button>
          </div>
          <a
            href="/authentication/signin"
            className="py-1.5 focus:outline-none focus:ring-1 text-blue-600 focus:text-blue-500 focus:ring-blue-500 h-fit px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white   hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
          >
            Already have a Dashboard? Signin
          </a>
          <button
            onClick={() => handleSaveSteps()}
            disabled={currentStep !== 6}
            className="py-1.5 focus:outline-none focus:ring-1 focus:text-blue-500 focus:ring-blue-500 h-fit px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800  hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
          >
            <BiSave className="text-xl text-blue-500" />
            Save
          </button>
        </div>
        {currentStep === 0 ? (
          <div className="lg:max-w-lg px-4 ">
            <div className="bg-white rounded-xl border p-4 sm:p-7 dark:bg-neutral-900">
              <div className="flex items-start mb-4 justify-between">
                <div>
                  <h2 className="text-base capitalize font-semibold leading-7 text-gray-900">
                    {steps[currentStep]?.name?.replaceAll("_", " ")}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {steps[currentStep]?.description}
                  </p>
                </div>
              </div>

              <div>
                <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                  <label
                    htmlFor="af-payment-billing-contact"
                    className="inline-block text-sm font-medium dark:text-white"
                  >
                    Business Email
                  </label>
                  <div className="mt-2 space-y-3">
                    <input
                      type="email"
                      value={create_dashboard_inputs?.email}
                      onChange={(e) =>
                        setCreateDashboardInputs({ email: e.target.value })
                      }
                      id="af-payment-billing-contact"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Email"
                    />
                    <input
                      type="password"
                      value={create_dashboard_inputs?.password}
                      onChange={(e) =>
                        setCreateDashboardInputs({ password: e.target.value })
                      }
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Password"
                    />
                  </div>
                  <label
                    htmlFor="af-payment-billing-contact"
                    className="inline-block text-sm font-medium dark:text-white"
                  >
                    Security Information
                  </label>
                  <div className="mt-2 space-y-3">
                    <input
                      type="text"
                      value={create_dashboard_inputs?.access_key}
                      onChange={(e) =>
                        setCreateDashboardInputs({ access_key: e.target.value })
                      }
                      id="af-payment-billing-contact"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Access Key"
                    />
                    <input
                      type="text"
                      value={create_dashboard_inputs?.security_key}
                      onChange={(e) =>
                        setCreateDashboardInputs({
                          security_key: e.target.value,
                        })
                      }
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Security Key"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : currentStep === 1 ? (
          <div className="lg:flex space-y-5 lg:space-y-0 w-full gap-10 lg:px-4 items-start">
            <div className="w-full lg:w-7/12 border p-4 rounded-xl">
              <ProfileTab
                save_button_disabled={true}
                profile_information={{}}
              />
            </div>
            <div className="w-full lg:w-5/12">
              <ProfileCard profile_information={{}} />
            </div>
          </div>
        ) : currentStep === 2 ? (
          <div className="lg:flex space-y-5 lg:space-y-0 w-full gap-10 lg:px-4 items-start">
            <div className="w-full lg:w-7/12 border p-4 rounded-xl">
              <LegalInformationTab
                save_button_disabled={true}
                legal_information={{}}
              />{" "}
            </div>
            <div className="w-full lg:w-5/12">
              <LegalInformationCard legal_information={{}} />{" "}
            </div>
          </div>
        ) : currentStep === 3 ? (
          <div className="lg:flex space-y-5 lg:space-y-0 w-full gap-10 lg:px-4 items-start">
            <div className="w-full lg:w-7/12 border p-4 rounded-xl">
              <LocationTab
                save_button_disabled={true}
                location_information={{}}
              />{" "}
            </div>
            <div className="w-full lg:w-5/12">
              <LocationCard location_information={{}} />
            </div>
          </div>
        ) : currentStep === 4 ? (
          <div className="lg:flex space-y-5 lg:space-y-0 w-full gap-10 lg:px-4 items-start">
            <div className="w-full lg:w-7/12 border p-4 rounded-xl">
              <BillingTab
                save_button_disabled={true}
                billing_information={{}}
              />{" "}
            </div>
            <div className="w-full lg:w-5/12">
              <BillingCard billing_information={{}} />{" "}
            </div>
          </div>
        ) : currentStep === 5 ? (
          <div className="grid  px-4 grid-cols-3 gap-4">
            {Object.entries(formData)
              ?.slice(0, Object.entries(formData)?.length - 1)
              .map(([section, fields]) => (
                <div key={section} className="bg-white p-4 border rounded-md">
                  <h2 className="font-semibold text-gray-500 capitalize mb-2">
                    {section}
                  </h2>
                  <ul>
                    {Object.entries(
                      fields as { [key: string]: string | number }
                    ).map(([field, value]) => (
                      <li key={field} className="text-sm">
                        <span className="text-gray-500">{field}:</span> {value}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
