// Function to fetch WooCommerce categories from the WooCommerce store
export async function fetchWooCommerceCategories(
  wc_base_url: string, // WooCommerce base URL
  wc_consumer_key: string, // WooCommerce Consumer Key
  wc_consumer_secret: string // WooCommerce Consumer Secret
) {
  try {
    // WooCommerce API endpoint for fetching categories
    const wc_endpoint = `${wc_base_url}/wp-json/wc/v3/products/categories`;

    // Basic Authentication for WooCommerce API
    const authHeader = btoa(`${wc_consumer_key}:${wc_consumer_secret}`);

    const response = await fetch(wc_endpoint, {
      method: "GET",
      headers: {
        Authorization: `Basic ${authHeader}`, // Use Basic Authentication with encoded credentials
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      return {
        data,
        response: "ok",
        message: "Successfully fetched WooCommerce categories",
      };
    } else {
      console.error("Response not OK:", response.statusText);
      return {
        response: "error",
        message: `Failed to fetch WooCommerce categories: ${response.statusText}`,
      };
    }
  } catch (error: any) {
    console.error("Error fetching WooCommerce categories:", error.message);
    return {
      response: "error",
      message: `Failed to fetch WooCommerce categories: ${error?.message}`,
    };
  }
}
