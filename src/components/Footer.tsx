"use client";

// import Image from "next/image";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Remove the # from href to get the section ID
    const sectionId = href.replace("#", "");
    const targetElement = document.getElementById(sectionId);

    if (targetElement) {
      const headerHeight = 100; // Account for fixed header height + padding
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer id="contact" className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,100 Q25,75 50,100 T75,75 T100,100 V0 H0 Z" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {/* <Image src="/images/logo.png" alt="PAKHIMS Logo" width={40} height={40} className="rounded-full" /> */}
              <h3 className="text-2xl font-bold text-white">PAKHIMS</h3>
            </div>
            <p className="text-sm text-blue-100 max-w-xs">
              Empowering healthcare with innovative solutions for patients, providers, and beyond.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-100">Explore</h4>
            <ul className="space-y-2">
              <li><a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="text-blue-200 hover:text-white transition-colors cursor-pointer">Home</a></li>
              <li><a href="#features" onClick={(e) => handleNavClick(e, "#features")} className="text-blue-200 hover:text-white transition-colors cursor-pointer">Features</a></li>
              <li><a href="#stats" onClick={(e) => handleNavClick(e, "#stats")} className="text-blue-200 hover:text-white transition-colors cursor-pointer">Stats</a></li>
              <li><a href="#screenshots" onClick={(e) => handleNavClick(e, "#screenshots")} className="text-blue-200 hover:text-white transition-colors cursor-pointer">Screenshots</a></li>
              <li><a href="#how-it-works" onClick={(e) => handleNavClick(e, "#how-it-works")} className="text-blue-200 hover:text-white transition-colors cursor-pointer">How It Works</a></li>
              <li><a href="#who-its-for" onClick={(e) => handleNavClick(e, "#who-its-for")} className="text-blue-200 hover:text-white transition-colors cursor-pointer">Who It&apos;s For</a></li>
              <li><a href="#testimonials" onClick={(e) => handleNavClick(e, "#testimonials")} className="text-blue-200 hover:text-white transition-colors cursor-pointer">Testimonials</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-100">Get in Touch</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-blue-200">
                <EnvelopeIcon className="w-5 h-5" />
                <span>info@pakhims.com</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-200">
                <PhoneIcon className="w-5 h-5" />
                <span>+92 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-200">
                <MapPinIcon className="w-5 h-5" />
                <span>123 Health Lane, Karachi, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-blue-400/30 text-center text-blue-100 text-sm">
          <p>&copy; 2025 PAKHIMS. All rights reserved. Designed with <span className="text-yellow-300">♥</span> by the PAKHIMS Team.</p>
        </div>
      </div>
    </footer>
  );
}