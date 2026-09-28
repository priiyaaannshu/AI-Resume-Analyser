import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Clock, FolderOpen, BarChart3, Settings,
  Menu, Bell, HardDrive,
  Moon, Sun, Monitor, Globe, Shield, Download, Trash2,
  Key, Link2, BellRing, Mail, Smartphone, FileText,
  Eye, EyeOff, RefreshCw, Code, Unlink, Lock
} from 'lucide-react'
import './SettingsPage.css'

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

/* Social icons (inline SVG) */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#0A66C2">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

const sidebarNav = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { id: 'history', label: 'History', icon: Clock, to: '/history' },
  { id: 'library', label: 'Resume Library', icon: FolderOpen },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, to: '/analytics' },
  { id: 'settings', label: 'Settings', icon: Settings, active: true },
]

/* ── Toggle ── */
function Toggle({ on, onToggle }) {
  return (
    <div className={`settings-toggle ${on ? 'on' : ''}`} onClick={onToggle}>
      <div className="settings-toggle-knob" />
    </div>
  )
}

/* ── Animations ── */
const cV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }
const iV = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }

/* ══════════════════════════════════════════
   Main Settings Page
   ══════════════════════════════════════════ */
export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [emailNotif, setEmailNotif] = useState(true)
  const [pushNotif, setPushNotif] = useState(false)
  const [weeklyDigest, setWeeklyDigest] = useState(true)
  const [profileVisible, setProfileVisible] = useState(false)
  const [shareAnalytics, setShareAnalytics] = useState(false)
  const [language, setLanguage] = useState('en')
  const [theme, setTheme] = useState('dark')

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
            <span className="results-topbar-title">Settings</span>
          </div>
          <div className="results-topbar-right">
            <button className="dash-topbar-btn"><Bell size={18} /></button>
            <div className="dash-avatar">P</div>
          </div>
        </div>

        <motion.div className="settings-content" variants={cV} initial="hidden" animate="visible">
          {/* Header */}
          <motion.div className="settings-page-header" variants={iV}>
            <h1>Settings</h1>
            <p>Manage your preferences and account</p>
          </motion.div>

          {/* ── Appearance ── */}
          <motion.div className="settings-section" variants={iV}>
            <h3 className="settings-section-title"><Moon /> Appearance</h3>
            <div className="settings-card">
              <div className="settings-row">
                <div className="settings-row-left">
                  <div className="settings-row-icon"><Moon size={17} /></div>
                  <div className="settings-row-text">
                    <div className="settings-row-label">Dark Mode</div>
                    <div className="settings-row-desc">Use dark theme across the app</div>
                  </div>
                </div>
                <div className="settings-row-action">
                  <Toggle on={darkMode} onToggle={() => setDarkMode(!darkMode)} />
                </div>
              </div>

              <div className="settings-row">
                <div className="settings-row-left">
                  <div className="settings-row-icon"><Monitor size={17} /></div>
                  <div className="settings-row-text">
                    <div className="settings-row-label">Theme Preference</div>
                    <div className="settings-row-desc">Sync with your system theme</div>
                  </div>
                </div>
                <div className="settings-row-action">
                  <select className="settings-select" value={theme} onChange={(e) => setTheme(e.target.value)}>
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                    <option value="system">System</option>
                  </select>
                </div>
              </div>

              <div className="settings-row">
                <div className="settings-row-left">
                  <div className="settings-row-icon"><Globe size={17} /></div>
                  <div className="settings-row-text">
                    <div className="settings-row-label">Language</div>
                    <div className="settings-row-desc">Set your preferred display language</div>
                  </div>
                </div>
                <div className="settings-row-action">
                  <select className="settings-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="ja">日本語</option>
                    <option value="hi">हिन्दी</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Notifications ── */}
          <motion.div className="settings-section" variants={iV}>
            <h3 className="settings-section-title"><BellRing /> Notifications</h3>
            <div className="settings-card">
              <div className="settings-row">
                <div className="settings-row-left">
                  <div className="settings-row-icon"><Mail size={17} /></div>
                  <div className="settings-row-text">
                    <div className="settings-row-label">Email Notifications</div>
                    <div className="settings-row-desc">Analysis results and account updates</div>
                  </div>
                </div>
                <div className="settings-row-action">
                  <Toggle on={emailNotif} onToggle={() => setEmailNotif(!emailNotif)} />
                </div>
              </div>

              <div className="settings-row">
                <div className="settings-row-left">
                  <div className="settings-row-icon"><Smartphone size={17} /></div>
                  <div className="settings-row-text">
                    <div className="settings-row-label">Push Notifications</div>
                    <div className="settings-row-desc">Real-time alerts for completed analyses</div>
                  </div>
                </div>
                <div className="settings-row-action">
                  <Toggle on={pushNotif} onToggle={() => setPushNotif(!pushNotif)} />
                </div>
              </div>

              <div className="settings-row">
                <div className="settings-row-left">
                  <div className="settings-row-icon"><FileText size={17} /></div>
                  <div className="settings-row-text">
                    <div className="settings-row-label">Weekly Digest</div>
                    <div className="settings-row-desc">Summary of your resume performance</div>
                  </div>
                </div>
                <div className="settings-row-action">
                  <Toggle on={weeklyDigest} onToggle={() => setWeeklyDigest(!weeklyDigest)} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Privacy ── */}
          <motion.div className="settings-section" variants={iV}>
            <h3 className="settings-section-title"><Shield /> Privacy</h3>
            <div className="settings-card">
              <div className="settings-row">
                <div className="settings-row-left">
                  <div className="settings-row-icon">{profileVisible ? <Eye size={17} /> : <EyeOff size={17} />}</div>
                  <div className="settings-row-text">
                    <div className="settings-row-label">Profile Visibility</div>
                    <div className="settings-row-desc">Make your profile visible to recruiters</div>
                  </div>
                </div>
                <div className="settings-row-action">
                  <Toggle on={profileVisible} onToggle={() => setProfileVisible(!profileVisible)} />
                </div>
              </div>

              <div className="settings-row">
                <div className="settings-row-left">
                  <div className="settings-row-icon"><BarChart3 size={17} /></div>
                  <div className="settings-row-text">
                    <div className="settings-row-label">Share Analytics</div>
                    <div className="settings-row-desc">Help us improve with anonymous usage data</div>
                  </div>
                </div>
                <div className="settings-row-action">
                  <Toggle on={shareAnalytics} onToggle={() => setShareAnalytics(!shareAnalytics)} />
                </div>
              </div>

              <div className="settings-row">
                <div className="settings-row-left">
                  <div className="settings-row-icon"><Lock size={17} /></div>
                  <div className="settings-row-text">
                    <div className="settings-row-label">Two-Factor Authentication</div>
                    <div className="settings-row-desc">Add an extra layer of security</div>
                  </div>
                </div>
                <div className="settings-row-action">
                  <button className="settings-btn primary">Enable</button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Connected Accounts ── */}
          <motion.div className="settings-section" variants={iV}>
            <h3 className="settings-section-title"><Link2 /> Connected Accounts</h3>
            <div className="settings-card">
              <div className="settings-row">
                <div className="settings-row-left">
                  <div className="settings-connected-icon google"><GoogleIcon /></div>
                  <div className="settings-row-text">
                    <div className="settings-row-label">Google</div>
                    <div className="settings-row-desc">priyanshu@gmail.com</div>
                  </div>
                </div>
                <div className="settings-row-action">
                  <span className="settings-connected-status linked">Connected</span>
                  <button className="settings-btn danger"><Unlink size={12} /> Disconnect</button>
                </div>
              </div>

              <div className="settings-row">
                <div className="settings-row-left">
                  <div className="settings-connected-icon github"><GitHubIcon /></div>
                  <div className="settings-row-text">
                    <div className="settings-row-label">GitHub</div>
                    <div className="settings-row-desc">Not connected</div>
                  </div>
                </div>
                <div className="settings-row-action">
                  <span className="settings-connected-status unlinked">Not linked</span>
                  <button className="settings-btn"><Link2 size={12} /> Connect</button>
                </div>
              </div>

              <div className="settings-row">
                <div className="settings-row-left">
                  <div className="settings-connected-icon linkedin"><LinkedInIcon /></div>
                  <div className="settings-row-text">
                    <div className="settings-row-label">LinkedIn</div>
                    <div className="settings-row-desc">Not connected</div>
                  </div>
                </div>
                <div className="settings-row-action">
                  <span className="settings-connected-status unlinked">Not linked</span>
                  <button className="settings-btn"><Link2 size={12} /> Connect</button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── API Usage ── */}
          <motion.div className="settings-section" variants={iV}>
            <h3 className="settings-section-title"><Code /> API Usage</h3>
            <div className="settings-card">
              <div className="settings-row">
                <div className="settings-row-left">
                  <div className="settings-row-icon"><Key size={17} /></div>
                  <div className="settings-row-text">
                    <div className="settings-row-label">API Key</div>
                    <div className="settings-row-desc">sk-****************************7x3f</div>
                  </div>
                </div>
                <div className="settings-row-action">
                  <button className="settings-btn"><RefreshCw size={12} /> Regenerate</button>
                </div>
              </div>

              <div className="settings-row">
                <div className="settings-row-left">
                  <div className="settings-row-icon"><BarChart3 size={17} /></div>
                  <div className="settings-row-text">
                    <div className="settings-row-label">Monthly Usage</div>
                    <div className="settings-row-desc">Pro plan — 1,000 requests/month</div>
                  </div>
                </div>
                <div className="settings-row-action">
                  <div className="settings-api-usage">
                    <div className="settings-api-bar-track">
                      <motion.div
                        className="settings-api-bar-fill"
                        initial={{ width: '0%' }}
                        animate={{ width: '62%' }}
                        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                    <div className="settings-api-label">
                      <span>620 used</span>
                      <span>1,000 limit</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Data ── */}
          <motion.div className="settings-section" variants={iV}>
            <h3 className="settings-section-title"><Download /> Data</h3>
            <div className="settings-card">
              <div className="settings-row">
                <div className="settings-row-left">
                  <div className="settings-row-icon"><Download size={17} /></div>
                  <div className="settings-row-text">
                    <div className="settings-row-label">Export All Data</div>
                    <div className="settings-row-desc">Download your resumes, reports, and analytics</div>
                  </div>
                </div>
                <div className="settings-row-action">
                  <button className="settings-btn"><Download size={12} /> Export ZIP</button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Danger Zone ── */}
          <motion.div className="settings-section" variants={iV}>
            <h3 className="settings-section-title"><Trash2 /> Danger Zone</h3>
            <div className="settings-danger-card">
              <div className="settings-row">
                <div className="settings-row-left">
                  <div className="settings-row-icon"><Trash2 size={17} /></div>
                  <div className="settings-row-text">
                    <div className="settings-row-label">Delete Account</div>
                    <div className="settings-row-desc">Permanently delete your account and all associated data</div>
                  </div>
                </div>
                <div className="settings-row-action">
                  <button className="settings-btn danger">Delete Account</button>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </main>
    </div>
  )
}
