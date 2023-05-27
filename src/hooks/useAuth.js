import { useEffect, useState } from "react";

import { useAuthContext } from "../context/AuthContext";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { currentUser } = useAuthContext();

  useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [currentUser]);

  return { isLoggedIn };
};

export default useAuth;
