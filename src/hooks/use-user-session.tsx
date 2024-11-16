import { useEffect, useState } from "react";

import { onAuthStateChanged } from "../libs/firebase/auth";
import { useRouter } from "next/navigation";

export function useUserSession(InitSession: string | null) {
  const [userUid, setUserUid] = useState<string | null>(InitSession);
  const router = useRouter();
  // Listen for changes to the user session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser: any) => {
      if (authUser) {
        setUserUid(authUser?.uid);
        const user = authUser?.user;
        const authenticationStatus = user?.uid ? "logged-in" : "not-logged-in";
        const authenticationToken = user?.token || "No auth token provided";

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            _id: authUser.uid,
            lastLogin: new Date(),
          })
        );
        router.refresh();
        router.push(
          `/${authUser?.uid}/dashboard?authenticationStatus=${authenticationStatus}&&authenticationToken=${authenticationToken}`
        );
      } else {
        setUserUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return userUid;
}
