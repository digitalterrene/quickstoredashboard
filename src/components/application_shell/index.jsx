"use client";
import { useAuthContext } from "@/context/auth-context/AuthContext";
import { store_data_routes } from "@/data/front-store-data";
import { routes } from "@/data/routes";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { GoHome } from "react-icons/go";
import { ToastContainer } from "react-toastify";
import useNavigation from "@/utils/handleNavigate";
import { front_store_routes } from "@/data/front-store-components-config";
import { FaChevronLeft, FaChevronRight, FaGithub } from "react-icons/fa6";
import { useSideNavInputs } from "@/context";
import {
  IoMdArrowForward,
  IoMdArrowBack,
  IoIosLogOut,
  IoIosLogIn,
} from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { CiShare1 } from "react-icons/ci";
import { AiOutlineCustomerService, AiOutlineRead } from "react-icons/ai";
import { signOutWithGoogle } from "@/libs/firebase/auth";
import { removeSession } from "@/actions/auth-actions";
import { HiMenu } from "react-icons/hi";

import { BsGlobe } from "react-icons/bs";
import { VscGithubAlt } from "react-icons/vsc";
import { PiLinkedinLogoBold } from "react-icons/pi";

export default function ApplicationShell({ children, session }) {
  const pathname = usePathname();
  const { handleQuickNavigate } = useNavigation();
  const router = useRouter();

  const { user } = useAuthContext() || { user: null };

  const { toggleSidebar, toggleSidebarState } = useSideNavInputs();
  useEffect(() => {
    import("preline");
    const user = localStorage.getItem("user");
    if (!user) {
      // Redirect to /getting-started if no user is found
      if (
        !pathname?.includes("authentication" || pathname === "/getting-started")
      )
        router.push("/getting-started");
    }
  }, []);

  function containsNumbers(str) {
    return str.match(/\d/) !== null;
  }
  const handleForward = () => {
    router.forward();
  };
  const handleBack = () => {
    router.back();
  };
  const handleFirebaseSignOut = async () => {
    await signOutWithGoogle();
    await removeSession();
  };
  const handleSignout = () => {
    localStorage?.clear();
    handleFirebaseSignOut();
    router.refresh();
    setTimeout(() => {
      router.push("/getting-started");
    }, 2000);
  };
  const parts = pathname
    ? pathname.split("/").filter((part) => !containsNumbers(part))
    : [];
  // console.log({ session });
  const breadcrumb = parts.map((part, index) => (
    <React.Fragment key={index}>
      <li
        className={`text-sm${
          index === parts.length - 1
            ? " font-semibold flex items-center text-black truncate dark:text-gray-200"
            : ""
        }`}
      >
        <a
          className={`flex cursor-pointer items-center ${
            index === parts.length + 1 ? "text-black" : "text-gray-500"
          } hover-text-blue-600`}
          onClick={() =>
            user?._id &&
            index !== parts.length - 1 &&
            handleQuickNavigate(`${part.replaceAll(" ", "-")}`, {
              _id: user?._id,
              token: user?.token,
            })
          }
        >
          {part.replaceAll("-", " ")}
        </a>
      </li>
      {index !== parts.length - 1 && (
        <li>
          <svg
            className="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-400 dark:text-gray-600"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </li>
      )}
    </React.Fragment>
  ));

  return (
    <div>
      <ToastContainer />
      <header
        className={`sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2   ${
          toggleSidebarState ? "lg:ps-64" : "lg:ps-16"
        } dark:bg-neutral-800 dark:border-neutral-700`}
      >
        <nav
          className="flex basis-full items-center w-full mx-auto px-4 sm:px-6"
          aria-label="Global"
        >
          <div className="me-5 lg:me-0 lg:hidden">
            <a
              className="flex-none rounded-xl   text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
              href="/"
              aria-label="Quick Stores Dashboard"
            >
              <img
                src={toggleSidebarState ? "/logo.png" : "/logosm.png"}
                className="lg:w-32 md:w-36 w-48"
                alt="Quick Stores"
              />
            </a>
          </div>

          <div className="w-full flex items-center   justify-end ms-auto sm:justify-between sm:gap-x-3 sm:order-3">
            <div className="hidden    lg:block">
              <ol
                className="flex items-center gap-2  capitalize  whitespace-nowrap min-w-0"
                aria-label="Breadcrumb"
              >
                {!toggleSidebarState && (
                  <button
                    type="button"
                    onClick={() => toggleSidebar()}
                    className="p-1.5 ml-auto w-fit z-10  inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-900 dark:text-red-500 dark:hover:text-red-400"
                  >
                    {toggleSidebarState ? (
                      <FaChevronRight className="text-lg" />
                    ) : (
                      <FaChevronLeft className="text-lg" />
                    )}
                  </button>
                )}
                <GoHome className="text-xl" />
                {breadcrumb}
                {pathname === "/" && "Quick Dashboard Account"}
              </ol>
            </div>

            <div className="flex flex-row items-center ml-auto justify-end lg:gap-2">
              <div className="inline-flex rounded-lg shadow-sm">
                <button
                  type="button"
                  onClick={() => handleBack()}
                  className="py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                >
                  <span className="lg:hidden">
                    <IoMdArrowBack />
                  </span>
                  <span className="hidden lg:block">Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleForward()}
                  className="py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                >
                  <span className="lg:hidden">
                    <IoMdArrowForward />
                  </span>
                  <span className="hidden lg:block">Forward</span>
                </button>
              </div>

              <a
                href="https://quickstoredashboard.vercel.app"
                target="blank"
                className=" py-1 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
              >
                {/* <BiStore /> */}
                <span className="hidden md:block lg:block">Front Store</span>
                <CiShare1 className="text-xl text-blue-600" />
              </a>

              <button
                type="button"
                onClick={() => handleQuickNavigate("customer-support", user)}
                className=" py-1 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
              >
                <AiOutlineCustomerService className="text-xl" />
                <span className="hidden md:block lg:block">Support</span>
              </button>
              <button
                type="button"
                className=" py-1 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
                data-hs-offcanvas="#hs-offcanvas-right"
              >
                <HiOutlineBookOpen className="text-xl" />{" "}
                <span className="hidden md:block lg:block">Documentation</span>
              </button>

              <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
                <button
                  id="hs-dropdown-with-header"
                  type="button"
                  className="w-10 h-10 border inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full   border-blue-400 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
                >
                  <img
                    className="inline-block size-[38px] rounded-full ring-2 ring-white dark:ring-neutral-800"
                    src={
                      user?.image ||
                      "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                    }
                    alt="Image Description"
                  />
                </button>
                <div
                  className="hs-dropdown-menu space-y-2 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 dark:bg-neutral-900 dark:border dark:border-neutral-700"
                  aria-labelledby="hs-dropdown-with-header"
                >
                  <div className="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg dark:bg-neutral-800">
                    <p className="text-sm text-gray-500 dark:text-neutral-400">
                      Signed in as
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-neutral-300">
                      {user?.email || "no email"}
                    </p>
                  </div>
                  <div className="mt-2 py-2 first:pt-0 last:pb-0">
                    <a
                      className="flex cursor-pointer items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                      onClick={() => handleQuickNavigate("profile", user)}
                    >
                      <MdOutlineSpaceDashboard className="text-xl text-blue-600" />
                      Dashboard Profile
                    </a>
                    <a
                      className="flex cursor-pointer items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                      onClick={() =>
                        handleQuickNavigate("account-information", user)
                      }
                    >
                      <IoSettingsOutline className="text-xl text-blue-600" />
                      Account Settings
                    </a>
                    <a
                      className="flex mb-2  cursor-pointer items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                      onClick={() => handleQuickNavigate("admin-actions", user)}
                    >
                      <MdOutlineAdminPanelSettings className="text-xl text-red-600" />
                      Administration Actions
                    </a>
                    <div className="border-t pt-4">
                      {user?._id ? (
                        <>
                          <div className="text-center">
                            <button
                              type="button"
                              onClick={() => handleSignout()}
                              className="py-1.5 cursor-pointer w-full focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300  px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                              data-hs-overlay="#hs-sign-out-alert-small-window"
                            >
                              <IoIosLogOut className="text-xl" />
                              Signout
                            </button>
                          </div>
                        </>
                      ) : (
                        <a
                          className="flex cursor-pointer items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                          href="/authentication/signin"
                        >
                          <IoIosLogIn className="text-xl" />
                          Signin
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden dark:bg-neutral-800 dark:border-neutral-700">
        <div className="flex justify-between items-center py-2">
          <div className="lg:hidden     block">
            <ol
              className="flex items-center gap-2  capitalize  whitespace-nowrap min-w-0"
              aria-label="Breadcrumb"
            >
              {!toggleSidebarState && (
                <button
                  type="button"
                  onClick={() => toggleSidebar()}
                  className="p-1.5 ml-auto w-fit z-10  inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-900 dark:text-red-500 dark:hover:text-red-400"
                >
                  {toggleSidebarState ? (
                    <FaChevronRight className="text-lg" />
                  ) : (
                    <FaChevronLeft className="text-lg" />
                  )}
                </button>
              )}
              <GoHome className="text-xl" />
              {breadcrumb}
              {pathname === "/" && "Quick Dashboard Account"}
            </ol>
          </div>

          <button
            type="button"
            className="py-2 px-3 flex justify-center items-center gap-x-1.5 text-xs rounded-lg border border-gray-200 text-gray-500 hover:text-gray-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            data-hs-overlay="#application-sidebar"
            aria-controls="application-sidebar"
            aria-label="Sidebar"
          >
            <HiMenu className="text-xl" />
            <span className="sr-only">Sidebar</span>
          </button>
        </div>
      </div>

      <div
        id="application-sidebar"
        className={`hs-overlay scrollbar-thumb-gray-300 scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded-2xl active:scrollbar-thumb-sky-400 scrollbar-thumb-rounded-full hover:scrollbar-thumb-blue-500 scrollbar-track-gray-100 h-full overflow-y-auto [--auto-close:lg]
                hs-overlay-open:translate-x-0     
                -translate-x-full transition-all duration-300 transform
                w-${toggleSidebarState ? "[255px]" : "fit"}
                hidden
                fixed inset-y-0 start-0 z-[60]
                bg-white border-e border-gray-200
                lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
                dark:bg-neutral-800 dark:border-neutral-700
            `}
      >
        <div className={`px-${!toggleSidebarState ? "3" : "6"}  pr-2 pt-3`}>
          <div className="flex justify-between items-center">
            <a
              className="flex-none rounded-xl   text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
              href="/"
              aria-label="Quick Stores Dashboard"
            >
              <img
                src={toggleSidebarState ? "/logo.png" : "/logosm.png"}
                className={`  w-${!toggleSidebarState ? "8" : "32"} `}
                alt="Quick Stores"
              />
            </a>
            {toggleSidebarState && (
              <button
                type="button"
                onClick={() => toggleSidebar()}
                className="p-1.5 ml-auto w-fit z-10 lg:block hidden   items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-900 dark:text-red-500 dark:hover:text-red-400"
              >
                {toggleSidebarState ? (
                  <FaChevronRight className="text-md" />
                ) : (
                  <FaChevronLeft className="text-md" />
                )}
              </button>
            )}
          </div>
        </div>

        <nav
          className={`hs-accordion-group p-${
            !toggleSidebarState ? "2" : "6"
          } pb-0  overflow-x-hidden  w-full flex flex-col flex-wrap"`}
          data-hs-accordion-always-open
        >
          <ul className="space-y-1.5">
            {toggleSidebarState && (
              <p className="text-sm text-gray-600">Account Information</p>
            )}
            {routes?.map(({ name, icon }) => (
              <li
                key={name}
                className={`flex capitalize items-center bg-${
                  pathname?.includes(name) ? "gray-100" : "white"
                }   ${
                  pathname?.includes(name)
                    ? "border-l-8 text-blue-500 border-blue-500"
                    : "border-none text-neutral-700"
                } gap-x-3.5 py-1.5 px-2.5 cursor-pointer   text-sm  rounded-lg hover:bg-gray-100 dark:bg-neutral-700 dark:text-white`}
                onClick={() => handleQuickNavigate(name, user)}
              >
                <span className="text-xl "> {icon}</span>

                {toggleSidebarState && name?.replaceAll("-", " ")}
              </li>
            ))}
            <div className="py-3">
              {toggleSidebarState && (
                <p className="text-sm text-gray-600 mb-3">Store Data</p>
              )}
              {store_data_routes?.map(({ name, icon }) => (
                <li key={name} className="mt-1">
                  <a
                    className={`flex capitalize items-center bg-${
                      pathname?.includes(name) ? "gray-100" : "white"
                    }   ${
                      pathname?.includes(name)
                        ? "border-l-8 text-blue-500 border-blue-500"
                        : "border-none text-neutral-700"
                    } gap-x-3.5 py-1.5 px-2.5 cursor-pointer   text-sm  rounded-lg hover:bg-gray-100 dark:bg-neutral-700 dark:text-white`}
                    onClick={() => handleQuickNavigate(`data/${name}`, user)}
                  >
                    <span className="text-xl"> {icon}</span>

                    {toggleSidebarState && name?.replaceAll("-", " ")}
                  </a>
                </li>
              ))}
            </div>
            <div className="py-3">
              {toggleSidebarState && (
                <p className="text-sm text-gray-600 mb-3">Front Store Config</p>
              )}
              {front_store_routes?.map(({ name, icon }) => (
                <li key={name} className="mt-1">
                  <a
                    className={`flex capitalize items-center bg-${
                      pathname?.includes(name) ? "gray-100" : "white"
                    }   ${
                      pathname?.includes(name)
                        ? "border-l-8 text-blue-500 border-blue-500"
                        : "border-none text-neutral-700"
                    } gap-x-3.5 py-1.5 px-2.5 cursor-pointer   text-sm  rounded-lg hover:bg-gray-100 dark:bg-neutral-700 dark:text-white`}
                    onClick={() =>
                      handleQuickNavigate(
                        `front-store-configuration/${name}`,
                        user
                      )
                    }
                  >
                    <span className="text-xl"> {icon}</span>

                    {toggleSidebarState && name?.replaceAll("_", " ")}
                  </a>
                </li>
              ))}
            </div>
            <div className="flex-shrink-0 sticky bottom-0 flex   h-16 bg-white border-gray-200 py-4">
              <button
                onClick={() => handleQuickNavigate("profile", user)}
                className="flex-shrink-0 w-full group block"
              >
                <div className="flex items-center">
                  <div>
                    <img
                      className="inline-block h-9 w-9 rounded-full"
                      src={
                        user?.image ||
                        "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                      }
                      alt=""
                    />
                  </div>
                  {toggleSidebarState && (
                    <div className="ml-3">
                      <p className="text-sm font-medium   text-start text-gray-700 group-hover:text-gray-900">
                        {user?.username || "Username"}
                      </p>
                      <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                        {user?.email || "email"}
                      </p>
                    </div>
                  )}
                </div>
              </button>
            </div>
          </ul>
        </nav>
      </div>

      <div
        className={`w-full ${toggleSidebarState ? "lg:ps-64" : "lg:ps-16"} `}
      >
        <div className="overflow-auto ">
          {children}{" "}
          <div
            id="hs-sign-out-alert-small-window"
            className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto"
          >
            <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-xs sm:w-full m-3 sm:mx-auto">
              <div className="relative flex flex-col bg-white shadow-lg rounded-xl dark:bg-neutral-900">
                <div className="absolute top-2 end-2">
                  <button
                    type="button"
                    className="flex justify-center items-center size-7 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-transparent dark:hover:bg-neutral-700"
                    data-hs-overlay="#hs-sign-out-alert-small-window"
                  >
                    <span className="sr-only">Close</span>
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
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>

                <div className="p-4 sm:p-10 text-center overflow-y-auto">
                  <span className="mb-4 inline-flex justify-center items-center size-[62px] rounded-full border-4 border-yellow-50 bg-yellow-100 text-yellow-500 dark:bg-yellow-700 dark:border-yellow-600 dark:text-yellow-100">
                    <svg
                      className="flex-shrink-0 size-5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                  </span>

                  <h3 className="mb-2 text-2xl font-bold text-gray-800 dark:text-neutral-200">
                    Sign out
                  </h3>
                  <p className="text-gray-500 dark:text-neutral-500">
                    Are you sure you would like to sign out of your Quick
                    Dashboard Stores account?
                  </p>

                  <div className="mt-6 grid gap-y-2">
                    <a
                      className="py-2.5 px-4 w-full inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-neutral-800 dark:hover:bg-neutral-800 dark:border-neutral-800 dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                      href="#"
                    >
                      Sign out
                    </a>
                    <button
                      type="button"
                      className="py-2.5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                      data-hs-overlay="#hs-sign-out-alert-small-window"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="mt-auto py-3 border-t ">
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mt-auto w-full max-w-[85rem]  px-4 sm:px-6 lg:px-8 mx-auto">
                <div className="flex w-full justify-between    items-center gap-5">
                  <div>
                    <a
                      className="flex-none text-xl font-semibold text-black focus:outline-none dark:text-white"
                      href="/"
                      aria-label="Brand"
                    >
                      Quick Store Dashboard
                    </a>
                  </div>
                  <div className="md:text-end items-center space-x-4">
                    <a
                      target="_blank"
                      className=" inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      href="https://www.linkedin.com/in/larry-kingstone-71516824a/"
                    >
                      <PiLinkedinLogoBold className="text-xl" />
                    </a>
                    <a
                      target="_blank"
                      className=" inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      href="https://larrykingstone.com"
                    >
                      <BsGlobe className="text-xl" />
                    </a>
                    <a
                      target="_blank"
                      className=" inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      href="https://larrykingstonedocs.vercel.app/"
                    >
                      <AiOutlineRead className="text-xl" />
                    </a>
                    <a
                      target="_blank"
                      className=" inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      href="https://github.com/digitalterrene"
                    >
                      <VscGithubAlt className="text-xl" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
