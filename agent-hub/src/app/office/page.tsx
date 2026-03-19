'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { AgentAvatar } from '@/components/avatar'
import { Agent, OfficeMission, OfficeDesk, AgentOfficeStatus } from '@/types'
import { cn } from '@/lib/utils'
import {
  Plus, X, Briefcase, Users, Clock, CheckCircle2,
  Pause, Trash2, Play, Target, ChevronLeft, LayoutDashboard,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// ─── Dados ─────────────────────────────────────────────────────────────────────

const ROWS = 3
const COLS = 5

const initialDesks: OfficeDesk[] = Array.from({ length: ROWS * COLS }, (_, i) => ({
  id: `desk-${i}`,
  row: Math.floor(i / COLS),
  col: i % COLS,
  label: `${String.fromCharCode(65 + Math.floor(i / COLS))}${(i % COLS) + 1}`,
  agentId: null,
  missionId: null,
}))

const mockAgents: Agent[] = [
  {
    id: '1', name: 'Assistente de Código', description: 'Revisão, depuração e otimização',
    category: 'Desenvolvimento', tags: ['code', 'review'], author: 'Dev',
    isPublic: true, isTemplate: false, version: '1.0.0',
    createdAt: new Date(), updatedAt: new Date(),
    config: { prompt: '', role: 'assistant', memory: true, variables: {}, temperature: 0.7, maxTokens: 2000 },
    metrics: { usageCount: 1247, avgLatency: 450, successRate: 98.5 },
    avatar: { type: 'image', skin: 'blue', color: '#1F6FEB', animationStyle: 'professional', characterType: 'ordinary', imageUrl: '/avatars/tomodachi/ordinary/1 - Ordinary Male - Neutral - Black.png' },
    officeStatus: 'available',
  },
  {
    id: '2', name: 'Analisadora de Dados', description: 'Processa e analisa conjuntos de dados',
    category: 'Dados', tags: ['data', 'analytics'], author: 'Data',
    isPublic: true, isTemplate: false, version: '2.1.0',
    createdAt: new Date(), updatedAt: new Date(),
    config: { prompt: '', role: 'assistant', memory: false, variables: {}, temperature: 0.3, maxTokens: 4000 },
    metrics: { usageCount: 892, avgLatency: 620, successRate: 95.2 },
    avatar: { type: 'image', skin: 'green', color: '#10B981', animationStyle: 'precise', characterType: 'ordinary', imageUrl: '/avatars/tomodachi/ordinary/2 - Ordinary Female - Neutral - White.png' },
    officeStatus: 'available',
  },
  {
    id: '3', name: 'Copywriter IA', description: 'Cria copy para marketing e emails',
    category: 'Marketing', tags: ['copy', 'marketing'], author: 'Marketing',
    isPublic: true, isTemplate: true, version: '1.2.0',
    createdAt: new Date(), updatedAt: new Date(),
    config: { prompt: '', role: 'assistant', memory: true, variables: {}, temperature: 0.9, maxTokens: 3000 },
    metrics: { usageCount: 2156, avgLatency: 380, successRate: 96.8 },
    avatar: { type: 'image', skin: 'orange', color: '#F59E0B', animationStyle: 'expressive', characterType: 'ordinary', imageUrl: '/avatars/tomodachi/ordinary/3 - Ordinary Female - Happy - White.png' },
    officeStatus: 'busy',
  },
  {
    id: '4', name: 'Suporte Técnico', description: 'Resolve dúvidas e guia resolução',
    category: 'Suporte', tags: ['support', 'helpdesk'], author: 'Suporte',
    isPublic: true, isTemplate: true, version: '1.0.0',
    createdAt: new Date(), updatedAt: new Date(),
    config: { prompt: '', role: 'assistant', memory: true, variables: {}, temperature: 0.5, maxTokens: 2000 },
    metrics: { usageCount: 3421, avgLatency: 290, successRate: 99.1 },
    avatar: { type: 'image', skin: 'purple', color: '#7C3AED', animationStyle: 'steady', characterType: 'ordinary', imageUrl: '/avatars/tomodachi/ordinary/4 - Ordinary Male - Happy - White.png' },
    officeStatus: 'on-mission',
  },
  {
    id: '5', name: 'Pesquisador Web', description: 'Navega e extrai informações da internet',
    category: 'Pesquisa', tags: ['search', 'web'], author: 'Research',
    isPublic: true, isTemplate: false, version: '1.5.0',
    createdAt: new Date(), updatedAt: new Date(),
    config: { prompt: '', role: 'assistant', memory: false, variables: {}, temperature: 0.6, maxTokens: 5000 },
    metrics: { usageCount: 678, avgLatency: 800, successRate: 92.3 },
    avatar: { type: 'image', skin: 'red', color: '#EF4444', animationStyle: 'dynamic', characterType: 'ordinary', imageUrl: '/avatars/tomodachi/ordinary/5 - Ordinary Male - Neutral - Black.png' },
    officeStatus: 'available',
  },
  {
    id: '6', name: 'Mentor de Programação', description: 'Ensina programação de forma didática',
    category: 'Educação', tags: ['coding', 'mentoria'], author: 'Edu',
    isPublic: true, isTemplate: true, version: '1.1.0',
    createdAt: new Date(), updatedAt: new Date(),
    config: { prompt: '', role: 'assistant', memory: true, variables: {}, temperature: 0.7, maxTokens: 3000 },
    metrics: { usageCount: 1200, avgLatency: 600, successRate: 99.5 },
    avatar: { type: 'image', skin: 'blue', color: '#3B82F6', animationStyle: 'professional', characterType: 'ordinary', imageUrl: '/avatars/tomodachi/ordinary/1 - Ordinary Female - Happy - Black.png' },
    officeStatus: 'available',
  },
]

const initialMissions: OfficeMission[] = [
  { id: 'm1', title: 'Campanha de Marketing Q1', description: 'Criar conteúdo completo para o primeiro trimestre', status: 'active', priority: 'high', assignedDeskIds: [], createdAt: new Date(), progress: 35 },
  { id: 'm2', title: 'Análise de Performance', description: 'Revisar métricas e gerar relatório executivo', status: 'draft', priority: 'medium', assignedDeskIds: [], createdAt: new Date(), progress: 0 },
]

// ─── Helpers ───────────────────────────────────────────────────────────────────

const statusCfg: Record<AgentOfficeStatus, { label: string; color: string; glow: string; bg: string }> = {
  available:    { label: 'Disponível', color: '#22c55e', glow: 'rgba(34,197,94,0.5)',   bg: 'rgba(34,197,94,0.12)' },
  busy:         { label: 'Ocupado',    color: '#FFC000', glow: 'rgba(255,192,0,0.5)',   bg: 'rgba(255,192,0,0.12)' },
  'on-mission': { label: 'Em Missão', color: '#ef4444',  glow: 'rgba(239,68,68,0.5)',   bg: 'rgba(239,68,68,0.12)' },
}

const priorityCfg: Record<string, { label: string; color: string }> = {
  low:      { label: 'Baixa',   color: '#6b7280' },
  medium:   { label: 'Média',   color: '#FFC000' },
  high:     { label: 'Alta',    color: '#f97316' },
  critical: { label: 'Crítica', color: '#ef4444' },
}

// ─── Desk SVG — vista de cima (isométrica flat) ───────────────────────────────

function OfficeDesk3D({ occupied, isOver }: { occupied: boolean; isOver: boolean }) {
  // Cores da mesa
  const deskSurface = occupied ? '#2a4a3e' : '#1e3530'
  const deskEdge    = occupied ? '#1a3028' : '#152820'
  const monitorBody = '#1a1a1a'
  const monitorScreen = occupied ? '#1a3a5c' : '#111'
  const chairSeat  = '#243F38'
  const chairBack  = '#1a2e26'

  return (
    <svg width="120" height="110" viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* ── Cadeira (atrás da mesa) ── */}
      {/* Encosto */}
      <rect x="38" y="4" width="44" height="16" rx="5" fill={chairBack}
        stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      {/* Assento */}
      <rect x="34" y="18" width="52" height="20" rx="6" fill={chairSeat}
        stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      {/* Pernas da cadeira */}
      <rect x="36" y="36" width="5" height="8" rx="2" fill="#182820" />
      <rect x="79" y="36" width="5" height="8" rx="2" fill="#182820" />

      {/* ── Superfície da mesa ── */}
      {/* Sombra */}
      <rect x="8" y="50" width="104" height="55" rx="6" fill="rgba(0,0,0,0.3)" />
      {/* Mesa principal */}
      <rect x="6" y="44" width="108" height="54" rx="6" fill={deskSurface}
        stroke={isOver ? '#FFC000' : 'rgba(255,255,255,0.08)'}
        strokeWidth={isOver ? 2 : 1} />
      {/* Borda frontal (espessura) */}
      <rect x="6" y="91" width="108" height="7" rx="3" fill={deskEdge} />

      {/* ── Monitor ── */}
      {/* Base do monitor */}
      <rect x="52" y="82" width="16" height="4" rx="2" fill="#111" />
      <rect x="57" y="78" width="6" height="6" rx="1" fill="#111" />
      {/* Corpo do monitor */}
      <rect x="30" y="50" width="60" height="32" rx="4" fill={monitorBody} />
      {/* Tela */}
      <rect x="33" y="53" width="54" height="26" rx="3"
        fill={monitorScreen}
        stroke={occupied ? 'rgba(14,165,233,0.3)' : 'rgba(255,255,255,0.04)'}
        strokeWidth="1" />
      {/* Brilho da tela */}
      {occupied && (
        <>
          <rect x="35" y="55" width="20" height="2" rx="1" fill="rgba(255,255,255,0.08)" />
          <rect x="35" y="59" width="30" height="1.5" rx="1" fill="rgba(255,255,255,0.05)" />
          <rect x="35" y="62" width="25" height="1.5" rx="1" fill="rgba(255,255,255,0.05)" />
          <rect x="35" y="65" width="35" height="1.5" rx="1" fill="rgba(255,255,255,0.05)" />
          {/* Cursor piscando */}
          <rect x="35" y="55" width="2" height="8" rx="0.5" fill="rgba(14,165,233,0.7)" />
        </>
      )}

      {/* ── Objetos na mesa (apenas se ocupada) ── */}
      {occupied ? (
        <>
          {/* Copo de café */}
          <ellipse cx="18" cy="72" rx="5" ry="5" fill="#8B4513" opacity="0.8" />
          <rect x="13" y="67" width="10" height="10" rx="2" fill="#6B3410" opacity="0.6" />
          {/* Post-it */}
          <rect x="96" y="53" width="12" height="12" rx="1" fill="#FFC000" opacity="0.6" />
          <rect x="98" y="56" width="8" height="1.5" rx="1" fill="rgba(0,0,0,0.3)" />
          <rect x="98" y="59" width="6" height="1.5" rx="1" fill="rgba(0,0,0,0.3)" />
        </>
      ) : (
        /* Ícone de mesa vazia */
        <>
          <circle cx="60" cy="78" r="8" fill="none"
            stroke={isOver ? '#FFC000' : 'rgba(255,255,255,0.1)'}
            strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M57 78 L63 78 M60 75 L60 81"
            stroke={isOver ? '#FFC000' : 'rgba(255,255,255,0.15)'}
            strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}

      {/* Highlight superior da mesa (brilho) */}
      <rect x="8" y="44" width="104" height="2" rx="1" fill="rgba(255,255,255,0.05)" />
    </svg>
  )
}

// ─── Componente Desk Slot ──────────────────────────────────────────────────────

function DeskSlot({
  desk, agent, isOver, missionId,
  onDragOver, onDrop, onDragLeave, onRemove,
}: {
  desk: OfficeDesk
  agent?: Agent | null
  isOver: boolean
  missionId: string | null
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  onDragLeave: () => void
  onRemove: () => void
}) {
  const sc = agent ? statusCfg[agent.officeStatus ?? 'available'] : null

  return (
    <div className="relative flex flex-col items-center">
      {/* Label */}
      <span className="text-[10px] font-black mb-1 tracking-wider"
        style={{ color: isOver ? '#FFC000' : 'rgba(191,191,191,0.3)' }}>
        {desk.label}
      </span>

      {/* Área da mesa (drop target) */}
      <div
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragLeave={onDragLeave}
        className="relative cursor-pointer group transition-transform duration-200 hover:scale-105"
        style={{ filter: isOver ? 'drop-shadow(0 0 12px rgba(255,192,0,0.5))' : 'none' }}
      >
        <OfficeDesk3D occupied={!!agent} isOver={isOver} />

        {/* Avatar do agente (flutuando sobre a mesa) */}
        {agent && (
          <div className="absolute inset-0 flex items-end justify-center pb-2 pointer-events-none">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
              style={{ marginBottom: -2 }}
            >
              <div className="w-9 h-9 relative">
                <AgentAvatar
                  size="sm"
                  type={agent.avatar.type}
                  skin={agent.avatar.skin}
                  imageUrl={agent.avatar.imageUrl}
                  characterType={agent.avatar.characterType}
                  isAnimated={false}
                  state="idle"
                />
              </div>
              {/* Bolinha de status */}
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-[#111b16]"
                style={{ background: sc!.color, boxShadow: `0 0 5px ${sc!.glow}` }} />
            </motion.div>
          </div>
        )}

        {/* Botão remover (hover) */}
        {agent && (
          <button
            onClick={onRemove}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
            style={{ background: '#ef4444', boxShadow: '0 2px 8px rgba(239,68,68,0.5)' }}
          >
            <X className="w-3 h-3 text-white" />
          </button>
        )}
      </div>

      {/* Nome do agente */}
      {agent && (
        <span className="text-[9px] font-bold mt-1 max-w-[110px] truncate text-center"
          style={{ color: sc!.color }}>
          {agent.name}
        </span>
      )}
    </div>
  )
}

// ─── Mission Card ──────────────────────────────────────────────────────────────

function MissionCard({
  mission, isActive, agentCount, onClick, onDelete,
}: {
  mission: OfficeMission; isActive: boolean; agentCount: number
  onClick: () => void; onDelete: () => void
}) {
  const pc = priorityCfg[mission.priority]
  return (
    <div
      onClick={onClick}
      className="w-full text-left p-4 rounded-2xl cursor-pointer transition-all duration-300 group relative"
      style={{
        background: isActive ? 'rgba(255,192,0,0.1)' : 'rgba(26,40,33,0.7)',
        border: isActive ? '1.5px solid rgba(255,192,0,0.35)' : '1.5px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="text-sm font-bold text-white leading-tight line-clamp-1">{mission.title}</h4>
        <button
          className="opacity-0 group-hover:opacity-100 p-1 rounded-lg transition-opacity"
          style={{ background: 'rgba(239,68,68,0.12)' }}
          onClick={(e) => { e.stopPropagation(); onDelete() }}
        >
          <Trash2 className="w-3 h-3 text-red-400" />
        </button>
      </div>
      <p className="text-[11px] leading-relaxed line-clamp-2 mb-3" style={{ color: '#BFBFBF' }}>
        {mission.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase" style={{ color: mission.status === 'active' ? '#22c55e' : '#BFBFBF' }}>
            {mission.status === 'active' ? '▶ Ativa' : mission.status === 'draft' ? '○ Rascunho' : '⏸ Pausada'}
          </span>
          <span className="px-1.5 py-0.5 text-[9px] font-black uppercase rounded-md"
            style={{ background: `${pc.color}18`, color: pc.color }}>
            {pc.label}
          </span>
        </div>
        <span className="flex items-center gap-1 text-[10px] font-bold" style={{ color: '#BFBFBF' }}>
          <Users className="w-3 h-3" />{agentCount}
        </span>
      </div>
      {mission.status === 'active' && (
        <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg,#FFC000,#F6D52A)' }}
            initial={{ width: 0 }} animate={{ width: `${mission.progress}%` }} transition={{ duration: 1 }} />
        </div>
      )}
    </div>
  )
}

// ─── Agent Roster Card ─────────────────────────────────────────────────────────

function AgentRosterCard({
  agent, isAssigned,
  onDragStart,
}: {
  agent: Agent; isAssigned: boolean
  onDragStart: (e: React.DragEvent) => void
}) {
  const sc = statusCfg[agent.officeStatus ?? 'available']
  return (
    <div
      draggable={!isAssigned && agent.officeStatus !== 'on-mission'}
      onDragStart={onDragStart}
      className={cn(
        'w-full text-left p-3 rounded-2xl transition-all duration-300 group select-none',
        isAssigned || agent.officeStatus === 'on-mission' ? 'opacity-60 cursor-not-allowed' : 'cursor-grab active:cursor-grabbing hover:scale-[1.01]'
      )}
      style={{
        background: 'rgba(26,40,33,0.7)',
        border: '1.5px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          <div className="w-10 h-10">
            <AgentAvatar size="sm" type={agent.avatar.type} skin={agent.avatar.skin}
              imageUrl={agent.avatar.imageUrl} characterType={agent.avatar.characterType}
              isAnimated={false} state="idle" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-[#111b16]"
            style={{ background: sc.color, boxShadow: `0 0 6px ${sc.glow}` }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-white truncate">{agent.name}</p>
          <p className="text-[10px] truncate" style={{ color: '#BFBFBF' }}>{agent.category}</p>
          <div className="mt-0.5 flex items-center gap-2">
            <span className="text-[10px] font-bold" style={{ color: sc.color }}>{sc.label}</span>
            {isAssigned && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-md font-bold" style={{ background: 'rgba(255,192,0,0.12)', color: '#FFC000' }}>
                NA MESA
              </span>
            )}
          </div>
        </div>
        {!isAssigned && agent.officeStatus === 'available' && (
          <div className="text-[10px]" style={{ color: 'rgba(191,191,191,0.4)' }}>drag</div>
        )}
      </div>
    </div>
  )
}

// ─── Página Principal ──────────────────────────────────────────────────────────

export default function OfficePage() {
  const [desks, setDesks] = useState<OfficeDesk[]>(initialDesks)
  const [agents, setAgents] = useState<Agent[]>(mockAgents)
  const [missions, setMissions] = useState<OfficeMission[]>(initialMissions)
  const [activeMissionId, setActiveMissionId] = useState<string | null>('m1')
  const [overDeskId, setOverDeskId] = useState<string | null>(null)
  const [showNewMission, setShowNewMission] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('medium')
  const dragAgentId = useRef<string | null>(null)

  const activeMission = missions.find((m) => m.id === activeMissionId)
  const assignedAgentIds = new Set(
    desks.filter((d) => d.agentId !== null && d.missionId === activeMissionId).map((d) => d.agentId!)
  )
  const missionAgentCount = desks.filter((d) => d.missionId === activeMissionId && d.agentId !== null).length

  // ── Drag events ──
  const handleAgentDragStart = useCallback((e: React.DragEvent, agentId: string) => {
    dragAgentId.current = agentId
    e.dataTransfer.effectAllowed = 'move'
  }, [])

  const handleDeskDragOver = useCallback((e: React.DragEvent, deskId: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setOverDeskId(deskId)
  }, [])

  const handleDeskDragLeave = useCallback(() => setOverDeskId(null), [])

  const handleDeskDrop = useCallback((e: React.DragEvent, desk: OfficeDesk) => {
    e.preventDefault()
    setOverDeskId(null)
    const agentId = dragAgentId.current
    if (!agentId || !activeMissionId || desk.agentId !== null) return

    setDesks((prev) => prev.map((d) => d.id === desk.id ? { ...d, agentId, missionId: activeMissionId } : d))
    setAgents((prev) => prev.map((a) => a.id === agentId ? { ...a, officeStatus: 'on-mission' } : a))
    dragAgentId.current = null
  }, [activeMissionId])

  const handleRemoveAgent = useCallback((desk: OfficeDesk) => {
    const agentId = desk.agentId
    setDesks((prev) => prev.map((d) => d.id === desk.id ? { ...d, agentId: null, missionId: null } : d))
    setAgents((prev) => prev.map((a) => a.id === agentId ? { ...a, officeStatus: 'available' } : a))
  }, [])

  const handleCreateMission = () => {
    if (!newTitle.trim()) return
    const m: OfficeMission = {
      id: `m${Date.now()}`, title: newTitle, description: newDesc,
      status: 'draft', priority: newPriority, assignedDeskIds: [],
      createdAt: new Date(), progress: 0,
    }
    setMissions((prev) => [...prev, m])
    setActiveMissionId(m.id)
    setNewTitle(''); setNewDesc(''); setShowNewMission(false)
  }

  return (
    <div className="flex h-screen overflow-hidden">

      {/* ── ESQUERDA: Missões ─────────────────────────────────────────────────── */}
      <motion.aside className="w-72 flex flex-col border-r shrink-0"
        style={{ background: 'rgba(20,32,26,0.97)', borderColor: 'rgba(255,192,0,0.08)' }}
        initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="p-5 border-b shrink-0" style={{ borderColor: 'rgba(255,192,0,0.08)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255,192,0,0.12)', border: '1px solid rgba(255,192,0,0.2)' }}>
              <Briefcase className="w-5 h-5" style={{ color: '#FFC000' }} />
            </div>
            <div>
              <h2 className="text-sm font-black text-white">Missões</h2>
              <p className="text-[10px]" style={{ color: '#BFBFBF' }}>{missions.length} missões</p>
            </div>
          </div>
          <Button className="w-full h-10 text-xs gap-2" onClick={() => setShowNewMission((v) => !v)}>
            <Plus className="w-4 h-4" />Nova Missão
          </Button>
        </div>

        {/* Form */}
        <AnimatePresence>
          {showNewMission && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-b shrink-0"
              style={{ borderColor: 'rgba(255,192,0,0.08)' }}>
              <div className="p-4 space-y-3">
                <input autoFocus type="text" placeholder="Título da missão..." value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,192,0,0.15)' }}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateMission()} />
                <textarea placeholder="Descrição..." value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)} rows={2}
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none resize-none"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,192,0,0.15)' }} />
                <div className="flex gap-1.5">
                  {(['low','medium','high','critical'] as const).map((p) => (
                    <button key={p} onClick={() => setNewPriority(p)}
                      className="flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all"
                      style={{
                        background: newPriority === p ? `${priorityCfg[p].color}20` : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${newPriority === p ? priorityCfg[p].color : 'transparent'}`,
                        color: newPriority === p ? priorityCfg[p].color : '#BFBFBF',
                      }}>
                      {priorityCfg[p].label}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="flex-1 text-xs" onClick={() => setShowNewMission(false)}>Cancelar</Button>
                  <Button size="sm" className="flex-1 text-xs" onClick={handleCreateMission} disabled={!newTitle.trim()}>Criar</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {missions.map((m) => (
            <MissionCard key={m.id} mission={m} isActive={activeMissionId === m.id}
              agentCount={desks.filter((d) => d.missionId === m.id && d.agentId !== null).length}
              onClick={() => setActiveMissionId(m.id)}
              onDelete={() => setMissions((prev) => prev.filter((x) => x.id !== m.id))} />
          ))}
        </div>
      </motion.aside>

      {/* ── CENTRO: Floor ────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 shrink-0"
          style={{ background: 'rgba(20,32,26,0.85)', borderBottom: '1px solid rgba(255,192,0,0.07)', backdropFilter: 'blur(12px)' }}>

          {/* Esquerda: Voltar + Breadcrumb */}
          <div className="flex items-center gap-3">
            <Link href="/dashboard"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-200 hover:scale-105 shrink-0"
              style={{ background: 'rgba(255,192,0,0.08)', border: '1px solid rgba(255,192,0,0.15)', color: '#FFC000' }}>
              <ChevronLeft className="w-3.5 h-3.5" />
              Voltar
            </Link>
            <div className="hidden md:flex items-center gap-1.5 text-[11px]" style={{ color: 'rgba(191,191,191,0.35)' }}>
              <LayoutDashboard className="w-3 h-3" />
              <span>Escritório Virtual</span>
              {activeMission && (
                <>
                  <span className="mx-0.5">/</span>
                  <span className="truncate max-w-[160px]" style={{ color: '#BFBFBF' }}>{activeMission.title}</span>
                </>
              )}
            </div>
          </div>

          {/* Centro: título + prioridade */}
          <div className="flex items-center gap-3">
            <div className="text-center">
              <h1 className="text-sm font-black text-white tracking-tight leading-none">
                {activeMission?.title ?? 'Escritório Virtual'}
              </h1>
              <p className="text-[10px] mt-0.5" style={{ color: '#BFBFBF' }}>
                {activeMission
                  ? `${missionAgentCount} agente${missionAgentCount !== 1 ? 's' : ''} escalado${missionAgentCount !== 1 ? 's' : ''}`
                  : 'Selecione uma missão'}
              </p>
            </div>
            {activeMission && (
              <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-lg"
                style={{ background: `${priorityCfg[activeMission.priority].color}18`, color: priorityCfg[activeMission.priority].color }}>
                {priorityCfg[activeMission.priority].label}
              </span>
            )}
          </div>

          {/* Direita: legenda + ativar/pausar */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-4 text-[10px] font-bold">
              {(Object.entries(statusCfg) as [AgentOfficeStatus, typeof statusCfg['available']][]).map(([k, s]) => (
                <div key={k} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color, boxShadow: `0 0 5px ${s.glow}` }} />
                  <span style={{ color: '#BFBFBF' }}>{s.label}</span>
                </div>
              ))}
            </div>
            {activeMission && (
              <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs shrink-0"
                onClick={() => setMissions((prev) => prev.map((m) =>
                  m.id === activeMissionId ? { ...m, status: m.status === 'active' ? 'paused' : 'active' } : m))}>
                {activeMission.status === 'active' ? <><Pause className="w-3 h-3" />Pausar</> : <><Play className="w-3 h-3" />Ativar</>}
              </Button>
            )}
          </div>
        </div>


        {/* ── OFFICE FLOOR: sala de escritório ilustrada ─────────────────────── */}
        <div className="flex-1 overflow-auto flex items-center justify-center relative"
          style={{ background: '#0d1a14' }}>

          {/* Dica de drag */}
          {!activeMissionId && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-bold z-20 whitespace-nowrap"
              style={{ background: 'rgba(255,192,0,0.1)', border: '1px solid rgba(255,192,0,0.2)', color: '#FFC000' }}>
              Selecione uma missão para começar a montar sua equipe
            </div>
          )}
          {activeMissionId && missionAgentCount === 0 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-bold animate-pulse z-20 whitespace-nowrap"
              style={{ background: 'rgba(255,192,0,0.1)', border: '1px solid rgba(255,192,0,0.2)', color: '#FFC000' }}>
              👉 Arraste agentes da direita para as mesas
            </div>
          )}

          {/* SVG sala de escritório (background absoluto) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg">

              {/* ── CHÃO (piso de madeira em grid perspectiva) ── */}
              <defs>
                {/* Padrão de tábuas de madeira */}
                <pattern id="woodFloor" x="0" y="0" width="80" height="40" patternUnits="userSpaceOnUse">
                  <rect width="80" height="40" fill="#1a2e20" />
                  <rect width="78" height="38" x="1" y="1" fill="#1d3323" rx="1" />
                  <line x1="0" y1="20" x2="80" y2="20" stroke="#162a1c" strokeWidth="1" />
                </pattern>
                {/* Gradiente de luz solar vindo das janelas */}
                <radialGradient id="sunlight" cx="50%" cy="20%" r="60%">
                  <stop offset="0%" stopColor="rgba(255,220,100,0.08)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
                {/* Gradiente porta */}
                <linearGradient id="doorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2a4a30" />
                  <stop offset="100%" stopColor="#1a3020" />
                </linearGradient>
                {/* Gradiente planta */}
                <radialGradient id="plantGrad" cx="50%" cy="30%" r="60%">
                  <stop offset="0%" stopColor="#2d7a3a" />
                  <stop offset="100%" stopColor="#1a4520" />
                </radialGradient>
                {/* Sombra de luminária */}
                <radialGradient id="lightSpot" cx="50%" cy="0%" r="80%">
                  <stop offset="0%" stopColor="rgba(255,240,180,0.12)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
                <radialGradient id="lightSpot2" cx="50%" cy="0%" r="80%">
                  <stop offset="0%" stopColor="rgba(255,240,180,0.10)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              {/* Chão base */}
              <rect width="1000" height="700" fill="url(#woodFloor)" />

              {/* Luz solar das janelas */}
              <rect width="1000" height="700" fill="url(#sunlight)" />

              {/* ── PAREDE DOS FUNDOS (topo) ── */}
              {/* Parede sólida */}
              <rect x="0" y="0" width="1000" height="80" fill="#1e3828" />
              {/* Faixa de acabamento (skirting board) */}
              <rect x="0" y="75" width="1000" height="6" fill="#162d20" />
              <rect x="0" y="75" width="1000" height="1.5" fill="rgba(255,255,255,0.06)" />

              {/* ── JANELAS NA PAREDE DO FUNDO ── */}
              {/* Janela 1 */}
              <rect x="80" y="8" width="140" height="60" rx="3" fill="#0d1e15" stroke="#2a4a30" strokeWidth="2" />
              {/* Caixilho janela 1 */}
              <rect x="80" y="8" width="2" height="60" fill="#2a4a30" />
              <rect x="218" y="8" width="2" height="60" fill="#2a4a30" />
              <rect x="80" y="35" width="140" height="2" fill="#2a4a30" />
              <rect x="149" y="8" width="2" height="60" fill="#2a4a30" />
              {/* Luz solar na janela 1 */}
              <rect x="82" y="10" width="66" height="23" fill="rgba(255,220,100,0.07)" />
              <rect x="151" y="10" width="67" height="23" fill="rgba(255,220,100,0.05)" />
              {/* Reflexo brilhante */}
              <rect x="85" y="12" width="15" height="3" rx="1" fill="rgba(255,255,255,0.12)" />
              {/* Veneziana lines janela 1 */}
              {[14,18,22,26,30,34].map((y) => (
                <line key={y} x1="82" y1={y} x2="218" y2={y} stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
              ))}

              {/* Janela 2 (centro) */}
              <rect x="420" y="8" width="160" height="60" rx="3" fill="#0d1e15" stroke="#2a4a30" strokeWidth="2" />
              <rect x="420" y="8" width="2" height="60" fill="#2a4a30" />
              <rect x="580" y="8" width="2" height="60" fill="#2a4a30" />
              <rect x="420" y="35" width="160" height="2" fill="#2a4a30" />
              <rect x="500" y="8" width="2" height="60" fill="#2a4a30" />
              <rect x="422" y="10" width="76" height="23" fill="rgba(255,220,100,0.09)" />
              <rect x="502" y="10" width="76" height="23" fill="rgba(255,220,100,0.06)" />
              <rect x="428" y="12" width="18" height="3" rx="1" fill="rgba(255,255,255,0.14)" />
              {[14,18,22,26,30,34].map((y) => (
                <line key={y} x1="422" y1={y} x2="578" y2={y} stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
              ))}

              {/* Janela 3 */}
              <rect x="780" y="8" width="140" height="60" rx="3" fill="#0d1e15" stroke="#2a4a30" strokeWidth="2" />
              <rect x="780" y="8" width="2" height="60" fill="#2a4a30" />
              <rect x="918" y="8" width="2" height="60" fill="#2a4a30" />
              <rect x="780" y="35" width="140" height="2" fill="#2a4a30" />
              <rect x="849" y="8" width="2" height="60" fill="#2a4a30" />
              <rect x="782" y="10" width="65" height="23" fill="rgba(255,220,100,0.07)" />
              <rect x="851" y="10" width="65" height="23" fill="rgba(255,220,100,0.05)" />
              <rect x="785" y="12" width="14" height="3" rx="1" fill="rgba(255,255,255,0.11)" />
              {[14,18,22,26,30,34].map((y) => (
                <line key={y} x1="782" y1={y} x2="916" y2={y} stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
              ))}

              {/* ── PAREDE ESQUERDA (faixa lateral) ── */}
              <rect x="0" y="0" width="30" height="700" fill="#1e3828" />
              <rect x="28" y="0" width="4" height="700" fill="#162d20" />
              <rect x="28" y="0" width="1.5" height="700" fill="rgba(255,255,255,0.04)" />

              {/* ── PAREDE DIREITA ── */}
              <rect x="970" y="0" width="30" height="700" fill="#1e3828" />
              <rect x="968" y="0" width="4" height="700" fill="#162d20" />
              <rect x="969.5" y="0" width="1.5" height="700" fill="rgba(255,255,255,0.04)" />

              {/* ── LUMINÁRIAS DE TETO ── */}
              {/* Luminária 1 */}
              <ellipse cx="250" cy="160" rx="120" ry="80" fill="url(#lightSpot)" />
              <rect x="230" y="82" width="40" height="6" rx="3" fill="#243a2c" />
              <rect x="244" y="80" width="12" height="16" rx="2" fill="#2d4a34" />
              <ellipse cx="250" cy="90" rx="20" ry="5" fill="rgba(255,240,160,0.5)" filter="url(#glow)" />
              <rect x="232" y="88" width="36" height="4" rx="2" fill="rgba(255,240,160,0.2)" />

              {/* Luminária 2 */}
              <ellipse cx="500" cy="160" rx="120" ry="80" fill="url(#lightSpot2)" />
              <rect x="480" y="82" width="40" height="6" rx="3" fill="#243a2c" />
              <rect x="494" y="80" width="12" height="16" rx="2" fill="#2d4a34" />
              <ellipse cx="500" cy="90" rx="20" ry="5" fill="rgba(255,240,160,0.5)" filter="url(#glow)" />
              <rect x="482" y="88" width="36" height="4" rx="2" fill="rgba(255,240,160,0.2)" />

              {/* Luminária 3 */}
              <ellipse cx="750" cy="160" rx="120" ry="80" fill="url(#lightSpot)" />
              <rect x="730" y="82" width="40" height="6" rx="3" fill="#243a2c" />
              <rect x="744" y="80" width="12" height="16" rx="2" fill="#2d4a34" />
              <ellipse cx="750" cy="90" rx="20" ry="5" fill="rgba(255,240,160,0.5)" filter="url(#glow)" />
              <rect x="732" y="88" width="36" height="4" rx="2" fill="rgba(255,240,160,0.2)" />

              {/* ── PORTA (canto direito inferior) ── */}
              <rect x="880" y="600" width="90" height="100" fill="url(#doorGrad)" rx="3" />
              {/* Marco da porta */}
              <rect x="878" y="598" width="4" height="104" fill="#1a3020" />
              <rect x="970" y="598" width="4" height="104" fill="#1a3020" />
              <rect x="878" y="596" width="96" height="4" fill="#1a3020" />
              {/* Vidro da porta */}
              <rect x="890" y="610" width="70" height="50" rx="2" fill="rgba(14,165,233,0.06)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              {/* Maçaneta */}
              <circle cx="884" cy="648" r="5" fill="#FFC000" opacity="0.7" />
              {/* Label porta */}
              <text x="925" y="675" textAnchor="middle" fill="rgba(191,191,191,0.3)" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="2">ENTRADA</text>

              {/* ── PLANTAS (cantos) ── */}
              {/* Planta canto esquerdo */}
              <ellipse cx="55" cy="640" rx="22" ry="10" fill="rgba(0,0,0,0.3)" />
              <rect x="45" y="620" width="20" height="22" rx="3" fill="#2a3d2c" />
              <rect x="47" y="622" width="16" height="18" rx="2" fill="#344d36" />
              {/* Folhas grandes */}
              <ellipse cx="55" cy="610" rx="18" ry="14" fill="url(#plantGrad)" />
              <ellipse cx="40" cy="618" rx="14" ry="10" fill="#245c2c" transform="rotate(-30 40 618)" />
              <ellipse cx="70" cy="615" rx="14" ry="10" fill="#245c2c" transform="rotate(25 70 615)" />
              <ellipse cx="48" cy="598" rx="12" ry="9" fill="#2d7a3a" transform="rotate(-15 48 598)" />
              <ellipse cx="64" cy="600" rx="11" ry="8" fill="#2d7a3a" transform="rotate(20 64 600)" />
              {/* nervura central */}
              <line x1="55" y1="606" x2="55" y2="622" stroke="#1a4520" strokeWidth="1" />

              {/* Planta canto direito */}
              <ellipse cx="950" cy="140" rx="18" ry="8" fill="rgba(0,0,0,0.3)" />
              <rect x="940" y="120" width="18" height="22" rx="3" fill="#2a3d2c" />
              <rect x="942" y="122" width="14" height="18" rx="2" fill="#344d36" />
              <ellipse cx="949" cy="110" rx="16" ry="12" fill="url(#plantGrad)" />
              <ellipse cx="936" cy="118" rx="12" ry="8" fill="#245c2c" transform="rotate(-30 936 118)" />
              <ellipse cx="962" cy="114" rx="12" ry="8" fill="#245c2c" transform="rotate(25 962 114)" />
              <ellipse cx="944" cy="100" rx="10" ry="7" fill="#2d7a3a" transform="rotate(-10 944 100)" />
              <line x1="949" y1="102" x2="949" y2="120" stroke="#1a4520" strokeWidth="1" />

              {/* ── MESA DE REUNIÃO (canto esquerdo) ── */}
              <ellipse cx="80" cy="400" rx="28" ry="14" fill="rgba(0,0,0,0.25)" />
              <ellipse cx="80" cy="392" rx="38" ry="24" fill="#223a28" stroke="#1a2e1e" strokeWidth="1.5" />
              <ellipse cx="80" cy="392" rx="36" ry="22" fill="#243f2e" />
              {/* Cadeiras em volta */}
              {[[-28,-8,-20],[0,-26,5],[28,-8,30],[-26,10,-25],[26,10,25]].map(([dx, dy, rot], i) => (
                <rect key={i} x={80 + dx - 8} y={392 + dy - 5} width="16" height="10" rx="3"
                  fill="#1d3224" stroke="#162820" strokeWidth="1"
                  transform={`rotate(${rot} ${80 + dx} ${392 + dy})`} />
              ))}
              {/* Itens na mesa */}
              <circle cx="80" cy="390" r="6" fill="rgba(255,192,0,0.12)" stroke="rgba(255,192,0,0.2)" strokeWidth="1" />
              <circle cx="80" cy="390" r="3" fill="rgba(255,192,0,0.2)" />

              {/* ── WHITEBOARD / TV NA PAREDE ── */}
              <rect x="310" y="82" width="100" height="60" rx="3" fill="#162a1c" stroke="#243a28" strokeWidth="2" />
              {/* Tela */}
              <rect x="314" y="86" width="92" height="52" rx="2" fill="#111e16" />
              {/* Conteúdo na tela */}
              <rect x="320" y="92" width="50" height="3" rx="1" fill="rgba(255,192,0,0.4)" />
              <rect x="320" y="98" width="40" height="2" rx="1" fill="rgba(255,255,255,0.15)" />
              <rect x="320" y="103" width="60" height="2" rx="1" fill="rgba(255,255,255,0.1)" />
              <rect x="320" y="108" width="35" height="2" rx="1" fill="rgba(255,255,255,0.1)" />
              {/* Bar chart no whiteboard */}
              <rect x="352" y="118" width="8" height="15" rx="1" fill="rgba(255,192,0,0.5)" />
              <rect x="362" y="112" width="8" height="21" rx="1" fill="rgba(255,192,0,0.35)" />
              <rect x="372" y="122" width="8" height="11" rx="1" fill="rgba(255,192,0,0.4)" />
              <rect x="382" y="108" width="8" height="25" rx="1" fill="rgba(34,197,94,0.4)" />
              <rect x="392" y="116" width="8" height="17" rx="1" fill="rgba(255,192,0,0.3)" />
              {/* Logo/ícone */}
              <text x="360" y="92" fill="rgba(255,192,0,0.6)" fontSize="8" fontFamily="monospace" fontWeight="bold">AGENT HUB</text>

              {/* ── FITAS de sombra no piso (sombra das janelas) ── */}
              <rect x="80" y="80" width="2" height="620" fill="rgba(0,0,0,0.06)" />
              <rect x="218" y="80" width="2" height="620" fill="rgba(0,0,0,0.06)" />
              <rect x="420" y="80" width="2" height="620" fill="rgba(0,0,0,0.04)" />
              <rect x="580" y="80" width="2" height="620" fill="rgba(0,0,0,0.04)" />

              {/* ── LINHAS DE PISO (perspectiva em fuga) ── */}
              {[120,160,200,240,280,320,360,400,440,480,520,560,600,640,680].map((y) => (
                <line key={y} x1="30" y1={y} x2="970" y2={y}
                  stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
              ))}
              {[100,200,300,400,500,600,700,800,900].map((x) => (
                <line key={x} x1={x} y1="80" x2={x} y2="700"
                  stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
              ))}

              {/* ── Tapete central ── */}
              <rect x="180" y="200" width="640" height="440" rx="8"
                fill="rgba(36,63,56,0.15)" stroke="rgba(255,192,0,0.06)" strokeWidth="1" />
              {/* Borda interna do tapete */}
              <rect x="188" y="208" width="624" height="424" rx="6"
                fill="none" stroke="rgba(255,192,0,0.04)" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </div>

          {/* Grid de mesas interativas (por cima do SVG) */}
          <div className="flex flex-col gap-4 relative z-10 mt-8">

            {/* Bloco A (fileiras A e B) */}
            <div className="flex flex-col gap-3">
              {[0, 1].map((row) => (
                <div key={row} className="flex items-center gap-4">
                  <span className="text-[11px] font-black w-4 text-right"
                    style={{ color: 'rgba(191,191,191,0.3)' }}>
                    {String.fromCharCode(65 + row)}
                  </span>
                  <div className="flex gap-4">
                    {Array.from({ length: COLS }).map((_, col) => {
                      const desk = desks[row * COLS + col]
                      const agent = agents.find((a) => a.id === desk.agentId) ?? null
                      return (
                        <DeskSlot key={desk.id} desk={desk} agent={agent}
                          isOver={overDeskId === desk.id}
                          missionId={activeMissionId}
                          onDragOver={(e) => handleDeskDragOver(e, desk.id)}
                          onDrop={(e) => handleDeskDrop(e, desk)}
                          onDragLeave={handleDeskDragLeave}
                          onRemove={() => handleRemoveAgent(desk)} />
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Corredor central */}
            <div className="flex items-center gap-3 py-1">
              <span className="w-4" />
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.04)' }} />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]"
                style={{ color: 'rgba(191,191,191,0.15)' }}>
                ── Corredor ──
              </span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.04)' }} />
            </div>

            {/* Bloco B (fileira C) */}
            <div className="flex flex-col gap-3">
              {[2].map((row) => (
                <div key={row} className="flex items-center gap-4">
                  <span className="text-[11px] font-black w-4 text-right"
                    style={{ color: 'rgba(191,191,191,0.25)' }}>
                    {String.fromCharCode(65 + row)}
                  </span>
                  <div className="flex gap-4">
                    {Array.from({ length: COLS }).map((_, col) => {
                      const desk = desks[row * COLS + col]
                      const agent = agents.find((a) => a.id === desk.agentId) ?? null
                      return (
                        <DeskSlot key={desk.id} desk={desk} agent={agent}
                          isOver={overDeskId === desk.id}
                          missionId={activeMissionId}
                          onDragOver={(e) => handleDeskDragOver(e, desk.id)}
                          onDrop={(e) => handleDeskDrop(e, desk)}
                          onDragLeave={handleDeskDragLeave}
                          onRemove={() => handleRemoveAgent(desk)} />
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ── DIREITA: Roster ──────────────────────────────────────────────────── */}

      <motion.aside className="w-72 flex flex-col border-l shrink-0"
        style={{ background: 'rgba(20,32,26,0.97)', borderColor: 'rgba(255,192,0,0.08)' }}
        initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="p-5 border-b shrink-0" style={{ borderColor: 'rgba(255,192,0,0.08)' }}>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255,192,0,0.12)', border: '1px solid rgba(255,192,0,0.2)' }}>
              <Users className="w-5 h-5" style={{ color: '#FFC000' }} />
            </div>
            <div>
              <h2 className="text-sm font-black text-white">Agentes</h2>
              <p className="text-[10px]" style={{ color: '#BFBFBF' }}>
                {agents.filter((a) => a.officeStatus === 'available').length} disponíveis para drag
              </p>
            </div>
          </div>
        </div>

        {/* Instrução */}
        <div className="mx-4 mt-4 p-3 rounded-xl text-[11px] leading-relaxed shrink-0"
          style={{ background: 'rgba(255,192,0,0.06)', border: '1px solid rgba(255,192,0,0.1)', color: '#BFBFBF' }}>
          Agentes <span style={{ color: '#22c55e' }}>●</span> disponíveis podem ser arrastados para as mesas.
        </div>

        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {agents.map((agent) => {
            const isAssigned = assignedAgentIds.has(agent.id)
            return (
              <AgentRosterCard key={agent.id} agent={agent} isAssigned={isAssigned}
                onDragStart={(e) => handleAgentDragStart(e, agent.id)} />
            )
          })}
        </div>

        {/* Rodapé de stats */}
        <div className="p-4 border-t shrink-0" style={{ borderColor: 'rgba(255,192,0,0.08)' }}>
          <div className="grid grid-cols-3 gap-2">
            {(Object.entries(statusCfg) as [AgentOfficeStatus, typeof statusCfg['available']][]).map(([key, sc]) => {
              const count = agents.filter((a) => (a.officeStatus ?? 'available') === key).length
              return (
                <div key={key} className="text-center p-2 rounded-xl" style={{ background: sc.bg }}>
                  <div className="text-lg font-black" style={{ color: sc.color }}>{count}</div>
                  <div className="text-[9px] font-bold uppercase" style={{ color: sc.color }}>{sc.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </motion.aside>
    </div>
  )
}
