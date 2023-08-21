import { useContext } from "react";
import { UserContext } from "../UserContextProvider";

export default function useUser() {
  const userContext = useContext(UserContext);
  const { user, setUser } = userContext;

  const saveUser = (userData) => {
    if (userData) {
      const { username, id, theme } = userData;
      setUser({ username, id, theme });
    } else {
      setUser(null);
    }
  };

  return {
    user,
    setUser: saveUser,
  };
}
