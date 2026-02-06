/**
 * DialogueBox Component
 * Displays scripture text and dialogue with character interactions
 */

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/lib/game-engine'
import { getScriptureByReference } from '@/lib/scripture-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function DialogueBox() {
  const currentScene = useGameStore((state) => state.currentScene)
  const activeDialogueId = useGameStore((state) => state.activeDialogueId)
  const setActiveDialogue = useGameStore((state) => state.setActiveDialogue)
  const completeDialogue = useGameStore((state) => state.completeDialogue)

  if (!activeDialogueId || !currentScene) return null

  const dialogue = currentScene.dialogues.find((d) => d.id === activeDialogueId)
  if (!dialogue) return null

  // Get scripture reference if available
  const scripture = dialogue.scriptureRef
    ? getScriptureByReference(
        dialogue.scriptureRef.book,
        dialogue.scriptureRef.chapter,
        dialogue.scriptureRef.verse
      )
    : null

  const handleOptionClick = (action?: string, nextDialogueId?: string) => {
    if (action === 'close') {
      completeDialogue(activeDialogueId)
      setActiveDialogue(null)
    } else if (nextDialogueId) {
      completeDialogue(activeDialogueId)
      setActiveDialogue(nextDialogueId)
    }
  }

  return (
    <AnimatePresence>
      {activeDialogueId && (
        <motion.div
          className="fixed inset-0 z-40 flex items-end justify-center pb-8 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => handleOptionClick('close')}
          />

          {/* Dialogue Card */}
          <motion.div
            className="relative w-full max-w-3xl"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <Card className="parchment-bg border-2 border-amber-900/50 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-amber-900 font-serif flex items-center justify-between">
                  <span>{dialogue.speaker}</span>
                  {scripture && (
                    <span className="text-sm text-amber-700">
                      {scripture.book} {scripture.chapter}:{scripture.verse}
                    </span>
                  )}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Dialogue text */}
                <div className="scripture-text text-amber-950">
                  {dialogue.text}
                </div>

                {/* Scripture text if available */}
                {scripture && (
                  <div className="border-l-4 border-amber-600 pl-4 italic">
                    <div className="scripture-text text-amber-900">
                      &ldquo;{scripture.text}&rdquo;
                    </div>
                    <div className="text-sm text-amber-700 mt-2">
                      — {scripture.translation}
                    </div>
                    {scripture.originalLanguage && (
                      <div className="text-sm text-amber-600 mt-1">
                        <span className="font-semibold">Original {scripture.originalLanguage.language}:</span>{' '}
                        {scripture.originalLanguage.text}
                        {scripture.originalLanguage.transliteration && (
                          <span className="ml-2 text-amber-700">
                            ({scripture.originalLanguage.transliteration})
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex flex-wrap gap-2">
                {dialogue.options?.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleOptionClick(option.action, option.nextDialogueId)}
                    variant={index === 0 ? 'default' : 'outline'}
                    className="bg-amber-700 hover:bg-amber-800 text-white"
                  >
                    {option.text}
                  </Button>
                ))}
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
