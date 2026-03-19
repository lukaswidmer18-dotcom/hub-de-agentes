'use client'

import { motion } from 'framer-motion'
import { AgentAvatar } from './agent-avatar'
import { Agent } from '@/types'
import { cn } from '@/lib/utils'
import { Star, MoreVertical, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
        'group relative glass-card p-0 overflow-hidden',
        'transition-all duration-500 cursor-pointer',
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
      whileHover={{ y: -8 }}
    >
      {/* Badge de template - Premium */}
      {agent.isTemplate && (
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg backdrop-blur-md"
            style={{ background: 'rgba(255,192,0,0.12)', color: '#FFC000', border: '1px solid rgba(255,192,0,0.3)' }}>
            Template
          </span>
        </div>
      )}

      <Button
        variant="glass"
        size="icon"
        className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300"
        onClick={(e) => {
          e.stopPropagation()
          onFavorite?.()
        }}
      >
        <Star className="w-4 h-4 transition-colors" style={{ color: '#BFBFBF' }} />
      </Button>

      {/* Área do Avatar - Deep Background */}
      <div className="relative h-44 flex items-center justify-center overflow-hidden" style={{ background: 'rgba(26,40,33,0.6)' }}>
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,192,0,0.08), transparent 70%)' }} />
        <motion.div
          className="relative z-10"
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.5 }}
        >
          <AgentAvatar
            size="lg"
            type={agent.avatar.type}
            skin={agent.avatar.skin}
            imageUrl={agent.avatar.imageUrl}
            characterType={agent.avatar.characterType}
            isAnimated
            isInteractive
            state="idle"
          />
        </motion.div>

        {/* Círculo de luz orbital */}
        <div className="absolute w-32 h-32 blur-[60px] rounded-full transition-all duration-700" style={{ background: 'rgba(255,192,0,0.08)' }} />
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-bold text-white text-lg tracking-tight group-hover:text-glow transition-all">
            {agent.name}
          </h3>
        </div>

        <p className="text-sm line-clamp-2 mb-5 leading-relaxed font-medium" style={{ color: '#BFBFBF' }}>
          {agent.description}
        </p>

        {/* Tags - Minimalistas */}
        <div className="flex flex-wrap gap-2 mb-6">
          {agent.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider transition-colors"
              style={{ background: 'rgba(255,192,0,0.06)', color: '#BFBFBF', border: '1px solid rgba(255,192,0,0.1)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer com métricas e ação */}
        <div className="flex items-center justify-between pt-5" style={{ borderTop: '1px solid rgba(255,192,0,0.08)' }}>
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#BFBFBF' }}>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(255,192,0,0.5)' }} />
              {agent.metrics.usageCount} USOS
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
              {agent.metrics.avgLatency}MS
            </div>
          </div>

          <Button
            variant="default"
            size="icon"
            className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 shadow-sky-500/20"
            onClick={(e) => {
              e.stopPropagation()
              onInstantiate?.()
            }}
          >
            <Play className="w-4 h-4 fill-current" />
          </Button>
        </div>
      </div>
      
      {/* Laser Border Effect on hover */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none transition-colors duration-500" style={{ border: '1px solid rgba(255,192,0,0.06)' }} />
    </motion.div>
  )
}

