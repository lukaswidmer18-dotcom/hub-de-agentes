'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AgentAvatar } from '@/components/avatar'
import { Message } from '@/types'
import { useState, useRef, useEffect } from 'react'
import { Send, User, Bot, Plus, Search, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

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
    <div className="flex h-[calc(100vh-64px)] bg-white overflow-hidden">
      {/* Sidebar de Conversas */}
      <div className="w-80 border-r border-neutral-200 flex flex-col bg-neutral-50/50">
        <div className="p-4 border-b border-neutral-200">
          <button className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Nova Conversa
          </button>
        </div>
        
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar conversas..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-neutral-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          
          <div className="space-y-1">
            <p className="px-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Recentes</p>
            {mockConversations.map((conv) => (
              <button
                key={conv.id}
                className={cn(
                  "w-full text-left p-3 rounded-xl transition-all group hover:bg-white hover:shadow-sm border border-transparent",
                  conv.id === 'c1' ? "bg-white shadow-sm border-neutral-200" : ""
                )}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-semibold text-neutral-900 line-clamp-1">{conv.agentName}</span>
                  <span className="text-[10px] text-neutral-400">{conv.timestamp}</span>
                </div>
                <p className="text-xs text-neutral-500 line-clamp-1">{conv.lastMessage}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Área de Chat */}
      <div className="flex-1 flex flex-col min-w-0 bg-neutral-50/30">
        {/* Header do Chat */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-neutral-200 bg-white shadow-sm z-10">
          <div className="flex items-center gap-3">
            <AgentAvatar size="sm" skin="default" state="idle" />
            <div>
              <h2 className="text-sm font-bold text-neutral-900">Assistente de Código</h2>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-success"></span>
                <span className="text-[10px] text-neutral-500 font-medium">Online e pronto</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors">Configurar Agente</button>
            <div className="w-px h-4 bg-neutral-200"></div>
            <button className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mensagens */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={cn(
                  "flex items-start gap-4 max-w-[85%]",
                  msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  msg.role === 'assistant' ? "bg-primary text-white" : "bg-neutral-200 text-neutral-600"
                )}>
                  {msg.role === 'assistant' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>
                
                <div className={cn(
                  "p-4 rounded-2xl shadow-sm text-sm leading-relaxed",
                  msg.role === 'assistant' 
                    ? "bg-white border border-neutral-200 text-neutral-800 rounded-tl-none" 
                    : "bg-primary text-white rounded-tr-none"
                )}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-4"
            >
              <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="flex gap-1 p-3 bg-white border border-neutral-200 rounded-2xl rounded-tl-none shadow-sm">
                <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce delay-75"></span>
                <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce delay-150"></span>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input de Mensagem */}
        <div className="p-6 bg-white border-t border-neutral-200">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex gap-4">
            <div className="flex-1 relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage(e)
                  }
                }}
                placeholder="Como posso ajudar hoje?"
                rows={1}
                className="w-full pl-4 pr-12 py-3 bg-neutral-100 border border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white focus:border-primary/20 transition-all resize-none min-h-[48px]"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg disabled:opacity-50 disabled:bg-neutral-400 transition-all active:scale-95 shadow-lg shadow-primary/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
          <p className="mt-3 text-[10px] text-center text-neutral-400 font-medium">
            Pressione Enter para enviar. Use Shift + Enter para uma nova linha.
          </p>
        </div>
      </div>
    </div>
  )
}
