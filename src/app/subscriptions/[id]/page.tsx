import { getSubscription } from "@/actions/get-subscription";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/description-list";
import { Price } from "@/app/price";
import { Badge } from "@/components/badge";
import { Heading, Subheading } from "@/components/heading";
import { notFound } from "next/navigation";
import {
  BanknotesIcon,
  CalendarIcon,
  CreditCardIcon,
} from "@heroicons/react/16/solid";
import { Button } from "@/components/button";
import { DeleteButton } from "./delete-button";

export default async function SubscriptionPage({
  params,
}: {
  params: { id: string };
}) {
  const subscription = await getSubscription(params.id);
  if (!subscription) {
    notFound();
  }
  return (
    <>
      <Heading>{subscription.title}</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Overview</Subheading>
      </div>
      <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
        <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
          <span className="flex items-center gap-3 text-base/6 text-zinc-950 dark:text-white sm:text-sm/6">
            <CalendarIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
            <span>{subscription.renewsAt.toLocaleDateString()}</span>
          </span>
        </div>
        <div className="flex gap-2">
          <Button outline>Edit</Button>
          <DeleteButton id={subscription.id} />
        </div>
      </div>
      <DescriptionList className="mt-8">
        <DescriptionTerm>Title</DescriptionTerm>
        <DescriptionDetails>{subscription.title}</DescriptionDetails>

        <DescriptionTerm>Amount</DescriptionTerm>
        <DescriptionDetails>
          <Price
            price={subscription.price}
            baseCurrency={subscription.currency}
          />
        </DescriptionDetails>

        <DescriptionTerm>Category</DescriptionTerm>
        <DescriptionDetails>
          <Badge color="zinc">{subscription.category}</Badge>
        </DescriptionDetails>

        <DescriptionTerm>Renewal Date</DescriptionTerm>
        <DescriptionDetails>
          {subscription.renewsAt.toLocaleDateString()}
        </DescriptionDetails>

        <DescriptionTerm>Status</DescriptionTerm>
        <DescriptionDetails>
          <Badge color="zinc">{subscription.status}</Badge>
        </DescriptionDetails>
      </DescriptionList>
    </>
  );
}
