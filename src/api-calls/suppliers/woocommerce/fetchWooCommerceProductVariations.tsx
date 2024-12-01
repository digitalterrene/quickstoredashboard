import { ProductVariationsObjectType } from "@/ts-types/data";

export async function fetchWooCommerceProductVariations(
  wc_base_url: string, // WooCommerce base URL
  wc_consumer_key: string, // WooCommerce Consumer Key
  wc_consumer_secret: string, // WooCommerce Consumer Secret
  product_id: number // ID of the product to fetch variations for
): Promise<{
  data: ProductVariationsObjectType[];
  response: string;
  message: string;
}> {
  try {
    const wc_endpoint = `${wc_base_url}/wp-json/wc/v3/products/${product_id}/variations`;
    const authHeader = btoa(`${wc_consumer_key}:${wc_consumer_secret}`);

    const response = await fetch(wc_endpoint, {
      method: "GET",
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      // Initialize an array to store mapped variations
      const mappedVariations: ProductVariationsObjectType[] = [];

      // A set to keep track of unique keys for variations
      const uniqueVariationKeys = new Set<string>();

      // Process each variation from the WooCommerce response
      data.forEach((variation: any) => {
        // Iterate over each attribute in the variation
        variation.attributes?.forEach((attribute: any) => {
          // Create a unique key based on data_type, label, and name
          const uniqueKey = `${attribute.name}-${attribute.slug}-${attribute.option}`;

          // Check if the key is already in the set
          if (!uniqueVariationKeys.has(uniqueKey)) {
            // Add the unique key to the set
            uniqueVariationKeys.add(uniqueKey);

            // Create a custom object for each attribute
            const customVariation: ProductVariationsObjectType = {
              data_type: attribute.name, // Use attribute name as data_type (e.g., "Color")
              label: attribute.slug, // Use attribute slug as label (e.g., "color")
              name: attribute.option, // Use attribute option as name (e.g., "Yellow")
              description: variation.description,
              image: variation.image?.src || "",
              icon: "", // Assuming icon is handled separately
              dimensions: variation?.dimensions,
              on_sale: variation?.on_sale,
              permalink: variation?.permalink,
              price: variation?.price,
              parent_id: variation?.parent_id,
              sku: variation?.sku,
              stock_status: variation?.stock_status,
            };

            // Push the custom variation object to the mapped variations array
            mappedVariations.push(customVariation);
          }
        });
      });
      return {
        data: mappedVariations,
        response: "ok",
        message: "Successfully fetched WooCommerce product variations",
      };
    } else {
      console.error("Response not OK:", response.statusText);
      return {
        data: [],
        response: "error",
        message: `Failed to fetch WooCommerce product variations: ${response.statusText}`,
      };
    }
  } catch (error: any) {
    console.error(
      "Error fetching WooCommerce product variations:",
      error.message
    );
    return {
      data: [],
      response: "error",
      message: `Failed to fetch WooCommerce product variations: ${error?.message}`,
    };
  }
}
