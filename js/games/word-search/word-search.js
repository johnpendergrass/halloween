export default class WordSearch {
    constructor(puzzle = null) {
        // Load puzzle data
        this.puzzle = puzzle || this.getDefaultPuzzle();
        
        this.name = this.puzzle.name || 'Word Search';
        this.description = this.puzzle.description || 'Find words hidden in the letter grid!';
        this.score = 0;
        this.isRunning = false;
        
        // Use puzzle data
        this.grid = this.puzzle.grid;
        this.validWords = this.puzzle.words;
        
        // Initialize dynamic grid dimensions based on puzzle
        const rows = this.grid.length;
        const cols = this.grid[0]?.length || 0;
        
        // Track selected letters
        this.selectedLetters = [];
        this.foundWords = [];
        
        // Victory state
        this.gameWon = false;
        
        // Track letter colors for found words (dynamic sizing)
        this.letterColors = Array(rows).fill(null).map(() => Array(cols).fill(null));
        this.availableColors = ['orange', 'purple', 'green', 'red', 'blue', 'yellow', 'pink', 'cyan'];
        this.currentColorIndex = 0;
        
        // Bind click handler
        this.handleLetterClick = this.handleLetterClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    
    isAdjacent(row1, col1, row2, col2) {
        const rowDiff = Math.abs(row1 - row2);
        const colDiff = Math.abs(col1 - col2);
        return rowDiff <= 1 && colDiff <= 1 && (rowDiff + colDiff > 0);
    }

    render() {
        const gridHTML = this.grid.map((row, rowIndex) => {
            return row.map((letter, colIndex) => {
                const isSelected = this.selectedLetters.some(sel => sel.row === rowIndex && sel.col === colIndex);
                const letterColor = this.letterColors[rowIndex][colIndex];
                
                let cellClasses = 'letter-cell';
                if (isSelected) {
                    cellClasses += ' selected';
                } else if (letterColor) {
                    cellClasses += ` found-word-${letterColor}`;
                }
                
                return `
                    <div class="${cellClasses}" 
                         data-row="${rowIndex}" 
                         data-col="${colIndex}"
                         data-letter="${letter}">
                        ${letter}
                    </div>
                `;
            }).join('');
        }).join('');

        const selectedWord = this.selectedLetters.map(sel => sel.letter).join('');
        
        // Get the color that will be used for the next found word
        const currentColor = this.availableColors[this.currentColorIndex];
        const colorMap = {
            'orange': '#ff8c00',
            'purple': '#9932cc', 
            'green': '#228b22',
            'red': '#dc143c',
            'blue': '#1e3a8a',
            'yellow': '#eab308',
            'pink': '#ec4899',
            'cyan': '#0891b2'
        };
        const currentHoverColor = colorMap[currentColor];
        const currentTextColor = currentColor === 'yellow' ? 'black' : 'white';
        
        // CSS styles for both game states
        const styles = `
            <style>
                .word-search-game {
                    padding: 20px;
                    height: 100%;
                    overflow-y: auto;
                }
                
                .word-search-container {
                    display: flex;
                    gap: 20px;
                    height: calc(100% - 60px);
                }
                
                .word-search-grid {
                    display: grid;
                    grid-template-columns: repeat(8, 40px);
                    grid-template-rows: repeat(7, 40px);
                    gap: 2px;
                    background: #2a1a0a;
                    padding: 10px;
                    border-radius: 8px;
                    border: 2px solid #8b4513;
                }
                
                .letter-cell {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f4a460;
                    color: #2a1a0a;
                    font-weight: bold;
                    font-size: 18px;
                    cursor: pointer;
                    border-radius: 4px;
                    border: 2px solid #d2691e;
                    transition: all 0.2s ease;
                    user-select: none;
                }
                
                .letter-cell:hover:not(.found-word-orange):not(.found-word-purple):not(.found-word-green):not(.found-word-red):not(.found-word-blue):not(.found-word-yellow):not(.found-word-pink):not(.found-word-cyan) {
                    background: var(--hover-color);
                    transform: scale(1.1);
                }
                
                .letter-cell.selected {
                    background: var(--hover-color);
                    color: var(--hover-text-color);
                }
                
                /* Found word colors - Halloween themed */
                .found-word-orange {
                    background: #ff8c00;
                    color: white;
                    border-color: #ff6600;
                }
                
                .found-word-purple {
                    background: #9932cc;
                    color: white;
                    border-color: #7b2cbf;
                }
                
                .found-word-green {
                    background: #228b22;
                    color: white;
                    border-color: #006400;
                }
                
                .found-word-red {
                    background: #dc143c;
                    color: white;
                    border-color: #b91c3c;
                }
                
                .found-word-blue {
                    background: #1e3a8a;
                    color: white;
                    border-color: #1e40af;
                }
                
                .found-word-yellow {
                    background: #eab308;
                    color: black;
                    border-color: #ca8a04;
                }
                
                .found-word-pink {
                    background: #ec4899;
                    color: white;
                    border-color: #db2777;
                }
                
                .found-word-cyan {
                    background: #0891b2;
                    color: white;
                    border-color: #0e7490;
                }
                
                .word-search-sidebar {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    max-width: 300px;
                }
                
                .selected-word-section,
                .found-words-section {
                    background: rgba(139, 69, 19, 0.3);
                    padding: 15px;
                    border-radius: 8px;
                    border: 2px solid #8b4513;
                }
                
                .selected-word-section h3,
                .found-words-section h3 {
                    margin: 0 0 10px 0;
                    color: #ffd700;
                    font-size: 16px;
                }
                
                .selected-word {
                    background: #2a1a0a;
                    color: #ffd700;
                    padding: 10px;
                    border-radius: 4px;
                    font-family: monospace;
                    font-size: 18px;
                    font-weight: bold;
                    min-height: 20px;
                    margin-bottom: 10px;
                    border: 1px solid #8b4513;
                }
                
                .word-controls {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 10px;
                }
                
                .word-controls button {
                    flex: 1;
                    padding: 8px 12px;
                    background: #8b4513;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: background 0.2s ease;
                }
                
                .word-controls button:hover:not(:disabled) {
                    background: #a0522d;
                }
                
                .word-controls button:disabled {
                    background: #666;
                    cursor: not-allowed;
                    opacity: 0.5;
                }
                
                .word-feedback {
                    padding: 8px;
                    border-radius: 4px;
                    font-weight: bold;
                    text-align: center;
                    min-height: 20px;
                }
                
                .word-feedback.correct {
                    background: #90EE90;
                    color: #006400;
                }
                
                .word-feedback.incorrect {
                    background: #FFB6C1;
                    color: #8B0000;
                }
                
                /* Victory Screen Styles */
                .victory-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    backdrop-filter: blur(5px);
                }
                
                .victory-content {
                    background: linear-gradient(45deg, #ff6600, #8b4513);
                    color: white;
                    padding: 40px;
                    border-radius: 20px;
                    text-align: center;
                    box-shadow: 0 0 30px rgba(255, 102, 0, 0.5);
                    border: 3px solid #ffd700;
                    animation: victoryPulse 2s ease-in-out infinite alternate;
                }
                
                .victory-content h2 {
                    font-size: 28px;
                    margin: 0 0 20px 0;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                    line-height: 1.3;
                }
                
                .victory-score {
                    font-size: 24px;
                    font-weight: bold;
                    color: #ffd700;
                    margin: 20px 0;
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
                }
                
                .play-again-btn {
                    background: #228b22;
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    font-size: 18px;
                    font-weight: bold;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                }
                
                .play-again-btn:hover {
                    background: #32cd32;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
                }
                
                .game-background-blur {
                    filter: blur(3px);
                    opacity: 0.5;
                }
                
                @keyframes victoryPulse {
                    0% {
                        transform: scale(1);
                        box-shadow: 0 0 30px rgba(255, 102, 0, 0.5);
                    }
                    100% {
                        transform: scale(1.05);
                        box-shadow: 0 0 40px rgba(255, 102, 0, 0.8);
                    }
                }
            </style>
        `;

        // Victory screen content
        if (this.gameWon) {
            return `
                <div class="game-screen word-search-game">
                    <div class="victory-overlay">
                        <div class="victory-content">
                            <h2>🎉 CONGRATULATIONS! 🎉<br>You found all the words!</h2>
                            <div class="victory-score">Final Score: ${this.score}</div>
                            <button id="play-again" class="play-again-btn">🎃 Play Again 🎃</button>
                        </div>
                    </div>
                    <div class="game-background-blur">
                        <h2>🔍 Word Search 🔍</h2>
                        <div class="word-search-container">
                            <div class="word-search-grid">
                                ${gridHTML}
                            </div>
                            
                            <div class="word-search-sidebar">
                                <div class="selected-word-section">
                                    <h3>Selected Word:</h3>
                                    <div class="selected-word">${selectedWord || '(none)'}</div>
                                    <div class="word-controls">
                                        <button id="submit-word" disabled>Submit</button>
                                        <button id="reset-word" disabled>Reset</button>
                                    </div>
                                    <div id="word-feedback" class="word-feedback"></div>
                                </div>
                                
                                <div class="found-words-section">
                                    <h3>Found Words: ${this.foundWords.length}/${this.validWords.length}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    ${styles}
                </div>
            `;
        }

        return `
            <div class="game-screen word-search-game" style="--hover-color: ${currentHoverColor}; --hover-text-color: ${currentTextColor};">
                <h2>🔍 Word Search 🔍</h2>
                <div class="word-search-container">
                    <div class="word-search-grid">
                        ${gridHTML}
                    </div>
                    
                    <div class="word-search-sidebar">
                        <div class="selected-word-section">
                            <h3>Selected Word:</h3>
                            <div class="selected-word">${selectedWord || '(none)'}</div>
                            <div class="word-controls">
                                <button id="submit-word" ${selectedWord.length === 0 ? 'disabled' : ''}>Submit</button>
                                <button id="reset-word" ${selectedWord.length === 0 ? 'disabled' : ''}>Reset</button>
                            </div>
                            <div id="word-feedback" class="word-feedback"></div>
                        </div>
                        
                        <div class="found-words-section">
                            <h3>Found Words: ${this.foundWords.length}/${this.validWords.length}</h3>
                        </div>
                    </div>
                </div>
                ${styles}
            </div>
        `;
    }

    handleLetterClick(event) {
        if (!this.isRunning) return;
        
        const cell = event.target.closest('.letter-cell');
        if (!cell) return;
        
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const letter = cell.dataset.letter;
        
        // Check if this letter is already part of a found word (off-limits)
        if (this.letterColors[row][col] !== null) {
            return; // Ignore clicks on already found letters
        }
        
        // Check if this letter is already selected
        const existingIndex = this.selectedLetters.findIndex(sel => sel.row === row && sel.col === col);
        
        if (existingIndex !== -1) {
            // If clicking the last selected letter, remove it (backspace behavior)
            if (existingIndex === this.selectedLetters.length - 1) {
                this.selectedLetters.pop();
                this.updateDisplay();
            }
            // If clicking a letter in the middle, ignore for now (could implement more complex behavior later)
        } else {
            // Check adjacency if not the first letter
            if (this.selectedLetters.length > 0) {
                const lastLetter = this.selectedLetters[this.selectedLetters.length - 1];
                
                // Only allow selection if the new letter is adjacent to the last selected letter
                if (!this.isAdjacent(lastLetter.row, lastLetter.col, row, col)) {
                    return; // Not adjacent, ignore selection
                }
            }
            
            // Add new letter to selection
            this.selectedLetters.push({ row, col, letter });
            this.updateDisplay();
        }
    }

    handleSubmit() {
        if (!this.isRunning || this.selectedLetters.length === 0 || this.gameWon) return;
        
        // Check for victory conditions first
        const victoryType = this.checkVictoryConditions();
        if (victoryType) {
            this.gameWon = true;
            if (victoryType === 'cheat') {
                this.score += 1000; // Bonus for finding cheat code
            }
            
            // Update main game score
            if (window.gameApp) {
                window.gameApp.updateScore(this.score);
            }
            
            this.showVictoryScreen(victoryType);
            return;
        }
        
        const selectedWord = this.selectedLetters.map(sel => sel.letter).join('');
        const feedback = document.getElementById('word-feedback');
        
        if (this.validWords.includes(selectedWord.toUpperCase()) && !this.foundWords.includes(selectedWord.toUpperCase())) {
            // Correct word!
            this.foundWords.push(selectedWord.toUpperCase());
            this.score += selectedWord.length * 10; // Score based on word length
            
            // Color the letters with the next available color
            const currentColor = this.availableColors[this.currentColorIndex];
            for (const letter of this.selectedLetters) {
                this.letterColors[letter.row][letter.col] = currentColor;
            }
            this.currentColorIndex = (this.currentColorIndex + 1) % this.availableColors.length;
            
            feedback.textContent = 'Correct!';
            feedback.className = 'word-feedback correct';
            
            // Update main game score
            if (window.gameApp) {
                window.gameApp.updateScore(this.score);
            }
            
            // Clear selection
            this.selectedLetters = [];
            this.updateDisplay();
            
            // Check for normal victory after finding a word
            const normalVictory = this.checkVictoryConditions();
            if (normalVictory === 'normal') {
                this.gameWon = true;
                this.showVictoryScreen('normal');
                return;
            }
        } else {
            // Incorrect or already found
            feedback.textContent = this.foundWords.includes(selectedWord.toUpperCase()) ? 'Already found!' : 'No';
            feedback.className = 'word-feedback incorrect';
        }
        
        // Clear feedback after 2 seconds
        setTimeout(() => {
            feedback.textContent = '';
            feedback.className = 'word-feedback';
        }, 2000);
    }

    handleReset() {
        if (!this.isRunning) return;
        
        this.selectedLetters = [];
        this.updateDisplay();
        
        const feedback = document.getElementById('word-feedback');
        feedback.textContent = '';
        feedback.className = 'word-feedback';
    }

    updateDisplay() {
        // Re-render the entire game to update the display
        const gameContent = document.getElementById('game-content');
        if (gameContent) {
            gameContent.innerHTML = this.render();
            this.bindEvents();
        }
    }

    bindEvents() {
        // Bind letter click events
        const letterCells = document.querySelectorAll('.letter-cell');
        letterCells.forEach(cell => {
            cell.addEventListener('click', this.handleLetterClick);
        });
        
        // Bind control button events
        const submitButton = document.getElementById('submit-word');
        const resetButton = document.getElementById('reset-word');
        const playAgainButton = document.getElementById('play-again');
        
        if (submitButton) {
            submitButton.addEventListener('click', this.handleSubmit);
        }
        
        if (resetButton) {
            resetButton.addEventListener('click', this.handleReset);
        }
        
        if (playAgainButton) {
            playAgainButton.addEventListener('click', () => this.resetGame());
        }
    }

    start() {
        this.isRunning = true;
        
        // Use setTimeout to ensure DOM is ready
        setTimeout(() => {
            this.bindEvents();
        }, 100);
    }

    stop() {
        this.isRunning = false;
        
        // Remove event listeners
        const letterCells = document.querySelectorAll('.letter-cell');
        letterCells.forEach(cell => {
            cell.removeEventListener('click', this.handleLetterClick);
        });
        
        const submitButton = document.getElementById('submit-word');
        const resetButton = document.getElementById('reset-word');
        
        if (submitButton) {
            submitButton.removeEventListener('click', this.handleSubmit);
        }
        
        if (resetButton) {
            resetButton.removeEventListener('click', this.handleReset);
        }
    }

    getScore() {
        return this.score;
    }
    
    checkVictoryConditions() {
        // Check for cheat code: all 4 corners selected
        if (this.selectedLetters.length === 4) {
            const corners = [
                {row: 0, col: 0}, // top-left
                {row: 0, col: this.grid[0].length - 1}, // top-right  
                {row: this.grid.length - 1, col: 0}, // bottom-left
                {row: this.grid.length - 1, col: this.grid[0].length - 1} // bottom-right
            ];
            
            const selectedPositions = this.selectedLetters.map(sel => ({row: sel.row, col: sel.col}));
            const isCheatCode = corners.every(corner => 
                selectedPositions.some(pos => pos.row === corner.row && pos.col === corner.col)
            ) && selectedPositions.length === 4;
            
            if (isCheatCode) {
                return 'cheat';
            }
        }
        
        // Check for normal victory: all words found
        if (this.foundWords.length === this.validWords.length) {
            return 'normal';
        }
        
        return false;
    }
    
    showVictoryScreen(victoryType) {
        // Clear existing UI and show victory screen
        this.updateDisplay();
    }
    
    resetGame() {
        this.gameWon = false;
        this.selectedLetters = [];
        this.foundWords = [];
        this.score = 0;
        this.currentColorIndex = 0;
        
        // Reset letter colors
        const rows = this.grid.length;
        const cols = this.grid[0]?.length || 0;
        this.letterColors = Array(rows).fill(null).map(() => Array(cols).fill(null));
        
        // Update main game score
        if (window.gameApp) {
            window.gameApp.updateScore(this.score);
        }
        
        this.updateDisplay();
    }
    
    getDefaultPuzzle() {
        // Default Halloween puzzle (fallback if no puzzle provided)
        return {
            name: 'Halloween Word Search',
            description: 'Find Halloween words hidden in the letter grid!',
            grid: [
                ['R', 'N', 'O', 'B', 'W', 'E', 'F', 'F'],
                ['E', 'C', 'E', 'G', 'C', 'O', 'B', 'I'],
                ['T', 'N', 'A', 'E', 'H', 'S', 'D', 'N'],
                ['G', 'R', 'A', 'L', 'O', 'K', 'N', 'U'],
                ['Y', 'O', 'I', 'A', 'B', 'A', 'C', 'O'],
                ['L', 'T', 'W', 'R', 'R', 'A', 'H', 'R'],
                ['E', 'H', 'E', 'E', 'J', 'I', 'E', 'S']
            ],
            words: [
                'EERIE',
                'JACKOLANTERN', 
                'COBWEB',
                'BANSHEE',
                'WRAITH',
                'SHROUD',
                'GARGOYLE',
                'COFFIN'
            ]
        };
    }
}