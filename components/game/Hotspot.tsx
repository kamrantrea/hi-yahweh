/**
 * Hotspot Component
 * Renders interactive elements in the scene
 */

'use client'

import { motion } from 'framer-motion'
import { Hotspot as HotspotType } from '@/lib/scenes-data'
import { useGameStore, isNearHotspot } from '@/lib/game-engine'

interface HotspotProps {
  hotspot: HotspotType
}

export default function Hotspot({ hotspot }: HotspotProps) {
  const playerPosition = useGameStore((state) => state.playerState.position)
  const setActiveDialogue = useGameStore((state) => state.setActiveDialogue)
  const discoverHotspot = useGameStore((state) => state.discoverHotspot)
  const discoveredHotspots = useGameStore((state) => state.discoveredHotspots)

  const isNear = isNearHotspot(playerPosition, hotspot)
  const isDiscovered = discoveredHotspots.has(hotspot.id)

  const handleClick = () => {
    if (isNear && hotspot.dialogueId) {
      discoverHotspot(hotspot.id)
      setActiveDialogue(hotspot.dialogueId)
    }
  }

  return (
    <motion.div
      className="hotspot absolute z-10"
      style={{
        left: hotspot.position.x - 30,
        top: hotspot.position.y - 30,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isNear ? 1.2 : 1,
        opacity: 1,
      }}
      transition={{
        duration: 0.3,
      }}
      onClick={handleClick}
    >
      {/* Hotspot marker */}
      <div className="relative">
        {/* Pulse effect when near */}
        {isNear && (
          <motion.div
            className="absolute inset-0 rounded-full bg-yellow-400/30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        )}

        {/* Main icon */}
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-all ${
            isNear
              ? 'bg-yellow-400/80 cursor-pointer shadow-lg'
              : isDiscovered
                ? 'bg-blue-400/60'
                : 'bg-gray-400/60'
          }`}
        >
          {hotspot.icon}
        </div>

        {/* Interaction prompt when near */}
        {isNear && (
          <motion.div
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-black/80 text-white text-sm px-3 py-1.5 rounded-lg shadow-lg">
              <div className="font-semibold">{hotspot.name}</div>
              <div className="text-xs text-gray-300">Click to interact (E)</div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
