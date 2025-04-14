
import { Utensils, Check, Clock, AlertCircle } from "lucide-react";
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

export function DonorStats() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Total Donations"
        value={27}
        description="Food items donated"
        icon={<Utensils className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Picked Up"
        value={23}
        description="Successfully delivered"
        icon={<Check className="h-4 w-4 text-green-500" />}
        className="border-l-4 border-green-500"
      />
      <StatCard
        title="Pending"
        value={4}
        description="Awaiting pickup"
        icon={<Clock className="h-4 w-4 text-amber-500" />}
        className="border-l-4 border-amber-500"
      />
    </div>
  );
}
