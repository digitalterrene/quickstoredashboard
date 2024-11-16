import { useSideNavInputs } from "@/context";
import { useAuthContext } from "@/context/auth-context/AuthContext";
import useNavigation from "@/utils/handleNavigate";
import React from "react";
import { FiEdit } from "react-icons/fi";

export default function ProductCard({ product }: any) {
  const { handleQuickNavigate } = useNavigation();
  const { user } = useAuthContext();
  const { setAddItem, setSidenavInputs, openSidenav } = useSideNavInputs();
  return (
    <div className="bg-white rounded-2xl border shadow-md p-5 cursor-pointer group hover:-translate-y-2 transition-all relative">
      <button
        data-hs-overlay="#hs-overlay-body-scrolling"
        type="button"
        onClick={() => {
          setAddItem("edit_product");
          setSidenavInputs({
            name: product?.name || product?.productNameEn,
            description: product?.description,
            image: product?.image || product?.productImage,
            tagline: product?.tagline || product?.productSku,
            units_sold: product?.units_sold,
            price: product?.price || product?.sellPrice,
            category: product?.category || product?.categoryName,
            created_at: product?.created_at,
            images: product?.images,
            quickstoredashboard_stores_category:
              product?.quickstoredashboard_stores_category ||
              product?.sourceFrom,
            _id: product?._id,
          });
          openSidenav();
        }}
        className="hidden group-hover:flex bg-gray-100 w-10 h-10  items-center justify-center rounded-full cursor-pointer absolute top-4 right-4"
      >
        <FiEdit className="text-lg text-blue-600" />
      </button>

      <div className="w-6/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
        <img
          src={
            product?.image ||
            product?.productImage ||
            (product?.images &&
              product?.images.length > 0 &&
              product?.images[0]) ||
            "https://cdn-icons-png.flaticon.com/128/15234/15234678.png"
          }
          alt="Product 1"
          className="h-full rounded-lg w-full object-cover"
        />
      </div>

      <div>
        <h3
          onClick={() =>
            handleQuickNavigate(
              `data/products/${product?._id}/view-product`,
              user
            )
          }
          className="text-lg hover:text-blue-500 font-extrabold text-ellipsis line-clamp-1 text-gray-800"
        >
          {product?.name || product?.productNameEn || "Product name"}
        </h3>
        <p className="text-gray-600 text-sm mt-2">
          {product?.tagline ||
            product?.productSku ||
            "product short description"}
        </p>
        <h4 className="text-lg text-gray-800 font-bold mt-4">
          ${product?.price || product?.sellPrice || 0}
        </h4>
      </div>
    </div>
  );
}
