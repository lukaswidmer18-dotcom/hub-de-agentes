'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AgentAvatar } from '@/components/avatar'
import { Message } from '@/types'
import { useState, useRef, useEffect } from 'react'
import { Send, User, Bot, Plus, Search, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

// Mock de histórico de conversas traduzido
const mockConversations = [
  { id: 'c1', agentName: 'Assistente de Código', lastMessage: 'Como posso ajudar com seu código hoje?', timestamp: '2h atrás' },
  { id: 'c2', agentName: 'Analisador de Dados', lastMessage: 'A análise do dataset está concluída.', timestamp: '1 dia atrás' },
  { id: 'c3', agentName: 'Marketing IA', lastMessage: 'Vamos criar uma nova campanha?', timestamp: '3 dias atrás' },
]

export default function WorkspacePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      role: 'assistant',
      content: 'Olá! Sou seu Assistente de Código. Como posso te ajudar a melhorar seu projeto hoje?',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulação de resposta do agente
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Recebi sua mensagem: "${userMessage.content}". Como sou um protótipo, ainda não consigo processar solicitações reais, mas estou pronto para a implementação da integração!`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="flex h-[calc(100vh-64px)] bg-bg-main overflow-hidden selection:bg-yellow-400/20">
      {/* Sidebar de Conversas - Glass */}
      <div className="w-80 border-r border-white/5 flex flex-col bg-slate-950/20 backdrop-blur-xl">
        <div className="p-6 border-b border-white/5">
          <Button 
            className="w-full h-12 gap-2"
          >
            <Plus className="w-4 h-4" />
            Nova Conversa
          </Button>
        </div>
        
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar histórico..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 focus:bg-white/10 transition-all"
            />
          </div>
          
          <div className="space-y-2">
            <p className="px-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Recentes</p>
            {mockConversations.map((conv) => (
              <button
                key={conv.id}
                className={cn(
                  "w-full text-left p-4 rounded-2xl transition-all duration-300 group border border-transparent",
                  conv.id === 'c1' 
                    ? "border" 
                    : "hover:bg-white/5"
                )}
              >
                <div className="flex justify-between items-start mb-1.5">
                  <span className={cn(
                    "text-sm font-bold tracking-tight",
                    conv.id === 'c1' ? "text-yellow-400" : "text-slate-200 group-hover:text-white"
                  )}>{conv.agentName}</span>
                  <span className="text-[10px] font-medium text-slate-500">{conv.timestamp}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1 group-hover:text-slate-400">{conv.lastMessage}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Área de Chat - Deep Background */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-950/10 relative">
        {/* Background Decorativo Sutil */}
        <div className="absolute top-0 right-0 w-[30%] h-[30%] rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(255,192,0,0.04)' }} />
        
        {/* Header do Chat */}
        <div className="h-16 flex items-center justify-between px-8 border-b border-white/5 bg-slate-950/40 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <AgentAvatar size="sm" type="image" skin="blue" state="idle" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">Assistente de Código</h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Interface Neural Ativa</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <Button variant="ghost" className="text-[10px] uppercase tracking-widest h-9 px-4">
              Parâmetros
            </Button>
            <div className="w-px h-10 bg-white/5"></div>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mensagens - Estilo Cinematic */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "flex items-start gap-4 max-w-[80%]",
                  msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-500",
                  msg.role === 'assistant' 
                    ? "text-white border-white/20 shadow-lg" 
                    : "bg-slate-800 text-slate-400 border-white/5"
                )}>
                  {msg.role === 'assistant' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>
                
                <div className={cn(
                  "p-5 rounded-2xl text-[13px] leading-relaxed shadow-xl backdrop-blur-md transition-all duration-500",
                  msg.role === 'assistant' 
                    ? "bg-white/5 border border-white/10 text-slate-200 rounded-tl-none" 
                    : "border text-white rounded-tr-none"
                )}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-800 border border-white/5 text-slate-500 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="flex gap-1.5 p-4 bg-white/5 border border-white/10 rounded-2xl rounded-tl-none backdrop-blur-md">
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce shadow-[0_0_8px_rgba(255,192,0,0.5)]"></span>
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce delay-150 shadow-[0_0_8px_rgba(255,192,0,0.5)]"></span>
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce delay-300 shadow-[0_0_8px_rgba(255,192,0,0.5)]"></span>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input de Mensagem - Minimalista Elevado */}
        <div className="p-8 bg-slate-950/20 backdrop-blur-xl border-t border-white/5">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center gap-3">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage(e)
                    }
                  }}
                  placeholder="Envie um comando..."
                  rows={1}
                  className="w-full pl-6 pr-14 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-white/20 focus:bg-white/[0.08] transition-all resize-none min-h-[56px] custom-scrollbar"
                />
                <Button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 shadow-sky-500/20"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="mt-4 text-[10px] text-center text-slate-600 font-bold uppercase tracking-[0.2em]">
              SISTEMA NEURAL : PRONTO PARA OPERAÇÃO
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
