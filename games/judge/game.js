// Judged! Game - Simple starter version
class JudgedGame {
    constructor() {
        this.score = 0;
        this.gameContent = document.getElementById('game-content');
        this.scoreDisplay = document.getElementById('current-score');
        
        this.init();
    }
    
    init() {
        // Basic initialization
        this.updateScore(0);
        console.log('Judged! game initialized');
    }
    
    updateScore(newScore) {
        this.score = newScore;
        if (this.scoreDisplay) {
            this.scoreDisplay.textContent = this.score;
        }
    }
    
    // Placeholder for future game content
    startGame() {
        this.gameContent.innerHTML = `
            <div class="game-placeholder">
                <h2>🎭 Costume Design Coming Soon!</h2>
                <p>This will be where you design Halloween costumes</p>
                <button onclick="game.updateScore(game.score + 10)">Test Score (+10)</button>
            </div>
        `;
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.game = new JudgedGame();
});