import React from 'react'
import { Package, Users, Award, TrendingUp, Heart, Shield, Zap } from 'lucide-react'

const About = () => {
  const stats = [
    { label: 'Happy Customers', value: '50K+', icon: Users },
    { label: 'Products Sold', value: '200K+', icon: Package },
    { label: 'Years in Business', value: '10+', icon: Award },
    { label: 'Growth Rate', value: '150%', icon: TrendingUp }
  ]

  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Every decision we make starts with our customers in mind. Your satisfaction is our success.'
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'We partner only with trusted brands and rigorously test every product before it reaches you.'
    },
    {
      icon: Zap,
      title: 'Fast & Reliable',
      description: 'Lightning-fast delivery and responsive support. We value your time as much as you do.'
    }
  ]

  const team = [
    { name: 'Sarah Johnson', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
    { name: 'Michael Chen', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
    { name: 'Emily Rodriguez', role: 'Customer Experience', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
    { name: 'David Kim', role: 'Product Manager', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            We started with a simple mission: make quality products accessible to everyone. 
            Today, we're proud to serve thousands of happy customers worldwide.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 -mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">How It All Began</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Founded in 2014, our journey started in a small garage with a big dream. We noticed a gap in the market for high-quality products that didn't break the bank. What began as a passion project quickly grew into something much bigger.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Through dedication, innovation, and an unwavering commitment to our customers, we've grown from a one-person operation to a team of passionate individuals serving customers in over 50 countries.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, we're more than just an e-commerce store. We're a community of people who believe that everyone deserves access to products that make their lives better, easier, and more enjoyable.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop" 
              alt="Our workspace"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Our Values</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            These core principles guide everything we do and shape how we serve you every day
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Meet Our Team</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          The passionate people behind your favorite shopping experience
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-4 overflow-hidden rounded-xl">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full aspect-square object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
              <p className="text-gray-600 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-lg mb-8 opacity-90">
            Be part of our story. Shop with confidence and experience the difference.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

export default About