export const calculateTotalFemaleCustomers = (customers: any[]) => {
  if (!Array.isArray(customers)) {
    throw new Error("The input must be an array of customers.");
  }

  let femaleCount = 0;

  customers.forEach((customer) => {
    if (
      customer &&
      customer.gender &&
      customer.gender.toLowerCase() === "female"
    ) {
      femaleCount++;
    }
  });

  return femaleCount;
};
