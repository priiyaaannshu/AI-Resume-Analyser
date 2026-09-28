import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Clock, FolderOpen, BarChart3, Settings,
  Menu, Bell, HardDrive, TrendingUp, TrendingDown,
  Target, FileText, Zap, Award
} from 'lucide-react'
import './AnalyticsPage.css'

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

const sidebarNav = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { id: 'history', label: 'History', icon: Clock, to: '/history' },
  { id: 'library', label: 'Resume Library', icon: FolderOpen },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, active: true },
  { id: 'settings', label: 'Settings', icon: Settings },
]

/* ── Mock Data ── */
const scoreData = [
  { week: 'W1', score: 62, keywords: 45 },
  { week: 'W2', score: 68, keywords: 52 },
  { week: 'W3', score: 71, keywords: 58 },
  { week: 'W4', score: 75, keywords: 64 },
  { week: 'W5', score: 79, keywords: 71 },
  { week: 'W6', score: 82, keywords: 76 },
  { week: 'W7', score: 84, keywords: 80 },
  { week: 'W8', score: 87, keywords: 85 },
]

const categoryScores = [
  { label: 'Keywords', value: 92, color: 'purple' },
  { label: 'Format', value: 85, color: 'cyan' },
  { label: 'Impact', value: 78, color: 'emerald' },
  { label: 'Clarity', value: 88, color: 'amber' },
  { label: 'Skills', value: 72, color: 'rose' },
]

const donutData = [
  { label: 'Excellent (90+)', value: 8, color: '#34d399' },
  { label: 'Good (75-89)', value: 12, color: '#6366f1' },
  { label: 'Fair (55-74)', value: 5, color: '#fbbf24' },
  { label: 'Needs Work (<55)', value: 2, color: '#fb7185' },
]

const heatmapData = (() => {
  const weeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const hours = ['9AM', '12PM', '3PM', '6PM', '9PM']
  const grid = hours.map(() => weeks.map(() => Math.floor(Math.random() * 5)))
  // Make weekdays busier
  grid.forEach(row => { row[5] = Math.min(row[5], 1); row[6] = Math.min(row[6], 1) })
  return { weeks, hours, grid }
})()

const comparisonData = [
  { name: 'Keywords', before: 58, after: 92, color: '#6366f1' },
  { name: 'Formatting', before: 70, after: 85, color: '#22d3ee' },
  { name: 'Readability', before: 55, after: 78, color: '#34d399' },
  { name: 'Experience', before: 82, after: 90, color: '#fbbf24' },
  { name: 'Skills Match', before: 48, after: 72, color: '#fb7185' },
]

/* ── Animation ── */
const cV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }
const iV = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }

/* ═══════════════════════════════
   LINE CHART (Score + Keywords)
   ═══════════════════════════════ */
function LineChart({ data }) {
  const W = 600, H = 200, px = 50, py = 20
  const n = data.length
  const maxY = 100, minY = 30
  const chartW = W - px * 2, chartH = H - py * 2

  const toX = (i) => px + (i / (n - 1)) * chartW
  const toY = (val) => py + ((maxY - val) / (maxY - minY)) * chartH

  const buildPath = (key) => data.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(d[key])}`).join(' ')
  const buildArea = (key) => {
    const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(d[key])}`).join(' ')
    return `${path} L${toX(n - 1)},${H - py} L${toX(0)},${H - py} Z`
  }

  const yTicks = [40, 60, 80, 100]

  return (
    <>
      <svg className="line-chart-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaGradPrimary" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="areaGradSecondary" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid */}
        {yTicks.map(t => (
          <g key={t}>
            <line className="line-chart-grid" x1={px} y1={toY(t)} x2={W - px} y2={toY(t)} />
            <text className="line-chart-y-label" x={px - 8} y={toY(t) + 3} textAnchor="end">{t}</text>
          </g>
        ))}

        {/* Areas */}
        <motion.path className="line-chart-area primary" d={buildArea('score')}
          initial={{ opacity: 0 }} animate={{ opacity: 0.08 }} transition={{ delay: 0.5, duration: 1 }} />
        <motion.path className="line-chart-area secondary" d={buildArea('keywords')}
          initial={{ opacity: 0 }} animate={{ opacity: 0.06 }} transition={{ delay: 0.7, duration: 1 }} />

        {/* Lines */}
        <motion.path className="line-chart-path primary" d={buildPath('score')}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} />
        <motion.path className="line-chart-path secondary" d={buildPath('keywords')}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} />

        {/* Dots */}
        {data.map((d, i) => (
          <motion.circle key={`s${i}`} className="line-chart-dot" cx={toX(i)} cy={toY(d.score)} r={4} fill="#6366f1"
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 + i * 0.08 }} />
        ))}
        {data.map((d, i) => (
          <motion.circle key={`k${i}`} className="line-chart-dot" cx={toX(i)} cy={toY(d.keywords)} r={3.5} fill="#22d3ee"
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6 + i * 0.08 }} />
        ))}

        {/* X Labels */}
        {data.map((d, i) => (
          <text key={i} className="line-chart-label" x={toX(i)} y={H - 2} textAnchor="middle">{d.week}</text>
        ))}
      </svg>
      <div className="chart-legend">
        <span className="chart-legend-item"><span className="chart-legend-dot purple" /> ATS Score</span>
        <span className="chart-legend-item"><span className="chart-legend-dot cyan" /> Keywords</span>
      </div>
    </>
  )
}

/* ═══════════════════════
   DONUT CHART
   ═══════════════════════ */
function DonutChart({ data }) {
  const total = data.reduce((a, b) => a + b.value, 0)
  const radius = 58, circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <div className="donut-chart-wrapper">
      <div className="donut-chart-container">
        <svg className="donut-chart-svg" viewBox="0 0 160 160">
          {data.map((d, i) => {
            const segLen = (d.value / total) * circumference
            const dash = `${segLen} ${circumference - segLen}`
            const o = offset
            offset += segLen
            return (
              <motion.circle
                key={i}
                className="donut-segment"
                cx="80" cy="80" r={radius}
                stroke={d.color}
                strokeDasharray={dash}
                strokeDashoffset={-o}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.8 }}
              />
            )
          })}
        </svg>
        <div className="donut-center-label">
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-1px' }}>{total}</div>
          <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>Total</div>
        </div>
      </div>
      <div className="donut-legend">
        {data.map((d, i) => (
          <div key={i} className="donut-legend-item">
            <span className="donut-legend-dot" style={{ background: d.color }} />
            {d.label}
            <span className="donut-legend-value">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════
   BAR CHART
   ═══════════════════════ */
function VBarChart({ data }) {
  const maxVal = Math.max(...data.map(d => d.value))
  return (
    <div className="vbar-chart">
      {data.map((d, i) => (
        <div key={i} className="vbar-item">
          <div className="vbar-bar-wrap">
            <motion.div
              className={`vbar-bar ${d.color}`}
              initial={{ height: 0 }}
              animate={{ height: `${(d.value / maxVal) * 100}%` }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="vbar-val">{d.value}%</span>
            </motion.div>
          </div>
          <span className="vbar-label">{d.label}</span>
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════
   HEATMAP
   ═══════════════════════ */
function Heatmap({ data }) {
  return (
    <div>
      <div className="heatmap-col-labels">
        <div />
        {data.weeks.map(w => <div key={w} className="heatmap-col-label">{w}</div>)}
      </div>
      <div className="heatmap-grid">
        {data.hours.map((hour, ri) => (
          <React.Fragment key={ri}>
            <div className="heatmap-row-label">{hour}</div>
            {data.grid[ri].map((val, ci) => (
              <motion.div
                key={`${ri}-${ci}`}
                className={`heatmap-cell l${val}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + ri * 0.06 + ci * 0.03, duration: 0.3 }}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="heatmap-scale">
        <span className="heatmap-scale-label">Less</span>
        {[0, 1, 2, 3, 4].map(l => <div key={l} className={`heatmap-scale-cell l${l}`} style={{ width: 14, height: 14, borderRadius: 3 }} />)}
        <span className="heatmap-scale-label">More</span>
      </div>
    </div>
  )
}

/* ═══════════════════════
   COMPARISON BARS
   ═══════════════════════ */
function ComparisonBars({ data }) {
  return (
    <div className="comparison-list">
      {data.map((d, i) => (
        <motion.div
          key={d.name}
          className="comparison-item"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + i * 0.1 }}
        >
          <div className="comparison-item-header">
            <span className="comparison-item-name">
              <span className="comp-dot" style={{ background: d.color }} />
              {d.name}
            </span>
            <div className="comparison-item-scores">
              <span>{d.before}%</span>
              <span>→</span>
              <span>{d.after}%</span>
            </div>
          </div>
          <div className="comparison-bar-track">
            <motion.div className="comparison-bar-before"
              initial={{ width: 0 }}
              animate={{ width: `${d.before}%` }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div className="comparison-bar-after"
              initial={{ width: 0 }}
              animate={{ width: `${d.after}%` }}
              transition={{ duration: 1, delay: 0.7 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>
      ))}
      <div className="chart-legend" style={{ marginTop: 12 }}>
        <span className="chart-legend-item"><span className="chart-legend-dot purple" /> Before</span>
        <span className="chart-legend-item"><span className="chart-legend-dot emerald" /> After</span>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   MAIN ANALYTICS PAGE
   ══════════════════════════════════════════ */
export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [period, setPeriod] = useState('8W')

  return (
    <div className="results-page">
      <div className={`dash-sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
      <motion.aside
        className={`dash-sidebar ${sidebarOpen ? 'open' : ''}`}
        initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="dash-sidebar-brand">
          <div className="dash-sidebar-logo"><BrandIcon /></div>
          <span className="dash-sidebar-title">Resumix</span>
        </div>
        <nav className="dash-nav">
          <span className="dash-nav-label">Menu</span>
          {sidebarNav.map(item => (
            <Link key={item.id} to={item.to || '#'} className={`dash-nav-item ${item.active ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}>
              <item.icon /> {item.label}
            </Link>
          ))}
        </nav>
        <div className="dash-sidebar-footer">
          <div className="dash-storage-label">
            <span><HardDrive size={13} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 5, opacity: 0.6 }} />Storage</span>
            <span>2.4 GB / 5 GB</span>
          </div>
          <div className="dash-storage-bar">
            <motion.div className="dash-storage-fill" initial={{ width: '0%' }} animate={{ width: '48%' }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }} />
          </div>
        </div>
      </motion.aside>

      {/* Main */}
      <main className="results-main">
        <div className="results-topbar">
          <div className="results-topbar-left">
            <button className="results-menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}><Menu size={18} /></button>
            <span className="results-topbar-title">Analytics</span>
          </div>
          <div className="results-topbar-right">
            <button className="dash-topbar-btn"><Bell size={18} /></button>
            <div className="dash-avatar">P</div>
          </div>
        </div>

        <motion.div className="analytics-content" variants={cV} initial="hidden" animate="visible">
          {/* Header */}
          <motion.div className="analytics-header" variants={iV}>
            <div className="analytics-header-left">
              <h1>Analytics</h1>
              <p>Track your resume improvement journey</p>
            </div>
            <div className="analytics-period">
              {['4W', '8W', '12W', '6M'].map(p => (
                <button key={p} className={`analytics-period-btn ${period === p ? 'active' : ''}`} onClick={() => setPeriod(p)}>{p}</button>
              ))}
            </div>
          </motion.div>

          {/* KPIs */}
          <motion.div className="analytics-kpi-row" variants={iV}>
            {[
              { label: 'Average ATS Score', icon: Target, value: '87', change: '+12', dir: 'up' },
              { label: 'Total Analyses', icon: FileText, value: '27', change: '+5', dir: 'up' },
              { label: 'Keyword Growth', icon: Zap, value: '+42%', change: '+8%', dir: 'up' },
              { label: 'Best Score', icon: Award, value: '96', change: '+3', dir: 'up' },
            ].map((kpi, i) => (
              <motion.div key={i} className="analytics-kpi" whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                <div className="analytics-kpi-label"><kpi.icon /> {kpi.label}</div>
                <div className="analytics-kpi-value">{kpi.value}</div>
                <span className={`analytics-kpi-change ${kpi.dir}`}>
                  {kpi.dir === 'up' ? <TrendingUp /> : <TrendingDown />} {kpi.change}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Score Improvement Line Chart (full width) */}
          <motion.div className="analytics-row-full" variants={iV}>
            <div className="analytics-chart-card">
              <div className="analytics-chart-title">
                Weekly Progress
                <span className="analytics-chart-title-badge">Last 8 weeks</span>
              </div>
              <LineChart data={scoreData} />
            </div>
          </motion.div>

          {/* Donut + Category Bar */}
          <motion.div className="analytics-row-2" variants={iV}>
            <div className="analytics-chart-card">
              <div className="analytics-chart-title">Score Distribution</div>
              <DonutChart data={donutData} />
            </div>
            <div className="analytics-chart-card">
              <div className="analytics-chart-title">Category Breakdown</div>
              <VBarChart data={categoryScores} />
            </div>
          </motion.div>

          {/* Heatmap + Comparison */}
          <motion.div className="analytics-row-2" variants={iV}>
            <div className="analytics-chart-card">
              <div className="analytics-chart-title">
                Activity Heatmap
                <span className="analytics-chart-title-badge">This month</span>
              </div>
              <Heatmap data={heatmapData} />
            </div>
            <div className="analytics-chart-card">
              <div className="analytics-chart-title">
                Before vs After
                <span className="analytics-chart-title-badge">Improvement</span>
              </div>
              <ComparisonBars data={comparisonData} />
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
