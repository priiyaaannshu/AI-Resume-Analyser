import { useState, useRef, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Clock, BarChart3, UserCircle, Settings,
  Search, Bell, Upload, FileText, X, Menu,
  ChevronRight, HardDrive, FileUp, LogOut, AlertCircle
} from 'lucide-react'
import { uploadResume } from '../api/api'
import { useAuth } from '../context/AuthContext'
import './DashboardPage.css'

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

/* ── Sidebar Navigation Items ── */
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard', active: true },
  { id: 'history',   label: 'History',   icon: Clock,           to: '/history',   badge: null },
  { id: 'analytics', label: 'Analytics', icon: BarChart3,       to: '/analytics' },
  { id: 'profile',   label: 'Profile',   icon: UserCircle,      to: '/profile' },
  { id: 'settings',  label: 'Settings',  icon: Settings,        to: '/settings' },
]

/* ── Animation Variants ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

const cardHover = {
  y: -4,
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
}

/* ── Helpers ── */
function formatDate(isoStr) {
  if (!isoStr) return ''
  return new Date(isoStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatSize(bytes) {
  if (!bytes) return ''
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function scoreClass(score) {
  if (score >= 80) return 'high'
  if (score >= 60) return 'mid'
  return 'low'
}

/* ── Main Dashboard ── */
export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('dashboard')
  const [dragOver, setDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadFile, setUploadFile] = useState(null)
  const [uploadError, setUploadError] = useState('')
  const [recentUploads, setRecentUploads] = useState([])
  const fileInputRef = useRef(null)
  const abortRef = useRef(null)

  const { user, logout } = useAuth()
  const navigate = useNavigate()

  /* ── Load history from sessionStorage ── */
  useEffect(() => {
    try {
      const history = JSON.parse(sessionStorage.getItem('resumix_history') || '[]')
      setRecentUploads(history.slice(0, 3))
    } catch {
      setRecentUploads([])
    }
  }, [])

  /* ── Drag & Drop handlers ── */
  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const startUpload = useCallback(async (file) => {
    if (!file) return

    // Only allow PDFs (backend restriction)
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setUploadError('Only PDF files are supported. Please upload a .pdf file.')
      return
    }

    setUploadFile(file)
    setUploading(true)
    setUploadProgress(0)
    setUploadError('')

    try {
      const rawAnalysis = await uploadResume(file, (progressEvent) => {
        if (progressEvent.total) {
          const pct = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setUploadProgress(Math.min(pct, 90)) // cap at 90% until response
        }
      })

      const analysis = typeof rawAnalysis === 'string' ? JSON.parse(rawAnalysis) : (rawAnalysis || {})

      // Analysis complete — store results & navigate
      setUploadProgress(100)

      // Save to session storage for results page
      sessionStorage.setItem('lastAnalysis', JSON.stringify({
        ...analysis,
        fileName: file.name,
        fileSize: file.size,
        uploadedAt: new Date().toISOString(),
      }))

      // Update local history
      const existing = JSON.parse(sessionStorage.getItem('resumix_history') || '[]')
      const newEntry = {
        id: Date.now(),
        name: file.name,
        type: 'pdf',
        size: formatSize(file.size),
        date: formatDate(new Date().toISOString()),
        score: analysis.atsScore ?? 0,
      }
      const updated = [newEntry, ...existing].slice(0, 20)
      sessionStorage.setItem('resumix_history', JSON.stringify(updated))
      setRecentUploads(updated.slice(0, 3))

      setTimeout(() => {
        setUploading(false)
        setUploadFile(null)
        setUploadProgress(0)
        navigate('/results')
      }, 500)
    } catch (err) {
      const msg = err?.response?.data?.message
        ?? err?.response?.data
        ?? 'Upload failed. Please try again.'
      setUploadError(typeof msg === 'string' ? msg : 'Upload failed. Please check the file and try again.')
      setUploading(false)
      setUploadFile(null)
      setUploadProgress(0)
    }
  }, [navigate])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer?.files?.[0]
    if (file) startUpload(file)
  }, [startUpload])

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files?.[0]
    if (file) startUpload(file)
    // Reset input so same file can be selected again
    e.target.value = ''
  }, [startUpload])

  const cancelUpload = useCallback(() => {
    abortRef.current?.abort()
    setUploading(false)
    setUploadFile(null)
    setUploadProgress(0)
  }, [])

  /* ── First letter of user name/email for avatar ── */
  const avatarLetter = (user?.name ?? user?.email ?? 'U')[0].toUpperCase()

  return (
    <div className="dashboard">
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
        {/* Brand */}
        <div className="dash-sidebar-brand">
          <div className="dash-sidebar-logo">
            <BrandIcon />
          </div>
          <span className="dash-sidebar-title">Resumix</span>
        </div>

        {/* Navigation */}
        <nav className="dash-nav">
          <span className="dash-nav-label">Menu</span>
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.to}
              className={`dash-nav-item ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveNav(item.id)
                setSidebarOpen(false)
              }}
            >
              <item.icon />
              {item.label}
              {item.badge && <span className="dash-nav-badge">{item.badge}</span>}
            </Link>
          ))}
        </nav>

        {/* Storage + Logout */}
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
          <button
            className="dash-logout-btn"
            onClick={logout}
            title="Logout"
          >
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* ── Main ── */}
      <main className="dash-main">
        {/* Top Bar */}
        <div className="dash-topbar">
          <div className="dash-topbar-left">
            <button
              className="dash-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              <Menu size={18} />
            </button>
            <div className="dash-search">
              <Search size={16} />
              <input type="text" placeholder="Search resumes..." />
              <span className="dash-search-kbd">⌘K</span>
            </div>
          </div>
          <div className="dash-topbar-right">
            <button className="dash-topbar-btn" aria-label="Notifications">
              <Bell size={18} />
              <span className="notif-dot" />
            </button>
            <div className="dash-avatar" title={user?.name ?? user?.email}>{avatarLetter}</div>
          </div>
        </div>

        {/* Content */}
        <motion.div
          className="dash-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Welcome */}
          <motion.div className="dash-welcome" variants={itemVariants}>
            <h1>
              Welcome back, <span>{user?.name ?? user?.email ?? 'User'}</span>
            </h1>
            <p>Ready to improve your resume?</p>
          </motion.div>

          {/* Upload Error */}
          <AnimatePresence>
            {uploadError && (
              <motion.div
                className="dash-upload-error"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <AlertCircle size={16} />
                <span>{uploadError}</span>
                <button onClick={() => setUploadError('')} aria-label="Dismiss">
                  <X size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Upload Zone */}
          <motion.div
            className={`dash-upload-zone ${dragOver ? 'drag-over' : ''}`}
            variants={itemVariants}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !uploading && fileInputRef.current?.click()}
            whileHover={uploading ? {} : { y: -3 }}
            transition={{ duration: 0.3 }}
            style={{ cursor: uploading ? 'default' : 'pointer' }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />

            <motion.div
              className="upload-icon-wrapper"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Upload size={28} />
            </motion.div>

            <div>
              <div className="upload-text-main">
                Drag &amp; drop your resume here, or <span>browse</span>
              </div>
              <div className="upload-text-sub">
                Upload your resume and get instant AI-powered analysis
              </div>
            </div>

            <div className="upload-formats">
              <div className="upload-format-badge">
                <span className="upload-format-dot pdf" />
                PDF
              </div>
              <div className="upload-size-badge">
                <FileUp size={12} />
                Max 5 MB
              </div>
            </div>

            <motion.button
              className="upload-browse-btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={uploading}
              onClick={(e) => {
                e.stopPropagation()
                fileInputRef.current?.click()
              }}
            >
              Browse Files
            </motion.button>
          </motion.div>

          {/* Upload Progress */}
          <AnimatePresence>
            {uploading && uploadFile && (
              <motion.div
                className="upload-progress-card"
                initial={{ opacity: 0, y: 12, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto', marginBottom: 32 }}
                exit={{ opacity: 0, y: -12, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="upload-progress-icon">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <FileText size={20} />
                  </motion.div>
                </div>
                <div className="upload-progress-info">
                  <div className="upload-progress-name">{uploadFile.name}</div>
                  <div className="upload-progress-meta">
                    {formatSize(uploadFile.size)} · {uploadProgress < 90 ? 'Uploading...' : 'Analyzing with AI...'}
                  </div>
                  <div className="upload-progress-bar-track">
                    <motion.div
                      className="upload-progress-bar-fill"
                      initial={{ width: '0%' }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                <span className="upload-progress-percent">{uploadProgress}%</span>
                <button
                  className="upload-progress-cancel"
                  onClick={cancelUpload}
                  aria-label="Cancel upload"
                >
                  <X size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recent Uploads */}
          <motion.div variants={itemVariants}>
            <div className="dash-section-header">
              <h2 className="dash-section-title">Recent Uploads</h2>
              <Link to="/history" className="dash-section-link">
                View all <ChevronRight size={14} style={{ display: 'inline', verticalAlign: '-2px' }} />
              </Link>
            </div>
          </motion.div>

          <div className="dash-recent-grid">
            {recentUploads.length === 0 ? (
              <motion.div
                className="dash-empty-state"
                variants={itemVariants}
              >
                <FileText size={32} style={{ opacity: 0.3 }} />
                <p>No uploads yet. Upload your first resume above!</p>
              </motion.div>
            ) : (
              recentUploads.map((file) => (
                <motion.div
                  key={file.id}
                  className="dash-recent-card"
                  variants={itemVariants}
                  whileHover={cardHover}
                >
                  <div className="dash-recent-top">
                    <div className={`dash-recent-file-icon ${file.type}`}>
                      <FileText size={18} />
                    </div>
                    <span className={`dash-recent-score ${scoreClass(file.score)}`}>
                      {file.score}/100
                    </span>
                  </div>
                  <div className="dash-recent-name">{file.name}</div>
                  <div className="dash-recent-meta">
                    <span>{file.date}</span>
                    <span className="dash-recent-meta-dot" />
                    <span>{file.size}</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
