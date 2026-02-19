import { motion } from "framer-motion";
import { Calendar, Monitor, Award, Headphones, IndianRupee, Clock } from "lucide-react";

const CourseDetailsSection = () => {
  const details = [
    {
      icon: Calendar,
      label: "Duration",
      value: "12 Weeks",
      subtext: "Comprehensive program"
    },
    {
      icon: Monitor,
      label: "Mode",
      value: "100% Online",
      subtext: "Learn from anywhere"
    },
    {
      icon: Clock,
      label: "Weekly Hours",
      value: "15-20 Hours",
      subtext: "Flexible schedule"
    },
    {
      icon: Award,
      label: "Certificate",
      value: "Industry Recognized",
      subtext: "Upon completion"
    },
    {
      icon: Headphones,
      label: "Support",
      value: "24/7 Assistance",
      subtext: "Always available"
    },
    {
      icon: IndianRupee,
      label: "Investment",
      value: "Affordable",
      subtext: "EMI options available"
    }
  ];

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            Course <span className="gradient-text">Details</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about the program at a glance.
          </p>
        </motion.div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {details.map((detail, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              className="glass-card rounded-2xl p-6 text-center hover:border-primary/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <detail.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">{detail.label}</p>
              <p className="text-xl font-display font-semibold mb-1">{detail.value}</p>
              <p className="text-xs text-muted-foreground">{detail.subtext}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 glass-card rounded-2xl p-8 md:p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 gradient-bg" />
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-display font-semibold mb-4">
                What You'll Get
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Access to 100+ hours of video content
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Downloadable resources & cheat sheets
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Weekly live Q&A sessions
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Resume & LinkedIn profile review
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Interview preparation guidance
                </li>
              </ul>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground mb-2">Next Batch Starting</p>
              <p className="text-3xl font-display font-bold gradient-text mb-4">Feb 15, 2026</p>
              <p className="text-sm text-muted-foreground">Limited seats available</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CourseDetailsSection;
