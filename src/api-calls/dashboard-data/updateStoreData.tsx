import { dashboard_server } from "@/data/urls";

// Define a type for the keys to update
interface KeyToUpdate {
  // [key: string]: string | [];
  key: string;
  value: string | number | any[];
}

export async function updateStoreData(
  id: string,
  type_: any,
  auth_id: string,
  token: string,
  pok: string,
  data: { _id: string; keys_to_update: KeyToUpdate[] } // Use the defined type
) {
  try {
    const directory =
      type_ === "participant-logged-in" ? "dashboards" : "dashboards";
    const target_element_id = data?._id;
    const failedKeys: string[] = [];

    for (const current_object of data?.keys_to_update) {
      // const objKey = Object.keys(key)[0];
      // const objValue = key[objKey];

      const response = await fetch(
        `${dashboard_server}/${directory}/stores/update-set-single-data-objects/${pok}/_id/${id}/${target_element_id}`,
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
            key_to_update: `${current_object?.key}`, // Use key directly
            value_to_update: current_object.value, // Use keys_to_update[key] directly
            // value_to_update: `${current_object.value}`, // Use keys_to_update[key] directly
          }),
        }
      );

      if (!response.ok) {
        failedKeys.push(current_object?.key);
      }
    }

    if (failedKeys.length === 0) {
      return {
        response: "ok",
        message: "All information was successfully updated",
      };
      // return "All information was successfully updated.";
    } else {
      return {
        response: "error",
        message: `Failed to update ${failedKeys[0]}`,
      };
      //return failedKeys;
    }
  } catch (error: any) {
    console.log(error.message);
    return {
      response: "error",
      message: "Something went wrong",
    };
  }
}
