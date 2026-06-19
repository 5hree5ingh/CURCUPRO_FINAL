import HeroSection from "@/components/sections/HeroSection";
import WhySyntheticSection from "@/components/sections/WhySyntheticSection";
import ProductRangeSection from "@/components/sections/ProductRangeSection";
import ApplicationsSection from "@/components/sections/ApplicationsSection";
import ResourcesSection from "@/components/sections/ResourcesSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <WhySyntheticSection />
      <ProductRangeSection />
      <ApplicationsSection />
      <ResourcesSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}

