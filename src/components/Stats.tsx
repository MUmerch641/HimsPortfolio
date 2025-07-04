'use client';
import { motion } from 'framer-motion';
import { BuildingOfficeIcon, UserIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { TrendingUp } from 'lucide-react';
import CountUp from 'react-countup';
import { useState } from 'react';

// Enhanced stats data
const stats = [
    {
        value: 50,
        label: 'Partner Hospitals',
        suffix: '+',
        icon: BuildingOfficeIcon,
        color: 'from-blue-500 to-blue-600',
        description: 'Trusted healthcare facilities',
    },
    {
        value: 500,
        label: 'Verified Doctors',
        suffix: '+',
        icon: UserIcon,
        color: 'from-green-500 to-green-600',
        description: 'Licensed medical professionals',
    },
    {
        value: 50000,
        label: 'Appointments Booked',
        suffix: '+',
        icon: CalendarIcon,
        color: 'from-purple-500 to-purple-600',
        description: 'Successful consultations',
    },
    {
        value: 99.9,
        label: 'System Uptime',
        suffix: '%',
        icon: ClockIcon,
        color: 'from-orange-500 to-orange-600',
        description: 'Reliable 24/7 service',
    },
];

export default function EnhancedStats() {
    const [startCounting, setStartCounting] = useState(false);

    return (
        <section id="stats" className="relative py-20 bg-white overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgb(59 130 246) 1px, transparent 0)`,
                        backgroundSize: "50px 50px",
                    }}
                ></div>
            </div>

            {/* Floating background elements */}
            <motion.div
                animate={{
                    y: [0, -15, 0],
                    rotate: [0, 3, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                className="absolute top-10 right-10 opacity-[0.03] hidden xl:block"
            >
                <CalendarIcon className="w-28 h-28 text-purple-500" />
            </motion.div>

            <motion.div
                animate={{
                    y: [0, 12, 0],
                    rotate: [0, -2, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 3,
                }}
                className="absolute bottom-10 left-10 opacity-[0.03] hidden xl:block"
            >
                <UserIcon className="w-24 h-24 text-green-500" />
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
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold border border-blue-200 shadow-sm">
                            📊 Our Impact
                        </div>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        PAKHIMS by the
                        <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent block lg:inline"> Numbers</span>
                    </h2>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Trusted by thousands of patients and healthcare providers across Pakistan
                    </p>
                </motion.div>

                {/* Enhanced stats grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    onViewportEnter={() => setStartCounting(true)}
                    viewport={{ once: true, amount: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.1,
                                ease: "easeOut"
                            }}
                            viewport={{ once: true }}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.3 }
                            }}
                            className="group relative "
                        >
                            {/* Background glow effect */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-500 scale-95 group-hover:scale-100`}></div>

                            <div className="relative bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 text-center h-full group-hover:border-gray-200">
                                {/* Icon with gradient background */}
                                <div className="relative mb-6">
                                    <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                                        <stat.icon className="w-8 h-8 text-white" />
                                    </div>
                                </div>

                                {/* Counter with enhanced styling */}
                                <motion.div
                                    className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}
                                    initial={{ scale: 0.8 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    {startCounting ? (
                                        <CountUp
                                            start={0}
                                            end={stat.value}
                                            duration={2.5}
                                            suffix={stat.suffix}
                                            decimals={stat.suffix === '/5' ? 1 : 0}
                                            decimal="."
                                        />
                                    ) : (
                                        <span>0{stat.suffix}</span>
                                    )}
                                </motion.div>

                                {/* Label with better typography */}
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                                    {stat.label}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {stat.description}
                                </p>

                                {/* Bottom accent line that follows card's rounded corners */}
                                <div className={`absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-3xl`}>
                                    <div className={`h-full bg-gradient-to-r from-transparent ${stat.color.includes('blue') ? 'via-blue-500' : stat.color.includes('green') ? 'via-green-500' : stat.color.includes('purple') ? 'via-purple-500' : 'via-orange-500'} to-transparent`}></div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Additional info section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >


                    <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-3xl p-8 border border-gray-100 shadow-lg">
                    <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Growing Every Day
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Our platform continues to expand, connecting more patients with quality healthcare services across Pakistan.
                            Join our growing community of satisfied users.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}