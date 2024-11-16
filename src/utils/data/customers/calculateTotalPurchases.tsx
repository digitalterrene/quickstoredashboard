export const calculateTotalPurchases = (customers: any[]) => {
  if (!Array.isArray(customers)) {
    throw new Error("The input must be an array of customers.");
  }

  return customers.reduce((total, purchases) => {
    let valid_products = 0;
    if (purchases && typeof purchases.purchases !== "undefined") {
      // Check if purchases.purchases is a number or a string that can be converted to a number
      const unitsSold = parseFloat(purchases.purchases);
      if (!isNaN(unitsSold)) {
        valid_products += unitsSold;
      }
    }
    return total + valid_products;
  }, 0);
};
