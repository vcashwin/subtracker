"use client";

import { deleteSubscription } from "@/actions/delete-subscription";
import { Button } from "@/components/button";

export const DeleteButton = ({ id }: { id: string }) => {
  return <Button onClick={() => deleteSubscription(id)}>Delete</Button>;
};
