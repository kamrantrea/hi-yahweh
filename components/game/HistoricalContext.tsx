/**
 * HistoricalContext Component
 * Displays historical and cultural context overlay
 */

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/lib/game-engine'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function HistoricalContext() {
  const showHistoricalContext = useGameStore((state) => state.showHistoricalContext)
  const toggleHistoricalContext = useGameStore((state) => state.toggleHistoricalContext)
  const currentScene = useGameStore((state) => state.currentScene)

  if (!currentScene) return null

  const context = currentScene.historicalContext

  return (
    <AnimatePresence>
      {showHistoricalContext && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70"
            onClick={toggleHistoricalContext}
          />

          {/* Context Card */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <Card className="parchment-bg border-2 border-amber-900/50 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-amber-900 font-serif flex items-center justify-between">
                  <span>📜 Historical Context</span>
                  <Button
                    variant="ghost"
                    onClick={toggleHistoricalContext}
                    className="text-amber-900 hover:bg-amber-200"
                  >
                    ✕
                  </Button>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Scene Information */}
                <div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">
                    {currentScene.name}
                  </h3>
                  <p className="text-sm text-amber-700">
                    {currentScene.book} Chapter {currentScene.chapter}
                  </p>
                </div>

                {/* Time Period */}
                <div>
                  <h4 className="font-semibold text-amber-900 mb-1 flex items-center">
                    <span className="mr-2">🕰️</span>
                    Time Period
                  </h4>
                  <p className="text-amber-950 leading-relaxed">{context.timePeriod}</p>
                </div>

                {/* Location */}
                <div>
                  <h4 className="font-semibold text-amber-900 mb-1 flex items-center">
                    <span className="mr-2">🗺️</span>
                    Location
                  </h4>
                  <p className="text-amber-950 leading-relaxed">{context.location}</p>
                </div>

                {/* Cultural Context */}
                <div>
                  <h4 className="font-semibold text-amber-900 mb-1 flex items-center">
                    <span className="mr-2">📖</span>
                    Cultural Context
                  </h4>
                  <p className="text-amber-950 leading-relaxed">{context.culturalContext}</p>
                </div>

                {/* Archaeological Notes */}
                {context.archaeologicalNotes && (
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-1 flex items-center">
                      <span className="mr-2">⛏️</span>
                      Archaeological Notes
                    </h4>
                    <p className="text-amber-950 leading-relaxed">
                      {context.archaeologicalNotes}
                    </p>
                  </div>
                )}

                {/* Concurrent Events */}
                {context.concurrentEvents && (
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-1 flex items-center">
                      <span className="mr-2">🌍</span>
                      World Events
                    </h4>
                    <p className="text-amber-950 leading-relaxed">{context.concurrentEvents}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
