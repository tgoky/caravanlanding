// src/components/WaitlistForm.tsx
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
// Adjust paths to your monorepo setup:
import { Button } from "../../../packages/ui/src/components/button" 
import { Input } from "../../../packages/ui/src/components/input"     
import { Calendar, Clock, Sparkles, CheckCircle2, AlertCircle } from "lucide-react"

// Framer Motion animation variants for sliding in/out (no changes needed)
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
const FREQUENCIES = [
  { id: "weekly", title: "Weekly", desc: "3 times a week" },
  { id: "monthly", title: "Monthly", desc: "1 big meetup" },
  { id: "yearly", title: "Yearly", desc: "The Grand Caravan" },
]

export default function WaitlistForm() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    allergies: "",
    games: [] as string[],
    frequency: "",
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
  const toggleDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      daysAvailable: prev.daysAvailable.includes(day)
        ? prev.daysAvailable.filter(d => d !== day)
        : [...prev.daysAvailable, day]
    }))
  }

  // Validation
  const isAgeValid = formData.age === "" || parseInt(formData.age) >= 12
  const canProceedStep0 = formData.name.length > 2 && formData.age !== "" && isAgeValid

  return (
    // !!! COLOR SWAP 5: The big container box. It was white, now is the original warm yellow. Shadow was Orange, now is solid Charcoal, vice-versa!
    <div className="w-full max-w-xl mx-auto overflow-hidden relative min-h-[500px] bg-[#FFD76A] border-[3px] border-[#333333] rounded-3xl shadow-[-8px_8px_0px_#333333] p-8">
      
      {/* Progress Bar follows the dark internal theme. */}
      <div className="flex gap-2 mb-8">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`h-2 flex-1 rounded-full transition-colors duration-500 ${i <= step && step !== 3 ? "bg-[#333333]" : "bg-white/20"}`} />
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
                {/* Internal input boxes are white. */}
                <Input 
                  placeholder="e.g. Bilbo Baggins" 
                  className="mt-1 border-2 border-[#333333]/20 focus-visible:ring-[#333333] bg-white rounded-xl h-12 text-lg"
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-bold text-[#333333] ml-1">Age</label>
                <Input 
                  type="number" placeholder="12+" 
                  className={`mt-1 border-2 focus-visible:ring-[#333333] bg-white rounded-xl h-12 text-lg ${!isAgeValid ? 'border-red-500' : 'border-[#333333]/20'}`}
                  value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})}
                />
                {!isAgeValid && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1 font-medium"><AlertCircle size={16}/> You must be 12 or older to join!</p>
                )}
              </div>
            </div>
            {/* Primary internal button (Next Step) uses the charcoal text/bg swap. */}
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
                    // !!! COLOR SWAP 6: Game pills. Unselected pop on yellow. Selected are solid charcoal. 
                    <button
                      key={game} onClick={() => toggleGame(game)}
                      className={`px-4 py-2 rounded-full border-2 font-semibold transition-all ${
                        formData.games.includes(game) 
                        ? 'border-[#333333] bg-[#333333] text-[#FFD76A] shadow-[2px_2px_0px_#333333]/20' 
                        : 'border-[#333333] text-[#333333] hover:bg-[#333333]/10 hover:border-[#333333]/60'
                      }`}
                    >
                      {game}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <Button size="lg" variant="outline" onClick={prevStep} className="w-1/3 h-14 text-lg rounded-xl border-2 border-[#333333]/20 text-[#333333]">Back</Button>
              <Button size="lg" onClick={nextStep} className="w-2/3 h-14 text-lg rounded-xl bg-[#333333] text-[#FFD76A] hover:bg-[#333333]/90">Almost There →</Button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Availability (Frequency & Calendar) */}
        {step === 2 && (
          <motion.div key="step2" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 300, damping: 30 }} className="space-y-6">
            <div>
              <h2 className="text-3xl font-extrabold text-[#333333] flex items-center gap-2">
                <Calendar className="text-[#333333]/60" /> Your Availability.
              </h2>
            </div>
            
            {/* Custom "Themed" Frequency Cards. Pop on yellow with charcoal shadow. */}
            <div className="grid grid-cols-3 gap-3">
              {FREQUENCIES.map(freq => (
                <button
                  key={freq.id} onClick={() => setFormData({...formData, frequency: freq.id})}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    formData.frequency === freq.id 
                    ? 'border-[#333333] bg-[#333333] shadow-[4px_4px_0px_#333333]/20 text-[#FFD76A]' 
                    : 'border-[#333333] text-[#333333] hover:border-[#333333]/80 hover:bg-[#333333]/10'
                  }`}
                >
                  <Clock className={`mb-2 ${formData.frequency === freq.id ? 'text-[#FFD76A]' : 'text-gray-400'}`} size={20}/>
                  <div className={`font-extrabold ${formData.frequency === freq.id ? 'text-[#FFD76A]' : 'text-[#333333]'}`}>{freq.title}</div>
                  <div className={`text-xs font-medium ${formData.frequency === freq.id ? 'text-[#FFD76A]/80' : 'text-[#333333]/70'}`}>{freq.desc}</div>
                </button>
              ))}
            </div>

            {/* Custom Interactive Week "Calendar" */}
            <div className="pt-2">
              <label className="text-sm font-bold text-[#333333] ml-1 block mb-3">Which days work best?</label>
              <div className="flex justify-between gap-1">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  // !!! COLOR SWAP 7: Calendar pills unselected: border charcoal, light gray bg. Selected: Border charcoal, solid charcoal bg. Vice versa!
                  <button
                    key={day} onClick={() => toggleDay(day)}
                    className={`h-12 flex-1 rounded-xl border-2 font-bold transition-all text-sm ${
                      formData.daysAvailable.includes(day) 
                      ? 'border-[#333333] bg-[#333333] text-[#FFD76A] shadow-[2px_2px_0px_#333333]/20' 
                      : 'border-[#333333] bg-gray-50 text-[#333333]'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <Button size="lg" variant="outline" onClick={prevStep} className="w-1/3 h-14 text-lg rounded-xl border-2 border-[#333333]/20 text-[#333333]">Back</Button>
              {/* Join Waitlist uses original orange for maximum CTA. */}
              <Button 
                size="lg" onClick={() => setStep(3)} // In real life, submit to DB here!
                disabled={!formData.frequency || formData.daysAvailable.length === 0}
                className="w-2/3 h-14 text-lg rounded-xl bg-[#F0873F] text-[#333333] hover:bg-[#F0873F]/90 shadow-[4px_4px_0px_#333333]"
              >
                Join Waitlist
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Success! */}
        {step === 3 && (
          <motion.div key="step3" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }} className="flex flex-col items-center justify-center text-center space-y-6 py-8">
            {/* The success icon gets adapted to dark desk color scheme. */}
            <div className="w-24 h-24 bg-[#333333] rounded-full flex items-center justify-center border-4 border-white shadow-[6px_6px_0px_#333333]/30">
              <CheckCircle2 size={48} className="text-[#FFD76A]" />
            </div>
            <div>
              <h2 className="text-4xl font-extrabold text-[#333333]">You're on the list!</h2>
              <p className="text-lg text-[#333333]/80 mt-4 max-w-xs mx-auto">
                Thanks, {formData.name.split(' ')[0]}! Keep an eye on your inbox. The 2026 Caravan departs soon.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}