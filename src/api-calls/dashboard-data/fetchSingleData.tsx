import { dashboard_server } from "@/data/urls";

export async function fetchMultipleStoreData(
  id: string,
  auth_id: string,
  token: string,
  requested_key: string,
  target_element_id: string
) {
  try {
    const response = await fetch(
      `${dashboard_server}/dashboards/stores/fetch-multiple-data-objects/${requested_key}/_id/${id}/_id/${target_element_id}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          authorization: `Bearer ${token}`,
          quickstoredashboard_account_user_id: `${id}`,
          participant_user: `${auth_id}`,
          participant_id: `${auth_id}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );
    const text = await response.text();
    const data = text ? JSON.parse(text) : null;
    if (response.ok) {
      return {
        data,
        response: "ok",
        message: `${data?.message}`,
      };
    } else {
      console.log("Response not OK:", response.statusText);
      return {
        response: "error",
        message: `${data?.message}`,
      };
    }
  } catch (error: any) {
    console.log("Error fetching data:", error.message);
    return {
      response: "error",
      message: `Faiiled to add ${error?.message}`,
    };
  }
}
