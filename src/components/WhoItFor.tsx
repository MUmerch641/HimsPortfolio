"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UserIcon, HeartIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const audienceData = [
  {
    id: 1,
    title: "Patients",
    description: "Easily book appointments, manage health records, and communicate with doctors from anywhere.",
    icon: UserIcon,
    color: "from-emerald-500 to-sapphire-500",
  },
  {
    id: 2,
    title: "Healthcare Providers",
    description: "Streamline patient management, access real-time data, and enhance care delivery.",
    icon: HeartIcon,
    color: "from-sapphire-500 to-yellow-500",
  },
  {
    id: 3,
    title: "Caregivers",
    description: "Monitor loved ones’ health, schedule visits, and stay updated with personalized insights.",
    icon: UserGroupIcon,
    color: "from-yellow-500 to-emerald-500",
  },
  {
    id: 4,
    title: "Healthcare Administrators",
    description: "Optimize operations, manage resources, and improve patient outcomes with data-driven insights.",
    icon: UserGroupIcon,
    color: "from-emerald-500 to-sapphire-500",
  },
  {
    id: 5,
    title: "Insurance Providers",
    description: "Access patient data securely, streamline claims processing, and enhance service delivery.",
    icon: UserGroupIcon,
    color: "from-sapphire-500 to-yellow-500",
  },
  {
    id: 6,
    title: "Researchers",
    description: "Utilize aggregated health data for studies, improving healthcare practices and innovations.",
    icon: UserGroupIcon,
    color: "from-yellow-500 to-emerald-500",
  },
];

export default function WhoItsFor() {
  // Hydration-safe state initialization - assume mobile-first for SSR
  const [isHydrated, setIsHydrated] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // Mobile-first approach for SSR

  // Hydration effect - runs only on client
  useEffect(() => {
    setIsHydrated(true);
    
    // Safe window access after hydration
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="who-its-for" className="relative py-20 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
      {/* SEO-friendly structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "PAKHIMS Healthcare Platform",
            "description": "Healthcare management system connecting patients, providers, and administrators",
            "audience": audienceData.map(audience => ({
              "@type": "Audience",
              "name": audience.title,
              "description": audience.description
            }))
          })
        }}
      />
      
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_2px_2px,rgb(16_185_129)_1px,transparent_0)] bg-[length:60px_60px]"></div>

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <div className="bg-gradient-to-r from-emerald-50 to-sapphire-50 text-emerald-700 px-6 py-3 rounded-full text-sm font-semibold border border-emerald-200 shadow-md">
              Who Benefits
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Who It’s <span className="bg-gradient-to-r from-emerald-600 to-sapphire-600 bg-clip-text text-transparent">For</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">PAKHIMS connects a diverse ecosystem to revolutionize healthcare.</p>
        </motion.div>

        {/* Healthcare Ecosystem Wheel - SSR-safe rendering */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Desktop Layout - Only show interactive version after hydration */}
          {isHydrated && !isMobile ? (
            <div className="relative w-full aspect-square">
              {audienceData.map((audience, index) => {
                const angle = (index / audienceData.length) * 360;
                const rad = (angle * Math.PI) / 180;
                const x = 50 + 35 * Math.cos(rad);
                const y = 50 + 35 * Math.sin(rad);

                return (
                  <motion.div
                    key={audience.id}
                    className="absolute text-center"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className={`w-16 h-16 bg-${audience.color.split("-")[1]}-100 rounded-full flex items-center justify-center mb-2`}>
                      <audience.icon className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{audience.title}</h3>
                    <p className="text-sm text-gray-600 max-w-[120px]">{audience.description}</p>
                  </motion.div>
                );
              })}
              {/* Wave Overlay */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                <path
                  d="M0,50 Q25,30 50,50 T100,50 V100 H0 Z"
                  fill="none"
                  stroke="url(#waveGradient)"
                  strokeWidth="2"
                  opacity="0.3"
                />
                <defs>
                  <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: "#10B981" }} />
                    <stop offset="100%" style={{ stopColor: "#3B82F6" }} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          ) : (
            /* Mobile Layout & SSR Fallback - Always visible for SEO */
            <div className="space-y-8">
              {audienceData.map((audience, index) => (
                <motion.div 
                  key={audience.id} 
                  className="flex items-center space-x-4 bg-white rounded-xl p-4 shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHydrated ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: isHydrated ? index * 0.1 : 0 }}
                >
                  <div className={`w-12 h-12 bg-${audience.color.split("-")[1]}-100 rounded-full flex items-center justify-center`}>
                    <audience.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{audience.title}</h3>
                    <p className="text-sm text-gray-600">{audience.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}