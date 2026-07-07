import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ChakraWheel from '../components/ChakraWheel.jsx'

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-32 text-center">
      <motion.div
        className="w-24 h-24 mx-auto mb-8 text-marigold/60"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        <ChakraWheel spinning={false} />
      </motion.div>
      <h1 className="font-display font-bold text-3xl mb-3">This page took a wrong turn</h1>
      <p className="text-slateink dark:text-kagaz/60 mb-8">Just like a misrouted government form, this page doesn't exist. Let's get you back on track.</p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  )
}
