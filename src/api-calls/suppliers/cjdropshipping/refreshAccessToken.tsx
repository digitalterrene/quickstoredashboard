export const refreshAccessToken = async (refreshToken: string) => {
  const url =
    "https://developers.cjdropshipping.com/api2.0/v1/authentication/refreshAccessToken";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken,
    }),
  });

  const result = await response.json();
  // console.log("Refresh Response status:", response.status);
  // console.log("Refresh Response body:", result);

  if (!response.ok || result.success === false) {
    throw new Error(result.message || "Failed to refresh access token");
  }

  return result;
};
