import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

// Context
import { AuthProvider } from './context/AuthContext'
import { GymProvider } from './context/GymContext'

// Layout
import Layout from './components/Layout'

// Public Pages
import Home from './pages/Home'
import Login from './pages/Login'

// Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard'
import Members from './pages/dashboard/Members'
import Attendance from './pages/dashboard/Attendance'
import Payments from './pages/dashboard/Payments'
import Reports from './pages/dashboard/Reports'
import BMICalculator from './pages/dashboard/BMICalculator'

// Components
import PrivateRoute from './components/PrivateRoute'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold gradient-text">FitZone</h2>
          <p className="text-gray-400 mt-2">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthProvider>
      <GymProvider>
        <Router>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#181818',
                color: '#fff',
                border: '1px solid #ff1a1a',
              },
            }}
          />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />

            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={<PrivateRoute><Layout isDashboard /></PrivateRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="members" element={<Members />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="payments" element={<Payments />} />
              <Route path="reports" element={<Reports />} />
              <Route path="bmi-calculator" element={<BMICalculator />} />
            </Route>

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </GymProvider>
    </AuthProvider>
  )
}

export default App

