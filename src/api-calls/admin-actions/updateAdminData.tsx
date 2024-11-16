import { dashboard_server } from "@/data/urls";
interface KeyValueObject {
  [key: string]: any;
}

export async function updateAdminData(
  id: string,
  auth_id: string,
  token: string,
  key_to_update: string,
  value_to_update: KeyValueObject
) {
  try {
    const response = await fetch(
      `${dashboard_server}/dashboards/update-set-single-data-objects/_id/${id}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          authorization: `Bearer ${token}`,
          quickstoredashboard_account_user_id: `${id}`,
          participant_user: `${auth_id}`,
          participant_id: `${auth_id}`,
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        body: JSON.stringify({
          key_to_update,
          value_to_update,
        }),
      }
    );

    if (response.ok) {
      return {
        response: "ok",
        message: `Successfully updated ${key_to_update} information`,
      };
    } else {
      return {
        response: "error",
        message: `Failed to update ${key_to_update} information`,
      };
    }
  } catch (error: any) {
    console.log(error.message);
    return {
      response: "error",
      message: "Something went wrong",
    };
  }
}
