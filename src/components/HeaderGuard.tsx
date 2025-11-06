"use client"
import React from "react"
import { usePathname } from "next/navigation"
import Header from "@/components/Header"

export default function HeaderGuard() {
  const pathname = usePathname()

  // Hide Header on the privacy policy route
  if (pathname === "/privacy-policy") return null

  return <Header />
}
