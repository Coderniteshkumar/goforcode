import { useRef } from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import TrustSection from "@/components/landing/TrustSection";
import PlacementScroll from "@/components/landing/PlacementScroll";
import CurriculumSection from "@/components/landing/CurriculumSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CourseDetailsSection from "@/components/landing/CourseDetailsSection";
import InterestForm from "@/components/landing/InterestForm";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import { CourseCurriculum } from "@/components/landing/CourseCurriculum";
// WhatsApp Button Import karein
import WhatsAppButton from "@/components/landing/WhatsAppButton"; 


const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      <main>
        <HeroSection />
        <TrustSection />
        <CurriculumSection />
        <FeaturesSection />
                <PlacementScroll />

        <CourseDetailsSection />
        <CourseCurriculum />
        <div ref={formRef}>
          <InterestForm />
        </div>
        <CTASection onShowInterest={scrollToForm} />
      </main>

      <Footer />

      {/* WhatsApp Floating Button yahan add kiya gaya hai */}
      <WhatsAppButton />
    </div>
  );
};

export default Index;



