
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
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
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { User, BarChart2, LogOut, BookHeart, PlusCircle, ClipboardList, Calendar, Clock, Image, MapPin } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarGroup,
} from "@/components/ui/sidebar";
import { FoodMap } from "@/components/map/food-map";
import { useToast } from "@/hooks/use-toast";

// Mock donation data for demonstration
const mockDonationData = {
  id: "D001",
  food: "Rice and Curry",
  type: "cooked",
  quantity: "5",
  unit: "kg",
  portions: "10",
  posted: "2025-04-12T10:30:00",
  expiry: "2025-04-13",
  expiryTime: "20:00",
  status: "pending",
  description: "Freshly cooked rice with vegetable curry. Can feed about 10 people.",
  location: "123 Main Street, Hyderabad",
  image: "https://placehold.co/600x400/png"
};

const foodTypes = [
  { value: "cooked", label: "Cooked Food" },
  { value: "raw", label: "Raw Ingredients" },
  { value: "packaged", label: "Packaged Food" },
  { value: "baked", label: "Bakery Items" },
  { value: "fresh", label: "Fresh Produce" },
  { value: "dairy", label: "Dairy Products" },
];

const EditDonation = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [showMap, setShowMap] = useState(false);
  
  // In a real app, we would fetch the donation data based on the ID
  const donation = mockDonationData;
  
  // Form state (pre-filled with existing donation data)
  const [formData, setFormData] = useState({
    food: donation.food,
    type: donation.type,
    quantity: donation.quantity,
    unit: donation.unit,
    portions: donation.portions,
    expiry: donation.expiry,
    expiryTime: donation.expiryTime,
    description: donation.description,
    location: donation.location,
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(donation.image);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
    setFormData({
      ...formData,
      location: "Current location detected",
    });
    setShowMap(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would save the updated donation data
    console.log("Updated donation data:", formData);
    
    // Show success toast
    toast({
      title: "Donation Updated",
      description: "Your donation has been successfully updated.",
    });
    
    // Navigate back to my donations page
    window.location.href = "/my-donations";
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Navbar />
        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar>
            <SidebarHeader className="border-b border-secondary/10">
              <div className="flex items-center gap-2 px-4 py-2">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookHeart className="size-4 text-primary" />
                </div>
                <div className="font-medium text-lg">AhaarSetu</div>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Menu</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Dashboard">
                      <Link to="/donor-dashboard">
                        <BarChart2 className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Post New Food">
                      <Link to="/new-donation">
                        <PlusCircle className="h-4 w-4" />
                        <span>Post New Food</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="My Donations" isActive>
                      <Link to="/my-donations">
                        <ClipboardList className="h-4 w-4" />
                        <span>My Donations</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Profile">
                      <Link to="/profile">
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t border-secondary/10">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Logout">
                    <Link to="/login">
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>

          {/* Main Content */}
          <main className="flex-1 py-8 px-4 md:px-8 bg-muted/10 overflow-auto">
            <div className="container mx-auto">
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold">Edit Your Donation</h1>
                <p className="text-muted-foreground">
                  Update the details of your food donation
                </p>
              </div>
              
              <Card className="w-full max-w-3xl mx-auto">
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle className="text-2xl">Edit Donation</CardTitle>
                    <CardDescription>
                      Make changes to your donation information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="food">Food Name</Label>
                      <Input 
                        id="food" 
                        name="food"
                        value={formData.food} 
                        onChange={handleInputChange} 
                        placeholder="Name of the food item(s)"
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="food-type">Food Type</Label>
                      <Select 
                        value={formData.type}
                        onValueChange={(value) => handleSelectChange("type", value)}
                      >
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
                          <Input 
                            id="quantity" 
                            name="quantity"
                            type="number" 
                            value={formData.quantity}
                            onChange={handleInputChange}
                            placeholder="Quantity" 
                            className="rounded-r-none" 
                            required 
                          />
                          <Select 
                            value={formData.unit}
                            onValueChange={(value) => handleSelectChange("unit", value)}
                          >
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
                        <Input 
                          id="portions" 
                          name="portions"
                          type="number" 
                          value={formData.portions}
                          onChange={handleInputChange}
                          placeholder="Approximate servings" 
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <div className="relative">
                          <Input 
                            id="expiry" 
                            name="expiry"
                            type="date" 
                            value={formData.expiry}
                            onChange={handleInputChange}
                            required 
                          />
                          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expiryTime">Best Pickup Time</Label>
                        <div className="relative">
                          <Input 
                            id="expiryTime" 
                            name="expiryTime"
                            type="time" 
                            value={formData.expiryTime}
                            onChange={handleInputChange}
                            required 
                          />
                          <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe the food items"
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image">Food Image</Label>
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
                              type="button"
                              className="absolute top-0 right-0 bg-foreground/70 text-white h-5 w-5 flex items-center justify-center rounded-bl text-xs"
                              onClick={() => setImagePreview(null)}
                            >
                              ×
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Pickup Location</Label>
                      <div className="relative">
                        <Input 
                          id="location" 
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="Enter address for pickup"
                          required 
                        />
                        <Button
                          type="button"
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
                  <CardFooter className="flex justify-between">
                    <Link to="/my-donations">
                      <Button variant="outline">Cancel</Button>
                    </Link>
                    <Button type="submit">Save Changes</Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default EditDonation;
