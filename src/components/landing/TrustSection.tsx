import { motion } from "framer-motion";
import { Target, Rocket, Users, Trophy } from "lucide-react";

const TrustSection = () => {
  const features = [
    {
      icon: Target,
      title: "Industry-Focused",
      description: "Curriculum designed by industry experts to match real job requirements"
    },
    {
      icon: Rocket,
      title: "Project-Based Learning",
      description: "Build 10+ real-world projects that become your portfolio"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join 500+ learners and grow together with peer programming"
    },
    {
      icon: Trophy,
      title: "Job-Ready Skills",
      description: "Graduate with skills that employers are actively looking for"
    }
  ];

  return (
    <section className="py-12 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            Why <span className="gradient-text">GoForCode</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            We don't just teach coding – we transform beginners into confident, 
            job-ready developers through our proven methodology.
          </p>
        </motion.div>

        {/* About Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card rounded-2xl p-8 md:p-12 mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10" 
               style={{ background: 'hsl(var(--primary))' }} />
          
          <div className="relative z-10 max-w-3xl">
            <h3 className="text-2xl font-display font-semibold mb-4">
              From Beginners to Builders
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              GoForCode was founded with a mission to democratize coding education. 
              Whether you're a 12th pass student, a graduate looking for career switch, 
              or someone passionate about technology – we've designed our curriculum 
              to take you from zero to hero.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our unique approach combines live mentorship, hands-on projects, and 
              continuous support to ensure you not only learn to code but also 
              develop the problem-solving mindset that top companies seek.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glass-card rounded-xl p-6 hover:border-primary/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mb-4 group-hover:glow-primary transition-shadow">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h4 className="text-lg font-display font-semibold mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
