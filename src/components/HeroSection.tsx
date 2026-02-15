import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-navy overflow-hidden"
    >
      {/* Background image */}
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />

      <div className="absolute inset-0 bg-navy/60" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-navy-foreground mb-6 leading-tight"
        >
          您的权益，我们的使命
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-lg md:text-xl text-navy-foreground/70 max-w-2xl mx-auto mb-10"
        >
          二十余年法律实践，专注为企业与个人提供全方位、高品质的法律服务。
          以专业、诚信、高效赢得客户信赖。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollTo("#services")}
            className="border-gold text-gold hover:bg-gold hover:text-gold-foreground font-body px-8"
          >
            了解我们
          </Button>
          <Button
            size="lg"
            onClick={() => scrollTo("#contact")}
            className="bg-gold text-gold-foreground hover:bg-gold/90 font-body px-8"
          >
            立即咨询
          </Button>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
