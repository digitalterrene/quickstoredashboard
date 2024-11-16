export const calculateUnitsSold = (products: any[]) => {
  if (!Array.isArray(products)) {
    throw new Error("The input must be an array of products.");
  }

  return products.reduce((total, product) => {
    let valid_products = 0;
    if (product && typeof product.units_sold !== "undefined") {
      // Check if product.units_sold is a number or a string that can be converted to a number
      const unitsSold = parseFloat(product.units_sold);
      if (!isNaN(unitsSold)) {
        valid_products += unitsSold;
      }
    }
    return total + valid_products;
  }, 0);
};
