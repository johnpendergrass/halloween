export default class WelcomeGame {
    constructor() {
        this.score = 0;
        this.rotation = 5;
        this.rotationInterval = null;
        this.isOnTarget = false;
        this.keydownHandler = null;
    }

    render() {
        return `<div style="background-color: rgb(36, 28, 70); width: 100%; height: 100%; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <div id="score-display" style="color: white; font-size: 32px; font-weight: bold; margin-bottom: 20px;">Score: 0</div>
                <div style="display: grid; grid-template: 1fr / 1fr; place-items: center; background: radial-gradient(ellipse at center, #fff6a0 0%, #ffaa00 30%, #ff4400 70%, #cc0000 100%); height: 404px;">
                    <img src="js/games/welcome-game/halloween_bg.png" style="grid-area: 1/1; width: 100%; height: 100%; object-fit: contain;">
                    <img id="candy-corn" src="js/games/welcome-game/Candy_Corn.png" style="grid-area: 1/1; z-index: 1; height: 180px; transform: translateX(5px) translateY(35px) rotate(5deg);">
                    <img id="candy-corn-target" src="js/games/welcome-game/Candy_Corn.png" style="grid-area: 1/1; z-index: 1; height: 60px; transform: translateX(-90px) translateY(-45px) rotate(125deg); transition: height 0.15s ease-out;">
                </div>
        </div>`;
    }

    start() {
        console.log('Welcome game started');
        const candyCorn = document.getElementById('candy-corn');
        const target = document.getElementById('candy-corn-target');
        const scoreDisplay = document.getElementById('score-display');

        if (candyCorn && target) {
            // 360 degrees over 5 seconds = 72 degrees per second
            // Update every 16ms (roughly 60fps) = 1.152 degrees per frame
            this.rotationInterval = setInterval(() => {
                this.rotation += 2.152;
                const normalizedRotation = this.rotation % 360;

                // Check if spinner is pointing at target (280-290 degrees)
                this.isOnTarget = normalizedRotation >= 300 && normalizedRotation <= 350;

                // Update spinner rotation
                candyCorn.style.transform = `translateX(5px) translateY(35px) rotate(${this.rotation}deg)`;

                // Update target size based on whether spinner is on target
                target.style.height = this.isOnTarget ? '90px' : '60px';
            }, 16);
        }

        // Add spacebar listener
        this.keydownHandler = (e) => {
            if (e.code === 'Space' || e.key === ' ') {
                e.preventDefault();
                if (this.isOnTarget) {
                    this.score++;
                    if (scoreDisplay) {
                        scoreDisplay.textContent = `Score: ${this.score}`;
                    }
                    // Update the game app score
                    if (window.gameApp) {
                        window.gameApp.updateScore(this.score);
                    }
                }
            }
        };
        document.addEventListener('keydown', this.keydownHandler);
    }

    stop() {
        console.log('Welcome game stopped');
        if (this.rotationInterval) {
            clearInterval(this.rotationInterval);
            this.rotationInterval = null;
        }
        if (this.keydownHandler) {
            document.removeEventListener('keydown', this.keydownHandler);
            this.keydownHandler = null;
        }
    }

    getScore() {
        return this.score;
    }
}
