# Hi Yahweh 📖

An interactive narrative game where you walk through biblical Scripture as a character, experiencing exegesis through gameplay, dialogue, and historical context.

## ✨ Features

- **Interactive Gameplay**: Navigate biblical scenes using WASD or arrow keys
- **Character Movement System**: Smooth animations and collision detection
- **Scripture Integration**: Read and interact with biblical text (Genesis 2-3 included)
- **Historical Context**: Toggle overlay (press 'H') to view time period, location, cultural context, and archaeological notes
- **Dialogue System**: Engage with biblical characters and examine interactive elements
- **Beautiful UI**: Ancient, reverent aesthetic with parchment-style backgrounds and serif typography
- **Responsive Design**: Works on desktop and tablet devices
- **Progress Tracking**: Save your discoveries using localStorage

## 🎮 First Playable Scene: Garden of Eden

Experience Genesis 2-3 through interactive gameplay:
- Walk through the Garden of Eden
- Interact with the Tree of Knowledge
- Speak with Adam about God's commandments
- Examine the river and other environmental details
- Read scripture verses in context as you explore

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Custom shadcn/ui components
- **State Management**: Zustand with localStorage persistence
- **Fonts**: Google Fonts (Inter + Crimson Text)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation (Mac)

1. **Clone the repository**
   ```bash
   git clone https://github.com/kamrantrea/hi-yahweh.git
   cd hi-yahweh
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

5. **Start your journey!**
   
   Click "Begin Journey" to enter the Garden of Eden

## 🎯 Controls

| Key | Action |
|-----|--------|
| **W / ↑** | Move Up |
| **A / ←** | Move Left |
| **S / ↓** | Move Down |
| **D / →** | Move Right |
| **E** | Interact with nearby objects/characters |
| **H** | Toggle Historical Context overlay |
| **ESC** | Open/Close Menu (or close dialogue) |

## 📁 Project Structure

```
/app
  /page.tsx              # Landing page with "Begin Journey"
  /game/page.tsx         # Main game view
  /layout.tsx            # Root layout with fonts
  /globals.css           # Global styles and animations
/components
  /game
    /Character.tsx       # Player character with movement
    /Scene.tsx           # Scene container and game loop
    /DialogueBox.tsx     # Scripture & dialogue display
    /HistoricalContext.tsx # Historical info overlay
    /Hotspot.tsx         # Interactive scene elements
  /ui                    # Reusable UI components
    /button.tsx
    /card.tsx
/lib
  /game-engine.ts        # Game state management (Zustand)
  /scripture-data.ts     # Bible text data structures
  /scenes-data.ts        # Scene configurations
  /utils.ts              # Utility functions
/public
  /assets
    /characters          # Character sprites (placeholder)
    /backgrounds         # Scene backgrounds (placeholder)
    /audio               # Music and sound effects (future)
```

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

## 🎨 Adding New Content

### Adding a New Scene

1. Create a new scene object in `/lib/scenes-data.ts`:
   ```typescript
   export const myNewScene: Scene = {
     id: 'my-scene',
     name: 'My Scene',
     book: 'Genesis',
     chapter: 4,
     // ... configure hotspots, dialogues, etc.
   }
   ```

2. Add it to the `availableScenes` array

### Adding New Scripture

Add scripture data to `/lib/scripture-data.ts`:
```typescript
{
  book: 'Genesis',
  chapter: 4,
  verse: 1,
  text: 'Your scripture text here',
  translation: 'KJV',
}
```

### Adding a New Hotspot

In your scene configuration:
```typescript
hotspots: [
  {
    id: 'my-hotspot',
    name: 'Interactive Element',
    position: { x: 400, y: 300 },
    radius: 60,
    type: 'object',
    dialogueId: 'my-dialogue-1',
    description: 'Description here',
    icon: '🌟',
  }
]
```

## 🖼️ Assets

Currently using placeholder backgrounds and emoji-based graphics. To add custom art:

1. Place images in `/public/assets/backgrounds/` or `/public/assets/characters/`
2. Update the `backgroundImage` property in scene configurations
3. Replace emoji icons in `Hotspot` components with custom sprites

## 🔮 Future Roadmap

- [ ] More biblical scenes (Exodus, David & Goliath, Sermon on the Mount, etc.)
- [ ] API integration for multiple Bible translations (API.Bible, STEPBible)
- [ ] Audio/music system with ambient sounds
- [ ] Achievement and progress system
- [ ] Cloud save integration (Prisma + PostgreSQL)
- [ ] Multiplayer exploration
- [ ] Mobile support with touch controls
- [ ] Character customization
- [ ] More detailed sprite-based graphics
- [ ] Narrator voice-over option
- [ ] Cross-reference linking system
- [ ] Study notes and commentaries

## 🧪 Performance

Optimized for:
- Mac: 2.6 GHz i7, 16GB RAM, Radeon Pro 555X
- 60fps smooth animations
- Efficient rendering with React optimization
- Lazy loading for future asset-heavy scenes

## 📚 Educational Goals

**Hi Yahweh** aims to make biblical exegesis:
- **Engaging**: Learn through interactive exploration
- **Contextual**: Understand historical and cultural background
- **Accessible**: Welcoming to all knowledge levels
- **Reverent**: Respectful of sacred text

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome! Feel free to:
- Open issues for bugs or feature requests
- Submit pull requests for improvements
- Share ideas for new scenes or features

## 📄 License

ISC License - See LICENSE file for details

## 🙏 Acknowledgments

- Scripture text from the King James Version (KJV) - Public Domain
- Built with love and reverence for God's Word
- Special thanks to the Next.js and React communities

## 📬 Contact

For questions or feedback, please open an issue on GitHub.

---

*"Thy word is a lamp unto my feet, and a light unto my path." — Psalm 119:105 (KJV)*