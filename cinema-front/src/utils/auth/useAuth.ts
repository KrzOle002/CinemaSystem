import axios from "axios";
import { useAuthHeader, useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { useUserAuthContext } from "../../context/UserAuthContext";
import { useEffect, useMemo } from "react";

const useAuthHook = () => {
  const isAuthenticated = useIsAuthenticated();
  const { setUserData } = useUserAuthContext();
  const auth = useAuthUser();
  const userName = auth() != null ? auth()?.email : "";
  const authHeaderData = useAuthHeader();
  const authHead = authHeaderData() ? authHeaderData().slice(7) : "";

  const axiosAuth = useMemo(
    () =>
      axios.create({
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${authHead}`,
        },
      }),
    [authHead],
  );
  const api = import.meta.env.VITE_API_BASE_URL;
  const getData = async () => {
    try {
      const response = await axiosAuth.get(api + "/api/auth/me");
      console.log(response.data);
      setUserData(response.data);
    } catch (error) {
      console.error("Błąd podczas pobierania danych:", error);
    }
  };

  return {
    getData,
    isAuthenticated,
    axiosAuth,
    userName,
    authHead,
    api,
  };
};

export default useAuthHook;
