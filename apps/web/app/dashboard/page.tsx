// src/app/dashboard/page.tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { 
  Flame, BookOpen, MessageSquare, Dices, Lightbulb, 
  Map, Bell, User, CalendarDays, ChevronRight, Trophy, Play 
} from "lucide-react"

// Import your logo!
import CaravanLogo from "../caravan-logo-v1.png.png" // Verify path!

// Navigation Data
const navItems = [
  { name: "The Campfire", icon: Flame, path: "/dashboard", active: true },
  { name: "The Archive", icon: BookOpen, path: "#", active: false },
  { name: "The Forum", icon: MessageSquare, path: "#", active: false },
  { name: "The Tavern", icon: Dices, path: "#", active: false },
  { name: "Notice Board", icon: Lightbulb, path: "#", active: false },
]

export default function DashboardPage() {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)

  return (
    // The main app container: Aged paper background
    <div className="min-h-screen bg-[#FDF2E9] font-sans text-[#333333] flex overflow-hidden">
      
      {/* ================= SIDEBAR (The Compass) ================= */}
      <aside className="w-72 bg-[#333333] border-r-4 border-[#333333] flex flex-col relative z-20 shadow-[8px_0px_0px_rgba(51,51,51,0.1)]">
        {/* Logo Area */}
        <div className="p-8 border-b-4 border-[#333333]/20 bg-[#F0873F]">
          <div className="bg-[#FDF2E9] inline-block p-3 rounded-2xl border-2 border-[#333333] shadow-[4px_4px_0px_#333333] transform -rotate-2">
            <Image 
              src={CaravanLogo} 
              alt="Caravan Logo" 
              width={140} 
              height={45} 
              className="object-contain" 
            />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-6 space-y-3 overflow-y-auto">
          <p className="text-[#FFD76A]/60 font-black text-xs uppercase tracking-widest mb-4 ml-2">Camp Compass</p>
          
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.path}
              onMouseEnter={() => setHoveredNav(item.name)}
              onMouseLeave={() => setHoveredNav(null)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                item.active 
                ? 'bg-[#FFD76A] text-[#333333] border-2 border-[#333333] shadow-[4px_4px_0px_#F0873F] transform -translate-y-1' 
                : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <item.icon size={20} className={item.active ? 'text-[#F0873F]' : ''} />
              {item.name}
              
              {/* Little arrow that appears on hover */}
              {!item.active && hoveredNav === item.name && (
                <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="ml-auto">
                  <ChevronRight size={16} />
                </motion.div>
              )}
            </Link>
          ))}
        </nav>

        {/* User Profile Mini */}
        <div className="p-6 border-t-4 border-[#333333]/20">
          <button className="w-full flex items-center gap-3 bg-[#FFD76A]/10 p-3 rounded-xl border-2 border-transparent hover:border-[#FFD76A]/50 transition-colors">
            <div className="w-10 h-10 bg-[#F0873F] rounded-full border-2 border-[#333333] flex items-center justify-center text-[#333333] font-black">
              BW
            </div>
            <div className="text-left flex-1">
              <p className="text-white font-bold text-sm">BookWorm99</p>
              <p className="text-white/50 text-xs font-semibold">Weekly Rider</p>
            </div>
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT (The Campfire) ================= */}
      <main className="flex-1 h-screen overflow-y-auto custom-scrollbar relative">
        
        {/* Background "Map" Texture (Subtle grid) */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#333333 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.05 }}></div>

        {/* Top Header */}
        <header className="sticky top-0 z-10 bg-[#FDF2E9]/90 backdrop-blur-md border-b-[3px] border-[#333333] px-10 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-[#333333] flex items-center gap-3">
              <Flame className="text-[#F0873F]" size={32} /> 
              The Campfire
            </h1>
            <p className="text-[#333333]/60 font-bold mt-1">Welcome back to the caravan. Here's what's happening.</p>
          </div>
          <div className="flex gap-4">
            <button className="w-12 h-12 bg-white border-[3px] border-[#333333] rounded-full flex items-center justify-center shadow-[4px_4px_0px_#333333] hover:translate-y-1 hover:shadow-none transition-all relative">
              <Bell size={20} className="text-[#333333]" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="h-12 px-6 bg-[#333333] text-[#FFD76A] font-black border-[3px] border-[#333333] rounded-full shadow-[4px_4px_0px_#F0873F] hover:translate-y-1 hover:shadow-none transition-all">
              Resume Reading
            </button>
          </div>
        </header>

        <div className="p-10 relative z-10 max-w-7xl mx-auto space-y-10">
          
          {/* TOP ROW WIDGETS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* 1. CURRENT READ WIDGET (Span 8) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="lg:col-span-8 bg-[#9C6145] border-[3px] border-[#333333] rounded-[2rem] p-8 shadow-[-10px_10px_0px_#333333] relative overflow-hidden"
            >
              {/* Decorative shapes */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

              <div className="flex flex-col md:flex-row gap-8 relative z-10">
                {/* 3D Book Cover Representation */}
                <div className="w-48 h-64 bg-[#333333] rounded-r-2xl border-4 border-[#333333] shadow-[-10px_10px_0px_#F0873F] flex flex-col justify-between p-5 transform -rotate-2 hover:rotate-0 transition-transform cursor-pointer shrink-0">
                  <div className="absolute left-0 top-0 bottom-0 w-3 bg-white/10 border-r border-white/20"></div>
                  <p className="text-[#FFD76A] font-bold text-xs tracking-widest uppercase">Matt Haig</p>
                  <h3 className="text-white text-2xl font-black leading-none">The <br/>Midnight <br/>Library</h3>
                  <div className="w-full h-1 bg-[#FFD76A]/30 rounded-full"></div>
                </div>

                {/* Info & Progress */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="inline-block bg-[#F0873F] text-[#333333] font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full border-2 border-[#333333] mb-4 w-max">
                    August Expedition
                  </div>
                  <h2 className="text-3xl font-black text-[#FFD76A] mb-2">Chasing the perfect life.</h2>
                  <p className="text-white/80 font-medium mb-6">We are currently exploring chapters 10-15. How are we feeling about Nora's choices so far?</p>
                  
                  {/* Progress Bar */}
                  <div className="bg-white/10 p-4 rounded-xl border-2 border-white/20">
                    <div className="flex justify-between text-xs font-bold text-[#FFD76A] mb-2">
                      <span>Caravan Progress</span>
                      <span>45%</span>
                    </div>
                    <div className="w-full h-3 bg-[#333333] rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "45%" }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-[#F0873F]"></motion.div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button className="bg-[#FFD76A] text-[#333333] font-black px-6 py-3 rounded-xl border-2 border-[#333333] shadow-[4px_4px_0px_#333333] hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2">
                      <MessageSquare size={18} /> Join Discussion
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 2. UPCOMING SESSIONS (Span 4) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="lg:col-span-4 bg-white border-[3px] border-[#333333] rounded-[2rem] p-6 shadow-[-8px_8px_0px_#F0873F] flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-dashed border-[#333333]/20">
                <div className="p-2 bg-[#FFD76A] rounded-lg border-2 border-[#333333]">
                  <CalendarDays size={20} className="text-[#333333]" />
                </div>
                <h3 className="text-xl font-black text-[#333333]">Next Stops</h3>
              </div>

              <div className="space-y-4 flex-1">
                {/* Session Card 1 */}
                <div className="bg-[#FDF2E9] border-2 border-[#333333] rounded-xl p-4 relative group hover:-translate-y-1 transition-transform cursor-pointer">
                  <div className="absolute top-4 right-4 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                  <p className="text-xs font-black text-[#F0873F] uppercase tracking-wider mb-1">Today • 5:00 PM</p>
                  <p className="font-bold text-[#333333] leading-tight">Evening Forum: Chapter 10 Debate</p>
                  <p className="text-xs text-[#333333]/60 font-semibold mt-2">Voice Channel • 12 attending</p>
                </div>

                {/* Session Card 2 */}
                <div className="bg-white border-2 border-[#333333]/20 rounded-xl p-4 hover:border-[#333333] transition-colors cursor-pointer">
                  <p className="text-xs font-black text-[#333333]/50 uppercase tracking-wider mb-1">Saturday • 12:00 PM</p>
                  <p className="font-bold text-[#333333]/80 leading-tight">Sunny Session: Plot Theories</p>
                  <p className="text-xs text-[#333333]/50 font-semibold mt-2">Text Chat • Free for all</p>
                </div>
              </div>
              
              <button className="w-full mt-4 py-3 border-2 border-[#333333]/20 rounded-xl font-bold text-[#333333]/60 hover:text-[#333333] hover:border-[#333333] transition-colors">
                View Full Calendar
              </button>
            </motion.div>
          </div>

          {/* BOTTOM ROW WIDGETS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* 3. THE NOTICE BOARD (Ideas/Polls) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-[#333333] border-[3px] border-[#333333] rounded-[2rem] p-8 shadow-[-10px_10px_0px_#FFD76A] relative"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black text-white flex items-center gap-2">
                  <Lightbulb className="text-[#FFD76A]" /> The Notice Board
                </h3>
                <button className="text-xs font-bold text-[#F0873F] bg-[#F0873F]/10 px-3 py-1.5 rounded-lg hover:bg-[#F0873F]/20">Add Note +</button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Post-it Note 1 */}
                <div className="bg-[#FFD76A] p-5 rounded-sm border-2 border-[#333333] shadow-[4px_4px_0px_rgba(0,0,0,0.3)] transform rotate-1 hover:rotate-0 transition-transform cursor-pointer relative">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-red-400/50 -rotate-2"></div> {/* Tape */}
                  <p className="text-xs font-black text-[#333333]/50 uppercase mb-2">Vote Needed</p>
                  <p className="font-bold text-[#333333] text-sm">Should we switch to fantasy for September?</p>
                  <div className="mt-3 flex gap-2">
                    <span className="text-xs font-bold bg-white/50 px-2 py-1 rounded border border-[#333333]/20">👍 42</span>
                    <span className="text-xs font-bold bg-white/50 px-2 py-1 rounded border border-[#333333]/20">👎 5</span>
                  </div>
                </div>

                {/* Post-it Note 2 */}
                <div className="bg-[#FDF2E9] p-5 rounded-sm border-2 border-[#333333] shadow-[4px_4px_0px_rgba(0,0,0,0.3)] transform -rotate-2 hover:rotate-0 transition-transform cursor-pointer relative">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-blue-400/30 rotate-3"></div> {/* Tape */}
                  <p className="text-xs font-black text-[#333333]/50 uppercase mb-2">Idea</p>
                  <p className="font-bold text-[#333333] text-sm">Let's do a massive book swap event in December!</p>
                  <p className="text-xs font-bold text-[#F0873F] mt-3">8 comments</p>
                </div>
              </div>
            </motion.div>

            {/* 4. THE TAVERN (Games) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="bg-white border-[3px] border-[#333333] rounded-[2rem] p-8 shadow-[-10px_10px_0px_#333333]"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black text-[#333333] flex items-center gap-2">
                  <Dices className="text-[#F0873F]" /> The Tavern
                </h3>
              </div>

              <div className="space-y-4">
                {/* Game Card 1 */}
                <div className="flex items-center justify-between p-4 border-2 border-[#333333] rounded-xl bg-[#FDF2E9] group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#333333] rounded-lg flex items-center justify-center border-2 border-[#333333] shadow-[2px_2px_0px_#F0873F] group-hover:shadow-none group-hover:translate-y-0.5 transition-all">
                      <span className="text-2xl">♟️</span>
                    </div>
                    <div>
                      <p className="font-black text-[#333333]">Caravan Chess</p>
                      <p className="text-xs font-bold text-[#333333]/60">3 members waiting to play</p>
                    </div>
                  </div>
                  <button className="w-10 h-10 bg-[#FFD76A] border-2 border-[#333333] rounded-full flex items-center justify-center shadow-[2px_2px_0px_#333333] hover:translate-y-0.5 hover:shadow-none transition-all">
                    <Play size={16} className="text-[#333333] ml-1" />
                  </button>
                </div>

                {/* Game Card 2 */}
                <div className="flex items-center justify-between p-4 border-2 border-[#333333]/20 rounded-xl hover:border-[#333333] transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border-2 border-[#333333]/20 group-hover:border-[#333333] transition-colors">
                      <span className="text-2xl">📚</span>
                    </div>
                    <div>
                      <p className="font-black text-[#333333]">Daily Bookle</p>
                      <p className="text-xs font-bold text-[#333333]/60">Guess the quote in 6 tries.</p>
                    </div>
                  </div>
                  <button className="text-xs font-bold px-4 py-2 bg-[#333333] text-white rounded-lg border-2 border-[#333333] hover:bg-[#333333]/90">
                    Play
                  </button>
                </div>
              </div>

              {/* Mini Leaderboard */}
              <div className="mt-6 pt-6 border-t-2 border-dashed border-[#333333]/20 flex items-center justify-between">
                <p className="text-sm font-bold text-[#333333]/60 flex items-center gap-2">
                  <Trophy size={16} className="text-[#FFD76A]" /> Tavern Leader: <span className="text-[#333333]">@GandalfRead</span>
                </p>
                <Link href="#" className="text-xs font-black text-[#F0873F] hover:underline">View Rankings</Link>
              </div>

            </motion.div>
          </div>

        </div>
      </main>
    </div>
  )
}