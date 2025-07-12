import React from 'react'
import Link from 'next/link'
function HeroSection() {
  return (
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Notes & Tasks Manager with AI Summarization</h1>
      <p className="py-6">
        A modern React/Next.js app to manage notes and tasks with markdown support and AI-powered summarization.
      </p>
      <Link href='/dashboard/notes'>
       <button className="btn btn-primary">Get Started</button>
      </Link>
     
    </div>
  </div>
</div>
  )
}

export default HeroSection