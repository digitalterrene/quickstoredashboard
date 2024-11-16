export const calculateTotalCustomers = (products: any[]) => {
  if (!Array.isArray(products)) {
    throw new Error("The input must be an array of products.");
  }

  const uniqueCustomers = new Set(); // Using Set to ensure uniqueness of customer names

  products.forEach((product) => {
    if (product && typeof product.customer_name === "string") {
      uniqueCustomers.add(product.customer_name.trim()); // Add trimmed customer name to set
    }
  });

  return uniqueCustomers.size; // Return the size of the set, which represents the number of unique customers
};
