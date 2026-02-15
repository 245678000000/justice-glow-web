import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 25, suffix: "+", label: "执业年数" },
  { value: 5000, suffix: "+", label: "服务客户" },
  { value: 98, suffix: "%", label: "胜诉率" },
  { value: 30, suffix: "+", label: "专业律师" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v));
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, { duration: 2, ease: "easeOut" });
    const unsub = rounded.on("change", (v) => setDisplay(String(v)));
    return () => { controls.stop(); unsub(); };
  }, [inView, target, count, rounded]);

  return (
    <span ref={ref} className="font-display text-4xl md:text-5xl font-semibold text-accent">
      {display}{suffix}
    </span>
  );
};

const StatsSection = () => (
  <section id="stats" className="py-24 lg:py-[100px] bg-navy">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <Counter target={s.value} suffix={s.suffix} />
            <p className="font-body text-navy-foreground/80 mt-4 text-sm tracking-wide">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
