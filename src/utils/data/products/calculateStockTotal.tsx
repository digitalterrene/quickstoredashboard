export const calculateStockTotal = (products: any[]) => {
  if (!Array.isArray(products)) {
    throw new Error("The input must be an array of products.");
  }

  return products.reduce((total, product) => {
    let productTotalSales = 0;

    if (
      product &&
      typeof product.price !== "undefined" &&
      typeof product.stock_count !== "undefined"
    ) {
      // Check if product.price and product.stock_count are numbers or strings that can be converted to numbers
      const price = parseFloat(product.price);
      const unitsSold = parseFloat(product.stock_count);

      if (!isNaN(price) && !isNaN(unitsSold)) {
        productTotalSales = price * unitsSold;
      }
    }

    return total + productTotalSales;
  }, 0);
};
