'use client'

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface AgentAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  skin?: 'default' | 'blue' | 'purple' | 'green' | 'orange'
  isAnimated?: boolean
  isInteractive?: boolean
  state?: 'idle' | 'listening' | 'thinking' | 'speaking'
  className?: string
}

const sizeMap = {
  sm: { width: 64, height: 80 },
  md: { width: 96, height: 120 },
  lg: { width: 144, height: 180 },
  xl: { width: 200, height: 250 },
}

const colorMap = {
  default: { primary: '#1F6FEB', secondary: '#2FD2C9' },
  blue: { primary: '#1F6FEB', secondary: '#4B8FF7' },
  purple: { primary: '#7C3AED', secondary: '#A78BFA' },
  green: { primary: '#10B981', secondary: '#34D399' },
  orange: { primary: '#F59E0B', secondary: '#FBBF24' },
}

export function AgentAvatar({
  size = 'md',
  color = 'default',
  skin = 'default',
  isAnimated = true,
  isInteractive = true,
  state = 'idle',
  className,
}: AgentAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Respeita preferência de acessibilidade
  const shouldAnimate = isAnimated && !prefersReducedMotion
  const shouldBeInteractive = isInteractive && !prefersReducedMotion

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Suavização do movimento para seguir o cursor
  const springConfig = { stiffness: 150, damping: 15 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig)
  const translateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springConfig)

  const colors = colorMap[skin]
  const dimensions = sizeMap[size]

  // Animação de respiração (idle)
  const breatheVariants = {
    idle: {
      scaleY: [1, 1.012, 1],
      y: [0, -1.5, 0],
      transition: {
        duration: 3.2,
        ease: 'easeInOut' as const,
        repeat: Infinity,
        repeatType: 'loop' as const,
      },
    },
    listening: {
      scaleY: [1, 1.02, 1],
      y: [0, -2, 0],
      transition: {
        duration: 1.5,
        ease: 'easeInOut' as const,
        repeat: Infinity,
      },
    },
    thinking: {
      scaleY: [1, 1.008, 1],
      y: [0, -1, 0],
      transition: {
        duration: 0.8,
        ease: 'easeInOut' as const,
        repeat: Infinity,
      },
    },
    speaking: {
      scaleY: [1, 1.015, 1],
      y: [0, -2, 0],
      transition: {
        duration: 0.4,
        ease: 'easeInOut' as const,
        repeat: Infinity,
      },
    },
  }

  // Animação dos olhos (piscar)
  const eyeVariants = {
    idle: {
      scaleY: [1, 1, 0.1, 1, 1],
      transition: {
        duration: 4,
        times: [0, 0.9, 0.95, 0.98, 1],
        repeat: Infinity,
        repeatDelay: 1,
      },
    },
    listening: {
      scaleY: 1,
    },
    thinking: {
      scaleY: [1, 0.8, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity,
      },
    },
    speaking: {
      scaleY: [1, 0.9, 1],
      transition: {
        duration: 0.2,
        repeat: Infinity,
      },
    },
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!shouldBeInteractive || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={containerRef}
      className={cn('relative cursor-pointer', className)}
      style={{ width: dimensions.width, height: dimensions.height }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={shouldBeInteractive ? { scale: 1.02 } : undefined}
      transition={{ duration: 0.2 }}
    >
      <motion.svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 100 125"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          rotateX: shouldBeInteractive ? rotateX : 0,
          rotateY: shouldBeInteractive ? rotateY : 0,
          transformPerspective: 500,
        }}
      >
        {/* Corpo/Busto */}
        <motion.g
          variants={breatheVariants}
          animate={shouldAnimate ? state : undefined}
          initial="idle"
        >
          {/* Forma principal do corpo */}
          <path
            d="M50 35C65 35 75 45 78 60C80 75 75 90 65 100C60 105 55 108 50 108C45 108 40 105 35 100C25 90 20 75 22 60C25 45 35 35 50 35Z"
            fill={colors.primary}
          />

          {/* Destaque/Brilho no corpo */}
          <path
            d="M50 40C60 40 68 48 70 60C71 70 68 82 60 90"
            stroke={colors.secondary}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Cabeça/Área facial */}
          <motion.g
            style={{ x: shouldBeInteractive ? translateX : 0 }}
          >
            {/* Olhos */}
            <motion.g variants={eyeVariants} animate={shouldAnimate ? state : undefined}>
              {/* Olho esquerdo */}
              <ellipse
                cx="38"
                cy="58"
                rx="5"
                ry="6"
                fill="white"
              />
              <circle
                cx="38"
                cy="58"
                r="2.5"
                fill={colors.secondary}
              />

              {/* Olho direito */}
              <ellipse
                cx="62"
                cy="58"
                rx="5"
                ry="6"
                fill="white"
              />
              <circle
                cx="62"
                cy="58"
                r="2.5"
                fill={colors.secondary}
              />
            </motion.g>

            {/* Boca - muda conforme o estado */}
            <motion.path
              d={state === 'speaking' ? 'M42 75Q50 82 58 75' : 'M45 75Q50 78 55 75'}
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              animate={state === 'speaking' ? {
                d: ['M42 75Q50 82 58 75', 'M42 75Q50 85 58 75', 'M42 75Q50 82 58 75'],
              } : {}}
              transition={{ duration: 0.3, repeat: Infinity }}
            />

            {/* Bochechas */}
            <circle cx="32" cy="68" r="4" fill={colors.secondary} opacity="0.3" />
            <circle cx="68" cy="68" r="4" fill={colors.secondary} opacity="0.3" />
          </motion.g>

          {/* Antenas/Detalhes superiores */}
          <motion.g
            animate={shouldAnimate ? {
              rotate: [-2, 2, -2],
              transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            } : {}}
            style={{ originX: '50px', originY: '40px' }}
          >
            <line x1="35" y1="40" x2="30" y2="25" stroke={colors.primary} strokeWidth="3" strokeLinecap="round" />
            <circle cx="30" cy="25" r="4" fill={colors.secondary} />
            <line x1="65" y1="40" x2="70" y2="25" stroke={colors.primary} strokeWidth="3" strokeLinecap="round" />
            <circle cx="70" cy="25" r="4" fill={colors.secondary} />
          </motion.g>
        </motion.g>

        {/* Indicador de estado (pensando) */}
        {state === 'thinking' && (
          <motion.g
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <circle cx="85" cy="30" r="3" fill={colors.secondary} />
            <motion.circle
              cx="92" cy="25"
              r="2"
              fill={colors.secondary}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.circle
              cx="97" cy="20"
              r="1.5"
              fill={colors.secondary}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
          </motion.g>
        )}
      </motion.svg>

      {/* Efeito de hover */}
      {isHovered && shouldBeInteractive && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: `radial-gradient(circle at center, ${colors.secondary}20 0%, transparent 70%)`,
          }}
        />
      )}
    </motion.div>
  )
}
