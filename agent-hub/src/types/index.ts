// Tipos principais do Agent Hub

export interface Agent {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  author: string
  isPublic: boolean
  isTemplate: boolean
  version: string
  createdAt: Date
  updatedAt: Date
  config: AgentConfig
  metrics: AgentMetrics
  avatar: AgentAvatar
}

export interface AgentConfig {
  prompt: string
  role: string
  memory: boolean
  variables: Record<string, string>
  temperature: number
  maxTokens: number
}

export interface AgentMetrics {
  usageCount: number
  avgLatency: number
  successRate: number
  lastUsedAt?: Date
}

export interface AgentAvatar {
  type?: 'vector' | 'image'
  skin: string
  color: string
  animationStyle: 'minimal' | 'standard' | 'expressive' | 'professional' | 'precise' | 'steady' | 'refined' | 'dynamic'
  imageUrl?: string
  characterType?: 'general' | 'ordinary'
  customAssets?: string[]
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'editor' | 'viewer'
  teamId: string
  preferences: UserPreferences
}

export interface UserPreferences {
  reduceMotion: boolean
  theme: 'light' | 'dark' | 'system'
  language: string
}

export interface Team {
  id: string
  name: string
  plan: 'free' | 'pro' | 'enterprise'
  quota: TeamQuota
  members: User[]
}

export interface TeamQuota {
  maxAgents: number
  maxTokens: number
  usedTokens: number
  billingCycle: Date
}

export interface Conversation {
  id: string
  agentId: string
  userId: string
  messages: Message[]
  context?: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  metadata?: Record<string, unknown>
}

export interface Template {
  id: string
  name: string
  description: string
  category: string
  agent: Partial<Agent>
  popularity: number
}
