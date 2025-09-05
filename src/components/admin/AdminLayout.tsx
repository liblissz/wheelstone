import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Car, 
  ShoppingCart, 
  CreditCard, 
  Users, 
  Menu, 
  X,
  Bell,
  Search,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const sidebarItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/cars", icon: Car, label: "Cars" },
  { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
  { href: "/admin/payments", icon: CreditCard, label: "Payments" },
  { href: "/admin/users", icon: Users, label: "Users" },
];

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-dashboard-bg">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <h1 className="text-xl font-bold text-primary">CarAdmin</h1>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-6 px-3">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={`
                  flex items-center px-3 py-2 mb-1 text-sm font-medium rounded-lg transition-colors
                  ${isActive(item.href) 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-border h-16 flex items-center justify-between px-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden mr-3"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="relative max-w-md">
              {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" /> */}
              {/* <Input
                placeholder="Search..."
                className="pl-10 w-64"
              /> */}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button> */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/admin.jpg" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Admin User</p>
                   
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}