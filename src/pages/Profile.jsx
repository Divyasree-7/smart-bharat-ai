import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import ChakraWheel from '../components/ChakraWheel.jsx'

export default function Profile() {
  const { user, logout, apiKey, setApiKey, chatCount } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [keyInput, setKeyInput] = useState(apiKey)
  const [saved, setSaved] = useState(false)
  const [reveal, setReveal] = useState(false)

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <p className="mb-6 text-slateink dark:text-kagaz/70">You're not signed in yet.</p>
        <Link to="/login" className="btn-primary">Go to Login</Link>
      </div>
    )
  }

  function saveKey(e) {
    e.preventDefault()
    setApiKey(keyInput.trim())
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-8 flex items-center gap-5 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-28 h-28 text-banyan/10">
          <ChakraWheel />
        </div>
        <div className="w-16 h-16 rounded-full bg-banyan text-white grid place-items-center text-2xl font-bold shrink-0">
          {user.name[0]?.toUpperCase()}
        </div>
        <div className="relative">
          <h1 className="font-display font-bold text-2xl">{user.name}</h1>
          <p className="text-sm text-slateink dark:text-kagaz/60">{user.email || 'No email added'} · {user.state}</p>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass rounded-2xl p-6">
          <p className="text-xs font-mono uppercase tracking-wider text-slateink dark:text-kagaz/50 mb-2">Conversations</p>
          <p className="font-display font-bold text-3xl">{chatCount}</p>
          <p className="text-sm text-slateink dark:text-kagaz/60 mt-1">messages answered by the assistant</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6">
          <p className="text-xs font-mono uppercase tracking-wider text-slateink dark:text-kagaz/50 mb-2">Appearance</p>
          <button onClick={toggleTheme} className="btn-secondary !py-2 !px-4 text-sm">
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} mode
          </button>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass rounded-2xl p-8">
        <h2 className="font-display font-bold text-lg mb-1">Groq API Key</h2>
        <p className="text-sm text-slateink dark:text-kagaz/60 mb-5">
          Smart Bharat AI uses your own free Groq API key so the assistant can respond. It's stored only in this browser (localStorage) — never sent anywhere except directly to Groq.
        </p>
        <form onSubmit={saveKey} className="flex flex-col sm:flex-row gap-3">
          <input
            type={reveal ? 'text' : 'password'}
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="gsk_..."
            className="flex-1 rounded-xl border border-slateink/15 dark:border-white/15 bg-transparent px-4 py-3 outline-none focus:border-marigold font-mono text-sm"
          />
          <div className="flex gap-2">
            <button type="button" onClick={() => setReveal((r) => !r)} className="btn-secondary !py-2.5 !px-4 text-sm">
              {reveal ? 'Hide' : 'Show'}
            </button>
            <button type="submit" className="btn-primary !py-2.5 !px-5 text-sm">Save</button>
          </div>
        </form>
        {saved && <p className="text-banyan text-sm mt-3">✅ Saved! Head to Ask Assistant to try it.</p>}
        <p className="text-xs text-slateink/70 dark:text-kagaz/40 mt-4">
          Don't have a key? Get one free at{' '}
          <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" className="text-marigold underline">console.groq.com/keys</a>.
        </p>
      </motion.div>

      <div className="flex justify-end">
        <button onClick={() => { logout(); navigate('/') }} className="btn-secondary !py-2.5 !px-5 text-sm">Log out</button>
      </div>
    </div>
  )
}
