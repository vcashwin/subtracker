import { Badge } from "@/components/badge";
import { Divider } from "@/components/divider";

export function Stat({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change?: number;
}) {
  return (
    <div>
      <Divider />
      <div className="dark: mt-6 text-lg/6 font-medium sm:text-sm/6">
        {title}
      </div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      {change && (
        <div className="mt-3 space-x-1 text-sm/6 sm:text-xs/6">
          <Badge color={change > 0 ? "lime" : "pink"}>
            {change > 0 ? "+" : "-"}
            {change}%
          </Badge>
          <span className="text-zinc-500">from last month</span>
        </div>
      )}
    </div>
  );
}
