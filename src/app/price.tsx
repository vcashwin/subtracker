"use client";

import { useGlobalContext } from "@/providers/GlobalProvider";
import { convertCurrency, formatCurrency } from "@/utils";
import { Currency } from "@/types";

export function Price({
  price,
  baseCurrency,
}: {
  price: number;
  baseCurrency: Currency;
}) {
  const { currency: targetCurrency } = useGlobalContext();
  return (
    <>
      {formatCurrency(
        convertCurrency(price, baseCurrency, targetCurrency),
        targetCurrency,
      )}
    </>
  );
}
