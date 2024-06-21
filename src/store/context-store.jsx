import { createContext, useState } from "react";

export const StateContext = createContext({});

export default function StateContextProvider({ children }) {
  const [login, setLogin] = useState(false);

  const [user, setUser] = useState({});
  const [roleId, setRoleId] = useState(0);
  const loginstate = () => {
    setLogin(true);
  };
  const logoutstate = () => {
    setLogin(false);
  };

  const userState = (user) => {
    setUser(user);
  };
  const ctxValue = {
    login,
    loginstate,
    logoutstate,
    user,
    userState,
    roleId,
    setRoleId,
  };
  return (
    <StateContext.Provider value={ctxValue}>{children}</StateContext.Provider>
  );
}
