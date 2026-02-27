import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/global/Footer";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <ReviewsSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
