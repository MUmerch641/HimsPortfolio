"use client";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import ClientOnly from "@/components/ClientOnly";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";
import Screenshots from "@/components/Screenshots";
import WhoItsFor from "@/components/WhoItFor";
import EnhancedTestimonials from "@/components/Testimonials";
import EnhancedFooter from "@/components/Footer";

export default function Home() {
  return (
    <ClientOnly fallback={
      <div className="min-h-screen bg-gradient-to-r from-blue-800 to-blue-400 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">PAKHIMS</h1>
          <p className="text-xl">Loading Healthcare Platform...</p>
        </div>
      </div>
    }
    >
      <Hero />
      <Features />
      <Stats />
      <Screenshots />
      <HowItWorks />
      <WhoItsFor />
      <EnhancedTestimonials />
      <EnhancedFooter />
    </ClientOnly>
  );
}
