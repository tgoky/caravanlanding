// src/components/WaitlistForm.tsx
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
// Adjust paths to your monorepo setup:
import { Button } from "../../../packages/ui/src/components/button" 
import { Input } from "../../../packages/ui/src/components/input"     
import { Calendar, Clock, Sparkles, CheckCircle2, AlertCircle, Sun, Moon, Ticket, CalendarDays, Ban } from "lucide-react"

// Framer Motion animation variants for sliding in/out
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 500 : -500,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 500 : -500,
    opacity: 0,
  }),
}

const GAMES = ["Catan", "Chess", "DnD", "Scrabble", "Monopoly", "Codenames"]

// Membership Plans Data
const PLANS = [
  { id: "weekly", title: "Weekly Rider", price: "₵200", desc: "3 days a week", perks: ["Standard Caravan Access", "Free Board Game Usage"] },
  { id: "monthly", title: "Monthly Nomad", price: "₵500", desc: "12 Sessions (3x a week for 4 weeks)", perks: ["Priority Seating", "10% off Book Purchases", "Bring a Guest once"] },
  { id: "yearly", title: "Grand Caravan", price: "₵5,000", desc: "Full Year Access", perks: ["V.I.P Status", "Free Snacks & Drinks", "Exclusive Merch Pack"] },
]

// Session Times Data
const SESSIONS = [
  { id: "sunny", title: "Sunny Sessions", time: "12:00 PM - 3:00 PM", icon: Sun, color: "text-[#F0873F]" },
  { id: "evening", title: "Evening Sessions", time: "5:00 PM - 8:00 PM", icon: Moon, color: "text-blue-400" }
]

export default function WaitlistForm() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    allergies: "",
    games: [] as string[],
    plan: "", // Weekly, Monthly, Yearly
    sessionTime: "", // Sunny or Evening
    daysAvailable: [] as string[],
  })

  // Handlers
  const nextStep = () => {
    setDirection(1)
    setStep((prev) => prev + 1)
  }
  const prevStep = () => {
    setDirection(-1)
    setStep((prev) => prev - 1)
  }
  
  const toggleGame = (game: string) => {
    setFormData(prev => ({
      ...prev,
      games: prev.games.includes(game) 
        ? prev.games.filter(g => g !== game) 
        : [...prev.games, game]
    }))
  }

  // UPDATED: Enforce max 3 days limit and handle Sunday
  const toggleDay = (day: string) => {
    if (day === 'Sun') return; // Cannot select Sunday

    setFormData(prev => {
      const isAlreadySelected = prev.daysAvailable.includes(day);
      
      // If they are trying to add a new day, but already have 3, block it.
      if (!isAlreadySelected && prev.daysAvailable.length >= 3) {
        return prev; 
      }

      return {
        ...prev,
        daysAvailable: isAlreadySelected
          ? prev.daysAvailable.filter(d => d !== day) // Remove it
          : [...prev.daysAvailable, day] // Add it
      }
    })
  }

  // Validation
  const isAgeValid = formData.age === "" || parseInt(formData.age) >= 12
  const canProceedStep0 = formData.name.length > 2 && formData.age !== "" && isAgeValid

  return (
    <div className="w-full max-w-xl mx-auto overflow-hidden relative min-h-[500px] bg-[#FFD76A] border-[3px] border-[#333333] rounded-3xl shadow-[-8px_8px_0px_#333333] p-8">
      
      {/* Progress Bar */}
      <div className="flex gap-2 mb-8">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-2 flex-1 rounded-full transition-colors duration-500 ${i <= step && step !== 4 ? "bg-[#333333]" : "bg-white/40 border border-[#333333]/20"}`} />
        ))}
      </div>

      <AnimatePresence custom={direction} mode="wait">
        
        {/* STEP 0: Basics (Name & Age) */}
        {step === 0 && (
          <motion.div key="step0" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 300, damping: 30 }} className="space-y-6">
            <div>
              <h2 className="text-3xl font-extrabold text-[#333333] flex items-center gap-2">
                <Sparkles className="text-[#333333]/70" /> Let's get acquainted.
              </h2>
              <p className="text-[#333333]/70 mt-2 font-semibold">Who is joining the Caravan?</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-[#333333] ml-1">Your Name</label>
                <Input 
                  placeholder="e.g. Bilbo Baggins" 
                  className="mt-1 border-2 border-[#333333]/20 focus-visible:ring-[#333333] bg-white rounded-xl h-12 text-lg"
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-bold text-[#333333] ml-1">Age (12+ Only)</label>
                <Input 
                  type="number" placeholder="12" 
                  className={`mt-1 border-2 focus-visible:ring-[#333333] bg-white rounded-xl h-12 text-lg ${!isAgeValid ? 'border-red-500' : 'border-[#333333]/20'}`}
                  value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})}
                />
                {!isAgeValid && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1 font-medium"><AlertCircle size={16}/> You must be 12 or older to join!</p>
                )}
              </div>
            </div>
            <Button size="lg" disabled={!canProceedStep0} onClick={nextStep} className="w-full h-14 text-lg rounded-xl bg-[#333333] text-[#FFD76A] hover:bg-[#333333]/90 mt-4">
              Next Step →
            </Button>
          </motion.div>
        )}

        {/* STEP 1: Preferences (Allergies & Games) */}
        {step === 1 && (
          <motion.div key="step1" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 300, damping: 30 }} className="space-y-6">
            <div>
              <h2 className="text-3xl font-extrabold text-[#333333]">Your Vibe & Needs.</h2>
              <p className="text-[#333333]/70 mt-2 font-semibold">Snacks and games are vital to the journey.</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-bold text-[#333333] ml-1">Any Food Allergies?</label>
                <Input 
                  placeholder="e.g. Peanuts, Gluten (Leave blank if none)" 
                  className="mt-1 border-2 border-[#333333]/20 focus-visible:ring-[#333333] bg-white rounded-xl h-12"
                  value={formData.allergies} onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-bold text-[#333333] ml-1 block mb-2">Select your favorite games</label>
                <div className="flex flex-wrap gap-2">
                  {GAMES.map(game => (
                    <button
                      key={game} onClick={() => toggleGame(game)}
                      className={`px-4 py-2 rounded-full border-2 font-semibold transition-all ${
                        formData.games.includes(game) 
                        ? 'border-[#333333] bg-[#333333] text-[#FFD76A] shadow-[2px_2px_0px_#333333]/20' 
                        : 'border-[#333333] text-[#333333] bg-white/50 hover:bg-white hover:border-[#333333]/60'
                      }`}
                    >
                      {game}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <Button size="lg" variant="outline" onClick={prevStep} className="w-1/3 h-14 text-lg rounded-xl border-2 border-[#333333]/20 text-[#333333] bg-white">Back</Button>
              <Button size="lg" onClick={nextStep} className="w-2/3 h-14 text-lg rounded-xl bg-[#333333] text-[#FFD76A] hover:bg-[#333333]/90">Membership Plans →</Button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: The Plans */}
        {step === 2 && (
          <motion.div key="step2" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 300, damping: 30 }} className="space-y-6">
            <div>
              <h2 className="text-3xl font-extrabold text-[#333333] flex items-center gap-2">
                <Ticket className="text-[#333333]/70" /> Pick Your Plan.
              </h2>
              <p className="text-[#333333]/70 mt-2 font-semibold">Choose how you want to ride with the Caravan.</p>
            </div>
            
            <div className="space-y-3">
              {PLANS.map(plan => (
                <button
                  key={plan.id} onClick={() => setFormData({...formData, plan: plan.id})}
                  className={`w-full text-left p-4 rounded-2xl border-[3px] transition-all relative overflow-hidden ${
                    formData.plan === plan.id 
                    ? 'border-[#333333] bg-[#333333] shadow-[4px_4px_0px_#333333]/20 text-white' 
                    : 'border-[#333333]/30 bg-white/80 text-[#333333] hover:border-[#333333] hover:bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className={`text-xl font-extrabold ${formData.plan === plan.id ? 'text-[#FFD76A]' : 'text-[#333333]'}`}>{plan.title}</h3>
                      <p className={`text-xs font-bold ${formData.plan === plan.id ? 'text-white/80' : 'text-[#333333]/60'}`}>{plan.desc}</p>
                    </div>
                    <div className={`text-2xl font-black ${formData.plan === plan.id ? 'text-white' : 'text-[#F0873F]'}`}>
                      {plan.price}
                    </div>
                  </div>
                  <div className="pt-2 border-t border-dashed border-current/20 flex flex-wrap gap-x-3 gap-y-1">
                    {plan.perks.map((perk, i) => (
                      <span key={i} className={`text-xs font-medium flex items-center gap-1 ${formData.plan === plan.id ? 'text-[#FFD76A]/90' : 'text-[#333333]/80'}`}>
                        <CheckCircle2 size={12} /> {perk}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-4 mt-8">
              <Button size="lg" variant="outline" onClick={prevStep} className="w-1/3 h-14 text-lg rounded-xl border-2 border-[#333333]/20 text-[#333333] bg-white">Back</Button>
              <Button 
                size="lg" onClick={nextStep} 
                disabled={!formData.plan}
                className="w-2/3 h-14 text-lg rounded-xl bg-[#333333] text-[#FFD76A] hover:bg-[#333333]/90 disabled:opacity-50"
              >
                Pick Schedule →
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Availability (Calendar & Max 3 Days logic) */}
        {step === 3 && (
          <motion.div key="step3" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 300, damping: 30 }} className="space-y-6">
            <div>
              <h2 className="text-3xl font-extrabold text-[#333333] flex items-center gap-2">
                <CalendarDays className="text-[#333333]/60" /> Your Schedule.
              </h2>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#333333] ml-1 block">1. Select your preferred vibe</label>
              <div className="grid grid-cols-2 gap-4">
                {SESSIONS.map(session => (
                  <button
                    key={session.id} onClick={() => setFormData({...formData, sessionTime: session.id})}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-[3px] transition-all ${
                      formData.sessionTime === session.id 
                      ? 'border-[#333333] bg-[#333333] text-white shadow-[4px_4px_0px_#333333]/20' 
                      : 'border-[#333333]/20 bg-white/60 text-[#333333] hover:border-[#333333]/50 hover:bg-white'
                    }`}
                  >
                    <session.icon size={32} className={`mb-2 ${formData.sessionTime === session.id ? session.color : 'text-gray-400'}`} />
                    <span className="font-extrabold text-lg">{session.title}</span>
                    <span className={`text-xs font-bold ${formData.sessionTime === session.id ? 'text-[#FFD76A]' : 'text-[#333333]/50'}`}>{session.time}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <div className="flex justify-between items-end mb-3">
                <label className="text-sm font-bold text-[#333333] ml-1 block">2. Which days work best?</label>
                {/* Visual counter to show them they only get 3 */}
                <span className={`text-xs font-extrabold px-2 py-1 rounded-md border-2 ${formData.daysAvailable.length === 3 ? 'bg-green-200 border-green-600 text-green-800' : 'bg-white border-[#333333]/30 text-[#333333]'}`}>
                  {formData.daysAvailable.length} / 3 Selected
                </span>
              </div>
              <div className="flex justify-between gap-1">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => {
                  const isSelected = formData.daysAvailable.includes(day);
                  const isSun = day === 'Sun';
                  const isMaxedOut = !isSelected && formData.daysAvailable.length >= 3;
                  
                  return (
                    <button
                      key={day} 
                      onClick={() => toggleDay(day)}
                      disabled={isSun} // Actually disable the button if it's Sunday
                      className={`relative h-14 flex-1 rounded-xl border-[3px] font-bold transition-all text-sm flex flex-col items-center justify-center overflow-hidden
                        ${isSun 
                          ? 'border-red-300 bg-red-50 text-red-300 cursor-not-allowed opacity-70' // Sunday styling
                          : isSelected 
                            ? 'border-[#333333] bg-[#F0873F] text-[#333333] shadow-[2px_2px_0px_#333333] transform -translate-y-1' // Selected
                            : isMaxedOut 
                              ? 'border-[#333333]/10 bg-white/40 text-[#333333]/30 cursor-not-allowed' // Maxed out styling
                              : 'border-[#333333]/20 bg-white/80 text-[#333333]/60 hover:border-[#333333]/50' // Default unselected
                        }
                      `}
                    >
                      <span>{day}</span>
                      
                      {/* Add a little crossed-out UI for Sunday */}
                      {isSun && (
                        <>
                          <div className="absolute w-full h-0.5 bg-red-300 rotate-45 transform"></div>
                          <span className="text-[9px] absolute bottom-0 mb-1 leading-none font-black text-red-400">REST</span>
                        </>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <Button size="lg" variant="outline" onClick={prevStep} className="w-1/3 h-14 text-lg rounded-xl border-2 border-[#333333]/20 text-[#333333] bg-white">Back</Button>
              <Button 
                size="lg" onClick={() => setStep(4)} 
                disabled={!formData.sessionTime || formData.daysAvailable.length === 0}
                className="w-2/3 h-14 text-lg rounded-xl bg-[#F0873F] text-[#333333] font-black border-[3px] border-[#333333] hover:bg-[#F0873F]/90 shadow-[4px_4px_0px_#333333] disabled:opacity-50 disabled:shadow-none disabled:translate-y-1"
              >
                Join Waitlist
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: Success! */}
        {step === 4 && (
          <motion.div key="step4" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }} className="flex flex-col items-center justify-center text-center space-y-6 py-8">
            <div className="w-24 h-24 bg-[#F0873F] rounded-full flex items-center justify-center border-4 border-[#333333] shadow-[6px_6px_0px_#333333]/30">
              <Ticket size={40} className="text-[#333333]" />
            </div>
            <div>
              <h2 className="text-4xl font-extrabold text-[#333333]">You're on the list!</h2>
              <div className="bg-white/60 border-2 border-[#333333]/20 rounded-xl p-4 mt-6 max-w-sm mx-auto">
                <p className="text-sm text-[#333333]/80 font-bold mb-2">Requested Membership:</p>
                <p className="text-xl font-black text-[#F0873F] uppercase tracking-wide">
                  {PLANS.find(p => p.id === formData.plan)?.title || 'Member'}
                </p>
                <p className="text-xs text-[#333333]/60 font-bold mt-1">
                  ({formData.daysAvailable.join(', ')} • {formData.sessionTime === 'sunny' ? '☀️ Sunny' : '🌙 Evening'} Sessions)
                </p>
              </div>
              <p className="text-lg text-[#333333]/90 mt-6 max-w-sm mx-auto font-medium">
                Thanks, {formData.name.split(' ')[0]}! We'll let you know exactly when a slot opens up for your plan. The 2026 Caravan departs soon!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}