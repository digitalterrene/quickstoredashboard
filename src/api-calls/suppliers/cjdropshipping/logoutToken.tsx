export const logoutToken = async (accessToken: string) => {
  const url =
    "https://developers.cjdropshipping.com/api2.0/v1/authentication/logout";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "CJ-Access-Token": accessToken,
    },
  });

  const result = await response.json();
  // console.log("Logout Response status:", response.status);
  // console.log("Logout Response body:", result);

  if (!response.ok || result.success === false) {
    throw new Error(result.message || "Failed to logout");
  }

  return result;
};
