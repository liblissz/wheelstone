import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, ShoppingCart, DollarSign, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState([
    { title: "Total Cars", value: "0", change: "+0%", changeType: "positive" as const, icon: Car },
    { title: "Total Orders", value: "0", change: "+0%", changeType: "positive" as const, icon: ShoppingCart },
    { title: "Total Revenue", value: "$0", change: "+0%", changeType: "positive" as const, icon: DollarSign },
    { title: "Pending Orders", value: "0", change: "-0%", changeType: "negative" as const, icon: Clock },
  ]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://carbackend-1g9v.onrender.com/api/orders"); // adjust backend endpoint if needed
      const allOrders = res.data;

      setOrders(allOrders);

      // Calculate stats dynamically
      const totalOrders = allOrders.length;
      const totalRevenue = allOrders.reduce((sum: number, o: any) => sum + Number(o.totalPrice), 0);
      const pendingOrders = allOrders.filter((o: any) => o.status?.toLowerCase() === "pending").length;

      setStats([
        { title: "Total Cars", value: "127", change: "+12%", changeType: "positive", icon: Car }, // you can fetch actual car count from backend
        { title: "Total Orders", value: `${totalOrders}`, change: "+8%", changeType: "positive", icon: ShoppingCart },
        { title: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, change: "+15%", changeType: "positive", icon: DollarSign },
        { title: "Pending Orders", value: `${pendingOrders}`, change: "-5%", changeType: "negative", icon: Clock },
      ]);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-success/10 text-success";
      case "processing":
        return "bg-warning/10 text-warning";
      case "pending":
        return "bg-muted text-muted-foreground";
      case "confirmed":
        return "bg-blue-100 text-blue-600";
      case "cancelled":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here's what's happening with your car dealership.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="transition-all duration-200 hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className={`text-xs mt-1 ${stat.changeType === "positive" ? "text-success" : "text-destructive"}`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium text-foreground">{order.user.name}</p>
                    <p className="text-sm text-muted-foreground">{order._id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {order.cartItems.map((item: any) => item.name).join(", ")}
                    </p>
                    <p className="text-sm text-muted-foreground">${order.totalPrice}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status || "Pending")}`}>
                    {order.status || "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
