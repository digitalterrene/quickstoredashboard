"use client";
import { fetchWooCommerceProducts } from "@/api-calls/suppliers/woocommerce/fetchWooCommerceProducts";
import WoocommercePageSettingsComponent from "@/components/ui-components/data/suppliers/headers/settings-components/WoocommercePageSettingsComponent";
import SuppliersHeaderPanel from "@/components/ui-components/data/suppliers/headers/SuppliersHeaderPanel";
import WoocommerceProductsTable from "@/components/ui-components/data/suppliers/tables/WoocommerceProductsTable";
import React, { useEffect, useState } from "react";

export default function WoocommercePage({
  suppliers_configurations,
}: {
  suppliers_configurations: any;
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const wc_suppliers_configurations = Array.isArray(suppliers_configurations) // Correct way to check if it is an array
    ? suppliers_configurations.find(
        (item: any) => item?.supplier === "woocommerce"
      )
    : suppliers_configurations;

  // WooCommerce API credentials and base URL
  const wc_base_url = wc_suppliers_configurations?.BASE_URL;
  const wc_consumer_key = wc_suppliers_configurations?.WC_CONSUMER_KEY;
  const wc_consumer_secret = wc_suppliers_configurations?.WC_CONSUMER_SECRET;
  console.log({ wc_suppliers_configurations });
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      // Fetch WooCommerce products
      const result: any = await fetchWooCommerceProducts(
        wc_base_url,
        wc_consumer_key,
        wc_consumer_secret,
        1, // Fetch the first page
        50 // Fetch 50 products per page
      );

      if (result.response === "ok") {
        setProducts(result.data); // Update state with fetched products
        console.log({ products: result.data });
      } else {
        setError(result.message); // Update state with error message
      }

      setLoading(false);
    };

    fetchProducts(); // Call the function to fetch products
  }, [suppliers_configurations]); // Empty dependency array to run effect only on mount

  return (
    <div className="flex items-start py-1 px-4">
      <div className="space-y-6 w-full py-2">
        <SuppliersHeaderPanel
          description="Free and open source platform, to empower anyone to sell anything, anywhere."
          title="Woocomerce Products"
          supplier="woocommerce"
          SETTINGS_COMPONENT={
            <WoocommercePageSettingsComponent
              suppliers_configurations={wc_suppliers_configurations}
            />
          }
        />
        <WoocommerceProductsTable products={products || []} />
      </div>
    </div>
  );
}
