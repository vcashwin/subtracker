"use server";

import prisma from "@/lib/db";
import { Subscription } from "@/types";
import { revalidatePath } from "next/cache";

export const updateSubscription = async (id: string, data: Subscription) => {
  await prisma.subscription.update({
    where: { id },
    data,
  });

  revalidatePath("/");
  revalidatePath(`/subscriptions/${id}`);
};
