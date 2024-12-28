import { getSubscriptions } from "@/actions/get-subscriptions";
import { Stat } from "@/app/stat";
import { Heading, Subheading } from "@/components/heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Subscription } from "@/types";
import MonthlyCost from "./monthly-cost";
import { Price } from "./price";

const calculateUpcomingRenewals = (subscriptions: Subscription[]) => {
  const today = new Date();
  const nextMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
  );
  return subscriptions.filter((sub) => {
    const renewalDate = new Date(sub.renewsAt);
    return renewalDate >= today && renewalDate < nextMonth;
  }).length;
};

export default async function Home() {
  const subscriptions = await getSubscriptions();

  const upcomingRenewals = calculateUpcomingRenewals(subscriptions);

  return (
    <>
      <Heading>Good afternoon, Ashwin</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Overview</Subheading>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <MonthlyCost subscriptions={subscriptions} />
        <Stat title="Upcoming Renewals" value={`${upcomingRenewals}`} />
      </div>
      <Subheading className="mt-14">Recent subscriptions</Subheading>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Title</TableHeader>
            <TableHeader>Renewal Date</TableHeader>
            <TableHeader>Category</TableHeader>
            <TableHeader className="text-right">Amount</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscriptions.map((subscription) => (
            <TableRow
              key={subscription.id}
              href={`/subscriptions/${subscription.id}`}
            >
              <TableCell>{subscription.title}</TableCell>
              <TableCell className="text-zinc-500">
                {subscription.renewsAt.toLocaleDateString()}
              </TableCell>
              <TableCell>{subscription.category}</TableCell>
              <TableCell className="text-right">
                <Price
                  price={subscription.price}
                  baseCurrency={subscription.currency}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
