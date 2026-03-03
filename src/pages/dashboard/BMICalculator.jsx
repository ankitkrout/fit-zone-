import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calculator, 
  Weight, 
  Ruler, 
  Info, 
  AlertCircle,
  CheckCircle,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

export default function BMICalculator() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmi, setBmi] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const calculateBMI = () => {
    if (!height || !weight || height <= 0 || weight <= 0) {
      return
    }
    const heightInMeters = height / 100
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1)
    setBmi(parseFloat(bmiValue))
    setShowResult(true)
  }

  const getBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) {
      return {
        category: 'Underweight',
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-500/20',
        borderColor: 'border-yellow-500',
        suggestion: 'Consider increasing your caloric intake with nutritious foods. Include protein-rich foods and strength training to build muscle mass.',
        icon: TrendingDown
      }
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      return {
        category: 'Normal Weight',
        color: 'text-green-500',
        bgColor: 'bg-green-500/20',
        borderColor: 'border-green-500',
        suggestion: 'Great job! Maintain your healthy weight with a balanced diet and regular exercise. Continue your current fitness routine.',
        icon: CheckCircle
      }
    } else if (bmiValue >= 25 && bmiValue < 30) {
      return {
        category: 'Overweight',
        color: 'text-orange-500',
        bgColor: 'bg-orange-500/20',
        borderColor: 'border-orange-500',
        suggestion: 'Consider adopting a healthier diet and increasing physical activity. Focus on cardiovascular exercises and reduce processed foods.',
        icon: TrendingUp
      }
    } else {
      return {
        category: 'Obese',
        color: 'text-red-500',
        bgColor: 'bg-red-500/20',
        borderColor: 'border-red-500',
        suggestion: 'We recommend consulting with a healthcare professional or nutritionist. A structured diet and exercise plan under professional guidance would be beneficial.',
        icon: AlertCircle
      }
    }
  }

  const getBMIScalePosition = (bmiValue) => {
    const minBMI = 15
    const maxBMI = 40
    const position = ((bmiValue - minBMI) / (maxBMI - minBMI)) * 100
    return Math.max(0, Math.min(100, position))
  }

  const resetCalculator = () => {
    setHeight('')
    setWeight('')
    setBmi(null)
    setShowResult(false)
  }

  const bmiInfo = bmi ? getBMICategory(bmi) : null

  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white">BMI Calculator</h1>
        <p className="text-gray-400 mt-1">Calculate your Body Mass Index and get personalized health suggestions</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-darkCard border border-darkBorder rounded-2xl p-8"
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mr-4">
              <Calculator className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-white">Calculate Your BMI</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                <Ruler className="w-4 h-4 inline mr-2" />
                Height (cm)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => {
                  setHeight(e.target.value)
                  setShowResult(false)
                }}
                placeholder="Enter height in centimeters"
                className="w-full px-4 py-4 bg-dark border border-darkBorder rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary text-lg"
              />
              <p className="text-sm text-gray-500 mt-2">e.g., 175 cm</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                <Weight className="w-4 h-4 inline mr-2" />
                Weight (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value)
                  setShowResult(false)
                }}
                placeholder="Enter weight in kilograms"
                className="w-full px-4 py-4 bg-dark border border-darkBorder rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary text-lg"
              />
              <p className="text-sm text-gray-500 mt-2">e.g., 70 kg</p>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                onClick={calculateBMI}
                disabled={!height || !weight}
                className="flex-1 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primaryDark transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Calculate BMI
              </button>
              <button
                onClick={resetCalculator}
                className="px-6 py-4 bg-darkBorder text-white rounded-xl font-medium hover:bg-darkLight transition"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-500 mb-1">About BMI</h4>
                <p className="text-sm text-gray-400">
                  Body Mass Index (BMI) is a measure of body fat based on height and weight. 
                  It's a useful screening tool but doesn't account for muscle mass, bone density, or overall body composition.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {showResult && bmi ? (
            <>
              <div className={`bg-darkCard border-2 ${bmiInfo.borderColor} rounded-2xl p-8`}>
                <div className="text-center mb-6">
                  <p className="text-gray-400 mb-2">Your BMI</p>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className={`text-6xl font-bold ${bmiInfo.color}`}
                  >
                    {bmi}
                  </motion.div>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full mt-4 ${bmiInfo.bgColor}`}>
                    <bmiInfo.icon className={`w-5 h-5 ${bmiInfo.color} mr-2`} />
                    <span className={`font-medium ${bmiInfo.color}`}>{bmiInfo.category}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm text-gray-400 mb-2">BMI Scale</p>
                  <div className="relative h-4 bg-dark rounded-full overflow-hidden">
                    <div className="absolute inset-0 flex">
                      <div className="flex-1 bg-yellow-500"></div>
                      <div className="flex-1 bg-green-500"></div>
                      <div className="flex-1 bg-orange-500"></div>
                      <div className="flex-1 bg-red-500"></div>
                    </div>
                    <div 
                      className="absolute top-0 w-4 h-4 bg-white rounded-full shadow-lg"
                      style={{ left: `calc(${getBMIScalePosition(bmi)}% - 8px)` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>15</span>
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                    <span>40</span>
                  </div>
                </div>
              </div>

              <div className="bg-darkCard border border-darkBorder rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Info className="w-5 h-5 text-primary mr-2" />
                  Health Suggestion
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {bmiInfo.suggestion}
                </p>
              </div>

              <div className="bg-darkCard border border-darkBorder rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">BMI Categories</h3>
                <div className="space-y-3">
                  {[
                    { range: 'Below 18.5', category: 'Underweight', color: 'bg-yellow-500' },
                    { range: '18.5 - 24.9', category: 'Normal weight', color: 'bg-green-500' },
                    { range: '25 - 29.9', category: 'Overweight', color: 'bg-orange-500' },
                    { range: '30 and above', category: 'Obese', color: 'bg-red-500' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-dark rounded-lg">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${item.color} mr-3`}></div>
                        <span className="text-gray-300">{item.category}</span>
                      </div>
                      <span className="text-gray-500 text-sm">{item.range}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-darkCard border border-darkBorder rounded-2xl p-12 text-center">
              <Calculator className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Enter Your Details</h3>
              <p className="text-gray-400">
                Enter your height and weight above to calculate your BMI and get personalized health recommendations.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

