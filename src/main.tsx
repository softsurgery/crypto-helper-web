import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from "@/components/ui/toaster";
import AuthenticationPage from "./pages/Authentication";
import { Layout } from "@/components/layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
  },
  {
    path: "/authentication",
    element: <AuthenticationPage />,
  },
  {
    path: "/logout",
    element: <AuthenticationPage />,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    <Toaster />
  </StrictMode>
);
