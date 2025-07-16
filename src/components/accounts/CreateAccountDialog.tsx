'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

export function CreateAccountDialog() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        className="bg-white text-black px-6 py-3 font-bold"
      >
        CREATE ACCOUNT (Stub)
      </button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80">
          <div className="bg-black border-white p-6">
            <button onClick={() => setOpen(false)}><X /></button>
            <h2>Create Account Form (Implement Full Later)</h2>
            {/* Add form later */}
          </div>
        </div>
      )}
    </>
  )
}