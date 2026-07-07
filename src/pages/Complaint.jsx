import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { askSmartBharatAI } from '../services/groqService.js'
import { useAuth } from '../context/AuthContext.jsx'
import { AssistantBubble, TypingBubble } from '../components/ChatMessage.jsx'
import ChakraWheel from '../components/ChakraWheel.jsx'

const CATEGORIES = ['Roads & Potholes', 'Water Supply', 'Electricity', 'Garbage & Sanitation', 'Streetlights', 'Public Transport', 'Noise / Pollution', 'Other']

export default function Complaint() {
  const { apiKey, incrementChatCount } = useAuth()
  const [form, setForm] = useState({ category: 'Roads & Potholes', location: '', description: '' })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!apiKey) { setError('MISSING_KEY'); return }
    if (!form.description.trim()) { setError('MISSING_DESC'); return }
    setError('')
    setLoading(true)
    setResult('')
    const prompt = `I want to file a civic complaint. Category: ${form.category}. Location: ${form.location || 'not specified'}. Description of the issue: ${form.description}. Please identify the right department, give me the steps to file this complaint, and generate a ready-to-use complaint message I can copy and submit, following your standard response format.`
    try {
      const reply = await askSmartBharatAI(apiKey, [], prompt)
      setResult(reply)
      incrementChatCount()
    } catch (err) {
      setError(err.message === 'INVALID_KEY' ? 'INVALID_KEY' : 'GENERIC')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="font-display font-bold text-2xl sm:text-3xl flex items-center gap-3 mb-2">
        <span className="w-8 h-8 text-marigold"><ChakraWheel spinning={false} /></span>
        File a Complaint
      </h1>
      <p className="text-slateink dark:text-kagaz/60 mb-8 max-w-xl">Describe the civic issue and we'll identify the right department and draft a ready-to-submit complaint for you.</p>

      {error === 'MISSING_KEY' && (
        <div className="glass rounded-2xl p-5 mb-6">
          <p className="font-semibold mb-2">🔑 Add your Groq API key first</p>
          <Link to="/profile" className="btn-primary !py-2 !px-4 text-sm">Go to Profile</Link>
        </div>
      )}
      {error === 'MISSING_DESC' && (
        <div className="glass rounded-2xl p-5 mb-6 text-sm">Please describe the issue before submitting.</div>
      )}

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8 grid gap-5 mb-8"
      >
        <div>
          <label className="text-sm font-semibold block mb-1.5">Category</label>
          <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            className="w-full rounded-xl border border-slateink/15 dark:border-white/15 bg-transparent px-4 py-3 outline-none focus:border-marigold">
            {CATEGORIES.map((c) => <option key={c} value={c} className="text-raat">{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold block mb-1.5">Location / Landmark</label>
          <input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
            className="w-full rounded-xl border border-slateink/15 dark:border-white/15 bg-transparent px-4 py-3 outline-none focus:border-marigold" placeholder="e.g. Near WhiteField, Bengaluru" />
        </div>
        <div>
          <label className="text-sm font-semibold block mb-1.5">Describe the issue</label>
          <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={4}
            className="w-full rounded-xl border border-slateink/15 dark:border-white/15 bg-transparent px-4 py-3 outline-none focus:border-marigold" placeholder="e.g. There has been no water supply in our area for 3 days..." />
        </div>
        <div>
          <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto disabled:opacity-50">
            {loading ? 'Drafting complaint…' : 'Generate complaint'}
          </button>
        </div>
      </motion.form>

      {loading && <TypingBubble />}
      {result && <AssistantBubble text={result} />}
    </div>
  )
}
