"use client";
import { dashboard_server } from "@/data/urls";
import { usePathname, useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Rings } from "react-loader-spinner";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [state, dispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);
  const pathname = usePathname();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser) {
        const lastLogin = new Date(storedUser.lastLogin);
        const now = new Date();

        if (now - lastLogin > 24 * 60 * 60 * 1000) {
          // If more than a day has passed, refresh the token
          refreshToken(storedUser);
        } else {
          dispatch({ type: "LOGIN", payload: storedUser });
        }

        // Check for token refresh every time the user visits the app
        if (pathname === "/") {
          const authenticationStatus = storedUser._id
            ? "logged-in"
            : "not-logged-in";
          const authenticationToken = storedUser.token;
          const authenticationID = storedUser._id;

          router.push(
            `?authenticationStatus=${authenticationStatus}&&authenticationID=${authenticationID}&&authenticationToken=${authenticationToken}`,
            { scroll: false }
          );
        }
      }
    }
  }, [loading, pathname]);

  const refreshToken = async (user) => {
    try {
      const response = await fetch(
        `${dashboard_server}/dashboards/refresh-token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          credentials: "include",
          body: JSON.stringify({ userId: user._id }),
        }
      );

      const json = await response.json();

      if (response.ok) {
        const updatedUser = {
          ...user,
          token: json.token,
          lastLogin: new Date(),
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        dispatch({ type: "LOGIN", payload: updatedUser });
        router.refresh();
      } else {
        console.error("Failed to refresh token", json.error);
      }
    } catch (error) {
      console.error("An error occurred while refreshing token", error);
    }
  };

  return (
    <div className={` ${loading ? "bg-gray-200 w-screen h-screen" : ""} `}>
      <AuthContext.Provider value={{ ...state, dispatch }}>
        {loading ? (
          <div className="w-full h-screen flex justify-center items-center">
            <Rings
              visible={true}
              height="80"
              className="mt-[50%] "
              width="80"
              color="#0D99FF"
              ariaLabel="rings-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
            <img className="w-16" style={{ width: 150 }} src="/logo.png" />
          </div>
        ) : (
          <>{children}</>
        )}
      </AuthContext.Provider>
    </div>
  );
};

export const useAuthContext = () => useContext(AuthContext);
