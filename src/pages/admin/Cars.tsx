"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface Car {
  _id: string;
  title: string;
  make: string;
  model: string;
  year: string;
  price: string;
  description: string;
  img1?: string;
  img2?: string;
  img3?: string;
  img4?: string;
  img5?: string;
  img6?: string;
  img7?: string;
  img8?: string;
  img9?: string;
}

export default function CarManager() {
  const [cars, setCars] = useState<Car[]>([]);
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
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const CLOUDINARY_URL =
    "https://api.cloudinary.com/v1_1/dbq5gkepx/image/upload";
  const CLOUDINARY_UPLOAD_PRESET = "images-zozac"; // Change to your preset

  // Fetch cars from backend
  const fetchCars = async () => {
    try {
      const res = await axios.get("https://carbackend-1g9v.onrender.com/cars");
      console.log("Response:", res.data);
      setCars(Array.isArray(res.data.cars) ? res.data.cars : []);
    } catch (err) {
      console.error("Failed to fetch cars", err);
      setCars([]);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImagesFiles(Array.from(e.target.files).slice(0, 9)); // max 9 files
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
      const uploadedUrls =
        imagesFiles.length > 0 ? await uploadImagesToCloudinary() : [];

      // Map uploaded images to img1..img9
      const payload: any = { ...formData };
      for (let i = 0; i < 9; i++) {
        payload[`img${i + 1}`] =
          uploadedUrls[i] || editingCar?.[`img${i + 1}`] || "";
      }

      if (!payload.img1) {
        toast.error("At least 1 image is required");
        setLoading(false);
        return;
      }

      if (editingCar) {
        const res = await axios.put(
          `https://carbackend-1g9v.onrender.com/cars/${editingCar._id}`,
          payload
        );
        setCars(
          cars.map((c) => (c._id === editingCar._id ? res.data.car : c))
        );
        toast.success("Car updated successfully");
      } else {
        const res = await axios.post(
          "https://carbackend-1g9v.onrender.com/cars",
          payload
        );
        setCars([res.data.car, ...cars]);
        toast.success("Car added successfully");
      }

      setIsDialogOpen(false);
      setFormData({
        title: "",
        make: "",
        model: "",
        year: "",
        price: "",
        description: "",
      });
      setImagesFiles([]);
      setEditingCar(null);
    } catch (err) {
      console.error("Failed to save car", err);
      toast.error("Failed to save car");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setFormData({
      title: car.title,
      make: car.make,
      model: car.model,
      year: car.year,
      price: car.price,
      description: car.description,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Car Manager</h1>
        <Button
          onClick={() => {
            setEditingCar(null);
            setFormData({
              title: "",
              make: "",
              model: "",
              year: "",
              price: "",
              description: "",
            });
            setImagesFiles([]);
            setIsDialogOpen(true);
          }}
        >
          Add Car
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car._id}
            className="border rounded-lg shadow-md p-4"
          >
            <img
              src={car.img1 || "/placeholder-car1.jpg"}
              alt={car.title}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-lg font-bold mt-2">{car.title}</h2>
            <p>
              {car.make} {car.model} ({car.year})
            </p>
            <p className="text-gray-700">£{car.price}</p>
            <p className="text-sm text-gray-500">{car.description}</p>

            <div className="flex gap-2 mt-3">
              <Button onClick={() => handleEdit(car)}>Edit</Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(car._id)}
              >
                Delete
              </Button>
            </div>

            {/* Thumbnails for other images */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              {[
                car.img2,
                car.img3,
                car.img4,
                car.img5,
                car.img6,
                car.img7,
                car.img8,
                car.img9,
              ]
                .filter((img): img is string => Boolean(img))
                .map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`car-${i}`}
                    className="w-full h-20 object-cover rounded"
                  />
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Dialog Form */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingCar ? "Edit Car" : "Add Car"}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label>Make</Label>
              <Input
                value={formData.make}
                onChange={(e) =>
                  setFormData({ ...formData, make: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label>Model</Label>
              <Input
                value={formData.model}
                onChange={(e) =>
                  setFormData({ ...formData, model: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label>Year</Label>
              <Input
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label>Price</Label>
              <Input
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label>Images (up to 9)</Label>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading
                  ? "Saving..."
                  : editingCar
                  ? "Update Car"
                  : "Add Car"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
