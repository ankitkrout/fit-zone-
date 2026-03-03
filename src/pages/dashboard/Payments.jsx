import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGym } from '../../context/GymContext'
import { toast } from 'react-hot-toast'
import { 
  CreditCard, 
  DollarSign, 
  Search, 
  Plus, 
  X, 
  CheckCircle, 
  XCircle,
  Download,
  Filter,
  Calendar
} from 'lucide-react'

export default function Payments() {
  const { members, payments, addPayment, getPaymentsForMember, membershipPrices, isLoading } = useGym()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [paymentData, setPaymentData] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    method: 'Cash',
    status: 'paid'
  })

  // Filter payments
  const filteredPayments = payments.filter(payment => {
    const member = members.find(m => m.id === payment.memberId)
    const memberName = member?.name || ''
    const matchesSearch = memberName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || payment.status === filterStatus
    return matchesSearch && matchesFilter
  }).sort((a, b) => new Date(b.date) - new Date(a.date))

  // Calculate stats
  const totalPaid = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0)
  const totalDue = payments.filter(p => p.status === 'due').reduce((sum, p) => sum + p.amount, 0)
  const thisMonthPayments = payments.filter(p => {
    const paymentDate = new Date(p.date)
    const now = new Date()
    return paymentDate.getMonth() === now.getMonth() && 
           paymentDate.getFullYear() === now.getFullYear() &&
           p.status === 'paid'
  })
  const thisMonthRevenue = thisMonthPayments.reduce((sum, p) => sum + p.amount, 0)

  const handleAddPayment = (e) => {
    e.preventDefault()
    if (!selectedMember) return

    addPayment({
      memberId: selectedMember.id,
      amount: parseFloat(paymentData.amount),
      date: paymentData.date,
      method: paymentData.method,
      status: paymentData.status
    })

    setShowModal(false)
    resetForm()
  }

  const resetForm = () => {
    setSelectedMember(null)
    setPaymentData({
      amount: '',
      date: new Date().toISOString().split('T')[0],
      method: 'Cash',
      status: 'paid'
    })
  }

  const openPaymentModal = (member) => {
    setSelectedMember(member)
    setPaymentData({
      ...paymentData,
      amount: member.fees?.toString() || ''
    })
    setShowModal(true)
  }

  const getMemberName = (memberId) => {
    const member = members.find(m => m.id === memberId)
    return member?.name || 'Unknown'
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
        className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Payment Management</h1>
          <p className="text-gray-400 mt-1">Track and manage all payments</p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-darkCard border border-darkBorder rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <h3 className="text-gray-400 text-sm">Total Paid</h3>
          <p className="text-2xl font-bold text-green-500">₹{totalPaid.toLocaleString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-darkCard border border-darkBorder rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-500" />
            </div>
          </div>
          <h3 className="text-gray-400 text-sm">Total Due</h3>
          <p className="text-2xl font-bold text-red-500">₹{totalDue.toLocaleString()}</p>
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
          </div>
          <h3 className="text-gray-400 text-sm">This Month Revenue</h3>
          <p className="text-2xl font-bold text-primary">₹{thisMonthRevenue.toLocaleString()}</p>
        </motion.div>
      </div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-darkCard border border-darkBorder rounded-xl p-4 mb-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search by member name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-dark border border-darkBorder rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="text-gray-500" size={20} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-dark border border-darkBorder rounded-lg text-white focus:outline-none focus:border-primary"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="due">Due</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Due Payments Alert */}
      {payments.filter(p => p.status === 'due').length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl"
        >
          <h3 className="font-semibold text-red-500 mb-2">
            ⚠️ {payments.filter(p => p.status === 'due').length} Payment(s) Due
          </h3>
          <p className="text-sm text-gray-400">
            Members with outstanding payments need immediate attention
          </p>
        </motion.div>
      )}

      {/* Add Payment Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Record New Payment</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {members.filter(m => m.status === 'active').slice(0, 4).map((member) => (
            <button
              key={member.id}
              onClick={() => openPaymentModal(member)}
              className="p-4 bg-darkCard border border-darkBorder rounded-xl text-left hover:border-primary transition"
            >
              <p className="font-medium text-white">{member.name}</p>
              <p className="text-sm text-gray-400">₹{member.fees?.toLocaleString()}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Payments Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-darkCard border border-darkBorder rounded-xl overflow-hidden"
      >
        <div className="p-4 border-b border-darkBorder">
          <h3 className="text-lg font-semibold text-white">Payment History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-darkBorder">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Member</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Method</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-b border-darkBorder/50 hover:bg-darkLight/50">
                  <td className="py-3 px-4 text-white font-medium">{getMemberName(payment.memberId)}</td>
                  <td className="py-3 px-4 text-white">₹{payment.amount.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-400">{payment.date}</td>
                  <td className="py-3 px-4 text-gray-400">{payment.method}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'paid' 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-red-500/20 text-red-500'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition">
                      <Download size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredPayments.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No payments found</p>
          </div>
        )}
      </motion.div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-darkCard border border-darkBorder rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Record Payment</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-darkBorder rounded-lg transition"
                >
                  <X size={20} />
                </button>
              </div>

              {selectedMember && (
                <div className="mb-6 p-4 bg-dark rounded-lg">
                  <p className="text-gray-400 text-sm">Member</p>
                  <p className="text-white font-medium">{selectedMember.name}</p>
                </div>
              )}

              <form onSubmit={handleAddPayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Amount (₹)</label>
                  <input
                    type="number"
                    required
                    value={paymentData.amount}
                    onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                    className="w-full px-4 py-3 bg-dark border border-darkBorder rounded-lg text-white focus:outline-none focus:border-primary"
                    placeholder="1500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Payment Date</label>
                  <input
                    type="date"
                    required
                    value={paymentData.date}
                    onChange={(e) => setPaymentData({ ...paymentData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-dark border border-darkBorder rounded-lg text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Payment Method</label>
                  <select
                    value={paymentData.method}
                    onChange={(e) => setPaymentData({ ...paymentData, method: e.target.value })}
                    className="w-full px-4 py-3 bg-dark border border-darkBorder rounded-lg text-white focus:outline-none focus:border-primary"
                  >
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="UPI">UPI</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                  <select
                    value={paymentData.status}
                    onChange={(e) => setPaymentData({ ...paymentData, status: e.target.value })}
                    className="w-full px-4 py-3 bg-dark border border-darkBorder rounded-lg text-white focus:outline-none focus:border-primary"
                  >
                    <option value="paid">Paid</option>
                    <option value="due">Due</option>
                  </select>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 bg-darkBorder text-white rounded-lg font-medium hover:bg-darkLight transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primaryDark transition"
                  >
                    Record Payment
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

