/**
 * Game Page
 * Main game view that initializes the scene and renders the game
 */

'use client'

import { useEffect, useState } from 'react'
import { useGameStore } from '@/lib/game-engine'
import { gardenOfEdenScene } from '@/lib/scenes-data'
import Scene from '@/components/game/Scene'
import { motion, AnimatePresence } from 'framer-motion'

export default function GamePage() {
  const [isLoading, setIsLoading] = useState(true)
  const setCurrentScene = useGameStore((state) => state.setCurrentScene)
  const currentScene = useGameStore((state) => state.currentScene)

  useEffect(() => {
    // Initialize the game with the Garden of Eden scene
    if (!currentScene) {
      setCurrentScene(gardenOfEdenScene)
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [currentScene, setCurrentScene])

  return (
    <div className="w-full h-screen">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center z-50"
          >
            <div className="text-center">
              <motion.div
                className="text-8xl mb-4"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                📖
              </motion.div>
              <motion.div
                className="text-2xl font-serif text-amber-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Loading the Garden of Eden...
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Scene />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
