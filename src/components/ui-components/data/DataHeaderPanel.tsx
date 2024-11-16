import React from "react";
export default function DataHeaderPanel({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center px-2 justify-between">
      <nav className="flex   space-x-1">
        <div className="sm:col-span-1">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
            {title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            {description}
          </p>
        </div>
      </nav>
      {/* <div className="items-center   flex   space-x-4">
          <div className="inline-flex border gap-3 border-gray-200 rounded-lg p-1 dark:border-neutral-700">
            <button
              type="button"
              onClick={() => toggleIsGridMode()}
              className={`inline-flex flex-shrink-0 justify-center items-center p-1 rounded text-${
                !isGridMode ? "gray-500" : "white"
              } hover:bg-blue-100 bg-${
                isGridMode ? "blue-500" : "transparent"
              } hover:text-blue-800 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200`}
            >
              <HiOutlineViewList className="text-lg" />
            </button>

            <button
              type="button"
              onClick={() => toggleIsGridMode()}
              className={`inline-flex flex-shrink-0 justify-center items-center p-1 rounded text-${
                isGridMode ? "gray-500" : "white"
              } hover:bg-blue-100 bg-${
                !isGridMode ? "blue-500" : "transparent"
              } hover:text-blue-800 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200`}
            >
              <HiOutlineViewGrid className="text-lg" />
            </button>
          </div>{" "}
          <button
            type="button"
            onClick={() => toggleIsFullScreen()}
            className="inline-flex border flex-shrink-0 justify-center items-center p-1.5 rounded text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200"
          >
            {!isFullScreen ? (
              <BsFullscreen className=" text-lg" />
            ) : (
              <BsFullscreenExit className="text-lg " />
            )}
          </button>
        </div> */}
    </div>
  );
}
