import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Wraps a route element and redirects to /login
 * if the user is not authenticated.
 * Preserves the intended path in location state so
 * LoginPage can redirect back after successful login.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  // While hydrating from localStorage, render nothing to avoid a flash
  if (loading) return null

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
