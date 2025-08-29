"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight, User, MapPin, Heart } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Dr. Zahid",
    role: "Cardiologist",
    location: "Rahim Yar khan",
    image: "/images/drZahid.jpg",
    rating: 5,
    text: "PAKHIMS has revolutionized how I manage my practice. The seamless appointment system and patient management tools have increased my efficiency by 40%. It's truly the future of healthcare management.",
    specialty: "Heart Specialist",
    experience: "10+ years",
    appointments: "2,500+",
  },
  {
    id: 2,
    name: "Dr Zahoor Ahmad",
    role: "Peads Surgeon",
    location: "Rahim yar khan",
    image: "https://pakhims.com/public/uploads/c4e5142e-6074-47b3-9a82-c8af6570009d-Zahoor%20pic.jpg",
    rating: 5,
    text: "Finding the right doctor was always a challenge until I discovered PAKHIMS. The platform made it incredibly easy to book appointments and access my medical records. Outstanding service!",
    condition: "Diabetes Management",
    member_since: "2023",
    appointments: "12 visits",
  },
  {
    id: 3,
    name: "Dr sultan mahmood ",
    role: "Pediatrician",
    location: "Islamabad",
    image: "https://pakhims.com/public/uploads/e834853b-b94b-4749-b12b-84bb239b9795-photo%20ceo.jpg", 
    rating: 5,
    text: "The patient communication features and scheduling system have transformed my practice. Parents can easily book appointments and track their children's health records. Highly recommended!",
    specialty: "Child Healthcare",
    experience: "12+ years",
    appointments: "3,200+",
  },
  {
    id: 4,
    name: "Muhammad Azhar Sattar",
    role: "Patient",
    location: "Rawalpindi",
    image: "https://pakhims.com/public/uploads/bfec4ad1-9517-4d01-81fa-6a1c530e5d27-1000091335.jpg",
    rating: 5,
    text: "PAKHIMS saved me time and stress during my pregnancy. Easy appointment booking, timely reminders, and access to all my reports in one place. Exceptional healthcare platform!",
    condition: "Maternity Care",
    member_since: "2022",
    appointments: "25 visits",
  },
  {
    id: 5,
    name: "DR FAROOR BHUTTA",
    role: "Otolaryngologist",
    location: "Peshawar",
    image: "https://pakhims.com/public/uploads/eae0b732-ff19-4c32-a805-6d94796fd8f3-photo.jpeg",
    rating: 5,
    text: "The analytics and patient management features help me provide better care. The platform's reliability and user-friendly interface make it indispensable for modern medical practice.",
    specialty: "Bone & Joint Care",
    experience: "18+ years",
    appointments: "4,100+",
  },
]

// Trust statistics
const trustStats = [
  { value: "98%", label: "Satisfaction Rate", description: "Patient & Doctor Satisfaction" },
  { value: "50K+", label: "Active Users", description: "Growing Community" },
  { value: "4.9", label: "App Rating", description: "5-Star Reviews" },
  { value: "24/7", label: "Support", description: "Always Available" },
]

export default function EnhancedTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <section id="testimonials" className="relative py-20 overflow-hidden">
      {/* Sophisticated background */}
      <div className="absolute inset-0 bg-white to-slate-50/50"></div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(59 130 246) 1px, transparent 0)`,
            backgroundSize: "80px 80px",
          }}
        ></div>
      </div>

      {/* Floating background elements */}
      <motion.div
        animate={{
          y: [0, -25, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-10 opacity-[0.03] hidden xl:block"
      >
        <Quote className="w-40 h-40 text-blue-600" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 6,
        }}
        className="absolute bottom-20 left-10 opacity-[0.03] hidden xl:block"
      >
        <Heart className="w-32 h-32 text-blue-600" />
      </motion.div>

      <div className="relative container mx-auto px-4">
        {/* Enhanced section heading */}
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
              💬 What Our Community Says
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Trusted by
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent block lg:inline">
              {" "}
              Healthcare Heroes
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real stories from doctors and patients who&apos;ve transformed their healthcare experience with PAKHIMS
          </p>
        </motion.div>

        {/* Main testimonial slider */}
        <div className="relative max-w-6xl mx-auto mb-16">
          <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="p-8 md:p-12"
              >
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Testimonial content */}
                  <div className="space-y-6">
                    {/* Quote icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <Quote className="w-8 h-8 text-white" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonials[currentIndex].rating ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600 font-medium">
                        {testimonials[currentIndex].rating}.0 Rating
                      </span>
                    </div>

                    {/* Testimonial text */}
                    <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed italic">
                      &ldquo;{testimonials[currentIndex].text}&rdquo;
                    </blockquote>

                    {/* User info */}
                    <div className="pt-6 border-t border-gray-200/50">
                      <h4 className="text-xl font-bold text-gray-900 mb-1">{testimonials[currentIndex].name}</h4>
                      <p className="text-blue-600 font-semibold mb-2">{testimonials[currentIndex].role}</p>
                      <div className="flex items-center text-sm text-gray-600 space-x-4">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{testimonials[currentIndex].location}</span>
                        </div>
                        {testimonials[currentIndex].specialty && (
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{testimonials[currentIndex].specialty}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* User profile section */}
                  <div className="space-y-6">
                    {/* Profile image */}                      <div className="flex justify-center lg:justify-start">
                        <div className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={testimonials[currentIndex].image || "/placeholder.svg"}
                          alt={testimonials[currentIndex].name}
                          width={128}
                          height={128}
                          className="w-32 h-32 rounded-3xl overflow-hidden shadow-xl border-4 border-white object-cover"
                          loading="lazy"
                        />
                        {/* Trust badge */}
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                          </svg>
                        </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50/50 rounded-2xl p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {testimonials[currentIndex].experience || testimonials[currentIndex].member_since}
                        </div>
                        <div className="text-xs text-gray-600">
                          {testimonials[currentIndex].experience ? "Experience" : "Member Since"}
                        </div>
                      </div>
                      <div className="bg-blue-50/50 rounded-2xl p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {testimonials[currentIndex].appointments}
                        </div>
                        <div className="text-xs text-gray-600">
                          {testimonials[currentIndex].role === "Patient" ? "Visits" : "Patients"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200 pointer-events-auto"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200 pointer-events-auto"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-blue-600 w-8" : "bg-gray-300 hover:bg-blue-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {trustStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-900 font-semibold mb-1">{stat.label}</div>
              <div className="text-xs text-gray-600">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6 text-lg">Join thousands of satisfied users</p>
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
          >
            Start Your Journey Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
