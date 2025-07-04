"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  Shield,
  User,
  Smartphone,
  Clock,
  Heart,
  Star,
  CheckCircle,
  X,
  ArrowRight,
} from "lucide-react"

// Heartbeat timing configuration (120 BPM = 500ms per beat)
const HEARTBEAT_INTERVAL = 500 // 500ms per beat
const HEARTBEAT_DURATION = 0.1 // Subtle pulse duration

// Enhanced feature data with journey positioning
const features = [
  {
    id: 1,
    title: "Smart Booking",
    description:
      "Appointment scheduling that finds the perfect time slot for you and your doctor, reducing wait times and optimizing your healthcare journey.",
    icon: Calendar,
    stats: "< 30 sec",
    color: "from-blue-500 to-blue-600",
    position: { x: 25, y: 35 }, // Top-left of heart
    pathPosition: 0.1,
  },
  {
    id: 2,
    title: "Bank-Level Security",
    description:
      "Advanced 256-bit encryption and multi-factor authentication protect your sensitive health data with military-grade security protocols.",
    icon: Shield,
    stats: "256-bit SSL",
    color: "from-green-500 to-green-600",
    position: { x: 75, y: 35 }, // Top-right of heart
    pathPosition: 0.3,
  },
  {
    id: 3,
    title: "Verified Doctors",
    description:
      "Connect with licensed healthcare professionals verified through our rigorous PMDC screening process and continuous quality monitoring.",
    icon: User,
    stats: "500+ Doctors",
    color: "from-purple-500 to-purple-600",
    position: { x: 50, y: 65 },
        pathPosition: 0.7,
  },
  {
    id: 4,
    title: "Cross-Platform",
    description:
      "Seamless experience across all devices with real-time synchronization, offline support, and native mobile applications.",
    icon: Smartphone,
    stats: "iOS & Android",
    color: "from-orange-500 to-orange-600",
    position: { x: 85, y: 55 }, // Right side of heart
    pathPosition: 0.5,
  },
]

// Trust indicators positioned around the heart
const trustIndicators = [
  { icon: Clock, label: "24/7 Support", value: "Always Available", position: { x: 15, y: 70 } },
  { icon: Heart, label: "Patient Care", value: "50K+ Happy Patients", position: { x: 35, y: 85 } },
  { icon: Star, label: "Top Rated", value: "4.9/5 Rating", position: { x: 65, y: 85 } },
  { icon: CheckCircle, label: "Verified", value: "PMDC Certified", position: { x: 85, y: 70 } },
]

export default function HeartbeatJourneyMap() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null)
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Heartbeat controller
  useEffect(() => {
    const heartbeatTimer = setInterval(() => {
      // Heartbeat effect runs continuously
    }, HEARTBEAT_INTERVAL)

    return () => clearInterval(heartbeatTimer)
  }, [])

  // Close feature card on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSelectedFeature(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Heart SVG path - anatomically inspired
  const heartPath =
    "M50,25 C50,15 35,5 25,15 C15,5 0,15 0,25 C0,35 25,60 50,85 C75,60 100,35 100,25 C100,15 85,5 75,15 C65,5 50,15 50,25 Z"

  return (
    <section id="features" className="relative py-20 overflow-hidden bg-white from-slate-50 via-blue-50/30 to-slate-100">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59 130 246) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative container mx-auto px-4">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-6"
          >
            <div className="bg-blue-50 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold border border-blue-100 shadow-sm">
               Your Healthcare Journey
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Explore PAKHIMS&apos;s
            <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent block lg:inline">
              {" "}
              Heartbeat
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Navigate your healthcare with ease, guided by our innovative features and trusted care.
          </p>
        </motion.div>

        {/* Heartbeat Journey Map */}
        <div className="relative max-w-6xl mx-auto" ref={containerRef}>
          <div className="relative h-96 md:h-[500px] lg:h-[600px]">
            {/* Heart-shaped SVG container */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
              style={{ filter: "drop-shadow(0 0 20px rgba(239, 68, 68, 0.1))" }}
            >
              {/* Heart outline with pulse */}
              <motion.path
                d={heartPath}
                fill="none"
                stroke="url(#heartGradient)"
                strokeWidth="0.5"
                className="opacity-30"
                animate={{
                  strokeWidth: [0.5, 0.8, 0.5],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: HEARTBEAT_DURATION,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: HEARTBEAT_INTERVAL / 1000 - HEARTBEAT_DURATION,
                  ease: "easeInOut",
                }}
              />

              {/* ECG line that traces the heart */}
              <motion.path
                d={heartPath}
                fill="none"
                stroke="url(#ecgGradient)"
                strokeWidth="1"
                strokeDasharray="2 2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />

              {/* Gradient definitions */}
              <defs>
                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Feature nodes */}
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
                style={{
                  left: `${feature.position.x}%`,
                  top: `${feature.position.y}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFeature(feature.id)}
                onHoverStart={() => setHoveredNode(feature.id)}
                onHoverEnd={() => setHoveredNode(null)}
              >
                {/* Node background with heartbeat */}
                <motion.div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg relative overflow-hidden`}
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 10px 20px rgba(0,0,0,0.1)",
                      "0 15px 30px rgba(0,0,0,0.2)",
                      "0 10px 20px rgba(0,0,0,0.1)",
                    ],
                  }}
                  transition={{
                    duration: HEARTBEAT_DURATION,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: HEARTBEAT_INTERVAL / 1000 - HEARTBEAT_DURATION,
                    ease: "easeInOut",
                    delay: index * 0.1,
                  }}
                >
                  <feature.icon className="w-8 h-8 text-white" />

                  {/* Ripple effect on hover */}
                  <AnimatePresence>
                    {hoveredNode === feature.id && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-white/50"
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: 2, opacity: 0 }}
                        exit={{ scale: 1, opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Feature label */}
                <motion.div
                  className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-md border border-gray-200/50">
                    {feature.title}
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* Trust indicator nodes */}
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                style={{
                  left: `${indicator.position.x}%`,
                  top: `${indicator.position.y}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.8, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md border border-gray-200/50"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: HEARTBEAT_DURATION,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: HEARTBEAT_INTERVAL / 1000 - HEARTBEAT_DURATION,
                    ease: "easeInOut",
                    delay: index * 0.15,
                  }}
                >
                  <indicator.icon className="w-5 h-5 text-blue-600" />
                </motion.div>

                {/* Tooltip on hover */}
                <motion.div
                  className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  whileHover={{ opacity: 1 }}
                >
                  <div className="bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    {indicator.label}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Feature card popup */}
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
                  className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
                  initial={{ scale: 0.8, opacity: 0, y: 50 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 50 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedFeature(null)}
                    className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>

                  {(() => {
                    const feature = features.find((f) => f.id === selectedFeature)
                    if (!feature) return null

                    return (
                      <>
                        {/* Feature icon */}
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 shadow-lg`}
                        >
                          <feature.icon className="w-8 h-8 text-white" />
                        </div>

                        {/* Feature content */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>

                        {/* Stats */}
                        <div className="bg-blue-50 rounded-xl p-4 mb-6">
                          <div className="text-2xl font-bold text-blue-600 mb-1">{feature.stats}</div>
                          <div className="text-sm text-blue-700">Performance Metric</div>
                        </div>

                        {/* CTA */}
                        <motion.button
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
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
        </div>

        {/* Trust indicators legend */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Vital Signs of Trust</h3>
          <p className="text-gray-600 mb-8">PAKHIMS is built on a foundation of reliability and care</p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <indicator.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="font-semibold text-gray-900 text-sm mb-1">{indicator.label}</div>
                <div className="text-xs text-gray-600">{indicator.value}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Respect reduced motion preference */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  )
}
