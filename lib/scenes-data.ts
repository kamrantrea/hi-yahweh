/**
 * Scene Data Types and Configuration
 * Defines the structure for game scenes, hotspots, and historical context
 */

import { ScriptureRange } from './scripture-data'

export interface Position {
  x: number
  y: number
}

export interface HistoricalContext {
  timePeriod: string
  location: string
  culturalContext: string
  archaeologicalNotes?: string
  concurrentEvents?: string
}

export interface DialogueOption {
  text: string
  nextDialogueId?: string
  action?: string
}

export interface Dialogue {
  id: string
  speaker: string
  text: string
  scriptureRef?: {
    book: string
    chapter: number
    verse: number
  }
  options?: DialogueOption[]
}

export interface Hotspot {
  id: string
  name: string
  position: Position
  radius: number // Interaction radius in pixels
  type: 'character' | 'object' | 'environment'
  dialogueId?: string
  description: string
  icon?: string
}

export interface Scene {
  id: string
  name: string
  book: string
  chapter: number
  backgroundImage: string
  spawnPoint: Position
  boundaries: {
    minX: number
    maxX: number
    minY: number
    maxY: number
  }
  hotspots: Hotspot[]
  dialogues: Dialogue[]
  historicalContext: HistoricalContext
  scriptureRanges?: ScriptureRange[]
}

/**
 * Garden of Eden Scene - First Playable Scene
 */
export const gardenOfEdenScene: Scene = {
  id: 'garden-of-eden',
  name: 'Garden of Eden',
  book: 'Genesis',
  chapter: 2,
  backgroundImage: '/assets/backgrounds/garden-of-eden.jpg',
  spawnPoint: { x: 100, y: 300 },
  boundaries: {
    minX: 50,
    maxX: 750,
    minY: 200,
    maxY: 450,
  },
  hotspots: [
    {
      id: 'tree-of-knowledge',
      name: 'Tree of Knowledge',
      position: { x: 600, y: 280 },
      radius: 60,
      type: 'object',
      dialogueId: 'tree-of-knowledge-1',
      description: 'A magnificent tree bearing fruit of knowledge',
      icon: '🌳',
    },
    {
      id: 'adam',
      name: 'Adam',
      position: { x: 300, y: 320 },
      radius: 50,
      type: 'character',
      dialogueId: 'adam-1',
      description: 'The first man, tending the garden',
      icon: '👤',
    },
    {
      id: 'river',
      name: 'River',
      position: { x: 150, y: 400 },
      radius: 50,
      type: 'environment',
      dialogueId: 'river-1',
      description: 'A clear river flowing through Eden',
      icon: '💧',
    },
  ],
  dialogues: [
    {
      id: 'tree-of-knowledge-1',
      speaker: 'Narrator',
      text: 'Before you stands the Tree of Knowledge of Good and Evil. God commanded that Adam should not eat from this tree.',
      scriptureRef: {
        book: 'Genesis',
        chapter: 2,
        verse: 17,
      },
      options: [
        {
          text: 'Examine the tree closely',
          nextDialogueId: 'tree-of-knowledge-2',
        },
        {
          text: 'Step back',
          action: 'close',
        },
      ],
    },
    {
      id: 'tree-of-knowledge-2',
      speaker: 'Narrator',
      text: 'The tree is beautiful, pleasant to the eyes, and desirable for gaining wisdom. Yet God\'s command remains: "thou shalt not eat of it: for in the day that thou eatest thereof thou shalt surely die."',
      scriptureRef: {
        book: 'Genesis',
        chapter: 2,
        verse: 17,
      },
      options: [
        {
          text: 'Continue',
          action: 'close',
        },
      ],
    },
    {
      id: 'adam-1',
      speaker: 'Adam',
      text: 'Welcome, traveler. I tend this garden, which the LORD God has given me to dress and keep. It is a place of peace and provision.',
      scriptureRef: {
        book: 'Genesis',
        chapter: 2,
        verse: 15,
      },
      options: [
        {
          text: 'Tell me about the garden',
          nextDialogueId: 'adam-2',
        },
        {
          text: 'Farewell',
          action: 'close',
        },
      ],
    },
    {
      id: 'adam-2',
      speaker: 'Adam',
      text: 'The LORD has blessed this place with every tree pleasant to sight and good for food. I may freely eat of them all, save one - the tree of knowledge of good and evil.',
      scriptureRef: {
        book: 'Genesis',
        chapter: 2,
        verse: 9,
      },
      options: [
        {
          text: 'Why not that tree?',
          nextDialogueId: 'adam-3',
        },
        {
          text: 'Thank you',
          action: 'close',
        },
      ],
    },
    {
      id: 'adam-3',
      speaker: 'Adam',
      text: 'The LORD God commanded me: in the day I eat of it, I shall surely die. His word is sufficient for me.',
      scriptureRef: {
        book: 'Genesis',
        chapter: 2,
        verse: 17,
      },
      options: [
        {
          text: 'Wise words',
          action: 'close',
        },
      ],
    },
    {
      id: 'river-1',
      speaker: 'Narrator',
      text: 'A river flows through Eden, watering the garden. Its waters are clear and life-giving, representing the abundance of God\'s provision in this perfect place.',
      options: [
        {
          text: 'Observe the water',
          nextDialogueId: 'river-2',
        },
        {
          text: 'Move on',
          action: 'close',
        },
      ],
    },
    {
      id: 'river-2',
      speaker: 'Narrator',
      text: 'The river represents life itself - pure, constant, and essential. In this paradise, every need is met, every thirst quenched.',
      options: [
        {
          text: 'Continue',
          action: 'close',
        },
      ],
    },
  ],
  historicalContext: {
    timePeriod: 'Primordial Period (~4000 BCE in traditional chronology)',
    location: 'Eden - likely Mesopotamian region between the Tigris and Euphrates rivers',
    culturalContext:
      'The Garden of Eden represents the perfect state of humanity before the Fall. This narrative establishes foundational themes of creation, divine providence, human responsibility, and the consequences of disobedience.',
    archaeologicalNotes:
      'While the exact location of Eden remains debated, many scholars associate it with ancient Mesopotamia. The description of four rivers (Genesis 2:10-14) suggests a real geographical location known to the original audience.',
    concurrentEvents:
      'According to biblical chronology, this represents the beginning of human history. Archaeological evidence shows early human civilization developing in Mesopotamia around this general time period.',
  },
}

/**
 * Available scenes - can be expanded with more biblical locations
 */
export const availableScenes: Scene[] = [gardenOfEdenScene]

/**
 * Get scene by ID
 */
export function getSceneById(id: string): Scene | undefined {
  return availableScenes.find((scene) => scene.id === id)
}
