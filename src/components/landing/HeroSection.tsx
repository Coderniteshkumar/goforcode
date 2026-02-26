import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import {  Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

// interface HeroSectionProps {
//   onShowInterest: () => void;
// }

// --- Helper Component for Counting Animation ---
const StatCounter = ({ value }: { value: string }) => {
  const count = useMotionValue(0);
  // Extract number from string (e.g., "500+" becomes 500)
  const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const suffix = value.replace(/[0-9]/g, ""); // Extract "+" or "%" or "/"

  useEffect(() => {
    const controls = animate(count, numericValue, {
      duration: 2, // 2 seconds animation
      delay: 0.8,  // Hero section ke load hone ke thodi der baad start hoga
      ease: "easeOut",
    });
    return controls.stop;
  }, [numericValue, count]);

  return (
    <motion.span>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Glowing Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: 'hsl(var(--primary))' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{ background: 'hsl(var(--accent))' }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Transform Your Future with Code.</span>
          <span className="text-1xl text-muted-foreground text-white font-bold">Pay After Placement</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6"
        >
          Launch Your
          <span className="block gradient-text">Coding Career</span>
          <span className="block">Today</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance"
        >
          Master React & Shadcn UI with hands-on projects, expert mentorship,
          and job-ready skills. From beginner to professional developer.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* <Button 
            onClick={onShowInterest}
            className="rounded-full px-6 bg-[#4489F6] hover:bg-[#3574d3] text-white"
          >
            <ArrowRight className="mr-2 h-4 w-4" /> Apply Now
          </Button> */}

          <a href="/base.apk" download="Gfc.apk" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="rounded-full px-6 border-border">
              <Download className="mr-2 h-4 w-4" /> Download App
            </Button>
          </a>

          <a href="Gfc Fee Structure.pdf" download="Goforcode Fee Structure.pdf" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="rounded-full px-6 border-border">
              <Download className="mr-2 h-4 w-4" /> Download Fee Structure
            </Button>
          </a>

          <a href="GFC mastery program.pdf" download="Goforcode mastery program.pdf" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="rounded-full px-6 border-border">
              <Download className="mr-2 h-4 w-4" /> Download Course Program
            </Button>
          </a>
        </motion.div>

        {/* Stats with Counter Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "500+", label: "Students Trained" },
            { value: "95%", label: "Placement Rate" },
            { value: "10+", label: "Live Projects" },
            { value: "24h", label: "Support" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl font-display font-bold gradient-text">
                <StatCounter value={stat.value} />
              </div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
