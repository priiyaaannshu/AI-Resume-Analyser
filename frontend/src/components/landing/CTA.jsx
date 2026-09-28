import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Play } from 'lucide-react';

const CTA = () => {
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[600px] bg-accent/20 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto relative group"
        >
          {/* Gradient Border effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-accent via-accent-light to-emerald rounded-3xl opacity-30 group-hover:opacity-50 transition duration-1000 blur-sm"></div>
          
          <div className="glass-card relative rounded-3xl p-14 md:p-20 text-center bg-glass hover:bg-glass-hover transition-colors duration-500 border border-glass-border">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-glass border border-glass-border mb-10"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-text-secondary">Start for free</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-display text-4xl md:text-5xl font-bold mb-8 tracking-tight text-text-primary"
            >
              Ready to perfect <br className="hidden md:block" />
              <span className="gradient-text-warm">your resume?</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-text-secondary text-lg max-w-lg mx-auto mb-14 leading-relaxed"
            >
              Join 50,000+ professionals who landed their dream jobs with AI-powered resume optimization.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/register" className="btn-glow flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl text-white font-medium bg-accent hover:bg-accent-light transition-all">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="btn-ghost flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl text-text-primary font-medium hover:bg-glass border border-transparent hover:border-glass-border transition-all">
                <Play className="w-5 h-5 text-accent" />
                View Demo
              </button>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
