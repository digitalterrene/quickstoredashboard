export const calculateTotalAddresses = (shipippingArray: any[]) => {
  if (!Array.isArray(shipippingArray)) {
    throw new Error("The input must be an array of shipipping array.");
  }

  const uniqueAddresses = new Set(); // Using Set to ensure uniqueness of customer names

  shipippingArray.forEach((shipping) => {
    if (shipping && typeof shipping.delivery_address === "string") {
      uniqueAddresses.add(shipping.delivery_address.trim()); // Add trimmed customer name to set
    }
  });

  return uniqueAddresses.size; // Return the size of the set, which represents the number of unique Addresses
};
