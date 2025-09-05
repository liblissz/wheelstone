import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, ShoppingCart, Users, Settings } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-dashboard-bg flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-foreground">CarDealer Pro</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional car dealership management system with comprehensive admin dashboard
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/admin/dashboard">
            <Button size="lg" className="w-full sm:w-auto">
              <Settings className="mr-2 h-5 w-5" />
              Access Admin Dashboard
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            <Car className="mr-2 h-5 w-5" />
            Browse Cars
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <Car className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold mb-2">Car Management</h3>
            <p className="text-sm text-muted-foreground">
              Manage inventory with detailed car information and image uploads
            </p>
          </div>
          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <ShoppingCart className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold mb-2">Order Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Track customer orders and update statuses in real-time
            </p>
          </div>
          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <Users className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold mb-2">User Management</h3>
            <p className="text-sm text-muted-foreground">
              Manage customers, sellers, and admin users with role-based access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
