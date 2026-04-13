"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { SlidersHorizontal, Grid3X3, LayoutGrid } from "lucide-react"
import { products, categories } from "@/lib/products"
import { ProductCard } from "@/components/store/product-card"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence, type Variants } from "framer-motion"

const priceRanges = [
  { label: "All Prices", value: "all" },
  { label: "Under $500", value: "0-500" },
  { label: "$500 - $1,000", value: "500-1000" },
  { label: "$1,000 - $2,500", value: "1000-2500" },
  { label: "Over $2,500", value: "2500+" },
] as const

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Rated", value: "rating" },
] as const

type GridView = "3" | "4"
type SortValue = (typeof sortOptions)[number]["value"]
type PriceValue = (typeof priceRanges)[number]["value"]

const containerVars: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

const itemVars: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 25,
    },
  },
}

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || "all"

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [selectedPrice, setSelectedPrice] = useState<PriceValue>("all")
  const [sortBy, setSortBy] = useState<SortValue>("featured")
  const [gridView, setGridView] = useState<GridView>("4")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [inStockOnly, setInStockOnly] = useState(false)

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    if (selectedPrice !== "all") {
      if (selectedPrice === "2500+") {
        filtered = filtered.filter((p) => p.price >= 2500)
      } else {
        const [min, max] = selectedPrice.split("-").map(Number)
        filtered = filtered.filter((p) => p.price >= min && p.price <= max)
      }
    }

    if (inStockOnly) {
      filtered = filtered.filter((p) => p.inStock)
    }

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => (a.badge === "new" ? -1 : b.badge === "new" ? 1 : 0))
        break
      default:
        filtered.sort((a, b) =>
          a.badge === "bestseller" ? -1 : b.badge === "bestseller" ? 1 : 0
        )
    }

    return filtered
  }, [selectedCategory, selectedPrice, sortBy, inStockOnly])

  const activeFiltersCount = [
    selectedCategory !== "all",
    selectedPrice !== "all",
    inStockOnly,
  ].filter(Boolean).length

  const clearFilters = () => {
    setSelectedCategory("all")
    setSelectedPrice("all")
    setInStockOnly(false)
  }

  return (
    <div className="min-h-screen pt-[96px] pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="py-12 text-center lg:py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-serif text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">
            Shop Collection
          </h1>
          <p className="mt-4 text-muted-foreground">
            Discover our curated selection of luxury fashion and accessories
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterOpen(true)}
              className={cn(
                "flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary lg:hidden"
              )}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <p className="text-sm text-muted-foreground">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label
                htmlFor="sort"
                className="hidden text-sm text-muted-foreground sm:inline"
              >
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortValue)}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden items-center gap-1 rounded-lg border border-border p-1 sm:flex">
              <button
                onClick={() => setGridView("3")}
                className={cn(
                  "rounded p-1.5 transition-colors",
                  gridView === "3"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary"
                )}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setGridView("4")}
                className={cn(
                  "rounded p-1.5 transition-colors",
                  gridView === "4"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary"
                )}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 flex gap-8">
          <motion.aside
            className="hidden w-64 flex-shrink-0 lg:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="sticky top-[120px] space-y-8">
              <div>
                <h3 className="font-medium">Category</h3>
                <ul className="mt-4 space-y-2">
                  {categories.map((cat) => (
                    <li key={cat.slug}>
                      <button
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={cn(
                          "w-full text-left text-sm transition-colors",
                          selectedCategory === cat.slug
                            ? "font-medium text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {cat.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium">Price Range</h3>
                <ul className="mt-4 space-y-2">
                  {priceRanges.map((range) => (
                    <li key={range.value}>
                      <button
                        onClick={() => setSelectedPrice(range.value)}
                        className={cn(
                          "w-full text-left text-sm transition-colors",
                          selectedPrice === range.value
                            ? "font-medium text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {range.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium">Availability</h3>
                <label className="mt-4 flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="h-4 w-4 rounded border-border accent-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    In Stock Only
                  </span>
                </label>
              </div>

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </motion.aside>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              {filteredProducts.length > 0 ? (
                <motion.div
                  key={`${selectedCategory}-${selectedPrice}-${sortBy}-${inStockOnly}-${gridView}`}
                  variants={containerVars}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                  className={cn(
                    "grid gap-6",
                    gridView === "3"
                      ? "sm:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  )}
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div variants={itemVars} key={product.id}>
                      <ProductCard product={product} priority={index < 4} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <p className="text-lg font-medium">No products found</p>
                  <p className="mt-2 text-muted-foreground">
                    Try adjusting your filters to find what you&apos;re looking for
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-sm text-primary hover:underline"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}