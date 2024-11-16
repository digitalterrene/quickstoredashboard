export const calculateTotalGlobalCountries = (customers: any) => {
  if (!Array.isArray(customers)) {
    throw new Error("The input must be an array of customers.");
  }

  const countryCounts: Record<string, number> = {};

  customers.forEach((customer) => {
    if (customer && typeof customer.location === "string") {
      const location = customer.location.trim();
      if (location) {
        countryCounts[location] = (countryCounts[location] || 0) + 1;
      }
    }
  });

  return countryCounts;
};
export const calculateTotalGlobalCountriesForManagement = (customers: any) => {
  if (!Array.isArray(customers)) {
    throw new Error("The input must be an array of customers.");
  }

  const countryCounts: Record<string, number> = {};

  customers.forEach((customer) => {
    if (customer && typeof customer.country === "string") {
      const country = customer.country.trim();
      if (country) {
        countryCounts[country] = (countryCounts[country] || 0) + 1;
      }
    }
  });

  return countryCounts;
};
