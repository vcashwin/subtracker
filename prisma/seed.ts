import {
  Subscription,
  SubscriptionCategory,
  SubscriptionStatus,
} from "@prisma/client";
import prisma from "@/lib/db";

const subscriptions: Omit<Subscription, "id" | "createdAt" | "updatedAt">[] = [
  {
    title: "Netflix",
    price: 10,
    currency: "USD",
    renewsAt: new Date(),
    status: SubscriptionStatus.ACTIVE,
    category: SubscriptionCategory.OTT,
  },
  {
    title: "Spotify",
    price: 10,
    currency: "USD",
    renewsAt: new Date(),
    status: SubscriptionStatus.ACTIVE,
    category: SubscriptionCategory.OTHER,
  },
];

export const seed = async () => {
  const t0 = performance.now();
  console.log("Seeding database ...");
  await prisma.subscription.deleteMany();
  console.log("Deleted all subscriptions");
  await prisma.subscription.createMany({
    data: subscriptions,
  });
  const t1 = performance.now();
  console.log(`Database seeded successfully in ${t1 - t0}ms`);
};

seed();
