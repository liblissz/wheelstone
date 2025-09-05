import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const getRoleBadgeVariant = (role: string) => {
  switch (role) {
    case 'admin':
      return 'bg-destructive/10 text-destructive';
    case 'seller':
      return 'bg-warning/10 text-warning';
    case 'buyer':
      return 'bg-success/10 text-success';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://carbackend-1g9v.onrender.com/me/users");
      // Filter only normal users (buyers)
      const normalUsers = res.data.filter((u: any) => u.role !== "admin" && u.role !== "seller");
      setUsers(normalUsers);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Users Management</h1>
        <p className="text-muted-foreground mt-2">Manage all users and their roles</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>User Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="border border-border rounded-md px-3 py-2 w-48"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="buyer">Buyers</option>
              <option value="seller">Sellers</option>
              <option value="admin">Admins</option>
            </select>
          </div>

          {loading ? (
            <p className="text-center text-muted-foreground">Loading users...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Join Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.profile} alt={user.name} />
                          <AvatarFallback>
                            {user.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-2 text-muted-foreground" />
                          {user.email}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="h-3 w-3 mr-2" />
                          {user.number}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeVariant(user.role || "buyer")}>
                        {(user.role || "buyer").charAt(0).toUpperCase() + (user.role || "buyer").slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-3 w-3 mr-2 text-muted-foreground" />
                        {user.address || user.country}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-3 w-3 mr-2 text-muted-foreground" />
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
