export const calculateTotalOrderedProducts = (orders: any[]) => {
  if (!Array.isArray(orders)) {
    throw new Error("The input must be an array of orders.");
  }

  let totalProducts = 0;

  orders.forEach((order) => {
    if (order && Array.isArray(order.products)) {
      totalProducts += order.products.length;
    }
  });

  return totalProducts;
};
