import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGym } from '../../context/GymContext'
import { toast } from 'react-hot-toast'
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  User,
  Phone,
  Mail,
  Calendar,
  Filter,
  Download
} from 'lucide-react'

export default function Members() {
  const { members, addMember, updateMember, deleteMember, membershipPrices, isLoading } = useGym()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    membershipType: 'monthly',
    joinDate: new Date().toISOString().split('T')[0],
    height: '',
    weight: ''
  })

  // Filter members
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || member.membershipType === filterType
    return matchesSearch && matchesFilter
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingMember) {
      updateMember(editingMember.id, formData)
    } else {
      addMember(formData)
    }
    setShowModal(false)
    resetForm()
  }

  const handleEdit = (member) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      phone: member.phone,
      email: member.email,
      membershipType: member.membershipType,
      joinDate: member.joinDate,
      height: member.height || '',
      weight: member.weight || ''
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      deleteMember(id)
    }
  }

  const resetForm = () => {
    setEditingMember(null)
    setFormData({
      name: '',
      phone: '',
      email: '',
      membershipType: 'monthly',
      joinDate: new Date().toISOString().split('T')[0],
      height: '',
      weight: ''
    })
  }

  const openAddModal = () => {
    resetForm()
    setShowModal(true)
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
          <h1 className="text-3xl font-bold text-white">Member Management</h1>
          <p className="text-gray-400 mt-1">Manage all gym members in one place</p>
        </div>
        <button
          onClick={openAddModal}
          className="mt-4 md:mt-0 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primaryDark transition flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" /> Add Member
        </button>
      </motion.div>

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
              placeholder="Search by name, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-dark border border-darkBorder rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="text-gray-500" size={20} />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 bg-dark border border-darkBorder rounded-lg text-white focus:outline-none focus:border-primary"
            >
              <option value="all">All Types</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Members Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
      {filteredMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-darkCard border border-darkBorder rounded-xl p-6 card-hover"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    member.status === 'active' 
                      ? 'bg-green-500/20 text-green-500' 
                      : 'bg-red-500/20 text-red-500'
                  }`}>
                    {member.status}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(member)}
                  className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-3" />
                <span>{member.phone}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-3" />
                <span className="truncate">{member.email}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Calendar className="w-4 h-4 mr-3" />
                <span>Expires: {member.expiryDate}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-darkBorder flex items-center justify-between">
              <span className="text-sm text-gray-400 capitalize">{member.membershipType}</span>
              <span className="text-lg font-bold text-primary">₹{member.fees?.toLocaleString()}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No members found</p>
        </div>
      )}

      {/* Add/Edit Modal */}
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
              className="bg-darkCard border border-darkBorder rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {editingMember ? 'Edit Member' : 'Add New Member'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-darkBorder rounded-lg transition"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-dark border border-darkBorder rounded-lg text-white focus:outline-none focus:border-primary"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-dark border border-darkBorder rounded-lg text-white focus:outline-none focus:border-primary"
                      placeholder="9876543210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-dark border border-darkBorder rounded-lg text-white focus:outline-none focus:border-primary"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Membership Type</label>
                    <select
                      value={formData.membershipType}
                      onChange={(e) => setFormData({ ...formData, membershipType: e.target.value })}
                      className="w-full px-4 py-3 bg-dark border border-darkBorder rounded-lg text-white focus:outline-none focus:border-primary"
                    >
                      <option value="monthly">Monthly (₹{membershipPrices.monthly})</option>
                      <option value="quarterly">Quarterly (₹{membershipPrices.quarterly})</option>
                      <option value="yearly">Yearly (₹{membershipPrices.yearly})</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Join Date</label>
                    <input
                      type="date"
                      required
                      value={formData.joinDate}
                      onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                      className="w-full px-4 py-3 bg-dark border border-darkBorder rounded-lg text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Height (cm)</label>
                    <input
                      type="number"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      className="w-full px-4 py-3 bg-dark border border-darkBorder rounded-lg text-white focus:outline-none focus:border-primary"
                      placeholder="175"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      className="w-full px-4 py-3 bg-dark border border-darkBorder rounded-lg text-white focus:outline-none focus:border-primary"
                      placeholder="70"
                    />
                  </div>
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
                    {editingMember ? 'Update Member' : 'Add Member'}
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

