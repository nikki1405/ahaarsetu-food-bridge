
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AuthForm } from "@/components/auth/auth-form";
import { BookHeart, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-16 px-4 bg-secondary/10">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
              <BookHeart className="size-8 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-8">Welcome Back to AhaarSetu</h1>
          <Alert className="mb-4 bg-primary/10 border-primary/20">
            <Info className="h-4 w-4 text-primary" />
            <AlertDescription>
              <span className="font-medium">Demo credentials:</span> Use email <span className="font-mono bg-muted px-1 rounded">demo@ahaaarsetu.com</span> and password <span className="font-mono bg-muted px-1 rounded">123456</span> to login.
            </AlertDescription>
          </Alert>
          <AuthForm type="login" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
