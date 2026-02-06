/**
 * Game Engine - State Management using Zustand
 * Handles game state, player position, discovered hotspots, and progress tracking
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Scene, Hotspot, Position } from './scenes-data'

export interface PlayerState {
  position: Position
  isMoving: boolean
  direction: 'up' | 'down' | 'left' | 'right' | 'idle'
}

export interface GameState {
  // Current scene and game state
  currentSceneId: string | null
  currentScene: Scene | null
  playerState: PlayerState
  
  // Dialogue and interaction state
  activeHotspotId: string | null
  activeDialogueId: string | null
  discoveredHotspots: Set<string>
  
  // UI state
  showHistoricalContext: boolean
  showMenu: boolean
  isPaused: boolean
  
  // Progress tracking
  visitedScenes: Set<string>
  completedDialogues: Set<string>
  
  // Actions
  setCurrentScene: (scene: Scene) => void
  updatePlayerPosition: (position: Position) => void
  setPlayerMoving: (isMoving: boolean, direction?: PlayerState['direction']) => void
  setActiveHotspot: (hotspotId: string | null) => void
  setActiveDialogue: (dialogueId: string | null) => void
  discoverHotspot: (hotspotId: string) => void
  completeDialogue: (dialogueId: string) => void
  toggleHistoricalContext: () => void
  toggleMenu: () => void
  setPaused: (isPaused: boolean) => void
  resetGame: () => void
}

const initialPlayerState: PlayerState = {
  position: { x: 100, y: 300 },
  isMoving: false,
  direction: 'idle',
}

/**
 * Main game store using Zustand with localStorage persistence
 */
export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentSceneId: null,
      currentScene: null,
      playerState: initialPlayerState,
      activeHotspotId: null,
      activeDialogueId: null,
      discoveredHotspots: new Set<string>(),
      showHistoricalContext: false,
      showMenu: false,
      isPaused: false,
      visitedScenes: new Set<string>(),
      completedDialogues: new Set<string>(),

      // Actions
      setCurrentScene: (scene: Scene) => {
        const visitedScenes = new Set(get().visitedScenes)
        visitedScenes.add(scene.id)
        
        set({
          currentSceneId: scene.id,
          currentScene: scene,
          playerState: {
            ...initialPlayerState,
            position: scene.spawnPoint,
          },
          visitedScenes,
        })
      },

      updatePlayerPosition: (position: Position) => {
        set((state) => ({
          playerState: {
            ...state.playerState,
            position,
          },
        }))
      },

      setPlayerMoving: (isMoving: boolean, direction = 'idle') => {
        set((state) => ({
          playerState: {
            ...state.playerState,
            isMoving,
            direction: isMoving ? direction : 'idle',
          },
        }))
      },

      setActiveHotspot: (hotspotId: string | null) => {
        set({ activeHotspotId: hotspotId })
      },

      setActiveDialogue: (dialogueId: string | null) => {
        set({ activeDialogueId: dialogueId })
      },

      discoverHotspot: (hotspotId: string) => {
        const discoveredHotspots = new Set(get().discoveredHotspots)
        discoveredHotspots.add(hotspotId)
        set({ discoveredHotspots })
      },

      completeDialogue: (dialogueId: string) => {
        const completedDialogues = new Set(get().completedDialogues)
        completedDialogues.add(dialogueId)
        set({ completedDialogues })
      },

      toggleHistoricalContext: () => {
        set((state) => ({
          showHistoricalContext: !state.showHistoricalContext,
        }))
      },

      toggleMenu: () => {
        set((state) => ({
          showMenu: !state.showMenu,
          isPaused: !state.showMenu,
        }))
      },

      setPaused: (isPaused: boolean) => {
        set({ isPaused })
      },

      resetGame: () => {
        set({
          currentSceneId: null,
          currentScene: null,
          playerState: initialPlayerState,
          activeHotspotId: null,
          activeDialogueId: null,
          discoveredHotspots: new Set<string>(),
          showHistoricalContext: false,
          showMenu: false,
          isPaused: false,
          visitedScenes: new Set<string>(),
          completedDialogues: new Set<string>(),
        })
      },
    }),
    {
      name: 'hi-yahweh-game-storage',
      // Custom serialization for Sets
      partialize: (state) => ({
        currentSceneId: state.currentSceneId,
        visitedScenes: Array.from(state.visitedScenes),
        discoveredHotspots: Array.from(state.discoveredHotspots),
        completedDialogues: Array.from(state.completedDialogues),
      }),
    }
  )
)

/**
 * Check if player is near a hotspot (within interaction radius)
 */
export function isNearHotspot(playerPos: Position, hotspot: Hotspot): boolean {
  const dx = playerPos.x - hotspot.position.x
  const dy = playerPos.y - hotspot.position.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  return distance <= hotspot.radius
}

/**
 * Check if position is within scene boundaries
 */
export function isWithinBoundaries(position: Position, scene: Scene): boolean {
  return (
    position.x >= scene.boundaries.minX &&
    position.x <= scene.boundaries.maxX &&
    position.y >= scene.boundaries.minY &&
    position.y <= scene.boundaries.maxY
  )
}

/**
 * Get the nearest hotspot to the player within interaction range
 */
export function getNearestHotspot(
  playerPos: Position,
  hotspots: Hotspot[]
): Hotspot | null {
  let nearest: Hotspot | null = null
  let minDistance = Infinity

  for (const hotspot of hotspots) {
    if (isNearHotspot(playerPos, hotspot)) {
      const dx = playerPos.x - hotspot.position.x
      const dy = playerPos.y - hotspot.position.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < minDistance) {
        minDistance = distance
        nearest = hotspot
      }
    }
  }

  return nearest
}
