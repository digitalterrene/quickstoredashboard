import React from "react";

export default function LightPilledStyleLink() {
  return (
    <div>
      <div className="bg-neutral-900">
        <div className="max-w-[85rem] px-4 py-4 sm:px-6 lg:px-8 mx-auto text-center">
          <a
            className="group inline-block bg-white/10 hover:bg-white/10 border border-white/10 p-1 ps-4 rounded-full shadow-md"
            href="../figma.html"
          >
            <p className="me-2 inline-block text-white text-sm">
              Preline UI Figma is live.
            </p>
            <span className="group-hover:bg-white/10 py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-white/10 font-semibold text-white text-sm">
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
          </a>
        </div>
      </div>
    </div>
  );
}
