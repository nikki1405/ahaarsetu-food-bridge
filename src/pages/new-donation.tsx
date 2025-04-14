
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DonationForm } from "@/components/donations/donation-form";

const NewDonation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <DonationForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewDonation;
