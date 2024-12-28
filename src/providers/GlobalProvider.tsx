"use client";

import React, { createContext, useContext, useState } from "react";
import { Currency } from "@/types";

const GlobalContext = createContext<{
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}>({
  currency: "INR",
  setCurrency: () => {},
});

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>("INR");

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
