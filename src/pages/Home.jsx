import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dumbbell, Calendar, Award, Users, ChevronRight, Star, MapPin, Phone, Mail } from 'lucide-react'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

// Sample data
const trainers = [
  { id: 1, name: 'Alex Johnson', specialty: 'Strength Training', image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=400&fit=crop' },
  { id: 2, name: 'Sarah Williams', specialty: 'Yoga & Pilates', image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop' },
  { id: 3, name: 'Mike Brown', specialty: 'HIIT & Cardio', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop' },
  { id: 4, name: 'Emma Davis', specialty: 'Personal Training', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop' },
]

const plans = [
  { id: 1, name: 'Monthly', price: 1500, features: ['Full Gym Access', 'Locker Usage', 'Free Parking', 'Group Classes'] },
  { id: 2, name: 'Quarterly', price: 4000, features: ['Full Gym Access', 'Locker Usage', 'Free Parking', 'Group Classes', '1 Personal Session', 'Diet Plan'], featured: true },
  { id: 3, name: 'Yearly', price: 12000, features: ['Full Gym Access', 'Locker Usage', 'Free Parking', 'Group Classes', '4 Personal Sessions', 'Diet Plan', 'Supplement Guide', '24/7 Access'] },
]

const testimonials = [
  { id: 1, name: 'John Smith', text: 'Best gym experience ever! The trainers are amazing and the facilities are top-notch.', rating: 5 },
  { id: 2, name: 'Emily Johnson', text: 'Lost 20kg in 6 months. The community here is so supportive!', rating: 5 },
  { id: 3, name: 'Michael Chen', text: 'Great equipment and clean environment. Highly recommend FitZone!', rating: 5 },
]

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  return (
    <div className="bg-dark">
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop" 
            alt="Gym Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-dark/40"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium">
                🏆 Award-Winning Fitness Center
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-white">Transform Your </span>
              <span className="gradient-text">Body</span>
              <span className="text-white">, Transform Your </span>
              <span className="gradient-text">Life</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Join FitZone and experience world-class facilities, expert trainers, 
              and a community that pushes you to be your best.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
              <a 
                href="#plans"
                className="px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primaryDark transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 flex items-center"
              >
                Get Started <ChevronRight className="ml-2" />
              </a>
              <a 
                href="#about"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-dark transition-all duration-300"
              >
                Learn More
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
            >
              {[
                { icon: Users, value: '500+', label: 'Members' },
                { icon: Dumbbell, value: '50+', label: 'Equipment' },
                { icon: Award, value: '15+', label: 'Trainers' },
                { icon: Calendar, value: '100+', label: 'Classes/Month' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-darkLight">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-4">
              About <span className="gradient-text">FitZone</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto">
              We're more than just a gym - we're a community dedicated to helping you achieve your fitness goals.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&h=400&fit=crop"
                alt="About FitZone"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white">Your Fitness Journey Starts Here</h3>
              <p className="text-gray-400">
                At FitZone, we believe that everyone deserves access to world-class fitness facilities 
                and expert guidance. Our state-of-the-art gym features the latest equipment, certified 
                trainers, and a supportive environment that keeps you motivated.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Modern Equipment',
                  'Expert Trainers',
                  'Flexible Timings',
                  'Group Classes',
                  'Personal Training',
                  'Nutrition Plans'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-300">
                    <ChevronRight className="w-5 h-5 text-primary mr-2" />
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section id="trainers" className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-4">
              Meet Our <span className="gradient-text">Trainers</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto">
              Our team of certified fitness professionals is here to guide you every step of the way.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {trainers.map((trainer) => (
              <motion.div
                key={trainer.id}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-darkCard border border-darkBorder rounded-2xl overflow-hidden card-hover"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={trainer.image} 
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-white">{trainer.name}</h3>
                  <p className="text-primary">{trainer.specialty}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Membership Plans */}
      <section id="plans" className="py-20 bg-darkLight">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-4">
              Membership <span className="gradient-text">Plans</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto">
              Choose the plan that fits your fitness goals and budget.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className={`bg-darkCard border rounded-2xl p-8 ${
                  plan.featured 
                    ? 'border-primary shadow-lg shadow-primary/20' 
                    : 'border-darkBorder'
                }`}
              >
                {plan.featured && (
                  <span className="inline-block px-4 py-1 bg-primary text-white rounded-full text-sm font-medium mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">₹{plan.price}</span>
                  <span className="text-gray-400">/{plan.name.toLowerCase()}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <ChevronRight className="w-5 h-5 text-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.featured
                    ? 'bg-primary text-white hover:bg-primaryDark'
                    : 'bg-darkBorder text-white hover:bg-primary'
                }`}>
                  Choose Plan
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-4">
              What Our <span className="gradient-text">Members Say</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto">
              Real stories from real people who transformed their lives with FitZone.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-darkCard border border-darkBorder rounded-2xl p-8 md:p-12 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-xl text-gray-300 mb-6 italic">
                "{testimonials[currentTestimonial].text}"
              </p>
              <h4 className="text-lg font-bold text-white">
                {testimonials[currentTestimonial].name}
              </h4>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial 
                      ? 'bg-primary w-8' 
                      : 'bg-darkBorder'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-darkLight">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-4">
              Get In <span className="gradient-text">Touch</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-darkCard border border-darkBorder rounded-2xl p-8"
            >
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input 
                      type="text" 
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-dark border border-darkBorder rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input 
                      type="email" 
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-dark border border-darkBorder rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                  <input 
                    type="text" 
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 bg-dark border border-darkBorder rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea 
                    rows="4" 
                    placeholder="Your message..."
                    className="w-full px-4 py-3 bg-dark border border-darkBorder rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none"
                  ></textarea>
                </div>
                <button className="w-full py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primaryDark transition-all">
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: MapPin, title: 'Address', text: '123 Fitness Street, Gym City' },
                  { icon: Phone, title: 'Phone', text: '+91 9876543210' },
                  { icon: Mail, title: 'Email', text: 'info@fitzone.com' },
                ].map((item, index) => (
                  <div key={index} className="bg-darkCard border border-darkBorder rounded-xl p-6 text-center">
                    <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.text}</p>
                  </div>
                ))}
              </div>

              {/* Google Map Embed */}
              <div className="bg-darkCard border border-darkBorder rounded-2xl overflow-hidden h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0123456789!2d77.123456!3d28.654321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM5JzE1LjYiTiA3N8KwMDcnMjQuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Gym Location"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

