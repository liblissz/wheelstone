// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import { 
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Plus, Edit, Trash2, Upload } from "lucide-react";

// const mockCars = [

//   {
//     id: 2,
//     title: "Mercedes AMG GT 2022",
//     make: "Mercedes",
//     model: "AMG GT",
//     year: 2022,
//     price: 89500,
//     description: "Luxury grand tourer with exceptional performance.",
//     status: "Active",
//     images: ["/placeholder-car4.jpg", "/placeholder-car5.jpg", "/placeholder-car6.jpg"]
//   },
//   {
//     id: 3,
//     title: "Audi RS6 Avant 2023",
//     make: "Audi",
//     model: "RS6",
//     year: 2023,
//     price: 78200,
//     description: "High-performance estate with quattro all-wheel drive.",
//     status: "Sold",
//     images: ["/placeholder-car7.jpg", "/placeholder-car8.jpg", "/placeholder-car9.jpg"]
//   }
// ];

// export default function Cars() {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [editingCar, setEditingCar] = useState<typeof mockCars[0] | null>(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     make: "",
//     model: "",
//     year: "",
//     price: "",
//     description: "",
//   });

//   const handleAddCar = () => {
//     setEditingCar(null);
//     setFormData({
//       title: "",
//       make: "",
//       model: "",
//       year: "",
//       price: "",
//       description: "",
//     });
//     setIsDialogOpen(true);
//   };

//   const handleEditCar = (car: typeof mockCars[0]) => {
//     setEditingCar(car);
//     setFormData({
//       title: car.title,
//       make: car.make,
//       model: car.model,
//       year: car.year.toString(),
//       price: car.price.toString(),
//       description: car.description,
//     });
//     setIsDialogOpen(true);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Here you would typically send data to your API
//     console.log("Form submitted:", formData);
//     setIsDialogOpen(false);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Car Management</h1>
//           <p className="text-muted-foreground mt-2">Manage your car inventory</p>
//         </div>
//         <Button onClick={handleAddCar} className="bg-primary hover:bg-primary/90">
//           <Plus className="h-4 w-4 mr-2" />
//           Add New Car
//         </Button>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>All Cars</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Image</TableHead>
//                 <TableHead>Title</TableHead>
//                 <TableHead>Make/Model</TableHead>
//                 <TableHead>Year</TableHead>
//                 <TableHead>Price</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {mockCars.map((car) => (
//                 <TableRow key={car.id}>
//                   <TableCell>
//                     <div className="w-16 h-12 bg-muted rounded-lg flex items-center justify-center">
//                       <span className="text-xs text-muted-foreground">IMG</span>
//                     </div>
//                   </TableCell>
//                   <TableCell className="font-medium">{car.title}</TableCell>
//                   <TableCell>{car.make} {car.model}</TableCell>
//                   <TableCell>{car.year}</TableCell>
//                   <TableCell>${car.price.toLocaleString()}</TableCell>
//                   <TableCell>
//                     <Badge variant={car.status === "Active" ? "default" : "secondary"}>
//                       {car.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex space-x-2">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => handleEditCar(car)}
//                       >
//                         <Edit className="h-4 w-4" />
//                       </Button>
//                       <Button variant="outline" size="sm">
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>
//               {editingCar ? "Edit Car" : "Add New Car"}
//             </DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="title">Title</Label>
//                 <Input
//                   id="title"
//                   value={formData.title}
//                   onChange={(e) => setFormData({...formData, title: e.target.value})}
//                   placeholder="BMW M3 Competition 2023"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="make">Make</Label>
//                 <Input
//                   id="make"
//                   value={formData.make}
//                   onChange={(e) => setFormData({...formData, make: e.target.value})}
//                   placeholder="BMW"
//                 />
//               </div>
//             </div>
            
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="model">Model</Label>
//                 <Input
//                   id="model"
//                   value={formData.model}
//                   onChange={(e) => setFormData({...formData, model: e.target.value})}
//                   placeholder="M3"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="year">Year</Label>
//                 <Input
//                   id="year"
//                   type="number"
//                   value={formData.year}
//                   onChange={(e) => setFormData({...formData, year: e.target.value})}
//                   placeholder="2023"
//                 />
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="price">Price ($)</Label>
//               <Input
//                 id="price"
//                 type="number"
//                 value={formData.price}
//                 onChange={(e) => setFormData({...formData, price: e.target.value})}
//                 placeholder="65000"
//               />
//             </div>

//             <div>
//               <Label htmlFor="description">Description</Label>
//               <Textarea
//                 id="description"
//                 value={formData.description}
//                 onChange={(e) => setFormData({...formData, description: e.target.value})}
//                 placeholder="High-performance sports sedan..."
//                 rows={3}
//               />
//             </div>

//             <div>
//               <Label>Images (up to 3)</Label>
//               <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
//                 <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
//                 <p className="mt-2 text-sm text-muted-foreground">
//                   Click to upload or drag and drop
//                 </p>
//                 <p className="text-xs text-muted-foreground">
//                   PNG, JPG, GIF up to 10MB each
//                 </p>
//               </div>
//             </div>

//             <div className="flex justify-end space-x-2">
//               <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
//                 Cancel
//               </Button>
//               <Button type="submit">
//                 {editingCar ? "Update Car" : "Add Car"}
//               </Button>
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }











import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function Cars() {
  const [cars, setCars] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    make: "",
    model: "",
    year: "",
    price: "",
    description: "",
  });
  const [imagesFiles, setImagesFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dbq5gkepx/image/upload";
  const CLOUDINARY_UPLOAD_PRESET = "images-zozac";

  // Fetch cars from backend
  const fetchCars = async () => {
    try {
      const res = await axios.get("https://carbackend-1g9v.onrender.com/cars");
      setCars(Array.isArray(res.data.cars) ? res.data.cars : []);
    } catch (err) {
      console.error("Failed to fetch cars", err);
      toast.error("Failed to fetch cars");
      setCars([]);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleAddCar = () => {
    setEditingCar(null);
    setFormData({ title: "", make: "", model: "", year: "", price: "", description: "" });
    setImagesFiles([]);
    setIsDialogOpen(true);
  };

  const handleEditCar = (car: any) => {
    setEditingCar(car);
    setFormData({
      title: car.title,
      make: car.make,
      model: car.model,
      year: car.year,
      price: car.price,
      description: car.description,
    });
    setImagesFiles([]);
    setIsDialogOpen(true);
  };

  const handleDeleteCar = async (id: string) => {
    if (!confirm("Are you sure you want to delete this car?")) return;
    try {
      await axios.delete(`https://carbackend-1g9v.onrender.com/cars/${id}`);
      setCars(cars.filter((c) => c._id !== id));
      toast.success("Car deleted successfully");
    } catch (err) {
      console.error("Failed to delete car", err);
      toast.error("Failed to delete car");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImagesFiles(Array.from(e.target.files).slice(0, 3)); // max 3 files
  };

  const uploadImagesToCloudinary = async () => {
    const uploadedUrls: string[] = [];
    for (const file of imagesFiles) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      try {
        const res = await axios.post(CLOUDINARY_URL, data);
        uploadedUrls.push(res.data.secure_url);
      } catch (err) {
        console.error("Error uploading image:", err);
        toast.error("Image upload failed");
      }
    }
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const uploadedUrls = imagesFiles.length > 0 ? await uploadImagesToCloudinary() : [];

      // Map uploaded images to img1, img2, img3 as backend expects
      const payload = {
        ...formData,
        img1: uploadedUrls[0] || editingCar?.img1 || "",
        img2: uploadedUrls[1] || editingCar?.img2 || "",
        img3: uploadedUrls[2] || editingCar?.img3 || "",
      };

      if (!payload.img1 || !payload.img2 || !payload.img3) {
        toast.error("All 3 images are required");
        setLoading(false);
        return;
      }

      if (editingCar) {
        const res = await axios.put(`https://carbackend-1g9v.onrender.com/cars/${editingCar._id}`, payload);
        setCars(cars.map((c) => (c._id === editingCar._id ? res.data.car : c)));
        toast.success("Car updated successfully");
      } else {
        const res = await axios.post("https://carbackend-1g9v.onrender.com/cars", payload);
        setCars([res.data.car, ...cars]);
        toast.success("Car added successfully");
      }

      setIsDialogOpen(false);
      setFormData({ title: "", make: "", model: "", year: "", price: "", description: "" });
      setImagesFiles([]);
    } catch (err) {
      console.error("Failed to save car", err);
      toast.error("Failed to save car");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-2 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="mb-2 md:mb-0">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Car Management</h1>
          <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">Manage your car inventory</p>
        </div>
        <Button onClick={handleAddCar} className="bg-primary hover:bg-primary/90 mt-2 md:mt-0 flex items-center">
          <Plus className="h-4 w-4 mr-2" /> Add New Car
        </Button>
      </div>

      <Card className="overflow-x-auto">
        <CardHeader>
          <CardTitle>All Cars</CardTitle>
        </CardHeader>
        <CardContent>
          {cars.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No cars available</p>
          ) : (
            <Table className="min-w-[600px] md:min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Make/Model</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cars.map((car) => (
                  <TableRow key={car._id}>
                    <TableCell>
                      <img
                        src={car.img1 || "/placeholder-car1.jpg"}
                        alt={car.title}
                        className="w-16 h-12 object-cover rounded-lg"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{car.title}</TableCell>
                    <TableCell>{car.make} {car.model}</TableCell>
                    <TableCell>{car.year}</TableCell>
                    <TableCell>${car.price?.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="default">{car.status || "Active"}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditCar(car)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteCar(car._id)}>
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
            <DialogTitle>{editingCar ? "Edit Car" : "Add New Car"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="BMW M3 Competition 2023"
                  required
                />
              </div>
              <div>
                <Label htmlFor="make">Make</Label>
                <Input
                  id="make"
                  value={formData.make}
                  onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                  placeholder="BMW"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  placeholder="M3"
                  required
                />
              </div>
              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="2023"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="65000"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="High-performance sports sedan..."
                rows={3}
                required
              />
            </div>

            <div>
              <Label>Images (3 required)</Label>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : editingCar ? "Update Car" : "Add Car"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
