import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Clock, FolderOpen, BarChart3, Settings,
  Search, FileText, Trash2, ExternalLink, Menu, HardDrive,
  FolderSearch, Bell
} from 'lucide-react'
import './HistoryPage.css'

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

/* ── Sidebar Nav ── */
const sidebarNav = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { id: 'history', label: 'History', icon: Clock, active: true },
  { id: 'library', label: 'Resume Library', icon: FolderOpen },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
]

/* ── Filters ── */
const FILTERS = ['All', 'Completed', 'Processing', 'Failed']

/* ── Mock Data ── */
const mockHistory = [
  {
    id: 1,
    name: 'Software_Engineer_Resume_v4.pdf',
    type: 'pdf',
    size: '1.2 MB',
    date: 'Aug 9, 2026',
    time: '2:30 PM',
    group: 'Today',
    score: 92,
    status: 'completed',
  },
  {
    id: 2,
    name: 'Frontend_Developer_CV.docx',
    type: 'docx',
    size: '890 KB',
    date: 'Aug 9, 2026',
    time: '11:15 AM',
    group: 'Today',
    score: 87,
    status: 'completed',
  },
  {
    id: 3,
    name: 'Product_Manager_Resume.pdf',
    type: 'pdf',
    size: '1.5 MB',
    date: 'Aug 9, 2026',
    time: '9:45 AM',
    group: 'Today',
    score: null,
    status: 'processing',
  },
  {
    id: 4,
    name: 'Data_Scientist_Resume.pdf',
    type: 'pdf',
    size: '2.1 MB',
    date: 'Aug 8, 2026',
    time: '4:20 PM',
    group: 'Yesterday',
    score: 78,
    status: 'completed',
  },
  {
    id: 5,
    name: 'UX_Designer_Portfolio.docx',
    type: 'docx',
    size: '3.4 MB',
    date: 'Aug 8, 2026',
    time: '1:00 PM',
    group: 'Yesterday',
    score: 64,
    status: 'completed',
  },
  {
    id: 6,
    name: 'DevOps_Engineer_Resume.pdf',
    type: 'pdf',
    size: '980 KB',
    date: 'Aug 7, 2026',
    time: '6:10 PM',
    group: 'Aug 7, 2026',
    score: null,
    status: 'failed',
  },
  {
    id: 7,
    name: 'ML_Engineer_Resume_v2.pdf',
    type: 'pdf',
    size: '1.8 MB',
    date: 'Aug 7, 2026',
    time: '10:30 AM',
    group: 'Aug 7, 2026',
    score: 95,
    status: 'completed',
  },
  {
    id: 8,
    name: 'Backend_Developer_CV.docx',
    type: 'docx',
    size: '1.1 MB',
    date: 'Aug 5, 2026',
    time: '3:45 PM',
    group: 'Aug 5, 2026',
    score: 71,
    status: 'completed',
  },
  {
    id: 9,
    name: 'Cloud_Architect_Resume.pdf',
    type: 'pdf',
    size: '2.0 MB',
    date: 'Aug 5, 2026',
    time: '9:00 AM',
    group: 'Aug 5, 2026',
    score: 83,
    status: 'completed',
  },
  {
    id: 10,
    name: 'Technical_Lead_Resume.pdf',
    type: 'pdf',
    size: '1.6 MB',
    date: 'Aug 3, 2026',
    time: '5:20 PM',
    group: 'Aug 3, 2026',
    score: 88,
    status: 'completed',
  },
]

const getScoreClass = (s) => s >= 80 ? 'high' : s >= 60 ? 'mid' : 'low'

/* ── Animations ── */
const containerV = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
}
const itemV = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
}
const cardV = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

/* ══════════════════════════════════════════
   Main History Page
   ══════════════════════════════════════════ */
export default function HistoryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [items, setItems] = useState(mockHistory)

  /* ── Filter + search logic ── */
  const filtered = useMemo(() => {
    let list = items
    if (activeFilter !== 'All') {
      list = list.filter(i => i.status === activeFilter.toLowerCase())
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(i => i.name.toLowerCase().includes(q))
    }
    return list
  }, [items, activeFilter, search])

  /* ── Group by date ── */
  const grouped = useMemo(() => {
    const groups = []
    const seen = new Set()
    for (const item of filtered) {
      if (!seen.has(item.group)) {
        seen.add(item.group)
        groups.push({ label: item.group, items: [] })
      }
      groups.find(g => g.label === item.group).items.push(item)
    }
    return groups
  }, [filtered])

  /* ── Stats ── */
  const totalResumes = items.length
  const avgScore = Math.round(
    items.filter(i => i.score).reduce((a, b) => a + b.score, 0) /
    items.filter(i => i.score).length
  )
  const completedCount = items.filter(i => i.status === 'completed').length

  const handleDelete = (id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div className="results-page">
      {/* Sidebar overlay */}
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
        {/* Top bar */}
        <div className="results-topbar">
          <div className="results-topbar-left">
            <button className="results-menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
              <Menu size={18} />
            </button>
            <span className="results-topbar-title">Resume History</span>
          </div>
          <div className="results-topbar-right">
            <button className="dash-topbar-btn" aria-label="Notifications">
              <Bell size={18} />
              <span className="notif-dot" />
            </button>
            <div className="dash-avatar">P</div>
          </div>
        </div>

        {/* Content */}
        <motion.div
          className="history-content"
          variants={containerV}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div className="history-header" variants={itemV}>
            <h1>Resume History</h1>
            <p>Track all your resume analyses in one place</p>
          </motion.div>

          {/* Toolbar */}
          <motion.div className="history-toolbar" variants={itemV}>
            <div className="history-search">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search resumes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="history-filters">
              {FILTERS.map(f => (
                <button
                  key={f}
                  className={`history-filter-chip ${activeFilter === f ? 'active' : ''}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div className="history-stats" variants={itemV}>
            <div className="history-stat">
              <span className="history-stat-value">{totalResumes}</span>
              <span className="history-stat-label">Total Resumes</span>
            </div>
            <span className="history-stat-divider" />
            <div className="history-stat">
              <span className="history-stat-value">{avgScore}</span>
              <span className="history-stat-label">Avg Score</span>
            </div>
            <span className="history-stat-divider" />
            <div className="history-stat">
              <span className="history-stat-value">{completedCount}</span>
              <span className="history-stat-label">Completed</span>
            </div>
          </motion.div>

          {/* Timeline */}
          {grouped.length > 0 ? (
            <div className="history-timeline">
              {grouped.map((group) => (
                <motion.div key={group.label} className="history-date-group" variants={itemV}>
                  <div className="history-date-label">{group.label}</div>

                  <AnimatePresence>
                    {group.items.map((item) => (
                      <motion.div
                        key={item.id}
                        className="history-card"
                        variants={cardV}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, x: 30, height: 0, marginBottom: 0, padding: 0 }}
                        layout
                        whileHover={{ x: 4, y: -2 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* File Icon */}
                        <div className={`history-card-icon ${item.type}`}>
                          <FileText size={20} />
                        </div>

                        {/* Info */}
                        <div className="history-card-info">
                          <div className="history-card-name">{item.name}</div>
                          <div className="history-card-meta">
                            <span>{item.time}</span>
                            <span className="history-card-meta-dot" />
                            <span>{item.size}</span>
                            <span className="history-card-meta-dot" />
                            <span className={`history-status ${item.status}`}>
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </span>
                          </div>
                        </div>

                        {/* Score */}
                        {item.score !== null && (
                          <span className={`history-score ${getScoreClass(item.score)}`}>
                            {item.score}/100
                          </span>
                        )}

                        {/* Actions (visible on hover) */}
                        <div className="history-card-actions">
                          {item.status === 'completed' && (
                            <Link to="/results" className="history-action-btn open">
                              <ExternalLink size={13} /> Report
                            </Link>
                          )}
                          <button
                            className="history-action-btn delete"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(item.id)
                            }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <motion.div className="history-empty" variants={itemV}>
              <div className="history-empty-icon">
                <FolderSearch size={28} />
              </div>
              <h3>No resumes found</h3>
              <p>Try adjusting your search or filter</p>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
