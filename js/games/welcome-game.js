export default class WelcomeGame {
    constructor() {
        this.score = 0;
    }

    render() {
        return `<div style="background-color: rgb(36, 28, 70); background-image: url('js/games/welcome-game/halloween_bg.png'); background-size: contain; background-repeat: no-repeat; background-position: center; width: 100%; height: 100%; padding: 20px;">
        </div>`;
    }

    start() {
        console.log('Welcome game started');
    }

    stop() {
        console.log('Welcome game stopped');
    }

    getScore() {
        return this.score;
    }
}
