'use client'

import React, { useEffect, useState, useRef } from 'react'
import AboutModal from './AboutModal'  // sesuaikan path sesuai lokasi AboutModal.tsx

const Navbar = () => {
  const [clientName, setClientName] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)
  const [showAbout, setShowAbout] = useState(false)  // state modal About

  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setIsClient(true)
    const name = localStorage.getItem("Username_client")
    setClientName(name)

    // Close dropdown if click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (!isClient) return null

  const LogoutMethod = () => {
    localStorage.removeItem("Username_client")
    localStorage.removeItem("id_user")
    setClientName(null)
  }

  return (
    <div>
      <nav className="flex items-center justify-between px-6 py-3 bg-white shadow relative">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl">GIM</span>
          <span className="text-xl font-light">MART</span>
        </div>

        <div className="flex space-x-6 font-medium text-gray-700 items-center">
          {
            clientName ? 
            (
              <>
                {/* Link ke halaman profile dengan icon user */}
                <a href="/client-panel/profile" className="flex items-center space-x-2 hover:text-indigo-600">
                  {/* Icon user SVG */}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 text-gray-700" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M5.121 17.804A10.954 10.954 0 0112 15c2.785 0 5.343 1.057 7.121 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                    />
                  </svg>
                  <p>{clientName}</p>
                </a>
                <button onClick={LogoutMethod} className="hover:text-indigo-600">Logout</button>
              </>
            ) 
            : 
            (<a href="/client/login" className="hover:text-indigo-600">Login</a>)
          }

          <a href="/" className="hover:text-indigo-600">Store</a>
          <a href="/client-panel/cart" className="hover:text-indigo-600">Cart</a>
          <a href="/client-panel/library" className="hover:text-indigo-600">Library</a>

          {/* Tombol About buka modal */}
          <button 
            onClick={() => setShowAbout(true)} 
            className="hover:text-indigo-600 focus:outline-none"
          >
            About
          </button>

          <a href="/client-panel/faq" className="hover:text-indigo-600">FAQ</a>

          {/* Dropdown More */}
          <div 
            ref={dropdownRef}
            className="relative cursor-pointer select-none"
          >
            <div 
              className="hover:text-indigo-600"
              onClick={() => setOpenDropdown(prev => !prev)}
            >
              More ▾
            </div>

            {openDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white border shadow-md rounded-md py-2 z-50">
                <a href="/client-panel/contact" className="block px-4 py-2 hover:bg-gray-100">Contact</a>
                <a href="/client-panel/terms" className="block px-4 py-2 hover:bg-gray-100">Terms</a>
                <a href="/client-panel/privacy" className="block px-4 py-2 hover:bg-gray-100">Privacy</a>
                <a href="/client-panel/blog" className="block px-4 py-2 hover:bg-gray-100">Blog</a>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Render About Modal jika showAbout true */}
      <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />
    </div>
  )
}

export default Navbar
