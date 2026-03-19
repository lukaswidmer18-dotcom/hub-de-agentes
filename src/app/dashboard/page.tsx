'use client'

import { motion } from 'framer-motion'
import { AgentGrid, AgentGridSkeleton } from '@/components/avatar'
import { Agent } from '@/types'
import { useState, useEffect } from 'react'
import { Bot, Clock, Zap, TrendingUp } from 'lucide-react'

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
      skin: 'default',
      color: '#1F6FEB',
      animationStyle: 'standard',
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
      skin: 'purple',
      color: '#7C3AED',
      animationStyle: 'expressive',
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
      skin: 'orange',
      color: '#F59E0B',
      animationStyle: 'expressive',
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
      skin: 'green',
      color: '#10B981',
      animationStyle: 'standard',
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
    <div className="p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Dashboard</h1>
        <p className="text-neutral-600">Visão geral dos seus agentes e métricas</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="bg-white rounded-xl p-6 border border-neutral-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-neutral-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                <p className={`text-xs mt-1 ${
                  stat.change.includes('+') ? 'text-success' : 'text-neutral-400'
                }`}>
                  {stat.change}
                </p>
              </div>
              <div className={`p-2 rounded-lg ${
                stat.color === 'primary' ? 'bg-primary/10' :
                stat.color === 'accent' ? 'bg-accent/10' :
                stat.color === 'success' ? 'bg-success/10' :
                'bg-secondary/10'
              }`}>
                <stat.icon className={`w-5 h-5 ${
                  stat.color === 'primary' ? 'text-primary' :
                  stat.color === 'accent' ? 'text-accent-dark' :
                  stat.color === 'success' ? 'text-success' :
                  'text-secondary-dark'
                }`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Agentes Recentes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-neutral-900">Agentes Recentes</h2>
          <a href="/agents" className="text-sm text-primary hover:text-primary-dark">
            Ver todos
          </a>
        </div>

        {isLoading ? (
          <AgentGridSkeleton count={4} />
        ) : (
          <AgentGrid
            agents={agents}
            onAgentClick={(agent) => console.log('Clicked:', agent.name)}
            onAgentFavorite={(agent) => console.log('Favorited:', agent.name)}
            onAgentInstantiate={(agent) => console.log('Instantiated:', agent.name)}
          />
        )}
      </motion.div>
    </div>
  )
}
