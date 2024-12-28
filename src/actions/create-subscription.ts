"use server";

import prisma from "@/lib/db";
import { Subscription } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createSubscription = async (subscription: Subscription) => {
  await prisma.subscription.create({
    data: subscription,
  });
  revalidatePath("/");
};
