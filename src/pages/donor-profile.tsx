
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { User, BarChart2, LogOut, BookHeart, PlusCircle, ClipboardList, Calendar, MapPin, Clock, FileEdit, Mail, Phone, Home, ChevronRight } from "lucide-react";
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
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock user data
const mockDonorData = {
  id: "D001",
  name: "Priya Sharma",
  email: "priya@example.com",
  mobile: "+91 98765 43210",
  address: "123 Main Street, Hyderabad",
  donationsMade: 12,
  donationsActive: 3,
  donationsCompleted: 9,
  joinedDate: "2024-01-15T10:30:00",
  profileImage: "https://placehold.co/200/png"
};

// Mock recent donations
const mockRecentDonations = [
  {
    id: "D001",
    food: "Rice and Curry",
    type: "Cooked Food",
    quantity: "5 kg",
    posted: "2025-04-12T10:30:00",
    status: "pending",
  },
  {
    id: "D002",
    food: "Bread and Pastries",
    type: "Bakery Items",
    quantity: "20 pieces",
    posted: "2025-04-10T09:15:00",
    status: "picked",
  },
  {
    id: "D003",
    food: "Fresh Vegetables",
    type: "Fresh Produce",
    quantity: "3 kg",
    posted: "2025-04-08T16:45:00",
    status: "pending",
  }
];

const DonorProfile = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
                    <SidebarMenuButton asChild tooltip="My Donations">
                      <Link to="/my-donations">
                        <ClipboardList className="h-4 w-4" />
                        <span>My Donations</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Profile" isActive>
                      <Link to="/donor-profile">
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
                <h1 className="text-2xl md:text-3xl font-bold">My Profile</h1>
                <p className="text-muted-foreground">
                  Manage your account details and view your donation history
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* Profile Information */}
                <Card className="md:col-span-1">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-24 h-24 rounded-full overflow-hidden mb-4">
                      <img 
                        src={mockDonorData.profileImage} 
                        alt={mockDonorData.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-xl">{mockDonorData.name}</CardTitle>
                    <CardDescription>Donor since {formatDate(mockDonorData.joinedDate)}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{mockDonorData.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{mockDonorData.mobile}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Home className="h-4 w-4 text-muted-foreground mt-1" />
                      <span>{mockDonorData.address}</span>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-2xl font-bold">{mockDonorData.donationsMade}</p>
                        <p className="text-xs text-muted-foreground">Total Donations</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{mockDonorData.donationsActive}</p>
                        <p className="text-xs text-muted-foreground">Active</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{mockDonorData.donationsCompleted}</p>
                        <p className="text-xs text-muted-foreground">Completed</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <FileEdit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Recent Donations & Actions */}
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Recent Donations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Food Item</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">View</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockRecentDonations.map((donation) => (
                            <TableRow key={donation.id}>
                              <TableCell className="font-medium">{donation.food}</TableCell>
                              <TableCell>{donation.type}</TableCell>
                              <TableCell>{donation.quantity}</TableCell>
                              <TableCell>{getStatusBadge(donation.status)}</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm" asChild>
                                  <Link to={`/donation/${donation.id}`}>
                                    <ChevronRight className="h-4 w-4" />
                                  </Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                    <CardFooter>
                      <Link to="/my-donations" className="w-full">
                        <Button variant="outline" className="w-full">
                          View All Donations
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Link to="/new-donation" className="w-full">
                          <Button className="w-full mb-2">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Post New Donation
                          </Button>
                        </Link>
                        <Link to="/my-donations" className="w-full">
                          <Button variant="outline" className="w-full">
                            <ClipboardList className="h-4 w-4 mr-2" />
                            Manage Donations
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Statistics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Food Donated</span>
                            <span className="font-medium">42 kg</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">People Impacted</span>
                            <span className="font-medium">~95 people</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Food Waste Reduced</span>
                            <span className="font-medium">38 kg</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
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

export default DonorProfile;
