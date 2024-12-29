"use client";

import { deleteSubscription } from "@/actions/delete-subscription";
import { Button } from "@/components/button";
import { toast } from "@/components/toast";

export const DeleteButton = ({ id }: { id: string }) => {
  const handleDelete = async () => {
    toast.promise(deleteSubscription(id), {
      loading: "Deleting the subscription...",
      success: "Subscription deleted successfully",
      error: "Failed to delete subscription. Please try again.",
    });
  };
  return <Button onClick={handleDelete}>Delete</Button>;
};
