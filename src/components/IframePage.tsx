import { useParams } from "react-router-dom";
import { useTheme } from "./theme-provider";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import React from "react";

export const IframeCapCoinPage = () => {
  const { theme } = useTheme();
  const { coin } = useParams();

  const formatString = (s: string) =>
    s
      .split("-")
      .map((w) =>
        w.length === 3 ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)
      )
      .join(" ");

  const invertStyle =
    theme === "dark" ? { filter: "invert(1) hue-rotate(180deg)" } : {};
  const { setRoutes } = useBreadcrumb();
  React.useEffect(() => {
    setRoutes([
      { title: "Cryptocurrencies Analytics", href: "/analytics" },
      { title: `Data of ${formatString(coin || "")}` },
    ]);
  }, []);
  return (
    <div className="iframe-container h-full w-full" style={invertStyle}>
      <iframe
        className="h-full w-full"
        src={`http://localhost:3001/proxy?url=https://coinmarketcap.com/currencies/${coin}/`}
      />
    </div>
  );
};
