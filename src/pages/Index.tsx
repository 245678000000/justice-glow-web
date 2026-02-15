import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TeamSection from "@/components/TeamSection";
import StatsSection from "@/components/StatsSection";
import CasesSection from "@/components/CasesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <ServicesSection />
    <TeamSection />
    <CasesSection />
    <StatsSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
