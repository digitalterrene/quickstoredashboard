import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import { MdClear } from "react-icons/md";

export default function ErrorToast({
  response,
  loading,
  message,
}: {
  response: string;
  loading: boolean;
  message: string;
}) {
  const [isLoading, setIsLoading] = useState(loading);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);
  return (
    <div
      className="hs-removing:translate-x-5 rounded-md bg-red-50 p-4 hs-removing:opacity-0 transition duration-300   border-teal-200 text-sm text-teal-800   dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500"
      role="alert"
      id="dismiss-alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin text-yellow-500 h-5 w-5 mr-3" />
          ) : (
            <BiCheck className="h-5 w-5 text-red-400" aria-hidden="true" />
          )}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-red-800">
            {response || message}
          </p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              data-hs-remove-element="#dismiss-alert"
              className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
            >
              <span className="sr-only">Dismiss</span>
              <MdClear className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
