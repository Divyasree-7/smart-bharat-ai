import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AssistantBubble, UserBubble, TypingBubble } from '../components/ChatMessage.jsx'
import { askSmartBharatAI } from '../services/groqService.js'
import { useAuth } from '../context/AuthContext.jsx'
import ChakraWheel from '../components/ChakraWheel.jsx'

const SUGGESTIONS = [
  'How do I apply for a new PAN card?',
  'There is a huge pothole on my street, who do I complain to?',
  'What schemes am I eligible for as a farmer?',
  'My Aadhaar address is outdated, how do I update it?',
]

export default function Chat() {
  const { apiKey, incrementChatCount } = useAuth()
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        '✅ Summary: Namaste! I am Smart Bharat AI, your civic assistant.\n\n📌 Steps to Follow:\n1. Tell me your problem in your own words\n2. I will identify whether it is a service, complaint, scheme, or document question\n3. I will give you a clear, step-by-step plan\n\n🧑 Follow-up: What government service, complaint, or scheme do you need help with today?',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  async function sendMessage(text) {
    const trimmed = text.trim()
    if (!trimmed || loading) return
    setError('')

    if (!apiKey) {
      setError('MISSING_KEY')
      return
    }

    const newMessages = [...messages, { role: 'user', content: trimmed }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    try {
      const reply = await askSmartBharatAI(apiKey, messages, trimmed)
      setMessages((m) => [...m, { role: 'assistant', content: reply }])
      incrementChatCount()
    } catch (e) {
      if (e.message === 'INVALID_KEY') {
        setError('INVALID_KEY')
      } else {
        setMessages((m) => [
          ...m,
          { role: 'assistant', content: '⚠️ Important Tips:\n- Something went wrong reaching the AI service. Please check your internet connection or API key and try again.' },
        ])
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl sm:text-3xl flex items-center gap-3">
          <span className="w-8 h-8 text-marigold"><ChakraWheel spinning={false} /></span>
          Ask the Assistant
        </h1>
        <p className="text-slateink dark:text-kagaz/60 text-sm mt-1">Ask about any service, complaint, scheme or document. Hindi or English both work.</p>
      </div>

      {error === 'MISSING_KEY' && (
        <div className="glass rounded-2xl p-5 mb-4 border-marigold/40">
          <p className="font-semibold mb-1">🔑 Groq API key needed</p>
          <p className="text-sm text-slateink dark:text-kagaz/70 mb-3">
            This assistant runs on Groq's free, fast API. Add your free API key in your profile to start chatting.
          </p>
          <Link to="/profile" className="btn-primary !py-2 !px-4 text-sm">Add API Key</Link>
        </div>
      )}
      {error === 'INVALID_KEY' && (
        <div className="glass rounded-2xl p-5 mb-4 border-red-400/40">
          <p className="font-semibold mb-1">❌ That API key was rejected</p>
          <p className="text-sm text-slateink dark:text-kagaz/70 mb-3">Double-check it on the Groq console and update it in your profile.</p>
          <Link to="/profile" className="btn-secondary !py-2 !px-4 text-sm">Update API Key</Link>
        </div>
      )}

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pb-4 pr-1" style={{ maxHeight: '55vh' }}>
        {messages.map((m, i) =>
          m.role === 'user' ? <UserBubble key={i} text={m.content} /> : <AssistantBubble key={i} text={m.content} />
        )}
        {loading && <TypingBubble />}
      </div>

      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="text-xs sm:text-sm px-4 py-2 rounded-full border border-slateink/15 dark:border-white/15 hover:border-marigold hover:text-marigold transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <motion.form
        onSubmit={(e) => { e.preventDefault(); sendMessage(input) }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-2 flex items-center gap-2 sticky bottom-4"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question... e.g. How do I get a ration card?"
          className="flex-1 bg-transparent px-4 py-3 outline-none placeholder:text-slateink/50 dark:placeholder:text-kagaz/40"
        />
        <button type="submit" disabled={loading || !input.trim()} className="btn-primary !py-2.5 !px-5 disabled:opacity-40 disabled:cursor-not-allowed">
          Send
        </button>
      </motion.form>
    </div>
  )
}
