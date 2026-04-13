"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Eye, Star } from "lucide-react"
import { useStore, type Product } from "./store-provider"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  className?: string
  priority?: boolean
}

export function ProductCard({ product, className, priority }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore()
  const inWishlist = isInWishlist(product.id)

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const getBadgeStyles = (badge: string) => {
    switch (badge) {
      case "new":
        return "bg-primary text-primary-foreground"
      case "bestseller":
        return "bg-accent text-accent-foreground"
      case "limited":
        return "bg-foreground text-background"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <div
      className={cn("group relative", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            className={cn(
              "object-cover transition-all duration-700",
              isHovered && "scale-105"
            )}
          />

          {/* Overlay on hover */}
          <div
            className={cn(
              "absolute inset-0 bg-foreground/5 transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {product.badge && (
              <span
                className={cn(
                  "px-3 py-1 text-xs font-medium tracking-wide uppercase rounded-full",
                  getBadgeStyles(product.badge)
                )}
              >
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="bg-destructive text-destructive-foreground px-3 py-1 text-xs font-medium rounded-full">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlistClick}
            className={cn(
              "absolute right-3 top-3 p-2.5 rounded-full bg-background/90 backdrop-blur-sm",
              "transition-all duration-300 hover:scale-110",
              inWishlist ? "text-destructive" : "text-foreground"
            )}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
          </button>

          {/* Quick actions on hover */}
          <div
            className={cn(
              "absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-300",
              isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <button
              onClick={handleQuickAdd}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-lg",
                "bg-primary py-3 text-sm font-medium text-primary-foreground",
                "transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              )}
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Bag
            </button>
            <Link
              href={`/products/${product.id}`}
              className={cn(
                "flex items-center justify-center rounded-lg",
                "bg-background/90 backdrop-blur-sm px-4 py-3",
                "transition-all hover:bg-background"
              )}
              aria-label="Quick view"
            >
              <Eye className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Link>

      {/* Product info */}
      <div className="mt-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
        <div className="mt-2 flex items-center gap-3">
          <span className="font-medium">${product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        {/* Rating */}
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3.5 w-3.5",
                  i < Math.floor(product.rating)
                    ? "fill-accent text-accent"
                    : "fill-muted text-muted"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>
      </div>
    </div>
  )
}
