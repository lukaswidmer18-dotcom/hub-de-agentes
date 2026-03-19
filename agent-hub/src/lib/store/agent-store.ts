import { create } from 'zustand'
import { Agent, User, Team } from '@/types'

interface AgentState {
  // Dados
  agents: Agent[]
  selectedAgent: Agent | null
  user: User | null
  team: Team | null

  // UI State
  isLoading: boolean
  error: string | null
  searchQuery: string
  selectedCategory: string
  favorites: string[]

  // Ações
  setAgents: (agents: Agent[]) => void
  setSelectedAgent: (agent: Agent | null) => void
  setUser: (user: User | null) => void
  setTeam: (team: Team | null) => void
  setIsLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string) => void
  toggleFavorite: (agentId: string) => void
  addAgent: (agent: Agent) => void
  updateAgent: (id: string, updates: Partial<Agent>) => void
  removeAgent: (id: string) => void
}

export const useAgentStore = create<AgentState>((set) => ({
  // Estado inicial
  agents: [],
  selectedAgent: null,
  user: null,
  team: null,
  isLoading: false,
  error: null,
  searchQuery: '',
  selectedCategory: 'Todos',
  favorites: [],

  // Ações
  setAgents: (agents) => set({ agents }),

  setSelectedAgent: (agent) => set({ selectedAgent: agent }),

  setUser: (user) => set({ user }),

  setTeam: (team) => set({ team }),

  setIsLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  setSearchQuery: (searchQuery) => set({ searchQuery }),

  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),

  toggleFavorite: (agentId) => set((state) => ({
    favorites: state.favorites.includes(agentId)
      ? state.favorites.filter((id) => id !== agentId)
      : [...state.favorites, agentId],
  })),

  addAgent: (agent) => set((state) => ({
    agents: [agent, ...state.agents],
  })),

  updateAgent: (id, updates) => set((state) => ({
    agents: state.agents.map((agent) =>
      agent.id === id ? { ...agent, ...updates } : agent
    ),
  })),

  removeAgent: (id) => set((state) => ({
    agents: state.agents.filter((agent) => agent.id !== id),
  })),
}))
