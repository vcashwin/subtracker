"use client";

import { deleteSubscription } from "@/actions/delete-subscription";
import { Button } from "@/components/button";
import { toast } from "@/components/toast";

export const DeleteButton = ({ id }: { id: string }) => {
  const handleDelete = async () => {
    try {
      await deleteSubscription(id);
      toast.success("Subscription deleted successfully");
    } catch (error) {
      toast.error("Failed to delete subscription");
    }
  };
  return <Button onClick={handleDelete}>Delete</Button>;
};
