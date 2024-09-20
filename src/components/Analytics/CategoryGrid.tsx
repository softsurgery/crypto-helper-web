import { CoinCategory } from "@/types/coin-catgeory.response";
import { AutoComplete, Option } from "../ui/auto-complete";
import { cn } from "@/lib/utils";

interface DataTableProps {
  className?: string;
  categories: CoinCategory[];
  value: Option;
  onChange: (value: Option) => void;
  isPending?: boolean;
}

export default function CategoryGrid({
  className,
  categories,
  value,
  onChange,
}: DataTableProps) {
  const options = categories.map((category) => {
    return { label: category.name, value: category.url };
  });
  return (
    <div className={cn("flex", className)}>
      <AutoComplete
        options={options}
        emptyMessage="No results found"
        placeholder="Select a Category"
        isLoading={false}
        onValueChange={(e) => onChange(e)}
        value={value}
      />
    </div>
  );
}
