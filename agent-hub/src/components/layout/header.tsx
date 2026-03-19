'use client'

import { motion } from 'framer-motion'
import { Search, Plus, Bell, User } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  return (
    <motion.header
      className={cn(
        'sticky top-0 z-50 glass-panel border-b border-white/5',
        className
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-110 transition-transform duration-300">
              <svg
                width="24"
                height="24"
                viewBox="0 0 100 125"
                fill="none"
                className="text-white"
              >
                <path
                  d="M50 35C65 35 75 45 78 60C80 75 75 90 65 100C60 105 55 108 50 108C45 108 40 105 35 100C25 90 20 75 22 60C25 45 35 35 50 35Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight text-glow text-white">Agent Hub</span>
          </Link>

          {/* Busca Global */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar agentes..."
                className="w-full pl-11 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500/40 transition-all duration-300"
              />
            </div>
          </div>

          {/* Ações */}
          <div className="flex items-center gap-2">
            <motion.button
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-xl text-sm font-semibold shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-shadow"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-4 h-4" />
              <span>Criar Agente</span>
            </motion.button>

            <motion.button
              className="p-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white border border-transparent hover:border-white/10 transition-all relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-sky-500 rounded-full shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
            </motion.button>

            <motion.button
              className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
