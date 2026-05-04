// src/app/signup/page.tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@workspace/ui/components/button" // Adjust path to your setup
import { Input } from "@workspace/ui/components/input"     // Adjust path to your setup
import Image from "next/image"
import Link from "next/link"
import { Ticket, User, Mail, Lock, Sparkles, ArrowRight, BookKey } from "lucide-react"

// Import your logo! (Make sure the path is correct relative to this folder)
import CaravanLogo from "../caravan-logo-v2.png.png" 

export default function SignupPage() {
  const [formData, setFormData] = useState({
    inviteCode: "",
    username: "",
    email: "",
    password: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate an API call to verify the invite code and create the account
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#FFD76A] flex items-center justify-center p-4 md:p-8 font-sans text-[#333333]">
      
      {/* Back to Home Button */}
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 font-bold text-[#333333] hover:text-[#F0873F] transition-colors bg-white/50 px-4 py-2 rounded-full border-2 border-[#333333]/20 hover:border-[#333333]">
        Back to Route
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
        className="w-full max-w-5xl bg-[#FDF2E9] border-[3px] border-[#333333] rounded-[2rem] shadow-[-12px_12px_0px_#333333] flex flex-col md:flex-row overflow-hidden"
      >
        
        {/* LEFT SIDE: The VIP Golden Ticket Branding */}
        <div className="w-full md:w-5/12 bg-[#333333] p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#F0873F]/20 rounded-full blur-3xl"></div>
          <div className="absolute top-10 right-10 w-32 h-32 bg-[#FFD76A]/10 rounded-full blur-2xl"></div>

         <div className="relative z-10">
            {/* NEW: Added a light "paper" background pill so the full-color logo pops on the dark background! */}
            <div className="bg-[#FDF2E9] inline-block p-3 rounded-2xl border-2 border-[#333333] shadow-[4px_4px_0px_#F0873F] mb-12 transform -rotate-2">
              <Image 
                src={CaravanLogo} 
                alt="Caravan Book Club Community Logo" 
                width={140} 
                height={45} 
                className="object-contain" 
              />
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#FFD76A] leading-tight tracking-tight mb-6">
              Your wagon <br/> awaits.
            </h1>
            <p className="text-white/80 font-medium text-lg leading-relaxed">
              You've cleared the waitlist. Claim your spot, set up your profile, and join the global discussion. The journey starts here.
            </p>
          </div>

          <div className="relative z-10 mt-12 bg-white/10 p-5 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="text-[#F0873F]" size={20} />
              <h3 className="text-white font-bold tracking-widest uppercase text-sm">Member Perks Active</h3>
            </div>
            <ul className="text-white/70 text-sm space-y-2 font-medium">
              <li>• Access to all virtual sessions</li>
              <li>• Member-only Discord channels</li>
              <li>• Monthly curated reading guides</li>
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE: The Signup Form */}
        <div className="w-full md:w-7/12 p-8 md:p-12 lg:p-16 relative">
          
          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-6"
            >
              <div className="w-24 h-24 bg-[#FFD76A] rounded-full flex items-center justify-center border-[3px] border-[#333333] shadow-[4px_4px_0px_#F0873F]">
                <BookKey size={48} className="text-[#333333]" />
              </div>
              <div>
                <h2 className="text-4xl font-extrabold text-[#333333] mb-2">Welcome aboard!</h2>
                <p className="text-lg text-[#333333]/70 font-medium max-w-sm mx-auto">
                  Your profile is set up. Grab your bookmark and head over to the member dashboard.
                </p>
              </div>
         <Link href="/dashboard">
  <Button
    size="lg"
    className="w-full max-w-xs h-14 text-lg rounded-xl bg-[#F0873F] text-[#333333] font-black border-[3px] border-[#333333] shadow-[4px_4px_0px_#333333] hover:bg-[#F0873F]/90 mt-4"
  >
    Enter Dashboard
  </Button>
</Link>
            </motion.div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-[#333333]">Claim your spot</h2>
                <p className="text-[#333333]/60 font-semibold mt-1">Use your invite code to create your account.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Invite Code - Visually distinct to show its importance */}
                <div className="bg-[#FFD76A]/20 p-4 rounded-2xl border-2 border-[#FFD76A] mb-6">
                  <label className="text-xs font-black uppercase tracking-widest text-[#F0873F] ml-1 flex items-center gap-2 mb-2">
                    <Ticket size={14} /> Official Invite Code
                  </label>
                  <Input 
                    required
                    placeholder="e.g. CRVN-2026-XYZ" 
                    className="border-2 border-[#333333]/20 focus-visible:ring-[#F0873F] bg-white rounded-xl h-12 text-lg font-mono placeholder:font-sans"
                    value={formData.inviteCode} onChange={(e) => setFormData({...formData, inviteCode: e.target.value.toUpperCase()})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#333333] ml-1 flex items-center gap-2">
                      <User size={16} className="text-[#333333]/50" /> Caravan Name (Username)
                    </label>
                    <Input 
                      required
                      placeholder="bookworm99" 
                      className="border-2 border-[#333333]/20 focus-visible:ring-[#333333] focus-visible:border-[#333333] bg-white rounded-xl h-12"
                      value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#333333] ml-1 flex items-center gap-2">
                      <Mail size={16} className="text-[#333333]/50" /> Email Address
                    </label>
                    <Input 
                      required
                      type="email"
                      placeholder="hello@example.com" 
                      className="border-2 border-[#333333]/20 focus-visible:ring-[#333333] focus-visible:border-[#333333] bg-white rounded-xl h-12"
                      value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#333333] ml-1 flex items-center gap-2">
                    <Lock size={16} className="text-[#333333]/50" /> Password
                  </label>
                  <Input 
                    required
                    type="password"
                    placeholder="••••••••" 
                    className="border-2 border-[#333333]/20 focus-visible:ring-[#333333] focus-visible:border-[#333333] bg-white rounded-xl h-12"
                    value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting || !formData.inviteCode || !formData.username || !formData.password}
                  className="w-full h-14 text-lg rounded-xl bg-[#333333] text-[#FFD76A] font-black border-[3px] border-[#333333] hover:bg-[#333333]/90 hover:text-white shadow-[4px_4px_0px_#F0873F] transition-all disabled:opacity-70 disabled:shadow-none disabled:translate-y-1 mt-8 group"
                >
                  {isSubmitting ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Sparkles />
                    </motion.div>
                  ) : (
                    <span className="flex items-center gap-2">
                      Create Profile <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm font-medium text-[#333333]/60">
                  Already have an account? <Link href="#" className="text-[#F0873F] font-bold hover:underline">Log in</Link>
                </p>
              </div>
            </>
          )}

        </div>
      </motion.div>
    </div>
  )
}