"use client";
import { useFrontStoreHeroConfig } from "@/context/front-store-configs";

export default function TwoTierWithImageAndCTA() {
  const { frontStoreConfigHeroInputs } = useFrontStoreHeroConfig();

  return (
    <div
      style={{
        backgroundImage: frontStoreConfigHeroInputs?.background_image
          ? `url(${frontStoreConfigHeroInputs.background_image})`
          : frontStoreConfigHeroInputs?.background_color &&
            frontStoreConfigHeroInputs?.isGradient
          ? `${frontStoreConfigHeroInputs.background_color}`
          : undefined,
        backgroundColor:
          frontStoreConfigHeroInputs?.background_color || undefined,
        color: frontStoreConfigHeroInputs?.text_color || "black",
      }}
      className="bg-no-repeat bg-center relative h-[500px]  bg-cover"
    >
      <div className="mx-auto max-w-7xl justify-between h-full flex items-center  ">
        <div className=" px-10  w-2/3">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <div className="hidden sm:flex  ">
              {frontStoreConfigHeroInputs.small_heading && (
                <div
                  className={`relative rounded-full px-3 py-1 text-sm leading-6 text-${
                    frontStoreConfigHeroInputs?.text_color || "gray-500"
                  } ring-1 ring-gray-900/10 hover:ring-gray-900/20`}
                >
                  {frontStoreConfigHeroInputs.small_heading ||
                    `Anim aute id magna
                  aliqua ad ad non deserunt sunt`}
                </div>
              )}
            </div>
            {frontStoreConfigHeroInputs.big_heading && (
              <h1
                className={`mt-24 text-4xl capitalize font-bold tracking-tight text-${
                  frontStoreConfigHeroInputs?.big_heading_text_color ||
                  "gray-900"
                }  sm:mt-10 sm:text-6xl`}
              >
                {frontStoreConfigHeroInputs.big_heading ||
                  `Data to enrich your online business`}
              </h1>
            )}
            {}
            <p
              className={`mt-6 text-lg leading-8 line-clamp-5 text-${
                frontStoreConfigHeroInputs?.text_color || "gray-500"
              }`}
            >
              {frontStoreConfigHeroInputs.description ||
                `Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.`}
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href="#"
                style={{
                  borderRadius: frontStoreConfigHeroInputs?.button_one_radius,
                }}
                className={`rounded-md bg-${
                  frontStoreConfigHeroInputs?.button_one_background_color ||
                  "indigo-600"
                } px-3.5 py-2.5 text-sm font-semibold text-${
                  frontStoreConfigHeroInputs?.button_one_text_color || "white"
                } shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {frontStoreConfigHeroInputs.button_one_text || `Get started`}
              </a>
              <a
                href="#"
                style={{
                  borderRadius: frontStoreConfigHeroInputs?.button_two_radius,
                }}
                className={`text-sm px-3.5 py-2.5 font-semibold leading-6 text-${
                  frontStoreConfigHeroInputs?.button_two_text_color ||
                  "gray-900"
                }   bg-${
                  frontStoreConfigHeroInputs?.button_two_background_color ||
                  "indigo-600"
                }`}
              >
                {frontStoreConfigHeroInputs.button_two_text || `Learn more`}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div className="relative w-1/3 h-full">
          <img
            className=" w-full h-full bg-gray-50 object-cover "
            src={
              frontStoreConfigHeroInputs?.featured_image ||
              "https://images.unsplash.com/photo-1498758536662-35b82cd15e29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2102&q=80"
            }
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
