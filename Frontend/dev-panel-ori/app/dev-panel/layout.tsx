import Navbar from '@/components/Navbar'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="min-h-screen bg-gray-100">
        <Navbar />
        {children}
    </div>
  )
}

export default layout