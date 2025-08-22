export default class GhostHunt {
    constructor() {
        this.name = 'Ghost Hunt';
        this.description = 'Hunt ghosts in the haunted mansion rooms.';
        this.score = 0;
        this.isRunning = false;
        this.ghostsCaught = 0;
    }

    render() {
        return `
            <div class="game-screen">
                <h2>👻 Ghost Hunt 👻</h2>
                <p>Search the haunted mansion for wandering spirits!</p>
                <div class="game-placeholder">
                    <div>
                        <p>👻 Find and catch the ghosts! 👻</p>
                        <div style="margin: 20px 0; font-size: 1.5em; line-height: 1.8;">
                            <div class="mansion-rooms">
                                🏚️ 👻 🏚️ 👻 🏚️<br>
                                👻 🏚️ 👻 🏚️ 👻<br>
                                🏚️ 👻 🏚️ 👻 🏚️
                            </div>
                        </div>
                        <p style="color: #ffaa66; font-size: 1.2em;">
                            Ghosts Caught: <span id="ghost-count">${this.ghostsCaught}</span><br>
                            Score: <span id="ghost-score">${this.score}</span>
                        </p>
                        <button onclick="gameApp.getCurrentGame().catchGhost()" 
                                style="background: #9966cc; color: white; border: none; padding: 10px 20px; 
                                       border-radius: 5px; font-size: 1em; cursor: pointer; margin-top: 15px;">
                            Catch Ghost! 👻
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    start() {
        this.isRunning = true;
        this.score = Math.floor(Math.random() * 100);
        this.ghostsCaught = Math.floor(Math.random() * 5);
        console.log('Ghost Hunt game started!');
    }

    stop() {
        this.isRunning = false;
        console.log('Ghost Hunt game stopped!');
    }

    catchGhost() {
        if (this.isRunning) {
            this.ghostsCaught += 1;
            this.score += 25;
            
            const countElement = document.getElementById('ghost-count');
            const scoreElement = document.getElementById('ghost-score');
            
            if (countElement) {
                countElement.textContent = this.ghostsCaught;
            }
            if (scoreElement) {
                scoreElement.textContent = this.score;
            }
            if (window.gameApp) {
                window.gameApp.updateScore(this.score);
            }
        }
    }

    getScore() {
        return this.score;
    }
}