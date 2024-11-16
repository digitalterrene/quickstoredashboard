import React, { ReactNode, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { PiCursorClickFill } from "react-icons/pi";
type ManagementStatsCardComponentObjectType = {
  name: string;
  total: number;
  icon: ReactNode;
  permissions?: any[];
  tracking?: any[];
};
export default function ManagementDashboardStatsComponent({
  data,
}: {
  data: ManagementStatsCardComponentObjectType;
}) {
  // const { name, icon, total } = data;
  const { name, icon, total, permissions, tracking } = data;
  const [dataType, setDataType] = useState<string>("permissions");
  const currentData = dataType === "permissions" ? permissions : tracking;
  const categories = currentData && Object.keys(currentData);
  const chartData =
    categories &&
    currentData &&
    categories.map((category: any) => currentData[category]);
  // console.log({ permissions: dataType && data?.[dataType] });

  const dataToShow: any =
    dataType === "permissions" ? data?.permissions : data?.tracking;
  return (
    <div className="space-y-6  ">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setDataType("permissions")}
          className={`${
            dataType === "permissions"
              ? "bg-blue-100 text-blue-500 hover:text-blue-400"
              : "bg-white text-gray-500 hover:text-blue-600"
          }  py-1.5 h-fit px-4 inline-flex items-center  text-xs font-medium text-center  rounded-lg  `}
        >
          <PiCursorClickFill className="text-xl mr-2" />
          Permissions
        </button>
        <button
          type="button"
          onClick={() => setDataType("tracking")}
          className={`${
            dataType === "tracking"
              ? "bg-blue-100 text-blue-500 hover:text-blue-400"
              : "bg-white text-gray-500 hover:text-blue-600"
          }  py-1.5 h-fit px-4 inline-flex items-center   text-xs font-medium text-center  rounded-lg  `}
        >
          <FaLocationDot className="text-xl mr-2" /> Tracking
        </button>
      </div>
      <div className="grid grid-cols-4  gap-4">
        {Object.entries(dataToShow as { [key: string]: string | number }).map(
          ([field, value]) => (
            <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
              <div className="p-4 md:p-5 flex gap-x-4">
                <div className="flex-shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg dark:bg-neutral-800">
                  <span className="text-xl text-violet-500">{icon}</span>
                </div>
                <div className="grow">
                  <div className="flex items-center gap-x-2">
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                      {field?.replaceAll("_", " ")}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center gap-x-2">
                    <h3 className="text-xl font-medium text-gray-800 dark:text-neutral-200">
                      {value}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
