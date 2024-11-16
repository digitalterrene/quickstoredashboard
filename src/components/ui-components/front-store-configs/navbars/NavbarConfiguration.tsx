import React, { useState } from "react";
import NavbarPreview from "./NavbarPreview";
import { useFrontStoreConfig } from "@/context";

import { toast } from "react-toastify";
import ColorPicker, { useColorPicker } from "react-best-gradient-color-picker";
import { useFrontStoreNavbarConfig } from "@/context/front-store-configs";

export default function NavbarConfiguration() {
  const { previewInFullScreen } = useFrontStoreConfig();
  const { frontStoreConfigNavbarInputs, setFrontStoreConfigNavbarInputs } =
    useFrontStoreNavbarConfig();
  const [color, setColor] = useState("rgba(255,255,255,1)");
  const [colorOption, setColorOption] = useState("");
  const { valueToHex, isGradient } = useColorPicker(color, setColor);

  const [inputs, setInputs] = useState<any>(frontStoreConfigNavbarInputs);
  const handleUploadImage = (image: File, image_type: string) => {
    const id = toast.loading("Uploading image...");
    if (image === undefined) {
      toast.update(id, {
        render: "Something went wrong",
        type: "error",
        isLoading: false,
      });
      return;
    }
    if (image.type === "image/jpeg" || image.type === "image/png") {
      const data = new FormData();
      data.append("file", image);
      data.append(
        "upload_preset",
        `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
      );
      data.append(
        "cloud_name",
        `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`
      );
      fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "post",
          body: data,
        }
      )
        .then((res) => res.json())
        .then(async (data) => {
          toast.update(id, {
            render: "Image successfully uploaded",
            type: "success",
            isLoading: false,
          });
          // console.log("Image in the server" + data.secure_url.toString());
          if (image_type === "image") {
            setFrontStoreConfigNavbarInputs({
              store_logo: data.secure_url.toString(),
            });
          } else {
            setFrontStoreConfigNavbarInputs({
              background_image: data.secure_url.toString(),
            });
          }
          //return { image_url: data.secure_url.toString() };
        })
        .catch((err) => {
          toast.update(id, {
            render: `${err?.message}`,
            type: "success",
            isLoading: false,
          });
          console.log(err);
        });
    } else {
      toast.update(id, {
        render: "Please select an image",
        type: "error",
        isLoading: false,
      });
      return;
    }
    setTimeout(() => {
      toast.dismiss();
    }, 6000);
  };

  return (
    <>
      {previewInFullScreen ? (
        <NavbarPreview />
      ) : (
        <div className="flex w-full gap-4">
          <form className="w-1/2">
            <div className="space-y-12">
              <div className="  border-gray-900/10  ">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Branding
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  This includes you logo, business name and slogation. Use the
                  switches to decide when to show each
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Store Logo
                    </label>
                    <div className="mt-2">
                      <form>
                        <label htmlFor="small-file-input" className="sr-only">
                          Choose file
                        </label>
                        <input
                          type="file"
                          name="small-file-input"
                          id="small-file-input"
                          onChange={async (e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleUploadImage(e.target.files[0], "image");
                            }
                          }}
                          className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                                  file:bg-gray-50 file:border-0
                                    file:me-4
                                    file:py-2 file:px-4
                                  dark:file:bg-neutral-700 dark:file:text-neutral-400"
                        />
                      </form>
                    </div>
                  </div>
                  <div className="col-span-full">
                    <div className="  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Store Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            value={inputs?.store_name}
                            onChange={(e) => {
                              setInputs((prevState: any) => ({
                                ...prevState,
                                store_name: e.target.value,
                              }));
                              setFrontStoreConfigNavbarInputs({
                                store_name: e.target.value,
                              });
                            }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Slogan
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            value={inputs?.slogan}
                            onChange={(e) => {
                              setInputs((prevState: any) => ({
                                ...prevState,
                                slogan: e.target.value,
                              }));
                              setFrontStoreConfigNavbarInputs({
                                slogan: e.target.value,
                              });
                            }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        value={inputs?.description}
                        onChange={(e) => {
                          setInputs((prevState: any) => ({
                            ...prevState,
                            description: e.target.value,
                          }));
                          setFrontStoreConfigNavbarInputs({
                            description: e.target.value,
                          });
                        }}
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={""}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      Write a few sentences about your store.
                    </p>
                  </div>

                  <form className="col-span-full   ">
                    <label htmlFor="small-file-input" className=" ">
                      Choose file
                    </label>
                    <input
                      type="file"
                      name="small-file-input"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleUploadImage(
                            e.target.files[0],
                            "background_image"
                          );
                        }
                      }}
                      id="small-file-input"
                      className="block w-full mt-2  border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                                  file:bg-gray-50 file:border-0
                                    file:me-4
                                    file:py-2 file:px-4
                                  dark:file:bg-neutral-700 dark:file:text-neutral-400"
                    />
                  </form>
                  <div className="col-span-full gap-8 items-center grid  ">
                    <div className="   ">
                      <label
                        htmlFor="hs-color-input"
                        className="block space-y-3  text-sm font-medium mb-2 dark:text-white"
                      >
                        <div className="  grid grid-cols-6">
                          <select
                            onChange={(e) => {
                              setColorOption(e.target.value);
                              setFrontStoreConfigNavbarInputs({});
                              if (
                                isGradient &&
                                e.target.value === "background_color"
                              ) {
                                setFrontStoreConfigNavbarInputs({
                                  background_image: null,
                                });
                              }
                            }}
                            className="py-1.5 col-span-3 px-4 pe-9 block w-full capitalize border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                          >
                            {[
                              "store_name_text_color",
                              "routes_link_color",
                              "routes_link_hover_color",
                              "background_color",
                            ]?.map((color_key) => (
                              <option value={color_key}>
                                {color_key?.replaceAll("_", " ")}
                              </option>
                            ))}
                          </select>
                          <div className="col-span-3 justify-end flex items-center">
                            <button
                              type="button"
                              onClick={() => {
                                setFrontStoreConfigNavbarInputs({
                                  background_image: null,
                                });
                                setFrontStoreConfigNavbarInputs({
                                  [colorOption]: isGradient
                                    ? color
                                    : valueToHex(),
                                  isGradient,
                                });
                              }}
                              className="py-2 px-4 inline-flex w-fit items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-100 text-red-600 hover:bg-red-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-900 dark:text-red-500 dark:hover:text-red-400"
                            >
                              Set Color
                            </button>
                          </div>
                        </div>
                      </label>
                    </div>
                    <ColorPicker value={color} onChange={setColor} />
                  </div>
                </div>
              </div>

              <div className="  border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Preferrences
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Choose when to conditionally show your Navba components.
                  However keep in mind that there are defau;t settings that
                  Quick Dashboard Store may not overide
                </p>

                <div className="  space-y-10">
                  <fieldset>
                    <div className="mt-6 space-y-6">
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            type="checkbox"
                            checked={inputs?.hide_logo}
                            onChange={(e) => {
                              setInputs((prevState: any) => ({
                                ...prevState,
                                hide_logo: e.target.checked,
                              }));
                              setFrontStoreConfigNavbarInputs({
                                hide_logo: e.target.checked,
                              });
                            }}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor="comments"
                            className="font-medium text-gray-900"
                          >
                            Hide Logo
                          </label>
                        </div>
                      </div>
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            checked={inputs?.hide_store_name}
                            onChange={(e) => {
                              setInputs((prevState: any) => ({
                                ...prevState,
                                hide_store_name: e.target.checked,
                              }));
                              setFrontStoreConfigNavbarInputs({
                                hide_store_name: e.target.checked,
                              });
                            }}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor="candidates"
                            className="font-medium text-gray-900"
                          >
                            Hide Title
                          </label>
                        </div>
                      </div>
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            checked={inputs?.show_slogan}
                            onChange={(e) => {
                              setInputs((prevState: any) => ({
                                ...prevState,
                                show_slogan: e.target.checked,
                              }));
                              setFrontStoreConfigNavbarInputs({
                                show_slogan: e.target.checked,
                              });
                            }}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor="offers"
                            className="font-medium text-gray-900"
                          >
                            Show Slogan
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </form>
          <div className="w-1/2">
            <NavbarPreview />
          </div>
        </div>
      )}
    </>
  );
}
