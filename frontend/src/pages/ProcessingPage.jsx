import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ProcessingPage.css'

/* ── Processing Steps ── */
const STEPS = [
  { label: 'Uploading Resume...', duration: 2200 },
  { label: 'Extracting Text...', duration: 2800 },
  { label: 'Analyzing ATS...', duration: 3200 },
  { label: 'Matching Keywords...', duration: 2600 },
  { label: 'Generating Suggestions...', duration: 3000 },
  { label: 'Preparing Final Report...', duration: 2400 },
]

/* ── Particle System (Canvas) ── */
function ParticleCanvas() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const particlesRef = useRef([])

  const initParticles = useCallback((w, h) => {
    const particles = []
    const count = Math.min(80, Math.floor((w * h) / 12000))
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        hue: Math.random() > 0.6 ? 240 : Math.random() > 0.3 ? 270 : 190,
      })
    }
    return particles
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particlesRef.current = initParticles(canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const centerX = () => canvas.width / 2
    const centerY = () => canvas.height * 0.42

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const cx = centerX()
      const cy = centerY()
      const particles = particlesRef.current

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Gentle attraction toward center orb
        const dx = cx - p.x
        const dy = cy - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const force = Math.min(0.015, 80 / (dist * dist + 1))
        p.vx += dx * force * 0.01
        p.vy += dy * force * 0.01

        // Damping
        p.vx *= 0.995
        p.vy *= 0.995

        p.x += p.vx
        p.y += p.vy

        // Wrap around
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Draw particle
        const alpha = p.opacity * Math.max(0.2, 1 - dist / 500)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${alpha})`
        ctx.fill()

        // Draw connections to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const ddx = p.x - p2.x
          const ddy = p.y - p2.y
          const d = ddx * ddx + ddy * ddy
          if (d < 8000) {
            const lineAlpha = (1 - d / 8000) * 0.08
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `hsla(240, 70%, 70%, ${lineAlpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [initParticles])

  return <canvas ref={canvasRef} className="processing-canvas" />
}

/* ── Animated AI Orb ── */
function AIOrb() {
  return (
    <div className="orb-container">
      {/* Scan lines */}
      <div className="orb-scan-line" />
      <div className="orb-scan-line" />

      {/* Rotating rings with orbital dots */}
      <div className="orb-ring orb-ring-3">
        <span className="orb-ring-dot" />
      </div>
      <div className="orb-ring orb-ring-2">
        <span className="orb-ring-dot" />
      </div>
      <div className="orb-ring orb-ring-1">
        <span className="orb-ring-dot" />
      </div>

      {/* Core */}
      <motion.div
        className="orb-core"
        animate={{
          background: [
            'radial-gradient(circle at 35% 35%, rgba(165,180,252,0.6) 0%, rgba(99,102,241,0.4) 30%, rgba(139,92,246,0.3) 60%, rgba(6,182,212,0.1) 100%)',
            'radial-gradient(circle at 60% 40%, rgba(139,92,246,0.6) 0%, rgba(99,102,241,0.4) 30%, rgba(6,182,212,0.3) 60%, rgba(165,180,252,0.1) 100%)',
            'radial-gradient(circle at 40% 60%, rgba(6,182,212,0.5) 0%, rgba(139,92,246,0.4) 30%, rgba(99,102,241,0.3) 60%, rgba(165,180,252,0.1) 100%)',
            'radial-gradient(circle at 35% 35%, rgba(165,180,252,0.6) 0%, rgba(99,102,241,0.4) 30%, rgba(139,92,246,0.3) 60%, rgba(6,182,212,0.1) 100%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="orb-inner-glow" />
    </div>
  )
}

/* ── Main Processing Page ── */
export default function ProcessingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const stepTimerRef = useRef(null)
  const progressTimerRef = useRef(null)

  useEffect(() => {
    let stepIndex = 0
    let overallProgress = 0
    const totalSteps = STEPS.length
    const progressPerStep = 100 / totalSteps

    const advanceStep = () => {
      if (stepIndex >= totalSteps) {
        clearInterval(progressTimerRef.current)
        return
      }

      setCurrentStep(stepIndex)
      const targetProgress = Math.min((stepIndex + 1) * progressPerStep, 100)

      // Animate progress smoothly within this step
      const duration = STEPS[stepIndex].duration
      const startProgress = overallProgress
      const increment = (targetProgress - startProgress) / (duration / 50)

      if (progressTimerRef.current) clearInterval(progressTimerRef.current)
      progressTimerRef.current = setInterval(() => {
        overallProgress += increment
        if (overallProgress >= targetProgress) {
          overallProgress = targetProgress
          clearInterval(progressTimerRef.current)
        }
        setProgress(Math.round(overallProgress))
      }, 50)

      stepIndex++
      if (stepIndex < totalSteps) {
        stepTimerRef.current = setTimeout(advanceStep, duration)
      } else {
        // Final step — fill to 100%
        stepTimerRef.current = setTimeout(() => {
          setProgress(100)
        }, duration)
      }
    }

    advanceStep()

    return () => {
      if (stepTimerRef.current) clearTimeout(stepTimerRef.current)
      if (progressTimerRef.current) clearInterval(progressTimerRef.current)
    }
  }, [])

  return (
    <div className="processing-page">
      {/* Ambient Background */}
      <div className="processing-ambient">
        <div className="processing-ambient-blob processing-ambient-blob-1" />
        <div className="processing-ambient-blob processing-ambient-blob-2" />
        <div className="processing-ambient-blob processing-ambient-blob-3" />
      </div>

      {/* Particle Field */}
      <ParticleCanvas />

      {/* Noise */}
      <div className="noise-overlay" />

      {/* Center Content */}
      <motion.div
        className="processing-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* AI Orb */}
        <AIOrb />

        {/* Status */}
        <div className="processing-status">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              className="processing-status-text"
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {STEPS[currentStep]?.label}
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="processing-status-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Our AI is analyzing your resume for maximum impact
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="processing-progress-wrapper"
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="processing-progress-track">
              <div
                className="processing-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="processing-progress-label">
              <span className="processing-progress-step">
                Step {currentStep + 1} of {STEPS.length}
              </span>
              <span className="processing-progress-percent">{progress}%</span>
            </div>
          </motion.div>

          {/* Step Dots */}
          <motion.div
            className="processing-steps"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {STEPS.map((_, i) => (
              <motion.div
                key={i}
                className={`processing-step-dot ${
                  i < currentStep ? 'completed' : i === currentStep ? 'active' : ''
                }`}
                animate={
                  i === currentStep
                    ? { scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }
                    : {}
                }
                transition={
                  i === currentStep
                    ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
                    : {}
                }
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
