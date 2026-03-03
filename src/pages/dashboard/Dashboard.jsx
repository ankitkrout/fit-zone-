import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useGym } from '../../context/GymContext'
import { 
  Users, 
  UserCheck, 
  UserX, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function Dashboard() {
  const { getStats, getMonthlyRevenueData, getMembershipDistribution, members, isLoading } = useGym()
  const [stats, setStats] = useState(null)
  const [revenueData, setRevenueData] = useState([])
  const [distributionData, setDistributionData] = useState([])

  useEffect(() => {
    if (!isLoading) {
      setStats(getStats())
      setRevenueData(getMonthlyRevenueData())
      setDistributionData(getMembershipDistribution())
    }
  }, [isLoading, members])

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-darkCard rounded-xl skeleton"></div>
          ))}
        </div>
      </div>
    )
  }

  const statCards = [
    { 
      title: 'Total Members', 
      value: stats?.totalMembers || 0, 
      icon: Users, 
      color: 'from-blue-500 to-blue-600',
      change: '+12%'
    },
    { 
      title: 'Active Members', 
      value: stats?.activeMembers || 0, 
      icon: UserCheck, 
      color: 'from-green-500 to-green-600',
      change: '+8%'
    },
    { 
      title: 'Expired Members', 
      value: stats?.expiredMembers || 0, 
      icon: UserX, 
      color: 'from-red-500 to-red-600',
      change: '-5%'
    },
    { 
      title: 'Total Revenue', 
      value: `₹${(stats?.monthlyRevenue || 0).toLocaleString()}`, 
      icon: DollarSign, 
      color: 'from-purple-500 to-purple-600',
      change: '+15%'
    },
  ]

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-400 mt-1">Welcome back! Here's what's happening at your gym.</p>
      </motion.div>

      {/* Expiry Alert */}
      {stats?.expiringSoon && stats.expiringSoon.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-xl flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
            <div>
              <h3 className="font-semibold text-yellow-500">Expiry Alert</h3>
              <p className="text-sm text-gray-300">{stats.expiringSoon.length} membership(s) expiring within 7 days</p>
            </div>
          </div>
          <a href="/dashboard/members" className="px-4 py-2 bg-yellow-500 text-black rounded-lg font-medium hover:bg-yellow-400 transition">
            View All
          </a>
        </motion.div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-darkCard border border-darkBorder rounded-xl p-6 card-hover"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`flex items-center text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change.startsWith('+') ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-400 text-sm">{stat.title}</h3>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-darkCard border border-darkBorder rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Monthly Revenue</h3>
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
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
                <Bar dataKey="revenue" fill="#ff1a1a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Membership Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-darkCard border border-darkBorder rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Membership Distribution</h3>
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
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
            {distributionData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-400">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Members */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 bg-darkCard border border-darkBorder rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Recent Members</h3>
          <a href="/dashboard/members" className="text-primary hover:text-primaryDark text-sm">View All</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-darkBorder">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Phone</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Membership</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Expiry Date</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {members.slice(0, 5).map((member) => (
                <tr key={member.id} className="border-b border-darkBorder/50 hover:bg-darkLight/50">
                  <td className="py-3 px-4 text-white">{member.name}</td>
                  <td className="py-3 px-4 text-gray-400">{member.phone}</td>
                  <td className="py-3 px-4 text-gray-400 capitalize">{member.membershipType}</td>
                  <td className="py-3 px-4 text-gray-400">{member.expiryDate}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      member.status === 'active' 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-red-500/20 text-red-500'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

