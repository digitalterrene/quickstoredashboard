"use client";

import SuppliersHeaderPanel from "@/components/ui-components/data/suppliers/headers/SuppliersHeaderPanel";
import React, { useEffect, useState } from "react";
import { CJDAccessTokenResponse } from "@/ts-types/cjdropshipping";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CJDProductsTable from "@/components/ui-components/data/suppliers/tables/CJDProductsTable";
import CJDropshippingPageSettingsComponent from "@/components/ui-components/data/suppliers/headers/settings-components/CJDropshippingPageSettingsComponent";

export default function CJDropshippingPage({
  cjd_category_list,
  cjd_product_list,
}: {
  cjd_category_list: any;
  cjd_product_list: any;
}) {
  const router = useRouter();

  // Initialize state for categories and products
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const ensureAccessToken = async () => {
      try {
        const url = new URL(window.location.href);
        const urlParams = new URLSearchParams(url.search);
        const accessTokenParam = urlParams.get("cjdAccessToken");

        if (!accessTokenParam) {
          const storedDataString = localStorage.getItem(
            "quickstoredashboard-cjd-user"
          );
          if (!storedDataString) {
            throw new Error("No user data found in local storage");
          }

          const storedData: CJDAccessTokenResponse =
            JSON.parse(storedDataString);
          const accessToken = storedData?.data?.accessToken;

          if (!accessToken) {
            throw new Error("No access token found");
          }

          // Add the access token to the URL parameters
          urlParams.set("cjdAccessToken", accessToken);
          url.search = urlParams.toString();
          router.replace(url.toString(), undefined);
        }
      } catch (err: any) {
        toast.error(err.message);
        console.error("Error ensuring access token:", err.message);
      }
    };

    ensureAccessToken();
  }, [router]);

  useEffect(() => {
    if (cjd_category_list && cjd_product_list) {
      // Save categories and products to local storage
      localStorage.setItem(
        "cjd_category_list",
        JSON.stringify(cjd_category_list)
      );
      localStorage.setItem(
        "cjd_product_list",
        JSON.stringify(cjd_product_list)
      );
    } else {
      // Retrieve from local storage if props are not valid
      const storedCategories = localStorage.getItem("cjd_category_list");
      const storedProducts = localStorage.getItem("cjd_product_list");

      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      }

      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
    }
  }, [cjd_category_list, cjd_product_list]);

  return (
    <div className="flex items-start py-1 px-4">
      <div className="space-y-6 w-full py-2">
        <SuppliersHeaderPanel
          description="Dropshipping from Worldwide to Worldwide!"
          supplier="cjdropshipping"
          title="CJ Dropshipping Products"
          SETTINGS_COMPONENT={<CJDropshippingPageSettingsComponent />}
        />
        We are working on this
        <CJDProductsTable
          products={products.length ? products : cjd_product_list || []}
        />
      </div>
    </div>
  );
}
