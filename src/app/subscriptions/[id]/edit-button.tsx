"use client";

import { Button } from "@/components/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/components/dialog";
import { Field, FieldGroup, Fieldset, Label } from "@/components/fieldset";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { useGlobalContext } from "@/providers/GlobalProvider";
import { Subscription } from "@/types";
import { convertCurrency, formatCurrency } from "@/utils";
import { useRef, useState } from "react";
import { SubscriptionCategory } from "@prisma/client";
import { updateSubscription } from "@/actions/update-subscription";
import { toast } from "@/components/toast";

export const EditButton = ({
  subscription,
}: {
  subscription: Subscription;
}) => {
  const { currency } = useGlobalContext();
  const [isOpen, setIsOpen] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const handleUpdateSubscription = async () => {
    if (!form.current) return;
    const formValues = Object.fromEntries(new FormData(form.current).entries());
    const updatedSubscription = {
      ...subscription,
      title: formValues.title as string,
      price: Number(formValues.amount),
      currency: currency,
      renewsAt: new Date(formValues.renewsAt as string),
      category: formValues.category as SubscriptionCategory,
    };
    await updateSubscription(subscription.id, updatedSubscription);
    setIsOpen(false);
    toast.success("Subscription updated successfully");
  };
  return (
    <>
      <Button outline onClick={() => setIsOpen(true)}>
        Edit
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Edit Subscription</DialogTitle>
        <DialogDescription>
          Update the details of the subscription you want to track.
        </DialogDescription>
        <DialogBody className="flex flex-col gap-8">
          <form ref={form}>
            <Fieldset>
              <FieldGroup>
                <Field>
                  <Label>Amount (in {currency})</Label>
                  <Input
                    name="amount"
                    type="number"
                    placeholder={`${formatCurrency(0, currency)}`}
                    defaultValue={convertCurrency(
                      subscription.price,
                      subscription.currency,
                      currency,
                    )}
                  />
                </Field>
                <Field>
                  <Label>Title</Label>
                  <Input
                    name="title"
                    placeholder="Netflix, Spotify, etc."
                    defaultValue={subscription.title}
                  />
                </Field>
                <Field>
                  <Label>Category</Label>
                  <Select name="category" defaultValue={subscription.category}>
                    {Object.values(SubscriptionCategory).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field>
                  <Label>Renews At</Label>
                  <Input
                    name="renewsAt"
                    placeholder="YYYY-MM-DD as 2024-01-01"
                    defaultValue={subscription.renewsAt.toLocaleDateString()}
                  />
                </Field>
              </FieldGroup>
            </Fieldset>
          </form>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdateSubscription}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
