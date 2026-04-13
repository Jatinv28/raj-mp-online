"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, X } from "lucide-react"
import { useStore } from "./store-provider"
import { products } from "@/lib/products"
import { cn } from "@/lib/utils"

export function SearchOverlay() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState(products.slice(0, 4))
  const inputRef = useRef<HTMLInputElement>(null)
  const { closeSearch } = useStore()

  useEffect(() => {
    inputRef.current?.focus()
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [closeSearch])

  useEffect(() => {
    if (query.trim() === "") {
      setResults(products.slice(0, 4))
    } else {
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered.slice(0, 6))
    }
  }, [query])

  return (
    <div className="fixed inset-0 z-50 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/30 backdrop-blur-md"
        onClick={closeSearch}
      />

      {/* Search container */}
      <div className="relative mx-auto max-w-3xl px-4 pt-24 sm:px-6 sm:pt-32">
        <div className="rounded-2xl bg-background shadow-luxury">
          {/* Search input */}
          <div className="flex items-center border-b border-border px-6 py-4">
            <Search className="mr-4 h-5 w-5 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products..."
              className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground"
            />
            <button
              onClick={closeSearch}
              className="ml-4 p-1 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close search"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto p-6">
            {results.length > 0 ? (
              <>
                <p className="mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {query ? "Search Results" : "Popular Products"}
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      onClick={closeSearch}
                      className={cn(
                        "group flex items-center gap-4 rounded-xl p-3 transition-colors",
                        "hover:bg-secondary"
                      )}
                    >
                      <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-secondary">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate group-hover:text-primary transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          ${product.price.toLocaleString()}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No products found</p>
              </div>
            )}
          </div>

          {/* Quick links */}
          <div className="border-t border-border px-6 py-4">
            <div className="flex flex-wrap gap-2">
              {["Outerwear", "Dresses", "Accessories", "Jewelry"].map((cat) => (
                <Link
                  key={cat}
                  href={`/products?category=${cat.toLowerCase()}`}
                  onClick={closeSearch}
                  className="rounded-full bg-secondary px-4 py-1.5 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
