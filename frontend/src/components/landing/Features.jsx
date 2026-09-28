import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Target, Zap, Shield, BarChart3, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced machine learning algorithms analyze your resume against thousands of successful applications and industry benchmarks.'
  },
  {
    icon: Target,
    title: 'ATS Score Optimization',
    description: 'Get a detailed ATS compatibility score with specific recommendations to pass automated screening systems.'
  },
  {
    icon: Zap,
    title: 'Instant Feedback',
    description: 'Receive comprehensive analysis results in under 30 seconds. No waiting, no queues, just actionable insights.'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your resume data is encrypted end-to-end and automatically deleted after analysis. We never share your information.'
  },
  {
    icon: BarChart3,
    title: 'Detailed Metrics',
    description: 'Visual breakdowns of keyword density, formatting quality, section completeness, and experience relevance.'
  },
  {
    icon: Sparkles,
    title: 'Smart Suggestions',
    description: 'AI-generated rewrite suggestions for weak bullet points, missing keywords, and formatting improvements.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  },
};

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-32 px-6 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-32 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-display font-bold mb-8"
          >
            <span className="text-text-secondary">Everything you need to </span>
            <span className="gradient-text-warm">land your dream job</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-text-secondary max-w-xl mx-auto text-lg"
          >
            Our AI analyzes every aspect of your resume against industry standards and ATS requirements.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 relative z-10 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:border-glass-border-hover hover:shadow-[0_0_30px_rgba(var(--color-accent),0.1)]"
            >
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-light/10 shadow-[0_0_15px_var(--color-accent-glow,rgba(255,255,255,0.1))] transition-all duration-300 group-hover:animate-pulse">
                <feature.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-text-primary">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {feature.description}
              </p>
              
              {/* Subtle shimmer line at bottom of card */}
              <div className="absolute bottom-0 left-0 h-[2px] w-full shimmer-line opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
