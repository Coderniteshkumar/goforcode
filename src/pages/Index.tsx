import { useRef } from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import TrustSection from "@/components/landing/TrustSection";
import CurriculumSection from "@/components/landing/CurriculumSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CourseDetailsSection from "@/components/landing/CourseDetailsSection";
// import { DemoVideo } from "@/components/landing/DemoVideo";
import InterestForm from "@/components/landing/InterestForm";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import { CourseCurriculum } from "@/components/landing/CourseCurriculum";

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      <main>
        <HeroSection onShowInterest={scrollToForm} />
        <TrustSection />
        <CurriculumSection />
        <FeaturesSection />
        <CourseDetailsSection />
        <CourseCurriculum />
        <InterestForm ref={formRef} />
        <CTASection onShowInterest={scrollToForm} />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
