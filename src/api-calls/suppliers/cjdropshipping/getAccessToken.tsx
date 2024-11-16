export const getAccessToken = async (email: string, password: string) => {
  const url =
    "https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
