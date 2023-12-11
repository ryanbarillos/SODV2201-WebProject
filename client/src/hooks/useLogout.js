import useAuthContext from "./useAuthContext";

const useLogout = () => {
  const { dispatch } = useAuthContext(),
    logout = () => {
      // Remove credentials from local storage
      localStorage.removeItem("user");
    };
  // Dispatch logout action
  dispatch({ type: "LOGOUT" });

  return logout;
};

export default useLogout;
