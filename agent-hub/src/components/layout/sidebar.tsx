'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
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
  { name: 'Início', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Meus Agentes', href: '/agents', icon: Bot },
  { name: 'Conversar', href: '/workspace', icon: MessageSquare },
  { name: 'Modelos', href: '/templates', icon: FileText },
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
        'w-64 h-screen sticky top-0 border-r border-white/5 bg-slate-950/40 backdrop-blur-2xl',
        className
      )}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col h-full py-6">
        {/* Seção Principal */}
        <nav className="flex-1 px-4 space-y-1">
          <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">
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
                  buttonVariants({ 
                    variant: isActive ? "glass" : "ghost",
                    size: "default" 
                  }),
                  'w-full justify-start gap-3 h-12',
                  isActive ? 'text-sky-400 border-sky-500/20' : 'text-slate-400'
                )}
              >
                <Icon className={cn('w-5 h-5 transition-transform duration-300 group-hover:scale-110', isActive ? 'text-sky-400' : 'text-slate-500 group-hover:text-slate-300')} />
                {item.name}
              </Link>
            )
          })}

          {/* Seção Pessoal */}
          <div className="mt-8">
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">
              Pessoal
            </p>
            <Link
              href="/favorites"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-full justify-start gap-3 text-slate-400 h-12"
              )}
            >
              <Star className="w-5 h-5 text-slate-500 group-hover:text-slate-300 transition-transform group-hover:scale-110" />
              Favoritos
            </Link>
            <Link
              href="/collections"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-full justify-start gap-3 text-slate-400 h-12"
              )}
            >
              <FolderOpen className="w-5 h-5 text-slate-500 group-hover:text-slate-300 transition-transform group-hover:scale-110" />
              Coleções
            </Link>
          </div>
        </nav>

        {/* Seção Secundária */}
        <nav className="px-4 pt-4 border-t border-white/5 space-y-1">
          {secondaryNavItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group',
                  isActive
                    ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/5'
                )}
              >
                <Icon className={cn('w-5 h-5 transition-transform duration-300 group-hover:scale-110', isActive ? 'text-sky-400' : 'text-slate-500 group-hover:text-slate-300')} />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </motion.aside>
  )
}
