import React from 'react'
import ReactMarkdown from 'react-markdown'
import { motion } from 'framer-motion'
import ChakraWheel from './ChakraWheel.jsx'

export function UserBubble({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex justify-end"
    >
      <div className="max-w-[85%] sm:max-w-[70%] bg-banyan text-white rounded-2xl rounded-tr-sm px-5 py-3 shadow-md">
        <p className="whitespace-pre-wrap text-sm sm:text-base">{text}</p>
      </div>
    </motion.div>
  )
}

export function AssistantBubble({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex justify-start"
    >
      <div className="max-w-[92%] sm:max-w-[80%] glass rounded-2xl rounded-tl-sm px-5 py-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-5 h-5 text-marigold shrink-0"><ChakraWheel spinning={false} /></span>
          <span className="text-xs font-mono uppercase tracking-wider text-marigold">Smart Bharat AI</span>
        </div>
        <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none prose-headings:font-display prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      </div>
    </motion.div>
  )
}

export function TypingBubble() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
      <div className="glass rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-2">
        <span className="w-5 h-5 text-marigold animate-spinslow"><ChakraWheel /></span>
        <span className="text-sm text-slateink dark:text-kagaz/60">Thinking through the process…</span>
      </div>
    </motion.div>
  )
}
