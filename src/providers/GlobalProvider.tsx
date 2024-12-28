"use client";

import React, { createContext, useContext, useState } from "react";
import { Currency } from "@/types";

const GlobalContext = createContext({});

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>("USD");

  return (
    <GlobalContext.Provider value={{ currency, setCurrency }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };
