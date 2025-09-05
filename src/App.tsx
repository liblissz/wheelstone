import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AdminLayout } from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Cars from "./pages/admin/Cars";
import Orders from "./pages/admin/Orders";
import Payments from "./pages/admin/Payments";
import Users from "./pages/admin/Users";
import LoginPage from "./pages/Login";

const queryClient = new QueryClient();

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // Check token once on mount
    const token = localStorage.getItem("token");
    if (token) setIsLogin(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {isLogin ? (
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="cars" element={<Cars />} />
                <Route path="orders" element={<Orders />} />
                <Route path="payments" element={<Payments />} />
                <Route path="users" element={<Users />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          ) : (
            <LoginPage/>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
