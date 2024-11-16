"use client";
import { pullSingleStoreData } from "@/api-calls/dashboard-data/pullStoreData";
import ActiveChat from "@/components/ui-components/customer-support/ActiveChat";

import CreateAutoMessage from "@/components/ui-components/customer-support/CreateAutoMessage";
import CreateChat from "@/components/ui-components/customer-support/CreateChat";
import PlaceholderWidget from "@/components/ui-components/customer-support/PlaceholderWidget";
import UpdateAutoMessage from "@/components/ui-components/customer-support/UpdateAutoMessage";

import { useSideNavInputs } from "@/context";
import { useAuthContext } from "@/context/auth-context/AuthContext";
import { CustomerSupportChatObject } from "@/ts-types/customer-support";
import useNavigation from "@/utils/handleNavigate";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineInbox } from "react-icons/ai";

import { BiEdit } from "react-icons/bi";
import { BsArrowRight, BsFillBagCheckFill } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";

import { GrView } from "react-icons/gr";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import {
  MdCancel,
  MdCheckCircle,
  MdClear,
  MdOutlineAdsClick,
  MdOutlineAutoAwesome,
} from "react-icons/md";

import { RiDeleteBin6Line } from "react-icons/ri";
import { TbMessage } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";

interface ResponseType {
  data?: CustomerSupportChatObject[];
  response: string;
  message: string;
}
export default function CustomerSupportPage({
  response,
  auto_messages,
}: {
  response: ResponseType;
  auto_messages: any;
}) {
  const { handleQuickNavigate } = useNavigation();
  const chats = response?.data || [];
  const { user } = useAuthContext();
  const [isNewAutoMessage, setIsNewAutoMessage] = useState(false);
  const [chatAction, setChatAction] = useState("none");

  const [activeProfileInfo, setActiveProfileInfo] = useState<any>({
    customer_id: "",
    customer_name: "",
    customer_image: "",
    customer_email: "",
    latest_message: "",
    _id: "",
  });

  const [activeChatMessages, setActiveChatMessages] = useState<any>([]);
  const [autoMsgToEdit, setAutoMsgToEdit] = useState({});
  const [isEdititingAutoMsg, setIsEditingAutoMsg] = useState(false);
  const autoMessagesIcons: any = {
    auto_message_order_placed: <MdOutlineAdsClick />,
    auto_message_order_in_process: <AiOutlineInbox />,
    auto_message_order_in_shipping: <BsFillBagCheckFill />,
    auto_message_order_delivered: <AiOutlineEye />,
    auto_message_order_cancelled: <MdCancel />,
    auto_message_order_payment_failed: <MdCheckCircle />,
  };
  const router = useRouter();
  const handleDelete = async (msg_id: string) => {
    // console.log(selectedIDs);
    const id = toast.loading("Deleting auto message...");
    let res;
    res = await pullSingleStoreData(
      user?._id,
      user?._id,
      user?.token,
      "auto_messages",
      msg_id
    );

    if (res) {
      toast.update(id, {
        render: `${res?.message}`,
        type: `${res?.response === "ok" ? "success" : "error"}`,
        isLoading: false,
      });
      setTimeout(() => {
        router.refresh();
        toast.dismiss();
      }, 5000);
    }
  };
  const handleDeleteChat = async (chat_id: string) => {
    // console.log(selectedIDs);
    const id = toast.loading("Deleting chat...");
    let res;
    res = await pullSingleStoreData(
      user?._id,
      user?._id,
      user?.token,
      "customer_support",
      chat_id
    );

    if (res) {
      toast.update(id, {
        render: `${res?.message}`,
        type: `${res?.response === "ok" ? "success" : "error"}`,
        isLoading: false,
      });
      setTimeout(() => {
        router.refresh();
        toast.dismiss();
      }, 5000);
    }
  };
  return (
    <div className="flex  h-full w-full pr-6 pl-3">
      <ToastContainer />
      <div className="flex    w-full ">
        <div className="border-e w-80 h-full border-gray-200 dark:border-neutral-700">
          <nav
            className="flex flex-col p-4 space-y-2"
            aria-label="Tabs"
            role="tablist"
            aria-orientation="horizontal"
          >
            <button
              type="button"
              onClick={() => setChatAction("create_chat")}
              className="hs-tab-active:border-blue-500  hs-tab-active:bg-blue-50   hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-600 py-2  pe-4 inline-flex items-center gap-x-2 border-2 rounded-lg p-2 border-transparent text-sm whitespace-nowrap text-blue-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500 active"
              role="tab"
              id="vertical-tab-with-border-item-1"
              aria-selected="false"
              data-hs-tab="#vertical-tab-with-border-1"
              aria-controls="vertical-tab-with-border-1"
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
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              New chat
            </button>
            <div className="p-3 rounded-lg bg-green-50">
              <div className="flex  items-center gap-3">
                <IoChatbubbleEllipsesOutline className="text-xl text-blue-600" />
                <p className=" py-4 font-bold text-gray-600">Chats</p>
              </div>
              <ul className="space-y-2  h-full ">
                <div className="  py-1.5">
                  {" "}
                  {chats?.map(
                    ({
                      customer_name,
                      customer_email,
                      customer_id,
                      customer_image,
                      latest_message,
                      messages,
                      latest_message_created_at,
                      _id,
                    }) => (
                      <li
                        key={_id}
                        onClick={() => {
                          setIsNewAutoMessage(false);
                          setChatAction("view_chat");
                          setActiveChatMessages(messages);
                          setActiveProfileInfo({
                            customer_name,
                            customer_email,
                            customer_id,
                            customer_image,
                            latest_message,
                            latest_message_created_at,
                            _id,
                          });
                        }}
                      >
                        <a
                          className="flex items-center gap-x-3 py-2  text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
                          href="#"
                        >
                          <img
                            src={customer_image}
                            className="w-10 h-10 object-cover object-center rounded-full"
                          />
                          <span>
                            <p>{customer_name}</p>
                            <span>
                              <p className="text-xs w-32 truncate">
                                {latest_message}
                              </p>
                              {latest_message_created_at}
                            </span>
                          </span>
                        </a>
                      </li>
                    )
                  )}
                </div>
              </ul>
            </div>
            <button
              type="button"
              // className="hs-tab-active:border-blue-500 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-600 py-1 pe-4 inline-flex items-center gap-x-2 border-e-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500"
              id="vertical-tab-with-border-item-2"
              aria-selected="false"
              data-hs-tab="#vertical-tab-with-border-2"
              aria-controls="vertical-tab-with-border-2"
              role="tab"
              className="flex items-center w-full gap-x-3 py-2 px-3 text-sm hs-tab-active:border-blue-500  hs-tab-active:bg-blue-50  hs-tab-active:text-blue-600 text-gray-700 rounded-lg border-2 hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
            >
              <TbMessage className="text-green-500 text-lg" />
              New auto message
              <MdOutlineAutoAwesome className="text-blue-500 text-lg" />
            </button>
            <button
              onClick={() => setIsEditingAutoMsg(false)}
              type="button"
              // className="hs-tab-active:border-blue-500 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-600 py-1 pe-4 inline-flex items-center gap-x-2 border-e-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500"
              id="vertical-tab-with-border-item-3"
              aria-selected="false"
              data-hs-tab="#vertical-tab-with-border-3"
              aria-controls="vertical-tab-with-border-3"
              role="tab"
              className="flex items-center w-full gap-x-3 py-2 px-3 text-sm hs-tab-active:border-blue-500  hs-tab-active:bg-blue-50  hs-tab-active:text-blue-600  text-gray-700 rounded-lg border-2 hover:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
            >
              <GrView className="text-blue-500 text-lg" />
              Auto Messages
              <BsArrowRight className="text-blue-500 text-lg" />
            </button>
          </nav>
        </div>
        <div className=" w-full">
          <div
            id="vertical-tab-with-border-1"
            role="tabpanel"
            aria-labelledby="vertical-tab-with-border-item-1"
          >
            {chatAction === "none" ? (
              <PlaceholderWidget />
            ) : chatAction === "create_chat" ? (
              <div className="py-3">
                <CreateChat
                  closeButton={
                    <button
                      type="button"
                      onClick={() => setChatAction("none")}
                      className="p-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-100 text-red-800 hover:bg-red-200 focus:outline-none focus:bg-red-200 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:bg-red-800/30 dark:hover:bg-red-800/20 dark:focus:bg-red-800/20"
                    >
                      Cancel
                      <MdClear />
                    </button>
                  }
                />
              </div>
            ) : (
              <div className="  w-full  flex   items-center ">
                <div className="w-full">
                  <div className="min-w-0 flex justify-between  p-4 px-6">
                    <div className="flex   items-center">
                      <img
                        className="hidden h-12 w-12 rounded-full sm:block"
                        src={
                          activeProfileInfo?.customer_image ||
                          "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                        }
                        alt=""
                      />
                      <div className="  h-fit">
                        <div className="flex items-center  ">
                          <p className="ml-3   font-bold p-0 text-gray-900 sm:truncate ">
                            {activeProfileInfo?.customer_name}
                          </p>
                        </div>
                        <dl className="  flex flex-col sm:ml-3 sm:flex-row sm:flex-wrap">
                          <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                            {activeProfileInfo?.customer_email}
                          </dd>
                          <dd className="  flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                            <GoDotFill className="animate-pulse text-green-600 mr-2" />
                            Online
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDeleteChat(activeProfileInfo?._id)}
                        className="p-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-100 text-red-800 hover:bg-red-200 focus:outline-none focus:bg-red-200 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:bg-red-800/30 dark:hover:bg-red-800/20 dark:focus:bg-red-800/20"
                      >
                        <RiDeleteBin6Line />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleQuickNavigate("data/customers", user)
                        }
                        className="py-1.5 h-fit px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-500 dark:hover:border-blue-600"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                  <ActiveChat
                    active_chat_id={activeProfileInfo?._id}
                    customer_profile_info={activeProfileInfo}
                    messages={activeChatMessages}
                  />
                </div>
              </div>
            )}
          </div>
          <div
            id="vertical-tab-with-border-2"
            className="hidden"
            role="tabpanel"
            aria-labelledby="vertical-tab-with-border-item-2"
          >
            <div className="w-full  ">
              <CreateAutoMessage />
            </div>
          </div>
          <div
            id="vertical-tab-with-border-3"
            className="hidden"
            role="tabpanel"
            aria-labelledby="vertical-tab-with-border-item-3"
          >
            {isEdititingAutoMsg ? (
              <UpdateAutoMessage msg={autoMsgToEdit} />
            ) : (
              <div className="grid grid-cols-2 p-4 gap-4">
                {auto_messages?.map((msg: any) => {
                  const message_type = msg?.message_type?.split("_");
                  return (
                    <button
                      onClick={() => {
                        setAutoMsgToEdit(msg);
                      }}
                      key={msg?._id}
                      className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700"
                    >
                      <div className="flex-auto p-4 md:p-6">
                        <div className="flex items-center gap-3">
                          <div className="text-xl  ">
                            {autoMessagesIcons[`${msg?.message_type}`]}
                          </div>
                          <span className="  font-normal text-blue-500 capitalize">
                            {message_type
                              ?.filter(
                                (el: string) =>
                                  el !== "auto" && el !== "message"
                              )
                              .join(" ")}
                          </span>
                        </div>

                        <p className="mt-3  text-left sm:mt-6 text-base text-gray-800 md:text-sm dark:text-white">
                          {msg?.message}
                        </p>
                      </div>

                      <div className="p-4 rounded-b-xl md:px-6">
                        <div className="text-sm flex gap-2 items-center text-gray-500 dark:text-neutral-500">
                          <button
                            className="flex border-r hover:text-blue-500 pr-3 items-center gap-2 w-fit"
                            onClick={() => setIsEditingAutoMsg(true)}
                          >
                            <BiEdit className="mr-2  text-xl " />
                            <span className=" ">Edit</span>
                          </button>{" "}
                          <button
                            type="button"
                            onClick={() => handleDelete(msg?._id)}
                            className="p-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-100 text-red-800 hover:bg-red-200 focus:outline-none focus:bg-red-200 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:bg-red-800/30 dark:hover:bg-red-800/20 dark:focus:bg-red-800/20"
                          >
                            <RiDeleteBin6Line />
                          </button>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
