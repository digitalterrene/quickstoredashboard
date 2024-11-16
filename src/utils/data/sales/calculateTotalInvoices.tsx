export const calculateTotalOrders = (invoices: any[]) => {
  if (!Array.isArray(invoices)) {
    throw new Error("The input must be an array of invoices.");
  }

  const uniqueInvoices = new Set(); // Using Set to ensure uniqueness of customer names

  invoices.forEach((order) => {
    if (order && typeof order.order_id === "string") {
      uniqueInvoices.add(order.order_id.trim()); // Add trimmed customer name to set
    }
  });

  return uniqueInvoices.size; // Return the size of the set, which represents the number of unique customers
};
