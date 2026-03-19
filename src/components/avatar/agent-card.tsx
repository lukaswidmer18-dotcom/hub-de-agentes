'use client'

import { motion } from 'framer-motion'
import { AgentAvatar } from './agent-avatar'
import { Agent } from '@/types'
import { cn } from '@/lib/utils'
import { Star, MoreVertical, Play } from 'lucide-react'

interface AgentCardProps {
  agent: Agent
  index?: number
  onClick?: () => void
  onFavorite?: () => void
  onInstantiate?: () => void
  className?: string
}

export function AgentCard({
  agent,
  index = 0,
  onClick,
  onFavorite,
  onInstantiate,
  className,
}: AgentCardProps) {
  // Stagger delay baseado no index
  const staggerDelay = index * 0.06

  return (
    <motion.div
      layoutId={`agent-card-${agent.id}`}
      className={cn(
        'group relative bg-white rounded-2xl border border-neutral-200 overflow-hidden',
        'hover:shadow-xl hover:border-primary/30 transition-shadow cursor-pointer',
        className
      )}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.36,
        delay: staggerDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={onClick}
      whileHover={{ y: -4 }}
    >
      {/* Badge de template */}
      {agent.isTemplate && (
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2 py-1 text-xs font-medium bg-accent text-neutral-900 rounded-full">
            Template
          </span>
        </div>
      )}

      {/* Botão de favoritar */}
      <motion.button
        className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation()
          onFavorite?.()
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Star className="w-4 h-4 text-neutral-400 hover:text-accent fill-transparent hover:fill-accent transition-colors" />
      </motion.button>

      {/* Área do Avatar */}
      <div className="relative h-40 bg-gradient-to-b from-neutral-100 to-white flex items-center justify-center overflow-hidden">
        <motion.div
          className="relative z-10"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <AgentAvatar
            size="md"
            skin={getSkinFromColor(agent.avatar.color)}
            isAnimated
            isInteractive
            state="idle"
          />
        </motion.div>

        {/* Gradiente de fundo sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-neutral-900 truncate">
            {agent.name}
          </h3>
        </div>

        <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
          {agent.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {agent.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs bg-neutral-100 text-neutral-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer com métricas e ação */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <span>{agent.metrics.usageCount} usos</span>
            <span className="w-1 h-1 rounded-full bg-neutral-300" />
            <span>{agent.metrics.avgLatency}ms</span>
          </div>

          <motion.button
            className="p-2 rounded-full bg-primary text-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation()
              onInstantiate?.()
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// Função auxiliar para mapear cores para skins
function getSkinFromColor(color: string): 'default' | 'blue' | 'purple' | 'green' | 'orange' {
  const colorMap: Record<string, 'default' | 'blue' | 'purple' | 'green' | 'orange'> = {
    '#1F6FEB': 'blue',
    '#7C3AED': 'purple',
    '#10B981': 'green',
    '#F59E0B': 'orange',
  }
  return colorMap[color] || 'default'
}
