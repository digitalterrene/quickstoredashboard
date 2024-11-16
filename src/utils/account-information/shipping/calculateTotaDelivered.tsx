export const calculateTotalDelivered = (shipping: any[]) => {
  if (!Array.isArray(shipping)) {
    throw new Error("The input must be an array of shipping.");
  }

  let femaleCount = 0;

  shipping.forEach((ship) => {
    if (
      ship &&
      ship.delivery_status &&
      ship.delivery_status.toLowerCase() === "delivered"
    ) {
      femaleCount++;
    }
  });

  return femaleCount;
};
