import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
import { Calendar, Clock, MapPin, Search, Filter, FileEdit, Eye, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Mock data for donations
const mockDonations = [
  {
    id: "D001",
    food: "Rice and Curry",
    type: "Cooked Food",
    quantity: "5 kg",
    posted: "2025-04-12T10:30:00",
    expiry: "2025-04-13T20:00:00",
    status: "pending",
    distance: "1.2 km",
  },
  {
    id: "D002",
    food: "Bread and Pastries",
    type: "Bakery Items",
    quantity: "20 pieces",
    posted: "2025-04-12T09:15:00",
    expiry: "2025-04-14T12:00:00",
    status: "picked",
    distance: "2.5 km",
  },
  {
    id: "D003",
    food: "Fresh Vegetables",
    type: "Fresh Produce",
    quantity: "3 kg",
    posted: "2025-04-11T16:45:00",
    expiry: "2025-04-15T23:59:00",
    status: "pending",
    distance: "0.8 km",
  },
  {
    id: "D004",
    food: "Mixed Buffet Leftovers",
    type: "Cooked Food",
    quantity: "8 kg",
    posted: "2025-04-11T14:30:00",
    expiry: "2025-04-12T22:00:00",
    status: "expired",
    distance: "3.1 km",
  },
];

type DonationStatus = "pending" | "picked" | "expired";

interface DonationListProps {
  type: "donor" | "receiver";
}

export function DonationList({ type }: DonationListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const userRole = localStorage.getItem("userRole") || type;

  const getStatusBadge = (status: DonationStatus) => {
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
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const handleDeleteDonation = (id: string) => {
    console.log("Deleting donation:", id);
    
    toast({
      title: "Donation Deleted",
      description: "The donation has been successfully deleted.",
    });
  };

  const filteredDonations = mockDonations.filter((donation) =>
    donation.food.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>
            {type === "donor" ? "Your Donations" : "Available Food"}
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search donations..."
                className="pl-9 h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Food Items</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantity</TableHead>
                {type === "receiver" && <TableHead>Distance</TableHead>}
                <TableHead>Expiry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDonations.length > 0 ? (
                filteredDonations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell className="font-medium">{donation.food}</TableCell>
                    <TableCell>{donation.type}</TableCell>
                    <TableCell>{donation.quantity}</TableCell>
                    {type === "receiver" && (
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {donation.distance}
                        </div>
                      </TableCell>
                    )}
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        {formatDate(donation.expiry)}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(donation.status as DonationStatus)}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Link to={`/donation/${donation.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        
                        {(userRole === "donor" || type === "donor") && donation.status === "pending" && (
                          <Link to={`/edit-donation/${donation.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <FileEdit className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                        
                        {(userRole === "donor" || type === "donor") && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive/80">
                                <Trash2 className="h-4 w-4" />
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
                                <AlertDialogAction onClick={() => handleDeleteDonation(donation.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                        
                        {type === "receiver" && donation.status === "pending" && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                            <MapPin className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell 
                    colSpan={type === "receiver" ? 7 : 6} 
                    className="h-32 text-center text-muted-foreground"
                  >
                    No donations found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
