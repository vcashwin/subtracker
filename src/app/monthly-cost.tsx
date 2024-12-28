"use client";
import { useGlobalContext } from "@/providers/GlobalProvider";
import { convertCurrency, formatCurrency } from "@/utils";
import { Currency, Subscription } from "@/types";
import { Stat } from "./stat";

const calculateTotalMonthlyCost = (
  subscriptions: Subscription[],
  currency: Currency,
) => {
  const totalCost = subscriptions.reduce(
    (acc, subscription) => acc + subscription.price,
    0,
  );
  const convertedCost = convertCurrency(totalCost, currency);
  return convertedCost;
};

const calculateCostChangePercentage = (subscriptions: Subscription[]) => {
  const thisMonth = new Date().getMonth();
  const thisMonthSubscriptions = subscriptions.filter(
    (subscription) => subscription.createdAt.getMonth() >= thisMonth,
  );
  const thisMonthTotal = thisMonthSubscriptions.reduce(
    (acc, subscription) => acc + subscription.price,
    0,
  );
  const allTimeTotal = subscriptions.reduce(
    (acc, subscription) => acc + subscription.price,
    0,
  );
  return ((allTimeTotal - thisMonthTotal) / allTimeTotal) * 100;
};

export default function MonthlyCost({
  subscriptions,
}: {
  subscriptions: Subscription[];
}) {
  const { currency } = useGlobalContext();

  const totalMonthlyCost = calculateTotalMonthlyCost(subscriptions, currency);
  const thisMonthPercentageChange =
    calculateCostChangePercentage(subscriptions);

  return (
    <Stat
      title="Total Monthly Cost"
      value={formatCurrency(totalMonthlyCost, currency)}
      change={Number(thisMonthPercentageChange)}
    />
  );
}
