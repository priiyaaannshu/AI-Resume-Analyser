import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const AuthContext = createContext(null)

/* ── Decode JWT payload (no verify, client-side only) ── */
function parseJwtPayload(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const json = atob(base64)
    return JSON.parse(json)
  } catch {
    return {}
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)   // hydrating from localStorage

  /* ── Hydrate on mount ── */
  useEffect(() => {
    const token = localStorage.getItem('resumix_token')
    if (token) {
      const payload = parseJwtPayload(token)
      const now = Date.now() / 1000
      if (payload.exp && payload.exp > now) {
        setUser({
          email: payload.sub ?? '',
          name: localStorage.getItem('resumix_name') ?? payload.sub ?? 'User',
          token,
        })
      } else {
        // Token expired
        localStorage.removeItem('resumix_token')
        localStorage.removeItem('resumix_name')
      }
    }
    setLoading(false)
  }, [])

  /**
   * Save JWT + user info after login/register.
   * @param {string} token
   * @param {{ name?: string, email?: string }} userData
   */
  const login = useCallback((token, userData = {}) => {
    const payload = parseJwtPayload(token)
    const email = userData.email ?? payload.sub ?? ''
    const name = userData.name ?? email

    localStorage.setItem('resumix_token', token)
    localStorage.setItem('resumix_name', name)

    setUser({ email, name, token })
  }, [])

  /** Clear all auth state and stored data. */
  const logout = useCallback(() => {
    localStorage.removeItem('resumix_token')
    localStorage.removeItem('resumix_name')
    setUser(null)
  }, [])

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

/* ── Hook ── */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}
