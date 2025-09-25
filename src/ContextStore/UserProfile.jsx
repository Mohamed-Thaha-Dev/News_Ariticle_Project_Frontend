import { createContext, useState } from "react";

export const UserRegisterContext = createContext();

export function UserProvider({ children }) {
  const [userProfilePic, setUserProfilePic] = useState(null);

  return (
    <UserRegisterContext.Provider value={{ userProfilePic, setUserProfilePic }}>
      {children}  {/* <- This renders whatever is wrapped inside UserProvider */}
    </UserRegisterContext.Provider>
  );
}


export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [login, setLogin] = useState(false);

  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
};