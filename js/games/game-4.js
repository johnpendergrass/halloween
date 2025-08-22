export default class BatCave {
    constructor() {
        this.name = 'Bat Cave';
        this.description = 'Explore the mysterious depths of the bat cave.';
        this.score = 0;
        this.isRunning = false;
        this.treasuresFound = 0;
    }

    render() {
        return `
            <div class="game-screen">
                <h2>🦇 Bat Cave 🦇</h2>
                <p>Venture deep into the dark cave filled with bats!</p>
                <div class="game-placeholder">
                    <div>
                        <p>🦇 Search for hidden treasures! 🦇</p>
                        <div style="margin: 20px 0; font-size: 1.5em; line-height: 1.5;">
                            <div class="bat-cave">
                                🕳️🦇🕳️🦇🕳️<br>
                                🦇🕳️🦇🕳️🦇<br>
                                🕳️🦇💎🦇🕳️<br>
                                🦇🕳️🦇🕳️🦇
                            </div>
                        </div>
                        <p style="color: #ffaa66; font-size: 1.2em;">
                            Treasures Found: <span id="treasure-count">${this.treasuresFound}</span><br>
                            Score: <span id="bat-score">${this.score}</span>
                        </p>
                        <button onclick="gameApp.getCurrentGame().findTreasure()" 
                                style="background: #444444; color: white; border: none; padding: 10px 20px; 
                                       border-radius: 5px; font-size: 1em; cursor: pointer; margin-top: 15px;">
                            Search Cave! 💎
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    start() {
        this.isRunning = true;
        this.score = Math.floor(Math.random() * 125);
        this.treasuresFound = Math.floor(Math.random() * 4);
        console.log('Bat Cave game started!');
    }

    stop() {
        this.isRunning = false;
        console.log('Bat Cave game stopped!');
    }

    findTreasure() {
        if (this.isRunning) {
            this.treasuresFound += 1;
            this.score += 30;
            
            const countElement = document.getElementById('treasure-count');
            const scoreElement = document.getElementById('bat-score');
            
            if (countElement) {
                countElement.textContent = this.treasuresFound;
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