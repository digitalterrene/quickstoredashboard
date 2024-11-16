export const calculateTotalCustomerOrders = (customers: any[]) => {
  if (!Array.isArray(customers)) {
    throw new Error("The input must be an array of customers.");
  }

  let totalOrders = 0;

  customers.forEach((customer) => {
    if (customer && Array.isArray(customer.orders)) {
      totalOrders += customer.orders.length;
    }
  });

  return totalOrders;
};
