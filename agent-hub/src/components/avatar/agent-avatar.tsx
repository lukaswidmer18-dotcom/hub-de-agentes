'use client'

import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface AgentAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  type?: 'vector' | 'image'
  skin?: string
  state?: 'idle' | 'listening' | 'thinking' | 'speaking'
  isAnimated?: boolean
  isInteractive?: boolean
  className?: string
  imageUrl?: string
  characterType?: 'general' | 'ordinary'
}

const sizeMap = {
  sm: { width: 48, height: 48 },
  md: { width: 80, height: 80 },
  lg: { width: 160, height: 160 },
  xl: { width: 240, height: 240 },
}

// Mapeamento de skins para arquivos General Character
const generalCharacterMap: Record<string, string> = {
  'default': 'General Character.png',
  'blue': 'General Character - Blue.png',
  'green': 'General Character - Green.png',
  'pink': 'General Character - Pink.png',
  'purple': 'General Character - Purple.png',
  'red': 'General Character - Red.png',
  'yellow': 'General Character - Yellow.png',
}

export function AgentAvatar({
  size = 'md',
  type = 'image',
  skin = 'default',
  state = 'idle',
  isAnimated = true,
  isInteractive = true,
  className,
  imageUrl,
  characterType = 'general'
}: AgentAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Suavização do movimento 3D premium
  const springConfig = { stiffness: 100, damping: 20 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig)
  const shadowX = useTransform(mouseX, [-0.5, 0.5], [10, -10])
  const shadowY = useTransform(mouseY, [-0.5, 0.5], [10, -10])

  const dimensions = sizeMap[size]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isInteractive || !containerRef.current) return
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

  // Determinar a fonte da imagem
  const getAvatarPath = () => {
    if (imageUrl) return imageUrl
    if (characterType === 'general') {
      const fileName = generalCharacterMap[skin.toLowerCase()] || 'General Character.png'
      return `/avatars/tomodachi/general/${fileName}`
    }
    return imageUrl || `/avatars/tomodachi/general/General Character.png`
  }

  const avatarSrc = getAvatarPath()

  return (
    <div 
      ref={containerRef}
      className={cn('relative perspective-1000', className)}
      style={{ width: dimensions.width, height: dimensions.height }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full flex items-center justify-center p-2"
        style={{
          rotateX: isInteractive ? rotateX : 0,
          rotateY: isInteractive ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        initial={isAnimated ? { scale: 0.8, opacity: 0 } : false}
        animate={isAnimated ? { scale: 1, opacity: 1 } : false}
        whileHover={isInteractive ? { scale: 1.05 } : undefined}
      >
        {/* Glow de Background Neural */}
        <div className="absolute inset-0 bg-sky-500/10 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />

        {/* Imagem do Avatar com Motion */}
        <motion.div
          className="relative z-10 w-full h-full"
          animate={isAnimated ? {
            y: [-4, 4, -4],
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          } : {}}
          style={{ z: 50 }}
        >
          <Image
            src={avatarSrc}
            alt="Agent Avatar"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>

        {/* Reflexo Dinâmico / Overlay Glasses */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
          }}
        />
      </motion.div>

      {/* Sombra Neural */}
      <motion.div
        className="absolute -bottom-4 left-1/2 -track-x-1/2 w-1/2 h-2 bg-black/40 blur-md rounded-full"
        style={{
          x: shadowX,
          opacity: isHovered ? 0.3 : 0.2,
          scale: isHovered ? 1.1 : 1,
        }}
      />
    </div>
  )
}
