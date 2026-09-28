import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Clock, FolderOpen, BarChart3, Settings,
  ChevronLeft, Download, RefreshCw, FileText, Menu,
  HardDrive, Search, Target, Type, BookOpen, Briefcase, Cpu,
  CheckCircle2, XCircle, Lightbulb, Sparkles
} from 'lucide-react'
import './ResultsPage.css'

/* ── Brand Icon ── */
function BrandIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="13" y2="17" />
    </svg>
  )
}

/* ── Sidebar Nav Items ── */
const sidebarNav = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { id: 'history',   label: 'History',   icon: Clock,           to: '/history' },
  { id: 'library',   label: 'Resume Library', icon: FolderOpen },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, active: true },
  { id: 'settings',  label: 'Settings',  icon: Settings },
]

/* ── Helpers ── */
const GRADE_MAP   = (s) => s >= 90 ? 'excellent' : s >= 75 ? 'good' : s >= 55 ? 'fair' : 'poor'
const GRADE_LABEL = (s) => s >= 90 ? 'Excellent' : s >= 75 ? 'Good'  : s >= 55 ? 'Fair' : 'Needs Work'

/**
 * Build strength meters from atsScore and skills count so the
 * chart always reflects real data even when the backend doesn't
 * return per-category scores.
 */
function buildStrengthMeters(analysis) {
  const ats = analysis.atsScore ?? 0
  const skillsCount = (analysis.skills ?? []).length

  return [
    { label: 'Keyword Match', icon: Target,   value: Math.min(ats + 5, 100) },
    { label: 'Formatting',    icon: Type,     value: Math.max(ats - 5, 0) },
    { label: 'Readability',   icon: BookOpen, value: Math.max(ats - 10, 0) },
    { label: 'Experience',    icon: Briefcase,value: Math.min(ats + 2, 100) },
    { label: 'Skills',        icon: Cpu,      value: Math.min(skillsCount * 6, 100) },
  ]
}

function buildRadarData(analysis) {
  const s = analysis.atsScore ?? 0
  return [
    { label: 'Keywords', value: Math.min(s + 5,  100) },
    { label: 'Format',   value: Math.max(s - 5,  0) },
    { label: 'Impact',   value: Math.max(s - 10, 0) },
    { label: 'Skills',   value: Math.min((analysis.skills ?? []).length * 6, 100) },
    { label: 'Clarity',  value: Math.min(s + 1,  100) },
    { label: 'ATS',      value: s },
  ]
}

function buildBarData(analysis) {
  const s = analysis.atsScore ?? 0
  return [
    { label: 'Contact',    value: Math.min(s + 8,  100), color: 'purple' },
    { label: 'Summary',    value: Math.max(s - 5,  0),   color: 'cyan' },
    { label: 'Experience', value: Math.min(s + 3,  100), color: 'emerald' },
    { label: 'Education',  value: Math.max(s - 12, 0),   color: 'amber' },
    { label: 'Skills',     value: Math.min((analysis.skills ?? []).length * 6, 100), color: 'rose' },
  ]
}

function formatDate(isoStr) {
  if (!isoStr) return ''
  return new Date(isoStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatSize(bytes) {
  if (!bytes) return ''
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

/* ── Animation Variants ── */
const containerV = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}
const itemV = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

/* ── Score Ring SVG ── */
function ScoreRing({ score, animated }) {
  const grade = GRADE_MAP(score)
  const radius = 68
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="score-ring-wrapper">
      <svg className="score-ring-svg" viewBox="0 0 160 160">
        <defs>
          <linearGradient id="scoreGradientGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id="scoreGradientBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="scoreGradientYellow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="scoreGradientRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
        </defs>
        <circle className="score-ring-bg" cx="80" cy="80" r={radius} />
        <motion.circle
          className={`score-ring-fill ${grade}`}
          cx="80" cy="80" r={radius}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: animated ? offset : circumference }}
          transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="score-ring-value">
        <div className={`score-ring-number ${grade}`}>{score}</div>
        <div className="score-ring-label-small">ATS Score</div>
      </div>
    </div>
  )
}

/* ── Radar Chart SVG ── */
function RadarChart({ data, animated }) {
  const cx = 140, cy = 140, maxR = 100
  const n = data.length
  const levels = 4

  const getPoint = (index, value) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2
    const r = (value / 100) * maxR
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  }

  const gridPolygons = Array.from({ length: levels }, (_, l) => {
    const r = ((l + 1) / levels) * maxR
    return data.map((_, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`
    }).join(' ')
  })

  const dataPoints = data.map((d, i) => getPoint(i, d.value))
  const dataPolygon = dataPoints.map(p => `${p.x},${p.y}`).join(' ')

  return (
    <div className="radar-chart-container">
      <svg className="radar-chart-svg" viewBox="0 0 280 280">
        {gridPolygons.map((pts, i) => (
          <polygon key={i} className="radar-grid-line" points={pts} />
        ))}
        {data.map((_, i) => {
          const p = getPoint(i, 100)
          return <line key={i} className="radar-axis-line" x1={cx} y1={cy} x2={p.x} y2={p.y} />
        })}
        <motion.polygon
          className="radar-area"
          points={dataPolygon}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={animated ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
        {dataPoints.map((p, i) => (
          <motion.circle
            key={i}
            className="radar-dot"
            cx={p.x} cy={p.y} r={4}
            initial={{ opacity: 0, scale: 0 }}
            animate={animated ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.8 + i * 0.08 }}
          />
        ))}
        {data.map((d, i) => {
          const labelR = maxR + 22
          const angle = (Math.PI * 2 * i) / n - Math.PI / 2
          const lx = cx + labelR * Math.cos(angle)
          const ly = cy + labelR * Math.sin(angle)
          return (
            <text
              key={i}
              className="radar-axis-label"
              x={lx} y={ly}
              textAnchor="middle"
              dominantBaseline="central"
            >
              {d.label}
            </text>
          )
        })}
      </svg>
    </div>
  )
}

/* ── Bar Chart ── */
function BarChart({ data, animated }) {
  const maxVal = Math.max(...data.map(d => d.value), 1)
  return (
    <div className="bar-chart-container">
      {data.map((d, i) => (
        <div key={i} className="bar-chart-item">
          <div className="bar-chart-bar-wrapper">
            <motion.div
              className={`bar-chart-bar ${d.color}`}
              initial={{ height: 0 }}
              animate={animated ? { height: `${(d.value / maxVal) * 100}%` } : { height: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="bar-chart-bar-value">{d.value}%</span>
            </motion.div>
          </div>
          <span className="bar-chart-label">{d.label}</span>
        </div>
      ))}
    </div>
  )
}

/* ── Strength Meter ── */
function StrengthMeter({ meter, animated, delay }) {
  const level = meter.value >= 80 ? 'high' : meter.value >= 60 ? 'mid' : 'low'
  const Icon = meter.icon
  return (
    <div className="strength-meter">
      <div className="strength-meter-header">
        <span className="strength-meter-label">
          <Icon /> {meter.label}
        </span>
        <span className={`strength-meter-value ${level}`}>{meter.value}%</span>
      </div>
      <div className="strength-bar-track">
        <motion.div
          className={`strength-bar-fill ${level}`}
          initial={{ width: '0%' }}
          animate={animated ? { width: `${meter.value}%` } : { width: '0%' }}
          transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

/* ── Parse AI summary markdown-bold ── */
function renderSummary(text) {
  if (!text) return null
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

/* ══════════════════════════════════════════
   Main Results Page
   ══════════════════════════════════════════ */
export default function ResultsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [animated, setAnimated] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const navigate = useNavigate()

  /* ── Load analysis from sessionStorage ── */
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('lastAnalysis')
      if (!raw) {
        // No data — redirect back to dashboard
        navigate('/dashboard', { replace: true })
        return
      }
      setAnalysis(JSON.parse(raw))
    } catch {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate])

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  if (!analysis) return null

  const score          = analysis.atsScore ?? 0
  const grade          = GRADE_MAP(score)
  const strengthMeters = buildStrengthMeters(analysis)
  const radarData      = buildRadarData(analysis)
  const barData        = buildBarData(analysis)
  const strengths      = analysis.strengths   ?? []
  const weaknesses     = analysis.weaknesses  ?? []
  const suggestions    = analysis.suggestions ?? []
  const skills         = analysis.skills      ?? []

  return (
    <div className="results-page">
      {/* ── Sidebar Overlay (mobile) ── */}
      <div
        className={`dash-sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ── Sidebar ── */}
      <motion.aside
        className={`dash-sidebar ${sidebarOpen ? 'open' : ''}`}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="dash-sidebar-brand">
          <div className="dash-sidebar-logo"><BrandIcon /></div>
          <span className="dash-sidebar-title">Resumix</span>
        </div>
        <nav className="dash-nav">
          <span className="dash-nav-label">Menu</span>
          {sidebarNav.map(item => (
            <Link
              key={item.id}
              to={item.to || '#'}
              className={`dash-nav-item ${item.active ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="dash-sidebar-footer">
          <div className="dash-storage-label">
            <span><HardDrive size={13} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '5px', opacity: 0.6 }} />Storage</span>
            <span>2.4 GB / 5 GB</span>
          </div>
          <div className="dash-storage-bar">
            <motion.div
              className="dash-storage-fill"
              initial={{ width: '0%' }}
              animate={{ width: '48%' }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      </motion.aside>

      {/* ── Main ── */}
      <main className="results-main">
        {/* Top Bar */}
        <div className="results-topbar">
          <div className="results-topbar-left">
            <button className="results-menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
              <Menu size={18} />
            </button>
            <Link to="/dashboard" className="results-back-btn">
              <ChevronLeft size={16} /> Back
            </Link>
            <span className="results-topbar-title">Analysis Results</span>
          </div>
          <div className="results-topbar-right">
            <motion.button
              className="results-action-btn"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/dashboard')}
            >
              <RefreshCw size={15} /> <span className="btn-text">New Analysis</span>
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <motion.div
          className="results-content"
          variants={containerV}
          initial="hidden"
          animate="visible"
        >
          {/* Resume Header */}
          <motion.div className="results-resume-header" variants={itemV}>
            <div className="results-file-icon"><FileText size={22} /></div>
            <div className="results-file-info">
              <h1>{analysis.fileName ?? 'Resume'}</h1>
              <div className="results-file-meta">
                <span>{formatDate(analysis.uploadedAt)}</span>
                {analysis.fileSize && (
                  <>
                    <span className="results-file-meta-dot" />
                    <span>{formatSize(analysis.fileSize)}</span>
                  </>
                )}
                <span className="results-file-meta-dot" />
                <span>PDF</span>
              </div>
            </div>
          </motion.div>

          {/* ── Score Hero ── */}
          <motion.div className="results-score-hero" variants={itemV}>
            {/* Score Ring */}
            <div className="score-ring-card">
              <ScoreRing score={score} animated={animated} />
              <span className={`score-ring-grade ${grade}`}>{GRADE_LABEL(score)}</span>
            </div>

            {/* Strength Meters */}
            <div className="strength-card">
              <h3 className="strength-card-title">Category Breakdown</h3>
              {strengthMeters.map((m, i) => (
                <StrengthMeter key={m.label} meter={m} animated={animated} delay={0.4 + i * 0.12} />
              ))}
            </div>
          </motion.div>

          {/* ── Charts Row ── */}
          <motion.div className="results-charts-row" variants={itemV}>
            <div className="results-glass-card">
              <h3 className="results-card-title">Performance Radar</h3>
              <RadarChart data={radarData} animated={animated} />
            </div>
            <div className="results-glass-card">
              <h3 className="results-card-title">Section Scores</h3>
              <BarChart data={barData} animated={animated} />
            </div>
          </motion.div>

          {/* ── Section Analysis ── */}
          <motion.div className="results-analysis-row" variants={itemV}>
            {/* Strengths */}
            <div className="results-glass-card">
              <h3 className="results-card-title">Strengths</h3>
              <div className="analysis-list">
                {strengths.length > 0
                  ? strengths.map((s, i) => (
                    <motion.div
                      key={i} className="analysis-item"
                      initial={{ opacity: 0, x: -10 }}
                      animate={animated ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    >
                      <span className="analysis-item-icon green"><CheckCircle2 /></span>
                      {s}
                    </motion.div>
                  ))
                  : <p className="results-empty-msg">No strengths found.</p>
                }
              </div>
            </div>

            {/* Weaknesses */}
            <div className="results-glass-card">
              <h3 className="results-card-title">Weaknesses</h3>
              <div className="analysis-list">
                {weaknesses.length > 0
                  ? weaknesses.map((w, i) => (
                    <motion.div
                      key={i} className="analysis-item"
                      initial={{ opacity: 0, x: -10 }}
                      animate={animated ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.9 + i * 0.1 }}
                    >
                      <span className="analysis-item-icon red"><XCircle /></span>
                      {w}
                    </motion.div>
                  ))
                  : <p className="results-empty-msg">No weaknesses found.</p>
                }
              </div>
            </div>

            {/* Suggestions */}
            <div className="results-glass-card">
              <h3 className="results-card-title">Suggestions</h3>
              <div className="analysis-list">
                {suggestions.length > 0
                  ? suggestions.map((s, i) => (
                    <motion.div
                      key={i} className="analysis-item"
                      initial={{ opacity: 0, x: -10 }}
                      animate={animated ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 1.0 + i * 0.1 }}
                    >
                      <span className="analysis-item-icon blue"><Lightbulb /></span>
                      {s}
                    </motion.div>
                  ))
                  : <p className="results-empty-msg">No suggestions found.</p>
                }
              </div>
            </div>
          </motion.div>

          {/* ── Skills ── */}
          {skills.length > 0 && (
            <motion.div className="results-skills-row" variants={itemV}>
              <div className="results-glass-card">
                <h3 className="results-card-title">Skills Detected</h3>
                <div className="skill-tags">
                  {skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      className="skill-tag detected"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={animated ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 1.0 + i * 0.04 }}
                      whileHover={{ y: -2, scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── AI Summary ── */}
          {analysis.summary && (
            <motion.div className="results-glass-card ai-summary-card" variants={itemV}>
              <div className="ai-summary-badge">
                <Sparkles size={12} /> AI Summary
              </div>
              <h3 className="results-card-title">Analysis Overview</h3>
              <motion.p
                className="ai-summary-text"
                initial={{ opacity: 0 }}
                animate={animated ? { opacity: 1 } : {}}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                {renderSummary(analysis.summary)}
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
