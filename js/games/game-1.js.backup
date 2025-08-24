export default class PumpkinPatch {
    constructor() {
        this.name = 'Pumpkin Patch';
        this.description = 'Collect pumpkins in this spooky patch adventure!';
        this.score = 0;
        this.isRunning = false;
    }

    render() {
        return `
            <div class="game-screen">
                <h2>🎃 Pumpkin Patch 🎃</h2>
                <p>Welcome to the haunted pumpkin patch!</p>
                <div class="game-placeholder">
                    <div>
                        <p>🎃 Click pumpkins to collect them! 🎃</p>
                        <div style="margin: 20px 0; font-size: 2em;">
                            <div class="pumpkin-field">
                                🎃 🎃 🎃 🎃 🎃<br>
                                🎃 🎃 🎃 🎃 🎃<br>
                                🎃 🎃 🎃 🎃 🎃
                            </div>
                        </div>
                        <p style="color: #ffaa66; font-size: 1.2em;">
                            Score: <span id="pumpkin-score">${this.score}</span>
                        </p>
                        <button onclick="gameApp.getCurrentGame().collectPumpkin()" 
                                style="background: #ff6600; color: white; border: none; padding: 10px 20px; 
                                       border-radius: 5px; font-size: 1em; cursor: pointer; margin-top: 15px;">
                            Collect Pumpkin! 🎃
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    start() {
        this.isRunning = true;
        this.score = Math.floor(Math.random() * 50);
        console.log('Pumpkin Patch game started!');
    }

    stop() {
        this.isRunning = false;
        console.log('Pumpkin Patch game stopped!');
    }

    collectPumpkin() {
        if (this.isRunning) {
            this.score += 10;
            const scoreElement = document.getElementById('pumpkin-score');
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