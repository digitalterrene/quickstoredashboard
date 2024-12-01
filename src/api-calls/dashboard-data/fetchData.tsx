import { dashboard_server } from "@/data/urls";

export async function fetchData(
  id: string,
  type_: any,
  auth_id: string,
  token: string,
  requested_key: string
) {
  try {
    const directory =
      type_ === "participant-logged-in" ? "accounts" : "dashboards";
    const response = await fetch(
      `${dashboard_server}/${directory}/stores/fetch-multiple-data-objects/_id/${id}/${requested_key}`,
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
        message: `Successfully fetched ${requested_key}`,
      };
    } else {
      console.log("Response not OK:", response.statusText);
      return {
        response: "error",
        message: `Failed to fetch ${requested_key}`,
      };
    }
  } catch (error: any) {
    console.log("Error fetching data:", error.message);
    return {
      response: "error",
      message: `Failed to add ${error?.message}`,
    };
  }
}
