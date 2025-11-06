import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderGuard from "@/components/HeaderGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PAKHIMS - Pakistan Healthcare Information Management System | Book Appointments & Manage Health Records",
  description: "Pakistan's leading healthcare platform with 50K+ active users and 4.9★ rating. Book verified doctor appointments, manage health records, and access 24/7 support. Experience seamless healthcare management with bank-level security.",
  keywords: [
    "healthcare platform Pakistan",
    "doctor appointments booking",
    "health records management",
    "medical consultation online",
    "PAKHIMS",
    "Pakistan healthcare",
    "verified doctors",
    "medical records",
    "appointment booking system",
    "telemedicine Pakistan",
    "healthcare app",
    "patient management",
    "digital health",
    "online medical consultation",
  ],
  authors: [{ name: "PAKHIMS Team" }],
  creator: "PAKHIMS Healthcare Solutions",
  publisher: "PAKHIMS",
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pakhims.com",
    title: "PAKHIMS - Pakistan Healthcare Information Management System",
    description: "Pakistan's leading healthcare platform with 50K+ active users and 4.9★ rating. Book verified doctor appointments, manage health records, and access 24/7 support.",
    siteName: "PAKHIMS",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "PAKHIMS - Pakistan Healthcare Information Management System",
      },
      {
        url: "/images/1.png",
        width: 800,
        height: 600,
        alt: "PAKHIMS Web Platform Dashboard",
      },
      {
        url: "/images/2.png",
        width: 800,
        height: 600,
        alt: "PAKHIMS Mobile App Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PAKHIMS - Pakistan Healthcare Information Management System",
    description: "Pakistan's leading healthcare platform with 50K+ active users and 4.9★ rating. Book verified doctor appointments, manage health records, and access 24/7 support.",
    images: ["/images/og-image.jpg"],
    creator: "@PAKHIMS",
    site: "@PAKHIMS",
  },
  alternates: {
    canonical: "https://pakhims.com",
  },
  category: "Healthcare Technology",
  classification: "Healthcare Management System",
  applicationName: "PAKHIMS",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://pakhims.com"),
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "PAKHIMS",
    "application-name": "PAKHIMS",
    "msapplication-TileColor": "#10b981",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#10b981",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://pakhims.com/#website",
                  "url": "https://pakhims.com",
                  "name": "PAKHIMS - Pakistan Healthcare Information Management System",
                  "description": "Pakistan's leading healthcare platform with 50K+ active users and 4.9★ rating. Book verified doctor appointments, manage health records, and access 24/7 support.",
                  "publisher": {
                    "@id": "https://pakhims.com/#organization"
                  },
                  "inLanguage": "en-US",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://pakhims.com/search?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "Organization",
                  "@id": "https://pakhims.com/#organization",
                  "name": "PAKHIMS",
                  "alternateName": "Pakistan Healthcare Information Management System",
                  "description": "Healthcare management system connecting patients, providers, and administrators with advanced technology and security.",
                  "url": "https://pakhims.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://pakhims.com/logo.png",
                    "width": 512,
                    "height": 512
                  },
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+92-300-0000000",
                    "contactType": "Customer Service",
                    "areaServed": "PK",
                    "availableLanguage": ["English", "Urdu"]
                  },
                  "sameAs": [
                    "https://www.facebook.com/pakhims",
                    "https://www.twitter.com/pakhims",
                    "https://www.linkedin.com/company/pakhims",
                    "https://www.instagram.com/pakhims"
                  ],
                  "foundingDate": "2020",
                  "foundingLocation": {
                    "@type": "Place",
                    "name": "Pakistan"
                  }
                },
                {
                  "@type": "WebApplication",
                  "@id": "https://pakhims.com/#webapp",
                  "name": "PAKHIMS Healthcare Platform",
                  "url": "https://pakhims.com",
                  "applicationCategory": "HealthApplication",
                  "operatingSystem": "Web, iOS, Android",
                  "description": "Complete healthcare management solution with real-time appointment booking, doctor verification, patient records, and seamless communication tools.",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock"
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "bestRating": "5",
                    "worstRating": "1",
                    "ratingCount": "2500"
                  },
                  "featureList": [
                    "Smart appointment booking with AI recommendations",
                    "Verified doctor network with PMDC certification",
                    "Secure health records with 256-bit encryption",
                    "Real-time communication with healthcare providers",
                    "24/7 customer support and emergency assistance",
                    "Cross-platform synchronization (Web, iOS, Android)",
                    "Biometric authentication and security",
                    "Health insights and analytics dashboard"
                  ]
                },
                {
                  "@type": "Service",
                  "@id": "https://pakhims.com/#service",
                  "name": "Healthcare Management Service",
                  "description": "Professional healthcare management services connecting patients with verified doctors and healthcare providers.",
                  "provider": {
                    "@id": "https://pakhims.com/#organization"
                  },
                  "serviceType": "Healthcare Technology",
                  "areaServed": {
                    "@type": "Country",
                    "name": "Pakistan"
                  },
                  "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Healthcare Services",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Doctor Appointment Booking",
                          "description": "Book appointments with verified healthcare professionals"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Health Records Management",
                          "description": "Secure digital health records with easy access and sharing"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Telemedicine Consultation",
                          "description": "Remote medical consultations with licensed doctors"
                        }
                      }
                    ]
                  }
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://pakhims.com/#faq",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "What is PAKHIMS?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "PAKHIMS is Pakistan's leading healthcare information management system that connects patients, doctors, and healthcare providers through a secure digital platform. We offer appointment booking, health records management, and telemedicine services."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How do I book an appointment?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "You can book appointments through our web platform or mobile app. Simply search for doctors by specialty or location, view available time slots, and confirm your booking. You'll receive instant confirmation and reminders."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Is my health data secure?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, we use bank-level security with 256-bit encryption, multi-factor authentication, and comply with international healthcare data protection standards. Your health information is protected with military-grade security protocols."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Are the doctors verified?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "All doctors on our platform are verified through rigorous PMDC screening processes and continuous quality monitoring. We ensure only licensed healthcare professionals provide services through PAKHIMS."
                      }
                    }
                  ]
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
  <HeaderGuard />
        <main className="pt-16 lg:pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
