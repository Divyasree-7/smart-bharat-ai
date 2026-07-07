import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { askSmartBharatAI } from '../services/groqService.js'
import { useAuth } from '../context/AuthContext.jsx'
import { AssistantBubble, TypingBubble } from '../components/ChatMessage.jsx'
import ChakraWheel from '../components/ChakraWheel.jsx'

const OCCUPATIONS = ['Student', 'Farmer', 'Daily wage worker', 'Small business owner', 'Salaried employee', 'Unemployed', 'Senior citizen', 'Other']

export default function Schemes() {
  const { apiKey, incrementChatCount } = useAuth()
  const [form, setForm] = useState({ age: '', occupation: 'Student', income: '', state: 'Karnataka', gender: 'Prefer not to say', need: '' })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!apiKey) { setError('MISSING_KEY'); return }
    setError('')
    setLoading(true)
    setResult('')
    const prompt = `I want scheme recommendations. My details: Age ${form.age || 'not specified'}, Occupation: ${form.occupation}, Approximate annual family income: ${form.income || 'not specified'} INR, State: ${form.state}, Gender: ${form.gender}. Specific need or goal: ${form.need || 'general welfare schemes I may be eligible for'}. Please suggest relevant central or state government schemes and explain eligibility simply, following your standard response format.`
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
        <span className="w-8 h-8 text-banyan"><ChakraWheel spinning={false} /></span>
        Scheme Finder
      </h1>
      <p className="text-slateink dark:text-kagaz/60 mb-8 max-w-xl">Tell us a little about yourself and we'll suggest government schemes you may actually be eligible for.</p>

      {error === 'MISSING_KEY' && (
        <div className="glass rounded-2xl p-5 mb-6">
          <p className="font-semibold mb-2">🔑 Add your Groq API key first</p>
          <Link to="/profile" className="btn-primary !py-2 !px-4 text-sm">Go to Profile</Link>
        </div>
      )}

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8 grid sm:grid-cols-2 gap-5 mb-8"
      >
        <div>
          <label className="text-sm font-semibold block mb-1.5">Age</label>
          <input type="number" min="0" value={form.age} onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
            className="w-full rounded-xl border border-slateink/15 dark:border-white/15 bg-transparent px-4 py-3 outline-none focus:border-marigold" placeholder="e.g. 21" />
        </div>
        <div>
          <label className="text-sm font-semibold block mb-1.5">Occupation</label>
          <select value={form.occupation} onChange={(e) => setForm((f) => ({ ...f, occupation: e.target.value }))}
            className="w-full rounded-xl border border-slateink/15 dark:border-white/15 bg-transparent px-4 py-3 outline-none focus:border-marigold">
            {OCCUPATIONS.map((o) => <option key={o} value={o} className="text-raat">{o}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold block mb-1.5">Approx. annual family income (₹)</label>
          <input value={form.income} onChange={(e) => setForm((f) => ({ ...f, income: e.target.value }))}
            className="w-full rounded-xl border border-slateink/15 dark:border-white/15 bg-transparent px-4 py-3 outline-none focus:border-marigold" placeholder="e.g. 200000" />
        </div>
        <div>
          <label className="text-sm font-semibold block mb-1.5">State</label>
          <input value={form.state} onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
            className="w-full rounded-xl border border-slateink/15 dark:border-white/15 bg-transparent px-4 py-3 outline-none focus:border-marigold" />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold block mb-1.5">What are you hoping to get help with?</label>
          <textarea value={form.need} onChange={(e) => setForm((f) => ({ ...f, need: e.target.value }))} rows={3}
            className="w-full rounded-xl border border-slateink/15 dark:border-white/15 bg-transparent px-4 py-3 outline-none focus:border-marigold" placeholder="e.g. scholarship for engineering studies, housing subsidy, farming loan..." />
        </div>
        <div className="sm:col-span-2">
          <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto disabled:opacity-50">
            {loading ? 'Finding schemes…' : 'Find my schemes'}
          </button>
        </div>
      </motion.form>

      {loading && <TypingBubble />}
      {result && <AssistantBubble text={result} />}
    </div>
  )
}
