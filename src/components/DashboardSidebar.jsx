import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  CreditCard, 
  BarChart3, 
  Calculator,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react'
import Logo, { LogoIcon } from '../assets/Logo'

export default function DashboardSidebar({ isOpen, setIsOpen }) {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Members', icon: Users, path: '/dashboard/members' },
    { name: 'Attendance', icon: Calendar, path: '/dashboard/attendance' },
    { name: 'Payments', icon: CreditCard, path: '/dashboard/payments' },
    { name: 'Reports', icon: BarChart3, path: '/dashboard/reports' },
    { name: 'BMI Calculator', icon: Calculator, path: '/dashboard/bmi-calculator' },
  ]

  // Mobile backdrop
  const MobileBackdrop = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
    />
  )

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && <MobileBackdrop />}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ 
          width: isOpen ? 256 : 80,
          x: isOpen || window.innerWidth >= 1024 ? 0 : -256
        }}
        transition={{ duration: 0.3 }}
        className={`fixed left-0 top-0 h-screen bg-darkLight border-r border-darkBorder z-40 flex flex-col
          ${isOpen ? 'lg:relative' : 'lg:relative'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-darkBorder">
          <NavLink to="/" className="flex items-center space-x-2" onClick={handleClose}>
            {isOpen ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center"
              >
                <Logo size="sm" className="h-10" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <LogoIcon className="h-10 w-10" />
              </motion.div>
            )}
          </NavLink>
          
          <div className="flex items-center space-x-2">
            {/* Mobile Close Button */}
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-lg bg-darkBorder flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-colors lg:hidden"
            >
              <X size={18} />
            </button>
            {/* Desktop Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-8 h-8 rounded-lg bg-darkBorder flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-colors hidden lg:flex"
            >
              {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleClose}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'text-gray-400 hover:bg-darkBorder hover:text-white'
                }`
              }
            >
              <item.icon size={22} className="flex-shrink-0" />
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-medium truncate"
                >
                  {item.name}
                </motion.span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User & Logout */}
        <div className="p-3 border-t border-darkBorder">
          {isOpen && (
            <div className="px-3 py-2 mb-2">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-400 hover:bg-red-500/20 hover:text-red-500 transition-colors"
          >
            <LogOut size={22} className="flex-shrink-0" />
            {isOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium"
              >
                Logout
              </motion.span>
            )}
          </button>
        </div>
      </motion.aside>
    </>
  )
}

