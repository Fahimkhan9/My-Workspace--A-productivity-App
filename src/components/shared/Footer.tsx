import React from 'react'

function Footer() {
  return (
   <footer className="bg-base-200 text-base-content">
  <div className="container mx-auto px-4 py-10">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

      {/* Brand */}
      <div>
        <h2 className="text-xl font-bold mb-2">NoteTask</h2>
        <p className="text-sm">
          Organize your notes and tasks efficiently with AI-powered assistance.
        </p>
      </div>

      {/* Links */}
      <div>
        <h3 className="footer-title">Product</h3>
        <ul className="space-y-1">
          <li><a className="link link-hover">Features</a></li>
          <li><a className="link link-hover">Pricing</a></li>
          <li><a className="link link-hover">AI Summarizer</a></li>
        </ul>
      </div>

      <div>
        <h3 className="footer-title">Company</h3>
        <ul className="space-y-1">
          <li><a className="link link-hover">About</a></li>
          <li><a className="link link-hover">Blog</a></li>
          <li><a className="link link-hover">Careers</a></li>
        </ul>
      </div>

      <div>
        <h3 className="footer-title">Contact</h3>
        <ul className="space-y-1">
          <li><a className="link link-hover">Help Center</a></li>
          <li><a className="link link-hover">Terms of Service</a></li>
          <li><a className="link link-hover">Privacy Policy</a></li>
        </ul>
      </div>
    </div>

    <div className="mt-10 border-t pt-4 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} My WorkSpace. All rights reserved.
    </div>
  </div>
</footer>

  )
}

export default Footer