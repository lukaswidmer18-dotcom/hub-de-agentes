'use client'

import { motion } from 'framer-motion'
import { AgentGrid, AgentGridSkeleton } from '@/components/avatar'
import { Agent } from '@/types'
import { useState, useEffect } from 'react'
import { Bot, Clock, Zap, TrendingUp, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'

// Dados mockados para demonstração
const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Assistente de Código',
    description: 'Ajuda com revisão de código, depuração e sugestões de otimização',
    category: 'Desenvolvimento',
    tags: ['code', 'review', 'debug'],
    author: 'Equipe Dev',
    isPublic: true,
    isTemplate: false,
    version: '1.0.0',
    createdAt: new Date(),
    updatedAt: new Date(),
    config: {
      prompt: 'Você é um assistente de código experiente...',
      role: 'assistant',
      memory: true,
      variables: {},
      temperature: 0.7,
      maxTokens: 2000,
    },
    metrics: {
      usageCount: 1247,
      avgLatency: 450,
      successRate: 98.5,
    },
    avatar: {
      type: 'image',
      skin: 'blue',
      color: '#3B82F6',
      animationStyle: 'professional',
      characterType: 'ordinary',
      imageUrl: '/avatars/tomodachi/ordinary/1 - Ordinary Male - Neutral - Black.png'
    },
  },
  {
    id: '2',
    name: 'Analisador de Dados',
    description: 'Processa e analisa conjuntos de dados, gera insights e visualizações',
    category: 'Dados',
    tags: ['data', 'analytics', 'python'],
    author: 'Equipe de Dados',
    isPublic: true,
    isTemplate: true,
    version: '1.2.0',
    createdAt: new Date(),
    updatedAt: new Date(),
    config: {
      prompt: 'Você é um analista de dados especializado...',
      role: 'analyst',
      memory: true,
      variables: {},
      temperature: 0.5,
      maxTokens: 4000,
    },
    metrics: {
      usageCount: 892,
      avgLatency: 620,
      successRate: 96.2,
    },
    avatar: {
      type: 'image',
      skin: 'purple',
      color: '#8B5CF6',
      animationStyle: 'precise',
      characterType: 'ordinary',
      imageUrl: '/avatars/tomodachi/ordinary/2 - Ordinary Female - Happy - White.png'
    },
  },
  {
    id: '3',
    name: 'Copywriter IA',
    description: 'Cria copy para marketing, emails e redes sociais',
    category: 'Marketing',
    tags: ['copy', 'marketing', 'creative'],
    author: 'Marketing',
    isPublic: true,
    isTemplate: false,
    version: '1.0.5',
    createdAt: new Date(),
    updatedAt: new Date(),
    config: {
      prompt: 'Você é um copywriter criativo...',
      role: 'writer',
      memory: false,
      variables: { tone: 'professional' },
      temperature: 0.8,
      maxTokens: 1500,
    },
    metrics: {
      usageCount: 2156,
      avgLatency: 380,
      successRate: 99.1,
    },
    avatar: {
      type: 'image',
      skin: 'yellow',
      color: '#F59E0B',
      animationStyle: 'expressive',
      characterType: 'ordinary',
      imageUrl: '/avatars/tomodachi/ordinary/3 - Ordinary Male - Happy - Black.png'
    },
  },
  {
    id: '4',
    name: 'Suporte Técnico',
    description: 'Responde dúvidas técnicas e guia a resolução de problemas',
    category: 'Suporte',
    tags: ['support', 'helpdesk', 'troubleshoot'],
    author: 'Equipe de Suporte',
    isPublic: false,
    isTemplate: true,
    version: '2.0.0',
    createdAt: new Date(),
    updatedAt: new Date(),
    config: {
      prompt: 'Você é um técnico de suporte...',
      role: 'support',
      memory: true,
      variables: {},
      temperature: 0.3,
      maxTokens: 1000,
    },
    metrics: {
      usageCount: 3421,
      avgLatency: 290,
      successRate: 97.8,
    },
    avatar: {
      type: 'image',
      skin: 'green',
      color: '#10B981',
      animationStyle: 'steady',
      characterType: 'ordinary',
      imageUrl: '/avatars/tomodachi/ordinary/4 - Ordinary Female - Neutral - White.png'
    },
  },
]

const statsCards = [
  { label: 'Agentes Ativos', value: '12', icon: Bot, change: '+2 este mês', color: 'primary' },
  { label: 'Crédito Restante', value: '8.5k', icon: Zap, change: 'Renova em 15 dias', color: 'accent' },
  { label: 'Latência Média', value: '420ms', icon: Clock, change: '-12% vs mês passado', color: 'success' },
  { label: 'Taxa de Sucesso', value: '98.2%', icon: TrendingUp, change: '+1.5% vs mês passado', color: 'secondary' },
]

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [agents] = useState<Agent[]>(mockAgents)

  useEffect(() => {
    // Simula carregamento
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="p-6 lg:p-10 min-h-screen bg-bg-main">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12"
      >
        <h1 className="text-4xl font-black gradient-heading mb-3 tracking-tight">Painel de Controle</h1>
        <p className="text-slate-400 font-medium">Sua infraestrutura de inteligência em tempo real</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statsCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="glass-card p-6 group cursor-default"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="text-3xl font-black text-white text-glow mb-2">{stat.value}</p>
                <div className="flex items-center gap-1.5">
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full animate-pulse",
                    stat.change.includes('+') || stat.change.includes('98') ? 'bg-sky-400 shadow-[0_0_8px_rgba(14,165,233,0.8)]' : 'bg-slate-600'
                  )} />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {stat.change}
                  </p>
                </div>
              </div>
              <div className={cn(
                "p-3 rounded-xl transition-all duration-300 group-hover:scale-110",
                stat.color === 'primary' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' :
                stat.color === 'accent' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                stat.color === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
              )}>
                <stat.icon className="w-5 h-5 shadow-sm" />
              </div>
            </div>
            
            {/* Efeito de brilho no hover */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-sky-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Agentes Recentes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white tracking-tight">Agentes Recentes</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
              {agents.length} AGENTES
            </span>
          </div>
          <Link 
            href="/agents" 
            className={cn(
              buttonVariants({ variant: "link" }),
              "text-sky-400 hover:text-sky-300 gap-2 p-0 h-auto"
            )}
          >
            Ver catálogo completo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <AgentGridSkeleton count={4} />
        ) : (
          <div className="relative">
            <AgentGrid
              agents={agents}
              onAgentClick={(agent) => console.log('Clicked:', agent.name)}
              onAgentFavorite={(agent) => console.log('Favorited:', agent.name)}
              onAgentInstantiate={(agent) => console.log('Instantiated:', agent.name)}
            />
          </div>
        )}
      </motion.div>
    </div>
  )
}
