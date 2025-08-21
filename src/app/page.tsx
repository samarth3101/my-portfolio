import HeroSection from "@/components/sections/HeroSection";
import NavbarSection from "@/components/sections/NavbarSection";
import AboutSection from "@/components/sections/AboutSection";
import ResearchSection from "@/components/sections/ResearchSection";
import IEEEStudentBranchSection from "@/components/sections/IeeSection";
import TeachingSection from "@/components/sections/TeachinSection";
import AwardsSection from "@/components/sections/AwardSection";
import ProfessionalSection from "@/components/sections/ProfessionalPathSection";
import GallerySection from "@/components/sections/GallerySection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <main>
      <NavbarSection />
      <HeroSection />
      <AboutSection />
      <ResearchSection />
      <TeachingSection />
      <AwardsSection />
      <ProfessionalSection />
      <GallerySection />
      <IEEEStudentBranchSection />
      <ContactSection />
    </main>
  );
}