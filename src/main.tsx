import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import AuthenticationPage from "./pages/Authentication";
import { Layout } from "@/components/layout/Layout";
import SignOutComponent from "./components/Authentification/SignOutComponent";
import CoinTable from "./pages/CoinTable";
import Coins from "./pages/Coins";
import { ThemeProvider } from "./components/theme-provider";
import { UserManagement } from "./pages/UserManagement/UserManagement";
import Users from "./pages/UserManagement/Users/Users";
import Roles from "./pages/UserManagement/Roles/Roles";
import Permissions from "./pages/UserManagement/Permissions/Permissions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/analytics", element: <Coins /> },
      { path: "/coins", element: <CoinTable /> },
      {
        path: "/user-management",
        element: <UserManagement />,
        children: [
          { path: "", element: <Navigate to="users" replace /> },
          { path: "users", element: <Users /> },
          { path: "roles", element: <Roles />},
          { path: "permissions", element: <Permissions /> },
          {
            path: "*",
            element: <div>404</div>,
          },
        ],
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
    <ThemeProvider storageKey="class" defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster />
    </ThemeProvider>
  </StrictMode>
);
