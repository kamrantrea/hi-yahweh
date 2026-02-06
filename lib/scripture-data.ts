/**
 * Scripture Data Types and Sample Data
 * Structure designed to support multiple translations and original language references
 */

export interface Scripture {
  book: string
  chapter: number
  verse: number
  text: string
  translation: string // "KJV", "NET", etc.
  originalLanguage?: {
    text: string
    language: 'Hebrew' | 'Greek'
    transliteration?: string
  }
}

export interface ScriptureRange {
  book: string
  chapter: number
  startVerse: number
  endVerse: number
  scriptures: Scripture[]
}

/**
 * Sample Genesis 2-3 scripture data (KJV)
 * This is embedded data that can later be replaced with API calls
 */
export const genesisScriptures: ScriptureRange[] = [
  {
    book: 'Genesis',
    chapter: 2,
    startVerse: 8,
    endVerse: 9,
    scriptures: [
      {
        book: 'Genesis',
        chapter: 2,
        verse: 8,
        text: 'And the LORD God planted a garden eastward in Eden; and there he put the man whom he had formed.',
        translation: 'KJV',
      },
      {
        book: 'Genesis',
        chapter: 2,
        verse: 9,
        text: 'And out of the ground made the LORD God to grow every tree that is pleasant to the sight, and good for food; the tree of life also in the midst of the garden, and the tree of knowledge of good and evil.',
        translation: 'KJV',
        originalLanguage: {
          text: 'עֵץ הַדַּעַת טוֹב וָרָע',
          language: 'Hebrew',
          transliteration: 'etz hada\'at tov vara',
        },
      },
    ],
  },
  {
    book: 'Genesis',
    chapter: 2,
    startVerse: 15,
    endVerse: 17,
    scriptures: [
      {
        book: 'Genesis',
        chapter: 2,
        verse: 15,
        text: 'And the LORD God took the man, and put him into the garden of Eden to dress it and to keep it.',
        translation: 'KJV',
      },
      {
        book: 'Genesis',
        chapter: 2,
        verse: 16,
        text: 'And the LORD God commanded the man, saying, Of every tree of the garden thou mayest freely eat:',
        translation: 'KJV',
      },
      {
        book: 'Genesis',
        chapter: 2,
        verse: 17,
        text: 'But of the tree of the knowledge of good and evil, thou shalt not eat of it: for in the day that thou eatest thereof thou shalt surely die.',
        translation: 'KJV',
      },
    ],
  },
  {
    book: 'Genesis',
    chapter: 3,
    startVerse: 1,
    endVerse: 6,
    scriptures: [
      {
        book: 'Genesis',
        chapter: 3,
        verse: 1,
        text: 'Now the serpent was more subtil than any beast of the field which the LORD God had made. And he said unto the woman, Yea, hath God said, Ye shall not eat of every tree of the garden?',
        translation: 'KJV',
      },
      {
        book: 'Genesis',
        chapter: 3,
        verse: 2,
        text: 'And the woman said unto the serpent, We may eat of the fruit of the trees of the garden:',
        translation: 'KJV',
      },
      {
        book: 'Genesis',
        chapter: 3,
        verse: 3,
        text: 'But of the fruit of the tree which is in the midst of the garden, God hath said, Ye shall not eat of it, neither shall ye touch it, lest ye die.',
        translation: 'KJV',
      },
      {
        book: 'Genesis',
        chapter: 3,
        verse: 6,
        text: 'And when the woman saw that the tree was good for food, and that it was pleasant to the eyes, and a tree to be desired to make one wise, she took of the fruit thereof, and did eat, and gave also unto her husband with her; and he did eat.',
        translation: 'KJV',
      },
    ],
  },
]

/**
 * Helper function to get scripture text by reference
 */
export function getScriptureByReference(
  book: string,
  chapter: number,
  verse: number
): Scripture | undefined {
  for (const range of genesisScriptures) {
    if (range.book === book && range.chapter === chapter) {
      return range.scriptures.find((s) => s.verse === verse)
    }
  }
  return undefined
}

/**
 * Helper function to get scripture range
 */
export function getScriptureRange(
  book: string,
  chapter: number,
  startVerse: number,
  endVerse: number
): Scripture[] {
  for (const range of genesisScriptures) {
    if (range.book === book && range.chapter === chapter) {
      return range.scriptures.filter((s) => s.verse >= startVerse && s.verse <= endVerse)
    }
  }
  return []
}
