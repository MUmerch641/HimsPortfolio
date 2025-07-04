"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Calendar, Stethoscope, Heart, Activity, Shield, Clock, Users, Star, ArrowRight, Plus } from "lucide-react"
import Link from "next/link"

// Heartbeat timing configuration (120 BPM = 500ms per beat)
const HEARTBEAT_INTERVAL = 500 // 500ms per beat
const HEARTBEAT_DURATION = 0.1 // Subtle pulse duration
const TYPEWRITER_INTERVAL = 100 // 100ms per character for faster text

// ECG-style medical icons that pulse with heartbeat
const MEDICAL_ICONS_CONFIG = [
  { icon: Activity, x: 10, y: 20, size: 20, delay: 0 },
  { icon: Plus, x: 90, y: 70, size: 16, delay: 0.1 },
  { icon: Shield, x: 15, y: 85, size: 18, delay: 0.2 },
  { icon: Heart, x: 85, y: 25, size: 14, delay: 0.3 },
]

export default function HeartbeatHeroSection() {
  // Static text for SSR/SEO - no typewriter effect during SSR
  const fullText = "PAKHIMS: Book Hospital Appointments with Ease"

  // Hydration-safe state initialization
  const [isHydrated, setIsHydrated] = useState(false)
  const [displayedText, setDisplayedText] = useState(fullText) // Start with full text for SSR
  const [heartbeatPhase, setHeartbeatPhase] = useState(0)
  const [showHeartMessage, setShowHeartMessage] = useState(false)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isMouseInSection, setIsMouseInSection] = useState(false)
  const [isMouseOverInteractive, setIsMouseOverInteractive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse tracking for subtle parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 })

  // Hydration effect - runs only on client
  useEffect(() => {
    setIsHydrated(true)

    // Load animation preference from localStorage only after hydration
    const savedPreference = localStorage.getItem("animationsEnabled")
    if (savedPreference !== null) {
      setAnimationsEnabled(JSON.parse(savedPreference))
    }
  }, [])

  // Save animation preference to local storage
  // const toggleAnimations = () => {
  //   const newState = !animationsEnabled
  //   setAnimationsEnabled(newState)
  //   localStorage.setItem("animationsEnabled", JSON.stringify(newState))
  // }

  // Typewriter effect - only runs after hydration to prevent mismatch
  useEffect(() => {
    if (!isHydrated) return

    // Reset text and start typewriter effect
    setDisplayedText("")
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, TYPEWRITER_INTERVAL)

    return () => clearInterval(timer)
  }, [isHydrated, fullText])

  // Heartbeat controller (only if animations enabled and hydrated)
  useEffect(() => {
    if (!animationsEnabled || !isHydrated) return
    const heartbeatTimer = setInterval(() => {
      setHeartbeatPhase((prev) => (prev + 1) % 4)
    }, HEARTBEAT_INTERVAL)

    return () => clearInterval(heartbeatTimer)
  }, [animationsEnabled, isHydrated])

  // Heart interaction handler - only active after hydration
  const handleHeartInteraction = useCallback(() => {
    if (!isHydrated || isMouseOverInteractive) return
    console.log('Heart interaction triggered!', { animationsEnabled, isMouseInSection, isMouseOverInteractive });
    if (animationsEnabled) {
      setShowHeartMessage(true)
      setTimeout(() => setShowHeartMessage(false), 2500)
    }
  }, [animationsEnabled, isMouseInSection, isHydrated, isMouseOverInteractive])

  // Mouse tracking with custom cursor - only after hydration
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isHydrated || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()

      // Update cursor position for heart cursor (relative to viewport)
      setCursorPosition({ x: e.clientX, y: e.clientY })

      // Original parallax effect (only when mouse is NOT acting as cursor)
      if (animationsEnabled && (!isMouseInSection || isMouseOverInteractive)) {
        const centerX = (e.clientX - rect.left - rect.width / 2) / rect.width
        const centerY = (e.clientY - rect.top - rect.height / 2) / rect.height
        const heartbeatInfluence = Math.sin(heartbeatPhase * Math.PI * 0.5) * 2
        mouseX.set(centerX * 20 + heartbeatInfluence)
        mouseY.set(centerY * 20 + heartbeatInfluence)
      }
    },
    [mouseX, mouseY, heartbeatPhase, animationsEnabled, isMouseInSection, isHydrated, isMouseOverInteractive],
  )

  useEffect(() => {
    if (!isHydrated) return

    const container = containerRef.current
    if (!container) return

    const handleMouseEnter = () => setIsMouseInSection(true)
    const handleMouseLeave = () => setIsMouseInSection(false)

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [handleMouseMove, isHydrated])

  return (
    <section ref={containerRef} id="home" className="min-h-screen relative overflow-hidden" style={{ cursor: isHydrated && isMouseInSection && !isMouseOverInteractive ? 'none' : 'default' }}>

      {/* Animation toggle button */}
      {/* <motion.div
        className="absolute top-4 right-4 z-30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="outline"
          size="sm"
          className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
          onClick={toggleAnimations}
          aria-label={animationsEnabled ? "Disable animations" : "Enable animations"}
        >
          <PauseCircle className="w-5 h-5 mr-2" />
          {animationsEnabled ? "Pause Animations" : "Play Animations"}
        </Button>
      </motion.div> */}

      {/* Heartbeat-driven background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)"
        }}
      />

      {/* Heartbeat wave overlay with subtle ECG effect */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: 0.1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-transparent to-blue-600/20" />
        <motion.div
          className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          animate={
            isHydrated && animationsEnabled
              ? {
                x: ["-100%", "100%"],
                opacity: [0, 0.5, 0],
              }
              : { opacity: 0 }
          }
          transition={
            isHydrated && animationsEnabled
              ? {
                x: { duration: HEARTBEAT_INTERVAL / 1000, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                opacity: { duration: HEARTBEAT_DURATION * 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              }
              : {}
          }
        />
      </motion.div>

      {/* Central pulsing heart - becomes cursor when mouse is in section */}
      <motion.div
        className={`absolute z-20 ${isHydrated && isMouseInSection && !isMouseOverInteractive ? 'pointer-events-auto' : 'pointer-events-none'}`}
        style={{
          left: isHydrated && isMouseInSection && !isMouseOverInteractive ? cursorPosition.x : '50%',
          top: isHydrated && isMouseInSection && !isMouseOverInteractive ? cursorPosition.y : '50%',
          transform: 'translate(-50%, -50%)',
          position: isHydrated && isMouseInSection && !isMouseOverInteractive ? 'fixed' : 'absolute',
          x: isHydrated && !isMouseInSection && animationsEnabled ? springX : 0,
          y: isHydrated && !isMouseInSection && animationsEnabled ? springY : 0,
          opacity: isHydrated && isMouseInSection && !isMouseOverInteractive ? 1 : (isMouseInSection ? 0 : 1),
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          opacity: { duration: 0.2 }
        }}
        onContextMenu={(e) => {
          if (isHydrated && isMouseInSection && !isMouseOverInteractive) {
            e.preventDefault()
            handleHeartInteraction()
          }
        }}
        onClick={() => {
          if (isHydrated && isMouseInSection && !isMouseOverInteractive) {
            handleHeartInteraction()
          }
        }}
      >
        <motion.div
          animate={
            isHydrated && animationsEnabled
              ? {
                scale: (isMouseInSection && !isMouseOverInteractive) ? [1, 1.1, 1] : [1, 1.05, 1],
                filter: [
                  "drop-shadow(0 0 10px rgba(255,255,255,0.3))",
                  "drop-shadow(0 0 20px rgba(255,255,255,0.5))",
                  "drop-shadow(0 0 10px rgba(255,255,255,0.3))",
                ],
              }
              : {}
          }
          transition={
            isHydrated && animationsEnabled
              ? {
                duration: HEARTBEAT_DURATION,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: HEARTBEAT_INTERVAL / 1000 - HEARTBEAT_DURATION,
                ease: "easeInOut",
              }
              : {}
          }
          className={isHydrated && isMouseInSection && !isMouseOverInteractive ? "cursor-pointer" : ""}
          whileHover={isHydrated && isMouseInSection && !isMouseOverInteractive ? { scale: 1.2 } : {}}
          whileTap={isHydrated && isMouseInSection && !isMouseOverInteractive ? { scale: 0.9 } : {}}
        >
          <Heart className={`${isHydrated && isMouseInSection && !isMouseOverInteractive ? 'w-8 h-8' : 'w-16 h-16'} text-white fill-blue-300/40 stroke-2 transition-all duration-300`} />
        </motion.div>

        <AnimatePresence>
          {showHeartMessage && isHydrated && animationsEnabled && (
            <>
              <motion.div
                className="fixed pointer-events-none z-50"
                style={{
                  left: cursorPosition.x,
                  top: cursorPosition.y,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 4, opacity: 0 }}
                exit={{ scale: 5, opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <div className="w-8 h-8 border-2 border-white/30 rounded-full" />
              </motion.div>
              <motion.div
                className="fixed pointer-events-none z-50"
                style={{
                  left: cursorPosition.x,
                  top: cursorPosition.y - 60,
                  transform: 'translate(-50%, 0)',
                }}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: -20, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.8 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
              >
                <div className="bg-white/90 backdrop-blur-md text-blue-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg whitespace-nowrap">
                  💙 Your Health, Our Priority
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Heartbeat-synchronized medical icons */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.12, x: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-20 right-10 hidden lg:block"
        style={{ x: isHydrated && animationsEnabled ? springX : 0, y: isHydrated && animationsEnabled ? springY : 0 }}
      >
        <motion.div
          animate={
            isHydrated && animationsEnabled
              ? {
                scale: [1, 1.05, 1],
                opacity: [0.08, 0.12, 0.08],
                rotate: [0, 2, 0],
              }
              : {}
          }
          transition={
            isHydrated && animationsEnabled
              ? {
                duration: HEARTBEAT_DURATION,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: HEARTBEAT_INTERVAL / 1000 - HEARTBEAT_DURATION,
                ease: "easeInOut",
              }
              : {}
          }
        >
          <Stethoscope className="w-64 h-64 text-white" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 0.12, y: 0 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute bottom-20 left-10 hidden lg:block"
        style={{ x: isHydrated && animationsEnabled ? springX : 0, y: isHydrated && animationsEnabled ? springY : 0 }}
      >
        <motion.div
          animate={
            isHydrated && animationsEnabled
              ? {
                scale: [1, 1.05, 1],
                opacity: [0.08, 0.12, 0.08],
                rotate: [0, -2, 0],
              }
              : {}
          }
          transition={
            isHydrated && animationsEnabled
              ? {
                duration: HEARTBEAT_DURATION,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: HEARTBEAT_INTERVAL / 1000 - HEARTBEAT_DURATION,
                ease: "easeInOut",
                delay: 0.2,
              }
              : {}
          }
        >
          <Calendar className="w-48 h-48 text-white" />
        </motion.div>
      </motion.div>

      {/* Floating medical icons with heartbeat */}
      {MEDICAL_ICONS_CONFIG.map((config, index) => (
        <motion.div
          key={index}
          className="absolute hidden xl:block opacity-15"
          style={{
            left: `${config.x}%`,
            top: `${config.y}%`,
          }}
          animate={
            isHydrated && animationsEnabled
              ? {
                scale: [1, 1.05, 1],
                opacity: [0.1, 0.15, 0.1],
                y: [0, -8, 0],
              }
              : {}
          }
          transition={
            isHydrated && animationsEnabled
              ? {
                duration: HEARTBEAT_DURATION,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: HEARTBEAT_INTERVAL / 1000 - HEARTBEAT_DURATION,
                ease: "easeInOut",
                delay: config.delay,
              }
              : {}
          }
        >
          <div className="w-12 h-12 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <config.icon className="w-6 h-6 text-white" />
          </div>
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Heartbeat-synchronized trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="justify-center items-center gap-6 mb-8 hidden lg:flex"
          >
            {[
              { icon: Users, value: "50K+", label: "Patients" },
              { icon: Star, value: "4.9", label: "Rating" },
              { icon: Shield, value: "Secure", label: "Platform" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 border border-white/15"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                onMouseEnter={() => setIsMouseOverInteractive(true)}
                onMouseLeave={() => setIsMouseOverInteractive(false)}
              >
                <div className="flex items-center gap-2 text-white/90">
                  <motion.div>
                    <stat.icon className="w-4 h-4" />
                  </motion.div>
                  <span className="font-semibold text-sm">{stat.value}</span>
                  <span className="text-xs text-white/70">{stat.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Professional headline with heartbeat cursor */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="inline-block mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.div
                className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20"
              >
                🏥 Pakistan&apos;s Leading Healthcare Platform
              </motion.div>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              <motion.span
                animate={
                  isHydrated && animationsEnabled
                    ? {
                      textShadow: [
                        "0 0 10px rgba(255,255,255,0.3)",
                        "0 0 15px rgba(255,255,255,0.5)",
                        "0 0 10px rgba(255,255,255,0.3)",
                      ],
                    }
                    : {}
                }
                transition={
                  isHydrated && animationsEnabled
                    ? {
                      duration: HEARTBEAT_DURATION,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: HEARTBEAT_INTERVAL / 1000 - HEARTBEAT_DURATION,
                      ease: "easeInOut",
                    }
                    : {}
                }
              >
                {displayedText}
              </motion.span>
              <motion.span
                animate={
                  isHydrated && animationsEnabled
                    ? {
                      opacity: [1, 0],
                      scale: [1, 1.05, 1],
                    }
                    : { opacity: isHydrated ? 1 : 0 }
                }
                transition={
                  isHydrated && animationsEnabled
                    ? {
                      opacity: { duration: 0.6, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
                      scale: {
                        duration: HEARTBEAT_DURATION,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: HEARTBEAT_INTERVAL / 1000 - HEARTBEAT_DURATION,
                        ease: "easeInOut",
                      },
                    }
                    : {}
                }
                className="inline-block w-1 h-16 md:h-20 lg:h-24 bg-white ml-2"
              />
            </h1>
          </motion.div>

          {/* Heartbeat-influenced subheading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="mb-12"
          >
            <motion.p
              className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light"
              animate={
                isHydrated && animationsEnabled
                  ? {
                    opacity: [0.9, 1, 0.9],
                    scale: [1, 1.005, 1],
                  }
                  : {}
              }
              transition={
                isHydrated && animationsEnabled
                  ? {
                    duration: HEARTBEAT_DURATION,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: HEARTBEAT_INTERVAL / 1000 - HEARTBEAT_DURATION,
                    ease: "easeInOut",
                  }
                  : {}
              }
            >
              Experience seamless healthcare management with intelligent scheduling, comprehensive medical records, and trusted professional care.
            </motion.p>
          </motion.div>

          {/* Heartbeat-synchronized CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link href="https://patient.pakhims.com/login">
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setIsMouseOverInteractive(true)}
                onMouseLeave={() => setIsMouseOverInteractive(false)}
              >
                <Button
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                >

                  <Calendar className="w-5 h-5 mr-2" />
                  Book Appointment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </Link>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => setIsMouseOverInteractive(true)}
              onMouseLeave={() => setIsMouseOverInteractive(false)}
            >
              <a
                href="https://pakhims.com/sign-up"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-transparent backdrop-blur-md border-2 border-white/20 text-white hover:bg-white/10 px-8 py-2 text-lg font-semibold rounded-xl transition-all duration-300 hover:border-white/30 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <Stethoscope className="w-5 h-5 mr-2" />
                Pakhims Signup
              </a>
            </motion.div>
          </motion.div>

          {/* Professional trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-blue-100/80 text-sm"
          >
            {[
              { icon: Shield, text: "HIPAA Compliant & Secure" },
              { icon: Heart, text: "Trusted by Healthcare Professionals" },
              { icon: Clock, text: "24/7 Emergency Support" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <motion.div
                  animate={
                    isHydrated && animationsEnabled
                      ? {
                        scale: [1, 1.05, 1],
                      }
                      : {}
                  }
                  transition={
                    isHydrated && animationsEnabled
                      ? {
                        duration: HEARTBEAT_DURATION,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: HEARTBEAT_INTERVAL / 1000 - HEARTBEAT_DURATION,
                        ease: "easeInOut",
                        delay: index * 0.1,
                      }
                      : {}
                  }
                >
                  <item.icon className="w-4 h-4" />
                </motion.div>
                <span>{item.text}</span>
                {index < 2 && <div className="hidden sm:block w-1 h-1 bg-blue-200/50 rounded-full ml-6"></div>}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Heartbeat pulse indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        animate={
          isHydrated && animationsEnabled
            ? {
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              filter: [
                "drop-shadow(0 0 5px rgba(255,255,255,0.2))",
                "drop-shadow(0 0 10px rgba(255,255,255,0.4))",
                "drop-shadow(0 0 5px rgba(255,255,255,0.2))",
              ],
            }
            : {}
        }
        transition={
          isHydrated && animationsEnabled
            ? {
              duration: HEARTBEAT_DURATION,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: HEARTBEAT_INTERVAL / 1000 - HEARTBEAT_DURATION,
              ease: "easeInOut",
            }
            : {}
        }
      >
        <Heart className="w-4 h-4 text-white fill-white/50" />
      </motion.div>

      {/* Subtle ECG line at bottom */}
      <motion.div
        className="absolute bottom-4 left-0 w-full h-0.5 opacity-20 z-20"
        animate={
          isHydrated && animationsEnabled
            ? {
              background: [
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.6) 50%, transparent 90%)",
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
              ],
            }
            : {}
        }
        transition={
          isHydrated && animationsEnabled
            ? {
              duration: HEARTBEAT_DURATION * 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: HEARTBEAT_INTERVAL / 1000 - HEARTBEAT_DURATION * 2,
              ease: "easeInOut",
            }
            : {}
        }
      />
    </section>
  )
}