
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Calendar, Clock, Image } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { FoodMap } from "@/components/map/food-map";

const foodTypes = [
  { value: "cooked", label: "Cooked Food" },
  { value: "raw", label: "Raw Ingredients" },
  { value: "packaged", label: "Packaged Food" },
  { value: "baked", label: "Bakery Items" },
  { value: "fresh", label: "Fresh Produce" },
  { value: "dairy", label: "Dairy Products" },
];

export function DonationForm() {
  const [location, setLocation] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGetLocation = () => {
    // In a real app, we would use the browser's geolocation API
    setLocation("Current location detected");
    setShowMap(true);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Donate Food</CardTitle>
        <CardDescription>
          Share your excess food with those who need it most
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="food-type">Food Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select food type" />
            </SelectTrigger>
            <SelectContent>
              {foodTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <div className="flex">
              <Input id="quantity" type="number" placeholder="Quantity" className="rounded-r-none" />
              <Select defaultValue="kg">
                <SelectTrigger className="w-24 rounded-l-none">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kg</SelectItem>
                  <SelectItem value="servings">Servings</SelectItem>
                  <SelectItem value="items">Items</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="portions">Number of Portions/Servings</Label>
            <Input id="portions" type="number" placeholder="Approximate servings" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="expiry-date">Expiry Date</Label>
            <div className="relative">
              <Input id="expiry-date" type="date" />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="best-pickup-time">Best Pickup Time</Label>
            <div className="relative">
              <Input id="best-pickup-time" type="time" />
              <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="food-description">Description</Label>
          <Textarea 
            id="food-description" 
            placeholder="Describe the food items (e.g., '3 trays of vegetable biryani, 2 boxes of paneer curry')"
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Food Image (Optional)</Label>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild className="w-full">
              <label htmlFor="image-upload" className="cursor-pointer flex items-center justify-center gap-2">
                <Image className="h-4 w-4" />
                Upload Image
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </Button>
            {imagePreview && (
              <div className="relative h-16 w-16 border rounded overflow-hidden">
                <img 
                  src={imagePreview} 
                  alt="Food preview" 
                  className="h-full w-full object-cover"
                />
                <button 
                  className="absolute top-0 right-0 bg-foreground/70 text-white h-5 w-5 flex items-center justify-center rounded-bl text-xs"
                  onClick={() => setImagePreview(null)}
                >
                  ×
                </button>
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Adding an image helps receivers better understand what food is available
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pickup-location">Pickup Location</Label>
          <div className="relative">
            <Input 
              id="pickup-location" 
              placeholder="Enter address for pickup"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 text-xs gap-1"
              onClick={handleGetLocation}
            >
              <MapPin className="h-3 w-3" />
              Use Current
            </Button>
          </div>
          {showMap && (
            <div className="mt-4">
              <FoodMap />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Submit Donation</Button>
      </CardFooter>
    </Card>
  );
}
