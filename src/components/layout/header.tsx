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
        'sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200',
        className
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <svg
                width="20"
                height="20"
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
            <span className="font-semibold text-lg text-neutral-900">Agent Hub</span>
          </Link>

          {/* Busca Global */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Buscar agentes..."
                className="w-full pl-10 pr-4 py-2 bg-neutral-100 border border-transparent rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
              />
            </div>
          </div>

          {/* Ações */}
          <div className="flex items-center gap-2">
            <motion.button
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-4 h-4" />
              <span>Criar Agente</span>
            </motion.button>

            <motion.button
              className="p-2 rounded-full hover:bg-neutral-100 transition-colors relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5 text-neutral-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
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
