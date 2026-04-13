"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Instagram, Heart, MessageCircle, Play, ShoppingBag, ExternalLink, Quote } from "lucide-react"
import { cn } from "@/lib/utils"
import { products } from "@/lib/products"
import { motion, AnimatePresence } from "framer-motion"

const fallbackPosts = [
  { id: "1", type: "image", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80", likes: 12843, comments: 234, caption: "Elegance is the only beauty that never fades.", linkedProductId: "2" },
  { id: "2", type: "reel", image: "https://images.unsplash.com/photo-1485968579169-a6d389bc005d?w=600&q=80", likes: 28967, comments: 456, caption: "Behind the scenes of our latest campaign.", linkedProductId: null },
  { id: "3", type: "image", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80", likes: 9421, comments: 187, caption: "The art of timeless dressing.", linkedProductId: "1" },
  { id: "4", type: "image", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80", likes: 15156, comments: 298, caption: "Summer essentials that never go out of style.", linkedProductId: "4" },
  { id: "5", type: "reel", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80", likes: 34089, comments: 567, caption: "The making of luxury. Watch the full story.", linkedProductId: null },
  { id: "6", type: "image", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80", likes: 11734, comments: 213, caption: "Crafted for those who appreciate the finer details.", linkedProductId: "3" },
  { id: "7", type: "image", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80", likes: 8923, comments: 156, caption: "Where tradition meets innovation.", linkedProductId: "5" },
  { id: "8", type: "reel", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", likes: 19876, comments: 342, caption: "A glimpse into our atelier.", linkedProductId: null },
  { id: "9", type: "image", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80", likes: 7654, comments: 123, caption: "The pursuit of perfection.", linkedProductId: "6" }
]

const testimonials = [
  { content: "The quality is absolutely exceptional. Every piece from Raj MP Online has become a treasured part of my wardrobe.", author: "Victoria Laurent", role: "Fashion Editor", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80" },
  { content: "Raj MP Online represents everything I love about luxury fashion: timeless design, impeccable craftsmanship, and attention to detail.", author: "Alessandro Ricci", role: "Style Consultant", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" },
  { content: "I've never experienced such personalized service. The team at Raj MP Online truly understands their clients.", author: "Elena Marchetti", role: "Entrepreneur", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80" }
]

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

export default function SocialPage() {
  const [selectedPost, setSelectedPost] = useState<any | null>(null)

  // Start with loading state
  const [stats, setStats] = useState({
    followers: 0,
    following: 0,
    posts: 0,
    recentPosts: [] as any[],
    loading: true,
    error: false
  })

  const fetchLiveStats = async () => {
    try {
      const response = await fetch('/api/instagram', { cache: 'no-store' })
      const data = await response.json()
      if (data.status === 'live') {
        setStats({
          followers: data.followers,
          following: data.following,
          posts: data.posts,
          recentPosts: data.recentPosts || [],
          loading: false,
          error: false
        })
      } else {
        setStats(prev => ({ ...prev, loading: false, error: true }))
      }
    } catch (err) {
      console.error("Live API unable to load.", err)
      setStats(prev => ({ ...prev, loading: false, error: true }))
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchLiveStats()

    // Poll every 10 seconds for real world live updates
    const interval = setInterval(fetchLiveStats, 10000)
    return () => clearInterval(interval)
  }, [])

  const getLinkedProduct = (productId: string | null) => {
    if (!productId) return null
    return products.find(p => p.id === productId)
  }

  const INSTAGRAM_URL = "https://www.instagram.com/raj_mp.online/"

  // If live data has populated, render live data, else fallback to dummy if it errored or hasn't fully booted.
  const displayPosts = stats.recentPosts.length > 0 ? stats.recentPosts : fallbackPosts;

  return (
    <div className="min-h-screen pt-[96px] pb-20">
      {/* Hero */}
      <section className="py-16 text-center overflow-hidden">
        <motion.div
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3">
            <Instagram className="h-8 w-8 text-primary" />
            <span className="text-lg font-medium uppercase tracking-[0.3em]">
              @raj_mp.online
            </span>
          </div>
          <h1 className="mt-6 font-serif text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl flex items-center justify-center gap-4">
            <div className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
            </div>
            LIVE
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-muted-foreground uppercase">
            FOLLOW US ON INSTAGRAM FOR LATEST UPDATE.
          </p>

          <div className="mt-8 flex items-center justify-center gap-8 text-center bg-secondary/30 p-8 rounded-3xl mx-auto max-w-3xl border border-primary/10">
            <div>
              <div className="font-serif text-3xl font-medium h-10 flex items-center justify-center">
                {stats.loading ? "..." : formatNumber(stats.followers)}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Followers</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <div className="font-serif text-3xl font-medium h-10 flex items-center justify-center">
                {stats.loading ? "..." : formatNumber(stats.posts)}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Posts</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <div className="font-serif text-3xl font-medium h-10 flex items-center justify-center">
                {stats.loading ? "..." : formatNumber(stats.following)}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Following</p>
            </div>
          </div>
          {stats.error && <p className="text-sm text-red-500 mt-4">Unable to connect to Instagram's servers.</p>}

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4",
              "font-medium text-primary-foreground transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            )}
          >
            <Instagram className="h-5 w-5" />
            Follow on Instagram
          </a>
        </motion.div>
      </section>

      {/* Instagram grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {stats.loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((skel) => (
                <div key={skel} className="relative aspect-square rounded-2xl bg-secondary/80 border border-border" />
              ))}
            </div>
          ) : (
            <motion.div
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ staggerChildren: 0.1 }}
            >
              {displayPosts.map((post) => {
                const linkedProduct = getLinkedProduct(post.linkedProductId)
                return (
                  <motion.div
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-secondary"
                  >
                    {/* Using raw img tag because external Facebook CDN urls fail on NextJS without explicitly adding them to next.config.mjs domain whitelists. */}
                    <img
                      src={post.image}
                      alt={post.caption || "Instagram Post"}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {post.type === "reel" && (
                      <div className="absolute right-3 top-3">
                        <div className="rounded-full bg-background/80 backdrop-blur-sm p-2"><Play className="h-4 w-4 fill-current" /></div>
                      </div>
                    )}
                    {linkedProduct && (
                      <div className="absolute left-3 top-3">
                        <div className="rounded-full bg-background/80 backdrop-blur-sm p-2"><ShoppingBag className="h-4 w-4" /></div>
                      </div>
                    )}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-primary/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex items-center gap-6 text-primary-foreground">
                        <div className="flex items-center gap-2"><Heart className="h-5 w-5 fill-current" /><span className="font-medium">{(post.likes / 1000).toFixed(1)}K</span></div>
                        <div className="flex items-center gap-2"><MessageCircle className="h-5 w-5" /><span className="font-medium">{post.comments}</span></div>
                      </div>
                      {linkedProduct && <span className="text-sm text-primary-foreground/80">Shop this look</span>}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}

          <div className="mt-12 text-center">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline">
              See more on Instagram <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">Testimonials</p>
            <h2 className="mt-4 font-serif text-4xl font-light tracking-tight sm:text-5xl">What Our Clients Say</h2>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative rounded-2xl bg-background p-8 shadow-luxury">
                <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/20" />
                <p className="text-muted-foreground leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full"><Image src={testimonial.image} alt={testimonial.author} fill className="object-cover" /></div>
                  <div><p className="font-medium">{testimonial.author}</p><p className="text-sm text-muted-foreground">{testimonial.role}</p></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* UGC Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl font-light tracking-tight sm:text-5xl">Share Your Style</h2>
          <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">Tag us @raj_mp.online and use #RajMPOnlineStyle for a chance to be featured on our official channels.</p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {["#RajMPOnlineStyle", "#RajMPOnlineLuxury", "#CraftedElegance", "#TimelessFashion"].map((hashtag) => (
              <span key={hashtag} className="rounded-full bg-secondary px-6 py-3 font-medium transition-colors hover:bg-primary hover:text-primary-foreground cursor-pointer">
                {hashtag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Post modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPost(null)}>
            <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-background shadow-luxury" onClick={(e) => e.stopPropagation()}>
              <div className="grid md:grid-cols-2 h-full max-h-[90vh] overflow-y-auto">
                <div className="relative aspect-square md:aspect-auto md:h-full min-h-[300px]">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.caption || "Instagram Post"}
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center"><span className="font-serif font-medium text-primary">R</span></div>
                    <div><p className="font-medium">Raj MP Online</p><p className="text-xs text-muted-foreground">@raj_mp.online</p></div>
                  </div>
                  <p className="mt-6 flex-1 text-muted-foreground">{selectedPost.caption}</p>
                  <div className="mt-6 flex items-center gap-4 border-t border-border pt-4">
                    <div className="flex items-center gap-2"><Heart className="h-5 w-5" /><span className="text-sm">{selectedPost.likes.toLocaleString()}</span></div>
                    <div className="flex items-center gap-2"><MessageCircle className="h-5 w-5" /><span className="text-sm">{selectedPost.comments}</span></div>
                  </div>
                  {selectedPost.linkedProductId && (
                    <Link href={`/products/${selectedPost.linkedProductId}`} className={cn("mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary py-3 font-medium text-primary-foreground transition-all hover:shadow-lg")} onClick={() => setSelectedPost(null)}>
                      <ShoppingBag className="h-4 w-4" /> Shop This Look
                    </Link>
                  )}
                  <button onClick={() => setSelectedPost(null)} className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors">Close</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
