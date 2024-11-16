export const calculateTotalOrdersValue = (orders: any[]) => {
  if (!Array.isArray(orders)) {
    throw new Error("The input must be an array of orders.");
  }

  let totalValue = 0;

  orders.forEach((order: any) => {
    if (order && Array.isArray(order.products)) {
      order.products.forEach((product: any) => {
        if (
          product &&
          typeof product.price === "number" &&
          typeof product.quantity === "number"
        ) {
          totalValue += product.price * product.quantity;
        }
      });
    }
  });

  return totalValue;
};
