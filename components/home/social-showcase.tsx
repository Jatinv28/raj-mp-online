"use client"

import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"
import { cn } from "@/lib/utils"

const socialPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80",
    likes: 2843,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1485968579169-a6d389bc005d?w=400&q=80",
    likes: 1967,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80",
    likes: 3421,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80",
    likes: 2156,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
    likes: 4089,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80",
    likes: 2734,
  },
]

export function SocialShowcase() {
  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <Instagram className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
              @raj_mp.online
            </span>
          </div>
          <h2 className="mt-4 font-serif text-4xl font-light tracking-tight sm:text-5xl">
            Join Our Community
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Share your Raj MP Online moments with #Raj MP OnlineStyle and get featured 
            on our official channels
          </p>
        </div>

        {/* Instagram grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6">
          {socialPosts.map((post) => (
            <Link
              key={post.id}
              href="https://www.instagram.com/raj_mp.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={post.image}
                alt="Instagram post"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center",
                  "bg-primary/60 opacity-0 transition-opacity duration-300",
                  "group-hover:opacity-100"
                )}
              >
                <div className="flex items-center gap-2 text-primary-foreground">
                  <Instagram className="h-5 w-5" />
                  <span className="font-medium">{post.likes.toLocaleString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="https://www.instagram.com/raj_mp.online/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4",
              "text-base font-medium text-primary-foreground",
              "transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            )}
          >
            <Instagram className="h-5 w-5" />
            Follow Us on Instagram
          </Link>
        </div>
      </div>
    </section>
  )
}
