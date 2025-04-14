
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AuthForm } from "@/components/auth/auth-form";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-16 px-4 bg-secondary/30">
        <div className="w-full max-w-md">
          <AuthForm type="login" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
