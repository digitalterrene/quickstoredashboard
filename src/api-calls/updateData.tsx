import { dashboard_server } from "@/data/urls";

// Define a type for the keys to update
interface KeyToUpdate {
  [key: string]: string;
}

export async function updateData(
  id: string,
  type_: any,
  auth_id: string,
  token: string,
  pok: string,
  keys_to_update: KeyToUpdate[] // Use the defined type
) {
  try {
    const directory =
      type_ === "participant-logged-in" ? "dashboards" : "dashboards";

    const failedKeys: string[] = [];

    for (const key of keys_to_update) {
      const objKey = Object.keys(key)[0];
      const objValue = key[objKey];

      const response = await fetch(
        `${dashboard_server}/${directory}/stores/update-set-single-data-objects/${pok}/_id/${id}`,
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
            key_to_update: objKey,
            value_to_update: objValue,
          }),
        }
      );

      if (!response.ok) {
        failedKeys.push(objKey);
      }
    }

    if (failedKeys.length === 0) {
      return "All information was successfully updated.";
    } else {
      return failedKeys;
    }
  } catch (error: any) {
    console.log(error.message);
    return {};
  }
}
