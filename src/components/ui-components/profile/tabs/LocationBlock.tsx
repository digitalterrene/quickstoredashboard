import { AccountInformationLocationObject } from "@/ts-types/account-information";

import { FaLocationDot } from "react-icons/fa6";

export default function LocationBlock({
  location_information,
}: {
  location_information: AccountInformationLocationObject;
}) {
  const locationOrder: (keyof AccountInformationLocationObject)[] = [
    "street_address",
    "city",
    "postal_code",
    "state",
    "country",
  ];

  return (
    <div className="bg-white px-4 py-5 border shadow sm:rounded-lg sm:px-6">
      <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
        Location Information
      </h2>
      <div className="mt-6 flow-root">
        <div className="relative pb-8">
          <div className="relative flex space-x-3">
            <div>
              <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white">
                <FaLocationDot
                  className="w-5 h-5 text-blue-500 "
                  aria-hidden="true"
                />
              </span>
            </div>
            <div>
              {locationOrder &&
                location_information &&
                locationOrder?.map((field) => {
                  const value = location_information[field];
                  if (value) {
                    return (
                      <div
                        key={field}
                        className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4"
                      >
                        <div>
                          <p className="text-sm text-gray-500">{value}</p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col justify-stretch">
        <button
          type="button"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Search On Google Maps
        </button>
      </div>
    </div>
  );
}
