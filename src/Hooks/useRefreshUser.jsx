import { useEffect } from "react";
import useAuth from "./useAuth";

const useRefreshUser = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      user.reload().then(() => {
        // console.log("User reloaded");
      });
    }
  }, [user]);
};
export default useRefreshUser;