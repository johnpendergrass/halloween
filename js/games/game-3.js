export default class SpiderWeb {
    constructor() {
        this.name = 'Spider Web';
        this.description = 'Navigate through the intricate spider webs.';
        this.score = 0;
        this.isRunning = false;
        this.websCleared = 0;
    }

    render() {
        return `
            <div class="game-screen">
                <h2>🕷️ Spider Web 🕷️</h2>
                <p>Carefully navigate through the sticky spider webs!</p>
                <div class="game-placeholder">
                    <div>
                        <p>🕸️ Clear the webs to progress! 🕸️</p>
                        <div style="margin: 20px 0; font-size: 1.5em; line-height: 1.5;">
                            <div class="spider-maze">
                                🕷️🕸️🕷️🕸️🕷️<br>
                                🕸️🕷️🕸️🕷️🕸️<br>
                                🕷️🕸️🕷️🕸️🕷️<br>
                                🕸️🕷️🕸️🕷️🕸️
                            </div>
                        </div>
                        <p style="color: #ffaa66; font-size: 1.2em;">
                            Webs Cleared: <span id="web-count">${this.websCleared}</span><br>
                            Score: <span id="web-score">${this.score}</span>
                        </p>
                        <button onclick="gameApp.getCurrentGame().clearWeb()" 
                                style="background: #663399; color: white; border: none; padding: 10px 20px; 
                                       border-radius: 5px; font-size: 1em; cursor: pointer; margin-top: 15px;">
                            Clear Web! 🕸️
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    start() {
        this.isRunning = true;
        this.score = Math.floor(Math.random() * 75);
        this.websCleared = Math.floor(Math.random() * 3);
        console.log('Spider Web game started!');
    }

    stop() {
        this.isRunning = false;
        console.log('Spider Web game stopped!');
    }

    clearWeb() {
        if (this.isRunning) {
            this.websCleared += 1;
            this.score += 15;
            
            const countElement = document.getElementById('web-count');
            const scoreElement = document.getElementById('web-score');
            
            if (countElement) {
                countElement.textContent = this.websCleared;
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