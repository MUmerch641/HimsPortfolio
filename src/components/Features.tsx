"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  Shield,
  Users,
  Stethoscope,
  X,
  ArrowRight,
  Settings,
  Building2,
  Droplets,
  Activity,
  Lock,
} from "lucide-react"

// Heartbeat timing configuration (120 BPM = 500ms per beat)
const HEARTBEAT_INTERVAL = 500 // 500ms per beat
const HEARTBEAT_DURATION = 0.1 // Subtle pulse duration

// Enhanced feature data with journey positioning - Real PAKHIMS System Modules (Exact from Sidebar)
const features = [
  {
    id: 1,
    title: "Appointments",
    description:
      "Complete appointment scheduling and management system for both outpatient and inpatient services, streamlining healthcare delivery.",
    icon: Calendar,
    stats: "24/7 Booking",
    color: "from-blue-500 to-blue-600",
    position: { x: 25, y: 50 }, // Top-left of heart
    pathPosition: 0.1,
  },
  {
    id: 2,
    title: "Employee",
    description:
      "Comprehensive employee management system for healthcare staff, including scheduling, payroll, and performance tracking.",
    icon: Users,
    stats: "Staff Management",
    color: "from-green-500 to-green-600",
    position: { x: 75, y: 35 }, // Top-right of heart
    pathPosition: 0.2,
  },
  {
    id: 3,
    title: "Insurance",
    description:
      "Advanced insurance claims processing, coverage verification, and policy management integrated with major healthcare providers.",
    icon: Shield,
    stats: "Multi-Provider",
    color: "from-purple-500 to-purple-600",
    position: { x: 20, y: 30 }, // Left side of heart
    pathPosition: 0.3,
  },
  {
    id: 4,
    title: "Pathology",
    description:
      "Complete laboratory management system with test ordering, result tracking, and comprehensive diagnostic reporting capabilities.",
    icon: Activity,
    stats: "Lab Tests",
    color: "from-red-500 to-red-600",
    position: { x: 80, y: 55 }, // Right side of heart
    pathPosition: 0.4,
  },
  {
    id: 5,
    title: "Settings",
    description:
      "System configuration and customization tools for healthcare facility management, user permissions, and workflow optimization.",
    icon: Settings,
    stats: "Custom Config",
    color: "from-gray-500 to-gray-600",
    position: { x: 50, y: 25 }, // Top center of heart
    pathPosition: 0.5,
  },
  {
    id: 6,
    title: "OPD",
    description:
      "Outpatient Department management with patient registration, consultation tracking, and appointment scheduling.",
    icon: Stethoscope,
    stats: "Outpatient Care",
    color: "from-teal-500 to-teal-600",
    position: { x: 35, y: 70 }, // Bottom left of heart
    pathPosition: 0.6,
  },
  {
    id: 7,
    title: "IPD",
    description:
      "Inpatient Department management with bed allocation, patient admission, discharge planning, and ward administration.",
    icon: Building2,
    stats: "Inpatient Care",
    color: "from-orange-500 to-orange-600",
    position: { x: 65, y: 70 }, // Bottom right of heart
    pathPosition: 0.7,
  },
  {
    id: 8,
    title: "Authentication",
    description:
      "Secure user authentication and access control system with role-based permissions, multi-factor authentication, and session management.",
    icon: Lock,
    stats: "Secure Access",
    color: "from-indigo-500 to-indigo-600",
    position: { x: 50, y: 80 }, // Bottom center of heart
    pathPosition: 0.8,
  },
  {
    id: 9,
    title: "Blood Bank",
    description:
      "Blood bank management system with donor registration, blood inventory tracking, and transfusion management.",
    icon: Droplets,
    stats: "Blood Inventory",
    color: "from-rose-500 to-rose-600",
    position: { x: 50, y: 50 }, // Bottom center of heart (moved down)
    pathPosition: 0.9,
  },
]

// Trust indicators positioned around the heart - Real PAKHIMS Services (From Sidebar)
const trustIndicators = [
  { icon: Users, label: "Employee Management", value: "Staff & Admin", position: { x: 15, y: 70 } },
  { icon: Lock, label: "Secure Authentication", value: "Role-Based Access", position: { x: 85, y: 85 } },
  { icon: Droplets, label: "Blood Bank", value: "Donation & Inventory", position: { x: 35, y: 85 } },
  { icon: Settings, label: "System Settings", value: "Custom Config", position: { x: 65, y: 85 } },
  { icon: Stethoscope, label: "Medical Care", value: "OPD & IPD", position: { x: 85, y: 70 } },
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
              🏥 Complete Healthcare Management System
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            PAKHIMS Core
            <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent block lg:inline">
              {" "}
              Modules
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive healthcare management platform with 9 core integrated modules for appointments, employee management, insurance, pathology, authentication, and complete patient care.
          </p>
        </motion.div>

        {/* PAKHIMS Core Modules Map */}
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
                {/* Node background */}
                <motion.div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg relative overflow-hidden`}
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
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Additional System Modules</h3>
          <p className="text-gray-600 mb-8">Extended healthcare management capabilities for comprehensive patient care</p>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
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
