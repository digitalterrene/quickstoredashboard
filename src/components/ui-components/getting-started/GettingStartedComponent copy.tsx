import React, { useState } from "react";
import { BiCheck } from "react-icons/bi";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import DataHeaderPanel from "../data/DataHeaderPanel";

const steps = [
  {
    name: "Create user",
    description: "Create your Quick Dashboard user account",
    status: "complete",
  },
  {
    name: "Create dashboard",
    description: "Create your Quick Stores dashboard account",
    status: "complete",
  },
  {
    name: "Profile information",
    description: "Update your profile information",
    status: "current",
  },
  {
    name: "Legal information",
    description: "Update your legal information",
    status: "upcoming",
  },
  {
    name: "Location information",
    description: "Update your location information",
    status: "upcoming",
  },
  {
    name: "Billing information",
    description: "Update your billing information",
    status: "upcoming",
  },
  {
    name: "Preview",
    description: "Preview your information",
    status: "upcoming",
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
type FormDataType = {
  [section: string]: {
    [field: string]: string | number | null | undefined; // Adjust based on your actual field types
  };
};
const initialFormData: FormDataType = {
  user: { email: "", password: "", accessKey: "", securityKey: "" },
  dashboard: {
    businessName: "",
    businessEmail: "",
    businessPhone: "",
    businessAddress: "",
  },
  profile: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    bio: "",
  },
  legal: {
    image: null,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    bio: "",
  },
  fwc: {
    image: null,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    bio: "",
    streetAddress: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
  },
  location: {
    streetAddress: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
  },
  billing: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    streetAddress: "",
    apartment: "",
    postalCode: "",
    city: "",
    state: "",
    nameOnCard: "",
    cardNumber: "",
    expirationDate: "",
    cvvCode: "",
  },
};

export default function GettingStartedComponentCopy() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>(initialFormData);

  const handleInputChange = (section: any, field: any, value: any) => {
    setFormData({
      ...formData,
      [section]: { ...formData[section], [field]: value },
    });
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const isStepCompleted = (stepIndex: number): boolean => {
    const sectionKeys = Object.keys(formData) as Array<keyof FormData>;
    const fields = sectionKeys.reduce((acc: string[], key) => {
      return acc.concat(Object.keys(formData[key]));
    }, []);

    const stepFields = fields.filter((field) => {
      const section = sectionKeys.find((key) =>
        Object.keys(formData[key]).includes(field)
      );
      return section
        ? stepIndex < steps.length - 1
        : stepIndex === steps.length - 1;
    });

    return stepFields.every((field) => !!formData[field]);
  };
  return (
    <div className="flex gap-4 items-start px-2">
      <nav aria-label="Progress" className="space-y-6">
        <DataHeaderPanel
          title="Orders"
          description="Add orders,edit and more"
        />

        <ol role="list" className="overflow-hidden">
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
                      className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-indigo-600"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a
                    href="#"
                    onClick={() => setCurrentStep(stepIdx)}
                    className="group relative flex items-start"
                  >
                    <span className="flex h-9 items-center">
                      <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                        <BiCheck
                          className="h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                    <span className="ml-4 flex min-w-0 flex-col">
                      <span className="text-sm font-medium">{step.name}</span>
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
                    onClick={() => setCurrentStep(stepIdx)}
                    className="group relative flex items-start"
                    aria-current="step"
                  >
                    <span className="flex h-9 items-center" aria-hidden="true">
                      <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white">
                        <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                      </span>
                    </span>
                    <span className="ml-4 flex min-w-0 flex-col">
                      <span className="text-sm font-medium text-indigo-600">
                        {step.name}
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
                    onClick={() => setCurrentStep(stepIdx)}
                    className="group relative flex items-start"
                  >
                    <span className="flex h-9 items-center" aria-hidden="true">
                      <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                        <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                      </span>
                    </span>
                    <span className="ml-4 flex min-w-0 flex-col">
                      <span className="text-sm font-medium text-gray-500">
                        {step.name}
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
      <div className="flex-1 space-y-4 ">
        <div className="inline-flex px-4 rounded-lg shadow-sm">
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
        {currentStep === 0 && (
          <div className="max-w-2xl px-4 ">
            <div className="bg-white rounded-xl border p-4 sm:p-7 dark:bg-neutral-900">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-neutral-200">
                  {steps[currentStep]?.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                  {steps[currentStep]?.description}
                </p>
              </div>

              <form>
                <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                  <label
                    htmlFor="af-payment-billing-contact"
                    className="inline-block text-sm font-medium dark:text-white"
                  >
                    Full Business Name
                  </label>
                  <div className="mt-2 space-y-3">
                    <input
                      type="email"
                      value={formData.user.email}
                      onChange={(e) =>
                        handleInputChange("user", "email", e.target.value)
                      }
                      id="af-payment-billing-contact"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Email"
                    />
                    <input
                      type="password"
                      value={formData.user.password}
                      onChange={(e) =>
                        handleInputChange("user", "password", e.target.value)
                      }
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Password"
                    />
                  </div>
                  <label
                    htmlFor="af-payment-billing-contact"
                    className="inline-block text-sm font-medium dark:text-white"
                  >
                    Contact Information
                  </label>
                  <div className="mt-2 space-y-3">
                    <input
                      type="text"
                      value={formData.user.accessKey}
                      onChange={(e) =>
                        handleInputChange("user", "accessKey", e.target.value)
                      }
                      id="af-payment-billing-contact"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Access Key"
                    />
                    <input
                      type="text"
                      value={formData.user.securityKey}
                      onChange={(e) =>
                        handleInputChange("user", "securityKey", e.target.value)
                      }
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Security Key"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        {currentStep === 1 && (
          <div className="max-w-2xl px-4 ">
            <div className="bg-white rounded-xl border p-4 sm:p-7 dark:bg-neutral-900">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-neutral-200">
                  {steps[currentStep]?.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                  {steps[currentStep]?.description}
                </p>
              </div>

              <form>
                <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                  <label
                    htmlFor="af-payment-billing-contact"
                    className="inline-block text-sm font-medium dark:text-white"
                  >
                    Full Business Name
                  </label>
                  <div className="mt-2 space-y-3">
                    <input
                      type="text"
                      value={formData.fwc.name}
                      onChange={(e) =>
                        handleInputChange("fwc", "name", e.target.value)
                      }
                      id="af-payment-billing-contact"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="First Name"
                    />
                    <input
                      type="text"
                      value={formData.fwc.extension}
                      onChange={(e) =>
                        handleInputChange("fwc", "extension", e.target.value)
                      }
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Last Name"
                    />
                  </div>
                  <label
                    htmlFor="af-payment-billing-contact"
                    className="inline-block text-sm font-medium dark:text-white"
                  >
                    Contact Information
                  </label>
                  <div className="mt-2 space-y-3">
                    <input
                      type="text"
                      value={formData.fwc.email}
                      onChange={(e) =>
                        handleInputChange("fwc", "email", e.target.value)
                      }
                      id="af-payment-billing-contact"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Email Address"
                    />
                    <input
                      type="text"
                      value={formData.fwc.phone_number}
                      onChange={(e) =>
                        handleInputChange("fwc", "phone_number", e.target.value)
                      }
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Phone Number"
                    />
                  </div>
                  <label
                    htmlFor="af-payment-billing-contact"
                    className="inline-block text-sm font-medium dark:text-white"
                  >
                    Gender Information
                  </label>
                </div>

                <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                  <label
                    htmlFor="af-payment-billing-address"
                    className="inline-block text-sm font-medium dark:text-white"
                  >
                    Location
                  </label>

                  <div className="mt-2 space-y-3">
                    <input
                      value={formData.billing.streetAddress}
                      onChange={(e) =>
                        handleInputChange(
                          "fwc",
                          "streetAddress",
                          e.target.value
                        )
                      }
                      id="af-payment-billing-address"
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Street Address"
                    />
                    <input
                      value={formData.billing.apartment}
                      onChange={(e) =>
                        handleInputChange("fwc", "apartment", e.target.value)
                      }
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Apt, Syuite, Building (Optional)"
                    />
                    <div className="grid sm:flex gap-3">
                      <input
                        value={formData.billing.postalCode}
                        onChange={(e) =>
                          handleInputChange("fwc", "postalCode", e.target.value)
                        }
                        type="text"
                        className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="Postal Code"
                      />
                      <input
                        className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="City"
                        value={formData.billing.city}
                        onChange={(e) =>
                          handleInputChange("fwc", "city", e.target.value)
                        }
                      />

                      <input
                        className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="State"
                        value={formData.billing.state}
                        onChange={(e) =>
                          handleInputChange("fwc", "state", e.target.value)
                        }
                      />

                      <input
                        className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="Country"
                        value={formData.billing.country}
                        onChange={(e) =>
                          handleInputChange("fwc", "country", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="max-w-2xl px-4 ">
            <div className="bg-white rounded-xl border p-4 sm:p-7 dark:bg-neutral-900">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-neutral-200">
                  {steps[currentStep]?.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                  {steps[currentStep]?.description}
                </p>
              </div>

              <form>
                <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                  <label
                    htmlFor="af-payment-billing-contact"
                    className="inline-block text-sm font-medium dark:text-white"
                  >
                    Full Name
                  </label>
                  <div className="mt-2 space-y-3">
                    <input
                      type="text"
                      value={formData.profile.firstName}
                      onChange={(e) =>
                        handleInputChange(
                          "profile",
                          "firstName",
                          e.target.value
                        )
                      }
                      id="af-payment-billing-contact"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="First Name"
                    />
                    <input
                      type="text"
                      value={formData.profile.lastName}
                      onChange={(e) =>
                        handleInputChange("profile", "lastName", e.target.value)
                      }
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Last Name"
                    />
                  </div>
                  <label
                    htmlFor="af-payment-billing-contact"
                    className="inline-block text-sm font-medium dark:text-white"
                  >
                    Contact Information
                  </label>
                  <div className="mt-2 space-y-3">
                    <input
                      type="text"
                      value={formData.profile.email}
                      onChange={(e) =>
                        handleInputChange("profile", "email", e.target.value)
                      }
                      id="af-payment-billing-contact"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Email Address"
                    />
                    <input
                      type="text"
                      value={formData.profile.phone_number}
                      onChange={(e) =>
                        handleInputChange(
                          "profile",
                          "phone_number",
                          e.target.value
                        )
                      }
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Phone Number"
                    />
                  </div>
                  <label
                    htmlFor="af-payment-billing-contact"
                    className="inline-block text-sm font-medium dark:text-white"
                  >
                    Gender Information
                  </label>
                  <div className="mt-2 space-y-3">
                    <input
                      type="text"
                      value={formData.profile.gender}
                      onChange={(e) =>
                        handleInputChange("profile", "gender", e.target.value)
                      }
                      id="af-payment-billing-contact"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Gender"
                    />
                  </div>
                </div>

                <div className="mt-2 space-y-3">
                  <textarea
                    className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Bio"
                    value={formData.profile.bio}
                    onChange={(e) =>
                      handleInputChange("profile", "bio", e.target.value)
                    }
                  />
                </div>
              </form>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div className="max-w-2xl px-4 ">
            <div className="bg-white rounded-xl border p-4 sm:p-7 dark:bg-neutral-900">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-neutral-200">
                  {steps[currentStep]?.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                  {steps[currentStep]?.description}
                </p>
              </div>

              <form>
                <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                  <label
                    htmlFor="af-payment-billing-contact"
                    className="inline-block text-sm font-medium dark:text-white"
                  >
                    Full Name
                  </label>
                  <div className="mt-2 space-y-3">
                    <input
                      type="text"
                      value={formData.legal.firstName}
                      onChange={(e) =>
                        handleInputChange("legal", "firstName", e.target.value)
                      }
                      id="af-payment-billing-contact"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="First Name"
                    />
                    <input
                      type="text"
                      value={formData.legal.lastName}
                      onChange={(e) =>
                        handleInputChange("legal", "lastName", e.target.value)
                      }
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Last Name"
                    />
                  </div>
                  <label
                    htmlFor="af-payment-billing-contact"
                    className="inline-block text-sm font-medium dark:text-white"
                  >
                    Contact Information
                  </label>
                  <div className="mt-2 space-y-3">
                    <input
                      type="text"
                      value={formData.legal.email}
                      onChange={(e) =>
                        handleInputChange("legal", "email", e.target.value)
                      }
                      id="af-payment-billing-contact"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Email Address"
                    />
                    <input
                      type="text"
                      value={formData.legal.phone_number}
                      onChange={(e) =>
                        handleInputChange(
                          "legal",
                          "phone_number",
                          e.target.value
                        )
                      }
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Phone Number"
                    />
                  </div>
                  <label
                    htmlFor="af-payment-billing-contact"
                    className="inline-block text-sm font-medium dark:text-white"
                  >
                    Gender Information
                  </label>
                  <div className="mt-2 space-y-3">
                    <input
                      type="text"
                      value={formData.legal.gender}
                      onChange={(e) =>
                        handleInputChange("legal", "gender", e.target.value)
                      }
                      id="af-payment-billing-contact"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Gender"
                    />
                  </div>
                </div>

                <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                  <label
                    htmlFor="af-payment-billing-address"
                    className="inline-block text-sm font-medium dark:text-white"
                  >
                    Location
                  </label>

                  <div className="mt-2 space-y-3">
                    <input
                      value={formData.legal.streetAddress}
                      onChange={(e) =>
                        handleInputChange(
                          "legal",
                          "streetAddress",
                          e.target.value
                        )
                      }
                      id="af-payment-billing-address"
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Street Address"
                    />
                    <input
                      value={formData.legal.apartment}
                      onChange={(e) =>
                        handleInputChange("legal", "apartment", e.target.value)
                      }
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Apt, Syuite, Building (Optional)"
                    />
                    <div className="grid sm:flex gap-3">
                      <input
                        value={formData.legal.postalCode}
                        onChange={(e) =>
                          handleInputChange(
                            "legal",
                            "postalCode",
                            e.target.value
                          )
                        }
                        type="text"
                        className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="Postal Code"
                      />
                      <input
                        className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="City"
                        value={formData.legal.city}
                        onChange={(e) =>
                          handleInputChange("legal", "city", e.target.value)
                        }
                      />

                      <input
                        className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="State"
                        value={formData.legal.state}
                        onChange={(e) =>
                          handleInputChange("legal", "state", e.target.value)
                        }
                      />

                      <input
                        className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="Country"
                        value={formData.legal.country}
                        onChange={(e) =>
                          handleInputChange("legal", "country", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        {currentStep === 4 && (
          <div className="max-w-2xl px-4 ">
            <div className="bg-white rounded-xl border p-4 sm:p-7 dark:bg-neutral-900">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-neutral-200">
                  {steps[currentStep]?.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                  {steps[currentStep]?.description}
                </p>
              </div>

              <form>
                <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                  <label
                    htmlFor="af-payment-billing-contact"
                    className="inline-block text-sm font-medium dark:text-white"
                  >
                    Full Name
                  </label>
                  <div className="mt-2 space-y-3">
                    <input
                      type="text"
                      value={formData.fwc.firstName}
                      onChange={(e) =>
                        handleInputChange("fwc", "firstName", e.target.value)
                      }
                      id="af-payment-billing-contact"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="First Name"
                    />
                    <input
                      type="text"
                      value={formData.fwc.lastName}
                      onChange={(e) =>
                        handleInputChange("fwc", "lastName", e.target.value)
                      }
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Last Name"
                    />
                  </div>
                  <label
                    htmlFor="af-payment-billing-contact"
                    className="inline-block text-sm font-medium dark:text-white"
                  >
                    Contact Information
                  </label>
                  <div className="mt-2 space-y-3">
                    <input
                      type="text"
                      value={formData.fwc.email}
                      onChange={(e) =>
                        handleInputChange("fwc", "email", e.target.value)
                      }
                      id="af-payment-billing-contact"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Email Address"
                    />
                    <input
                      type="text"
                      value={formData.fwc.phone_number}
                      onChange={(e) =>
                        handleInputChange("fwc", "phone_number", e.target.value)
                      }
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Phone Number"
                    />
                  </div>
                  <label
                    htmlFor="af-payment-billing-contact"
                    className="inline-block text-sm font-medium dark:text-white"
                  >
                    Gender Information
                  </label>
                  <div className="mt-2 space-y-3">
                    <input
                      type="text"
                      value={formData.fwc.gender}
                      onChange={(e) =>
                        handleInputChange("fwc", "gender", e.target.value)
                      }
                      id="af-payment-billing-contact"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Gender"
                    />
                  </div>
                </div>

                <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                  <label
                    htmlFor="af-payment-billing-address"
                    className="inline-block text-sm font-medium dark:text-white"
                  >
                    Location
                  </label>

                  <div className="mt-2 space-y-3">
                    <input
                      value={formData.billing.streetAddress}
                      onChange={(e) =>
                        handleInputChange(
                          "fwc",
                          "streetAddress",
                          e.target.value
                        )
                      }
                      id="af-payment-billing-address"
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Street Address"
                    />
                    <input
                      value={formData.billing.apartment}
                      onChange={(e) =>
                        handleInputChange("fwc", "apartment", e.target.value)
                      }
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Apt, Syuite, Building (Optional)"
                    />
                    <div className="grid sm:flex gap-3">
                      <input
                        value={formData.billing.postalCode}
                        onChange={(e) =>
                          handleInputChange("fwc", "postalCode", e.target.value)
                        }
                        type="text"
                        className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="Postal Code"
                      />
                      <input
                        className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="City"
                        value={formData.billing.city}
                        onChange={(e) =>
                          handleInputChange("fwc", "city", e.target.value)
                        }
                      />

                      <input
                        className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="State"
                        value={formData.billing.state}
                        onChange={(e) =>
                          handleInputChange("fwc", "state", e.target.value)
                        }
                      />

                      <input
                        className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="Country"
                        value={formData.billing.country}
                        onChange={(e) =>
                          handleInputChange("fwc", "country", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        {currentStep === 5 && (
          <div className="max-w-2xl px-4 ">
            <div className="bg-white rounded-xl border p-4 sm:p-7 dark:bg-neutral-900">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-neutral-200">
                  {steps[currentStep]?.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                  {steps[currentStep]?.description}
                </p>
              </div>

              <form>
                <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                  <label
                    htmlFor="af-payment-billing-address"
                    className="inline-block text-sm font-medium dark:text-white"
                  >
                    Billing address
                  </label>

                  <div className="mt-2 space-y-3">
                    <input
                      value={formData.location.streetAddress}
                      onChange={(e) =>
                        handleInputChange(
                          "location",
                          "streetAddress",
                          e.target.value
                        )
                      }
                      id="af-payment-billing-address"
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Street Address"
                    />
                    <input
                      value={formData.location.apartment}
                      onChange={(e) =>
                        handleInputChange(
                          "location",
                          "apartment",
                          e.target.value
                        )
                      }
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Apt, Syuite, Building (Optional)"
                    />
                    <div className="grid sm:flex gap-3">
                      <input
                        value={formData.billing.postalCode}
                        onChange={(e) =>
                          handleInputChange(
                            "billing",
                            "postalCode",
                            e.target.value
                          )
                        }
                        type="text"
                        className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="Postal Code"
                      />
                      <input
                        className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="Postal Code"
                        value={formData.billing.city}
                        onChange={(e) =>
                          handleInputChange("billing", "city", e.target.value)
                        }
                      />

                      <input
                        className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="Postal Code"
                        value={formData.billing.state}
                        onChange={(e) =>
                          handleInputChange("billing", "state", e.target.value)
                        }
                      />

                      <input
                        className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="Postal Code"
                        value={formData.billing.country}
                        onChange={(e) =>
                          handleInputChange(
                            "billing",
                            "country",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        {currentStep === 6 && (
          <div className="max-w-2xl px-4 ">
            <div className="bg-white rounded-xl border p-4 sm:p-7 dark:bg-neutral-900">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-neutral-200">
                  {steps[currentStep]?.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                  {steps[currentStep]?.description}
                </p>
              </div>

              <form>
                <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                  <label
                    htmlFor="af-payment-billing-contact"
                    className="inline-block text-sm font-medium dark:text-white"
                  >
                    Billing contact
                  </label>

                  <div className="mt-2 space-y-3">
                    <input
                      value={formData.billing.firstName}
                      onChange={(e) =>
                        handleInputChange(
                          "billing",
                          "firstName",
                          e.target.value
                        )
                      }
                      id="af-payment-billing-contact"
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="First Name"
                    />
                    <input
                      value={formData.billing.lastName}
                      onChange={(e) =>
                        handleInputChange("billing", "lastName", e.target.value)
                      }
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Last Name"
                    />
                    <input
                      type="tel"
                      value={formData.billing.phoneNumber}
                      onChange={(e) =>
                        handleInputChange(
                          "billing",
                          "phoneNumber",
                          e.target.value
                        )
                      }
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>

                <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                  <label
                    htmlFor="af-payment-billing-address"
                    className="inline-block text-sm font-medium dark:text-white"
                  >
                    Billing address
                  </label>

                  <div className="mt-2 space-y-3">
                    <input
                      value={formData.billing.streetAddress}
                      onChange={(e) =>
                        handleInputChange(
                          "billing",
                          "streetAddress",
                          e.target.value
                        )
                      }
                      id="af-payment-billing-address"
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Street Address"
                    />
                    <input
                      value={formData.billing.apartment}
                      onChange={(e) =>
                        handleInputChange(
                          "billing",
                          "apartment",
                          e.target.value
                        )
                      }
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Apt, Syuite, Building (Optional)"
                    />
                    <div className="grid sm:flex gap-3">
                      <input
                        value={formData.billing.postalCode}
                        onChange={(e) =>
                          handleInputChange(
                            "billing",
                            "postalCode",
                            e.target.value
                          )
                        }
                        type="text"
                        className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="Postal Code"
                      />
                      <input
                        className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="Postal Code"
                        value={formData.billing.city}
                        onChange={(e) =>
                          handleInputChange("billing", "city", e.target.value)
                        }
                      />

                      <input
                        className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="Postal Code"
                        value={formData.billing.state}
                        onChange={(e) =>
                          handleInputChange("billing", "state", e.target.value)
                        }
                      />

                      <input
                        className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="Postal Code"
                        value={formData.billing.country}
                        onChange={(e) =>
                          handleInputChange(
                            "billing",
                            "country",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                  <label
                    htmlFor="af-payment-payment-method"
                    className="inline-block text-sm font-medium dark:text-white"
                  >
                    Payment method
                  </label>

                  <div className="mt-2 space-y-3">
                    <input
                      value={formData.billing.nameOnCard}
                      onChange={(e) =>
                        handleInputChange(
                          "billing",
                          "nameOnCard",
                          e.target.value
                        )
                      }
                      id="af-payment-payment-method"
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Name on Card"
                    />
                    <input
                      value={formData.billing.cardNumber}
                      onChange={(e) =>
                        handleInputChange(
                          "billing",
                          "cardNumber",
                          e.target.value
                        )
                      }
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="Card Number"
                    />
                    <div className="grid sm:flex gap-3">
                      <input
                        value={formData.billing.expirationDate}
                        onChange={(e) =>
                          handleInputChange(
                            "billing",
                            "expirationDate",
                            e.target.value
                          )
                        }
                        type="text"
                        className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="Expiration Date"
                      />
                      <input
                        value={formData.billing.cvvCode}
                        onChange={(e) =>
                          handleInputChange(
                            "billing",
                            "cvvCode",
                            e.target.value
                          )
                        }
                        type="text"
                        className="py-2 px-3 pe-11 block w-full border-gray-200 border-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="CVV Code"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        {currentStep === 7 && (
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(formData).map(([section, fields]) => (
              <div key={section} className="bg-white p-4 border rounded-md">
                <h2 className="font-semibold mb-2">{section}</h2>
                <ul>
                  {Object.entries(
                    fields as { [key: string]: string | number }
                  ).map(([field, value]) => (
                    <li key={field} className="text-sm">
                      <strong>{field}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
