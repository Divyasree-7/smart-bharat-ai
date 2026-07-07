import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sba_user')
    return saved ? JSON.parse(saved) : null
  })
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('sba_groq_key') || '')
  const [chatCount, setChatCount] = useState(() => Number(localStorage.getItem('sba_chat_count') || 0))

  useEffect(() => {
    if (user) localStorage.setItem('sba_user', JSON.stringify(user))
    else localStorage.removeItem('sba_user')
  }, [user])

  useEffect(() => {
    localStorage.setItem('sba_groq_key', apiKey)
  }, [apiKey])

  useEffect(() => {
    localStorage.setItem('sba_chat_count', String(chatCount))
  }, [chatCount])

  const login = (profile) => setUser(profile)
  const logout = () => setUser(null)
  const incrementChatCount = () => setChatCount((c) => c + 1)

  return (
    <AuthContext.Provider value={{ user, login, logout, apiKey, setApiKey, chatCount, incrementChatCount }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
