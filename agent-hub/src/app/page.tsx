'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AgentAvatar } from '@/components/avatar'
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg-main text-slate-50 selection:bg-yellow-400/20">
      {/* Background Decorativo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-pulse" style={{ background: 'rgba(255,192,0,0.06)' }} />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full blur-[100px]" style={{ background: 'rgba(36,63,56,0.8)' }} />
      </div>

      {/* Header da Landing */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, #FFC000, #F6D52A)', boxShadow: '0 4px 16px rgba(255,192,0,0.3)' }}>
                <svg width="22" height="22" viewBox="0 0 100 125" fill="none" className="text-[#243F38]">
                  <path d="M50 35C65 35 75 45 78 60C80 75 75 90 65 100C60 105 55 108 50 108C45 108 40 105 35 100C25 90 20 75 22 60C25 45 35 35 50 35Z" fill="currentColor" />
                </svg>
              </div>
              <span className="font-bold text-xl tracking-tight text-glow">Agent Hub</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Funcionalidades</Link>
              <Link href="#pricing" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Preços</Link>
              <Link href="#docs" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Documentação</Link>
            </nav>

            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-semibold text-slate-400 hover:text-white transition-colors px-4 py-2"
              >
                Entrar
              </Link>
              <Button asChild variant="default" size="sm">
                <Link href="/signup">
                  Começar Grátis
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
                style={{ background: 'rgba(255,192,0,0.1)', border: '1px solid rgba(255,192,0,0.25)', color: '#FFC000' }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Deep Intelligence v2.0</span>
              </motion.div>

              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                Descubra a Próxima <br />
                <span className="gradient-heading block mt-2">Era da IA</span>
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl text-slate-400 max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Orquestre agentes inteligentes com uma interface visceral. 
                Personalize, implante e escale sua produtividade com o ecossistema Agent Hub.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button asChild size="lg" className="gap-2">
                  <Link href="/dashboard">
                    Ir para Dashboard
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="glass" size="lg">
                  <Link href="/templates">
                    Ver Templates
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Grid de Avatares Animados Premium */}
            <motion.div
              className="relative lg:h-[600px] flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 relative z-10 w-full">
                {[
                  { skin: 'blue' as const, delay: 0 },
                  { skin: 'purple' as const, delay: 0.1 },
                  { skin: 'green' as const, delay: 0.2 },
                  { skin: 'orange' as const, delay: 0.15 },
                  { skin: 'default' as const, delay: 0.25 },
                  { skin: 'blue' as const, delay: 0.35 },
                ].map((avatar, i) => (
                  <motion.div
                    key={i}
                    className="glass-card p-6 flex items-center justify-center min-h-[160px] group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5 + avatar.delay,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ 
                      y: -10, 
                      scale: 1.05,
                      borderColor: 'rgba(255,255,255,0.2)',
                      backgroundColor: 'rgba(30,41,59,0.5)'
                    }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-sky-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      <AgentAvatar
                        size="xl"
                        skin={avatar.skin}
                        isAnimated
                        isInteractive
                        state="idle"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Elementos decorativos Orbital */}
              <div className="absolute inset-0 border-[1px] border-white/5 rounded-full animate-[spin_20s_linear_infinite] scale-[1.2] opacity-20 pointer-events-none" />
              <div className="absolute inset-0 border-[1px] border-white/5 rounded-full animate-[spin_30s_linear_infinite_reverse] scale-[1.5] opacity-10 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <motion.h2 
              className="text-4xl sm:text-5xl font-bold gradient-heading mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Potencial Ilimitado
            </motion.h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Uma fundação sólida para seus experimentos de IA, construída com foco em performance e estética cinematográfica.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'Design Visceral',
                description: 'Interfaces que respondem ao toque e ao olhar, criando uma conexão profunda.',
              },
              {
                icon: Zap,
                title: 'Latência Zero',
                description: 'Otimizado para respostas instantâneas e fluxos de trabalho sem fricção.',
              },
              {
                icon: Shield,
                title: 'Núcleo Blindado',
                description: 'Segurança de nível bancário com arquitetura descentralizada e resiliente.',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="glass-card p-10 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-sky-500/20 transition-all duration-500">
                  <feature.icon className="w-7 h-7 text-sky-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Premium */}
      <footer className="relative py-20 border-t border-white/5 bg-slate-950/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 100 125" fill="none" className="text-white">
                  <path d="M50 35C65 35 75 45 78 60C80 75 75 90 65 100C60 105 55 108 50 108C45 108 40 105 35 100C25 90 20 75 22 60C25 45 35 35 50 35Z" fill="currentColor" />
                </svg>
              </div>
              <span className="font-bold text-xl text-white tracking-tight">Agent Hub</span>
            </div>

            <nav className="flex items-center gap-10 text-sm font-medium">
              <Link href="/terms" className="text-slate-500 hover:text-white transition-colors">Termos</Link>
              <Link href="/privacy" className="text-slate-500 hover:text-white transition-colors">Privacidade</Link>
              <Link href="/contact" className="text-slate-500 hover:text-white transition-colors">Contato</Link>
            </nav>
          </div>

          <div className="mt-16 pt-8 border-t border-white/5 text-center">
            <p className="text-slate-600 text-sm">
              © 2025 Agent Hub. <span className="text-slate-500 font-medium">Desenvolvido para inspirar.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
