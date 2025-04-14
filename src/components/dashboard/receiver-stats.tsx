
import { Apple, MapPin, Calendar } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

function StatCard({ title, value, description, icon, className }: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

export function ReceiverStats() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Available Donations"
        value={12}
        description="Near your location"
        icon={<Apple className="h-4 w-4 text-primary" />}
        className="border-l-4 border-primary"
      />
      <StatCard
        title="Nearby Donors"
        value={5}
        description="Within 5km radius"
        icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Pickups This Month"
        value={18}
        description="Food items received"
        icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
}
