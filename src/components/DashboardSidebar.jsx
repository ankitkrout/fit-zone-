import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
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
  ChevronRight
} from 'lucide-react'
import Logo, { LogoIcon } from '../assets/Logo'

export default function DashboardSidebar({ isOpen, setIsOpen }) {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Members', icon: Users, path: '/dashboard/members' },
    { name: 'Attendance', icon: Calendar, path: '/dashboard/attendance' },
    { name: 'Payments', icon: CreditCard, path: '/dashboard/payments' },
    { name: 'Reports', icon: BarChart3, path: '/dashboard/reports' },
    { name: 'BMI Calculator', icon: Calculator, path: '/dashboard/bmi-calculator' },
  ]

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 256 : 80 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-screen bg-darkLight border-r border-darkBorder z-40 flex flex-col"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-darkBorder">
        <NavLink to="/" className="flex items-center space-x-2">
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
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-8 h-8 rounded-lg bg-darkBorder flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-colors"
        >
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
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
                className="font-medium"
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
            <p className="text-sm font-medium text-white">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
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
  )
}

