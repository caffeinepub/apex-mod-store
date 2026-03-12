import { Toaster } from "@/components/ui/sonner";
import CustomizerSection from "./components/CustomizerSection";
import FeaturesSection from "./components/FeaturesSection";
import FooterSection from "./components/FooterSection";
import HeroSection from "./components/HeroSection";
import WhyApexMod from "./components/WhyApexMod";

export default function App() {
  return (
    <div className="min-h-screen bg-background font-body">
      <Toaster />
      <HeroSection />
      <CustomizerSection />
      <FeaturesSection />
      <WhyApexMod />
      <FooterSection />
    </div>
  );
}
