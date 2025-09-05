# Halloween Minigames - Project Specifications

## Project Overview

**Total Project Size:** 196KB  
**Source Files:** 12 files (HTML, CSS, JavaScript, markdown)  
**Architecture:** Vanilla HTML/CSS/JavaScript with ES6 modules  
**Target Platform:** Web browsers (GitHub Pages compatible)  

## Overall Structure & Size

### Directory Structure
```
/mnt/d/dev/projects/halloween/
├── index.html              (84 lines)
├── css/styles.css          (276 lines)
├── js/
│   ├── main.js             (197 lines)
│   └── games/
│       ├── game-0.js       (31 lines)  - Title Screen
│       ├── game-1.js       (291 lines) - Find the Pumpkin
│       ├── candy-swap.js   (512 lines) - Candy Swap
│       ├── game-3.js       (75 lines)  - Spider Web
│       ├── game-4.js       (75 lines)  - Bat Cave
│       └── game-5.js       (74 lines)  - Witch's Brew
├── designs/
└── backup files (.backup, .backup2)
```

**Total JavaScript Code:** 1,057 lines across all game modules  
**Main Application:** 197 lines (HalloweenGames class)  
**Core Styling:** 276 lines CSS  

## Screen Layout & Fixed Dimensions

### Main Game Area (Fixed Layout)
- **Total Size:** 1280px × 720px (completely fixed, not responsive)
- **Position:** Absolute center of viewport using transform: translate(-50%, -50%)
- **Border:** 3px solid #ff6600 (orange)
- **Border Radius:** 15px
- **Background:** Dark gradient with Halloween theme colors

### Three-Panel Layout with Sliding Panel System
**Updated Layout System:** Converted from CSS Grid to absolute positioning with intelligent sliding panel.

#### Left Navigation Panel
- **Position:** absolute at (0, 0)
- **Width:** 250px (fixed)
- **Height:** 720px (fixed - full game area height)
- **Content:**
  - Game title: "🎃 Halloween Games"
  - Current game name display
  - Score display section
  - Game description area
- **Background:** Linear gradient (#3d2817 to #2a1810)
- **Border:** 2px solid #ff6600 (right border only)
- **Padding:** 20px

#### Center Game Area (Expanded)
- **Position:** absolute at (250px, 0)
- **Width:** 905px (expanded from 780px for maximum game space)
- **Height:** 720px (full game area height)
- **Available Game Space:** **905px × 720px** at position (0,0)
- **Content:** Dynamic game content rendered via innerHTML
- **Background:** Linear gradient (#1a1410 to #261a10)
- **Padding:** REMOVED - games have full access to 905×720 space
- **Border:** None - clean game area

#### Right Navigation Panel (Sliding System)
- **Base Position:** absolute at (1030px, 0)
- **Height:** 720px (fixed - full game area height)
- **Background:** Linear gradient (#3d2817 to #2a1810)
- **Border:** 2px solid #ff6600 (left border only)
- **Transition:** Smooth 0.4s cubic-bezier easing

**Expanded State (250px):**
- Width: 250px
- Position: (1030px, 0) - overlays rightmost 125px of game
- Padding: 20px
- Content: Full game names with icons, Games header with icon
- Shadow: Subtle drop shadow when overlaying

**Collapsed State (125px):**
- Width: 125px  
- Position: (1155px, 0) - no game overlay
- Padding: 20px 10px (reduced horizontal padding)
- Content: Icons only (centered), Games text only (no icon)
- Shadow: None

**Panel Controls:**
- Toggle button with directional arrows
- Auto-collapse when games start (except title screen)
- Auto-expand when title screen selected
- Manual toggle always available
- State persisted in localStorage

### Element Sizing Details

#### Game List Items
- **Padding:** 15px
- **Height:** Auto (approximately 50px per item)
- **Icon Size:** 1.5em (approximately 24px)
- **Icon Width:** 30px (text-align: center)

#### Score Display
- **Font Size:** 1.4em for score numbers
- **Layout:** Flexbox justify-content: space-between

#### Game Content Area
- **Available Space:** **905px × 720px** (full expanded center panel - no padding)
- **Positioning:** Absolute positioning for games at (0,0)
- **Display:** Flex center alignment for smaller games
- **Flexibility:** Games can use full space or center themselves if smaller
- **Panel Interaction:** Right panel may overlay rightmost 125px when expanded

## Minigames Implementation

### 1. Title Screen (game-0.js)
- **Size:** 31 lines
- **Type:** Static welcome screen
- **Features:**
  - Welcome message
  - Animated Halloween decorations (floating emoji)
  - CSS animations with staggered delays
- **Score:** Always 0

### 2. Find the Pumpkin (game-1.js)
- **Size:** 291 lines  
- **Type:** Interactive movement game
- **Features:**
  - WASD keyboard controls
  - Animated pumpkin sprite (100px × 100px)
  - Real-time position tracking
  - Move counter scoring system
  - Boundary detection (game area limits)
  - Detailed carved pumpkin graphics using CSS
- **Game Area Bounds (Updated for 905×720):**
  - minX: 0, maxX: 805px (905px - 100px pumpkin width)
  - minY: 0, maxY: 620px (720px - 100px pumpkin height)
  - Starting position: (402, 310) - centered in 905×720 area
- **Movement:** 20px increments per keypress

### 3. Candy Swap (candy-swap.js) 
- **Size:** 512 lines (largest game)
- **Type:** Complex trading simulation
- **Features:**
  - 25+ candy types with attributes and values
  - AI friend system with personalities
  - Preference-based trading algorithm
  - Multiple game rounds
  - Scoring based on collection value
  - Friend reroll system
- **Complexity:** Most sophisticated game with extensive data structures

### 4. Spider Web (game-3.js)
- **Size:** 75 lines
- **Type:** Simple placeholder game
- **Features:**
  - Click interaction button
  - Random score generation
  - Web clearing counter
  - Emoji-based visual display
- **Status:** Placeholder implementation

### 5. Bat Cave (game-4.js)
- **Size:** 75 lines  
- **Type:** Simple placeholder game
- **Features:**
  - Treasure hunting theme
  - Click interaction button  
  - Random score generation
  - Treasure counter tracking
- **Status:** Placeholder implementation

### 6. Witch's Brew (game-5.js)
- **Size:** 74 lines
- **Type:** Simple placeholder game  
- **Features:**
  - Potion brewing theme
  - Click interaction button
  - Random score generation
  - Potion mixing counter
- **Status:** Placeholder implementation

### 7. Test Size (test-size.js)
- **Size:** 75+ lines
- **Type:** Development testing tool
- **Features:**
  - Visual dimension verification with 905×720px test image
  - Corner markers at (0,0), (904,0), (0,719), (904,719)
  - Grid pattern for precise positioning
  - Console logging of scroll detection
  - Real-time dimension reporting
  - Panel overlay testing functionality
- **Purpose:** Verify sliding panel system and maximum game area dimensions
- **Status:** Development tool - can be removed when all games are implemented

## Responsive Design Status

### Current Responsive Behavior
- **Main Container:** Uses `min-height: 100vh` for full viewport coverage
- **Game Area:** **COMPLETELY FIXED** at 1280×720px - no responsive scaling
- **Positioning:** Centered using absolute positioning with transform
- **Mobile Support:** **NONE** - fixed dimensions will overflow on smaller screens

### Non-Responsive Elements
- All game area dimensions are fixed pixels
- No media queries defined
- No viewport scaling implemented  
- No mobile breakpoints
- Text sizes are fixed (em units relative to fixed base)

### Design Philosophy
The application uses a **fixed game console approach** similar to retro gaming systems where the game area maintains consistent dimensions regardless of screen size. The surrounding browser area adapts with gradients and backgrounds, but the core 1280×720px game area remains constant.

## Technical Architecture

### Game Module Interface
Each game must implement:
- `constructor()` - Initialize game state
- `render()` - Return HTML string for display
- `start()` - Called when game becomes active  
- `stop()` - Called when switching games
- `getScore()` - Return current score value

### Dynamic Loading System
- Games loaded via ES6 dynamic imports: `import(\`./games/\${gameId}.js\`)`
- Fallback system for failed module loads
- Runtime game instantiation and management

### State Management
- Global `window.gameApp` reference for cross-component communication
- Individual game state managed within each module
- Score updates via `updateScore()` method

## File Organization Standards

### Naming Conventions
- Game files: `game-{number}.js` or descriptive names like `candy-swap.js`
- CSS classes: kebab-case (`game-item`, `left-nav`)
- JavaScript: camelCase variables and methods

### Code Standards  
- ES6 modules with default exports
- Vanilla JavaScript (no external dependencies)
- Inline CSS for game-specific styling
- Template literals for HTML generation

## Development Notes

### Current Branch Status
- **Active Branch:** `feature/sliding-panel`
- **Recent Work:** Added Find the Pumpkin game
- **Modified Files:** Multiple games and core files have pending changes

### Game Development Status
- **Completed:** Title Screen, Find the Pumpkin, Candy Swap (full implementations)
- **Placeholder:** Spider Web, Bat Cave, Witch's Brew (basic click interactions)
- **Architecture:** Fully functional modular system ready for game expansions

### Performance Characteristics
- **Startup:** Fast loading with dynamic imports
- **Memory:** Lightweight vanilla JS approach
- **Browser Support:** Modern browsers with ES6 module support
- **Network:** No external dependencies, fully self-contained