import React from "react";

export default function FullWidthCenterAlignedLink() {
  return (
    <div>
      <a
        className="group block bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-center transition-all duration-300 dark:bg-white/10 dark:hover:bg-white/10"
        href="#"
      >
        <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
          <p className="me-2 inline-block text-sm text-gray-800 dark:text-neutral-200">
            Shop for everyone on your list with the Preline Guide.
          </p>
          <span className="group-hover:underline decoration-2 inline-flex justify-center items-center gap-x-2 font-semibold text-blue-600 text-sm dark:text-blue-500">
            Shop now
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
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </div>
      </a>
    </div>
  );
}
