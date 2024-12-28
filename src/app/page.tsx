import { getSubscriptions } from "@/actions/get-subscriptions";
import { Avatar } from "@/components/avatar";
import { Badge } from "@/components/badge";
import { Divider } from "@/components/divider";
import { Heading, Subheading } from "@/components/heading";
import { Select } from "@/components/select";
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
  change: string;
}) {
  return (
    <div>
      <Divider />
      <div className="dark: mt-6 text-lg/6 font-medium sm:text-sm/6">
        {title}
      </div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      <div className="mt-3 text-sm/6 sm:text-xs/6">
        <Badge color={change.startsWith("+") ? "lime" : "pink"}>{change}</Badge>{" "}
        <span className="text-zinc-500">from last month</span>
      </div>
    </div>
  );
}

export default async function Home() {
  const subscriptions = await getSubscriptions();

  return (
    <>
      <Heading>Good afternoon, Erica</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Overview</Subheading>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total Monthly Cost" value="$2.6M" change="+4.5%" />
        <Stat title="Upcoming Renewals" value="2" change="-0.5%" />
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
