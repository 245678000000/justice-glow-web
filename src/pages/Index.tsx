import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ServicesSection from "@/components/ServicesSection";
import TeamSection from "@/components/TeamSection";
import CasesSection from "@/components/CasesSection";
import StatsSection from "@/components/StatsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import LegalChatWidget from "@/components/LegalChatWidget";

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
    <LegalChatWidget />
  </div>
);

export default Index;
