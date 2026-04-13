"use client"

import { useState, useEffect, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Heart,
  Minus,
  Plus,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Check,
  Share2,
} from "lucide-react"
import { getProductById, products } from "@/lib/products"
import { useStore } from "@/components/store/store-provider"
import { ProductCard } from "@/components/store/product-card"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()
  const product = getProductById(id)

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})
  const [isImageZoomed, setIsImageZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [isSticky, setIsSticky] = useState(false)

  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useStore()

  const inWishlist = product ? isInWishlist(product.id) : false
  const images = product?.images || (product ? [product.image] : [])

  // Initialize default variants
  useEffect(() => {
    if (product?.variants) {
      const defaults: Record<string, string> = {}
      product.variants.forEach((v) => {
        if (v.options.length > 0) {
          defaults[v.name] = v.options[0]
        }
      })
      setSelectedVariants(defaults)
    }
  }, [product])

  // Handle sticky add to cart
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 600)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-[96px]">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-light">Product not found</h1>
          <p className="mt-4 text-muted-foreground">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild className="mt-6">
            <Link href="/products">Back to Shop</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleWishlistClick = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariants)
  }

  const handleImageZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isImageZoomed) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <>
      <div className="min-h-screen pt-[96px] pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="py-6 text-sm">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-muted-foreground">/</li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  Shop
                </Link>
              </li>
              <li className="text-muted-foreground">/</li>
              <li>
                <Link
                  href={`/products?category=${product.category.toLowerCase()}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {product.category}
                </Link>
              </li>
              <li className="text-muted-foreground">/</li>
              <li className="text-foreground font-medium truncate max-w-[150px]">
                {product.name}
              </li>
            </ol>
          </nav>

          {/* Product section */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Image gallery */}
            <div className="space-y-4">
              {/* Main image */}
              <div
                className={cn(
                  "relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary cursor-zoom-in",
                  isImageZoomed && "cursor-zoom-out"
                )}
                onClick={() => setIsImageZoomed(!isImageZoomed)}
                onMouseMove={handleImageZoom}
                onMouseLeave={() => setIsImageZoomed(false)}
              >
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  priority
                  className={cn(
                    "object-cover transition-transform duration-300",
                    isImageZoomed && "scale-150"
                  )}
                  style={
                    isImageZoomed
                      ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }
                      : undefined
                  }
                />

                {/* Navigation arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/90 backdrop-blur-sm p-3 shadow-lg transition-transform hover:scale-110"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/90 backdrop-blur-sm p-3 shadow-lg transition-transform hover:scale-110"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute left-4 top-4 flex flex-col gap-2">
                  {product.badge && (
                    <span
                      className={cn(
                        "px-3 py-1 text-xs font-medium uppercase tracking-wide rounded-full",
                        product.badge === "new" && "bg-primary text-primary-foreground",
                        product.badge === "bestseller" && "bg-accent text-accent-foreground",
                        product.badge === "limited" && "bg-foreground text-background"
                      )}
                    >
                      {product.badge}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="bg-destructive text-destructive-foreground px-3 py-1 text-xs font-medium rounded-full">
                      -{discount}% OFF
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg transition-all",
                        selectedImage === index
                          ? "ring-2 ring-primary ring-offset-2"
                          : "opacity-60 hover:opacity-100"
                      )}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="lg:sticky lg:top-[120px] lg:self-start">
              <div className="space-y-6">
                {/* Category */}
                <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                  {product.category}
                </p>

                {/* Title */}
                <h1 className="font-serif text-3xl font-light tracking-tight sm:text-4xl lg:text-5xl">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < Math.floor(product.rating)
                            ? "fill-accent text-accent"
                            : "fill-muted text-muted"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4">
                  <span className="font-serif text-3xl font-medium">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                {/* Variants */}
                {product.variants && product.variants.length > 0 && (
                  <div className="space-y-6 pt-4">
                    {product.variants.map((variant) => (
                      <div key={variant.name}>
                        <label className="text-sm font-medium">
                          {variant.name}: {selectedVariants[variant.name]}
                        </label>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {variant.options.map((option) => (
                            <button
                              key={option}
                              onClick={() =>
                                setSelectedVariants((prev) => ({
                                  ...prev,
                                  [variant.name]: option,
                                }))
                              }
                              className={cn(
                                "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                                selectedVariants[variant.name] === option
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border hover:border-primary"
                              )}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quantity & Add to cart */}
                <div className="flex flex-wrap gap-4 pt-4">
                  {/* Quantity */}
                  <div className="flex items-center rounded-lg border border-border">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-3 hover:bg-secondary transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-3 hover:bg-secondary transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Add to cart */}
                  <button
                    onClick={handleAddToCart}
                    className={cn(
                      "flex-1 rounded-lg bg-primary px-8 py-3",
                      "font-medium text-primary-foreground",
                      "transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
                      "glow-gold"
                    )}
                  >
                    Add to Bag
                  </button>

                  {/* Wishlist */}
                  <button
                    onClick={handleWishlistClick}
                    className={cn(
                      "rounded-lg border border-border p-3 transition-all",
                      inWishlist
                        ? "border-destructive text-destructive"
                        : "hover:border-primary hover:text-primary"
                    )}
                    aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart className={cn("h-5 w-5", inWishlist && "fill-current")} />
                  </button>

                  {/* Share */}
                  <button
                    onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
                    className="rounded-lg border border-border p-3 transition-all hover:border-primary hover:text-primary"
                    aria-label="Share product"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>

                {/* Features */}
                {product.features && (
                  <div className="pt-6 border-t border-border">
                    <h3 className="font-medium mb-4">Key Features</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Trust badges */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                  <div className="flex flex-col items-center text-center">
                    <Truck className="h-5 w-5 text-primary" />
                    <span className="mt-2 text-xs text-muted-foreground">Free Shipping</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <RotateCcw className="h-5 w-5 text-primary" />
                    <span className="mt-2 text-xs text-muted-foreground">30-Day Returns</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <span className="mt-2 text-xs text-muted-foreground">Authenticity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews section */}
          <section className="mt-20 border-t border-border pt-16">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-3xl font-light">Customer Reviews</h2>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < Math.floor(product.rating)
                          ? "fill-accent text-accent"
                          : "fill-muted text-muted"
                      )}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Sample reviews */}
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {[
                {
                  author: "Alexandra M.",
                  date: "2 weeks ago",
                  rating: 5,
                  content: "Absolutely stunning quality. The craftsmanship is impeccable and the fit is perfect. Worth every penny.",
                },
                {
                  author: "James T.",
                  date: "1 month ago",
                  rating: 5,
                  content: "Exceeded my expectations. The attention to detail is remarkable. This is luxury at its finest.",
                },
              ].map((review, index) => (
                <div key={index} className="rounded-xl bg-secondary/50 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-medium text-primary">
                          {review.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{review.author}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < review.rating
                              ? "fill-accent text-accent"
                              : "fill-muted text-muted"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">{review.content}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <section className="mt-20 border-t border-border pt-16">
              <h2 className="font-serif text-3xl font-light">You May Also Like</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Sticky add to cart bar */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-sm",
          "transform transition-transform duration-300 lg:hidden",
          isSticky ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-4">
          <div>
            <p className="font-medium truncate">{product.name}</p>
            <p className="font-serif text-lg font-medium">${product.price.toLocaleString()}</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </>
  )
}
