import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Play, CheckCircle2 } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;
      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        // Easing function for smooth deceleration
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setScore(Math.floor(easeOutQuart * 92));
        
        if (currentStep >= steps) {
          clearInterval(timer);
          setScore(92);
        }
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  const titleLines = [
    { text: "Your Resume,", className: "text-text-primary" },
    { text: "Perfected by AI", className: "gradient-text-warm" }
  ];

  return (
    <section className="relative pt-44 pb-48 px-6 min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-void -z-20"></div>
      <div className="absolute inset-0 aurora-bg opacity-30 -z-10"></div>
      <div className="absolute inset-0 noise-overlay opacity-20 pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto w-full text-center flex flex-col items-center z-10">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-10">
            <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glass-border bg-glass backdrop-blur-sm overflow-hidden group">
              <span className="absolute inset-0 shimmer-line opacity-50 group-hover:opacity-100 transition-opacity"></span>
              <Sparkles className="w-4 h-4 text-accent-light" />
              <span className="text-sm font-medium text-text-secondary">Powered by Advanced AI</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1 variants={itemVariants} className="font-display font-bold tracking-tight text-6xl md:text-7xl lg:text-8xl flex flex-col gap-5 mb-10">
            {titleLines.map((line, lineIndex) => (
              <span key={lineIndex} className={`block ${line.className}`}>
                {line.text.split(" ").map((word, wordIndex) => (
                  <motion.span
                    key={wordIndex}
                    className="inline-block mr-[0.25em]"
                    variants={{
                      hidden: { opacity: 0, y: 40, rotateX: -20 },
                      visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: 'spring', stiffness: 150, damping: 15 } }
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-16 leading-relaxed">
            Get instant ATS scoring, intelligent feedback, and actionable insights to transform your resume into an interview magnet.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-5 mb-12">
            <Link to="/dashboard" className="btn-glow flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent text-white font-semibold text-lg w-full sm:w-auto shadow-[0_0_20px_rgba(var(--accent-glow),0.4)] hover:shadow-[0_0_30px_rgba(var(--accent-glow),0.7)] transition-all group">
              Analyze Your Resume
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#how-it-works" className="btn-ghost flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-glass-border bg-glass/50 hover:bg-glass hover:border-glass-border-hover text-text-primary font-medium text-lg w-full sm:w-auto transition-all">
              <Play className="w-5 h-5" />
              See How It Works
            </a>
          </motion.div>

          {/* Trust Line */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-text-tertiary mb-32">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald" /> No credit card required</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald" /> Free analysis</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald" /> Results in 30 seconds</span>
          </motion.div>

        </motion.div>

        {/* Floating Preview Card */}
        <motion.div 
          ref={containerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="w-full max-w-3xl mx-auto"
        >
          <motion.div 
            animate={{ y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="glass-card rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-10 border border-glass-border shadow-[0_0_40px_rgba(var(--accent-glow),0.15)] relative overflow-hidden"
          >
            {/* Ambient glow inside card */}
            <div className="absolute top-0 left-1/4 w-1/2 h-32 bg-indigo-500/20 blur-[100px] pointer-events-none rounded-full -translate-y-1/2"></div>
            
            {/* Left side: Circular Progress */}
            <div className="relative w-48 h-48 flex-shrink-0 flex items-center justify-center shrink-0 mx-auto md:mx-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="40" 
                  fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" 
                />
                <motion.circle 
                  cx="50" cy="50" r="40" 
                  fill="none" 
                  stroke="url(#gradient)" 
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "251.2", strokeDashoffset: "251.2" }}
                  animate={isInView ? { strokeDashoffset: 251.2 - (251.2 * score) / 100 } : {}}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-display font-bold text-text-primary">{score}</span>
                <span className="text-xs text-text-tertiary font-medium uppercase tracking-wider">ATS Score</span>
              </div>
            </div>

            {/* Right side: Mock Analysis Details */}
            <div className="flex-1 w-full flex flex-col gap-6 text-left">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald shadow-[0_0_10px_rgba(var(--emerald-glow),0.8)]"></div>
                <h3 className="text-xl font-semibold text-text-primary">ATS Score: Excellent</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {['Strong Keywords', 'Clean Format', 'Quantified Impact'].map((chip, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm text-text-secondary">
                    {chip}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-3 mt-2">
                {[
                  { label: "Keyword Match", val: 95, color: "bg-indigo-500" },
                  { label: "Formatting", val: 90, color: "bg-violet-500" },
                  { label: "Experience", val: 85, color: "bg-fuchsia-500" }
                ].map((bar, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-xs text-text-secondary w-24">{bar.label}</span>
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${bar.val}%` } : {}}
                        transition={{ duration: 1.5, delay: 0.5 + (i * 0.2), ease: "easeOut" }}
                        className={`h-full rounded-full ${bar.color}`}
                      />
                    </div>
                    <span className="text-xs text-text-tertiary w-8 text-right">{bar.val}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default Hero;
