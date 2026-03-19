# Agent Hub

Hub web para descoberta, seleção e gestão de agentes de IA criados via Claude Code.

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Framer Motion** - Animações declarativas
- **Zustand** - Gerenciamento de estado
- **TanStack Query** - Data fetching e caching

## 📁 Estrutura do Projeto

```
agent-hub/
├── src/
│   ├── app/                    # App Router (Next.js)
│   │   ├── page.tsx           # Landing Page
│   │   ├── layout.tsx         # Layout raiz
│   │   ├── globals.css        # Estilos globais
│   │   ├── dashboard/         # Dashboard
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   └── agents/            # Listagem de agentes
│   │       ├── page.tsx
│   │       └── layout.tsx
│   ├── components/
│   │   ├── avatar/            # Componentes de avatar/boneco
│   │   │   ├── agent-avatar.tsx
│   │   │   ├── agent-card.tsx
│   │   │   ├── agent-grid.tsx
│   │   │   └── index.ts
│   │   ├── layout/            # Componentes de layout
│   │   │   ├── header.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── index.ts
│   │   └── providers/         # Providers (React Query, etc)
│   │       └── query-provider.tsx
│   ├── hooks/                 # Hooks customizados
│   │   ├── use-reduced-motion.ts
│   │   └── index.ts
│   ├── lib/                   # Utilitários e configurações
│   │   ├── utils.ts
│   │   └── store/
│   │       └── agent-store.ts
│   └── types/                 # Tipos TypeScript
│       └── index.ts
├── public/                    # Assets estáticos
├── tailwind.config.js         # Configuração Tailwind
├── tsconfig.json              # Configuração TypeScript
└── next.config.js             # Configuração Next.js
```

## 🎨 Design System

### Cores

- **Primária**: `#1F6FEB` (Azul profundo)
- **Secundária**: `#2FD2C9` (Turquesa)
- **Acento**: `#FFC857` (Amarelo)
- **Erro**: `#FF4D4F`
- **Sucesso**: `#32D583`

### Tipografia

- **Títulos**: Inter / Semibold (600)
- **Corpo**: Inter / Regular (400)
- **Código**: JetBrains Mono / Regular (400)

## 🎭 Animações

O projeto implementa as animações especificadas no PRD:

1. **Entrada do Grid** - Stagger de 60ms com fade e slide
2. **Idle/Breathing** - Ciclo sutil de 3.2s
3. **Hover** - Efeito 3D que segue o cursor
4. **Seleção** - Shared layout animation
5. **Acessibilidade** - Respeita `prefers-reduced-motion`

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar build de produção
npm start
```

Acesse `http://localhost:3000` para ver a aplicação.

## 📱 Páginas

- `/` - Landing Page (não autenticada)
- `/dashboard` - Dashboard com visão geral
- `/agents` - Listagem e busca de agentes
- `/workspace` - Workspace de conversação (em desenvolvimento)
- `/templates` - Templates de agentes (em desenvolvimento)

## ♿ Acessibilidade

- Suporte a `prefers-reduced-motion`
- Contraste de cores adequado
- Navegação por teclado
- Semântica HTML correta

## 📝 Licença

ISC
