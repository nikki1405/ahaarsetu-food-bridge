
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  inView: boolean;
}

function CountUp({ end, duration = 2000, suffix = "", inView }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, inView]);

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const statistics = [
  {
    id: 1,
    value: 25000,
    suffix: "kg",
    label: "Food Saved",
    icon: "🍲",
  },
  {
    id: 2,
    value: 95000,
    suffix: "+",
    label: "Meals Served",
    icon: "🍽️",
  },
  {
    id: 3,
    value: 450,
    suffix: "+",
    label: "Organizations",
    icon: "🏢",
  },
  {
    id: 4,
    value: 35,
    suffix: "+",
    label: "Cities Covered",
    icon: "🏙️",
  },
];

export function Statistics() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="py-16 bg-accent/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {statistics.map((stat, index) => (
            <div 
              key={stat.id}
              className={cn(
                "text-center p-6 bg-white rounded-lg shadow-sm transition-all duration-700 transform",
                inView 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8",
                inView && index === 1 && "delay-150",
                inView && index === 2 && "delay-300",
                inView && index === 3 && "delay-450"
              )}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                <CountUp end={stat.value} suffix={stat.suffix} inView={inView} />
              </h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
