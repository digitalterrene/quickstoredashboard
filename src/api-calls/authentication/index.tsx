import { dashboard_server } from "@/data/urls";
import { UserProfileType } from "@/ts-types/user-type";

export const signin_user = async (userData: UserProfileType) => {
  try {
    const response = await fetch(`${dashboard_server}/dashboards/upsert-new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) {
      return { response: "error", message: data?.error };
    } else {
      return { data, response: "ok", message: "Successfully created new user" };
    }
  } catch (error: any) {
    console.error("Error signing up user:", error.message);
    throw error;
  }
};
