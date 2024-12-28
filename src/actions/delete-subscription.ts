"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteSubscription = async (id: string) => {
  await prisma.subscription.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath(`/subscriptions/${id}`);
  redirect("/");
};
