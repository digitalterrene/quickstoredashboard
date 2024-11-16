export const calculateTotalInvoicedProducts = (invoices: any[]) => {
  if (!Array.isArray(invoices)) {
    throw new Error("The input must be an array of invoices.");
  }

  let totalProducts = 0;

  invoices.forEach((invoice) => {
    if (invoice && Array.isArray(invoice.products)) {
      totalProducts += invoice.products.length;
    }
  });

  return totalProducts;
};
