import prisma from "@/lib/db";

export const getSubscription = async (id: string) => {
  const subscription = await prisma.subscription.findUnique({
    where: { id },
  });
  return subscription;
};
