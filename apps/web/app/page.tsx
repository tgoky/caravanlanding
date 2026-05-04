// src/app/page.tsx
import { Button } from "@workspace/ui/components/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import Image from "next/image"
import Link from "next/link"
import WaitlistForm from "../app/WaitlistForm"

// Using your actual branding image
import CaravanLogo from "../app/caravan-logo-v1.png.png" // Replace with your path

// Component mapping for clean layout
const featureCards = [
  {
    title: "Community First",
    description: "Connect with diverse readers globally. Share insights, debate plots, and build lasting friendships.",
    icon: "🤝",
  },
  {
    title: "Curated Selections",
    description: "Navigate a journey through classics, modern masterpieces, and hidden gems you might have missed.",
    icon: "🗺️",
  },
  {
    title: "Deep Dive Discussions",
    description: "Participate in structured, respectful discussions. Go beyond the surface, explore context.",
    icon: "💡",
  },
]

export default function CaravanLandingPage() {
  return (
    // The main container. We're forcing that specific Warm Yellow/Cream background.
    <div className="min-h-screen bg-[#FFD76A] font-sans antialiased text-[#333333]">
      
      {/* 1. Header / Navigation */}
      <header className="border-b border-dashed border-[#333333]/20 bg-[#FFD76A]">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* The actual brand image as the logo */}
            <Image 
              src={CaravanLogo} 
              alt="Caravan Book Club Community Logo" 
              width={160} 
              height={50} // Optimized height/aspect
              className="object-contain"
            />
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="#" className="hover:text-[#F0873F]">Route</Link>
            <Link href="#" className="hover:text-[#F0873F]">Discuss</Link>
            <Button variant="outline" className="text-[#333333] border-[#333333]/40 bg-white/50 backdrop-blur-sm">Login</Button>
          </div>
        </nav>
      </header>

      {/* 2. Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24 space-y-16">
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tighter">
              A Journey <br />
              Through <span className="text-[#F0873F]">Diverse</span> <br />
              Narratives.
            </h1>
            <p className="text-xl text-[#333333]/80 leading-relaxed max-w-xl">
              Welcome to the CBCC 2026. Join a global caravan exploring unique voices, classical echoes, and modern stories. This isn&apos;t just reading; it&apos;s moving together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-[#333333] text-[#FFD76A] hover:bg-[#333333]/90 text-lg rounded-full">
                Join the Journey
              </Button>
              <Button size="lg" variant="ghost" className="text-[#F0873F] text-lg hover:bg-[#F0873F]/10">
                Explore The 2026 Route 
              </Button>
            </div>
          </div>
          <div className="flex justify-center items-center">
            {/* Placeholder for a complex graphic, but keeping the logo aesthetic: */}
            <div className="aspect-square bg-white/40 border-[3px] border-[#333333] rounded-3xl p-6 flex flex-col justify-center items-center gap-6 shadow-[-10px_10px_0px_#333333]">
              <Image src={CaravanLogo} alt="Logo Graphic" width={300} height={100} className="object-contain opacity-90"/>
              <p className="text-[#333333] text-lg font-bold text-center">The Caravan Route 2026 Starting Soon</p>
            </div>
          </div>
        </section>

        {/* 3. Features Section (Luma/Shad Cards) */}
        <section className="space-y-12">
          <h2 className="text-4xl font-bold text-center tracking-tight">How the Caravan Rolls</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCards.map((feature, index) => (
              <Card key={index} className="border-2 border-[#333333]/10 bg-white/70 backdrop-blur rounded-2xl hover:border-[#F0873F]/40 transition-all duration-300">
                <CardHeader>
                  <div className="text-5xl pb-4">{feature.icon}</div>
                  <CardTitle className="text-2xl text-[#333333] font-extrabold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#333333]/80 text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 4. "Route Map" Placeholder / CTA (KEPT EXACTLY AS IT WAS) */}
        <section className="bg-white/90 rounded-3xl border-[3px] border-[#333333] p-12 shadow-[-10px_10px_0px_#F0873F]">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3 space-y-4">
              <p className="text-sm font-semibold text-[#F0873F] uppercase tracking-widest">Next Stop on the Caravan</p>
              <h3 className="text-3xl font-bold text-[#333333]">Join the CBCC Newsletter</h3>
              <p className="text-lg text-[#333333]/80">Get curated book recommendations, virtual meet updates, and special content delivered directly to your inbox. No spam, just stories.</p>
            </div>
            <div className="md:col-span-2 space-y-3">
              <Input type="email" placeholder="Your best email..." className="w-full bg-[#FFD76A]/20 border-2 border-[#333333]/30 rounded-full h-12" />
              <Button size="lg" className="w-full bg-[#333333] text-[#FFD76A] hover:bg-[#333333]/90 rounded-full h-12 text-lg">
                Stay Updated
              </Button>
            </div>
          </div>
        </section>

        {/* 5. THE NEW ANIMATED WAITLIST (Added right below without breaking anything!) */}
        <section className="pt-12 pb-24">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold tracking-tight text-[#333333]">Ready to reserve your spot?</h2>
            <p className="text-lg text-[#333333]/80 mt-2">Fill out your caravan profile below.</p>
          </div>
          <WaitlistForm />
        </section>

      </main>

      {/* 6. Footer */}
      <footer className="border-t border-dashed border-[#333333]/20 bg-[#FFD76A]">
        <div className="max-w-7xl mx-auto px-6 py-8 text-sm text-[#333333]/70 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Caravan Book Club Community. Built for 2026.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-[#F0873F]">Privacy</Link>
            <Link href="#" className="hover:text-[#F0873F]">Discord</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}