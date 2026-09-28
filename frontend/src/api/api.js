import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081'

/* ── Axios instance ── */
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

/* ── Request interceptor: attach JWT ── */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('resumix_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/* ── Auth API ── */

/**
 * Register a new user.
 * @param {{ name: string, email: string, password: string }} data
 */
export async function registerUser(data) {
  const response = await api.post('/api/users/register', data)
  return response.data
}

/**
 * Login and receive a JWT token.
 * @param {{ email: string, password: string }} data
 * @returns {{ token: string }}
 */
export async function loginUser(data) {
  const response = await api.post('/api/users/login', data)
  return response.data
}

/* ── Resume API ── */

/**
 * Upload a PDF resume for AI analysis.
 * @param {File} file
 * @param {function} onUploadProgress - progress callback (optional)
 * @returns {{ atsScore, summary, strengths, weaknesses, suggestions, skills }}
 */
export async function uploadResume(file, onUploadProgress) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await api.post('/api/resume/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress,
  })
  return response.data
}

export default api
