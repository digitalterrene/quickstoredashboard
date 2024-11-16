export const calculateTotalInvoicesValue = (invoices: any[]) => {
  if (!Array.isArray(invoices)) {
    throw new Error("The input must be an array of invoices.");
  }

  let totalValue = 0;

  invoices.forEach((order: any) => {
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
