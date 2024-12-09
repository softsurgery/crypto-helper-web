import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatValue } from "@/lib/numbers";
import { cn } from "@/lib/utils";
import { CoinData } from "@/types/coin-data.response";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Eye, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DataTableProps {
  className?: string;
  data: CoinData[];
  isPending: boolean;
}

export default function DataTable({ className, data }: DataTableProps) {
  const navigate = useNavigate();
  return (
    <Table className={cn(className)}>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">img</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="hidden md:table-cell">1h %</TableHead>
          <TableHead className="hidden md:table-cell">24h %</TableHead>
          <TableHead className="hidden md:table-cell">7d %</TableHead>
          <TableHead>Market Cap %</TableHead>
          <TableHead className="hidden md:table-cell">Volume (24h)</TableHead>
          <TableHead>Circulating Supply</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((coin: CoinData) => {
          return (
            <TableRow key={coin.code}>
              <TableCell className="hidden sm:table-cell">
                <img
                  alt="Product img"
                  className="aspect-square rounded-md object-cover"
                  width="40"
                  height="40"
                  src={coin.pictureURL}
                />
              </TableCell>
              <TableCell className="font-medium">
                {coin.name} <Badge className="mx-2">{coin.code}</Badge>
              </TableCell>
              <TableCell className="font-bold">
                ${formatValue(coin.price)}
              </TableCell>
              <TableCell className="font-bold hidden md:table-cell">
                <span
                  className={cn(
                    "flex items-center",
                    coin.raise1Hour < 0 ? "text-red-600" : "text-green-600"
                  )}
                >
                  {coin.raise1Hour < 0 ? (
                    <ArrowDown className="h-4 w-4" />
                  ) : (
                    <ArrowUp className="h-4 w-4" />
                  )}{" "}
                  {Math.abs(coin.raise1Hour)}%
                </span>
              </TableCell>
              <TableCell className="font-bold hidden md:table-cell">
                <span
                  className={cn(
                    "flex items-center",
                    coin.raise24Hours < 0 ? "text-red-600" : "text-green-600"
                  )}
                >
                  {coin.raise24Hours < 0 ? (
                    <ArrowDown className="h-4 w-4" />
                  ) : (
                    <ArrowUp className="h-4 w-4" />
                  )}
                  {Math.abs(coin.raise24Hours)}%
                </span>
              </TableCell>
              <TableCell className="font-bold hidden md:table-cell">
                <span
                  className={cn(
                    "flex items-center",
                    coin.raise7Days < 0 ? "text-red-600" : "text-green-600"
                  )}
                >
                  {coin.raise7Days < 0 ? (
                    <ArrowDown className="h-4 w-4" />
                  ) : (
                    <ArrowUp className="h-4 w-4" />
                  )}
                  {Math.abs(coin.raise7Days)}%
                </span>
              </TableCell>
              <TableCell className="font-bold">
                ${formatValue(coin.marketCap)}
              </TableCell>
              <TableCell className="font-bold hidden md:table-cell">
                ${formatValue(coin.volume24Hour)}
              </TableCell>
              <TableCell className="font-bold">
                ${formatValue(coin.circulatingSupply)}
              </TableCell>

              <TableCell className="flex flex-row gap-4">
                <Button className="flex gap-2 items-center" variant={"default"}>
                  Add to Favourite <Star className="h-4 w-4" />
                </Button>
                <Button
                  className="flex gap-2 items-center"
                  variant={"default"}
                  onClick={() => navigate(`/data/${coin.hrefName}`)}
                >
                  Go to KPIs <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
