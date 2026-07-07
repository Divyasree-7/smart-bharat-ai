import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import ChakraWheel from './ChakraWheel.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/chat', label: 'Ask Assistant' },
  { to: '/schemes', label: 'Schemes' },
  { to: '/complaint', label: 'Complaints' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50">
      <nav className="glass-solid border-b border-slateink/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg" onClick={() => setOpen(false)}>
            <span className="w-8 h-8 text-marigold"><ChakraWheel spinning={false} /></span>
            <span>Smart Bharat <span className="gradient-text">AI</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-marigold bg-marigold/10'
                      : 'text-raat/70 dark:text-kagaz/70 hover:text-marigold hover:bg-marigold/5'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="w-10 h-10 rounded-full grid place-items-center border border-slateink/15 dark:border-white/15 hover:border-marigold transition-colors"
            >
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.35 }}
                className="text-lg"
              >
                {theme === 'dark' ? '🌙' : '☀️'}
              </motion.span>
            </button>

            {user ? (
              <button onClick={() => navigate('/profile')} className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full bg-banyan/10 hover:bg-banyan/20 transition-colors">
                <span className="w-7 h-7 rounded-full bg-banyan text-white grid place-items-center text-xs font-bold">
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </span>
                <span className="text-sm font-semibold text-banyan dark:text-banyan-light">{user.name?.split(' ')[0]}</span>
              </button>
            ) : (
              <Link to="/login" className="btn-primary !px-5 !py-2.5 text-sm">Login</Link>
            )}
          </div>

          <button className="md:hidden w-10 h-10 grid place-items-center" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            <div className="w-6 flex flex-col gap-1.5">
              <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} className="h-0.5 bg-current block" />
              <motion.span animate={{ opacity: open ? 0 : 1 }} className="h-0.5 bg-current block" />
              <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} className="h-0.5 bg-current block" />
            </div>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-slateink/10 dark:border-white/10"
            >
              <div className="px-4 py-3 flex flex-col gap-1">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-lg text-sm font-semibold ${isActive ? 'text-marigold bg-marigold/10' : ''}`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
                <div className="flex items-center justify-between px-4 pt-2">
                  <button onClick={toggleTheme} className="btn-secondary !px-4 !py-2 text-sm">
                    {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
                  </button>
                  {user ? (
                    <button onClick={() => { logout(); setOpen(false); navigate('/') }} className="btn-secondary !px-4 !py-2 text-sm">Logout</button>
                  ) : (
                    <Link to="/login" onClick={() => setOpen(false)} className="btn-primary !px-4 !py-2 text-sm">Login</Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
