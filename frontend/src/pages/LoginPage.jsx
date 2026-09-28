import { useState, useMemo } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Sparkles, BarChart3, Shield, AlertCircle, Loader2 } from 'lucide-react'
import { loginUser } from '../api/api'
import { useAuth } from '../context/AuthContext'
import './LoginPage.css'

/* ── Particle Background ── */
function ParticleField() {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => {
      const left = Math.random() * 100
      const size = 1.5 + Math.random() * 2
      const duration = 12 + Math.random() * 20
      const delay = Math.random() * duration * -1
      const hue = Math.random() > 0.5 ? '240, 100%, 70%' : '180, 100%, 60%'
      const opacity = 0.2 + Math.random() * 0.4
      return (
        <span
          key={i}
          className="login-particle"
          style={{
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            background: `hsla(${hue}, ${opacity})`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        />
      )
    })
  }, [])

  return <div className="login-particles">{particles}</div>
}

/* ── Google Icon SVG ── */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

/* ── Resumix Brand Logo ── */
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

/* ── Main Login Page ── */
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect to original page if available, otherwise dashboard
  const from = location.state?.from?.pathname ?? '/dashboard'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.')
      return
    }

    setLoading(true)
    try {
      const data = await loginUser({ email: email.trim(), password })
      login(data.token, { email: email.trim() })
      navigate(from, { replace: true })
    } catch (err) {
      const msg = err?.response?.data?.message
        ?? err?.response?.data
        ?? 'Invalid credentials. Please try again.'
      setError(typeof msg === 'string' ? msg : 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      {/* Background Particles */}
      <ParticleField />

      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* ──── Left Side ──── */}
      <div className="login-left">
        <div className="login-left-bg" />
        <div className="login-left-grid" />
        <div className="login-left-glow login-left-glow-1" />
        <div className="login-left-glow login-left-glow-2" />

        <div className="login-left-content">
          {/* Illustration */}
          <div className="login-illustration-wrapper">
            <img
              src="/ai-resume-illustration.png"
              alt="AI Resume Analysis"
              className="login-illustration"
            />

            {/* Floating Cards */}
            <div className="floating-card floating-card-1">
              <div className="floating-card-icon">
                <Sparkles size={16} />
              </div>
              <div>
                <div style={{ fontSize: '11px', opacity: 0.6 }}>ATS Score</div>
                <div className="floating-card-value">96/100</div>
              </div>
            </div>

            <div className="floating-card floating-card-2">
              <div className="floating-card-icon">
                <BarChart3 size={16} />
              </div>
              <div>
                <div style={{ fontSize: '11px', opacity: 0.6 }}>Optimization</div>
                <div className="floating-card-value">+42%</div>
              </div>
            </div>

            <div className="floating-card floating-card-3">
              <div className="floating-card-icon">
                <Shield size={16} />
              </div>
              <div>
                <div style={{ fontSize: '11px', opacity: 0.6 }}>Keywords</div>
                <div className="floating-card-value">18 matched</div>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="login-tagline">
            <h2>AI-powered resume optimization</h2>
            <p>Land your dream job with intelligent insights</p>
          </div>
        </div>
      </div>

      {/* ──── Right Side ──── */}
      <div className="login-right">
        <div className="login-card">
          {/* Brand */}
          <div className="login-brand">
            <div className="login-brand-icon">
              <BrandIcon />
            </div>
            <span className="login-brand-name">Resumix</span>
          </div>

          {/* Header */}
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Continue your career journey.</p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="login-error-banner" role="alert">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="input-group">
              <label htmlFor="login-email">Email</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <Mail size={18} />
                </span>
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="input-group">
              <label htmlFor="login-password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <Lock size={18} />
                </span>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 size={18} className="spin-icon" />
                  Signing in…
                </>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Divider */}
            <div className="login-divider">
              <div className="login-divider-line" />
              <span>or</span>
              <div className="login-divider-line" />
            </div>

            {/* Google Button */}
            <button type="button" className="google-btn">
              <GoogleIcon />
              Continue with Google
            </button>
          </form>

          {/* Footer */}
          <div className="login-footer">
            Don't have an account?
            <Link to="/signup">Create account</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
