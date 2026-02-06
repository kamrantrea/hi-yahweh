/**
 * Landing Page
 * Welcome screen with "Begin Journey" button
 */

'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  const router = useRouter()

  const handleBeginJourney = () => {
    router.push('/game')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        <Card className="parchment-bg border-4 border-amber-900/30 shadow-2xl">
          <CardHeader className="text-center space-y-4 pb-4">
            {/* Icon/Logo */}
            <motion.div
              className="text-8xl"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              📖
            </motion.div>

            {/* Title */}
            <div>
              <CardTitle className="text-5xl font-serif text-amber-900 mb-2">
                Hi Yahweh
              </CardTitle>
              <CardDescription className="text-xl text-amber-800">
                An Interactive Biblical Narrative Experience
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Description */}
            <div className="text-center space-y-4">
              <p className="text-lg text-amber-950 leading-relaxed font-serif">
                Walk through Scripture and experience biblical exegesis through interactive
                gameplay. Explore ancient scenes, interact with biblical characters, and discover
                the historical and cultural context of God&apos;s Word.
              </p>

              <div className="grid md:grid-cols-3 gap-4 text-amber-900 py-4">
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-2">🚶</div>
                  <div className="font-semibold">Explore</div>
                  <div className="text-sm text-amber-700">Navigate biblical scenes</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-2">💬</div>
                  <div className="font-semibold">Interact</div>
                  <div className="text-sm text-amber-700">Engage with scripture</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-2">📚</div>
                  <div className="font-semibold">Learn</div>
                  <div className="text-sm text-amber-700">Discover context & history</div>
                </div>
              </div>
            </div>

            {/* Begin Button */}
            <div className="flex flex-col items-center gap-4 pt-4">
              <Button
                onClick={handleBeginJourney}
                size="lg"
                className="text-xl px-12 py-6 bg-amber-700 hover:bg-amber-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Begin Journey
              </Button>

              <p className="text-sm text-amber-700 text-center">
                Experience the Garden of Eden • Genesis 2-3
              </p>
            </div>

            {/* Footer note */}
            <div className="pt-6 border-t border-amber-900/20 text-center">
              <p className="text-sm text-amber-700 italic">
                &ldquo;Thy word is a lamp unto my feet, and a light unto my path.&rdquo;
              </p>
              <p className="text-xs text-amber-600 mt-1">— Psalm 119:105 (KJV)</p>
            </div>
          </CardContent>
        </Card>

        {/* Credits */}
        <motion.div
          className="text-center mt-8 text-amber-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm">
            Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion
          </p>
        </motion.div>
      </motion.div>
    </main>
  )
}
