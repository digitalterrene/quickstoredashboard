export const calculateTotalCustomers = (data_array: any[]) => {
  if (!Array.isArray(data_array)) {
    throw new Error("The input must be an array of data_array.");
  }

  const uniqueCustomers = new Set(); // Using Set to ensure uniqueness of customer names

  data_array.forEach((data) => {
    if (data && typeof data.customer_name === "string") {
      uniqueCustomers.add(data.customer_name.trim()); // Add trimmed customer name to set
    }
  });

  return uniqueCustomers.size; // Return the size of the set, which represents the number of unique customers
};
