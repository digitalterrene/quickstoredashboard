export const calculateTotalCountries = (customers: any[]) => {
  if (!Array.isArray(customers)) {
    throw new Error("The input must be an array of customers.");
  }

  const uniqueCountries = new Set(); // Using Set to ensure uniqueness of customer names

  customers.forEach((invoice) => {
    if (invoice && typeof invoice.location === "string") {
      uniqueCountries.add(invoice.location.trim()); // Add trimmed customer name to set
    }
  });

  return uniqueCountries.size; // Return the size of the set, which represents the number of unique Countries
};
