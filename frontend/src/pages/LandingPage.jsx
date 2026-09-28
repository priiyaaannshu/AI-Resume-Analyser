import { motion } from 'framer-motion'
import AuroraBackground from '../components/landing/AuroraBackground'
import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import Stats from '../components/landing/Stats'
import Features from '../components/landing/Features'
import HowItWorks from '../components/landing/HowItWorks'
import WhyChooseUs from '../components/landing/WhyChooseUs'
import Testimonials from '../components/landing/Testimonials'
import FAQ from '../components/landing/FAQ'
import CTA from '../components/landing/CTA'
import Footer from '../components/landing/Footer'

/* Generous spacer — balanced breathing room between sections */
const Spacer = () => (
  <div className="py-20 md:py-28 lg:py-32 relative">
    <div className="section-divider" />
  </div>
)

const LandingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Global Background Effects */}
      <AuroraBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        
        <Spacer />
        <Stats />
        
        <Spacer />
        <Features />
        
        <Spacer />
        <HowItWorks />
        
        <Spacer />
        <WhyChooseUs />
        
        <Spacer />
        <Testimonials />
        
        <Spacer />
        <FAQ />
        
        <Spacer />
        <CTA />
      </main>

      {/* Footer */}
      <Footer />
    </motion.div>
  )
}

export default LandingPage
