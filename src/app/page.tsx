"use client";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";
import Screenshots from "@/components/Screenshots";
import WhoItsFor from "@/components/WhoItFor";
import EnhancedTestimonials from "@/components/Testimonials";
import EnhancedFooter from "@/components/Footer";
import ClientOnly from "@/components/ClientOnly";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Stats />
      <Screenshots />
      <ClientOnly>
        <HowItWorks />
      </ClientOnly>
      <WhoItsFor />
      <EnhancedTestimonials />
      <EnhancedFooter />
    </>
  );
}
