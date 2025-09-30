export default class TrickRTreatInc {
    constructor() {
        this.score = 0;
        this.gameState = 'idle';
        // TODO: Add game state variables for Trick r' Treat Inc.
    }

    render() {
        return `Trick r Treat Inc.`;
    }

    start() {
        this.gameState = 'playing';
    }

    stop() {
        this.gameState = 'idle';
    }

    getScore() {
        return this.score;
    }
}