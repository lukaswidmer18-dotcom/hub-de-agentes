'use client'

import { motion } from 'framer-motion'
import { AgentCard } from './agent-card'
import { Agent } from '@/types'
import { cn } from '@/lib/utils'

interface AgentGridProps {
  agents: Agent[]
  onAgentClick?: (agent: Agent) => void
  onAgentFavorite?: (agent: Agent) => void
  onAgentInstantiate?: (agent: Agent) => void
  className?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
}

export function AgentGrid({
  agents,
  onAgentClick,
  onAgentFavorite,
  onAgentInstantiate,
  className,
}: AgentGridProps) {
  return (
    <motion.div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {agents.map((agent, index) => (
        <AgentCard
          key={agent.id}
          agent={agent}
          index={index}
          onClick={() => onAgentClick?.(agent)}
          onFavorite={() => onAgentFavorite?.(agent)}
          onInstantiate={() => onAgentInstantiate?.(agent)}
        />
      ))}
    </motion.div>
  )
}

// Componente de skeleton para loading
export function AgentGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <AgentCardSkeleton key={i} />
      ))}
    </div>
  )
}

function AgentCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden animate-pulse">
      {/* Área do Avatar */}
      <div className="h-40 bg-neutral-200 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-neutral-300" />
      </div>

      {/* Conteúdo */}
      <div className="p-4 space-y-3">
        <div className="h-5 bg-neutral-200 rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-neutral-200 rounded" />
          <div className="h-4 bg-neutral-200 rounded w-5/6" />
        </div>
        <div className="flex gap-2">
          <div className="h-5 bg-neutral-200 rounded-full w-16" />
          <div className="h-5 bg-neutral-200 rounded-full w-14" />
        </div>
        <div className="pt-3 border-t border-neutral-100 flex justify-between">
          <div className="h-4 bg-neutral-200 rounded w-20" />
          <div className="h-8 bg-neutral-200 rounded-full w-8" />
        </div>
      </div>
    </div>
  )
}
