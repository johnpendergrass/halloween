export default class TestSize {
    constructor() {
        this.name = 'Test Size';
        this.description = 'Test to verify exact 905x720 pixel dimensions with sliding panel overlay';
        this.score = 0;
        this.isRunning = false;
    }

    render() {
        return `
            <div style="
                position: absolute;
                left: 0;
                top: 0;
                width: 905px;
                height: 720px;
                background: url('test-size-905x720.svg') no-repeat;
                background-size: 905px 720px;
                border: none;
                margin: 0;
                padding: 0;
            ">
            </div>
            <div style="
                position: absolute;
                bottom: 10px;
                right: 10px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 10px;
                border-radius: 5px;
                font-family: monospace;
                font-size: 12px;
                z-index: 100;
            ">
                <div>Game Area: 905x720</div>
                <div>Position: (0,0)</div>
                <div>Panel overlays rightmost 125px when expanded</div>
                <div>Use panel toggle to test overlay</div>
            </div>
        `;
    }

    start() {
        this.isRunning = true;
        console.log('Test Size game started - checking 905x720 fit with sliding panel overlay');
        
        // Update the score to show the test is active
        this.score = 905720; // Creative way to show dimensions
        
        // Check if the game area has scrollbars after a brief delay
        setTimeout(() => {
            const gameContent = document.getElementById('game-content');
            if (gameContent) {
                const hasVerticalScroll = gameContent.scrollHeight > gameContent.clientHeight;
                const hasHorizontalScroll = gameContent.scrollWidth > gameContent.clientWidth;
                
                console.log('=== SIZE TEST RESULTS ===');
                console.log('Game content dimensions:', gameContent.clientWidth + 'x' + gameContent.clientHeight);
                console.log('Scroll dimensions:', gameContent.scrollWidth + 'x' + gameContent.scrollHeight);
                console.log('Has vertical scrollbar:', hasVerticalScroll);
                console.log('Has horizontal scrollbar:', hasHorizontalScroll);
                
                if (hasVerticalScroll || hasHorizontalScroll) {
                    console.warn('⚠️  SCROLLBARS DETECTED - Image too large!');
                } else {
                    console.log('✅ Perfect fit - no scrollbars');
                }
            }
        }, 100);
    }

    stop() {
        this.isRunning = false;
        console.log('Test Size game stopped');
    }

    getScore() {
        return this.score;
    }
}