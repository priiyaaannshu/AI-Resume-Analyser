import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 50000, suffix: 'K+', label: 'Resumes Analyzed', isK: true },
  { value: 92, suffix: '%', label: 'Average Score Improvement' },
  { value: 30, suffix: 's', label: 'Average Analysis Time' },
  { value: 4.9, suffix: '/5', label: 'User Rating', isFloat: true }
];

function Counter({ from, to, suffix, isK, isFloat }) {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime;
    const duration = 2000;
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = from + (to - from) * easeOut;
      
      if (nodeRef.current) {
        if (isK) {
          nodeRef.current.textContent = Math.floor(currentVal / 1000) + suffix;
        } else if (isFloat) {
          nodeRef.current.textContent = currentVal.toFixed(1) + suffix;
        } else {
          nodeRef.current.textContent = Math.floor(currentVal) + suffix;
        }
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [from, to, suffix, isK, isFloat, isInView]);
  
  return <span ref={nodeRef}>{isK ? Math.floor(from / 1000) : from}{suffix}</span>;
}

export default function Stats() {
  return (
    <section className="py-20 md:py-28 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-12 md:p-20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-glass-border/30 to-transparent pointer-events-none" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 relative z-10">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-center justify-center text-center ${
                  index !== stats.length - 1 ? 'md:border-r border-glass-border/50' : ''
                }`}
              >
                <div className="font-display font-bold text-3xl md:text-4xl gradient-text mb-2">
                  <Counter 
                    from={0} 
                    to={stat.value} 
                    suffix={stat.suffix} 
                    isK={stat.isK}
                    isFloat={stat.isFloat}
                  />
                </div>
                <div className="text-sm text-text-secondary">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
