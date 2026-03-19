'use client'

import { motion } from 'framer-motion'
import { AgentGrid, AgentGridSkeleton } from '@/components/avatar'
import { Agent } from '@/types'
import { useState, useEffect } from 'react'
import { Search, Filter, Grid, List } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

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
      type: 'image',
      skin: 'blue',
      color: '#1F6FEB',
      animationStyle: 'standard',
      characterType: 'general'
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
      color: '#D946EF',
      animationStyle: 'refined',
      characterType: 'ordinary',
      imageUrl: '/avatars/tomodachi/ordinary/1 - Ordinary Female - Neutral - White.png'
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
      skin: 'custom',
      color: '#F59E0B',
      animationStyle: 'expressive',
      characterType: 'ordinary',
      imageUrl: '/avatars/tomodachi/ordinary/1 - Ordinary Female - Happy - Black.png'
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
      type: 'image',
      skin: 'blue',
      color: '#3B82F6',
      animationStyle: 'professional',
      characterType: 'ordinary',
      imageUrl: '/avatars/tomodachi/ordinary/1 - Ordinary Male - Neutral - Black.png'
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
      type: 'image',
      skin: 'purple',
      color: '#8B5CF6',
      animationStyle: 'precise',
      characterType: 'ordinary',
      imageUrl: '/avatars/tomodachi/ordinary/2 - Ordinary Female - Happy - White.png'
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
    <div className="p-6 lg:p-10 min-h-screen bg-bg-main">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12"
      >
        <h1 className="text-4xl font-black gradient-heading mb-3 tracking-tight">Catálogo de Agentes</h1>
        <p className="text-slate-400 font-medium tracking-wide">Explore a biblioteca neural de inteligência avançada</p>
      </motion.div>

      {/* Filtros e Busca - Glass */}
      <motion.div
        className="flex flex-col xl:flex-row gap-6 mb-12 items-start xl:items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* Busca Premium */}
        <div className="relative flex-1 w-full max-w-xl group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-sky-400 transition-colors" />
            <input
              type="text"
              placeholder="Buscar por nome, função ou tecnologia..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-white/20 focus:bg-white/[0.08] transition-all"
            />
          </div>
        </div>

        {/* Categorias - Estilo Pílula Premium */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 xl:pb-0 no-scrollbar max-w-full">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "glass" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-5 py-2.5 rounded-xl uppercase tracking-widest transition-all duration-300 border h-auto",
                selectedCategory === category
                  ? "bg-sky-500/20 text-sky-400 border-sky-500/30 shadow-sky-500/10"
                  : "bg-white/5 text-slate-500 border-white/5"
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* View Toggle - Minimalista */}
        <div className="flex items-center gap-1.5 glass-panel p-1.5 border border-white/5 rounded-2xl ml-auto">
          <Button
            variant={viewMode === 'grid' ? "glass" : "ghost"}
            size="icon"
            onClick={() => setViewMode('grid')}
            className={cn(
              "h-10 w-10 transition-all",
              viewMode === 'grid' ? "text-white" : "text-slate-600"
            )}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? "glass" : "ghost"}
            size="icon"
            onClick={() => setViewMode('list')}
            className={cn(
              "h-10 w-10 transition-all",
              viewMode === 'list' ? "text-white" : "text-slate-600"
            )}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {/* Grid de Agentes - Cinematic */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
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
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32 glass-panel border border-dashed border-white/10 rounded-[2rem]"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center">
              <Search className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Vazio Dimensional</h3>
            <p className="text-slate-500 font-medium">Nenhum agente detectado com estes parâmetros.</p>
            <Button 
              variant="link"
              onClick={() => { setSearchQuery(''); setSelectedCategory('Todos'); }}
              className="mt-8 text-sky-400 hover:text-sky-300"
            >
              Resetar Filtros Neuronais
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
