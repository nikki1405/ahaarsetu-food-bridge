
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 1,
    title: "Register & Create Profile",
    description: "Sign up as a food donor or receiver. Fill in your details and verify your account.",
    icon: "👤",
  },
  {
    id: 2,
    title: "Connect & Coordinate",
    description: "Donors list available food. Receivers discover nearby donations that match their needs.",
    icon: "🔄",
  },
  {
    id: 3,
    title: "Pickup & Deliver",
    description: "Schedule pickups, track status, and confirm successful transfers. Every meal makes a difference.",
    icon: "🚚",
  },
];

export function HowItWorks() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section className="py-16 md:py-20 bg-white" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            How AhaarSetu Works
          </h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto"></div>
        </div>

        <div 
          ref={ref} 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={cn(
                "bg-secondary rounded-lg p-6 text-center transition-all duration-700 transform",
                inView 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8",
                inView && index === 1 && "delay-150",
                inView && index === 2 && "delay-300"
              )}
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                <span className="text-3xl">{step.icon}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">
                {step.title}
              </h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
