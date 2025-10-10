class HalloweenGames {
    constructor() {
        this.currentGame = 'game-0';
        this.currentScore = 0;
        this.games = {};
        this.gameNames = {
            'game-0': 'Title Screen',
            'game-1': 'Find the Pumpkin',
            'candy-swap': 'Candy Swap',
            'game-3': 'Spider Web',
            'game-4': 'Bat Cave',
            'game-5': "Witch's Brew",
            'welcome-game': "Welcome Game"
        };
        this.gameDescriptions = {
            'game-0': 'Welcome to Halloween Minigames! Select a game to start playing.',
            'game-1': 'Use WASD keys to move the pumpkin around the screen!',
            'candy-swap': 'Trade candy with friends to build the best collection!',
            'game-3': 'Navigate through the intricate spider webs.',
            'game-4': 'Explore the mysterious depths of the bat cave.',
            'game-5': 'Mix magical potions with the witch!',
            'welcome-game': 'Welcome to the game!'
        };
        
        this.init();
    }

    async init() {
        this.bindEvents();
        await this.loadGames();
    }

    bindEvents() {
        const gameItems = document.querySelectorAll('.game-item');
        gameItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const gameId = item.getAttribute('data-game');
                this.switchGame(gameId);
            });
        });
    }

    async loadGames() {
        const gameIds = ['game-0', 'game-1', 'candy-swap', 'game-3', 'game-4', 'game-5', 'welcome-game'];

        for (const gameId of gameIds) {
            try {
                let module;
                try {
                    // Try subdirectory structure first (e.g., welcome-game/welcome-game.js)
                    module = await import(`./games/${gameId}/${gameId}.js`);
                } catch (subError) {
                    // Fall back to flat structure (e.g., game-0.js)
                    module = await import(`./games/${gameId}.js`);
                }
                console.log(`Successfully loaded module for ${gameId}:`, module);
                this.games[gameId] = new module.default();
                console.log(`Successfully instantiated game ${gameId}:`, this.games[gameId]);
            } catch (error) {
                console.warn(`Could not load game ${gameId}:`, error);
                this.games[gameId] = this.createFallbackGame(gameId);
                console.log(`Using fallback game for ${gameId}`);
            }
        }
        
        // Initialize the title screen after all games are loaded
        this.switchGame('game-0');
        this.updateUI();
    }

    createFallbackGame(gameId) {
        return {
            name: this.gameNames[gameId],
            description: this.gameDescriptions[gameId],
            score: 0,
            render: () => {
                return `
                    <div class="game-screen">
                        <h2>🎃 ${this.gameNames[gameId]} 🎃</h2>
                        <p>${this.gameDescriptions[gameId]}</p>
                        <div class="game-placeholder">
                            <div>
                                <p>Game content will be implemented here!</p>
                                <p style="margin-top: 20px; font-size: 2em;">
                                    ${this.getGameEmoji(gameId)}
                                </p>
                            </div>
                        </div>
                    </div>
                `;
            },
            start: () => console.log(`Starting ${gameId}`),
            stop: () => console.log(`Stopping ${gameId}`),
            getScore: () => Math.floor(Math.random() * 1000)
        };
    }

    getGameEmoji(gameId) {
        const emojis = {
            'game-0': '🦇👻🎃',
            'game-1': '🎃🎃🎃',
            'candy-swap': '🍬🍬🍬',
            'game-3': '🕷️🕸️🕷️',
            'game-4': '🦇🦇🦇',
            'game-5': '🧙‍♀️⚗️🧙‍♀️',
            'welcome-game': '🏢🍬💰'
        };
        return emojis[gameId] || '🎃';
    }

    async switchGame(gameId) {
        console.log('=== SWITCH GAME DEBUG ===');
        console.log('Switching to game:', gameId);
        console.log('Current game:', this.currentGame);
        
        if (this.currentGame === gameId) {
            console.log('Already on this game, returning');
            return;
        }

        if (this.games[this.currentGame]) {
            console.log('Stopping current game:', this.currentGame);
            this.games[this.currentGame].stop();
        }

        this.currentGame = gameId;
        console.log('Set current game to:', gameId);
        
        const gameItems = document.querySelectorAll('.game-item');
        console.log('Found game items:', gameItems.length);
        gameItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-game') === gameId) {
                item.classList.add('active');
                console.log('Activated game item for:', gameId);
            }
        });

        console.log('Rendering current game...');
        this.renderCurrentGame();
        this.updateUI();

        if (this.games[gameId]) {
            console.log('Starting game:', gameId, 'Game object:', this.games[gameId]);
            this.games[gameId].start();
        } else {
            console.log('ERROR: No game object found for:', gameId);
        }
        console.log('=== END SWITCH GAME DEBUG ===');
    }

    renderCurrentGame() {
        const gameContent = document.getElementById('game-content');
        const game = this.games[this.currentGame];
        
        if (game && game.render) {
            gameContent.innerHTML = game.render();
        } else {
            gameContent.innerHTML = `
                <div class="game-screen">
                    <h2>Game Loading...</h2>
                    <p>Please wait while the game loads.</p>
                </div>
            `;
        }
    }

    updateUI() {
        const currentGameName = document.getElementById('current-game-name');
        const currentScore = document.getElementById('current-score');
        const gameDescription = document.getElementById('game-description');
        
        const game = this.games[this.currentGame];
        
        if (currentGameName) {
            currentGameName.textContent = this.gameNames[this.currentGame] || 'Unknown Game';
        }
        
        if (currentScore && game) {
            currentScore.textContent = game.getScore ? game.getScore() : '0';
        }
        
        if (gameDescription) {
            gameDescription.textContent = this.gameDescriptions[this.currentGame] || 'No description available.';
        }
    }

    updateScore(newScore) {
        this.currentScore = newScore;
        const currentScoreElement = document.getElementById('current-score');
        if (currentScoreElement) {
            currentScoreElement.textContent = newScore;
        }
    }

    getCurrentGame() {
        return this.games[this.currentGame];
    }
}

let gameApp;

document.addEventListener('DOMContentLoaded', () => {
    gameApp = new HalloweenGames();
});

window.gameApp = gameApp;