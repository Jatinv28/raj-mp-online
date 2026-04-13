"use client"

import Link from "next/link"
import { Heart, ShoppingBag, ArrowRight } from "lucide-react"
import { useStore } from "@/components/store/store-provider"
import { ProductCard } from "@/components/store/product-card"
import { cn } from "@/lib/utils"

export default function WishlistPage() {
  const { wishlist } = useStore()

  return (
    <div className="min-h-screen pt-[96px] pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-12 text-center lg:py-16">
          <div className="flex items-center justify-center gap-3">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mt-4 font-serif text-4xl font-light tracking-tight sm:text-5xl">
            My Wishlist
          </h1>
          <p className="mt-4 text-muted-foreground">
            {wishlist.length > 0
              ? `You have ${wishlist.length} item${wishlist.length === 1 ? "" : "s"} in your wishlist`
              : "Your wishlist is empty"}
          </p>
        </div>

        {wishlist.length > 0 ? (
          <>
            {/* Products grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {wishlist.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Continue shopping */}
            <div className="mt-16 text-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                Continue Shopping
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
              <Heart className="h-12 w-12 text-muted-foreground/50" />
            </div>
            <h2 className="mt-6 font-serif text-2xl font-light">
              Your wishlist is empty
            </h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              Save items you love by clicking the heart icon on any product. 
              They&apos;ll appear here for easy access.
            </p>
            <Link
              href="/products"
              className={cn(
                "mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4",
                "font-medium text-primary-foreground",
                "transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              )}
            >
              <ShoppingBag className="h-5 w-5" />
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
