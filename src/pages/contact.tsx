
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
              Have questions or suggestions? We're here to help. Reach out to our team and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Details & Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you shortly.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
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
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Your email address" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="Message subject" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea 
                          id="message" 
                          placeholder="How can we help you?"
                          className="min-h-[150px]"
                        />
                      </div>
                      <Button type="submit" className="w-full">Send Message</Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info & Map */}
              <div className="space-y-8">
                <div className="bg-secondary rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Email Address</p>
                        <a 
                          href="mailto:info@ahaarsetu.org" 
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          info@ahaarsetu.org
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Phone Number</p>
                        <a 
                          href="tel:+919876543210" 
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          +91 98765 43210
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Address</p>
                        <address className="text-muted-foreground not-italic">
                          123 Food Street, Hunger Solutions<br />
                          Hyderabad, Telangana, 500001
                        </address>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Placeholder for Google Maps */}
                <div className="bg-gray-100 rounded-lg overflow-hidden h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-medium">Map View</p>
                    <p className="text-sm text-muted-foreground">
                      Google Maps would be embedded here
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold">Frequently Asked Questions</h2>
              <p className="mt-3 text-muted-foreground">
                Find quick answers to common questions about AhaarSetu
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">How do I donate food?</h3>
                <p className="text-muted-foreground">
                  Register as a donor, fill in your details, and then use the "Post New Food" option to list available foods for donation.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">How does the pickup process work?</h3>
                <p className="text-muted-foreground">
                  Receivers can browse available food and request pickup. Once confirmed, they can collect the food from the donor's location.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Is there any cost to use AhaarSetu?</h3>
                <p className="text-muted-foreground">
                  No, AhaarSetu is completely free for both donors and receivers. Our mission is to reduce food waste and help those in need.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Can individuals donate food?</h3>
                <p className="text-muted-foreground">
                  Yes, both individuals and organizations can donate food. We welcome contributions from households, restaurants, event venues, and more.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
