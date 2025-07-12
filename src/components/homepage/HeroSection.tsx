import React from 'react'
import Link from 'next/link'
function HeroSection() {
  return (
    <section className="bg-base-100 py-16 px-4 md:px-10">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
 
    <div>
      <h1 className="text-4xl md:text-5xl font-bold leading-tight">
        Organize Your <span className="text-primary">Notes</span> & Tasks Effortlessly
      </h1>
      <p className="text-lg text-gray-500 mt-4">
        Manage your day with simplicity and AI-powered summaries. Create, edit, and track notes & tasks – all in one dashboard.
      </p>
      <div className="mt-6 flex gap-4 flex-wrap">
        <Link href='/dashboard/notes' >
         <button className="btn btn-primary">Get Started</button>
        </Link>
       

      </div>
    </div>

    <div className="hidden md:block">
      <img
        src="/illustration-notes.svg"
        alt="Notes Dashboard"
        className="w-full max-w-md mx-auto"
      />
    </div>
  </div>
</section>

  )
}

export default HeroSection