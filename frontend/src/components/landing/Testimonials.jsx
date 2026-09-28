import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "This tool completely transformed my resume. I went from zero callbacks to landing 5 interviews in two weeks. The AI suggestions were incredibly specific and actionable.",
    name: "Sarah Chen",
    role: "Software Engineer at Google",
    initials: "SC"
  },
  {
    quote: "As a hiring manager, I recommend Resumix to every candidate. The ATS scoring is remarkably accurate and the feedback is more detailed than what most career coaches provide.",
    name: "Marcus Johnson",
    role: "VP of Engineering",
    initials: "MJ"
  },
  {
    quote: "I was skeptical about AI resume tools, but Resumix genuinely surprised me. It caught formatting issues and missing keywords I would have never noticed. Got my dream job within a month.",
    name: "Priya Sharma",
    role: "Product Designer at Meta",
    initials: "PS"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-void -z-20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-void to-void -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-5xl font-bold gradient-text-warm mb-8"
          >
            Loved by job seekers
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-text-secondary text-lg max-w-2xl mx-auto"
          >
            Join thousands who landed their dream jobs
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div 
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="glass-card p-10 rounded-2xl flex flex-col h-full relative group"
            >
              <div className="absolute top-8 right-8 text-accent/20 group-hover:text-accent/40 transition-colors duration-500">
                <Quote size={40} className="transform rotate-180" />
              </div>
              
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-500 text-amber-500" />
                ))}
              </div>
              
              <div className="flex-grow mb-10 relative">
                <p className="text-sm text-text-secondary leading-relaxed relative z-10">
                  <span className="text-accent text-lg leading-none font-serif mr-1">"</span>
                  {testimonial.quote}
                  <span className="text-accent text-lg leading-none font-serif ml-1">"</span>
                </p>
              </div>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-emerald flex items-center justify-center text-void font-bold text-sm shrink-0">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-medium text-text-primary text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-text-tertiary">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
