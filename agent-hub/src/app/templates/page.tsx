'use client'

import { motion } from 'framer-motion'
import { AgentGrid, AgentGridSkeleton } from '@/components/avatar'
import { Agent } from '@/types'
import { useState, useEffect } from 'react'
import { Search, Sparkles } from 'lucide-react'

// Dados mockados de templates traduzidos
const mockTemplates: Agent[] = [
  {
    id: 't1',
    name: 'Assistente de Escrita Criativa',
    description: 'Um modelo otimizado para gerar contos, poesias e roteiros.',
    category: 'Criatividade',
    tags: ['escrita', 'criativo', 'literatura'],
    author: 'Equipe Editorial',
    isPublic: true,
    isTemplate: true,
    version: '1.0.0',
    createdAt: new Date(),
    updatedAt: new Date(),
    config: {
      prompt: 'Você é um escritor premiado...',
      role: 'writer',
      memory: true,
      variables: {},
      temperature: 0.9,
      maxTokens: 3000,
    },
    metrics: {
      usageCount: 450,
      avgLatency: 500,
      successRate: 97.5,
    },
    avatar: {
      skin: 'orange',
      color: '#F59E0B',
      animationStyle: 'expressive',
    },
  },
  {
    id: 't2',
    name: 'Analista de SEO',
    description: 'Expert em otimização de conteúdo para mecanismos de busca.',
    category: 'Marketing',
    tags: ['seo', 'marketing', 'web'],
    author: 'Equipe de Crescimento',
    isPublic: true,
    isTemplate: true,
    version: '1.1.0',
    createdAt: new Date(),
    updatedAt: new Date(),
    config: {
      prompt: 'Você é um especialista em SEO...',
      role: 'seo',
      memory: false,
      variables: {},
      temperature: 0.4,
      maxTokens: 2000,
    },
    metrics: {
      usageCount: 890,
      avgLatency: 420,
      successRate: 98.2,
    },
    avatar: {
      skin: 'blue',
      color: '#3B82F6',
      animationStyle: 'standard',
    },
  },
  {
    id: 't3',
    name: 'Mentor de Programação',
    description: 'Lógica ríguida e explicações didáticas para iniciantes.',
    category: 'Educação',
    tags: ['coding', 'mentoria', 'didático'],
    author: 'EduTech',
    isPublic: true,
    isTemplate: true,
    version: '2.0.1',
    createdAt: new Date(),
    updatedAt: new Date(),
    config: {
      prompt: 'Você é um mentor paciente...',
      role: 'mentor',
      memory: true,
      variables: {},
      temperature: 0.5,
      maxTokens: 4000,
    },
    metrics: {
      usageCount: 1200,
      avgLatency: 600,
      successRate: 99.5,
    },
    avatar: {
      skin: 'green',
      color: '#10B981',
      animationStyle: 'expressive',
    },
  },
  {
    id: 't4',
    name: 'Assistente Jurídico',
    description: 'Auxilia na revisão de contratos e termos de uso.',
    category: 'Jurídico',
    tags: ['legal', 'contratos', 'revisão'],
    author: 'LegalTech',
    isPublic: true,
    isTemplate: true,
    version: '1.0.5',
    createdAt: new Date(),
    updatedAt: new Date(),
    config: {
      prompt: 'Você é um assistente jurídico especializado...',
      role: 'legal',
      memory: true,
      variables: {},
      temperature: 0.2,
      maxTokens: 5000,
    },
    metrics: {
      usageCount: 320,
      avgLatency: 800,
      successRate: 96.8,
    },
    avatar: {
      skin: 'purple',
      color: '#7C3AED',
      animationStyle: 'minimal',
    },
  },
]

const categories = ['Todos', 'Criatividade', 'Marketing', 'Educação', 'Jurídico', 'Produtividade']

export default function TemplatesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [templates] = useState<Agent[]>(mockTemplates)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  const filteredTemplates = templates.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || t.category === selectedCategory
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
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900">Modelos de Agentes</h1>
        </div>
        <p className="text-neutral-600">Comece rapidamente com configurações pré-definidas para diferentes necessidades</p>
      </motion.div>

      {/* Filtros */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Buscar modelos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          />
        </div>

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
      </motion.div>

      {/* Grid de Templates */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {isLoading ? (
          <AgentGridSkeleton count={4} />
        ) : filteredTemplates.length > 0 ? (
          <AgentGrid
            agents={filteredTemplates}
            onAgentClick={(t) => console.log('Selecionou template:', t.name)}
          />
        ) : (
          <div className="text-center py-20">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Nenhum modelo encontrado</h3>
            <p className="text-neutral-600">Tente ajustar seus termos de busca ou filtros</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
