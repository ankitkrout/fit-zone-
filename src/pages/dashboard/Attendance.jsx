import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGym } from '../../context/GymContext'
import { toast } from 'react-hot-toast'
import { 
  Calendar, 
  User, 
  CheckCircle, 
  XCircle, 
  Clock,
  ChevronLeft,
  ChevronRight,
  Search
} from 'lucide-react'

export default function Attendance() {
  const { members, attendance, markAttendance, getAttendancePercentage, isLoading } = useGym()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedMember, setSelectedMember] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Get days in current month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const days = new Date(year, month + 1, 0).getDate()
    return Array.from({ length: days }, (_, i) => {
      const d = new Date(year, month, i + 1)
      return d.toISOString().split('T')[0]
    })
  }

  const [currentMonth, setCurrentMonth] = useState(new Date())

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleMarkAttendance = (memberId, status) => {
    markAttendance(memberId, selectedDate, status)
  }

  const getAttendanceForMemberOnDate = (memberId, date) => {
    const record = attendance.find(a => a.memberId === memberId && a.date === date)
    return record?.status || null
  }

  const getMonthStats = (memberId) => {
    const days = getDaysInMonth(currentMonth)
    const memberAttendance = attendance.filter(
      a => a.memberId === memberId && days.includes(a.date)
    )
    if (memberAttendance.length === 0) return { present: 0, absent: 0, percentage: 0 }
    
    const present = memberAttendance.filter(a => a.status === 'present').length
    const total = memberAttendance.length
    return {
      present,
      absent: total - present,
      percentage: Math.round((present / total) * 100)
    }
  }

  if (isLoading) {
    return <div className="p-6"><div className="h-96 skeleton rounded-xl"></div></div>
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white">Attendance Management</h1>
        <p className="text-gray-400 mt-1">Track and manage member attendance</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar & Mark Attendance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Date Selector */}
          <div className="bg-darkCard border border-darkBorder rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                Select Date
              </h3>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 bg-dark border border-darkBorder rounded-lg text-white focus:outline-none focus:border-primary"
              />
            </div>

            {/* Search Member */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search member..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark border border-darkBorder rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
            </div>

            {/* Members List for Attendance */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredMembers.map((member) => {
                const status = getAttendanceForMemberOnDate(member.id, selectedDate)
                return (
                  <div 
                    key={member.id}
                    className="flex items-center justify-between p-4 bg-dark rounded-lg border border-darkBorder"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{member.name}</h4>
                        <p className="text-sm text-gray-400">{member.phone}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleMarkAttendance(member.id, 'present')}
                        className={`px-4 py-2 rounded-lg font-medium flex items-center transition ${
                          status === 'present'
                            ? 'bg-green-500 text-white'
                            : 'bg-green-500/20 text-green-500 hover:bg-green-500 hover:text-white'
                        }`}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Present
                      </button>
                      <button
                        onClick={() => handleMarkAttendance(member.id, 'absent')}
                        className={`px-4 py-2 rounded-lg font-medium flex items-center transition ${
                          status === 'absent'
                            ? 'bg-red-500 text-white'
                            : 'bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white'
                        }`}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Absent
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Monthly Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Month Navigation */}
          <div className="bg-darkCard border border-darkBorder rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="p-2 text-gray-400 hover:text-white hover:bg-darkBorder rounded-lg transition"
              >
                <ChevronLeft size={20} />
              </button>
              <h3 className="text-lg font-semibold text-white">
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h3>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="p-2 text-gray-400 hover:text-white hover:bg-darkBorder rounded-lg transition"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="text-center text-xs text-gray-500 py-2">
                  {day}
                </div>
              ))}
              {getDaysInMonth(currentMonth).map((date) => {
                const dayNum = new Date(date).getDate()
                const isToday = date === new Date().toISOString().split('T')[0]
                return (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`text-sm py-2 rounded-lg transition ${
                      date === selectedDate
                        ? 'bg-primary text-white'
                        : isToday
                        ? 'bg-primary/20 text-primary'
                        : 'text-gray-400 hover:bg-darkBorder'
                    }`}
                  >
                    {dayNum}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Member Attendance Summary */}
          <div className="bg-darkCard border border-darkBorder rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-primary" />
              Monthly Summary
            </h3>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {members.map((member) => {
                const stats = getMonthStats(member.id)
                return (
                  <div key={member.id} className="p-3 bg-dark rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{member.name}</span>
                      <span className={`text-sm font-bold ${
                        stats.percentage >= 75 ? 'text-green-500' : 
                        stats.percentage >= 50 ? 'text-yellow-500' : 'text-red-500'
                      }`}>
                        {stats.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-darkBorder rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          stats.percentage >= 75 ? 'bg-green-500' : 
                          stats.percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${stats.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-400">
                      <span>Present: {stats.present}</span>
                      <span>Absent: {stats.absent}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

