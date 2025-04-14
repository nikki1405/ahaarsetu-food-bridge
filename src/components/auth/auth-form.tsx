
import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, Upload, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthFormProps {
  type: "login" | "register";
}

interface FormErrors {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  general?: string;
}

export function AuthForm({ type }: AuthFormProps) {
  const [searchParams] = useSearchParams();
  const [userType, setUserType] = useState(
    searchParams.get("type") || "donor"
  );
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error when user types
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    // Validate email
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (type === "register" && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    // For registration, validate additional fields
    if (type === "register") {
      if (!formData.firstName) {
        newErrors.firstName = "First name is required";
      }
      
      if (!formData.lastName) {
        newErrors.lastName = "Last name is required";
      }
      
      if (!formData.phone) {
        newErrors.phone = "Phone number is required";
      }
      
      if (!formData.address) {
        newErrors.address = "Address is required";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const authenticateUser = async () => {
    // Demo authentication - normally this would be an API call
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const isValid = formData.email === "demo@ahaaarsetu.com" && formData.password === "123456";
        resolve(isValid);
      }, 1000); // Simulate network delay
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    if (type === "login") {
      try {
        const isAuthenticated = await authenticateUser();
        
        if (isAuthenticated) {
          toast({
            title: "Login successful",
            description: "Redirecting to your dashboard...",
          });
          
          // Redirect to appropriate dashboard based on user type
          setTimeout(() => {
            navigate(userType === "donor" ? "/donor-dashboard" : "/receiver-dashboard");
          }, 1000);
        } else {
          setErrors({
            general: "Invalid login credentials, please try again."
          });
          setIsLoading(false);
        }
      } catch (error) {
        setErrors({
          general: "Login failed. Please try again later."
        });
        setIsLoading(false);
      }
    } else {
      // For registration, we'd normally send the data to an API
      // For now, just simulate a successful registration
      setTimeout(() => {
        toast({
          title: "Registration successful",
          description: "You can now log in with your credentials.",
        });
        navigate("/login");
        setIsLoading(false);
      }, 1500);
    }
  };

  const isRegistration = type === "register";
  const title = isRegistration ? "Create Your Account" : "Welcome Back";
  const description = isRegistration 
    ? "Join AhaarSetu to start sharing or receiving food" 
    : "Login to your account to continue your journey";

  return (
    <Card className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">{title}</CardTitle>
          <CardDescription className="text-center">{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {errors.general && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.general}</AlertDescription>
            </Alert>
          )}
        
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
                <Input 
                  id="firstName" 
                  placeholder="First name" 
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? "border-destructive" : ""}
                />
                {errors.firstName && (
                  <p className="text-xs text-destructive mt-1">{errors.firstName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  placeholder="Last name" 
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? "border-destructive" : ""}
                />
                {errors.lastName && (
                  <p className="text-xs text-destructive mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@example.com" 
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-xs text-destructive mt-1">{errors.email}</p>
            )}
          </div>

          {isRegistration && (
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                type="tel" 
                placeholder="Phone number" 
                value={formData.phone}
                onChange={handleInputChange}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && (
                <p className="text-xs text-destructive mt-1">{errors.phone}</p>
              )}
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
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? "border-destructive" : ""}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
              >
                {isPasswordVisible ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive mt-1">{errors.password}</p>
            )}
          </div>

          {isRegistration && (
            <>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address" 
                  placeholder="Full address" 
                  value={formData.address}
                  onChange={handleInputChange}
                  className={errors.address ? "border-destructive" : ""}
                />
                {errors.address && (
                  <p className="text-xs text-destructive mt-1">{errors.address}</p>
                )}
                <div className="mt-2 flex items-center justify-between">
                  <Button type="button" variant="outline" size="sm" className="gap-1 text-xs">
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
                    <Button type="button" variant="outline" size="icon">
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
          <Button className="w-full mb-4" disabled={isLoading} type="submit">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isRegistration ? "Creating Account..." : "Logging in..."}
              </>
            ) : (
              isRegistration ? "Create Account" : "Login"
            )}
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
      </form>
    </Card>
  );
}
