import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Clock, FolderOpen, BarChart3, Settings,
  Menu, Bell, HardDrive, Edit3, Crown,
  FileText, Target, Upload,
  Lock, Trash2, BellRing, Mail, Moon, Sun, Monitor,
  Shield, LogOut
} from 'lucide-react'
import './ProfilePage.css'

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
  { id: 'history', label: 'History', icon: Clock, to: '/history' },
  { id: 'library', label: 'Resume Library', icon: FolderOpen },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
]

/* ── Toggle Component ── */
function Toggle({ on, onToggle }) {
  return (
    <div className={`profile-toggle ${on ? 'on' : ''}`} onClick={onToggle}>
      <div className="profile-toggle-knob" />
    </div>
  )
}

/* ── Animations ── */
const containerV = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}
const itemV = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

/* ══════════════════════════════════════════
   Main Profile Page
   ══════════════════════════════════════════ */
export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [emailNotif, setEmailNotif] = useState(true)
  const [pushNotif, setPushNotif] = useState(false)
  const [weeklyReport, setWeeklyReport] = useState(true)
  const [theme, setTheme] = useState('dark')

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
              className="dash-nav-item"
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
            <span className="results-topbar-title">Profile</span>
          </div>
          <div className="results-topbar-right">
            <button className="dash-topbar-btn" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <div className="dash-avatar">P</div>
          </div>
        </div>

        {/* Content */}
        <motion.div
          className="profile-content"
          variants={containerV}
          initial="hidden"
          animate="visible"
        >
          {/* ── Profile Hero ── */}
          <motion.div className="profile-hero" variants={itemV}>
            <motion.div
              className="profile-avatar"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.3 }}
            >
              P
            </motion.div>
            <div className="profile-hero-info">
              <div className="profile-hero-name">Priyanshu</div>
              <div className="profile-hero-email">priyanshu@example.com</div>
              <div className="profile-hero-plan">
                <Crown size={12} /> Pro Plan
              </div>
            </div>
            <motion.button
              className="profile-edit-btn"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              <Edit3 size={14} /> Edit Profile
            </motion.button>
          </motion.div>

          {/* ── Stats ── */}
          <motion.div className="profile-stats" variants={itemV}>
            <motion.div
              className="profile-stat-card"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="profile-stat-icon purple">
                <FileText size={20} />
              </div>
              <div className="profile-stat-value">24</div>
              <div className="profile-stat-label">Total Analyses</div>
            </motion.div>

            <motion.div
              className="profile-stat-card"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="profile-stat-icon emerald">
                <Target size={20} />
              </div>
              <div className="profile-stat-value">83</div>
              <div className="profile-stat-label">Average ATS Score</div>
            </motion.div>

            <motion.div
              className="profile-stat-card"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="profile-stat-icon cyan">
                <Upload size={20} />
              </div>
              <div className="profile-stat-value">18</div>
              <div className="profile-stat-label">Resumes Uploaded</div>
            </motion.div>
          </motion.div>

          {/* ── Account Settings ── */}
          <motion.div className="profile-section" variants={itemV}>
            <h3 className="profile-section-title">
              <Shield /> Account
            </h3>
            <div className="profile-settings-card">
              <div className="profile-setting-row">
                <div className="profile-setting-left">
                  <div className="profile-setting-icon"><Lock size={17} /></div>
                  <div className="profile-setting-text">
                    <div className="profile-setting-label">Change Password</div>
                    <div className="profile-setting-desc">Update your password regularly for security</div>
                  </div>
                </div>
                <div className="profile-setting-action">
                  <button className="profile-setting-btn">Update</button>
                </div>
              </div>

              <div className="profile-setting-row">
                <div className="profile-setting-left">
                  <div className="profile-setting-icon"><Mail size={17} /></div>
                  <div className="profile-setting-text">
                    <div className="profile-setting-label">Email Address</div>
                    <div className="profile-setting-desc">priyanshu@example.com</div>
                  </div>
                </div>
                <div className="profile-setting-action">
                  <button className="profile-setting-btn">Change</button>
                </div>
              </div>

              <div className="profile-setting-row">
                <div className="profile-setting-left">
                  <div className="profile-setting-icon"><Crown size={17} /></div>
                  <div className="profile-setting-text">
                    <div className="profile-setting-label">Subscription</div>
                    <div className="profile-setting-desc">Pro Plan · Renews Aug 30, 2026</div>
                  </div>
                </div>
                <div className="profile-setting-action">
                  <button className="profile-setting-btn">Manage</button>
                </div>
              </div>

              <div className="profile-setting-row">
                <div className="profile-setting-left">
                  <div className="profile-setting-icon"><LogOut size={17} /></div>
                  <div className="profile-setting-text">
                    <div className="profile-setting-label">Sign Out</div>
                    <div className="profile-setting-desc">Sign out of your account on this device</div>
                  </div>
                </div>
                <div className="profile-setting-action">
                  <button className="profile-setting-btn">Sign Out</button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Notification Settings ── */}
          <motion.div className="profile-section" variants={itemV}>
            <h3 className="profile-section-title">
              <BellRing /> Notifications
            </h3>
            <div className="profile-settings-card">
              <div className="profile-setting-row">
                <div className="profile-setting-left">
                  <div className="profile-setting-icon"><Mail size={17} /></div>
                  <div className="profile-setting-text">
                    <div className="profile-setting-label">Email Notifications</div>
                    <div className="profile-setting-desc">Receive analysis results via email</div>
                  </div>
                </div>
                <div className="profile-setting-action">
                  <Toggle on={emailNotif} onToggle={() => setEmailNotif(!emailNotif)} />
                </div>
              </div>

              <div className="profile-setting-row">
                <div className="profile-setting-left">
                  <div className="profile-setting-icon"><Bell size={17} /></div>
                  <div className="profile-setting-text">
                    <div className="profile-setting-label">Push Notifications</div>
                    <div className="profile-setting-desc">Get notified when analysis is complete</div>
                  </div>
                </div>
                <div className="profile-setting-action">
                  <Toggle on={pushNotif} onToggle={() => setPushNotif(!pushNotif)} />
                </div>
              </div>

              <div className="profile-setting-row">
                <div className="profile-setting-left">
                  <div className="profile-setting-icon"><BarChart3 size={17} /></div>
                  <div className="profile-setting-text">
                    <div className="profile-setting-label">Weekly Report</div>
                    <div className="profile-setting-desc">Summary of your resume performance</div>
                  </div>
                </div>
                <div className="profile-setting-action">
                  <Toggle on={weeklyReport} onToggle={() => setWeeklyReport(!weeklyReport)} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Theme Settings ── */}
          <motion.div className="profile-section" variants={itemV}>
            <h3 className="profile-section-title">
              <Moon /> Appearance
            </h3>
            <div className="profile-settings-card">
              <div className="profile-setting-row">
                <div className="profile-setting-left">
                  <div className="profile-setting-icon"><Moon size={17} /></div>
                  <div className="profile-setting-text">
                    <div className="profile-setting-label">Theme</div>
                    <div className="profile-setting-desc">Choose your preferred appearance</div>
                  </div>
                </div>
                <div className="profile-setting-action">
                  <div className="profile-theme-options">
                    <button
                      className={`profile-theme-btn ${theme === 'dark' ? 'active' : ''}`}
                      onClick={() => setTheme('dark')}
                    >
                      <span className="profile-theme-dot dark" />
                      Dark
                    </button>
                    <button
                      className={`profile-theme-btn ${theme === 'light' ? 'active' : ''}`}
                      onClick={() => setTheme('light')}
                    >
                      <span className="profile-theme-dot light" />
                      Light
                    </button>
                    <button
                      className={`profile-theme-btn ${theme === 'system' ? 'active' : ''}`}
                      onClick={() => setTheme('system')}
                    >
                      <span className="profile-theme-dot system" />
                      System
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Danger Zone ── */}
          <motion.div className="profile-section profile-danger-zone" variants={itemV}>
            <h3 className="profile-section-title">
              <Trash2 /> Danger Zone
            </h3>
            <div className="profile-danger-card">
              <div className="profile-setting-row">
                <div className="profile-setting-left">
                  <div className="profile-setting-icon"><Trash2 size={17} /></div>
                  <div className="profile-setting-text">
                    <div className="profile-setting-label">Delete Account</div>
                    <div className="profile-setting-desc">Permanently delete your account and all data</div>
                  </div>
                </div>
                <div className="profile-setting-action">
                  <button className="profile-setting-btn danger">Delete Account</button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
