import { useParams } from "react-router-dom";
import { useTheme } from "./theme-provider";

export const IframeCapCoinPage = () => {
    const { theme } = useTheme();
    const { coin } = useParams();
    const invertStyle =
      theme === "dark"
        ? { filter: "invert(1) hue-rotate(180deg)" }
        : {};
  
    return (
      <div className="iframe-container h-full w-full" style={invertStyle}>
        <iframe
          className="h-full w-full"
          src={`http://localhost:3001/proxy?url=https://coinmarketcap.com/currencies/${coin}/`}
        />
      </div>
    );
  };