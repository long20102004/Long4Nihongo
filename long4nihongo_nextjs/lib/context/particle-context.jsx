"use client"

import { createContext, useContext, useState } from "react"

const ParticleContext = createContext()

export function ParticleProvider({ children }) {
  const [isParticlesEnabled, setIsParticlesEnabled] = useState(true)

  const toggleParticles = () => {
    setIsParticlesEnabled((prev) => !prev)
  }

  return <ParticleContext.Provider value={{ isParticlesEnabled, toggleParticles }}>{children}</ParticleContext.Provider>
}

export function useParticles() {
  const context = useContext(ParticleContext)
  if (context === undefined) {
    throw new Error("useParticles must be used within a ParticleProvider")
  }
  return context
}

