'use client'

import { motion } from 'framer-motion'
import { AgentGrid, AgentGridSkeleton } from '@/components/avatar'
import { Agent } from '@/types'
import { useState, useEffect } from 'react'
import { Search, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

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
      type: 'image',
      skin: 'orange',
      color: '#F59E0B',
      animationStyle: 'expressive',
      characterType: 'ordinary',
      imageUrl: '/avatars/tomodachi/ordinary/3 - Ordinary Female - Happy - White.png'
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
      type: 'image',
      skin: 'blue',
      color: '#3B82F6',
      animationStyle: 'professional',
      characterType: 'ordinary',
      imageUrl: '/avatars/tomodachi/ordinary/5 - Ordinary Male - Neutral - Black.png'
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
      type: 'image',
      skin: 'green',
      color: '#10B981',
      animationStyle: 'expressive',
      characterType: 'ordinary',
      imageUrl: '/avatars/tomodachi/ordinary/3 - Ordinary Male - Neutral - Black.png'
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
      type: 'image',
      skin: 'purple',
      color: '#7C3AED',
      animationStyle: 'precise',
      characterType: 'ordinary',
      imageUrl: '/avatars/tomodachi/ordinary/1 - Ordinary Female - Neutral - White.png'
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
    <div className="p-6 lg:p-10 min-h-screen bg-bg-main relative overflow-hidden">
      {/* Background Glow Sutil */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 relative z-10"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-2xl border" style={{ background: 'rgba(255,192,0,0.1)', color: '#FFC000', borderColor: 'rgba(255,192,0,0.25)' }}>
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-black gradient-heading tracking-tight">Galeria de Templates</h1>
        </div>
        <p className="text-slate-400 font-medium tracking-wide max-w-2xl">
          Acelere sua produtividade com arquiteturas neurais pré-configuradas para missões específicas.
        </p>
      </motion.div>

      {/* Filtros e Busca - Glass */}
      <motion.div
        className="flex flex-col xl:flex-row gap-6 mb-12 items-start xl:items-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* Busca Premium */}
        <div className="relative flex-1 w-full max-w-xl group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400/15 to-yellow-500/10 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#BFBFBF] group-focus-within:text-yellow-400 transition-colors" />
            <input
              type="text"
              placeholder="Buscar modelos por categoria ou funcionalidade..."
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
                  ? "bg-yellow-400/15 text-yellow-400 border-yellow-400/30 shadow-yellow-400/10"
                  : "bg-white/5 text-slate-500 border-white/5"
              )}
            >
              {category}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Grid de Templates - Cinematic */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10"
      >
        {isLoading ? (
          <AgentGridSkeleton count={4} />
        ) : filteredTemplates.length > 0 ? (
          <AgentGrid
            agents={filteredTemplates}
            onAgentClick={(t) => console.log('Selecionou template:', t.name)}
          />
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32 glass-panel border border-dashed border-white/10 rounded-[2rem]"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Nenhum Template Identificado</h3>
            <p className="text-slate-500 font-medium">Refine seus filtros para encontrar a arquitetura ideal.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
