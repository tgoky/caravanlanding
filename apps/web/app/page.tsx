// src/app/page.tsx
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@workspace/ui/components/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, BookOpen } from "lucide-react" // Added icons
import WaitlistForm from "../app/WaitlistForm"

// Using your actual branding image
import CaravanLogo from "../app/caravan-logo-v1.png.png" // Verify your path!

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

// Expanded Lexicon for the Dictionary Book
const lexiconTerms = [
  { word: "DNF", pos: "verb", definition: "Did Not Finish. To abandon a book before the end. We respect it; life is too short to force a bad read.", example: "\"I had to DNF that sci-fi novel, the pacing was brutal.\"" },
  { word: "Book Hangover", pos: "noun", definition: "The psychological inability to start a new book because you are still emotionally trapped in the world of the last one.", example: "\"Finished Dune yesterday. Massive book hangover. Can't look at sand right now.\"" },
  { word: "TBR", pos: "noun", definition: "To Be Read. A physical or digital pile that defies the laws of physics by only ever growing larger, regardless of how much you read.", example: "\"My TBR pile is threatening to collapse and crush me in my sleep.\"" },
  { word: "Canon", pos: "noun", definition: "The official, indisputable events of the story as written by the author (often debated passionately at 2 AM in the Discord).", example: "\"I don't care what the movie did, in the canon, they survive.\"" },
  { word: "Mood Reader", pos: "noun", definition: "A reader who cannot stick to a predetermined TBR list and must select their next book based entirely on their current emotional state.", example: "\"I was supposed to read a thriller, but my inner mood reader demanded a cozy romance.\"" },
  { word: "Dog-Ear", pos: "verb / crime", definition: "The controversial act of folding the corner of a page to mark your place instead of using a bookmark.", example: "\"If you borrow my book, do NOT dog-ear the pages.\"" },
  { word: "Slump", pos: "noun", definition: "A dark period where no book seems interesting, and the act of reading feels impossible. Often cured by revisiting an old favorite.", example: "\"I've been in a reading slump since March. Need a fast-paced thriller to break it.\"" }
]

// Mock Data for the Archive Dropdown
const pastReads = [
  { month: "July", title: "Dune", author: "Frank Herbert", consensus: "Mind-bending worldbuilding, but we needed a glossary to survive the first 100 pages. 🏜️" },
  { month: "June", title: "Tomorrow, and Tomorrow...", author: "Gabrielle Zevin", consensus: "Half the club cried, the other half wanted to yell at the main characters. 10/10. 🎮" },
  { month: "May", title: "Project Hail Mary", author: "Andy Weir", consensus: "Science math that actually made sense. Amaze! Amaze! Amaze! 🚀" }
]

const exhibitionBooks1 = [
  { title: "Dune", author: "Frank Herbert", color: "bg-[#F0873F]" },
  { title: "1984", author: "George Orwell", color: "bg-white" },
  { title: "The Hobbit", author: "J.R.R. Tolkien", color: "bg-[#9C6145] text-[#FFD76A]" },
  { title: "Foundation", author: "Isaac Asimov", color: "bg-[#333333] text-white" },
  { title: "Kindred", author: "Octavia Butler", color: "bg-[#FDF2E9]" },
  { title: "Neuromancer", author: "William Gibson", color: "bg-[#FFD76A]" },
]

const exhibitionBooks2 = [
  { title: "Beloved", author: "Toni Morrison", color: "bg-[#FDF2E9]" },
  { title: "Frankenstein", author: "Mary Shelley", color: "bg-[#333333] text-white" },
  { title: "Snow Crash", author: "Neal Stephenson", color: "bg-[#FFD76A]" },
  { title: "Fahrenheit 451", author: "Ray Bradbury", color: "bg-white" },
  { title: "The Alchemist", author: "Paulo Coelho", color: "bg-[#9C6145] text-[#FFD76A]" },
  { title: "The Dispossessed", author: "Ursula K. Le Guin", color: "bg-[#333333] text-white" },
]

const shuffleDeck = [
  { id: 0, type: 'logo' },
  { id: 1, type: 'quote', text: '"A reader lives a thousand lives before he dies."', author: "- George R.R. Martin" },
  { id: 2, type: 'book', text: "August Read: The Midnight Library" }
]

export default function CaravanLandingPage() {
  const [activeCard, setActiveCard] = useState(0)
  const [isArchiveOpen, setIsArchiveOpen] = useState(false)
  const [activeWord, setActiveWord] = useState(lexiconTerms[0])
  
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % shuffleDeck.length)
    }, 4000)
    return () => clearInterval(timer)
  }, []) 

  return (
    <div className="min-h-screen bg-[#FFD76A] font-sans antialiased text-[#333333]">
      
      {/* 1. Header / Navigation */}
      <header className="border-b border-dashed border-[#333333]/20 bg-[#FFD76A] sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image 
              src={CaravanLogo} 
              alt="Caravan Book Club Community Logo" 
              width={160} 
              height={50} 
              className="object-contain"
            />
            
            {/* Archive Dropdown Trigger */}
            <div className="hidden lg:block relative">
              <button 
                onClick={() => setIsArchiveOpen(!isArchiveOpen)}
                className="flex items-center gap-2 bg-[#F0873F] text-[#333333] px-4 py-1.5 rounded-full border-2 border-[#333333] font-extrabold text-xs shadow-[2px_2px_0px_#333333] hover:-translate-y-0.5 transition-transform"
              >
                <span>📖</span>
                <span>August: The Midnight Library</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isArchiveOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Archive Dropdown Panel */}
              <AnimatePresence>
                {isArchiveOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-3 w-80 bg-[#FDF2E9] border-[3px] border-[#333333] rounded-2xl shadow-[-6px_6px_0px_#333333] overflow-hidden flex flex-col"
                  >
                    <div className="bg-[#333333] text-[#FFD76A] px-4 py-2 font-bold text-xs uppercase tracking-widest flex justify-between items-center">
                      <span>Past Reads Archive</span>
                      <BookOpen size={14} />
                    </div>
                    <div className="p-4 flex flex-col gap-4 max-h-[300px] overflow-y-auto">
                      {pastReads.map((read, idx) => (
                        <div key={idx} className="border-b-2 border-dashed border-[#333333]/20 pb-3 last:border-0 last:pb-0">
                          <p className="text-[#F0873F] font-extrabold text-xs uppercase">{read.month}</p>
                          <p className="font-bold text-[#333333] leading-tight">{read.title}</p>
                          <p className="text-xs text-[#333333]/60 mb-2">by {read.author}</p>
                          <div className="bg-white/50 p-2 rounded-lg border border-[#333333]/10">
                            <p className="text-xs italic text-[#333333]/80">"{read.consensus}"</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="#" className="hover:text-[#F0873F] hidden sm:block">Route</Link>
            <Link href="#" className="hover:text-[#F0873F] hidden sm:block">Discuss</Link>
            <Button variant="ghost" className="text-[#333333] hover:bg-[#333333]/10">Login</Button>
                        <Button variant="ghost" className="text-[#333333] hover:bg-[#333333]/10 " >              <a href="register">Register</a></Button>
            <Button asChild className="bg-[#333333] text-[#FFD76A] hover:bg-[#333333]/90 shadow-[4px_4px_0px_#F0873F] border-2 border-[#333333] transition-transform hover:-translate-y-1">
              <a href="#waitlist">Join Waitlist</a>
            </Button>
          </div>
        </nav>
      </header>

      {/* 2. Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24 space-y-24">
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
              <Button asChild size="lg" className="bg-[#333333] text-[#FFD76A] hover:bg-[#333333]/90 text-lg rounded-full">
                <a href="#waitlist">Join the Journey</a>
              </Button>
              <Button size="lg" variant="ghost" className="text-[#F0873F] text-lg hover:bg-[#F0873F]/10">
                Explore The 2026 Route →
              </Button>
            </div>
          </div>

          {/* 3D Shuffle Effect Card */}
          <div className="flex justify-center items-center perspective-1000">
            <div className="relative w-full max-w-sm aspect-square cursor-pointer group" onClick={() => setActiveCard((prev) => (prev + 1) % shuffleDeck.length)}>
              {shuffleDeck.map((card, index) => {
                const isFront = activeCard === index;
                const offset = (index - activeCard + shuffleDeck.length) % shuffleDeck.length;
                return (
                  <motion.div
                    key={card.id}
                    animate={{ scale: isFront ? 1 : 1 - (offset * 0.05), y: isFront ? 0 : offset * 25, rotateZ: isFront ? 0 : (offset % 2 === 0 ? 4 : -4), zIndex: shuffleDeck.length - offset, opacity: offset > 2 ? 0 : 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="absolute inset-0 border-[3px] border-[#333333] rounded-3xl p-8 flex flex-col justify-center items-center shadow-[-10px_10px_0px_#333333] select-none"
                    style={{ backgroundColor: isFront ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(8px)' }}
                  >
                    {card.type === 'logo' && (
                      <><Image src={CaravanLogo} alt="Logo Graphic" width={250} height={100} className="object-contain opacity-90 pointer-events-none"/><p className="text-[#333333] text-lg font-bold text-center mt-4">Tap to shuffle →</p></>
                    )}
                    {card.type === 'quote' && (
                      <div className="text-center space-y-4"><p className="text-2xl font-extrabold text-[#F0873F] leading-tight">{card.text}</p><p className="text-[#333333] font-bold">{card.author}</p></div>
                    )}
                    {card.type === 'book' && (
                      <div className="w-3/4 h-3/4 bg-[#9C6145] rounded-lg border-4 border-[#333333] shadow-inner flex items-center justify-center p-4 text-center"><p className="text-[#FFD76A] font-extrabold text-2xl">{card.text}</p></div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Cross-Belt Marquees Container */}
        <div className="relative py-16 overflow-hidden flex flex-col">
          <section className="relative w-full py-6 border-y-[3px] border-[#333333] bg-[#FDF2E9] shadow-[0px_8px_0px_#333333]/10 transform rotate-2 scale-105 z-10">
            <div className="absolute top-2 left-6 z-10 bg-[#333333] text-[#FFD76A] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border-2 border-[#333333]">Classics Exhibition</div>
            <div className="flex w-max pt-6">
              <motion.div className="flex gap-8 px-4" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 30 }}>
                {[...exhibitionBooks1, ...exhibitionBooks1].map((book, idx) => (
                  <div key={`m1-${idx}`} className={`w-40 h-56 flex-shrink-0 border-[3px] border-[#333333] rounded-md shadow-[-6px_6px_0px_#333333] flex flex-col items-center justify-center text-center p-4 transition-transform hover:-translate-y-2 ${book.color}`}>
                    <p className="font-extrabold text-xl leading-tight mb-2">{book.title}</p><p className="text-xs font-bold opacity-80">{book.author}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          <section className="relative w-full py-6 border-y-[3px] border-[#333333] bg-[#F0873F] shadow-[0px_8px_0px_#333333]/20 transform -rotate-2 scale-105 z-20 -mt-12">
            <div className="absolute top-2 right-6 z-10 bg-white text-[#F0873F] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border-2 border-[#333333]">Modern Journeys</div>
            <div className="flex w-max pt-6">
              <motion.div className="flex gap-8 px-4" animate={{ x: ["-50%", "0%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 35 }}>
                {[...exhibitionBooks2, ...exhibitionBooks2].map((book, idx) => (
                  <div key={`m2-${idx}`} className={`w-40 h-56 flex-shrink-0 border-[3px] border-[#333333] rounded-md shadow-[-6px_6px_0px_#333333] flex flex-col items-center justify-center text-center p-4 transition-transform hover:-translate-y-2 ${book.color}`}>
                    <p className="font-extrabold text-xl leading-tight mb-2">{book.title}</p><p className="text-xs font-bold opacity-80">{book.author}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>
        </div>

        {/* Monthly Overview "Current Stop" */}
        <section className="pt-8">
          <div className="bg-white border-[3px] border-[#333333] rounded-3xl p-8 md:p-12 shadow-[-10px_10px_0px_#333333] relative overflow-hidden">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/50 backdrop-blur-md border-2 border-[#333333]/20 transform -rotate-2 z-10 shadow-sm"></div>
            <div className="grid md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-2 flex justify-center">
                <div className="w-56 h-80 bg-[#333333] rounded-r-2xl border-4 border-[#333333] shadow-[-12px_12px_0px_#F0873F] relative flex flex-col justify-between p-6 overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform">
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-white/10 border-r border-white/20"></div>
                  <p className="text-[#FFD76A] font-bold text-sm tracking-widest uppercase">Matt Haig</p>
                  <div><h3 className="text-white text-3xl font-extrabold leading-none mb-2">The <br/>Midnight <br/>Library</h3></div>
                  <div className="w-full h-1 bg-[#FFD76A]/30 rounded-full"></div>
                </div>
              </div>
              <div className="md:col-span-3 space-y-6">
                <div>
                  <div className="inline-block bg-[#F0873F] text-[#333333] font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full border-2 border-[#333333] mb-3">📍 Current Stop: August</div>
                  <h3 className="text-4xl font-extrabold text-[#333333]">Exploring Infinite Lives.</h3>
                  <p className="text-lg text-[#333333]/80 mt-2 font-medium">Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold text-[#333333]"><span>Reading Progress</span><span>Week 2 of 4</span></div>
                  <div className="w-full h-4 bg-gray-100 rounded-full border-2 border-[#333333] overflow-hidden flex"><div className="w-1/2 bg-[#F0873F] h-full border-r-2 border-[#333333]"></div></div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="bg-[#FFD76A] border-2 border-[#333333] px-4 py-1.5 rounded-xl text-sm font-bold shadow-[2px_2px_0px_#333333]">#MentalHealth</span>
                  <span className="bg-[#FFD76A] border-2 border-[#333333] px-4 py-1.5 rounded-xl text-sm font-bold shadow-[2px_2px_0px_#333333]">#Philosophy</span>
                  <span className="bg-[#FFD76A] border-2 border-[#333333] px-4 py-1.5 rounded-xl text-sm font-bold shadow-[2px_2px_0px_#333333]">#MagicalRealism</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE CARAVAN LEXICON DICTIONARY */}
        <section className="space-y-8 py-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-[#333333]">The Caravan Lexicon</h2>
            <p className="text-lg text-[#333333]/80 mt-2">Learn the lingo before you join the chat.</p>
          </div>
          
          {/* The "Dictionary Book" Container */}
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row bg-[#FDF2E9] border-4 border-[#333333] rounded-2xl shadow-[-12px_12px_0px_#333333] overflow-hidden min-h-[400px]">
            
            {/* Left Side: The Index / Spine */}
            <div className="w-full md:w-1/3 bg-[#333333] border-b-4 md:border-b-0 md:border-r-4 border-[#333333] flex flex-col relative z-10">
              <div className="p-4 bg-[#F0873F] border-b-4 border-[#333333] text-[#333333] font-extrabold uppercase tracking-widest flex items-center justify-between">
                <span>Index</span>
                <span className="text-xs opacity-70">A-Z</span>
              </div>
              <div className="flex flex-col overflow-y-auto max-h-[300px] md:max-h-[400px] custom-scrollbar">
                {lexiconTerms.map((term, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveWord(term)}
                    className={`text-left px-6 py-4 border-b border-[#FDF2E9]/10 font-bold transition-all flex items-center justify-between group ${
                      activeWord.word === term.word 
                      ? "bg-[#FDF2E9] text-[#333333] pl-8 border-l-8 border-l-[#FFD76A]" 
                      : "text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{term.word}</span>
                    <span className={`text-xs ${activeWord.word === term.word ? "opacity-100" : "opacity-0"} transition-opacity`}>→</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side: The Lined Page */}
            <div 
              className="w-full md:w-2/3 p-8 md:p-12 relative"
              style={{ 
                // CSS trick to make college-ruled lines!
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(51,51,51,0.1) 31px, rgba(51,51,51,0.1) 32px)',
                backgroundSize: '100% 32px',
                backgroundPosition: '0 8px'
              }}
            >
              {/* Red margin line simulating notebook paper */}
              <div className="absolute left-12 top-0 bottom-0 w-px bg-red-400/50 hidden md:block"></div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeWord.word}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="pl-0 md:pl-10 pt-4"
                >
                  <div className="flex items-baseline gap-4 mb-4 bg-[#FDF2E9] inline-block">
                    <h3 className="text-4xl md:text-5xl font-extrabold text-[#333333]">{activeWord.word}</h3>
                  </div>
                  <div className="bg-[#FDF2E9] inline-block px-2 mb-6 border border-[#333333]/20 rounded text-sm font-bold italic text-[#F0873F]">
                    {activeWord.pos}.
                  </div>
                  <div className="bg-[#FDF2E9] inline-block mb-6">
                    <p className="text-xl text-[#333333] leading-relaxed font-medium">
                      {activeWord.definition}
                    </p>
                  </div>
                  <div className="mt-4 bg-white/60 p-4 border-l-4 border-[#FFD76A] rounded-r-lg">
                    <p className="text-[#333333]/80 italic">
                      {activeWord.example}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* 4. "Route Map" Placeholder / CTA */}
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

        {/* 5. THE ANIMATED WAITLIST */}
        <section id="waitlist" className="pt-12 pb-24 scroll-mt-24">
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