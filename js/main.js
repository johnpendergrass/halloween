class HalloweenGames {
    constructor() {
        this.currentGame = 'game-1';
        this.currentScore = 0;
        this.games = {};
        this.gameNames = {
            'game-1': 'Pumpkin Patch',
            'game-2': 'Candy Swap',
            'game-3': 'Spider Web',
            'game-4': 'Bat Cave',
            'game-5': "Witch's Brew"
        };
        this.gameDescriptions = {
            'game-1': 'Collect pumpkins in this spooky patch adventure!',
            'game-2': 'Trade candy with friends to build the best collection!',
            'game-3': 'Navigate through the intricate spider webs.',
            'game-4': 'Explore the mysterious depths of the bat cave.',
            'game-5': 'Mix magical potions with the witch!'
        };
        
        this.init();
    }

    async init() {
        this.bindEvents();
        await this.loadGames();
        this.switchGame('game-1');
        this.updateUI();
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
        const gameIds = ['game-1', 'game-2', 'game-3', 'game-4', 'game-5'];
        
        for (const gameId of gameIds) {
            try {
                const module = await import(`./games/${gameId}.js`);
                this.games[gameId] = new module.default();
            } catch (error) {
                console.warn(`Could not load game ${gameId}:`, error);
                this.games[gameId] = this.createFallbackGame(gameId);
            }
        }
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
            'game-1': '🎃🎃🎃',
            'game-2': '👻👻👻',
            'game-3': '🕷️🕸️🕷️',
            'game-4': '🦇🦇🦇',
            'game-5': '🧙‍♀️⚗️🧙‍♀️'
        };
        return emojis[gameId] || '🎃';
    }

    async switchGame(gameId) {
        if (this.currentGame === gameId) return;

        if (this.games[this.currentGame]) {
            this.games[this.currentGame].stop();
        }

        this.currentGame = gameId;
        
        const gameItems = document.querySelectorAll('.game-item');
        gameItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-game') === gameId) {
                item.classList.add('active');
            }
        });

        this.renderCurrentGame();
        this.updateUI();

        if (this.games[gameId]) {
            this.games[gameId].start();
        }
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