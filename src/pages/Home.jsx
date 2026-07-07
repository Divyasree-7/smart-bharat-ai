import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ChakraWheel from '../components/ChakraWheel.jsx'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' } }),
}

const categories = [
  { icon: '🪪', title: 'Identity & Documents', desc: 'Aadhaar, PAN, Voter ID, Passport — step by step.' },
  { icon: '📢', title: 'Civic Complaints', desc: 'Roads, water, electricity — routed to the right department.' },
  { icon: '🎯', title: 'Schemes & Benefits', desc: 'Find schemes you actually qualify for, explained simply.' },
  { icon: '📄', title: 'Document Help', desc: 'Know why a document is needed and how to get it.' },
]

const steps = [
  { n: '01', title: 'Tell us what you need', desc: 'Type your question in plain Hindi or English — no forms, no jargon.' },
  { n: '02', title: 'Get a clear action plan', desc: 'A numbered checklist, documents list, and common mistakes to avoid.' },
  { n: '03', title: 'Follow official links', desc: 'We point you to the right government portal to actually complete it.' },
]

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative pt-16 pb-24 sm:pt-24 sm:pb-32 overflow-hidden bg-chakra-glow">
        <div className="absolute -right-24 -top-24 w-[420px] h-[420px] text-marigold/10 dark:text-marigold/[0.08] pointer-events-none">
          <ChakraWheel />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0} className="chip mb-6 inline-block">
            🇮🇳 Built for Digital India · Hackathon Edition
          </motion.div>
          <motion.h1
            initial="hidden" animate="show" variants={fadeUp} custom={1}
            className="font-display font-bold text-4xl sm:text-6xl leading-[1.05] max-w-3xl"
          >
            Government services, <span className="gradient-text">explained like a friend</span> would.
          </motion.h1>
          <motion.p
            initial="hidden" animate="show" variants={fadeUp} custom={2}
            className="mt-6 text-lg text-slateink dark:text-kagaz/70 max-w-xl"
          >
            Smart Bharat AI turns confusing government processes — Aadhaar updates, ration cards, civic complaints, welfare schemes — into simple, step-by-step guidance anyone can follow.
          </motion.p>
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={3} className="mt-10 flex flex-wrap gap-4">
            <Link to="/chat" className="btn-primary">
              Ask the Assistant <span aria-hidden>→</span>
            </Link>
            <Link to="/schemes" className="btn-secondary">Find a Scheme</Link>
          </motion.div>
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={4} className="mt-14 flex flex-wrap gap-8 text-sm">
            <div><span className="font-display font-bold text-2xl">100+</span><p className="text-slateink dark:text-kagaz/60">Services covered</p></div>
            <div><span className="font-display font-bold text-2xl">24×7</span><p className="text-slateink dark:text-kagaz/60">Always available</p></div>
            <div><span className="font-display font-bold text-2xl">2</span><p className="text-slateink dark:text-kagaz/60">Languages: Hindi + English</p></div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display font-bold text-2xl sm:text-3xl mb-2">What can I help you with?</h2>
        <p className="text-slateink dark:text-kagaz/60 mb-10 max-w-xl">Pick a category, or just describe your problem on the Ask Assistant page.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl p-6 cursor-default"
            >
              <div className="text-3xl mb-4">{c.icon}</div>
              <h3 className="font-display font-semibold mb-2">{c.title}</h3>
              <p className="text-sm text-slateink dark:text-kagaz/60">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl mb-8">How it works</h2>
            <div className="space-y-8">
              {steps.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex gap-5"
                >
                  <span className="font-mono text-marigold font-bold text-lg shrink-0">{s.n}</span>
                  <div>
                    <h3 className="font-display font-semibold mb-1">{s.title}</h3>
                    <p className="text-sm text-slateink dark:text-kagaz/60">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8 relative"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 text-marigold"><ChakraWheel spinning={false} /></span>
              <span className="text-xs font-mono uppercase tracking-wider text-marigold">Sample answer</span>
            </div>
            <p className="font-semibold mb-3">✅ Summary: You want to apply for a new PAN card online.</p>
            <p className="font-semibold mb-1">📌 Steps to Follow:</p>
            <ol className="list-decimal list-inside text-sm text-slateink dark:text-kagaz/70 space-y-1 mb-3">
              <li>Go to the NSDL/UTIITSL PAN portal</li>
              <li>Select "New PAN – Indian Citizen (Form 49A)"</li>
              <li>Fill details and upload Aadhaar-linked documents</li>
              <li>Pay the fee and e-sign with Aadhaar OTP</li>
            </ol>
            <p className="font-semibold mb-1">📄 Required Documents:</p>
            <p className="text-sm text-slateink dark:text-kagaz/70">Aadhaar card, passport-size photo, signature scan</p>
            <motion.div className="absolute -bottom-4 -right-4 w-16 h-16 text-banyan/30" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
              <ChakraWheel spinning={false} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="glass rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-chakra-glow pointer-events-none" />
          <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4 relative">Confused about a government process?</h2>
          <p className="text-slateink dark:text-kagaz/70 mb-8 max-w-lg mx-auto relative">Ask in your own words. Get a clear, honest, step-by-step answer — in seconds.</p>
          <Link to="/chat" className="btn-primary relative">Start Chatting <span aria-hidden>→</span></Link>
        </div>
      </section>
    </div>
  )
}
