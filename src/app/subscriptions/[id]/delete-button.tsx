"use client";

import { deleteSubscription } from "@/actions/delete-subscription";
import { Button } from "@/components/button";
import {
  Dialog,
  DialogActions,
  DialogDescription,
  DialogTitle,
} from "@/components/dialog";
import { toast } from "@/components/toast";
import { useState } from "react";

export const DeleteButton = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = async () => {
    setIsOpen(false);
    toast.promise(deleteSubscription(id), {
      loading: "Deleting the subscription...",
      success: "Subscription deleted successfully",
      error: "Failed to delete subscription. Please try again.",
    });
  };
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Delete</Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. Please confirm you want to delete this
          subscription.
        </DialogDescription>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="red">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
