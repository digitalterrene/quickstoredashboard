import { dashboard_server } from "@/data/urls";

export async function addToSet(
  id: string,
  auth_id: string,
  token: string,
  data_to_add: any
) {
  try {
    const response = await fetch(
      `${dashboard_server}/dashboards/stores/add-new-data/_id/${id}/add_to_set`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          authorization: `Bearer ${token}`,
          quickstoredashboard_account_user_id: `${id}`,
          participant_user: `${auth_id}`,
          participant_id: `${auth_id}`,
          element_id: "undefined",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data_to_add),
        cache: "no-store",
      }
    );
    const text = await response.text();
    const data = text ? JSON.parse(text) : null;
    if (response.ok) {
      return {
        data,
        response: "ok",
        message: `Sucessfully add to ${data_to_add?.key_to_update}`,
      };
    } else {
      console.log("Response not OK:", response.statusText);
      return {
        response: "error",
        message: `Faiiled to add ${data?.message}`,
      };
    }
  } catch (error: any) {
    console.log("Error addinng data:", error.message);
    return {
      response: "error",
      message: `Faiiled to add ${error?.message}`,
    };
  }
}
