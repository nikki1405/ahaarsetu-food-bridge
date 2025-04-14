
import { useState } from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, Clock, MapPin, MoreVertical, Search, Filter } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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
                <TableHead className="w-[50px]"></TableHead>
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          {type === "donor" && donation.status === "pending" && (
                            <DropdownMenuItem>Edit Donation</DropdownMenuItem>
                          )}
                          {type === "receiver" && donation.status === "pending" && (
                            <DropdownMenuItem>Request Pickup</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
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
