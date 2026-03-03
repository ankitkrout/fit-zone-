// Professional Gym Logo - Ritik Fit Zone
// Beautiful and Modern Logo Design

import React from 'react'
import { Dumbbell } from 'lucide-react'

export default function Logo({ className = "", size = "md" }) {
  const sizes = {
    sm: { icon: 6, main: 'text-lg', sub: 'text-xs' },
    md: { icon: 8, main: 'text-2xl', sub: 'text-sm' },
    lg: { icon: 10, main: 'text-3xl', sub: 'text-lg' },
    xl: { icon: 12, main: 'text-4xl', sub: 'text-xl' }
  }

  const s = sizes[size]

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center">
        {/* Dumbbell Icon with gradient */}
        <div className="relative">
          <Dumbbell 
            size={s.icon * 4} 
            className="text-orange-500 mr-2"
            strokeWidth={2.5}
          />
          {/* Glow effect */}
          <div className="absolute inset-0 blur-lg bg-orange-500/30 -z-10"></div>
        </div>
        
        {/* RITIK */}
        <span className={`font-extrabold ${s.main} text-white tracking-wider`}>
          RITIK
        </span>
        
        {/* FIT ZONE */}
        <span className={`font-bold ml-2 ${s.sub} text-orange-500 tracking-wide`}>
          FIT ZONE
        </span>
      </div>
    </div>
  )
}

// Logo Icon for small spaces
export function LogoIcon({ className = "" }) {
  return (
    <div className={`flex items-center ${className}`}>
      <Dumbbell size={28} className="text-orange-500" strokeWidth={2.5} />
    </div>
  )
}

// Logo for Footer
export function FooterLogo({ className = "" }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex items-center">
        <div className="relative">
          <Dumbbell size={36} className="text-orange-500 mr-2" strokeWidth={2.5} />
          <div className="absolute inset-0 blur-md bg-orange-500/30 -z-10"></div>
        </div>
        <span className="font-extrabold text-2xl text-white tracking-wider">RITIK</span>
        <span className="font-bold text-lg ml-2 text-orange-500 tracking-wide">FIT ZONE</span>
      </div>
      <p className="text-gray-400 text-sm mt-3 font-medium">Train Hard. Stay Strong.</p>
    </div>
  )
}

// Large Wall Mockup Logo (for hero sections)
export function WallMockupLogo({ className = "" }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex items-center">
        <div className="relative">
          <Dumbbell size={72} className="text-orange-500 mr-4" strokeWidth={2.5} />
          <div className="absolute inset-0 blur-xl bg-orange-500/40 -z-10"></div>
        </div>
        <div>
          <span className="font-extrabold text-6xl text-white tracking-wider block">
            RITIK
          </span>
          <span className="font-bold text-3xl text-orange-500 tracking-wider">
            FIT ZONE
          </span>
        </div>
      </div>
    </div>
  )
}

