import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Cpu, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Upload Resume',
    description: 'Drop your PDF or paste your resume text. We support all standard resume formats.',
  },
  {
    icon: Cpu,
    title: 'AI Analysis',
    description: 'Our AI engine scans your resume against ATS algorithms and industry-specific benchmarks.',
  },
  {
    icon: CheckCircle,
    title: 'Get Results',
    description: 'Receive your ATS score, detailed feedback, strengths, weaknesses, and AI-powered suggestions.',
  }
];

export default function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="how-it-works" className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-36">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-5xl font-bold gradient-text-warm mb-6"
          >
            How it works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-text-secondary max-w-lg mx-auto text-lg"
          >
            Three simple steps to a perfect resume
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Connecting Line - Desktop Only */}
          <div className="hidden md:block absolute top-6 left-[16%] right-[16%] h-[2px] bg-glass-border overflow-hidden rounded-full">
            <motion.div 
              className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-accent-soft to-transparent opacity-50"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-12 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div key={index} variants={itemVariants} className="flex flex-col items-center text-center px-4">
                  <div className="relative mb-8">
                    <div className="w-12 h-12 rounded-full bg-glass border border-glass-border flex items-center justify-center font-display text-xl font-bold text-text-primary shadow-[0_0_15px_rgba(var(--color-accent-glow),0.15)] z-10 relative">
                      {index + 1}
                    </div>
                    <div className="mt-5 flex justify-center text-accent-light">
                      <Icon size={28} />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-text-primary">{step.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
