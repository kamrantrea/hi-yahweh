/**
 * Scene Component
 * Main game scene renderer with character movement and hotspot interactions
 */

'use client'

import { useEffect, useCallback, useRef } from 'react'
import { useGameStore, isWithinBoundaries, getNearestHotspot } from '@/lib/game-engine'
import Character from './Character'
import Hotspot from './Hotspot'
import DialogueBox from './DialogueBox'
import HistoricalContext from './HistoricalContext'

const MOVEMENT_SPEED = 5

// Game control keys
const GAME_CONTROL_KEYS = ['w', 'a', 's', 'd', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

export default function Scene() {
  const currentScene = useGameStore((state) => state.currentScene)
  const playerState = useGameStore((state) => state.playerState)
  const updatePlayerPosition = useGameStore((state) => state.updatePlayerPosition)
  const setPlayerMoving = useGameStore((state) => state.setPlayerMoving)
  const setActiveDialogue = useGameStore((state) => state.setActiveDialogue)
  const activeDialogueId = useGameStore((state) => state.activeDialogueId)
  const toggleHistoricalContext = useGameStore((state) => state.toggleHistoricalContext)
  const toggleMenu = useGameStore((state) => state.toggleMenu)
  const isPaused = useGameStore((state) => state.isPaused)
  const discoverHotspot = useGameStore((state) => state.discoverHotspot)

  const keysPressed = useRef<Set<string>>(new Set())
  const animationFrameId = useRef<number | null>(null)

  // Movement loop using requestAnimationFrame
  const gameLoop = useCallback(() => {
    if (!currentScene || isPaused || activeDialogueId) {
      animationFrameId.current = requestAnimationFrame(gameLoop)
      return
    }

    const keys = keysPressed.current
    let newX = playerState.position.x
    let newY = playerState.position.y
    let moving = false
    let direction: 'up' | 'down' | 'left' | 'right' | 'idle' = 'idle'

    // Handle movement keys
    if (keys.has('w') || keys.has('ArrowUp')) {
      newY -= MOVEMENT_SPEED
      moving = true
      direction = 'up'
    }
    if (keys.has('s') || keys.has('ArrowDown')) {
      newY += MOVEMENT_SPEED
      moving = true
      direction = 'down'
    }
    if (keys.has('a') || keys.has('ArrowLeft')) {
      newX -= MOVEMENT_SPEED
      moving = true
      direction = 'left'
    }
    if (keys.has('d') || keys.has('ArrowRight')) {
      newX += MOVEMENT_SPEED
      moving = true
      direction = 'right'
    }

    // Check boundaries
    const newPosition = { x: newX, y: newY }
    if (moving && isWithinBoundaries(newPosition, currentScene)) {
      updatePlayerPosition(newPosition)
      setPlayerMoving(true, direction)

      // Check for nearby hotspots
      const nearestHotspot = getNearestHotspot(newPosition, currentScene.hotspots)
      if (nearestHotspot) {
        // Auto-discover when near
        discoverHotspot(nearestHotspot.id)
      }
    } else {
      setPlayerMoving(false)
    }

    animationFrameId.current = requestAnimationFrame(gameLoop)
  }, [
    currentScene,
    playerState.position,
    isPaused,
    activeDialogueId,
    updatePlayerPosition,
    setPlayerMoving,
    discoverHotspot,
  ])

  // Keyboard event handlers
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()

      // Prevent default for game keys
      if (GAME_CONTROL_KEYS.includes(key)) {
        e.preventDefault()
      }

      // Add to pressed keys
      keysPressed.current.add(key)

      // Handle special keys
      if (key === 'h' && !activeDialogueId) {
        toggleHistoricalContext()
      }
      if (key === 'escape') {
        if (activeDialogueId) {
          setActiveDialogue(null)
        } else {
          toggleMenu()
        }
      }
      if (key === 'e' && currentScene && !activeDialogueId) {
        const nearestHotspot = getNearestHotspot(playerState.position, currentScene.hotspots)
        if (nearestHotspot && nearestHotspot.dialogueId) {
          discoverHotspot(nearestHotspot.id)
          setActiveDialogue(nearestHotspot.dialogueId)
        }
      }
    },
    [
      activeDialogueId,
      toggleHistoricalContext,
      toggleMenu,
      setActiveDialogue,
      currentScene,
      playerState.position,
      discoverHotspot,
    ]
  )

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    keysPressed.current.delete(e.key.toLowerCase())
  }, [])

  // Set up keyboard listeners and game loop
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    // Start game loop
    animationFrameId.current = requestAnimationFrame(gameLoop)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [handleKeyDown, handleKeyUp, gameLoop])

  if (!currentScene) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">📖</div>
          <div className="text-xl">Loading scene...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="game-container relative w-full h-screen overflow-hidden bg-gradient-to-b from-sky-300 to-green-200">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${currentScene.backgroundImage})`,
          backgroundColor: '#8FB5A6',
        }}
      />

      {/* Ground/Scene area */}
      <div className="absolute inset-0">
        {/* Render hotspots */}
        {currentScene.hotspots.map((hotspot) => (
          <Hotspot key={hotspot.id} hotspot={hotspot} />
        ))}

        {/* Render character */}
        <Character />
      </div>

      {/* UI Overlays */}
      <DialogueBox />
      <HistoricalContext />

      {/* Controls hint */}
      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
        <div className="font-semibold mb-1">Controls:</div>
        <div>WASD / Arrow Keys - Move</div>
        <div>E - Interact with nearby objects</div>
        <div>H - Historical Context</div>
        <div>ESC - Menu</div>
      </div>

      {/* Scene info */}
      <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg">
        <div className="font-semibold">{currentScene.name}</div>
        <div className="text-sm text-gray-300">
          {currentScene.book} {currentScene.chapter}
        </div>
      </div>
    </div>
  )
}
