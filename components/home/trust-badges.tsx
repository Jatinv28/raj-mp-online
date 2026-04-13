"use client"

import { Truck, ShieldCheck, RefreshCw, Award } from "lucide-react"

const badges = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary worldwide delivery on orders over $500",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    description: "SSL encrypted transactions for your peace of mind",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day hassle-free returns on all purchases",
  },
  {
    icon: Award,
    title: "Authenticity",
    description: "100% genuine products with certificate of authenticity",
  },
]

export function TrustBadges() {
  return (
    <section className="border-y border-border bg-card py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((badge) => (
            <div key={badge.title} className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <badge.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-medium">{badge.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
