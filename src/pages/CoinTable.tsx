import { ThreeDCardDemo } from "@/components/CardDemo";
import React from "react";

export default function CoinTable() {
  React.useEffect(() => {}, []);

  return (
    <div className="mx-auto px-10 overflow-auto">
      <div className="my-4">
        <h1 className="text-4xl font-bold">Top Cryptocurrencies</h1>
        <p className="text-xl text-gray-600">
          You can select your favourite crypto currencies and add it to your
          portfolio
        </p>
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <ThreeDCardDemo />
        <ThreeDCardDemo />
        <ThreeDCardDemo />
        <ThreeDCardDemo />
      </div>
    </div>
  );
}
