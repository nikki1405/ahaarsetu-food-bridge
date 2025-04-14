
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Mail } from "lucide-react";

const teamMembers = [
  {
    name: "Aditya Sharma",
    role: "Founder & CEO",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Patel",
    role: "Operations Director",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rahul Kapoor",
    role: "Technology Lead",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Meera Reddy",
    role: "Community Manager",
    image: "https://randomuser.me/api/portraits/women/29.jpg",
  },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              About AhaarSetu
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
              Connecting compassionate donors with those in need - building a bridge to reduce
              food waste and fight hunger in our communities.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Mission</h2>
                <p className="mb-4 text-muted-foreground">
                  AhaarSetu was founded with a simple yet powerful mission: to create a seamless
                  connection between those who have excess food and those who need it most.
                </p>
                <p className="mb-6 text-muted-foreground">
                  In a world where one-third of all food produced goes to waste while millions go
                  hungry every day, we saw an opportunity to make a difference through technology
                  and community engagement.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register">
                    <Button className="gap-2">
                      <Heart className="h-4 w-4" />
                      Join Our Mission
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" className="gap-2">
                      <Mail className="h-4 w-4" />
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-64 md:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070"
                  alt="People sharing food"
                  className="rounded-lg shadow-lg object-cover h-full w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-primary py-12 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">25,000+</p>
                <p className="text-sm opacity-90">Kilograms of Food Saved</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">95,000+</p>
                <p className="text-sm opacity-90">Meals Served</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">450+</p>
                <p className="text-sm opacity-90">Organizations Involved</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">35+</p>
                <p className="text-sm opacity-90">Cities Covered</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold">Our Team</h2>
              <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet the passionate individuals working tirelessly to connect food donors with those in need
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div key={member.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-60 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-accent/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8 text-muted-foreground">
              Join our community of food donors and receivers today. Together, we can reduce waste and fight hunger.
            </p>
            <Link to="/register">
              <Button size="lg" className="gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
