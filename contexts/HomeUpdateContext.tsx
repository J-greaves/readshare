import React, { createContext, useState } from "react";

interface HomeUpdateContextValue {
  homeUpdate: Date | undefined;
  setHomeUpdate: (date: Date) => void;
}

const defaultContext: HomeUpdateContextValue = {
  homeUpdate: undefined,
  setHomeUpdate: () => {},
};

export const HomeUpdateContext = createContext<HomeUpdateContextValue>(defaultContext);

export const HomeUpdateProvider = ({ children }: { children: React.ReactNode }) => {
  const [homeUpdate, setHomeUpdate] = useState<Date | undefined>(undefined);

  return (
    <HomeUpdateContext.Provider value={{ homeUpdate, setHomeUpdate }}>
      {children}
    </HomeUpdateContext.Provider>
  );
};
