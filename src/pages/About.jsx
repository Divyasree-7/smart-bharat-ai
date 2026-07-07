import React from 'react'
import { motion } from 'framer-motion'
import ChakraWheel from '../components/ChakraWheel.jsx'

const stack = ['React 18', 'React Router', 'Tailwind CSS', 'Framer Motion', 'Groq API (Llama 3.3)']

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="w-14 h-14 text-marigold mb-6"><ChakraWheel /></div>
        <h1 className="font-display font-bold text-3xl mb-4">About Smart Bharat AI</h1>
        <p className="text-slateink dark:text-kagaz/70 leading-relaxed mb-6">
          Smart Bharat AI is a hackathon project reimagining how everyday citizens interact with government services. Millions of people struggle with confusing forms, unclear eligibility rules, and not knowing which office to approach. This assistant simplifies that entire journey into a friendly conversation.
        </p>
        <h2 className="font-display font-bold text-xl mb-3 mt-10">What it does</h2>
        <ul className="space-y-2 text-slateink dark:text-kagaz/70 list-disc list-inside">
          <li>Explains how to apply for government services like Aadhaar, PAN, and Passport</li>
          <li>Identifies civic issues and drafts ready-to-submit complaints</li>
          <li>Recommends welfare schemes based on a citizen's profile</li>
          <li>Explains why a document is needed and how to obtain it</li>
        </ul>
        <h2 className="font-display font-bold text-xl mb-3 mt-10">Tech stack</h2>
        <div className="flex flex-wrap gap-2 mb-10">
          {stack.map((s) => <span key={s} className="chip">{s}</span>)}
        </div>
        <div className="glass rounded-2xl p-6 text-sm text-slateink dark:text-kagaz/70">
          ⚠️ This assistant provides AI-generated guidance for informational purposes only. It is not legal advice. Always confirm details on the relevant official government (.gov.in) website before taking action.
        </div>
      </motion.div>
    </div>
  )
}
