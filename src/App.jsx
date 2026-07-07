import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Chat from './pages/Chat.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import About from './pages/About.jsx'
import Schemes from './pages/Schemes.jsx'
import Complaint from './pages/Complaint.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
