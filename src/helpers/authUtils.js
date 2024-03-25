import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

/**
 * Checks if user is authenticated
 */

const isUserAuthenticated = () => {
  const user = getLoggedInUser();
  if (!user) {
    return false;
  }

  try {
    const decoded = jwtDecode(user.token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      return false;
    } else {
      return true;
    }
  } catch (e) {
    console.warn("access token expired");
    return false;
  }
};

/**
 * Sets the logged in user
 */
const setLoggedInUser = (user) => {
  //   const dispatch = useDispatch();
  localStorage.setItem("authUser", JSON.stringify(user));

  //   dispatch(loginUserSuccess(user));
};

/**
 * Returns the logged in user
 */
const getLoggedInUser = () => {
  const user = localStorage.getItem("authUser");
  //   const user1 = useSelector((state) => state.auth.user);
  //   console.log("user in authUtils", user1);
  return user ? (typeof user == "object" ? user : JSON.parse(user)) : null;
};

export { isUserAuthenticated, setLoggedInUser, getLoggedInUser };
