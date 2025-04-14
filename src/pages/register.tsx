
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AuthForm } from "@/components/auth/auth-form";
import { BookHeart } from "lucide-react";

const Register = () => {
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
          <h1 className="text-2xl font-bold text-center mb-8">Join AhaarSetu Today</h1>
          <AuthForm type="register" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
