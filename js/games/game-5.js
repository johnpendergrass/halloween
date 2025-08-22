export default class WitchsBrew {
    constructor() {
        this.name = "Witch's Brew";
        this.description = 'Mix magical potions with the witch!';
        this.score = 0;
        this.isRunning = false;
        this.potionsMixed = 0;
    }

    render() {
        return `
            <div class="game-screen">
                <h2>🧙‍♀️ Witch's Brew 🧙‍♀️</h2>
                <p>Help the witch create magical potions!</p>
                <div class="game-placeholder">
                    <div>
                        <p>⚗️ Mix ingredients to brew potions! ⚗️</p>
                        <div style="margin: 20px 0; font-size: 1.5em; line-height: 1.5;">
                            <div class="brewing-station">
                                🌿⚗️🍄⚗️🌿<br>
                                ⚗️🧙‍♀️⚗️🧙‍♀️⚗️<br>
                                🍄⚗️🌿⚗️🍄
                            </div>
                        </div>
                        <p style="color: #ffaa66; font-size: 1.2em;">
                            Potions Mixed: <span id="potion-count">${this.potionsMixed}</span><br>
                            Score: <span id="witch-score">${this.score}</span>
                        </p>
                        <button onclick="gameApp.getCurrentGame().brewPotion()" 
                                style="background: #663399; color: white; border: none; padding: 10px 20px; 
                                       border-radius: 5px; font-size: 1em; cursor: pointer; margin-top: 15px;">
                            Brew Potion! ⚗️
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    start() {
        this.isRunning = true;
        this.score = Math.floor(Math.random() * 90);
        this.potionsMixed = Math.floor(Math.random() * 6);
        console.log("Witch's Brew game started!");
    }

    stop() {
        this.isRunning = false;
        console.log("Witch's Brew game stopped!");
    }

    brewPotion() {
        if (this.isRunning) {
            this.potionsMixed += 1;
            this.score += 20;
            
            const countElement = document.getElementById('potion-count');
            const scoreElement = document.getElementById('witch-score');
            
            if (countElement) {
                countElement.textContent = this.potionsMixed;
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