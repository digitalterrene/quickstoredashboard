import { AccountInformationProfileObject } from "@/ts-types/account-information";
import React from "react";

export default function ProfileCard({
  profile_information,
}: {
  profile_information: AccountInformationProfileObject;
}) {
  console.log({ profile_information });
  return (
    <div className="rounded-lg border bg-white p-4  pb-10 shadow-lg">
      <div
        style={{ backgroundImage: `url(${profile_information?.image})` }}
        className=" h-44 shadow-md relative rounded-lg p-2 bg-center bg-cover  "
      />
      {profile_information && (
        <ul className="mt-3 divide-y rounded-lg bg-gray-50 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
          {Object.entries(
            profile_information as { [key: string]: string | number }
          ).map(([field, value]) => (
            <>
              {field !== "image" && (
                <li
                  className={`flex ${
                    field === "bio" ? "flex-col text-start" : " items-center "
                  }  py-3 text-sm`}
                >
                  <p className="capitalize">{field?.replaceAll("_", " ")}</p>
                  <span className="ml-auto">
                    <span className="rounded-full   py-1   text-xs font-medium text-blue-700">
                      {value || field}
                    </span>
                  </span>
                </li>
              )}
            </>
          ))}
        </ul>
      )}
    </div>
  );
}
