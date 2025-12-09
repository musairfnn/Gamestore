'use client'

import React, { useState } from 'react'
import AboutModal from '@/components/AboutModal' // pastikan path sesuai

const Navbar = () => {
  const [showAbout, setShowAbout] = useState(false)

  return (
    <div>
      <nav className="flex items-center justify-between px-6 py-3 bg-white shadow relative">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl">GIM</span>
          <span className="text-xl font-light">MART</span>
        </div>

        <div className="flex space-x-6 font-medium text-gray-700 items-center">

          <a href="/dev-panel/dashboard" className="hover:text-indigo-600">Your Game</a>
          <a href="/dev-panel/upload-game" className="hover:text-indigo-600">Upload</a>
          <a href="/dev-panel/statistik" className="hover:text-indigo-600">Statistik</a>

          {/* Tombol About membuka modal */}
          <button 
            onClick={() => setShowAbout(true)} 
            className="hover:text-indigo-600 focus:outline-none"
          >
            About
          </button>

          <a href="/dev-panel/faq" className="hover:text-indigo-600">FAQ</a>
        </div>
      </nav>

      {/* Modal About */}
      <AboutModal 
        isOpen={showAbout} 
        onClose={() => setShowAbout(false)} 
      />
    </div>
  )
}

export default Navbar
