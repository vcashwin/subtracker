"use client";

import { createSubscription } from "@/actions/create-subscription";
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
import { NavbarItem } from "@/components/navbar";
import { Select } from "@/components/select";
import { toast } from "@/components/toast";
import { useGlobalContext } from "@/providers/GlobalProvider";
import { formatCurrency } from "@/utils";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { SubscriptionCategory } from "@prisma/client";
import { useRef, useState } from "react";

export default function NewSubscription() {
  const { currency } = useGlobalContext();
  const form = useRef<HTMLFormElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleCreateSubscription = async () => {
    if (!form.current) return;
    const formValues = Object.fromEntries(new FormData(form.current).entries());
    const subscription = {
      title: formValues.title as string,
      price: Number(formValues.amount),
      currency: currency,
      renewsAt: new Date(formValues.renewsAt as string),
      category: formValues.category as SubscriptionCategory,
    };
    await createSubscription(subscription);
    setIsOpen(false);
    toast.success("Subscription created successfully");
  };
  return (
    <>
      <NavbarItem onClick={() => setIsOpen(true)} aria-label="New Subscription">
        <PlusCircleIcon />
      </NavbarItem>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>New Subscription</DialogTitle>
        <DialogDescription>
          Enter the details of the subscription you want to track.
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
                  />
                </Field>
                <Field>
                  <Label>Title</Label>
                  <Input name="title" placeholder="Netflix, Spotify, etc." />
                </Field>
                <Field>
                  <Label>Category</Label>
                  <Select name="category">
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
          <Button onClick={handleCreateSubscription}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
