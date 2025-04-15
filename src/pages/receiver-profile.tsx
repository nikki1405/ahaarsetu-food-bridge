
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
import { User, BarChart2, LogOut, BookHeart, MapPin, Mail, Phone, Home, ChevronRight, FileEdit, Clock } from "lucide-react";
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
const mockReceiverData = {
  id: "R001",
  name: "Rahul Kumar",
  email: "rahul@example.com",
  mobile: "+91 87654 32109",
  address: "456 Park Avenue, Bangalore",
  requestsMade: 8,
  requestsActive: 2,
  requestsCompleted: 6,
  joinedDate: "2024-02-10T14:30:00",
  profileImage: "https://placehold.co/200/png"
};

// Mock recent requests
const mockRecentRequests = [
  {
    id: "D001",
    food: "Rice and Curry",
    donor: "Priya Sharma",
    requestDate: "2025-04-12T10:30:00",
    status: "pending",
  },
  {
    id: "D002",
    food: "Bread and Pastries",
    donor: "Amit Patel",
    requestDate: "2025-04-10T09:15:00",
    status: "approved",
  },
  {
    id: "D003",
    food: "Fresh Vegetables",
    donor: "Sunita Roy",
    requestDate: "2025-04-08T16:45:00",
    status: "received",
  }
];

const ReceiverProfile = () => {
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
      case "approved":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Approved</Badge>;
      case "received":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Received</Badge>;
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
                      <Link to="/receiver-dashboard">
                        <BarChart2 className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Available Food">
                      <Link to="/food-map">
                        <MapPin className="h-4 w-4" />
                        <span>Available Food</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="My Requests">
                      <Link to="/my-requests">
                        <Clock className="h-4 w-4" />
                        <span>My Requests</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Profile" isActive>
                      <Link to="/receiver-profile">
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
                  Manage your account details and view your request history
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* Profile Information */}
                <Card className="md:col-span-1">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-24 h-24 rounded-full overflow-hidden mb-4">
                      <img 
                        src={mockReceiverData.profileImage} 
                        alt={mockReceiverData.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-xl">{mockReceiverData.name}</CardTitle>
                    <CardDescription>Receiver since {formatDate(mockReceiverData.joinedDate)}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{mockReceiverData.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{mockReceiverData.mobile}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Home className="h-4 w-4 text-muted-foreground mt-1" />
                      <span>{mockReceiverData.address}</span>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-2xl font-bold">{mockReceiverData.requestsMade}</p>
                        <p className="text-xs text-muted-foreground">Total Requests</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{mockReceiverData.requestsActive}</p>
                        <p className="text-xs text-muted-foreground">Active</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{mockReceiverData.requestsCompleted}</p>
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
                
                {/* Recent Requests & Actions */}
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Recent Food Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Food Item</TableHead>
                            <TableHead>Donor</TableHead>
                            <TableHead>Requested On</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">View</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockRecentRequests.map((request) => (
                            <TableRow key={request.id}>
                              <TableCell className="font-medium">{request.food}</TableCell>
                              <TableCell>{request.donor}</TableCell>
                              <TableCell>{formatDate(request.requestDate)}</TableCell>
                              <TableCell>{getStatusBadge(request.status)}</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm" asChild>
                                  <Link to={`/donation/${request.id}`}>
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
                      <Link to="/my-requests" className="w-full">
                        <Button variant="outline" className="w-full">
                          View All Requests
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
                        <Link to="/food-map" className="w-full">
                          <Button className="w-full mb-2">
                            <MapPin className="h-4 w-4 mr-2" />
                            Browse Available Food
                          </Button>
                        </Link>
                        <Link to="/my-requests" className="w-full">
                          <Button variant="outline" className="w-full">
                            <Clock className="h-4 w-4 mr-2" />
                            Track My Requests
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
                            <span className="text-sm text-muted-foreground">Food Received</span>
                            <span className="font-medium">28 kg</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Meals Saved</span>
                            <span className="font-medium">~64 meals</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Average Response Time</span>
                            <span className="font-medium">2.4 hours</span>
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

export default ReceiverProfile;
