import useAuthContext from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext(),
    logout = () => {
      // Remove credentials from local storage
      localStorage.removeItem("user");
    };
  // Dispatch logout action
  dispatch({ type: "LOGOUT" });

  return logout;
};
