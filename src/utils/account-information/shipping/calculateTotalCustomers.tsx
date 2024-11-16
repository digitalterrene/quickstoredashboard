export const calculateTotalCustomers = (shippingArray: any[]) => {
  if (!Array.isArray(shippingArray)) {
    throw new Error("The input must be an array of shipping array.");
  }

  const uniqueCustomers = new Set(); // Using Set to ensure uniqueness of customer names

  shippingArray.forEach((shipping) => {
    if (shipping && typeof shipping.customer_id === "string") {
      uniqueCustomers.add(shipping.customer_id.trim()); // Add trimmed customer name to set
    }
  });

  return uniqueCustomers.size; // Return the size of the set, which represents the number of unique customers
};
