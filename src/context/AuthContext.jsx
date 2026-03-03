import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  email: 'admin@gym.com',
  password: 'admin123'
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing auth state in localStorage
    const storedUser = localStorage.getItem('gymUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const login = (email, password) => {
    // Validate credentials
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const userData = {
        email: ADMIN_CREDENTIALS.email,
        name: 'Admin',
        role: 'admin'
      }
      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem('gymUser', JSON.stringify(userData))
      return { success: true }
    }
    return { success: false, message: 'Invalid email or password' }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('gymUser')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

