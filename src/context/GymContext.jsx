import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const GymContext = createContext(null)

// Sample dummy data
const initialMembers = [
  { id: 1, name: 'John Doe', phone: '9876543210', email: 'john@example.com', membershipType: 'yearly', joinDate: '2024-01-15', expiryDate: '2025-01-15', status: 'active', height: 175, weight: 70, fees: 12000 },
  { id: 2, name: 'Jane Smith', phone: '9876543211', email: 'jane@example.com', membershipType: 'monthly', joinDate: '2024-06-01', expiryDate: '2024-07-01', status: 'active', height: 165, weight: 55, fees: 1500 },
  { id: 3, name: 'Mike Johnson', phone: '9876543212', email: 'mike@example.com', membershipType: 'quarterly', joinDate: '2024-03-01', expiryDate: '2024-06-01', status: 'expired', height: 180, weight: 85, fees: 4000 },
  { id: 4, name: 'Sarah Williams', phone: '9876543213', email: 'sarah@example.com', membershipType: 'yearly', joinDate: '2024-02-01', expiryDate: '2025-02-01', status: 'active', height: 160, weight: 58, fees: 12000 },
  { id: 5, name: 'David Brown', phone: '9876543214', email: 'david@example.com', membershipType: 'monthly', joinDate: '2024-07-15', expiryDate: '2024-08-15', status: 'active', height: 170, weight: 75, fees: 1500 },
]

const initialAttendance = [
  { id: 1, memberId: 1, date: '2024-07-01', status: 'present' },
  { id: 2, memberId: 1, date: '2024-07-02', status: 'present' },
  { id: 3, memberId: 1, date: '2024-07-03', status: 'absent' },
  { id: 4, memberId: 2, date: '2024-07-01', status: 'present' },
  { id: 5, memberId: 2, date: '2024-07-02', status: 'present' },
  { id: 6, memberId: 3, date: '2024-07-01', status: 'absent' },
]

const initialPayments = [
  { id: 1, memberId: 1, amount: 12000, date: '2024-01-15', status: 'paid', method: 'UPI' },
  { id: 2, memberId: 2, amount: 1500, date: '2024-06-01', status: 'paid', method: 'Cash' },
  { id: 3, memberId: 3, amount: 4000, date: '2024-03-01', status: 'paid', method: 'Card' },
  { id: 4, memberId: 4, amount: 12000, date: '2024-02-01', status: 'paid', method: 'UPI' },
  { id: 5, memberId: 5, amount: 1500, date: '2024-07-15', status: 'due', method: '-' },
]

const membershipPrices = {
  monthly: 1500,
  quarterly: 4000,
  yearly: 12000
}

export function GymProvider({ children }) {
  const [members, setMembers] = useState([])
  const [attendance, setAttendance] = useState([])
  const [payments, setPayments] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Load data from localStorage on mount
  useEffect(() => {
    const storedMembers = localStorage.getItem('gymMembers')
    const storedAttendance = localStorage.getItem('gymAttendance')
    const storedPayments = localStorage.getItem('gymPayments')

    if (storedMembers) {
      setMembers(JSON.parse(storedMembers))
    } else {
      setMembers(initialMembers)
      localStorage.setItem('gymMembers', JSON.stringify(initialMembers))
    }

    if (storedAttendance) {
      setAttendance(JSON.parse(storedAttendance))
    } else {
      setAttendance(initialAttendance)
      localStorage.setItem('gymAttendance', JSON.stringify(initialAttendance))
    }

    if (storedPayments) {
      setPayments(JSON.parse(storedPayments))
    } else {
      setPayments(initialPayments)
      localStorage.setItem('gymPayments', JSON.stringify(initialPayments))
    }

    setIsLoading(false)
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('gymMembers', JSON.stringify(members))
    }
  }, [members, isLoading])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('gymAttendance', JSON.stringify(attendance))
    }
  }, [attendance, isLoading])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('gymPayments', JSON.stringify(payments))
    }
  }, [payments, isLoading])

  // Calculate expiry date based on membership type
  const calculateExpiryDate = (joinDate, membershipType) => {
    const join = new Date(joinDate)
    let expiry = new Date(join)

    switch (membershipType) {
      case 'monthly':
        expiry.setMonth(expiry.getMonth() + 1)
        break
      case 'quarterly':
        expiry.setMonth(expiry.getMonth() + 3)
        break
      case 'yearly':
        expiry.setFullYear(expiry.getFullYear() + 1)
        break
      default:
        break
    }

    return expiry.toISOString().split('T')[0]
  }

  // Check if membership is expired
  const isExpired = (expiryDate) => {
    return new Date(expiryDate) < new Date()
  }

  // Member CRUD operations
  const addMember = (memberData) => {
    const newMember = {
      ...memberData,
      id: Date.now(),
      expiryDate: calculateExpiryDate(memberData.joinDate, memberData.membershipType),
      status: isExpired(calculateExpiryDate(memberData.joinDate, memberData.membershipType)) ? 'expired' : 'active',
      fees: membershipPrices[memberData.membershipType]
    }
    setMembers(prev => [...prev, newMember])
    
    // Add initial payment
    const newPayment = {
      id: Date.now(),
      memberId: newMember.id,
      amount: membershipPrices[memberData.membershipType],
      date: memberData.joinDate,
      status: 'paid',
      method: 'Cash'
    }
    setPayments(prev => [...prev, newPayment])
    
    toast.success('Member added successfully!')
    return newMember
  }

  const updateMember = (id, updatedData) => {
    setMembers(prev => prev.map(member => {
      if (member.id === id) {
        const updated = { ...member, ...updatedData }
        updated.expiryDate = calculateExpiryDate(updated.joinDate, updated.membershipType)
        updated.status = isExpired(updated.expiryDate) ? 'expired' : 'active'
        updated.fees = membershipPrices[updated.membershipType]
        return updated
      }
      return member
    }))
    toast.success('Member updated successfully!')
  }

  const deleteMember = (id) => {
    setMembers(prev => prev.filter(member => member.id !== id))
    setAttendance(prev => prev.filter(att => att.memberId !== id))
    setPayments(prev => prev.filter(pay => pay.memberId !== id))
    toast.success('Member deleted successfully!')
  }

  // Attendance operations
  const markAttendance = (memberId, date, status) => {
    const existingIndex = attendance.findIndex(
      a => a.memberId === memberId && a.date === date
    )

    if (existingIndex >= 0) {
      setAttendance(prev => prev.map((att, idx) => 
        idx === existingIndex ? { ...att, status } : att
      ))
    } else {
      setAttendance(prev => [...prev, {
        id: Date.now(),
        memberId,
        date,
        status
      }])
    }
    toast.success(`Attendance marked as ${status}`)
  }

  const getAttendanceForMember = (memberId) => {
    return attendance.filter(a => a.memberId === memberId)
  }

  const getAttendancePercentage = (memberId) => {
    const memberAttendance = attendance.filter(a => a.memberId === memberId)
    if (memberAttendance.length === 0) return 0
    const present = memberAttendance.filter(a => a.status === 'present').length
    return Math.round((present / memberAttendance.length) * 100)
  }

  // Payment operations
  const addPayment = (paymentData) => {
    const newPayment = {
      ...paymentData,
      id: Date.now()
    }
    setPayments(prev => [...prev, newPayment])
    
    // Update member status
    setMembers(prev => prev.map(m => 
      m.id === paymentData.memberId ? { ...m, status: 'active' } : m
    ))
    
    toast.success('Payment recorded successfully!')
    return newPayment
  }

  const getPaymentsForMember = (memberId) => {
    return payments.filter(p => p.memberId === memberId)
  }

  // Statistics
  const getStats = () => {
    const totalMembers = members.length
    const activeMembers = members.filter(m => m.status === 'active').length
    const expiredMembers = members.filter(m => m.status === 'expired').length
    const monthlyRevenue = payments
      .filter(p => p.status === 'paid')
      .reduce((sum, p) => sum + p.amount, 0)
    
    // Get expiring soon (within 7 days)
    const expiringSoon = members.filter(m => {
      const expiry = new Date(m.expiryDate)
      const now = new Date()
      const diffDays = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24))
      return diffDays > 0 && diffDays <= 7
    })

    return {
      totalMembers,
      activeMembers,
      expiredMembers,
      monthlyRevenue,
      expiringSoon
    }
  }

  const getMonthlyRevenueData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months.map(month => {
      const monthPayments = payments.filter(p => {
        const paymentMonth = new Date(p.date).toLocaleString('default', { month: 'short' })
        return paymentMonth === month && p.status === 'paid'
      })
      return {
        name: month,
        revenue: monthPayments.reduce((sum, p) => sum + p.amount, 0)
      }
    })
  }

  const getMembershipDistribution = () => {
    const distribution = {
      monthly: 0,
      quarterly: 0,
      yearly: 0
    }
    members.forEach(m => {
      if (distribution[m.membershipType] !== undefined) {
        distribution[m.membershipType]++
      }
    })
    return [
      { name: 'Monthly', value: distribution.monthly, color: '#ff1a1a' },
      { name: 'Quarterly', value: distribution.quarterly, color: '#ff6b6b' },
      { name: 'Yearly', value: distribution.yearly, color: '#ff9999' }
    ]
  }

  return (
    <GymContext.Provider value={{
      members,
      attendance,
      payments,
      isLoading,
      membershipPrices,
      addMember,
      updateMember,
      deleteMember,
      markAttendance,
      getAttendanceForMember,
      getAttendancePercentage,
      addPayment,
      getPaymentsForMember,
      getStats,
      getMonthlyRevenueData,
      getMembershipDistribution,
      isExpired
    }}>
      {children}
    </GymContext.Provider>
  )
}

export function useGym() {
  const context = useContext(GymContext)
  if (!context) {
    throw new Error('useGym must be used within a GymProvider')
  }
  return context
}

