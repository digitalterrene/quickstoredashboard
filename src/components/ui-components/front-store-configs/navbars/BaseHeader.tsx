import { useFrontStoreNavbarConfig } from "@/context/front-store-configs";
import React from "react";

export default function BaseHeader() {
  const { frontStoreConfigNavbarInputs } = useFrontStoreNavbarConfig();
  return (
    <header
      style={{
        backgroundImage: `url(${frontStoreConfigNavbarInputs?.background_image})`,
        backgroundColor: `${
          frontStoreConfigNavbarInputs?.background_color || "white"
        }`,
      }}
      className={`flex bg-no-repeat bg-center bg-cover flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full   border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-neutral-800 dark:border-neutral-700`}
    >
      <nav
        className="relative max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <a
            className="flex items-center w-48 gap-2 text-xl font-semibold dark:text-white"
            href="#"
            aria-label="Brand"
          >
            <img
              src={frontStoreConfigNavbarInputs?.store_logo || ""}
              className="w-16"
            />
            <p
              style={{
                color:
                  frontStoreConfigNavbarInputs?.store_name_text_color ||
                  "black",
              }}
              className="w-fit"
            >
              {frontStoreConfigNavbarInputs?.store_name || "Store Name"}
            </p>
          </a>
          <div className="sm:hidden">
            <button
              type="button"
              className="hs-collapse-toggle size-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700"
              data-hs-collapse="#navbar-collapse-with-animation"
              aria-controls="navbar-collapse-with-animation"
              aria-label="Toggle navigation"
            >
              <svg
                className="hs-collapse-open:hidden size-4"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
              <svg
                className="hs-collapse-open:block flex-shrink-0 hidden size-4"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="navbar-collapse-with-animation"
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
        >
          <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7">
            {frontStoreConfigNavbarInputs?.routes?.map(({ route }: any) => (
              <p
                style={{
                  color:
                    frontStoreConfigNavbarInputs?.routes_link_color || "black",
                }}
                className={`font-medium cursor-pointer  sm:py-6 hover:text-[${frontStoreConfigNavbarInputs?.routes_link_hover_color}] `}
                aria-current="page"
              >
                {route}
              </p>
            ))}

            <a
              className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 sm:border-s sm:border-gray-300 sm:my-6 sm:ps-6 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-500"
              href="#"
            >
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
              </svg>
              Log in
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
