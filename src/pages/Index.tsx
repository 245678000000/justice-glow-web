import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ServicesSection from "@/components/ServicesSection";
import TeamSection from "@/components/TeamSection";
import CasesSection from "@/components/CasesSection";
import StatsSection from "@/components/StatsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <TrustBar />
    <ServicesSection />
    <TeamSection />
    <CasesSection />
    <StatsSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
