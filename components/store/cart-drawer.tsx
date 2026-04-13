"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import { useStore } from "./store-provider"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function CartDrawer() {
  const { cart, isCartOpen, closeCart, removeFromCart, updateCartQuantity, cartTotal } = useStore()

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isCartOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [closeCart])

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm transition-opacity duration-300",
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background shadow-luxury transition-transform duration-500 ease-out",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-5 w-5" />
              <h2 className="font-serif text-xl font-medium">Your Bag</h2>
              <span className="text-sm text-muted-foreground">
                ({cart.length} {cart.length === 1 ? "item" : "items"})
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-2 hover:text-primary transition-colors"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <h3 className="font-serif text-xl mb-2">Your bag is empty</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Discover our curated collection of luxury pieces
                </p>
                <Button onClick={closeCart} asChild className="px-8">
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {cart.map((item) => (
                  <li key={item.id} className="flex gap-4 p-6">
                    <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {item.category}
                          </p>
                          {item.selectedVariants && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {Object.entries(item.selectedVariants)
                                .map(([key, value]) => `${key}: ${value}`)
                                .join(" | ")}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Remove item"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-secondary transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-10 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-secondary transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="font-medium">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-border p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-lg font-medium">${cartTotal.toLocaleString()}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout
              </p>
              <Button className="w-full py-6 text-base glow-gold" size="lg">
                Proceed to Checkout
              </Button>
              <button
                onClick={closeCart}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
