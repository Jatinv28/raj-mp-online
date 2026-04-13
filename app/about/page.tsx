"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Leaf, Heart, Globe, Award } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const timeline = [
  {
    year: "1999",
    title: "The Beginning",
    description: "Founded in Paris with a vision to redefine luxury fashion for the modern era.",
  },
  {
    year: "2005",
    title: "Global Expansion",
    description: "Opened flagship stores in New York, London, and Tokyo, establishing a global presence.",
  },
  {
    year: "2012",
    title: "Sustainability Commitment",
    description: "Launched our eco-conscious initiative, pioneering sustainable luxury practices.",
  },
  {
    year: "2018",
    title: "Digital Innovation",
    description: "Introduced our digital-first approach, bringing luxury directly to discerning clients worldwide.",
  },
  {
    year: "2024",
    title: "A New Chapter",
    description: "Celebrating 25 years of excellence with our most innovative collection yet.",
  },
]

const values = [
  {
    icon: Leaf,
    title: "Sustainability",
    description: "We believe luxury and sustainability can coexist. Our commitment to ethical sourcing and environmentally conscious practices guides every decision.",
  },
  {
    icon: Heart,
    title: "Craftsmanship",
    description: "Each piece is meticulously crafted by master artisans who share our passion for perfection. Quality is never compromised.",
  },
  {
    icon: Globe,
    title: "Global Vision",
    description: "We draw inspiration from cultures around the world, creating pieces that resonate with a global audience while honoring local traditions.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "From the selection of materials to the final stitch, we maintain the highest standards of excellence in everything we do.",
  },
]

const team = [
  {
    name: "Isabelle Fontaine",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    name: "Alexander Chen",
    role: "Head of Design",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Sofia Rodriguez",
    role: "Sustainability Lead",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
]

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  }

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
  }

  return (
    <div className="min-h-screen pt-[56px] overflow-hidden">
      {/* Hero */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80"
            alt="Raj MP Online atelier"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </motion.div>
        <div className="absolute inset-0 flex items-end">
          <motion.div 
            className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 w-full"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
              Our Story
            </p>
            <h1 className="mt-4 font-serif text-5xl font-light tracking-tight sm:text-6xl lg:text-7xl">
              Crafting Elegance
              <br />
              <span className="font-medium">Since 1999</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-4xl font-light tracking-tight sm:text-5xl">
                A Legacy of
                <br />
                <span className="font-medium">Timeless Design</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Raj MP Online was born from a simple yet profound belief: that true luxury 
                  lies in the perfect marriage of exceptional quality and timeless design. 
                  Founded in the heart of Paris, we set out to create pieces that would 
                  transcend fleeting trends and stand the test of time.
                </p>
                <p>
                  Today, after more than two decades, our commitment remains unchanged. 
                  Every collection we create is a testament to our founding principles, 
                  crafted with the same passion and precision that defined our very first piece.
                </p>
              </div>
              <Link
                href="/products"
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4",
                  "font-medium text-primary-foreground",
                  "transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                )}
              >
                Explore Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div
              className="relative aspect-[4/5] overflow-hidden rounded-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
                alt="Raj MP Online atelier"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary/50 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
              Our Values
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light tracking-tight sm:text-5xl">
              What Drives Us
            </h2>
          </motion.div>

          <motion.div 
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVars}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {values.map((value, index) => (
              <motion.div
                variants={itemVars}
                whileHover={{ y: -5 }}
                key={value.title}
                className="rounded-2xl bg-background p-8 shadow-luxury transition-colors hover:border-primary border border-transparent"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-6 font-medium text-lg">{value.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
              Our Journey
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light tracking-tight sm:text-5xl">
              25 Years of Excellence
            </h2>
          </motion.div>

          <div className="mt-16 relative">
            <motion.div 
              className="absolute left-4 top-0 bottom-0 w-px bg-border lg:left-1/2 lg:-translate-x-px origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            <motion.div 
              className="space-y-12"
              variants={containerVars}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {timeline.map((item, index) => (
                <motion.div
                  variants={itemVars}
                  key={item.year}
                  className="relative pl-12 lg:pl-0"
                >
                  <div
                    className={cn(
                      "lg:grid lg:grid-cols-2 lg:gap-8",
                      index % 2 === 0 ? "lg:text-right" : ""
                    )}
                  >
                    <motion.div
                      whileHover={{ scale: 1.3 }}
                      className={cn(
                        "absolute left-2 top-2 h-4 w-4 rounded-full border-4 border-background bg-primary z-10 transition-transform",
                        "lg:left-1/2 lg:-translate-x-1/2"
                      )}
                    />
                    <div
                      className={cn(
                        index % 2 === 0 ? "lg:pr-12" : "lg:col-start-2 lg:pl-12"
                      )}
                    >
                      <span className="font-serif text-3xl font-medium text-primary">
                        {item.year}
                      </span>
                      <h3 className="mt-2 text-xl font-medium">{item.title}</h3>
                      <p className="mt-2 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-secondary/50 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
              Our Team
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light tracking-tight sm:text-5xl">
              The Visionaries
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
              Meet the creative minds behind Raj MP Online, dedicated to bringing you 
              the finest in luxury fashion.
            </p>
          </motion.div>

          <motion.div 
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVars}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {team.map((member, index) => (
              <motion.div
                variants={itemVars}
                whileHover={{ y: -10 }}
                key={member.name}
                className="group text-center"
              >
                <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-full shadow-lg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-6 font-medium text-lg">{member.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center sm:px-16 lg:py-24"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative z-10">
              <h2 className="font-serif text-3xl font-light tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
                Experience Luxury
              </h2>
              <p className="mt-4 mx-auto max-w-xl text-primary-foreground/80">
                Discover our curated collection and find pieces that speak to your 
                unique sense of style.
              </p>
              <Link
                href="/products"
                className={cn(
                  "mt-8 inline-flex items-center gap-2 rounded-lg bg-background px-8 py-4",
                  "font-medium text-foreground",
                  "transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                )}
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            {/* Decorative elements */}
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" 
            />
            <motion.div 
              animate={{ rotate: -360 }} 
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" 
            />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
