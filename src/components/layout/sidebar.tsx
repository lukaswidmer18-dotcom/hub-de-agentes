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
} from 'lucide-react'

const mainNavItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Agentes', href: '/agents', icon: Bot },
  { name: 'Workspace', href: '/workspace', icon: MessageSquare },
  { name: 'Templates', href: '/templates', icon: FileText },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
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
        'w-64 h-screen sticky top-0 border-r border-neutral-200 bg-white',
        className
      )}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col h-full py-6">
        {/* Seção Principal */}
        <nav className="flex-1 px-4 space-y-1">
          <p className="px-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
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
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                )}
              >
                <Icon className={cn('w-5 h-5', isActive ? 'text-primary' : 'text-neutral-400')} />
                {item.name}
              </Link>
            )
          })}

          {/* Seção Pessoal */}
          <div className="mt-8">
            <p className="px-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
              Pessoal
            </p>
            <Link
              href="/favorites"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
            >
              <Star className="w-5 h-5 text-neutral-400" />
              Favoritos
            </Link>
            <Link
              href="/collections"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
            >
              <FolderOpen className="w-5 h-5 text-neutral-400" />
              Coleções
            </Link>
          </div>
        </nav>

        {/* Seção Secundária */}
        <nav className="px-4 pt-4 border-t border-neutral-200 space-y-1">
          {secondaryNavItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                )}
              >
                <Icon className={cn('w-5 h-5', isActive ? 'text-primary' : 'text-neutral-400')} />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </motion.aside>
  )
}
