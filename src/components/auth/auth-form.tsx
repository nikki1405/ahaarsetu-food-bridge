
import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { MapPin, Upload } from "lucide-react";

interface AuthFormProps {
  type: "login" | "register";
}

export function AuthForm({ type }: AuthFormProps) {
  const [searchParams] = useSearchParams();
  const [userType, setUserType] = useState(
    searchParams.get("type") || "donor"
  );
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const isRegistration = type === "register";
  const title = isRegistration ? "Create Your Account" : "Welcome Back";
  const description = isRegistration 
    ? "Join AhaarSetu to start sharing or receiving food" 
    : "Login to your account to continue your journey";

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isRegistration && (
          <div className="space-y-2">
            <Label>I am a</Label>
            <RadioGroup
              defaultValue={userType}
              value={userType}
              onValueChange={setUserType}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="donor" id="donor" />
                <Label htmlFor="donor" className="cursor-pointer">Food Donor</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="receiver" id="receiver" />
                <Label htmlFor="receiver" className="cursor-pointer">Food Receiver</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {isRegistration && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="First name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Last name" />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@example.com" />
        </div>

        {isRegistration && (
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="Phone number" />
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="password">Password</Label>
            {!isRegistration && (
              <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            )}
          </div>
          <div className="relative">
            <Input
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
            >
              {isPasswordVisible ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {isRegistration && (
          <>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="Full address" />
              <div className="mt-2 flex items-center justify-between">
                <Button variant="outline" size="sm" className="gap-1 text-xs">
                  <MapPin className="h-3 w-3" />
                  Use Current Location
                </Button>
                <span className="text-xs text-muted-foreground">Helps us match nearby donors/receivers</span>
              </div>
            </div>

            {userType === "receiver" && (
              <div className="space-y-2">
                <Label htmlFor="organization">Organization ID (Optional)</Label>
                <div className="flex gap-2">
                  <Input id="organization" placeholder="Upload Organization ID" readOnly className="flex-1" />
                  <Button variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  For NGOs, shelters, and other organizations
                </p>
              </div>
            )}
          </>
        )}
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full mb-4">
          {isRegistration ? "Create Account" : "Login"}
        </Button>
        <p className="text-sm text-center text-muted-foreground">
          {isRegistration ? "Already have an account? " : "Don't have an account? "}
          <Link
            to={isRegistration ? "/login" : "/register"}
            className="text-primary hover:underline"
          >
            {isRegistration ? "Login" : "Create one"}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
