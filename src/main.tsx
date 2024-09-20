import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import AuthenticationPage from "./pages/Authentication";
import { Layout } from "@/components/layout/Layout";
import SignOutComponent from "./components/Authentification/SignOutComponent";
import CoinTable from "./pages/CoinTable";
import Coins from "./pages/Coins";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/analytics", element: <Coins /> },
      { path: "/coins", element: <CoinTable /> },
      {
        path: "/settings",
        element: <div>Settings</div>,
      },
      {
        path: "*",
        element: <div>404</div>,
      },
    ],
  },
  {
    path: "/authentication",
    element: <AuthenticationPage />,
  },
  {
    path: "/logout",
    element: <SignOutComponent />,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    <Toaster />
  </StrictMode>
);
