import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How does the AI analysis work?",
    answer: "Our advanced AI engine uses natural language processing and machine learning models trained on thousands of successful resumes. It evaluates your resume against ATS algorithms, industry benchmarks, and hiring patterns to provide actionable feedback."
  },
  {
    question: "Is my resume data secure?",
    answer: "Absolutely. All uploads are encrypted with AES-256 encryption. Your resume data is processed in isolated environments and automatically deleted within 24 hours. We never share or sell your information."
  },
  {
    question: "What file formats are supported?",
    answer: "We currently support PDF, DOCX, and plain text formats. For best results, we recommend uploading your resume as a PDF to preserve formatting."
  },
  {
    question: "How accurate is the ATS score?",
    answer: "Our ATS scoring algorithm has been validated against the top 50 ATS systems used by Fortune 500 companies. It achieves 95%+ accuracy in predicting whether a resume will pass automated screening."
  },
  {
    question: "Is Resumix free to use?",
    answer: "Yes! You can analyze your resume for free with no credit card required. We offer premium plans for advanced features like unlimited analyses, industry-specific optimization, and priority support."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-28">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-5xl font-bold gradient-text-warm mb-8"
          >
            Frequently asked questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-text-secondary text-lg max-w-2xl mx-auto"
          >
            Everything you need to know
          </motion.p>
        </div>

        <div className="max-w-2xl mx-auto space-y-5">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden border border-glass-border hover:border-glass-border-hover transition-colors"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-7 text-left focus:outline-none"
              >
                <span className="font-medium text-text-primary pr-8">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="flex-shrink-0 text-text-secondary"
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>
              
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto", marginBottom: 24 },
                      collapsed: { opacity: 0, height: 0, marginBottom: 0 }
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="px-6 text-sm text-text-secondary leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
