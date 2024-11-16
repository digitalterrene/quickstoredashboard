import {
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
} from "firebase/auth";

import { firebaseAuth } from "./config";
import { dashboard_server } from "@/data/urls";

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(firebaseAuth, callback);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(firebaseAuth, provider);

    if (!result || !result.user) {
      console.log("Google sign in failed");
      return { message: "Google sign in failed" };
      // throw new Error("Google sign in failed");
    }
    // console.log({ google_user: result.user });
    const google_user = {
      name: result.user?.displayName,
      email: result.user?.email,
      auth_provider: "goggle",
      user_external_uid: result.user?.uid,
      image: result.user?.photoURL,
    };

    if (result.user) {
      const response = await fetch(
        `${dashboard_server}/dashboards/external-auth-provider/signin-user`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          credentials: "include",
          body: JSON.stringify(google_user),
        }
      );

      const json = await response.json();

      if (response.ok && json?._id) {
        const user = { ...json, lastLogin: new Date() };
        return user;
      } else {
        return { error: json?.error };
      }
    }
    //fetch a user with that google_uid
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}
export async function signUpWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(firebaseAuth, provider);

    if (!result || !result.user) {
      console.log("Google sign in failed");
      return { message: "Google sign in failed" };
      // throw new Error("Google sign in failed");
    }
    // console.log({ google_user: result.user });
    const google_user = {
      name: result.user?.displayName,
      email: result.user?.email,
      auth_provider: "goggle",
      user_external_uid: result.user?.uid,
      image: result.user?.photoURL,
    };

    if (result.user) {
      const response = await fetch(
        `${dashboard_server}/dashboards/external-auth-provider/upsert-new`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          credentials: "include",
          body: JSON.stringify(google_user),
        }
      );

      const json = await response.json();

      if (response.ok && json?._id) {
        const user = { ...json, lastLogin: new Date() };
        return user;
      } else {
        return { error: json?.error };
      }
    }
    //fetch a user with that google_uid
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}
export async function signOutWithGoogle() {
  try {
    await firebaseAuth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}
