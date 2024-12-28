"use client";

import { NavbarItem } from "@/components/navbar";
import { useGlobalContext } from "@/providers/GlobalProvider";
import {
  CurrencyDollarIcon,
  CurrencyRupeeIcon,
} from "@heroicons/react/16/solid";

export default function ToggleCurrency() {
  const { currency, setCurrency } = useGlobalContext();
  return (
    <NavbarItem
      aria-label="Switch Currency"
      onClick={() => {
        setCurrency(currency === "USD" ? "INR" : "USD");
      }}
    >
      {currency === "USD" ? <CurrencyDollarIcon /> : <CurrencyRupeeIcon />}
    </NavbarItem>
  );
}
