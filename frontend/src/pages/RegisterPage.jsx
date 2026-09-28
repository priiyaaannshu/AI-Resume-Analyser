import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Eye, EyeOff, Zap, TrendingUp, FileCheck, AlertCircle, Loader2 } from 'lucide-react'
import { registerUser, loginUser } from '../api/api'
import { useAuth } from '../context/AuthContext'
import './RegisterPage.css'

/* ── Particle Background ── */
function ParticleField() {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => {
      const left = Math.random() * 100
      const size = 1.5 + Math.random() * 2
      const duration = 14 + Math.random() * 18
      const delay = Math.random() * duration * -1
      const hue = Math.random() > 0.5 ? '260, 90%, 68%' : '185, 100%, 55%'
      const opacity = 0.2 + Math.random() * 0.35
      return (
        <span
          key={i}
          className="register-particle"
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

  return <div className="register-particles">{particles}</div>
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

/* ── Password Strength Helper ── */
function getPasswordStrength(password) {
  if (!password) return { level: 0, label: '' }
  let score = 0
  if (password.length >= 6) score++
  if (password.length >= 10) score++
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return { level: 1, label: 'Weak' }
  if (score === 2) return { level: 2, label: 'Fair' }
  if (score === 3) return { level: 3, label: 'Good' }
  return { level: 4, label: 'Strong' }
}

const strengthClasses = ['', 'weak', 'fair', 'good', 'strong']
const segmentClasses = ['', 'active-weak', 'active-fair', 'active-good', 'active-strong']

/* ── Main Register Page ── */
export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreePolicy, setAgreePolicy] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const strength = getPasswordStrength(password)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Client-side validation
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please fill in all fields.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (!agreePolicy) {
      setError('Please agree to the Privacy Policy and Terms of Service.')
      return
    }

    setLoading(true)
    try {
      // Register the user
      await registerUser({ name: name.trim(), email: email.trim(), password })

      // Auto-login after successful registration
      const authData = await loginUser({ email: email.trim(), password })
      login(authData.token, { name: name.trim(), email: email.trim() })
      navigate('/dashboard', { replace: true })
    } catch (err) {
      const msg = err?.response?.data?.message
        ?? err?.response?.data
        ?? 'Registration failed. This email may already be in use.'
      setError(typeof msg === 'string' ? msg : 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page">
      {/* Particles */}
      <ParticleField />

      {/* Noise */}
      <div className="noise-overlay" />

      {/* ──── Left Side — Form ──── */}
      <div className="register-left">
        <div className="register-card">
          {/* Brand */}
          <div className="register-brand">
            <div className="register-brand-icon">
              <BrandIcon />
            </div>
            <span className="register-brand-name">Resumix</span>
          </div>

          {/* Header */}
          <div className="register-header">
            <h1>Create Account</h1>
            <p>Start optimizing your career today.</p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="login-error-banner" role="alert">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form className="register-form" onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div className="input-group">
              <label htmlFor="register-name">Full Name</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <User size={18} />
                </span>
                <input
                  id="register-name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email */}
            <div className="input-group">
              <label htmlFor="register-email">Email</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <Mail size={18} />
                </span>
                <input
                  id="register-email"
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
              <label htmlFor="register-password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <Lock size={18} />
                </span>
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
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
              {/* Password Strength */}
              {password && (
                <>
                  <div className="password-strength">
                    {[1, 2, 3, 4].map((seg) => (
                      <div
                        key={seg}
                        className={`strength-segment ${seg <= strength.level ? segmentClasses[strength.level] : ''}`}
                      />
                    ))}
                  </div>
                  <div className={`strength-label ${strengthClasses[strength.level]}`}>
                    {strength.label}
                  </div>
                </>
              )}
            </div>

            {/* Confirm Password */}
            <div className="input-group">
              <label htmlFor="register-confirm">Confirm Password</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <Lock size={18} />
                </span>
                <input
                  id="register-confirm"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Privacy Policy */}
            <label className="agree-policy">
              <input
                type="checkbox"
                checked={agreePolicy}
                onChange={(e) => setAgreePolicy(e.target.checked)}
                disabled={loading}
              />
              <span>
                I agree to the{' '}
                <Link to="/privacy-policy">Privacy Policy</Link>
                {' '}and{' '}
                <Link to="/terms">Terms of Service</Link>
              </span>
            </label>

            {/* Create Account Button */}
            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 size={18} className="spin-icon" />
                  Creating account…
                </>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Divider */}
            <div className="register-divider">
              <div className="register-divider-line" />
              <span>or</span>
              <div className="register-divider-line" />
            </div>

            {/* Google */}
            <button type="button" className="register-google-btn" disabled={loading}>
              <GoogleIcon />
              Continue with Google
            </button>
          </form>

          {/* Footer */}
          <div className="register-footer">
            Already have an account?
            <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>

      {/* ──── Right Side — Illustration ──── */}
      <div className="register-right">
        <div className="register-right-bg" />
        <div className="register-right-grid" />
        <div className="register-right-glow register-right-glow-1" />
        <div className="register-right-glow register-right-glow-2" />

        <div className="register-right-content">
          {/* Illustration */}
          <div className="register-illustration-wrapper">
            <img
              src="/ai-improve-resume.png"
              alt="AI improving resumes"
              className="register-illustration"
            />

            {/* Floating Cards */}
            <div className="reg-floating-card reg-floating-card-1">
              <div className="reg-floating-icon">
                <Zap size={16} />
              </div>
              <div>
                <div style={{ fontSize: '11px', opacity: 0.6 }}>AI Enhancement</div>
                <div className="reg-floating-value">Instant</div>
              </div>
            </div>

            <div className="reg-floating-card reg-floating-card-2">
              <div className="reg-floating-icon">
                <TrendingUp size={16} />
              </div>
              <div>
                <div style={{ fontSize: '11px', opacity: 0.6 }}>Success Rate</div>
                <div className="reg-floating-value">3x higher</div>
              </div>
            </div>

            <div className="reg-floating-card reg-floating-card-3">
              <div className="reg-floating-icon">
                <FileCheck size={16} />
              </div>
              <div>
                <div style={{ fontSize: '11px', opacity: 0.6 }}>Resumes Analyzed</div>
                <div className="reg-floating-value">1M+</div>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="register-tagline">
            <h2>Transform your resume with AI</h2>
            <p>Join thousands of professionals landing dream jobs</p>
          </div>
        </div>
      </div>
    </div>
  )
}
