import { HeroSection } from "@/components/home/hero-section"
import { FeaturedCollections } from "@/components/home/featured-collections"
import { BestSellers } from "@/components/home/best-sellers"
import { BrandStory } from "@/components/home/brand-story"
import { TrustBadges } from "@/components/home/trust-badges"
import { SocialShowcase } from "@/components/home/social-showcase"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <BestSellers />
      <BrandStory />
      <TrustBadges />
      <SocialShowcase />
    </>
  )
}
