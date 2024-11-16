export const calculateUniqueProductsTotal = (products: any[]) => {
  if (!Array.isArray(products)) {
    throw new Error("The input must be an array of products.");
  }

  // Create a Map to store unique products by a unique identifier, e.g., product.id
  const uniqueProductsMap = new Map();

  products.forEach((product) => {
    if (product && typeof product.id !== "undefined") {
      // Use product.id as the key to ensure uniqueness
      uniqueProductsMap.set(product.id, product);
    }
  });

  // Calculate the total value of unique products
  const total = Array.from(uniqueProductsMap.values()).reduce(
    (sum, product) => {
      let productTotalValue = 0;

      if (product && typeof product.price !== "undefined") {
        // Parse price as a number
        const price = parseFloat(product.price);

        if (!isNaN(price)) {
          productTotalValue = price; // Just use price since stock_count isn't needed
        }
      }

      return sum + productTotalValue;
    },
    0
  );

  // Return the total rounded to two decimal points
  return parseFloat(total.toFixed(2));
};
