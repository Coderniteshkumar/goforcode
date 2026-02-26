import { motion } from "framer-motion";
import { CheckCircle2, Code, Layout, Database, Zap, FileCode } from "lucide-react";

const CurriculumSection = () => {
  const modules = [
    {
      phase: "Phase 1",
      title: "Foundation",
      duration: "Week 1-2",
      icon: Code,
      topics: ["HTML5 & CSS3 Fundamentals", "JavaScript ES6+ Basics", "Git & Version Control", "Responsive Design"],
      color: "from-primary to-primary/70"
    },
    {
      phase: "Phase 2",
      title: "React Mastery",
      duration: "Week 3-6",
      icon: Layout,
      topics: ["React Core Concepts", "State Management", "Hooks & Custom Hooks", "Component Architecture"],
      color: "from-accent to-accent/70"
    },
    {
      phase: "Phase 3",
      title: "UI Development",
      duration: "Week 7-8",
      icon: FileCode,
      topics: ["Shadcn UI Components", "Tailwind CSS Advanced", "Animations & Transitions", "Design Systems"],
      color: "from-primary to-accent"
    },
    {
      phase: "Phase 4",
      title: "Real Projects",
      duration: "Week 9-12",
      icon: Database,
      topics: ["Full-Stack Integration", "API Development", "Deployment & DevOps", "Portfolio Projects"],
      color: "from-accent to-primary"
    }
  ];

  return (
    <section id="curriculum" className="py-12 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium gradient-bg text-primary-foreground mb-4">
            Structured Learning Path
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            Course <span className="gradient-text">Curriculum</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A carefully crafted 12-week journey from fundamentals to job-ready skills. 
            Perfect for beginners with zero coding experience.
          </p>
        </motion.div>

        {/* Tech Stack Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {["React", "Shadcn UI", "Node Js", "TypeScript", "Git"].map((tech, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-lg glass-card text-sm font-medium border-primary/20"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Curriculum Timeline */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {modules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glass-card rounded-2xl p-6 lg:p-8 hover:border-primary/30 transition-all group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${module.color} text-primary-foreground`}>
                    {module.phase}
                  </span>
                  <h3 className="text-xl font-display font-semibold mt-3">{module.title}</h3>
                  <p className="text-sm text-muted-foreground">{module.duration}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <module.icon className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>

              {/* Topics */}
              <ul className="space-y-3">
                {module.topics.map((topic, topicIndex) => (
                  <li key={topicIndex} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    {topic}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground">
              <strong className="text-foreground">Beginner-friendly:</strong> No prior coding experience required
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CurriculumSection;
