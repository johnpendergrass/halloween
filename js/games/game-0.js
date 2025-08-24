export default class TitleScreen {
    constructor() {
        this.score = 0;
    }

    render() {
        return `
            <div class="welcome-screen">
                <h1>🦇 Welcome to Halloween Minigames! 🦇</h1>
                <p>Choose a game from the menu to start playing</p>
                <div class="halloween-decoration">
                    <span class="pumpkin">🎃</span>
                    <span class="ghost">👻</span>
                    <span class="spider">🕷️</span>
                </div>
            </div>
        `;
    }

    start() {
        console.log('Title screen active');
    }

    stop() {
        console.log('Leaving title screen');
    }

    getScore() {
        return 0;
    }
}