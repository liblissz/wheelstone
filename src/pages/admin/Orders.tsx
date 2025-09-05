import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Order {
  _id: string;
  user: {
    name: string;
    email: string;
    address: string;
  };
  totalPrice: number;
  paymentmethod: string;
  status: string;
  createdAt: string;
  notes?: string;
}

interface PaymentMethod {
  _id: string;
  paymentname: string;
  paymentlink: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [editingNotes, setEditingNotes] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
    fetchPayments();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://carbackend-1g9v.onrender.com/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      toast({ title: "Error fetching orders" });
    }
  };

  const fetchPayments = async () => {
    try {
      const res = await axios.get("https://carbackend-1g9v.onrender.com/payments");
      setPaymentMethods(res.data.payments || []);
    } catch (err) {
      console.error(err);
      toast({ title: "Error fetching payment methods" });
    }
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setEditingNotes(order.notes || "");
    setSelectedPayment(order.paymentmethod || "");
    setDialogOpen(true);
  };

  const handleForwardPayment = async () => {
    if (!selectedPayment || !selectedOrder) {
      toast({ title: "Select a payment method first" });
      return;
    }

    try {
      setSending(true);

      await axios.post(
        `https://carbackend-1g9v.onrender.com/api/confirm/forward-payment/${selectedOrder._id}`,
        {
          paymentLink: selectedPayment,
          notes: editingNotes,
        }
      );

      toast({ title: "Payment link sent and order confirmed" });

      setOrders((prev) =>
        prev.map((o) =>
          o._id === selectedOrder._id
            ? { ...o, status: "Confirmed", paymentmethod: selectedPayment, notes: editingNotes }
            : o
        )
      );

      setDialogOpen(false);
    } catch (err) {
      console.error(err);
      toast({ title: "Failed to send payment link" });
    } finally {
      setSending(false);
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

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-success/10 text-success";
      case "pending":
        return "bg-warning/10 text-warning";
      case "failed":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Orders Management</h1>
        <p className="text-muted-foreground mt-2">Track and manage all customer orders</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>
                    <p className="font-medium">{order.user.name}</p>
                    <p className="text-sm text-muted-foreground">{order.user.email}</p>
                  </TableCell>
                  <TableCell>£{order.totalPrice}</TableCell>
                  <TableCell>
                    <Badge className={getPaymentStatusColor(order.paymentmethod)}>
                      {order.paymentmethod || "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status || "Pending")}>
                      {order.status || "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(order)}>
                      <Eye className="h-4 w-4 mr-2" /> View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?._id}</DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Customer Information</h3>
                  <p><strong>Name:</strong> {selectedOrder.user.name}</p>
                  <p><strong>Email:</strong> {selectedOrder.user.email}</p>
                  <p><strong>Address:</strong> {selectedOrder.user.address}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Order Information</h3>
                  <p><strong>Total:</strong> ${selectedOrder.totalPrice}</p>
                  <p><strong>Status:</strong> {selectedOrder.status || "Pending"}</p>
                  <p><strong>Created:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <Label>Select Payment Method to Forward</Label>
                <Select value={selectedPayment} onValueChange={setSelectedPayment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((p) => (
                      <SelectItem key={p._id} value={p.paymentlink}>
                        {p.paymentname} - {p.paymentlink}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Admin Notes</Label>
                <Textarea
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  rows={3}
                  placeholder="Add notes about this order..."
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleForwardPayment} disabled={sending || !selectedPayment}>
                  {sending ? "Sending..." : "Forward Payment"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
