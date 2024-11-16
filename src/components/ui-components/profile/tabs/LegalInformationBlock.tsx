import { AccountInformationLegalInformationObject } from "@/ts-types/account-information";
import React from "react";

export default function LegalInformationBlock({
  legal_information,
}: {
  legal_information: AccountInformationLegalInformationObject;
}) {
  return (
    <div>
      <section aria-labelledby="applicant-information-title">
        <div className="bg-white border shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2
              id="applicant-information-title"
              className="text-lg leading-6 font-medium text-gray-900"
            >
              Legal Information
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Legal personal details verifyable by your jurisdiction for
              security purposes.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              {legal_information &&
                Object?.entries(
                  legal_information as { [key: string]: string | number }
                ).map(([field, value]) => {
                  // Handle the location fields separately
                  if (
                    field === "street_address" ||
                    field === "apartment" ||
                    field === "postal_code" ||
                    field === "city" ||
                    field === "state" ||
                    field === "country"
                  ) {
                    return null;
                  }

                  // Render non-location and non-image fields
                  if (field !== "image") {
                    return (
                      <div
                        key={field}
                        className={`${
                          field === "bio" ? "sm:col-span-2" : "sm:col-span-1"
                        }`}
                      >
                        <dt className="text-sm font-medium capitalize text-gray-500">
                          {field.replaceAll("_", " ")}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {value || field}
                        </dd>
                      </div>
                    );
                  }
                  return null;
                })}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
