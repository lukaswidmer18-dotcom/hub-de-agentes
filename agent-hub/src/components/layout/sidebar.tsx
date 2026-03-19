'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Bot,
  MessageSquare,
  FileText,
  BarChart3,
  Plug,
  Settings,
  HelpCircle,
  Star,
  FolderOpen,
  Building2,
} from 'lucide-react'

const mainNavItems = [
  { name: 'Início', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Meus Agentes', href: '/agents', icon: Bot },
  { name: 'Conversar', href: '/workspace', icon: MessageSquare },
  { name: 'Modelos', href: '/templates', icon: FileText },
  { name: 'Escritório', href: '/office', icon: Building2 },
  { name: 'Relatórios', href: '/analytics', icon: BarChart3 },
  { name: 'Integrações', href: '/integrations', icon: Plug },
]

const secondaryNavItems = [
  { name: 'Configurações', href: '/settings', icon: Settings },
  { name: 'Ajuda', href: '/help', icon: HelpCircle },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <motion.aside
      className={cn(
        'w-64 h-screen sticky top-0 border-r flex-shrink-0',
        className
      )}
      style={{
        background: 'rgba(26, 40, 33, 0.85)',
        backdropFilter: 'blur(24px)',
        borderColor: 'rgba(255, 192, 0, 0.1)',
      }}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col h-full py-6">
        {/* Seção Principal */}
        <nav className="flex-1 px-4 space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: 'rgba(191,191,191,0.5)' }}>
            Principal
          </p>
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 group w-full',
                  isActive
                    ? 'font-bold'
                    : 'hover:bg-yellow-400/8'
                )}
                style={isActive ? {
                  background: 'rgba(255, 192, 0, 0.12)',
                  border: '1px solid rgba(255, 192, 0, 0.25)',
                  color: '#FFC000',
                } : {
                  border: '1px solid transparent',
                  color: '#BFBFBF',
                }}
              >
                <Icon 
                  className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
                  style={{ color: isActive ? '#FFC000' : '#BFBFBF' }}
                />
                {item.name}
              </Link>
            )
          })}

          {/* Seção Pessoal */}
          <div className="mt-8">
            <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: 'rgba(191,191,191,0.5)' }}>
              Pessoal
            </p>
            {[
              { name: 'Favoritos', href: '/favorites', icon: Star },
              { name: 'Coleções', href: '/collections', icon: FolderOpen },
            ].map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 group w-full"
                style={{ 
                  border: '1px solid transparent',
                  color: '#BFBFBF',
                }}
              >
                <Icon className="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110" style={{ color: '#BFBFBF' }} />
                {name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Seção Secundária */}
        <nav className="px-4 pt-4 space-y-1" style={{ borderTop: '1px solid rgba(255,192,0,0.08)' }}>
          {secondaryNavItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group"
                style={isActive ? {
                  background: 'rgba(255, 192, 0, 0.12)',
                  color: '#FFC000',
                  border: '1px solid rgba(255, 192, 0, 0.2)',
                } : {
                  color: '#BFBFBF',
                  border: '1px solid transparent',
                }}
              >
                <Icon 
                  className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: isActive ? '#FFC000' : '#BFBFBF' }}
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </motion.aside>
  )
}
