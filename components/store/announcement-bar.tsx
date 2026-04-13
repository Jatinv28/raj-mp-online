"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-primary text-primary-foreground">
      <div className="overflow-hidden py-2.5">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-8">
              <span className="text-sm font-medium tracking-wide">
                Complimentary Shipping on Orders Over $500
              </span>
              <span className="text-accent">*</span>
              <span className="text-sm font-medium tracking-wide">
                New Collection Now Available
              </span>
              <span className="text-accent">*</span>
              <span className="text-sm font-medium tracking-wide">
                Exclusive Members: 15% Off First Order
              </span>
              <span className="text-accent">*</span>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className={cn(
          "absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full",
          "hover:bg-primary-foreground/10 transition-colors"
        )}
        aria-label="Close announcement"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
