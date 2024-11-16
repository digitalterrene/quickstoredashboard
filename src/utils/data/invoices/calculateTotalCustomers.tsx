export const calculateTotalCustomers = (invoices: any[]) => {
  if (!Array.isArray(invoices)) {
    throw new Error("The input must be an array of invoices.");
  }

  const uniqueCustomers = new Set(); // Using Set to ensure uniqueness of customer names

  invoices.forEach((invoice) => {
    if (invoice && typeof invoice.buyer_name === "string") {
      uniqueCustomers.add(invoice.buyer_name.trim()); // Add trimmed customer name to set
    }
  });

  return uniqueCustomers.size; // Return the size of the set, which represents the number of unique customers
};
