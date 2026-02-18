import React, { createContext, useState } from "react";
import { User } from "../types";

interface UserContextInterface {
  user: User;
  setUser: (user: User) => void;
}

const defaultContext: UserContextInterface = {
  user: { username: "", name: "" },
  setUser: () => {},
};

export const UserContext = createContext<UserContextInterface>(defaultContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({ username: "example123", name: "Mr Example" });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
