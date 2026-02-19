import { motion } from "framer-motion";
import { Video, Users, FileCheck, MessageCircle, Clock, Award } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Video,
      title: "Live Interactive Classes",
      description: "Learn directly from industry experts with real-time doubt solving and interactive sessions."
    },
    {
      icon: Users,
      title: "1-on-1 Mentorship",
      description: "Get personalized guidance and code reviews from experienced developers throughout your journey."
    },
    {
      icon: FileCheck,
      title: "10+ Real Projects",
      description: "Build production-ready applications that you can showcase in your portfolio to employers."
    },
    {
      icon: MessageCircle,
      title: "Community Access",
      description: "Join our private Discord community for networking, peer learning, and career opportunities."
    },
    {
      icon: Clock,
      title: "Lifetime Access",
      description: "Get lifetime access to all course materials, updates, and future content additions."
    },
    {
      icon: Award,
      title: "Industry Certificate",
      description: "Receive a recognized certificate upon completion to validate your skills to employers."
    }
  ];

  return (
    <section id="features" className="py-24 px-4 relative bg-gradient-to-b from-background to-secondary/10">
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
            Why Students <span className="gradient-text">Love Us</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to succeed in your coding journey, all in one place.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
              className="group relative"
            >
              <div className="glass-card rounded-2xl p-6 h-full hover:border-primary/40 transition-all duration-300">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                     style={{ boxShadow: '0 0 40px hsl(var(--primary) / 0.1)' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
