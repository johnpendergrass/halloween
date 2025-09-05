# Halloween Minigames - Technical Specifications

## Layout System Technical Details

### CSS Box Model Implementation

**Global Box-Sizing Configuration:**
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

**Critical Implication:** The 3px border on `.game-area` is included INSIDE the 1280×720px dimensions, not added to them.

### Game Area Container
```css
.game-area {
    width: 1280px;           /* External dimensions */
    height: 720px;           /* External dimensions */
    border: 3px solid #ff6600;  /* INSIDE the 1280x720 */
    /* Internal space: 1274x714 (1280-6, 720-6) */
}
```

### Absolute Positioning System

**Panel Positioning Logic:**
- All panels positioned relative to the `.game-area` container
- Coordinates start at (0,0) inside the border, not outside
- No gaps or overlaps between panels

```css
/* Left Panel */
.left-nav {
    position: absolute;
    left: 0;                 /* Against left edge */
    top: 0;                  /* Against top edge */
    width: 250px;            /* Includes 2px right border */
    height: 720px;           /* Full internal height */
}

/* Center Panel */
.center-game {
    position: absolute;
    left: 250px;             /* After left panel */
    top: 0;                  /* Against top edge */
    width: 780px;            /* 1280 - 250 - 250 */
    height: 720px;           /* Full internal height */
}

/* Right Panel */  
.right-nav {
    position: absolute;
    left: 1030px;            /* 250 + 780 = 1030 */
    top: 0;                  /* Against top edge */
    width: 250px;            /* Includes 2px left border */
    height: 720px;           /* Full internal height */
}
```

## Game Content Positioning

### Maximum Game Dimensions
- **Available Space:** 780px × 720px
- **Position for Full-Size Games:** `left: 0; top: 0;`
- **No Padding Constraints:** Games have complete control over the space

### Centering Smaller Games

**Mathematical Formula for Centering:**
```javascript
// For a game with dimensions gameWidth × gameHeight
const centerX = (780 - gameWidth) / 2;
const centerY = (720 - gameHeight) / 2;

// Example: 600×500 game
const centerX = (780 - 600) / 2 = 90px;
const centerY = (720 - 500) / 2 = 110px;
```

**CSS Implementation Options:**
```css
/* Option 1: Absolute positioning with calculated offset */
.game-content {
    position: absolute;
    left: 90px;
    top: 110px;
    width: 600px;
    height: 500px;
}

/* Option 2: Relative positioning with margin auto */
.game-content {
    position: relative;
    width: 600px;
    height: 500px;
    margin: 110px auto 0;
}

/* Option 3: Flexbox centering (if parent maintains flex) */
/* Parent .center-game keeps: display: flex; align-items: center; justify-content: center; */
.game-content {
    width: 600px;
    height: 500px;
    /* Automatically centered by flexbox */
}
```

## Border and Visual Separation System

### Border Ownership Model
- **Left Panel:** Owns the right border (2px solid #ff6600)
- **Center Panel:** No borders - clean game space
- **Right Panel:** Owns the left border (2px solid #ff6600)
- **Game Area Container:** Owns the outer 3px border

### Visual Hierarchy
1. **Outer Border (3px):** Defines entire game area boundary
2. **Panel Borders (2px):** Create visual separation between functional areas
3. **Game Content:** Clean, borderless canvas for maximum creative space

## Dynamic Game Loading System

### ES6 Module Architecture
```javascript
// Dynamic import pattern
const module = await import(`./games/${gameId}.js`);
const gameInstance = new module.default();
```

### Game Interface Contract
Every game module must implement:
```javascript
export default class GameName {
    constructor() {
        this.name = 'Display Name';
        this.description = 'Game description';
        this.score = 0;
        this.isRunning = false;
    }
    
    render() {
        // Returns HTML string for game content
        return `<div>Game HTML</div>`;
    }
    
    start() {
        // Called when game becomes active
        this.isRunning = true;
    }
    
    stop() {
        // Called when switching away from game  
        this.isRunning = false;
    }
    
    getScore() {
        // Returns current score for UI display
        return this.score;
    }
}
```

### Fallback System
```javascript
// Automatic fallback for failed module loads
this.games[gameId] = this.createFallbackGame(gameId);
```

## Performance and Memory Considerations

### Game Lifecycle Management
- **Instantiation:** All games loaded at application start
- **Activation:** Only one game active at a time (`start()` method)
- **Deactivation:** Previous game stopped before switching (`stop()` method)
- **Memory:** Game instances persist (no destroy/recreate cycle)

### DOM Manipulation
- **Content Replacement:** `innerHTML` updates for game switching
- **Event Binding:** Games responsible for their own event management
- **Cleanup:** Games must clean up event listeners in `stop()` method

## Development Workflow Technical Notes

### Testing and Verification
- **Dimension Testing:** Use test images with exact pixel dimensions
- **Border Verification:** Visual inspection of panel boundaries
- **Console Logging:** Built-in dimension reporting for debugging

### File Organization Standards
```
js/
├── main.js                 # Core application controller
└── games/
    ├── game-0.js          # Title screen
    ├── game-1.js          # Find the Pumpkin  
    ├── candy-swap.js      # Complex games can use descriptive names
    ├── game-3.js          # Spider Web
    ├── game-4.js          # Bat Cave
    ├── game-5.js          # Witch's Brew
    └── test-size.js       # Development tools (temporary)
```

## Browser Compatibility and Constraints

### ES6 Module Support Requirements
- **Modern Browsers:** Chrome 61+, Firefox 60+, Safari 10.1+, Edge 16+
- **No Polyfills:** Direct ES6 module usage without build tools
- **Local Development:** Requires local server (not file:// protocol)

### CSS Feature Usage
- **CSS Grid:** Removed (was causing layout issues)
- **Absolute Positioning:** Universal browser support
- **CSS Custom Properties:** Used for theme colors
- **Flexbox:** Used selectively for content alignment

## Security and Best Practices

### Code Safety
- **No External Dependencies:** Self-contained vanilla JavaScript
- **No Remote Resources:** All assets served locally
- **Input Validation:** Games should validate user input
- **XSS Prevention:** Use textContent over innerHTML where possible

### Performance Guidelines
- **Efficient DOM Updates:** Batch DOM changes where possible
- **Event Management:** Use event delegation where appropriate
- **Memory Leaks:** Clean up intervals/timeouts in game `stop()` methods
- **Asset Loading:** Pre-load game assets to prevent loading delays

## Future Enhancement Considerations

### Responsive Design Implementation
```css
/* Future responsive breakpoints */
@media (max-width: 1280px) {
    .game-area {
        width: 100vw;
        height: 56.25vw; /* 16:9 aspect ratio */
    }
    /* Scale panel dimensions proportionally */
}
```

### Mobile Touch Support
- **Touch Events:** Add touch event handling for mobile devices
- **Viewport Meta Tag:** Add for proper mobile rendering
- **Gesture Support:** Consider swipe/pinch interactions

### Performance Optimization
- **Lazy Loading:** Load games only when first accessed
- **Asset Optimization:** Compress images and optimize CSS
- **Code Splitting:** Split large games into separate chunks

### Game Development Framework
- **Shared Utilities:** Create common game utilities (collision detection, etc.)
- **Animation Framework:** Standard animation system for games
- **Sound System:** Integrated audio management
- **Save/Load System:** Persistent game state management

---

**Technical Maintenance Notes:**
- Monitor console for dimension verification during development
- Test layout changes with the test-size game before implementing new features
- Maintain absolute positioning calculations when adding new UI elements
- Document any changes to the game interface contract