export const calculateTotalMaleCustomers = (customers: any[]) => {
  if (!Array.isArray(customers)) {
    throw new Error("The input must be an array of customers.");
  }

  let maleCount = 0;

  customers.forEach((customer) => {
    if (
      customer &&
      customer.gender &&
      customer.gender.toLowerCase() === "male"
    ) {
      maleCount++;
    }
  });

  return maleCount;
};
