'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AgentAvatar } from '@/components/avatar'
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Header da Landing */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 100 125" fill="none" className="text-white"
                >
                  <path d="M50 35C65 35 75 45 78 60C80 75 75 90 65 100C60 105 55 108 50 108C45 108 40 105 35 100C25 90 20 75 22 60C25 45 35 35 50 35Z" fill="currentColor" />
                </svg>
              </div>
              <span className="font-semibold text-lg text-neutral-900">Agent Hub</span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-sm text-neutral-600 hover:text-neutral-900">Funcionalidades</Link>
              <Link href="#pricing" className="text-sm text-neutral-600 hover:text-neutral-900">Preços</Link>
              <Link href="#docs" className="text-sm text-neutral-600 hover:text-neutral-900">Documentação</Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
              >
                Entrar
              </Link>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-dark transition-colors"
                >
                  Criar conta
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
              >
                <Sparkles className="w-4 h-4" />
                <span>Novo: Templates de Agentes</span>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Descubra e gerencie{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  agentes de IA
                </span>
                <br />
                em um só lugar
              </motion.h1>

              <motion.p
                className="text-lg text-neutral-600 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Crie, personalize e implante agentes de IA com uma interface visual intuitiva.
                Integre-se ao Claude Code e automatize seus fluxos de trabalho.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/agents"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors"
                  >
                    Explorar Agentes
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
                <Link
                  href="/templates"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-300 text-neutral-700 rounded-full font-medium hover:border-neutral-400 transition-colors"
                >
                  Ver Templates
                </Link>
              </motion.div>
            </div>

            {/* Grid de Avatares Animados */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="grid grid-cols-3 gap-6">
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
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + avatar.delay,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <div className="flex justify-center">
                      <AgentAvatar
                        size="lg"
                        skin={avatar.skin}
                        isAnimated
                        isInteractive
                        state="idle"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Elementos decorativos */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Tudo que você precisa</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Uma plataforma completa para criar, gerenciar e escalar seus agentes de IA
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'Interface Visual',
                description: 'Escolha agentes por avatares animados e personalize com poucos cliques',
              },
              {
                icon: Zap,
                title: 'Integração Claude',
                description: 'Conecte-se diretamente ao Claude Code para criação e deploy de agentes',
              },
              {
                icon: Shield,
                title: 'Segurança Empresarial',
                description: 'Autenticação SAML, criptografia e controle de acesso granular',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-2xl bg-neutral-100 hover:bg-neutral-50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 100 125" fill="none" className="text-white"
                >
                  <path d="M50 35C65 35 75 45 78 60C80 75 75 90 65 100C60 105 55 108 50 108C45 108 40 105 35 100C25 90 20 75 22 60C25 45 35 35 50 35Z" fill="currentColor" />
                </svg>
              </div>
              <span className="font-semibold">Agent Hub</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-neutral-400">
              <Link href="/terms" className="hover:text-white transition-colors">Termos</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacidade</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contato</Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-neutral-800 text-center text-sm text-neutral-500">
            © 2025 Agent Hub. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
