"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  category: string
  badge?: "new" | "bestseller" | "limited"
  rating: number
  reviewCount: number
  description: string
  features?: string[]
  variants?: { name: string; options: string[] }[]
  inStock: boolean
}

export interface CartItem extends Product {
  quantity: number
  selectedVariants?: Record<string, string>
}

export interface WishlistItem extends Product {}

interface StoreContextType {
  cart: CartItem[]
  wishlist: WishlistItem[]
  isCartOpen: boolean
  isDarkMode: boolean
  isSearchOpen: boolean
  addToCart: (product: Product, quantity?: number, variants?: Record<string, string>) => void
  removeFromCart: (productId: string) => void
  updateCartQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  closeCart: () => void
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  toggleDarkMode: () => void
  toggleSearch: () => void
  closeSearch: () => void
  cartTotal: number
  cartCount: number
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = savedDarkMode ? savedDarkMode === "true" : prefersDark
    setIsDarkMode(shouldBeDark)
    if (shouldBeDark) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  // Load cart and wishlist from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
  }, [])

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
  }, [wishlist])

  const addToCart = useCallback((product: Product, quantity = 1, variants?: Record<string, string>) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id)
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex].quantity += quantity
        return updated
      }
      return [...prev, { ...product, quantity, selectedVariants: variants }]
    })
    setIsCartOpen(true)
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }, [])

  const updateCartQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prev => prev.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ))
  }, [removeFromCart])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const toggleCart = useCallback(() => {
    setIsCartOpen(prev => !prev)
  }, [])

  const closeCart = useCallback(() => {
    setIsCartOpen(false)
  }, [])

  const addToWishlist = useCallback((product: Product) => {
    setWishlist(prev => {
      if (prev.some(item => item.id === product.id)) return prev
      return [...prev, product]
    })
  }, [])

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== productId))
  }, [])

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.some(item => item.id === productId)
  }, [wishlist])

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => {
      const newValue = !prev
      localStorage.setItem("darkMode", String(newValue))
      if (newValue) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
      return newValue
    })
  }, [])

  const toggleSearch = useCallback(() => {
    setIsSearchOpen(prev => !prev)
  }, [])

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false)
  }, [])

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <StoreContext.Provider value={{
      cart,
      wishlist,
      isCartOpen,
      isDarkMode,
      isSearchOpen,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      toggleCart,
      closeCart,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      toggleDarkMode,
      toggleSearch,
      closeSearch,
      cartTotal,
      cartCount,
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}
