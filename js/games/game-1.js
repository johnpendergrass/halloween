export default class FindPumpkin {
    constructor() {
        console.log('FindPumpkin constructor called');
        this.name = 'Find the Pumpkin';
        this.description = 'Use WASD keys to move the pumpkin around the screen!';
        this.score = 0;
        this.isRunning = false;
        
        // Pumpkin position (starting in center)
        this.pumpkinX = 402; // Center of game area (905px / 2 - 50px for pumpkin center)
        this.pumpkinY = 310; // Center of game area (720px / 2 - 50px for pumpkin center)
        
        // Movement settings
        this.moveDistance = 20;
        this.pumpkinSize = 100;
        
        // Game area boundaries (accounting for padding and pumpkin size)
        this.minX = 0;
        this.maxX = 805; // 905px - 100px pumpkin width
        this.minY = 0;
        this.maxY = 620; // 720px - 100px pumpkin height
        
        // Bind the keyboard handler to maintain 'this' context
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    render() {
        console.log('FindPumpkin render() called');
        return `
            <div class="game-screen" style="width: 100%; height: 100%; position: relative; overflow: hidden;">
                <h2 style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); margin: 0;">🎃 Find the Pumpkin 🎃</h2>
                <p style="position: absolute; top: 50px; left: 50%; transform: translateX(-50%); margin: 0;">Use WASD keys to move the pumpkin around!</p>
                
                <div style="position: absolute; top: 90px; left: 20px; color: #ffaa66; font-size: 1.1em;">
                    Moves: <span id="pumpkin-moves">${this.score}</span><br>
                    Position: (<span id="pumpkin-x">${Math.round(this.pumpkinX)}</span>, <span id="pumpkin-y">${Math.round(this.pumpkinY)}</span>)
                </div>
                
                <div style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); color: #cc9966; text-align: center;">
                    W = Up | A = Left | S = Down | D = Right
                </div>
                
                <div id="pumpkin" class="pumpkin-sprite" style="
                    position: absolute;
                    left: ${this.pumpkinX}px;
                    top: ${this.pumpkinY}px;
                    width: ${this.pumpkinSize}px;
                    height: ${this.pumpkinSize}px;
                    background: linear-gradient(135deg, #ff8c00 0%, #ff6600 50%, #cc5500 100%);
                    border-radius: 50%;
                    border: 3px solid #cc4400;
                    box-shadow: 
                        0 4px 8px rgba(0, 0, 0, 0.4),
                        inset 0 2px 4px rgba(255, 255, 255, 0.2);
                    transition: all 0.2s ease;
                    cursor: pointer;
                ">
                    <!-- Carved Eyes -->
                    <div style="
                        position: absolute;
                        left: 20px;
                        top: 25px;
                        width: 0;
                        height: 0;
                        border-left: 8px solid transparent;
                        border-right: 8px solid transparent;
                        border-bottom: 15px solid #000;
                    "></div>
                    <div style="
                        position: absolute;
                        right: 20px;
                        top: 25px;
                        width: 0;
                        height: 0;
                        border-left: 8px solid transparent;
                        border-right: 8px solid transparent;
                        border-bottom: 15px solid #000;
                    "></div>
                    
                    <!-- Carved Mouth -->
                    <div style="
                        position: absolute;
                        left: 50%;
                        top: 55px;
                        transform: translateX(-50%);
                        width: 40px;
                        height: 20px;
                        background: #000;
                        border-radius: 0 0 20px 20px;
                    ">
                        <!-- Jagged mouth teeth -->
                        <div style="position: absolute; left: 5px; top: -3px; width: 0; height: 0; border-left: 3px solid transparent; border-right: 3px solid transparent; border-bottom: 8px solid #000;"></div>
                        <div style="position: absolute; left: 15px; top: -5px; width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-bottom: 10px solid #000;"></div>
                        <div style="position: absolute; right: 5px; top: -3px; width: 0; height: 0; border-left: 3px solid transparent; border-right: 3px solid transparent; border-bottom: 8px solid #000;"></div>
                    </div>
                    
                    <!-- Pumpkin stem -->
                    <div style="
                        position: absolute;
                        left: 50%;
                        top: -8px;
                        transform: translateX(-50%);
                        width: 12px;
                        height: 15px;
                        background: #8b4513;
                        border-radius: 2px;
                    "></div>
                </div>
            </div>
        `;
    }

    handleKeyPress(event) {
        console.log('=== KEY EVENT DEBUG ===');
        console.log('Key pressed:', event.key, 'Code:', event.code);
        console.log('Event target:', event.target);
        console.log('Game running:', this.isRunning);
        console.log('Current pumpkin position:', this.pumpkinX, this.pumpkinY);
        
        if (!this.isRunning) {
            console.log('Game not running, ignoring key press');
            return;
        }
        
        let moved = false;
        const key = event.key.toLowerCase();
        console.log('Processed key:', key);
        
        switch(key) {
            case 'w':
                console.log('W pressed - attempting to move UP');
                if (this.pumpkinY > this.minY) {
                    this.pumpkinY = Math.max(this.minY, this.pumpkinY - this.moveDistance);
                    moved = true;
                    console.log('Moved UP to:', this.pumpkinX, this.pumpkinY);
                } else {
                    console.log('Cannot move UP - at boundary');
                }
                break;
            case 'a':
                console.log('A pressed - attempting to move LEFT');
                if (this.pumpkinX > this.minX) {
                    this.pumpkinX = Math.max(this.minX, this.pumpkinX - this.moveDistance);
                    moved = true;
                    console.log('Moved LEFT to:', this.pumpkinX, this.pumpkinY);
                } else {
                    console.log('Cannot move LEFT - at boundary');
                }
                break;
            case 's':
                console.log('S pressed - attempting to move DOWN');
                if (this.pumpkinY < this.maxY) {
                    this.pumpkinY = Math.min(this.maxY, this.pumpkinY + this.moveDistance);
                    moved = true;
                    console.log('Moved DOWN to:', this.pumpkinX, this.pumpkinY);
                } else {
                    console.log('Cannot move DOWN - at boundary');
                }
                break;
            case 'd':
                console.log('D pressed - attempting to move RIGHT');
                if (this.pumpkinX < this.maxX) {
                    this.pumpkinX = Math.min(this.maxX, this.pumpkinX + this.moveDistance);
                    moved = true;
                    console.log('Moved RIGHT to:', this.pumpkinX, this.pumpkinY);
                } else {
                    console.log('Cannot move RIGHT - at boundary');
                }
                break;
            default:
                console.log('Key not handled:', key);
        }
        
        if (moved) {
            this.score++;
            console.log('Movement successful! New score:', this.score);
            this.updatePumpkinPosition();
            this.updateUI();
            
            if (window.gameApp) {
                window.gameApp.updateScore(this.score);
            }
        } else {
            console.log('No movement occurred');
        }
        
        // Prevent default browser behavior for WASD keys
        if (['w', 'a', 's', 'd'].includes(key)) {
            console.log('Preventing default behavior for:', key);
            event.preventDefault();
        }
        console.log('=== END KEY EVENT DEBUG ===');
    }

    updatePumpkinPosition() {
        const pumpkin = document.getElementById('pumpkin');
        if (pumpkin) {
            pumpkin.style.left = `${this.pumpkinX}px`;
            pumpkin.style.top = `${this.pumpkinY}px`;
        }
    }

    updateUI() {
        const movesElement = document.getElementById('pumpkin-moves');
        const xElement = document.getElementById('pumpkin-x');
        const yElement = document.getElementById('pumpkin-y');
        
        if (movesElement) {
            movesElement.textContent = this.score;
        }
        if (xElement) {
            xElement.textContent = Math.round(this.pumpkinX);
        }
        if (yElement) {
            yElement.textContent = Math.round(this.pumpkinY);
        }
    }

    start() {
        console.log('=== GAME START DEBUG ===');
        console.log('FindPumpkin start() called');
        this.isRunning = true;
        
        // Use setTimeout to ensure DOM is fully rendered
        setTimeout(() => {
            console.log('Setting up keyboard listener...');
            
            // Add a general test listener first
            const testHandler = (e) => {
                console.log('TEST: Any key pressed:', e.key);
            };
            document.addEventListener('keydown', testHandler);
            console.log('Test keyboard listener added');
            
            // Add keyboard event listener
            document.addEventListener('keydown', this.handleKeyPress);
            console.log('Keyboard event listener added to document');
            console.log('Handler function:', this.handleKeyPress);
            
            // Focus on the game content to ensure key events are captured
            const gameContent = document.getElementById('game-content');
            if (gameContent) {
                gameContent.setAttribute('tabindex', '-1');
                gameContent.focus();
                console.log('Game content focused, tabindex set to -1');
                console.log('Active element after focus:', document.activeElement);
            } else {
                console.log('ERROR: Game content element not found!');
            }
            
            // Also try focusing on the body as a fallback
            document.body.focus();
            console.log('Body also focused as fallback');
            
            // Remove test handler after 10 seconds
            setTimeout(() => {
                document.removeEventListener('keydown', testHandler);
                console.log('Test handler removed');
            }, 10000);
            
            console.log('Find the Pumpkin game started! Use WASD to move.');
            console.log('isRunning:', this.isRunning);
            console.log('=== END GAME START DEBUG ===');
        }, 100);
    }

    stop() {
        console.log('=== GAME STOP DEBUG ===');
        console.log('FindPumpkin stop() called');
        this.isRunning = false;
        
        // Remove keyboard event listener
        document.removeEventListener('keydown', this.handleKeyPress);
        console.log('Keyboard event listener removed from document');
        
        console.log('Find the Pumpkin game stopped!');
        console.log('=== END GAME STOP DEBUG ===');
    }

    getScore() {
        console.log('FindPumpkin getScore() called, returning:', this.score);
        return this.score;
    }

    resetPosition() {
        this.pumpkinX = 340;
        this.pumpkinY = 290;
        this.score = 0;
        this.updatePumpkinPosition();
        this.updateUI();
    }
}