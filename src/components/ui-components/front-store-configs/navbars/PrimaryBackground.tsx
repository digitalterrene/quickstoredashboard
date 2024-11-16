import { useFrontStoreConfig } from "@/context";
import React from "react";

export default function PrimaryBackground() {
  const {
    previewInFullScreen,
    setFrontStoreConfigInputs,
    frontStoreConfigInputs,
  } = useFrontStoreConfig();
  return (
    <div>
      <header
        style={{
          backgroundImage: `url(${frontStoreConfigInputs?.background_image})`,
          color: `${frontStoreConfigInputs?.text_color || "black"}`,
          backgroundColor: `${
            frontStoreConfigInputs?.background_color || "white"
          }`,
        }}
        className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-3 sm:py-0"
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
                src={frontStoreConfigInputs?.store_logo || ""}
                className="w-16"
              />
              <p className="w-fit">
                {frontStoreConfigInputs?.store_name || "Store Name"}
              </p>
            </a>
            <div className="sm:hidden">
              <button
                type="button"
                className="hs-collapse-toggle size-9 flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-white/20 text-white hover:border-white/40 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-collapse="#navbar-collapse-with-animation"
                aria-controls="navbar-collapse-with-animation"
                aria-label="Toggle navigation"
              >
                <svg
                  className="hs-collapse-open:hidden flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div
            id="navbar-collapse-with-animation"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
          >
            <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7">
              {frontStoreConfigInputs?.routes?.map(({ route }: any) => (
                <a
                  className="font-medium   sm:py-6  "
                  href="#"
                  aria-current="page"
                >
                  {route}
                </a>
              ))}

              <a
                className="flex items-center gap-x-2 font-medium text-white/80 hover:text-white sm:border-s sm:border-white/30 sm:my-6 sm:ps-6"
                href="#"
              >
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Log in
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main id="content">
        <div className="max-w-[85rem] mx-auto py-10 px-4 sm:px-6 lg:px-8"></div>
      </main>
    </div>
  );
}
