# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Local Development Server:**
```bash
python3 -m http.server 8000
# Then visit http://localhost:8000
```

**File Structure:**
- No build process - direct file editing and browser refresh
- Uses ES6 modules with dynamic imports
- All paths are relative for GitHub Pages compatibility

## Architecture Overview

This is a Halloween-themed minigames collection built with vanilla HTML/CSS/JavaScript using a modular game system.

**Core Architecture:**
- `HalloweenGames` class in `main.js` serves as the main application controller
- Individual games are ES6 modules in `js/games/` that export default classes
- Games are dynamically imported and instantiated at runtime
- Three-panel layout: left nav (game info), center (game content), right nav (game selection)

**Game Module Interface:**
Each game module must export a default class with these methods:
- `constructor()` - Initialize game state
- `render()` - Return HTML string for game content
- `start()` - Called when game becomes active
- `stop()` - Called when switching away from game
- `getScore()` - Return current score

**Game Registration:**
To add new games, update three places in `main.js`:
1. Add to `gameIds` array in `loadGames()`
2. Add name to `gameNames` object
3. Add description to `gameDescriptions` object

**UI Updates:**
- Games communicate with main app via global `window.gameApp` reference
- Score updates: `window.gameApp.updateScore(newScore)`
- UI elements: `#current-game-name`, `#current-score`, `#game-description`

**Styling:**
- CSS Grid layout for the main 1280x720 game area
- Halloween theme with CSS custom properties and animations
- Responsive design with mobile breakpoints

**Key Implementation Notes:**
- Games use fallback system if modules fail to load
- Dynamic HTML injection via `innerHTML` for game content
- Event delegation for game switching in right navigation
- No external dependencies - pure vanilla JavaScript