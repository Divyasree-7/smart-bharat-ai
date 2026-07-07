import React from 'react'
import { Link } from 'react-router-dom'
import ChakraWheel from './ChakraWheel.jsx'

export default function Footer() {
  return (
    <footer className="border-t border-slateink/10 dark:border-white/10 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-lg mb-3">
            <span className="w-7 h-7 text-marigold"><ChakraWheel spinning={false} /></span>
            Smart Bharat AI
          </div>
          <p className="text-sm text-slateink dark:text-kagaz/60 max-w-xs">
            An AI-powered civic assistant built for a hackathon — helping every citizen navigate government services, schemes and complaints in plain language.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-slateink dark:text-kagaz/60">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-marigold" to="/chat">Ask the Assistant</Link></li>
            <li><Link className="hover:text-marigold" to="/schemes">Scheme Finder</Link></li>
            <li><Link className="hover:text-marigold" to="/complaint">File a Complaint</Link></li>
            <li><Link className="hover:text-marigold" to="/about">About the Project</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-slateink dark:text-kagaz/60">Disclaimer</h4>
          <p className="text-sm text-slateink dark:text-kagaz/60">
            Responses are AI-generated guidance, not legal advice. Always verify on official government (.gov.in) portals before acting.
          </p>
        </div>
      </div>
      <div className="text-center text-xs text-slateink/70 dark:text-kagaz/40 pb-8">
        Built with 🧡 for Digital India · Hackathon Project · {new Date().getFullYear()}
      </div>
    </footer>
  )
}
