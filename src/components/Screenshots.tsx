"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  XMarkIcon,
  MagnifyingGlassPlusIcon,
  PlayIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  SparklesIcon,
  EyeIcon,
} from "@heroicons/react/24/outline"
import { StarIcon } from "@heroicons/react/24/solid"

// Type definitions
interface ScreenshotSection {
  id: string
  label: string
  x: string
  y: string
  description: string
  icon: string
  color: string
}

interface Screenshot {
  id: number
  src: string
  alt: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  color: string
  glowColor: string
  bgGradient: string
  sections: ScreenshotSection[]
  category: string
  device: "browser" | "phone"
  stats: Record<string, string>
}

// Enhanced screenshot data with more comprehensive information
const screenshots: Screenshot[] = [
  {
    id: 1,
    src: "/images/1.png",
    alt: "PAKHIMS Web Platform Dashboard",
    title: "Web Platform",
    subtitle: "Complete Healthcare Management",
    description: "Experience our comprehensive web platform with intuitive design and powerful features.",
    longDescription:
      "Our web platform provides a complete healthcare management solution with real-time appointment booking, doctor verification, patient records, and seamless communication tools.",
    color: "from-teal-500 via-emerald-500 to-cyan-600",
    glowColor: "rgba(20, 184, 166, 0.3)",
    bgGradient: "from-teal-50 via-emerald-50 to-cyan-50",
    sections: [
      {
        id: "dashboard",
        label: "Smart Dashboard",
        x: "15%",
        y: "25%",
        description: "Comprehensive overview of your health journey with insights.",
        icon: "📊",
        color: "bg-teal-500",
      },
      {
        id: "booking",
        label: "Quick Booking",
        x: "65%",
        y: "20%",
        description: "Book appointments instantly with smart time slot recommendations.",
        icon: "📅",
        color: "bg-emerald-500",
      },
      {
        id: "doctors",
        label: "Doctor Network",
        x: "40%",
        y: "60%",
        description: "Browse verified healthcare professionals with detailed profiles.",
        icon: "👨‍⚕️",
        color: "bg-cyan-500",
      },
      {
        id: "records",
        label: "Health Records",
        x: "80%",
        y: "70%",
        description: "Secure digital health records with easy access and sharing.",
        icon: "📋",
        color: "bg-teal-600",
      },
    ],
    category: "Web Platform",
    device: "browser",
    stats: { users: "25K+", rating: "4.9", features: "50+" },
  },
  {
    id: 2,
    src: "/images/2.png",
    alt: "PAKHIMS Mobile App Interface",
    title: "Mobile App",
    subtitle: "Healthcare On-the-Go",
    description: "Discover our intuitive mobile app designed for seamless healthcare management.",
    longDescription:
      "Our mobile app brings healthcare to your fingertips with biometric security, offline capabilities, push notifications, and a user-friendly interface optimized for all screen sizes.",
    color: "from-purple-500 via-violet-500 to-indigo-600",
    glowColor: "rgba(139, 92, 246, 0.3)",
    bgGradient: "from-purple-50 via-violet-50 to-indigo-50",
    sections: [
      {
        id: "login",
        label: "Secure Login",
        x: "50%",
        y: "15%",
        description: "Biometric authentication with military-grade security.",
        icon: "🔐",
        color: "bg-purple-500",
      },
      {
        id: "profile",
        label: "Patient Profile",
        x: "30%",
        y: "40%",
        description: "Complete health profile with recommendations.",
        icon: "👤",
        color: "bg-violet-500",
      },
      {
        id: "appointments",
        label: "My Appointments",
        x: "70%",
        y: "55%",
        description: "Manage all your appointments with smart reminders.",
        icon: "⏰",
        color: "bg-indigo-500",
      },
      {
        id: "chat",
        label: "Doctor Chat",
        x: "50%",
        y: "80%",
        description: "Secure messaging with healthcare professionals.",
        icon: "💬",
        color: "bg-purple-600",
      },
    ],
    category: "Mobile App",
    device: "phone",
    stats: { downloads: "10K+", rating: "4.8", reviews: "500+" },
  },
]

export default function EnhancedScreenshotGallery() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [zoomedSection, setZoomedSection] = useState<string | null>(null)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)

  // Enhanced modal functions
  const openModal = (index: number) => {
    setCurrentImage(index)
    setModalIsOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setModalIsOpen(false)
    setZoomedSection(null)
    setIsAutoPlaying(false)
    document.body.style.overflow = "unset"
  }

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % screenshots.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  const openZoom = (sectionId: string) => setZoomedSection(sectionId)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !modalIsOpen) return

    const interval = setInterval(() => {
      nextImage()
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, modalIsOpen])

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!modalIsOpen) return

      switch (e.key) {
        case "ArrowRight":
          nextImage()
          break
        case "ArrowLeft":
          prevImage()
          break
        case "Escape":
          closeModal()
          break
        case " ":
          e.preventDefault()
          setIsAutoPlaying(!isAutoPlaying)
          break
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
          const sectionIndex = Number.parseInt(e.key) - 1
          const section = screenshots[currentImage]?.sections[sectionIndex]
          if (section) openZoom(section.id)
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [modalIsOpen, isAutoPlaying, currentImage])

  return (
    <section
      id="screenshots"
      className="relative py-24 overflow-hidden"
      ref={containerRef}
    >
      {/* Enhanced Background - Optimized */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-purple-50 to-amber-50" />

      {/* Floating Elements - Optimized */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgb(20_184_166)_1px,transparent_0)] bg-[length:80px_80px]" />
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 15}s`,
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-block mb-8"
          >
            <motion.div
              className="relative bg-gradient-to-r from-teal-50 via-purple-50 to-amber-50 px-8 py-4 rounded-full border border-teal-200 shadow-lg"
              animate={{
                scale: [1, 1.02, 1],
                boxShadow: [
                  "0 10px 30px rgba(20, 184, 166, 0.1)",
                  "0 15px 40px rgba(139, 92, 246, 0.2)",
                  "0 10px 30px rgba(20, 184, 166, 0.1)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <span className="bg-gradient-to-r from-teal-600 via-purple-600 to-amber-600 bg-clip-text text-transparent font-bold text-lg flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-teal-600" />
                Platform Showcase
                <EyeIcon className="w-5 h-5 text-purple-600" />
              </span>
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            See PAKHIMS in{" "}
            <motion.span
              className="bg-gradient-to-r from-teal-600 via-purple-600 to-amber-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Action
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Experience our comprehensive healthcare platforms designed for seamless patient care, professional
            management, and innovative health solutions.
          </motion.p>
        </motion.div>

        {/* Enhanced Screenshots Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {screenshots.map((screenshot, index) => (
            <motion.div
              key={screenshot.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.1, type: "spring", stiffness: 100, damping: 15 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer"
              onClick={() => openModal(index)}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ y: -5, scale: 1.01 }}
            >
              {/* Enhanced Card Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${screenshot.bgGradient} rounded-3xl transition-all duration-200 ${
                  hoveredCard === index ? 'opacity-80 scale-[1.01]' : 'opacity-50'
                }`}
              />

              {/* Device Frame */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/50">
                {/* Device Mockup */}
                <div
                  className={`relative overflow-hidden ${
                    screenshot.device === "browser"
                      ? "rounded-2xl border-4 border-gray-300 bg-white"
                      : "rounded-[2.5rem] bg-gradient-to-b from-gray-800 to-gray-900 p-2"
                  }`}
                >
                  {/* Browser Chrome */}
                  {screenshot.device === "browser" && (
                    <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 border-b border-gray-200">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                      </div>
                      <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-500 ml-4">pakhims.com</div>
                    </div>
                  )}

                  {/* Phone Frame */}
                  {screenshot.device === "phone" && (
                    <>
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full" />
                      <div className="absolute top-2 right-4 w-2 h-2 bg-gray-600 rounded-full" />
                    </>
                  )}

                  {/* Screenshot Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={screenshot.src || "/placeholder.svg"}
                      alt={screenshot.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105 will-change-transform"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />

                    {/* Enhanced Hotspots */}
                    {screenshot.sections.map((section, sectionIndex) => (
                      <motion.div
                        key={section.id}
                        className="absolute cursor-pointer z-10"
                        style={{ left: section.x, top: section.y }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.2 + sectionIndex * 0.1 + 0.5 }}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          openModal(index)
                          setTimeout(() => openZoom(section.id), 500)
                        }}
                      >
                        <div
                          className={`w-8 h-8 ${section.color} rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg relative overflow-hidden animate-pulse`}
                        >
                          <span className="text-xs">{section.icon}</span>
                        </div>

                        {/* Enhanced Tooltip */}
                        <div
                          className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
                        >
                          <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap shadow-xl relative">
                            {section.label}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Enhanced Card Content */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <motion.span
                      className={`px-3 py-1 bg-gradient-to-r ${screenshot.color} text-white text-sm font-bold rounded-full shadow-md flex items-center gap-2`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {screenshot.device === "browser" ? (
                        <ComputerDesktopIcon className="w-4 h-4" />
                      ) : (
                        <DevicePhoneMobileIcon className="w-4 h-4" />
                      )}
                      {screenshot.category}
                    </motion.span>

                    <button
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-105 transition-all duration-200 group"
                      onClick={(e) => {
                        e.stopPropagation()
                        openModal(index)
                      }}
                    >
                      <MagnifyingGlassPlusIcon className="w-5 h-5 text-gray-700 group-hover:text-teal-600 transition-colors duration-200" />
                    </button>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{screenshot.title}</h3>
                  <p className="text-lg text-gray-500 mb-3">{screenshot.subtitle}</p>
                  <p className="text-gray-600 leading-relaxed mb-4">{screenshot.description}</p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm">
                    {Object.entries(screenshot.stats).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-1">
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold text-gray-900">{value}</span>
                        <span className="text-gray-500 capitalize">{key}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Optimized Parallax Effect */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  transform: `translate3d(${hoveredCard === index ? 5 : 0}px, ${hoveredCard === index ? 5 : 0}px, 0)`,
                  transition: 'transform 0.3s ease-out',
                }}
              >
                <div
                  className={`absolute top-4 right-4 w-32 h-32 bg-gradient-to-br ${screenshot.color} opacity-10 rounded-full blur-xl transition-opacity duration-300`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative bg-gradient-to-br from-teal-50 via-purple-50 to-amber-50 rounded-3xl p-12 border border-teal-200 shadow-2xl overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-teal-400/10 via-purple-400/10 to-amber-400/10"
              animate={{
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <div className="relative z-10">
              <h3 className="text-4xl font-bold text-gray-900 mb-6">Ready to Transform Healthcare?</h3>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                Join thousands of healthcare professionals and patients who trust PAKHIMS for their medical needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  className="px-8 py-4 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3 group"
                >
                  <SparklesIcon className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" />
                  Start Your Journey
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </button>

                <button
                  className="px-8 py-4 bg-white text-teal-600 border-2 border-teal-200 rounded-2xl font-bold text-lg hover:bg-teal-50 hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3 group"
                >
                  <PlayIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {modalIsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Enhanced Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{screenshots[currentImage].title}</h3>
                  <p className="text-gray-600">{screenshots[currentImage].subtitle}</p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Auto-play Toggle */}
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 ${
                      isAutoPlaying ? "bg-teal-100 text-teal-600" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <PlayIcon className="w-5 h-5" />
                  </button>

                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                  >
                    <XMarkIcon className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Navigation Buttons - Optimized */}
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:bg-white hover:scale-105 transition-all duration-200"
              >
                <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:bg-white hover:scale-105 transition-all duration-200"
              >
                <ArrowRightIcon className="w-6 h-6 text-gray-600" />
              </button>

              {/* Main Image Display */}
              <div className="relative h-[60vh] overflow-hidden">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  {/* Device Frame in Modal */}
                  <div
                    className={`relative w-full h-full flex items-center justify-center p-8 ${
                      screenshots[currentImage].device === "browser" ? "bg-gray-100" : "bg-gray-800"
                    }`}
                  >
                    <div
                      className={`relative max-w-4xl w-full overflow-hidden ${
                        screenshots[currentImage].device === "browser"
                          ? "rounded-2xl border-4 border-gray-300 bg-white shadow-2xl"
                          : "rounded-[3rem] bg-gradient-to-b from-gray-900 to-black p-4 shadow-2xl"
                      }`}
                    >
                      {/* Browser Chrome */}
                      {screenshots[currentImage].device === "browser" && (
                        <div className="flex items-center gap-3 px-6 py-4 bg-gray-100 border-b border-gray-200">
                          <div className="flex gap-2">
                            <div className="w-4 h-4 bg-red-500 rounded-full" />
                            <div className="w-4 h-4 bg-yellow-500 rounded-full" />
                            <div className="w-4 h-4 bg-green-500 rounded-full" />
                          </div>
                          <div className="flex-1 bg-white rounded-lg px-4 py-2 text-sm text-gray-500 ml-6">
                            https://pakhims.com
                          </div>
                        </div>
                      )}

                      {/* Phone Frame */}
                      {screenshots[currentImage].device === "phone" && (
                        <>
                          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-20 h-1.5 bg-gray-700 rounded-full" />
                          <div className="absolute top-4 right-6 w-3 h-3 bg-gray-700 rounded-full" />
                        </>
                      )}

                      {/* Screenshot */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={screenshots[currentImage].src || "/placeholder.svg"}
                          alt={screenshots[currentImage].alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1200px) 100vw, 80vw"
                          priority
                        />

                        {/* Interactive Hotspots */}
                        {screenshots[currentImage].sections.map((section) => (
                          <motion.div
                            key={section.id}
                            className="absolute cursor-pointer z-10"
                            style={{ left: section.x, top: section.y }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                              scale: zoomedSection === section.id ? 1.5 : 1,
                              opacity: zoomedSection === section.id ? 1 : 0.8,
                            }}
                            whileHover={{ scale: 1.3 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              openZoom(section.id)
                            }}
                          >
                            <motion.div
                              className={`w-10 h-10 ${section.color} rounded-full flex items-center justify-center text-white font-bold shadow-xl relative overflow-hidden`}
                              animate={{
                                boxShadow: [
                                  "0 0 0 0 rgba(20, 184, 166, 0.6)",
                                  "0 0 0 15px rgba(20, 184, 166, 0)",
                                  "0 0 0 0 rgba(20, 184, 166, 0.6)",
                                ],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                              }}
                            >
                              <span>{section.icon}</span>
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Enhanced Section Details */}
              <AnimatePresence>
                {zoomedSection && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-6 border-t border-gray-200"
                  >
                    {(() => {
                      const section = screenshots[currentImage].sections.find((s) => s.id === zoomedSection)
                      if (!section) return null

                      return (
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className={`w-8 h-8 ${section.color} rounded-lg flex items-center justify-center`}>
                                <span className="text-white text-sm">{section.icon}</span>
                              </div>
                              <h4 className="text-xl font-bold text-gray-900">{section.label}</h4>
                            </div>
                            <p className="text-gray-600 leading-relaxed">{section.description}</p>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setZoomedSection(null)}
                            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors ml-4"
                          >
                            <XMarkIcon className="w-4 h-4 text-gray-600" />
                          </motion.button>
                        </div>
                      )
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Enhanced Thumbnail Navigation */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-4 overflow-x-auto">
                  {screenshots[currentImage].sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => openZoom(section.id)}
                      className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                        zoomedSection === section.id
                          ? "border-teal-500 shadow-lg"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className={`absolute inset-0 ${section.color} opacity-20`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl">{section.icon}</span>
                      </div>
                      <div className="absolute bottom-1 left-1 right-1 bg-black/50 text-white text-xs px-1 py-0.5 rounded text-center truncate">
                        {section.label}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Keyboard Shortcuts */}
                <div className="mt-4 text-center text-sm text-gray-500">
                  <span>Use ← → arrows to navigate • Space to auto-play • 1-5 for sections • Esc to close</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
