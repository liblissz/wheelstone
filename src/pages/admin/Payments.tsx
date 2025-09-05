import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, CreditCard } from "lucide-react";
import { toast } from "sonner";

type PaymentMethod = {
  _id: string;
  paymentname: string;
  description: string;
  paymentlink: string;
  processingfee: string;
};

export default function Payments() {
  const [payments, setPayments] = useState<PaymentMethod[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [formData, setFormData] = useState({
    paymentname: "",
    description: "",
    paymentlink: "",
    processingfee: "",
  });
  const [loading, setLoading] = useState(false);

  const API_URL = "https://carbackend-1g9v.onrender.com/payments";

  // Fetch all payments
  const fetchPayments = async () => {
    try {
      const res = await axios.get(API_URL);
      setPayments(res.data.payments || []);
    } catch (err) {
      console.error("Failed to fetch payments", err);
      toast.error("Failed to fetch payments");
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleAddMethod = () => {
    setEditingMethod(null);
    setFormData({ paymentname: "", description: "", paymentlink: "", processingfee: "" });
    setIsDialogOpen(true);
  };

  const handleEditMethod = (method: PaymentMethod) => {
    setEditingMethod(method);
    setFormData({
      paymentname: method.paymentname,
      description: method.description,
      paymentlink: method.paymentlink,
      processingfee: method.processingfee,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteMethod = async (id: string) => {
    if (!confirm("Are you sure you want to delete this payment method?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setPayments(payments.filter((p) => p._id !== id));
      toast.success("Payment method deleted successfully");
    } catch (err) {
      console.error("Failed to delete payment", err);
      toast.error("Failed to delete payment method");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingMethod) {
        const res = await axios.put(`${API_URL}/${editingMethod._id}`, formData);
        setPayments(payments.map((p) => (p._id === editingMethod._id ? res.data.payment : p)));
        toast.success("Payment method updated successfully");
      } else {
        const res = await axios.post(API_URL, formData);
        setPayments([res.data.payment, ...payments]);
        toast.success("Payment method added successfully");
      }
      setIsDialogOpen(false);
      setFormData({ paymentname: "", description: "", paymentlink: "", processingfee: "" });
    } catch (err) {
      console.error("Failed to save payment", err);
      toast.error("Failed to save payment method");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payment Methods</h1>
          <p className="text-muted-foreground mt-2">Configure payment processors for your dealership</p>
        </div>
        <Button onClick={handleAddMethod} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Payment Method
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configured Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No payment methods available</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Processing Fee</TableHead>
                  <TableHead>Payment Link</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((method) => (
                  <TableRow key={method._id}>
                    <TableCell className="font-medium">{method.paymentname}</TableCell>
                    <TableCell>{method.description}</TableCell>
                    <TableCell>{method.processingfee}</TableCell>
                    <TableCell>
                      <a href={method.paymentlink} target="_blank" rel="noopener noreferrer">
                        Link
                      </a>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditMethod(method)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteMethod(method._id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingMethod ? "Edit Payment Method" : "Add Payment Method"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="paymentname">Payment Name</Label>
                <Input
                  id="paymentname"
                  value={formData.paymentname}
                  onChange={(e) => setFormData({ ...formData, paymentname: e.target.value })}
                  placeholder="Stripe, PayPal, etc."
                />
              </div>
              <div>
                <Label htmlFor="processingfee">Processing Fee</Label>
                <Input
                  id="processingfee"
                  value={formData.processingfee}
                  onChange={(e) => setFormData({ ...formData, processingfee: e.target.value })}
                  placeholder="2.9% + $0.30"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of this payment method..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="paymentlink">Payment Link</Label>
              <Input
                id="paymentlink"
                value={formData.paymentlink}
                onChange={(e) => setFormData({ ...formData, paymentlink: e.target.value })}
                placeholder="https://example.com/pay"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : editingMethod ? "Update Method" : "Add Method"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
