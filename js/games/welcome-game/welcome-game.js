export default class WelcomeGame {
    constructor() {
        this.score = 0;
        this.rotation = 5;
        this.rotationInterval = null;
        this.isOnTarget = false;
        this.keydownHandler = null;
        this.rotationSpeed = 2.152;
    }

    positionOnCircle(degreesFromTop) {
        // Circle properties
        const centerX = 5;      // spinner center X
        const centerY = 35;     // spinner center Y
        const radius = 120;     // canvas is 200x200

        // Convert "degrees from top" to standard angle
        // (0° = right, 90° = down, 180° = left, 270° = up)
        const standardAngle = degreesFromTop - 90;
        const radians = standardAngle * Math.PI / 180;

        // Calculate position on circle
        const x = centerX + radius * Math.cos(radians);
        const y = centerY + radius * Math.sin(radians);

        // Rotation to point toward center
        // degreesFromTop + 180 makes it point inward
        const rotation = degreesFromTop + 180;

        return `translateX(${x}px) translateY(${y}px) rotate(${rotation}deg)`;
    }

    render() {
        return `<div style="background-color: rgb(36, 28, 70); width: 100%; height: 100%; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <div id="score-display" style="color: white; font-size: 32px; font-weight: bold; margin-bottom: 20px;">Score: 0</div>
                <div style="display: grid; grid-template: 1fr / 1fr; place-items: center; background: radial-gradient(ellipse at center, #fff6a0 0%, #ffaa00 30%, #ff4400 70%, #cc0000 100%); height: 404px; position: relative;">
                    <img src="js/games/welcome-game/halloween_bg.png" style="grid-area: 1/1; width: 100%; height: 100%; object-fit: contain;">
                    <img id="candy-corn" src="js/games/welcome-game/Candy_Corn.png" style="grid-area: 1/1; z-index: 1; height: 180px; transform: translateX(5px) translateY(35px) rotate(5deg);">
                    <img id="candy-corn-target-2" src="js/games/welcome-game/Candy_Corn.png" style="grid-area: 1/1; z-index: 1; height: 60px; transform: ${this.positionOnCircle(45)}; transition: height 0.15s ease-out;">
                    <img id="candy-corn-target-3" src="js/games/welcome-game/Candy_Corn.png" style="grid-area: 1/1; z-index: 1; height: 60px; transform: ${this.positionOnCircle(140)}; transition: height 0.15s ease-out;">
                    <img id="candy-corn-target-4" src="js/games/welcome-game/Candy_Corn.png" style="grid-area: 1/1; z-index: 1; height: 60px; transform: ${this.positionOnCircle(225)}; transition: height 0.15s ease-out;">
                    <img id="candy-corn-target-5" src="js/games/welcome-game/Candy_Corn.png" style="grid-area: 1/1; z-index: 1; height: 60px; transform: ${this.positionOnCircle(315)}; transition: height 0.15s ease-out;">
                </div>
        </div>`;
    }

    start() {
        console.log('Welcome game started');
        const candyCorn = document.getElementById('candy-corn');
        const target = document.getElementById('candy-corn-target');
        const target2 = document.getElementById('candy-corn-target-2');
        const target3 = document.getElementById('candy-corn-target-3');
        const target4 = document.getElementById('candy-corn-target-4');
        const target5 = document.getElementById('candy-corn-target-5');
        const scoreDisplay = document.getElementById('score-display');
        const canvas = document.getElementById('game-canvas');

        // Draw circle on canvas
        if (canvas) {
            const ctx = canvas.getContext('2d');
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = canvas.width / 2;

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.strokeStyle = 'lime';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        if (candyCorn && target) {
            // 360 degrees over 5 seconds = 72 degrees per second
            // Update every 16ms (roughly 60fps) = 1.152 degrees per frame
            this.rotationInterval = setInterval(() => {
                this.rotation += this.rotationSpeed;
                const normalizedRotation = ((this.rotation % 360) + 360) % 360;

                // Check if spinner is pointing at target (280-290 degrees)
                this.isOnTarget = normalizedRotation >= 300 && normalizedRotation <= 350;

                // Update spinner rotation
                candyCorn.style.transform = `translateX(5px) translateY(35px) rotate(${this.rotation}deg)`;

                // Update target sizes based on whether spinner is on target
                const targetSize = this.isOnTarget ? '90px' : '60px';
                target.style.height = targetSize;
                if (target2) target2.style.height = targetSize;
                if (target3) target3.style.height = targetSize;
                if (target4) target4.style.height = targetSize;
                if (target5) target5.style.height = targetSize;
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
                    // Reverse rotation direction
                    this.rotationSpeed *= -1;
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
