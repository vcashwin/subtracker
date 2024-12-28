import { Currency } from "@/types";

const formatCurrency = (amount: number, currency: Currency) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

const CURRENCY_CONVERSION_RATE = {
  USD: 1,
  EUR: 0.9,
  GBP: 0.8,
  INR: 85,
};

const convertCurrency = (
  amount: number,
  baseCurrency: Currency,
  targetCurrency: Currency,
) => {
  return (
    (amount * CURRENCY_CONVERSION_RATE[targetCurrency]) /
    CURRENCY_CONVERSION_RATE[baseCurrency]
  );
};

export { formatCurrency, convertCurrency, CURRENCY_CONVERSION_RATE };
