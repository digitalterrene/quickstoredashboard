import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { BiCheck } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import { CustomerObjectType, OrderObjectType } from "@/ts-types/data";
import { useSideNavInputs } from "@/context";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-context/AuthContext";
import { addToSet } from "@/api-calls/dashboard-data/addToSet";
import { IoAddOutline } from "react-icons/io5";
import { AiOutlineSave } from "react-icons/ai";

const initialInputs: OrderObjectType = {
  order_id: "",
  order_number: "",
  created_at: "",
  order_status: "",
  customer_image: "",
  customer_name: "",
  customer_email: "",
  customer_phone: "",
  shipping_address: "",
  shipping_method: "",
  shipping_cost: 0,
  billing_address: "",
  payment_method: "",
  total_cost: 0,
  discounts: 0,
  tax_details: 3,
  special_instructions: "",
};

const deliveryMethods = [
  {
    id: 1,
    title: "Drone",
    turnaround: "1 day",
    price: "$5.00",
  },
  {
    id: 1,
    title: "Standard",
    turnaround: "4–10 business days",
    price: "$7.00",
  },
  { id: 2, title: "Express", turnaround: "1–5 business days", price: "$15.00" },
];
const paymentMethods = [
  { id: "credit-card", title: "Credit card" },
  { id: "paypal", title: "PayPal" },
  { id: "etransfer", title: "eTransfer" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function CreateOrderForm({
  customers,
}: {
  customers: CustomerObjectType[];
}) {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );

  const [selectedProducts, setSelectedProducts] = useState<
    {
      name?: string;
      _id?: string;
      price?: number;
      image: string;
      quantity?: number;
    }[]
  >([]);
  const [newProductInputs, setNewProductInputs] = useState<{
    name?: string;
    _id?: string;
    price?: number;
    image: string;
    quantity?: number;
  }>({ name: "", price: 0, image: "", quantity: 1 });
  const [inputs, setInputs] = useState<OrderObjectType>(initialInputs);
  const { closeSidenav, setSidenavInputs } = useSideNavInputs();
  const router = useRouter();
  const { user } = useAuthContext();
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const calculateTotal = () => {
    return selectedProducts.reduce((total, product) => {
      const productPrice = product.price ?? 0;
      const productQuantity = product.quantity ?? 1;
      return total + productPrice * productQuantity;
    }, 0);
  };

  const total = calculateTotal();
  const shipping = (5 / 100) * total;
  const taxes = (14 / 100) * total;
  const finalTotal = total + shipping + taxes;

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

          setNewProductInputs((prevState) => ({
            ...prevState,
            image: data.secure_url.toString(),
          }));
          //return { image_url: data.secure_url.toString() };
        })
        .catch((err) => {
          toast.update(id, {
            render: `${err?.message}`,
            type: "error",
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
  const handleSubmit = async () => {
    const id = toast.loading("Creating new order...");
    const res: any = await addToSet(user._id, user?._id, user?.token, {
      key_to_update: "orders",
      value_to_update: {
        data_type: "orders",
        ...inputs,
        products: selectedProducts,
      },
    });
    if (res.response === "ok") {
      toast.update(id, {
        render: "New order created successfully",
        type: "success",
        isLoading: false,
      });
    } else {
      toast.update(id, {
        render: "Failed to create new order",
        type: "error",
        isLoading: false,
      });
    }
    setTimeout(() => {
      toast.dismiss();
      router.refresh();
    }, 6000);
    // console.log({
    //   data_type: "orders",
    //   ...inputs,
    //   products: selectedProducts,
    // });
  };
  return (
    <div className="bg-gray-50 pb-20">
      <div className="mx-auto max-w-2xl px-4 py-6  sm:px-6 lg:max-w-7xl lg:px-8">
        <div className=" flex mb-6 items-center justify-between ">
          <div className="inline-flex   rounded-lg shadow-sm">
            <button
              type="button"
              onClick={() => {
                setSidenavInputs({});
                closeSidenav();
              }}
              className="py-1.5 px-3 cursor-pointer group hover:text-white hover:bg-red-500 inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm  disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => {
                handleSubmit();
                setTimeout(() => {
                  closeSidenav();
                }, 3000);
              }}
              className="py-1.5 cursor-pointer  px-3 group hover:text-white hover:bg-blue-500 inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm  disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            >
              <AiOutlineSave className="text-blue-500 text-lg group-hover:text-white" />{" "}
              Save
            </button>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div>
            <div className="sm:col-span-2 ">
              <h2 className="text-lg font-medium text-gray-900">
                Customer information
              </h2>

              <div className="mt-4 sm:col-span-2  ">
                <label
                  htmlFor="email-address"
                  className="block text-sm text-end font-medium text-gray-700"
                >
                  Select Customer
                </label>
                <div className="inline-flex mt-3 w-full">
                  <button
                    type="button"
                    className="relative py-1 w-full  px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-s-md border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                  >
                    <img
                      className="w-8 h-auto rounded-full "
                      src={
                        inputs?.customer_image ||
                        "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                      }
                      alt="Customer image"
                    />
                    <span className="text-gray-600 font-medium truncate max-w-[7.5rem] dark:text-neutral-400">
                      {inputs?.customer_name}
                    </span>
                  </button>

                  <div className="hs-dropdown [--placement:end-bottom] relative inline-flex">
                    <button
                      id="hs-split-dropup"
                      type="button"
                      className="hs-dropdown-toggle relative -ms-[.3125rem] py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-e-md border border-gray-200 bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:border-neutral-700 dark:text-white dark:hover:text-white"
                    >
                      <span className="sr-only">Toggle Dropdown</span>
                      <svg
                        className="hs-dropdown-open:rotate-180 size-4"
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
                        <path d="m18 15-6-6-6 6"></path>
                      </svg>
                    </button>

                    <div
                      className="hs-dropdown-menu w-72 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700"
                      aria-labelledby="hs-split-dropup"
                    >
                      {customers?.map(({ name, image, _id, phone, email }) => (
                        <div
                          key={_id}
                          onClick={() =>
                            setInputs((prevState: any) => ({
                              ...prevState,
                              customer_email: email,
                              customer_image: image,
                              customer_name: name,
                              customer_phone: phone,
                            }))
                          }
                          className="flex cursor-pointer items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                        >
                          <img
                            className="w-10 h-auto rounded-full "
                            src={
                              image ||
                              "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                            }
                            alt="John"
                          />
                          <span className="text-gray-600 font-medium flex flex-col truncate max-w-[7.5rem] dark:text-neutral-400">
                            {name}
                            <span> {email}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">
                Shipping information
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="shipping_address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="shipping_address"
                      value={inputs?.shipping_address}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Shipping Cost (%)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="region"
                      name="shipping_cost"
                      value={inputs?.shipping_cost}
                      onChange={handleInputChange}
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tax (%)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="postal-code"
                      name="tax_details"
                      value={inputs?.tax_details}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Order Number
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="order_number"
                      value={inputs?.order_number}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="order_status"
                      value={inputs?.order_status}
                      onChange={handleInputChange}
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date Created
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      name="created_at"
                      value={inputs?.created_at}
                      onChange={handleInputChange}
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <RadioGroup
                value={selectedDeliveryMethod}
                onChange={setSelectedDeliveryMethod}
              >
                <RadioGroup.Label className="text-lg font-medium text-gray-900">
                  Delivery method
                </RadioGroup.Label>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  {deliveryMethods.map((deliveryMethod) => (
                    <RadioGroup.Option
                      key={deliveryMethod.id}
                      value={deliveryMethod}
                      onClick={() =>
                        setInputs((prevState: any) => ({
                          ...prevState,
                          shipping_method: deliveryMethod,
                        }))
                      }
                      className={({ checked, active }) =>
                        classNames(
                          checked ? "border-transparent" : "border-gray-300",
                          active ? "ring-2 ring-indigo-500" : "",
                          "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                        )
                      }
                    >
                      {({ checked, active }) => (
                        <>
                          <span className="flex flex-1">
                            <span className="flex flex-col">
                              <RadioGroup.Label
                                as="span"
                                className="block text-sm font-medium text-gray-900"
                              >
                                {deliveryMethod.title}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className="mt-1 flex items-center text-sm text-gray-500"
                              >
                                {deliveryMethod.turnaround}
                              </RadioGroup.Description>
                              <RadioGroup.Description
                                as="span"
                                className="mt-6 text-sm font-medium text-gray-900"
                              >
                                {deliveryMethod.price}
                              </RadioGroup.Description>
                            </span>
                          </span>
                          {checked ? (
                            <BiCheck
                              className="h-5 w-5 text-indigo-600"
                              aria-hidden="true"
                            />
                          ) : null}
                          <span
                            className={classNames(
                              active ? "border" : "border-2",
                              checked
                                ? "border-indigo-500"
                                : "border-transparent",
                              "pointer-events-none absolute -inset-px rounded-lg"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Payment */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Payment</h2>

              <fieldset className="mt-4">
                <legend className="sr-only">Payment type</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                    <div key={paymentMethod.id} className="flex items-center">
                      {paymentMethodIdx === 0 ? (
                        <input
                          id={paymentMethod.id}
                          type="radio"
                          value={paymentMethod?.title}
                          onChange={(e) =>
                            setInputs((prevState: any) => ({
                              ...prevState,
                              payment_method: e.target.value,
                            }))
                          }
                          defaultChecked
                          checked={
                            inputs?.payment_method === paymentMethod?.title
                          }
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      ) : (
                        <input
                          id={paymentMethod.id}
                          value={paymentMethod?.title}
                          onChange={(e) =>
                            setInputs((prevState: any) => ({
                              ...prevState,
                              payment_method: e.target.value,
                            }))
                          }
                          checked={
                            inputs?.payment_method === paymentMethod?.title
                          }
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      )}

                      <label
                        htmlFor={paymentMethod.id}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {paymentMethod.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>

              <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
                <div className="col-span-4">
                  <label
                    htmlFor="card-number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card number
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="billing_card_number"
                      value={inputs?.billing_card_number}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-4">
                  <label
                    htmlFor="name-on-card"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name on card
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="billing_name_on_card"
                      value={inputs?.billing_name_on_card}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-3">
                  <label
                    htmlFor="expiration-date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiration date (MM/YY)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="billing_expiration_date"
                      value={inputs?.billing_expiration_date}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cvc"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVC
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="billing_cvc"
                      value={inputs?.billing_cvc}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
            <label
              htmlFor="first-name"
              className="block col-span-full text-sm text-end  font-medium leading-6 text-gray-900"
            >
              Selected Products
            </label>
            <div className="col-span-full gap-8 items-center  py-4">
              {selectedProducts.map(({ name, _id, price, quantity, image }) => (
                <a
                  key={_id}
                  className="relative flex items-center   bg-center bg-cover p-2 w-full  overflow-hidden rounded-lg border  hover:opacity-75 xl:w-auto"
                >
                  <img
                    src={image}
                    className="w-12 border shadow h-12 rounded object-center object-cover"
                  />
                  <div className="mx-3  flex-col flex">
                    <span className="relative text font-medium  ">{name}</span>
                    <span className="relative  text-sm  ">{quantity}</span>
                  </div>
                  <div className="mx-3 ml-auto flex-col flex">
                    <span className="relative  text-sm  ">${price}</span>
                    <span className="relative  text-sm  ">
                      ${((price ?? 0) * (quantity ?? 0)).toFixed(2)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProducts(
                        selectedProducts.filter(
                          (product) => product?._id !== _id
                        )
                      );
                    }}
                    className="p-1 ml-auto w-fit z-10  inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-100 text-red-600 hover:bg-red-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-900 dark:text-red-500 dark:hover:text-red-400"
                  >
                    <MdClear className="text-lg" />
                  </button>
                </a>
              ))}
            </div>
            <div className="col-span-full   grid grid-cols-2 border p-3 rounded-xl gap-5  ">
              <div className="sm:col-span-2">
                <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                  Profile photo
                </label>
              </div>

              <div className="sm:col-span-2">
                <div className="flex items-center gap-5">
                  <img
                    className="inline-block size-16  ring-2 ring-white dark:ring-neutral-900"
                    src={
                      newProductInputs?.image ||
                      "https://cdn-icons-png.flaticon.com/128/4904/4904233.png"
                    }
                    alt="Image Description"
                  />
                  <div className="flex gap-x-2">
                    <label htmlFor="uploadFile1">
                      <input
                        type="file"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleUploadImage(e.target.files[0], "image");
                          }
                        }}
                        id="uploadFile1"
                        className="hidden"
                      />
                      <span className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
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
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" x2="12" y1="3" y2="15" />
                        </svg>
                        Upload Image
                      </span>
                    </label>
                    <div></div>
                  </div>
                </div>
              </div>
              <span className="col-span-2">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="sm:flex rounded-lg shadow-sm">
                  <input
                    type="text"
                    value={newProductInputs?.name}
                    onChange={(e) =>
                      setNewProductInputs((prevState) => ({
                        ...prevState,
                        name: e.target.value,
                      }))
                    }
                    className="py-2 px-4 pe-11 block w-full border-gray-200 sm:shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />
                  <span className="py-2 px-4 inline-flex items-center min-w-fit w-full border border-gray-200 bg-gray-50 text-sm text-gray-500 -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:w-auto sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg dark:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-400">
                    #
                  </span>
                  <input
                    type="text"
                    value={newProductInputs?._id}
                    onChange={(e) =>
                      setNewProductInputs((prevState) => ({
                        ...prevState,
                        _id: e.target.value,
                      }))
                    }
                    className="py-2 px-4 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />
                </div>
              </span>
              <div className="col-span-2 gap-4 grid grid-cols-2">
                <span>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price
                  </label>
                  <div className="sm:flex rounded-lg shadow-sm">
                    <input
                      type="number"
                      name="region"
                      value={newProductInputs?.price}
                      onChange={(e) =>
                        setNewProductInputs((prevState) => ({
                          ...prevState,
                          price: parseInt(e.target.value),
                        }))
                      }
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </span>
                <span>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Quantity
                  </label>
                  <div className="sm:flex rounded-lg shadow-sm">
                    <input
                      type="number"
                      name="region"
                      value={newProductInputs?.quantity}
                      onChange={(e) =>
                        setNewProductInputs((prevState) => ({
                          ...prevState,
                          quantity: parseInt(e.target.value),
                        }))
                      }
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </span>
              </div>
            </div>
            <div className="col-span-2 flex justify-end">
              <button
                type="button"
                id="hs-copy-content"
                onClick={() =>
                  setSelectedProducts((prevState) => [
                    ...prevState,
                    { ...newProductInputs },
                  ])
                }
                className="py-2 mt-8 px-2 inline-flex items-center gap-x-1 text-xs font-medium rounded-lg border  border-gray-200 bg-white text-gray-800 hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700"
              >
                <IoAddOutline className="text-xl" />
                Add Product
              </button>
            </div>
            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${total.toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${shipping.toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${taxes.toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${finalTotal.toFixed(2)}
                  </dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <button className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                  Confirm order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
