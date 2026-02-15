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
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover img-professional" />
      <div className="absolute inset-0 bg-navy/70" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-navy-foreground mb-8 leading-tight tracking-wide"
        >
          以专业精神，守护商业正义
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-base md:text-lg text-navy-foreground/70 max-w-xl mx-auto mb-12"
        >
          自2008年执业以来，鼎盛律师事务所专注为企业与机构提供全方位法律服务，以丰富经验和专业素养赢得客户长期信赖。
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
            className="border-gold text-gold hover:bg-gold hover:text-gold-foreground font-body px-10"
          >
            了解我们
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollTo("#contact")}
            className="border-navy-foreground/40 text-navy-foreground hover:border-gold hover:text-gold font-body px-10"
          >
            预约面谈
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
