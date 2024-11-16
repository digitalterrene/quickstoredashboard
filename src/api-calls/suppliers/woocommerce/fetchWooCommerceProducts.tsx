// Function to fetch WooCommerce products directly from the WooCommerce store
export async function fetchWooCommerceProducts(
  wc_base_url: string, // WooCommerce base URL
  wc_consumer_key: string, // WooCommerce Consumer Key
  wc_consumer_secret: string, // WooCommerce Consumer Secret
  page: number = 1, // Pagination page number
  per_page: number = 50 // Number of products per page
) {
  try {
    // WooCommerce API endpoint for fetching products
    const wc_endpoint = `${wc_base_url}/wp-json/wc/v3/products?page=${page}&per_page=${per_page}`;

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
        message: "Successfully fetched WooCommerce products",
      };
    } else {
      console.error("Response not OK:", response.statusText);
      return {
        response: "error",
        message: `Failed to fetch WooCommerce products: ${response.statusText}`,
      };
    }
  } catch (error: any) {
    console.error("Error fetching WooCommerce products:", error.message);
    return {
      response: "error",
      message: `Failed to fetch WooCommerce products: ${error?.message}`,
    };
  }
}
