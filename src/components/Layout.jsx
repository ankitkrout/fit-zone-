import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import Navbar from './Navbar'
import DashboardSidebar from './DashboardSidebar'

export default function Layout({ isDashboard = false }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  return (
    <div className="min-h-screen bg-dark">
      {/* Show Navbar only on public pages */}
      {!isDashboard && <Navbar />}

      <div className={`flex ${isDashboard ? 'pt-0' : ''}`}>
        {/* Dashboard Sidebar */}
        {isDashboard && (
          <DashboardSidebar 
            isOpen={sidebarOpen} 
            setIsOpen={setSidebarOpen} 
          />
        )}

        {/* Main Content */}
        <main 
          className={`flex-1 min-h-screen transition-all duration-300 ${
            isDashboard 
              ? sidebarOpen 
                ? 'ml-64' 
                : 'ml-16' 
              : ''
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Footer only on public pages */}
      {!isDashboard && <Footer />}
    </div>
  )
}

// Footer Component
import { FooterLogo } from '../assets/Logo'

function Footer() {
  return (
    <footer className="bg-black py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <FooterLogo />
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-secondary transition">About</a></li>
              <li><a href="#trainers" className="hover:text-secondary transition">Trainers</a></li>
              <li><a href="#plans" className="hover:text-secondary transition">Membership</a></li>
              <li><a href="#contact" className="hover:text-secondary transition">Contact</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📍 123 Fitness Street, Gym City</li>
              <li>📞 +91 9876543210</li>
              <li>✉️ info@ritikfitzone.com</li>
            </ul>
          </div>
          
          {/* Follow Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-darkBorder rounded-full flex items-center justify-center hover:bg-primary transition">
                <span className="text-lg">📘</span>
              </a>
              <a href="#" className="w-10 h-10 bg-darkBorder rounded-full flex items-center justify-center hover:bg-primary transition">
                <span className="text-lg">📸</span>
              </a>
              <a href="#" className="w-10 h-10 bg-darkBorder rounded-full flex items-center justify-center hover:bg-primary transition">
                <span className="text-lg">🐦</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-darkBorder mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 Ritik Fit Zone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

