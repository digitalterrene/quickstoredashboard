export const calculateTotalCustomers = (sales: any[]) => {
  if (!Array.isArray(sales)) {
    throw new Error("The input must be an array of sales.");
  }

  const uniqueCustomers = new Set(); // Using Set to ensure uniqueness of customer names

  sales.forEach((sale) => {
    if (sale && typeof sale.buyer_name === "string") {
      uniqueCustomers.add(sale.buyer_name.trim()); // Add trimmed customer name to set
    }
  });

  return uniqueCustomers.size; // Return the size of the set, which represents the number of unique customers
};
