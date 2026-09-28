import { motion } from 'framer-motion'
import { Lock, Gauge, Globe, Layers, HeartHandshake, Rocket } from 'lucide-react'

const reasons = [
  {
    icon: Lock,
    title: 'Enterprise-Grade Security',
    description: 'Bank-level AES-256 encryption protects your data. Auto-delete after analysis ensures zero retention.',
    color: 'from-indigo-500 to-violet-500',
  },
  {
    icon: Gauge,
    title: 'Unmatched Accuracy',
    description: '95%+ accuracy validated against the top 50 ATS systems used by Fortune 500 companies worldwide.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Globe,
    title: 'Industry Agnostic',
    description: 'Whether you\'re in tech, finance, healthcare, or design — our AI adapts to your industry\'s standards.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Layers,
    title: 'Comprehensive Analysis',
    description: 'Not just keywords — we analyze structure, impact language, quantification, and visual hierarchy.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: HeartHandshake,
    title: 'Human-Centric AI',
    description: 'Our AI doesn\'t just score — it explains why, provides context, and gives you rewrite suggestions.',
    color: 'from-rose-500 to-pink-500',
  },
  {
    icon: Rocket,
    title: 'Continuous Learning',
    description: 'Our models are updated weekly with the latest hiring trends, ATS changes, and industry benchmarks.',
    color: 'from-purple-500 to-fuchsia-500',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
}

const WhyChooseUs = () => {
  return (
    <section className="relative py-24 md:py-32 px-6" id="why-choose-us">
      <div className="grid-pattern" />
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-glass-border)] bg-[var(--color-glass)] text-sm text-[var(--color-text-secondary)] mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <span className="w-2 h-2 rounded-full bg-[var(--color-emerald)] animate-pulse" />
            Trusted by industry leaders
          </motion.div>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            <span className="text-[var(--color-text-secondary)]">Why professionals </span>
            <span className="gradient-text-warm">choose Resumix</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto text-lg leading-relaxed">
            Built with precision and care, every detail is designed to give you an unfair advantage in your job search.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group glass-card p-10 md:p-12 cursor-default"
              >
                {/* Icon */}
                <div className="relative mb-8">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <div className={`absolute inset-0 w-12 h-12 rounded-xl bg-gradient-to-br ${reason.color} opacity-0 blur-xl group-hover:opacity-30 transition-opacity duration-500`} />
                </div>

                {/* Content */}
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-text-primary)] mb-4 tracking-tight">
                  {reason.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {reason.description}
                </p>

                {/* Bottom accent line */}
                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-glass-border)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUs
