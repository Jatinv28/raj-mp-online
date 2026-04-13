"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { collections } from "@/lib/products"
import { motion } from "framer-motion"

export function FeaturedCollections() {
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVars = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 20 }
    }
  }

  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
            Core Services
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">
            Streamlined Offerings
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Explore our comprehensive range of digital services, strategically designed 
            to fulfill your personal and business needs.
          </p>
        </motion.div>

        {/* Collections grid */}
        <motion.div 
          className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVars}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              variants={itemVars}
              className={cn(
                "group relative aspect-[4/5] overflow-hidden rounded-2xl",
                index === 0 && "md:col-span-2 md:aspect-[16/9] lg:col-span-1 lg:aspect-[4/5]"
              )}
            >
              <Link href={`/products?collection=${collection.id}`} className="absolute inset-0 z-10 w-full h-full">
                <span className="sr-only">View {collection.name}</span>
              </Link>
              
              <motion.div className="relative w-full h-full" whileHover={{ scale: 1.05 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover"
                />
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent pointer-events-none" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8 pointer-events-none">
                <p className="text-xs uppercase tracking-widest text-primary-foreground/70">
                  {collection.productCount} Services
                </p>
                <h3 className="mt-2 font-serif text-2xl font-medium text-primary-foreground lg:text-3xl">
                  {collection.name}
                </h3>
                <p className="mt-2 text-sm text-primary-foreground/80">
                  {collection.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary-foreground">
                  <span>Explore</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
