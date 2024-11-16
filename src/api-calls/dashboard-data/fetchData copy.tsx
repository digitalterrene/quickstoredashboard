import { dashboard_server } from "@/data/urls";

export async function fetchDatas(
  id: string,
  type_: any,
  auth_id: string,
  token: string,
  string_data_promises: string[],
  object_data_promises: string[]
) {
  try {
    const stringDataPromises = string_data_promises?.map(async (object_key) => {
      try {
        const directory =
          type_ === "participant-logged-in"
            ? "accounts"
            : "dashboards/participants";

        const response = await fetch(
          `${dashboard_server}/${directory}/fetch-single-data-strings/_id/${id}/${object_key}`,
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

        if (response.ok) {
          const text = await response.text();
          const json = text ? JSON.parse(text) : null;
          return { [object_key]: json };
        } else {
          console.log("Response not OK:", response.statusText);
          return { [object_key]: null };
        }
      } catch (error: any) {
        console.log("Error fetching data:", error.message);
        return { [object_key]: null };
      }
    });

    const objectDataPromises = object_data_promises?.map(async (object_key) => {
      try {
        const directory =
          type_ === "participant-logged-in"
            ? "accounts"
            : "dashboards/participants";

        const response = await fetch(
          `${dashboard_server}/${directory}/fetch-single-data-objects/_id/${id}/${object_key}`,
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

        if (response.ok) {
          const text = await response.text();
          const json = text ? JSON.parse(text) : null;
          return { [object_key]: json };
        } else {
          console.log("Response not OK:", response.statusText);
          return { [object_key]: null };
        }
      } catch (error: any) {
        console.log("Error fetching data:", error.message);
        return { [object_key]: null };
      }
    });

    const [stringData, objectData] = await Promise.all([
      Promise.all(stringDataPromises),
      Promise.all(objectDataPromises),
    ]);

    const userData = {
      ...Object.assign({}, ...stringData),
      ...Object.assign({}, ...objectData),
    };

    return userData;
  } catch (error: any) {
    console.log("Error:", error.message);
    return {};
  }
}
