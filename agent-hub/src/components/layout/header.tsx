'use client'

import { motion } from 'framer-motion'
import { Search, Plus, Bell, User } from 'lucide-react'
import Link from 'next/link'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  return (
    <motion.header
      className={className}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(26, 40, 33, 0.80)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 192, 0, 0.1)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
              style={{
                background: 'linear-gradient(135deg, #FFC000, #F6D52A)',
                boxShadow: '0 4px 16px rgba(255, 192, 0, 0.3)',
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 100 125"
                fill="none"
                className="text-[#243F38]"
              >
                <path
                  d="M50 35C65 35 75 45 78 60C80 75 75 90 65 100C60 105 55 108 50 108C45 108 40 105 35 100C25 90 20 75 22 60C25 45 35 35 50 35Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span 
              className="font-black text-xl tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F6D52A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >Agent Hub</span>
          </Link>

          {/* Busca Global */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#BFBFBF' }} />
              <input
                type="text"
                placeholder="Buscar agentes..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl text-sm text-white placeholder:text-[#BFBFBF]/60 focus:outline-none transition-all duration-300"
                style={{
                  background: 'rgba(255, 192, 0, 0.06)',
                  border: '1px solid rgba(255, 192, 0, 0.12)',
                }}
                onFocus={(e) => {
                  e.target.style.border = '1px solid rgba(255, 192, 0, 0.35)'
                  e.target.style.background = 'rgba(255, 192, 0, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.border = '1px solid rgba(255, 192, 0, 0.12)'
                  e.target.style.background = 'rgba(255, 192, 0, 0.06)'
                }}
              />
            </div>
          </div>

          {/* Ações */}
          <div className="flex items-center gap-2">
            <motion.button
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-extrabold transition-all"
              style={{
                background: 'linear-gradient(135deg, #FFC000, #F6D52A)',
                color: '#243F38',
                boxShadow: '0 4px 16px rgba(255, 192, 0, 0.3)',
              }}
              whileHover={{ scale: 1.02, y: -1, boxShadow: '0 6px 24px rgba(255, 192, 0, 0.5)' }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-4 h-4" />
              <span>Criar Agente</span>
            </motion.button>

            <motion.button
              className="p-2.5 rounded-xl transition-all relative"
              style={{
                background: 'rgba(255, 192, 0, 0.06)',
                border: '1px solid rgba(255, 192, 0, 0.1)',
                color: '#BFBFBF',
              }}
              whileHover={{ scale: 1.05, background: 'rgba(255, 192, 0, 0.12)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5" />
              <span 
                className="absolute top-2 right-2 w-2 h-2 rounded-full"
                style={{ 
                  background: '#FFC000',
                  boxShadow: '0 0 8px rgba(255, 192, 0, 0.8)'
                }}
              />
            </motion.button>

            <motion.button
              className="p-2 rounded-full transition-all"
              style={{
                background: 'rgba(255, 192, 0, 0.06)',
                border: '1px solid rgba(255, 192, 0, 0.1)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #243F38, #2e5048)' }}
              >
                <User className="w-4 h-4 text-[#FFC000]" />
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
