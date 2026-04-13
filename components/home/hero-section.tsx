"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
// Use Framer Motion for advanced animations
import { motion, useScroll, useTransform } from "framer-motion"

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  // Create smooth parallax values
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Motion variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 20 }
    }
  }

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden pt-[56px]">
      {/* Background image with parallax */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 -top-[56px]">
        <Image
          src="/hero-bg.png"
          alt="Premium digital services portal"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex min-h-[calc(100vh-56px)] flex-col justify-center py-20 lg:max-w-2xl"
          variants={containerVars}
          initial="hidden"
          animate="visible"
        >
          {/* Overline */}
          <motion.p variants={itemVars} className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
            Next Generation Connectivity
          </motion.p>

          {/* Main headline */}
          <motion.h1 variants={itemVars} className="mt-6 font-serif text-5xl font-light leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
            Digital Services
            <br />
            <span className="font-medium">Redefined</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p variants={itemVars} className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Welcome to RAJ MP ONLINE. Your premier gateway to exceptional digital services, online applications, and comprehensive civic solutions.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVars} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/services"
              className={cn(
                "group inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4",
                "text-base font-medium text-primary-foreground",
                "transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
                "glow-gold"
              )}
            >
              Explore Services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVars} className="mt-16 flex flex-wrap gap-8 sm:gap-16">
            <div>
              <p className="font-serif text-3xl font-medium sm:text-4xl">15+</p>
              <p className="mt-1 text-sm text-muted-foreground">Years Experience</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-medium sm:text-4xl">1M+</p>
              <p className="mt-1 text-sm text-muted-foreground">Applications Processed</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-medium sm:text-4xl">100%</p>
              <p className="mt-1 text-sm text-muted-foreground">Secure & Reliable</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Scroll
          </span>
          <div className="h-12 w-px bg-gradient-to-b from-muted-foreground to-transparent" />
        </div>
      </motion.div>
    </section>
  )
}
