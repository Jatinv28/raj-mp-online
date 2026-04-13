"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { products } from "@/lib/products"
import { ProductCard } from "@/components/store/product-card"
import { motion, useInView } from "framer-motion"

export function BestSellers() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const scrollAmount = scrollRef.current.clientWidth * 0.75
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  const bestSellers = products.filter(p => p.badge === "bestseller" || p.rating >= 4.8)

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  }

  const itemVars = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { type: "spring", stiffness: 60, damping: 15 } 
    }
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-secondary/50 py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
              Most Loved
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light tracking-tight sm:text-5xl">
              Best Sellers
            </h2>
          </div>
          <div className="flex items-center gap-4">
            {/* Navigation buttons */}
            <div className="hidden items-center gap-2 sm:flex">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={cn(
                  "rounded-full border border-border p-3 transition-all",
                  canScrollLeft
                    ? "hover:border-primary hover:text-primary"
                    : "cursor-not-allowed opacity-40"
                )}
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={cn(
                  "rounded-full border border-border p-3 transition-all",
                  canScrollRight
                    ? "hover:border-primary hover:text-primary"
                    : "cursor-not-allowed opacity-40"
                )}
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <Link
              href="/products?filter=bestseller"
              className="group inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              View All
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* Products carousel */}
        <motion.div
          ref={scrollRef}
          onScroll={checkScroll}
          className="mt-12 -mx-4 flex gap-6 overflow-x-auto px-4 pb-4 scrollbar-hide snap-x snap-mandatory sm:gap-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          variants={containerVars}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {bestSellers.map((product, index) => (
            <motion.div
              variants={itemVars}
              key={product.id}
              className="w-[280px] flex-shrink-0 snap-start sm:w-[320px] lg:w-[340px]"
            >
              <ProductCard product={product} priority={index < 2} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
