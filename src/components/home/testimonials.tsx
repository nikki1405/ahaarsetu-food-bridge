
import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    content:
      "AhaarSetu has transformed how we handle excess food. Instead of waste, we now easily connect with local shelters. The platform's simplicity and real-time updates make the entire process seamless.",
    name: "Priya Sharma",
    role: "Restaurant Owner",
    type: "Donor",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    id: 2,
    content:
      "Our orphanage relies on AhaarSetu to supplement our meals. The map feature helps us find nearby donations quickly, and the quality of food we receive has been consistently excellent.",
    name: "Rajesh Kumar",
    role: "NGO Director",
    type: "Receiver",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
  },
  {
    id: 3,
    content:
      "As an event organizer, I used to feel guilty about leftover food. AhaarSetu has changed that - now we know our surplus food reaches those who need it most, usually within hours.",
    name: "Ananya Patel",
    role: "Event Coordinator",
    type: "Donor",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: 4,
    content:
      "The real-time notifications and easy pickup coordination have made it possible for our shelter to receive fresh food daily. This has made a huge difference in the lives of the people we serve.",
    name: "Vikram Singh",
    role: "Shelter Manager",
    type: "Receiver",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const next = useCallback(() => {
    setCurrent((current) => (current + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, isAutoPlaying]);

  return (
    <section className="py-16 bg-secondary/50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            What People Say About Us
          </h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className={cn(
                    "bg-white rounded-lg p-8 shadow-md transition-all duration-700",
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}>
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-shrink-0">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full border-2 border-primary object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-lg italic text-foreground/80 mb-4">
                          "{testimonial.content}"
                        </p>
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role} • <span className={testimonial.type === 'Donor' ? 'text-primary' : 'text-accent'}>
                              {testimonial.type}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              prev();
              setIsAutoPlaying(false);
            }}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 bg-white rounded-full p-2 shadow-md hover:bg-secondary transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={() => {
              next();
              setIsAutoPlaying(false);
            }}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 bg-white rounded-full p-2 shadow-md hover:bg-secondary transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrent(index);
                  setIsAutoPlaying(false);
                }}
                className={`h-2 rounded-full transition-all ${
                  current === index
                    ? "w-6 bg-primary"
                    : "w-2 bg-primary/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
