export const calculateTotalSoldProducts = (sales: any[]) => {
  if (!Array.isArray(sales)) {
    throw new Error("The input must be an array of sales.");
  }

  let totalProducts = 0;

  sales.forEach((order) => {
    if (order && Array.isArray(order.products)) {
      totalProducts += order.products.length;
    }
  });

  return totalProducts;
};
