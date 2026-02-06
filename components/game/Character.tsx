/**
 * Character Component
 * Handles player character rendering and movement
 */

'use client'

import { motion } from 'framer-motion'
import { useGameStore } from '@/lib/game-engine'

interface CharacterProps {
  size?: number
}

export default function Character({ size = 40 }: CharacterProps) {
  const playerState = useGameStore((state) => state.playerState)
  const { position, direction } = playerState

  // Simple character representation - can be replaced with sprites later
  const getCharacterEmoji = () => {
    switch (direction) {
      case 'up':
        return '🧍'
      case 'down':
        return '🧍'
      case 'left':
        return '🧍'
      case 'right':
        return '🧍'
      default:
        return '🧍'
    }
  }

  return (
    <motion.div
      className="character-sprite absolute pointer-events-none z-20"
      style={{
        left: position.x - size / 2,
        top: position.y - size / 2,
        width: size,
        height: size,
      }}
      animate={{
        x: 0,
        y: 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      <div
        className="flex items-center justify-center w-full h-full"
        style={{
          fontSize: `${size}px`,
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
        }}
      >
        {getCharacterEmoji()}
      </div>
      
      {/* Character name tag */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        <div className="bg-black/70 text-white text-xs px-2 py-1 rounded">
          Player
        </div>
      </div>
    </motion.div>
  )
}
