"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Heart } from "lucide-react"

const navigation = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Stats", href: "#stats" },
    { name: "Screenshots", href: "#screenshots" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Who It's For", href: "#who-its-for" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
]

export default function EnhancedHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [activeSection, setActiveSection] = useState("home")

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            
            // Header visibility logic
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down - hide header
                setIsVisible(false)
            } else {
                // Scrolling up - show header
                setIsVisible(true)
            }
            
            // Background change
            setIsScrolled(currentScrollY > 20)
            
            // Active section detection
            const sections = navigation.map(nav => nav.href.replace("#", ""))
            const scrollPosition = currentScrollY + 150 // Offset for header
            
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i])
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i])
                    break
                }
            }
            
            setLastScrollY(currentScrollY)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [lastScrollY])

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()
        
        if (href === "#home") {
            window.scrollTo({ top: 0, behavior: "smooth" })
            return
        }

        // Remove the # from href to get the section ID
        const sectionId = href.replace("#", "")
        const targetElement = document.getElementById(sectionId)

        if (targetElement) {
            const headerHeight = 100 // Account for fixed header height + padding
            const targetPosition = targetElement.offsetTop - headerHeight
            
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            })
        }
        
        // Close mobile menu if open
        setMobileMenuOpen(false)
    }

    return (
        <motion.header
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`fixed w-full top-0 z-50 transition-all duration-500 bg-white/95 backdrop-blur-xl shadow-xl border-b border-blue-100/50`}
             >
            {/* : "bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 backdrop-blur-sm" */}
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Enhanced Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex items-center space-x-3 group"
                    >
                        <motion.div
                            className="relative w-11 h-11 lg:w-13 lg:h-13"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300">
                                <Heart className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                            </div>

                            {/* Subtle pulse effect */}
                            <motion.div
                                className="absolute inset-0 bg-blue-500/30 rounded-xl"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.3, 0, 0.3],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                }}
                            />
                        </motion.div>

                        <div>
                            <motion.h1
                                className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                PAKHIMS
                            </motion.h1>
                            <p
                                className={`text-xs transition-colors duration-300 hidden lg:block ${
                                    isScrolled ? "text-gray-500" : "text-gray-600"
                                }`}
                            >
                                Healthcare Excellence
                            </p>
                        </div>
                    </motion.div>

                    {/* Enhanced Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-2">
                        {navigation.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                                className={`flex items-center space-x-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden cursor-pointer ${
                                    activeSection === item.href.replace("#", "")
                                        ? "text-blue-600 bg-blue-50/80 shadow-sm"
                                        : isScrolled
                                        ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50/80"
                                        : "text-gray-700 hover:text-blue-600 hover:bg-white/20 backdrop-blur-sm"
                                }`}
                            >
                                <span className="relative z-10">{item.name}</span>

                                {/* Hover effect background */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl"
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileHover={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </motion.a>
                        ))}
                    </nav>

                    {/* Enhanced Mobile menu button */}
                    <div className="lg:hidden">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className={`p-2.5 rounded-xl transition-all duration-300 ${
                                isScrolled
                                    ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50/80"
                                    : "text-gray-700 hover:text-blue-600 hover:bg-white/20 backdrop-blur-sm"
                            }`}
                        >
                            <AnimatePresence mode="wait">
                                {mobileMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X className="w-6 h-6" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu className="w-6 h-6" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Enhanced Mobile Navigation Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-blue-100/50 shadow-xl"
                    >
                        <div className="container mx-auto px-4 py-6">
                            <nav className="space-y-2">
                                {navigation.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <a
                                            href={item.href}
                                            onClick={(e) => handleNavClick(e, item.href)}
                                            className={`block px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 cursor-pointer ${activeSection === item.href.replace("#", "")
                                                    ? "text-blue-600 bg-blue-50/80 shadow-sm"
                                                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50/80"
                                                }`}
                                        >
                                            {item.name}
                                        </a>
                                    </motion.div>
                                ))}
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}
