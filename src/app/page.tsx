import { getSubscriptions } from "@/actions/get-subscriptions";
import { Badge } from "@/components/badge";
import { Divider } from "@/components/divider";
import { Heading, Subheading } from "@/components/heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";

export function Stat({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change?: string;
}) {
  return (
    <div>
      <Divider />
      <div className="dark: mt-6 text-lg/6 font-medium sm:text-sm/6">
        {title}
      </div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      {change && (
        <div className="mt-3 text-sm/6 sm:text-xs/6">
          <Badge color={change.startsWith("+") ? "lime" : "pink"}>
            {change}
          </Badge>
          <span className="text-zinc-500">from last month</span>
        </div>
      )}
    </div>
  );
}

export default async function Home() {
  const subscriptions = await getSubscriptions();
  const totalMonthlyCost = subscriptions.reduce(
    (acc, subscription) => acc + subscription.price,
    0,
  );

  // Calculate the total for subscriptions that were created on or after this month to 1 decimal place
  const thisMonth = new Date().getMonth();
  const thisMonthSubscriptions = subscriptions.filter(
    (subscription) => subscription.createdAt.getMonth() >= thisMonth,
  );
  const thisMonthTotal = thisMonthSubscriptions.reduce(
    (acc, subscription) => acc + subscription.price,
    0,
  );
  const thisMonthPercentageChange = (
    ((thisMonthTotal - totalMonthlyCost) / totalMonthlyCost) *
    100
  ).toFixed(1);

  const today = new Date();
  const nextMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
  );
  const upcomingRenewals = subscriptions.filter((sub) => {
    const renewalDate = new Date(sub.renewsAt);
    return renewalDate >= today && renewalDate < nextMonth;
  }).length;

  console.log(subscriptions);

  return (
    <>
      <Heading>Good afternoon, Ashwin</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Overview</Subheading>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          title="Total Monthly Cost"
          value={`$${totalMonthlyCost}`}
          change={`${thisMonthPercentageChange}%`}
        />
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
                {subscription.price} {subscription.currency}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
