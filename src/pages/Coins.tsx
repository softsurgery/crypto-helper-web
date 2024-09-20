import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import DataTable from "@/components/Analytics/DataTable";
import { HashLoader } from "react-spinners";
import { Label } from "@/components/ui/label";
import CategoryGrid from "@/components/Analytics/CategoryGrid";
import { Option } from "@/components/ui/auto-complete";
import { cn } from "@/lib/utils";

interface CoinsProps {
  className?: string;
}

export default function Coins({ className }: CoinsProps) {
  const [source, setSource] = React.useState({ value: "" } as Option);
  const [serverPage, setServerPage] = React.useState(1);
  const [appPage, setAppPage] = React.useState(0);
  const [allData, setAllData] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(true);

  const observerRef = React.useRef<HTMLDivElement | null>(null);

  // Reset all pagination and data when the source changes
  React.useEffect(() => {
    setServerPage(1);
    setAppPage(0);
    setAllData([]);
    setHasMore(true);
  }, [source.value]);

  // Fetch coins data
  const {
    isLoading: isFetchCoinsPending,
    error: coinDataError,
    data: coinsDataResp,
  } = useQuery({
    queryKey: ["coins", serverPage, source.value],
    queryFn: () => api.coinData.fetch(source.value, serverPage),
    refetchInterval: 5000,
    enabled: hasMore,
  });

  // Fetch categories
  const {
    isLoading: isFetchCoinsCategoryPending,
    error: coinCategoriesError,
    data: coinsCategoriesResp,
  } = useQuery({
    queryKey: ["coin-categories"],
    queryFn: () => api.coinCategory.fetch(),
    refetchOnWindowFocus: false,
  });

  // Fetch fav coins
  // const {
  //   isLoading: isFetchFavouriteCoinsPending,
  //   error: favouriteCoinDataError,
  //   data: favouriteCoinsDataResp,
  // } = useQuery({
  //   queryKey: ["fav-coins"],
  //   queryFn: () =>
  //     api.userData.fetchFavouriteCoins(localStorage.getItem("username") || ""),
  // });

  // console.log(favouriteCoinsDataResp)

  // Sort categories alphabetically
  const categories = React.useMemo(() => {
    return (
      coinsCategoriesResp?.sort((a, b) => a.name.localeCompare(b.name)) || []
    );
  }, [coinsCategoriesResp]);

  // Load more data when new data is fetched
  React.useEffect(() => {
    if (coinsDataResp && coinsDataResp.length > 0) {
      setAllData((prevData) => [...prevData, ...coinsDataResp]);
    } else if (coinsDataResp?.length === 0) {
      setHasMore(false);
    }
  }, [coinsDataResp]);

  // Function to load more data
  const loadMoreData = () => {
    if (!isFetchCoinsPending && hasMore) {
      setAppPage((prevPage) => prevPage + 1);

      // Only fetch a new server page every 10 app pages
      if ((appPage + 1) % 10 === 0) {
        setServerPage((prevPage) => prevPage + 1);
      }
    }
  };

  // IntersectionObserver to handle infinite scrolling
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreData();
      }
    });

    const currentObserverRef = observerRef.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [isFetchCoinsPending, hasMore, appPage]);

  return (
    <div className={cn(className, "mx-auto px-10 overflow-auto w-full")}>
      <div className="my-4">
        <h1 className="text-4xl font-bold">Cryptocurrencies Analytics</h1>
        <p className="text-xl text-gray-600">
          Engage with sophisticated statistical analyses of the most actively
          traded cryptocurrencies.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{source.label || "All Coins"} </CardTitle>
          <CardDescription>
            Displaying cryptocurrency data in pages of coins each
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryGrid
            className="py-5"
            categories={categories}
            value={source}
            onChange={(value: Option) => setSource(value)} // Reset data on source change
          />
          <DataTable
            data={allData.slice(0, (appPage + 1) * 5)}
            isPending={isFetchCoinsPending}
          />
        </CardContent>

        <CardFooter className="flex justify-center">
          {isFetchCoinsPending && (
            <div className="flex flex-col justify-center items-center gap-2">
              <HashLoader className="my-2" />
              <Label className="text-md font-semibold text-slate-500">
                Please wait for data to load...
              </Label>
            </div>
          )}

          {!isFetchCoinsPending && !hasMore && (
            <div className="flex flex-col justify-center items-center gap-2">
              <Label className="text-md font-semibold text-slate-500">
                No more coins to load.
              </Label>
            </div>
          )}

          {hasMore && !isFetchCoinsPending && (
            <div
              ref={observerRef}
              style={{ height: "1px", background: "transparent" }}
            />
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
