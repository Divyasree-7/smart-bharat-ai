import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext.jsx'
import ChakraWheel from '../components/ChakraWheel.jsx'

const STATES = ['Karnataka', 'Maharashtra', 'Delhi', 'Tamil Nadu', 'Uttar Pradesh', 'West Bengal', 'Telangana', 'Gujarat', 'Rajasthan', 'Other']

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', state: 'Karnataka' })
  const [errors, setErrors] = useState({})

  function handleSubmit(e) {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please enter your name'
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email or leave it blank'
    setErrors(errs)
    if (Object.keys(errs).length) return
    login({ name: form.name.trim(), email: form.email.trim(), state: form.state, joinedAt: new Date().toISOString() })
    navigate('/profile')
  }

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="glass rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 text-marigold/10 animate-floaty">
          <ChakraWheel />
        </div>
        <h1 className="font-display font-bold text-2xl mb-1 relative">Welcome, Citizen 🙏</h1>
        <p className="text-sm text-slateink dark:text-kagaz/60 mb-8 relative">
          Sign in to save your chat history and personalize scheme recommendations. This demo login stays on your device — no server, no password needed.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 relative">
          <div>
            <label className="text-sm font-semibold block mb-1.5">Full name</label>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Tae"
              className="w-full rounded-xl border border-slateink/15 dark:border-white/15 bg-transparent px-4 py-3 outline-none focus:border-marigold"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="text-sm font-semibold block mb-1.5">Email <span className="text-slateink/50 font-normal">(optional)</span></label>
            <input
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slateink/15 dark:border-white/15 bg-transparent px-4 py-3 outline-none focus:border-marigold"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="text-sm font-semibold block mb-1.5">State</label>
            <select
              value={form.state}
              onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
              className="w-full rounded-xl border border-slateink/15 dark:border-white/15 bg-transparent px-4 py-3 outline-none focus:border-marigold"
            >
              {STATES.map((s) => <option key={s} value={s} className="text-raat">{s}</option>)}
            </select>
          </div>
          <button type="submit" className="btn-primary w-full">Continue</button>
        </form>
      </motion.div>
    </div>
  )
}
