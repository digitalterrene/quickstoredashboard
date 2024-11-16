export const calculateTotalSales = (products: any[]) => {
  if (!Array.isArray(products)) {
    throw new Error("The input must be an array of products.");
  }

  return products.reduce((total, product) => {
    let productTotalSales = 0;

    if (
      product &&
      typeof product.price !== "undefined" &&
      typeof product.units_sold !== "undefined"
    ) {
      // Check if product.price and product.units_sold are numbers or strings that can be converted to numbers
      const price = parseFloat(product.price);
      const unitsSold = parseFloat(product.units_sold);

      if (!isNaN(price) && !isNaN(unitsSold)) {
        productTotalSales = price * unitsSold;
      }
    }

    return total + productTotalSales;
  }, 0);
};
