import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGym } from '../../context/GymContext'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts'
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity,
  Download,
  Calendar
} from 'lucide-react'

export default function Reports() {
  const { members, payments, getStats, getMonthlyRevenueData, getMembershipDistribution, isLoading } = useGym()
  const [timeRange, setTimeRange] = useState('6months')

  useEffect(() => {
    if (!isLoading) {
      // Data is loaded from context
    }
  }, [isLoading])

  const stats = getStats()
  const revenueData = getMonthlyRevenueData()
  const membershipData = getMembershipDistribution()

  // Calculate growth data
  const getGrowthData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months.map((month, index) => {
      const newMembers = members.filter(m => {
        const joinMonth = new Date(m.joinDate).getMonth()
        return joinMonth === index
      }).length
      return {
        name: month,
        members: newMembers,
        revenue: revenueData[index]?.revenue || 0
      }
    })
  }

  const growthData = getGrowthData()

  // Active vs Inactive
  const activeVsInactive = [
    { name: 'Active', value: stats.activeMembers, color: '#22c55e' },
    { name: 'Inactive', value: stats.expiredMembers, color: '#ef4444' }
  ]

  // Monthly comparison
  const monthlyComparison = revenueData.map((item, index) => ({
    month: item.name,
    revenue: item.revenue,
    members: growthData[index]?.members || 0
  }))

  if (isLoading) {
    return <div className="p-6"><div className="h-96 skeleton rounded-xl"></div></div>
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Reports & Analytics</h1>
          <p className="text-gray-400 mt-1">Detailed insights into your gym performance</p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-darkCard border border-darkBorder rounded-lg text-white focus:outline-none focus:border-primary"
          >
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="12months">Last 12 Months</option>
          </select>
          <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primaryDark transition flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-darkCard border border-darkBorder rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-green-500 text-sm flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12%
            </span>
          </div>
          <h3 className="text-gray-400 text-sm">Total Members</h3>
          <p className="text-2xl font-bold text-white">{stats.totalMembers}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-darkCard border border-darkBorder rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-500" />
            </div>
            <span className="text-green-500 text-sm flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +8%
            </span>
          </div>
          <h3 className="text-gray-400 text-sm">Active Members</h3>
          <p className="text-2xl font-bold text-white">{stats.activeMembers}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-darkCard border border-darkBorder rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
            <span className="text-green-500 text-sm flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +15%
            </span>
          </div>
          <h3 className="text-gray-400 text-sm">Total Revenue</h3>
          <p className="text-2xl font-bold text-white">₹{stats.monthlyRevenue.toLocaleString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-darkCard border border-darkBorder rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-red-500 text-sm flex items-center">
              <TrendingUp className="w-4 h-4 mr-1 rotate-180" />
              -5%
            </span>
          </div>
          <h3 className="text-gray-400 text-sm">Expired Members</h3>
          <p className="text-2xl font-bold text-white">{stats.expiredMembers}</p>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-darkCard border border-darkBorder rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Revenue Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff1a1a" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ff1a1a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    background: '#181818', 
                    border: '1px solid #333',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#ff1a1a" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Membership Growth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-darkCard border border-darkBorder rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Membership Growth</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    background: '#181818', 
                    border: '1px solid #333',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="members" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Second Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active vs Inactive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-darkCard border border-darkBorder rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Active vs Inactive Members</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={activeVsInactive}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {activeVsInactive.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    background: '#181818', 
                    border: '1px solid #333',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {activeVsInactive.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-400">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Membership Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-darkCard border border-darkBorder rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Membership Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={membershipData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {membershipData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    background: '#181818', 
                    border: '1px solid #333',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Monthly Revenue Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-darkCard border border-darkBorder rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Monthly Revenue</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    background: '#181818', 
                    border: '1px solid #333',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="revenue" fill="#ff6b6b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

