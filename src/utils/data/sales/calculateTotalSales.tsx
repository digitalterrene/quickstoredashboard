export const calculateTotalSales = (sales: any[]) => {
  if (!Array.isArray(sales)) {
    throw new Error("The input must be an array of sales.");
  }

  return sales.reduce((total, sale) => {
    let valid_products = 0;
    if (sale && typeof sale.total_amount !== "undefined") {
      // Check if sales.sales is a number or a string that can be converted to a number
      const unitsSold = parseFloat(sale.total_amount);
      if (!isNaN(unitsSold)) {
        valid_products += unitsSold;
      }
    }
    return total + valid_products;
  }, 0);
};
