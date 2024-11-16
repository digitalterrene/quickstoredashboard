export const calculateValue = (products: any[]) => {
  if (!Array.isArray(products)) {
    throw new Error("The input must be an array of products.");
  }

  return products.reduce((total, product) => {
    if (product && typeof product.price === "number") {
      return total + product.price;
    }
    return total;
  }, 0);
};
