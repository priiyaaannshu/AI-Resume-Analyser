import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', path: '#features' },
    { name: 'How It Works', path: '#how-it-works' },
    { name: 'Testimonials', path: '#testimonials' },
    { name: 'FAQ', path: '#faq' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-glass backdrop-blur-md border-b border-glass-border shadow-lg shadow-black/10 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-violet-500/20 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white relative z-10">
              <path d="M7 21V3H13.5C14.8261 3 16.0979 3.52678 17.0355 4.46447C17.9732 5.40215 18.5 6.67392 18.5 8C18.5 9.32608 17.9732 10.5979 17.0355 11.5355C16.0979 12.4732 14.8261 13 13.5 13H7M13.5 13L18.5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-display font-semibold tracking-tight text-lg text-text-primary">Resumix</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.path}
                className="text-text-secondary hover:text-text-primary text-sm font-medium relative group transition-colors"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="btn-ghost px-4 py-2 rounded-lg text-sm font-medium transition-all text-text-primary hover:text-white">
              Sign In
            </Link>
            <Link to="/register" className="btn-glow px-5 py-2 rounded-lg text-sm font-medium bg-accent text-white shadow-[0_0_15px_rgba(var(--accent-glow),0.5)] hover:shadow-[0_0_25px_rgba(var(--accent-glow),0.8)] transition-all">
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-text-primary p-2 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-glass-border bg-glass backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-text-secondary hover:text-text-primary text-base font-medium py-2"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px w-full bg-glass-border my-2" />
              <Link to="/login" className="w-full text-center text-text-primary py-3 rounded-lg border border-glass-border font-medium">
                Sign In
              </Link>
              <Link to="/register" className="w-full text-center bg-accent text-white py-3 rounded-lg font-medium shadow-[0_0_15px_rgba(var(--accent-glow),0.5)]">
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
