"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { cn } from "@/lib/utils"

export function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Images */}
          <div className="relative">
            <div
              className={cn(
                "relative aspect-[4/5] overflow-hidden rounded-2xl",
                isVisible && "animate-fade-up"
              )}
            >
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                alt="Artisan craftsmanship"
                fill
                className="object-cover"
              />
              {/* Play button overlay */}
              <button className="absolute inset-0 flex items-center justify-center group">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background/90 backdrop-blur-sm shadow-luxury transition-transform group-hover:scale-110">
                  <Play className="h-8 w-8 text-primary fill-primary ml-1" />
                </div>
              </button>
            </div>
            {/* Floating card */}
            <div
              className={cn(
                "absolute -bottom-6 -right-6 rounded-xl bg-background p-6 shadow-luxury lg:-right-12",
                isVisible && "animate-fade-up"
              )}
              style={{ animationDelay: "0.2s" }}
            >
              <p className="font-serif text-4xl font-medium text-primary">1999</p>
              <p className="mt-1 text-sm text-muted-foreground">Year Founded</p>
            </div>
          </div>

          {/* Content */}
          <div
            className={cn(isVisible && "animate-fade-up")}
            style={{ animationDelay: "0.1s" }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
              Our Story
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light tracking-tight sm:text-5xl">
              Crafted with
              <br />
              <span className="font-medium">Passion & Purpose</span>
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in the heart of Paris, Raj MP Online has been redefining luxury 
                fashion for over two decades. Our journey began with a simple belief: 
                that exceptional quality and timeless design should be accessible 
                to those who appreciate the finer things in life.
              </p>
              <p>
                Every piece in our collection is meticulously crafted by master 
                artisans who share our passion for perfection. From the selection 
                of the finest materials to the final stitch, we ensure that each 
                item meets our exacting standards.
              </p>
            </div>

            {/* Values */}
            <div className="mt-10 grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium">Sustainable Luxury</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Committed to ethical sourcing and environmentally conscious practices.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Timeless Design</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Creating pieces that transcend trends and stand the test of time.
                </p>
              </div>
            </div>

            <Link
              href="/about"
              className={cn(
                "mt-10 inline-flex items-center gap-2 rounded-lg border border-foreground/20 px-8 py-4",
                "text-base font-medium transition-all hover:border-primary hover:text-primary"
              )}
            >
              Discover Our Journey
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
