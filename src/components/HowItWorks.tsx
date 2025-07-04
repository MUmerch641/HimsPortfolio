"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  LogIn,
  User,
  UserCheck,
  Calendar,
  ArrowRight,
  CheckCircle,
  Shield,
  Heart,
  Zap,
  Award,
  LucideIcon,
} from "lucide-react"

// Enhanced waveform timing configuration
const WAVE_INTERVAL = 2000 // 2 seconds per pulse
const WAVE_DURATION = 0.8 // Pulse duration

// Feature type definition
interface Feature {
  id: number
  title: string
  description: string
  icon: LucideIcon
  color: string
  bgColor: string
  details: string[]
  position: number
  shape: "circle" | "diamond" | "hexagon" | "star"
}

// Trust feature type definition
interface TrustFeature {
  icon: LucideIcon
  label: string
  description: string
  color: string
}

// Feature data with positioning
const features: Feature[] = [
  {
    id: 1,
    title: "Secure Login",
    description: "Create your account or sign in securely with bank-level encryption to protect your personal health information.",
    icon: LogIn,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
    details: [
      "Biometric authentication support",
      "End-to-end encryption",
      "Multi-layer security protocols",
    ],
    position: 15,
    shape: "diamond",
  },
  {
    id: 2,
    title: "Smart Profile",
    description: "Profile that learns from your health patterns and provides personalized recommendations.",
    icon: User,
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50",
    details: [
      "Health insights",
      "Smart medication tracking",
      "Predictive health alerts",
    ],
    position: 35,
    shape: "circle",
  },
  {
    id: 3,
    title: "Doctor Match",
    description: "Advanced matching system finds the perfect healthcare professional based on your specific needs.",
    icon: UserCheck,
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-rose-50",
    details: [
      "Matching",
      "Real-time availability sync",
      "Patient review analysis",
    ],
    position: 60,
    shape: "hexagon",
  },
  {
    id: 4,
    title: "Instant Booking",
    description: "Revolutionary one-click booking with smart scheduling that optimizes for both you and your provider.",
    icon: Calendar,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50",
    details: [
      "One-click smart booking",
      "Dynamic pricing optimization",
      "Automated follow-up care",
    ],
    position: 85,
    shape: "star",
  },
]

// Trust indicators
const trustFeatures: TrustFeature[] = [
  { icon: Shield, label: "Ultra Secure", description: "Military-grade encryption", color: "emerald" },
  { icon: Zap, label: "Lightning Fast", description: "Sub-second responses", color: "violet" },
  { icon: Heart, label: "Deeply Caring", description: "Patient-first always", color: "rose" },
  { icon: Award, label: "Award Winning", description: "Industry recognized", color: "amber" },
]

export default function HealingWaveSymphony() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null)
  const [waveOffset, setWaveOffset] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Wave animation
  useEffect(() => {
    const timer = setInterval(() => {
      setWaveOffset(prev => (prev + 1) % 360)
    }, 50)
    return () => clearInterval(timer)
  }, [])

  // Close feature card on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSelectedFeature(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Generate wave path
  const createWavePath = (offset: number, amplitude: number = 15) => {
    const points = []
    for (let i = 0; i <= 100; i += 2) {
      const x = i
      const y = 50 + Math.sin((i + offset) * 0.1) * amplitude
      points.push(`${x},${y}`)
    }
    return `M ${points.join(" L ")}`
  }

  // Shape component
  const ShapeIcon = ({ feature, size = 48 }: { feature: Feature, size?: number }) => {
    const baseClasses = `w-${size === 48 ? '12' : '16'} h-${size === 48 ? '12' : '16'} bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg relative overflow-hidden`
    
    let shapeClasses = ""
    switch (feature.shape) {
      case "circle":
        shapeClasses = "rounded-full"
        break
      case "diamond":
        shapeClasses = "rounded-sm transform rotate-45"
        break
      case "hexagon":
        shapeClasses = "rounded-lg"
        break
      case "star":
        shapeClasses = "rounded-md"
        break
      default:
        shapeClasses = "rounded-lg"
    }

    return (
      <div className={`${baseClasses} ${shapeClasses}`}>
        <feature.icon 
          className={`w-${size === 48 ? '6' : '8'} h-${size === 48 ? '6' : '8'} text-white`} 
          style={{ transform: feature.shape === "diamond" ? "rotate(-45deg)" : "none" }}
        />
      </div>
    )
  }

  return (
    <section id="how-it-works" className="relative py-20 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-rose-50">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-emerald-400 to-rose-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              scale: [0.5, 1, 0.5],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.div
              className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-semibold border-2 border-emerald-200 shadow-lg"
              animate={{
                scale: [1, 1.02, 1],
                borderColor: [
                  "rgb(167, 243, 208)", 
                  "rgb(244, 63, 94)", 
                  "rgb(167, 243, 208)"
                ],
              }}
              transition={{
                duration: WAVE_DURATION,
                repeat: Infinity,
                repeatDelay: WAVE_INTERVAL / 1000 - WAVE_DURATION,
                ease: "easeInOut",
              }}
            >
              <span className="bg-gradient-to-r from-emerald-600 to-rose-600 bg-clip-text text-transparent font-bold">
                🎵 Your Healing Symphony
              </span>
            </motion.div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            How PAKHIMS
            <motion.span
              className="bg-gradient-to-r from-emerald-600 via-violet-600 to-rose-600 bg-clip-text text-transparent block lg:inline ml-2"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Works Magic
            </motion.span>
          </h2>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Experience our revolutionary healthcare process, orchestrated for your ultimate care and convenience.
          </motion.p>
        </motion.div>

        {/* Waveform Symphony */}
        <div className="relative max-w-6xl mx-auto h-[400px] md:h-[500px]" ref={containerRef}>
          {/* SVG Waveform */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full"
            style={{ filter: "drop-shadow(0 0 10px rgba(16, 185, 129, 0.2))" }}
          >
            {/* Primary wave */}
            <motion.path
              d={createWavePath(waveOffset)}
              fill="none"
              stroke="url(#primaryGradient)"
              strokeWidth="2"
              animate={{
                strokeOpacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: WAVE_DURATION,
                repeat: Infinity,
                repeatDelay: WAVE_INTERVAL / 1000 - WAVE_DURATION,
                ease: "easeInOut",
              }}
            />
            
            {/* Secondary wave */}
            <motion.path
              d={createWavePath(waveOffset + 30, 8)}
              fill="none"
              stroke="url(#secondaryGradient)"
              strokeWidth="1"
              strokeDasharray="2 2"
              animate={{
                strokeOpacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: WAVE_DURATION * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <defs>
              <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="30%" stopColor="#8b5cf6" />
                <stop offset="70%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <linearGradient id="secondaryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Feature Points */}
          {features.map((feature, index) => {
            const yOffset = Math.sin((feature.position + waveOffset) * 0.08) * 30
            return (
              <motion.div
                key={feature.id}
                className="absolute cursor-pointer z-20"
                style={{
                  left: `${feature.position}%`,
                  top: `calc(50% + ${yOffset}px)`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFeature(feature.id)}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 4px 15px rgba(0,0,0,0.1)",
                      "0 8px 25px rgba(0,0,0,0.15)",
                      "0 4px 15px rgba(0,0,0,0.1)",
                    ],
                  }}
                  transition={{
                    duration: WAVE_DURATION,
                    repeat: Infinity,
                    repeatDelay: WAVE_INTERVAL / 1000 - WAVE_DURATION,
                    ease: "easeInOut",
                    delay: index * 0.1,
                  }}
                >
                  <ShapeIcon feature={feature} />
                </motion.div>
                
                {/* Feature Label */}
                <motion.div
                  className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 0.4 }}
                >
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-md border border-gray-200">
                    {feature.title}
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Feature Detail Modal */}
        <AnimatePresence>
          {selectedFeature !== null && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFeature(null)}
            >
              <motion.div
                className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const feature = features.find((f) => f.id === selectedFeature)
                  if (!feature) return null
                  
                  return (
                    <>
                      <div className="mb-6">
                        <ShapeIcon feature={feature} size={64} />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {feature.description}
                      </p>

                      <div className="space-y-3 mb-6">
                        {feature.details.map((detail, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center gap-3 text-sm text-gray-700"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span>{detail}</span>
                          </motion.div>
                        ))}
                      </div>

                      <motion.button
                        className={`w-full bg-gradient-to-r ${feature.color} text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedFeature(null)}
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </>
                  )
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Why Choose PAKHIMS?
          </h3>
          <p className="text-gray-600 mb-8">
            Harmonized for trust, speed, and care
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {trustFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: WAVE_DURATION,
                    repeat: Infinity,
                    repeatDelay: WAVE_INTERVAL / 1000 - WAVE_DURATION,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                >
                  <feature.icon className="w-6 h-6 text-teal-600" />
                </motion.div>
                
                <div className="font-semibold text-gray-900 mb-2">
                  {feature.label}
                </div>
                <div className="text-sm text-gray-600">
                  {feature.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}