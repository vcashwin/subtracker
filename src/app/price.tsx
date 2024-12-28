"use client";

import { useGlobalContext } from "@/providers/GlobalProvider";
import { convertCurrency, formatCurrency } from "@/utils";

export function Price({ price }: { price: number }) {
  const { currency } = useGlobalContext();
  return <>{formatCurrency(convertCurrency(price, currency), currency)}</>;
}
