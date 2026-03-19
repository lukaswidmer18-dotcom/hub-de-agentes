'use client'

import { motion } from 'framer-motion'
import { AgentGrid, AgentGridSkeleton } from '@/components/avatar'
import { Agent } from '@/types'
import { useState, useEffect } from 'react'
import { Search, Filter, Grid, List } from 'lucide-react'

// Dados mockados expandidos
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
  {
    id: '5',
    name: 'Tradutor Multilíngue',
    description: 'Tradução precisa entre múltiplos idiomas com contexto cultural',
    category: 'Produtividade',
    tags: ['translation', 'language', 'i18n'],
    author: 'Global Team',
    isPublic: true,
    isTemplate: false,
    version: '1.1.0',
    createdAt: new Date(),
    updatedAt: new Date(),
    config: {
      prompt: 'Você é um tradutor profissional...',
      role: 'translator',
      memory: false,
      variables: { targetLang: 'en' },
      temperature: 0.4,
      maxTokens: 2000,
    },
    metrics: {
      usageCount: 567,
      avgLatency: 520,
      successRate: 95.5,
    },
    avatar: {
      skin: 'blue',
      color: '#3B82F6',
      animationStyle: 'minimal',
    },
  },
  {
    id: '6',
    name: 'Assistente de Reuniões',
    description: 'Resume reuniões, extrai action items e gera atas',
    category: 'Produtividade',
    tags: ['meetings', 'summary', 'productivity'],
    author: 'Ops Team',
    isPublic: true,
    isTemplate: true,
    version: '1.3.0',
    createdAt: new Date(),
    updatedAt: new Date(),
    config: {
      prompt: 'Você é um assistente executivo...',
      role: 'assistant',
      memory: true,
      variables: {},
      temperature: 0.6,
      maxTokens: 3000,
    },
    metrics: {
      usageCount: 1823,
      avgLatency: 410,
      successRate: 98.8,
    },
    avatar: {
      skin: 'purple',
      color: '#8B5CF6',
      animationStyle: 'standard',
    },
  },
]

const categories = ['Todos', 'Desenvolvimento', 'Dados', 'Marketing', 'Suporte', 'Produtividade']

export default function AgentsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [agents] = useState<Agent[]>(mockAgents)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || agent.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Agentes</h1>
        <p className="text-neutral-600">Explore e gerencie seus agentes de IA</p>
      </motion.div>

      {/* Filtros */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {/* Busca */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Buscar agentes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          />
        </div>

        {/* Categorias */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 border border-neutral-200 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid' ? 'bg-primary/10 text-primary' : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list' ? 'bg-primary/10 text-primary' : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Grid de Agentes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {isLoading ? (
          <AgentGridSkeleton count={8} />
        ) : filteredAgents.length > 0 ? (
          <AgentGrid
            agents={filteredAgents}
            onAgentClick={(agent) => console.log('Clicked:', agent.name)}
            onAgentFavorite={(agent) => console.log('Favorited:', agent.name)}
            onAgentInstantiate={(agent) => console.log('Instantiated:', agent.name)}
          />
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
              <Search className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Nenhum agente encontrado</h3>
            <p className="text-neutral-600">Tente ajustar sua busca ou filtros</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
