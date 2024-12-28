import prisma from "@/lib/db";

export const getSubscriptions = async () => {
  const subscriptions = await prisma.subscription.findMany();
  return subscriptions;
};
