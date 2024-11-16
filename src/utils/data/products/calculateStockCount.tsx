export const calculateStockCount = (products: any[]) => {
  if (!Array.isArray(products)) {
    throw new Error("The input must be an array of products.");
  }

  return products.reduce((total, product) => {
    let valid_products = 0;
    if (product && typeof product.stock_count !== "undefined") {
      // Check if product.stock_count is a number or a string that can be converted to a number
      const unitsSold = parseFloat(product.stock_count);
      if (!isNaN(unitsSold)) {
        valid_products += unitsSold;
      }
    }
    return total + valid_products;
  }, 0);
};
