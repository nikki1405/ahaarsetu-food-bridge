import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DonationList } from "@/components/donations/donation-list";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, BarChart2, LogOut, BookHeart, PlusCircle, ClipboardList } from "lucide-react";
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

const MyDonations = () => {
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
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">My Donations</h1>
                  <p className="text-muted-foreground">
                    View and manage all your food donations
                  </p>
                </div>
                <Link to="/new-donation">
                  <Button className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Post New Food
                  </Button>
                </Link>
              </div>

              <div className="mb-4">
                <DonationList type="donor" />
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default MyDonations;
