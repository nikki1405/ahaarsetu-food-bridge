
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { User, BarChart2, LogOut, BookHeart, PlusCircle, ClipboardList, Calendar, MapPin, Clock, FileEdit, Trash2, ArrowLeft } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

// Mock donation data for demonstration
const mockDonationData = {
  id: "D001",
  food: "Rice and Curry",
  type: "Cooked Food",
  quantity: "5 kg",
  portions: "10",
  posted: "2025-04-12T10:30:00",
  expiry: "2025-04-13T20:00:00",
  status: "pending",
  description: "Freshly cooked rice with vegetable curry. Can feed about 10 people.",
  location: "123 Main Street, Hyderabad",
  image: "https://placehold.co/600x400/png",
  donorName: "Priya",
  donorContact: "+91 98765 43210"
};

const DonationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [showMap, setShowMap] = useState(true);
  
  // In a real app, we would fetch the donation data based on the ID
  const donation = mockDonationData;

  const handleDelete = () => {
    // In a real app, we would delete the donation
    console.log("Deleting donation:", id);
    
    // Show success toast
    toast({
      title: "Donation Deleted",
      description: "Your donation has been successfully deleted.",
    });
    
    // Navigate back to my donations page
    window.location.href = "/my-donations";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending</Badge>;
      case "picked":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Picked Up</Badge>;
      case "expired":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Expired</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
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
                <Link to="/my-donations" className="flex items-center text-primary mb-4 hover:underline">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to My Donations
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold">Donation Details</h1>
                <p className="text-muted-foreground">
                  View complete information about your food donation
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle className="text-xl">Food Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {donation.image && (
                      <div className="w-full h-60 rounded-md overflow-hidden">
                        <img 
                          src={donation.image} 
                          alt={donation.food} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium">{donation.food}</h3>
                        <p className="text-sm text-muted-foreground">{donation.type}</p>
                      </div>
                      {getStatusBadge(donation.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Quantity</p>
                        <p className="font-medium">{donation.quantity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Portions</p>
                        <p className="font-medium">{donation.portions} servings</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Posted On</p>
                          <p className="font-medium">{formatDate(donation.posted)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Expires On</p>
                          <p className="font-medium">{formatDate(donation.expiry)}</p>
                        </div>
                      </div>
                    </div>
                    
                    {donation.description && (
                      <div>
                        <p className="text-sm text-muted-foreground">Description</p>
                        <p className="font-medium">{donation.description}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <div className="space-y-8">
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle className="text-xl">Pickup Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Pickup Location</p>
                          <p className="font-medium">{donation.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Donor Details</p>
                          <p className="font-medium">{donation.donorName}</p>
                          <p className="text-sm">{donation.donorContact}</p>
                        </div>
                      </div>
                      
                      {showMap && (
                        <div className="mt-4 h-[200px] rounded-md overflow-hidden">
                          <FoodMap />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        You can manage your donation with these actions:
                      </p>
                      <div className="flex flex-col gap-3">
                        <Link to={`/edit-donation/${id}`} className="w-full">
                          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                            <FileEdit className="h-4 w-4" />
                            Edit Donation
                          </Button>
                        </Link>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="w-full flex items-center justify-center gap-2">
                              <Trash2 className="h-4 w-4" />
                              Delete Donation
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                donation and remove it from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default DonationDetails;
