export default class CandySwap {
    constructor() {
        this.name = 'Candy Swap';
        this.description = 'Trade candy with friends to build the best collection!';
        this.score = 0;
        this.isRunning = false;
        
        // Game state
        this.currentRound = 0;
        this.gameOver = false;
        this.playerCandy = [];
        this.playerPreferences = [];
        this.friends = this.initializeFriends();
        this.friendOrder = [];
        this.currentFriend = null;
        this.usedRerolls = new Set();
        
        this.initializeCandyDatabase();
    }

    initializeCandyDatabase() {
        this.candyTypes = [
            // Chocolate
            { name: 'Snickers', emoji: '🍫', baseValue: 9, tags: ['chocolate', 'peanut', 'caramel'] },
            { name: 'Kit Kat', emoji: '🍫', baseValue: 8, tags: ['chocolate', 'crunchy'] },
            { name: 'Hersheys', emoji: '🍫', baseValue: 7, tags: ['chocolate'] },
            { name: 'Reeses', emoji: '🧡', baseValue: 9, tags: ['chocolate', 'peanut'] },
            { name: 'Twix', emoji: '🍫', baseValue: 8, tags: ['chocolate', 'caramel', 'crunchy'] },
            
            // Fruity/Sour  
            { name: 'Skittles', emoji: '🌈', baseValue: 6, tags: ['fruity', 'chewy'] },
            { name: 'Sour Patch', emoji: '😵', baseValue: 7, tags: ['sour', 'fruity', 'chewy'] },
            { name: 'Starbursts', emoji: '⭐', baseValue: 6, tags: ['fruity', 'chewy'] },
            { name: 'Jolly Rancher', emoji: '💎', baseValue: 5, tags: ['fruity', 'hard'] },
            { name: 'Warheads', emoji: '💥', baseValue: 8, tags: ['sour', 'hard'] },
            
            // Hard/Crunchy
            { name: 'Nerds', emoji: '🔥', baseValue: 4, tags: ['crunchy', 'fruity'] },
            { name: 'M&Ms', emoji: '🔴', baseValue: 7, tags: ['chocolate', 'crunchy'] },
            { name: 'Smarties', emoji: '⚪', baseValue: 3, tags: ['hard', 'chalky'] },
            { name: 'Pop Rocks', emoji: '💥', baseValue: 6, tags: ['crunchy', 'fizzy'] },
            
            // Gummy/Chewy
            { name: 'Gummy Bears', emoji: '🐻', baseValue: 5, tags: ['gummy', 'fruity'] },
            { name: 'Swedish Fish', emoji: '🐟', baseValue: 4, tags: ['gummy', 'fruity'] },
            { name: 'Laffy Taffy', emoji: '🍬', baseValue: 5, tags: ['chewy', 'fruity'] },
            { name: 'Tootsie Roll', emoji: '🟤', baseValue: 4, tags: ['chewy', 'chocolate'] },
            
            // Minty/Other
            { name: 'Peppermint Patty', emoji: '❄️', baseValue: 3, tags: ['chocolate', 'minty'] },
            { name: 'Tic Tacs', emoji: '⚪', baseValue: 2, tags: ['minty', 'hard'] },
            { name: 'Life Savers', emoji: '🔴', baseValue: 3, tags: ['minty', 'hard'] },
            
            // Premium/Rare
            { name: 'Full Size Snickers', emoji: '🍫', baseValue: 15, tags: ['chocolate', 'peanut', 'caramel', 'premium'] },
            { name: 'King Size Kit Kat', emoji: '🍫', baseValue: 12, tags: ['chocolate', 'crunchy', 'premium'] },
            { name: 'Toblerone', emoji: '🔺', baseValue: 11, tags: ['chocolate', 'premium', 'nougat'] }
        ];

        this.preferenceTypes = [
            { type: 'love', text: 'Absolutely loves', tag: 'chocolate', multiplier: 2.0 },
            { type: 'love', text: 'Goes crazy for', tag: 'sour', multiplier: 2.0 },
            { type: 'love', text: 'Adores', tag: 'fruity', multiplier: 1.8 },
            { type: 'like', text: 'Really likes', tag: 'crunchy', multiplier: 1.5 },
            { type: 'like', text: 'Enjoys', tag: 'chewy', multiplier: 1.5 },
            { type: 'like', text: 'Prefers', tag: 'gummy', multiplier: 1.3 },
            { type: 'dislike', text: 'Dislikes', tag: 'minty', multiplier: 0.5 },
            { type: 'hate', text: 'Cannot stand', tag: 'peanut', multiplier: 0.1 },
            { type: 'hate', text: 'Allergic to', tag: 'peanut', multiplier: 0.0 },
            { type: 'dislike', text: 'Avoids', tag: 'chalky', multiplier: 0.3 }
        ];
    }

    initializeFriends() {
        return [
            {
                name: 'Emma',
                emoji: '👧',
                personality: 'generous',
                preferences: [
                    { type: 'love', text: 'Absolutely loves', tag: 'chocolate', multiplier: 2.0 },
                    { type: 'hate', text: 'Allergic to', tag: 'peanut', multiplier: 0.0 },
                    { type: 'like', text: 'Really likes', tag: 'fruity', multiplier: 1.5 }
                ]
            },
            {
                name: 'Jake',
                emoji: '👦',
                personality: 'picky',
                preferences: [
                    { type: 'love', text: 'Goes crazy for', tag: 'sour', multiplier: 2.0 },
                    { type: 'dislike', text: 'Dislikes', tag: 'minty', multiplier: 0.5 },
                    { type: 'like', text: 'Enjoys', tag: 'crunchy', multiplier: 1.5 }
                ]
            },
            {
                name: 'Sofia',
                emoji: '👩',
                personality: 'balanced',
                preferences: [
                    { type: 'like', text: 'Prefers', tag: 'gummy', multiplier: 1.3 },
                    { type: 'hate', text: 'Cannot stand', tag: 'chalky', multiplier: 0.1 },
                    { type: 'love', text: 'Adores', tag: 'fruity', multiplier: 1.8 }
                ]
            },
            {
                name: 'Marcus',
                emoji: '👨',
                personality: 'wild',
                preferences: [
                    { type: 'love', text: 'Absolutely loves', tag: 'chocolate', multiplier: 2.0 },
                    { type: 'like', text: 'Really likes', tag: 'crunchy', multiplier: 1.5 },
                    { type: 'dislike', text: 'Avoids', tag: 'chewy', multiplier: 0.3 }
                ]
            }
        ];
    }

    generateRandomCandy(count = 1) {
        const result = [];
        for (let i = 0; i < count; i++) {
            const candy = this.candyTypes[Math.floor(Math.random() * this.candyTypes.length)];
            result.push({ ...candy, id: Math.random().toString(36).substr(2, 9) });
        }
        return result;
    }

    generateRandomPreferences(count = 3) {
        const shuffled = [...this.preferenceTypes].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    calculateCandyValue(candy, preferences) {
        let value = candy.baseValue;
        
        preferences.forEach(pref => {
            if (candy.tags.includes(pref.tag)) {
                value *= pref.multiplier;
            }
        });
        
        return Math.round(value);
    }

    evaluateTradeOffer(friendPrefs, offeredCandy) {
        let totalValue = 0;
        offeredCandy.forEach(candy => {
            totalValue += this.calculateCandyValue(candy, friendPrefs);
        });
        
        // Simple threshold - friends want at least 8 total value
        return totalValue >= 8;
    }

    startNewGame() {
        this.currentRound = 0;
        this.gameOver = false;
        this.score = 0;
        this.usedRerolls.clear();
        
        // Generate player starting state
        this.playerCandy = this.generateRandomCandy(5);
        this.playerPreferences = this.generateRandomPreferences(3);
        
        // Randomize friend order
        this.friendOrder = [...this.friends].sort(() => 0.5 - Math.random());
        
        this.nextRound();
        this.updateGameDisplay();
    }

    nextRound() {
        if (this.currentRound >= 4) {
            this.endGame();
            return;
        }
        
        this.currentRound++;
        this.currentFriend = this.friendOrder[this.currentRound - 1];
        this.generateFriendOffer();
        this.updateGameDisplay();
    }

    generateFriendOffer() {
        const count = Math.floor(Math.random() * 3) + 1; // 1-3 candy
        this.currentFriend.offering = this.generateRandomCandy(count);
    }

    rerollFriendOffer() {
        if (!this.usedRerolls.has(this.currentFriend.name)) {
            this.usedRerolls.add(this.currentFriend.name);
            this.generateFriendOffer();
            return true;
        }
        return false;
    }

    makeTrade(selectedCandyIds) {
        const offeredCandy = this.playerCandy.filter(candy => selectedCandyIds.includes(candy.id));
        
        if (this.evaluateTradeOffer(this.currentFriend.preferences, offeredCandy)) {
            // Remove offered candy from player
            this.playerCandy = this.playerCandy.filter(candy => !selectedCandyIds.includes(candy.id));
            
            // Add friend's candy to player
            this.playerCandy.push(...this.currentFriend.offering);
            
            return { success: true, message: `${this.currentFriend.name} agrees to the trade! 😊` };
        } else {
            return { success: false, message: `${this.currentFriend.name} doesn't think that's a fair trade. 😔` };
        }
    }

    skipTrade() {
        return { success: true, message: `You decided not to trade with ${this.currentFriend.name}.` };
    }

    endGame() {
        this.gameOver = true;
        
        // Calculate final score
        this.score = 0;
        this.playerCandy.forEach(candy => {
            this.score += this.calculateCandyValue(candy, this.playerPreferences);
        });
        
        if (window.gameApp) {
            window.gameApp.updateScore(this.score);
        }
    }

    render() {
        if (!this.isRunning) {
            return this.renderStartScreen();
        }
        
        if (this.gameOver) {
            return this.renderGameOver();
        }
        
        return this.renderGamePlay();
    }

    renderStartScreen() {
        return `
            <div class="game-screen">
                <h2>🍬 Candy Swap 🍬</h2>
                <p>Trade candy with your friends to build the perfect collection!</p>
                <div class="game-placeholder">
                    <div style="text-align: center; padding: 20px;">
                        <p style="font-size: 1.2em; margin-bottom: 20px;">
                            You'll meet 4 friends and have a chance to trade candy with each one.
                            Build the best collection based on your preferences!
                        </p>
                        <div style="font-size: 3em; margin: 20px 0;">
                            🍫🍬🍭🍯
                        </div>
                        <button onclick="gameApp.getCurrentGame().startNewGame()" 
                                style="background: #ff6600; color: white; border: none; padding: 15px 30px; 
                                       border-radius: 8px; font-size: 1.2em; cursor: pointer;">
                            Start Trading! 🍬
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderGamePlay() {
        return `
            <div class="game-screen">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h3>Round ${this.currentRound} of 4</h3>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <!-- Your Preferences -->
                    <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px;">
                        <h4>Your Preferences:</h4>
                        ${this.playerPreferences.map(pref => 
                            `<div style="margin: 5px 0;">• ${pref.text} ${pref.tag}</div>`
                        ).join('')}
                    </div>
                    
                    <!-- Your Candy -->
                    <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px;">
                        <h4>Your Candy (${this.playerCandy.length}):</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 5px;">
                            ${this.playerCandy.map(candy => 
                                `<span style="background: rgba(255,255,255,0.2); padding: 5px 8px; border-radius: 4px; font-size: 0.9em;">
                                    ${candy.emoji} ${candy.name}
                                </span>`
                            ).join('')}
                        </div>
                    </div>
                </div>

                <!-- Current Friend -->
                <div style="background: rgba(255,255,255,0.15); padding: 20px; border-radius: 10px; text-align: center;">
                    <h3>${this.currentFriend.emoji} ${this.currentFriend.name}</h3>
                    
                    <div style="margin: 15px 0;">
                        <h4>${this.currentFriend.name}'s Preferences:</h4>
                        ${this.currentFriend.preferences.map(pref => 
                            `<div style="margin: 5px 0; color: ${pref.type === 'love' ? '#90EE90' : pref.type === 'hate' ? '#FFB6C1' : '#FFFFE0'};">
                                • ${pref.text} ${pref.tag}
                            </div>`
                        ).join('')}
                    </div>

                    <div style="margin: 20px 0;">
                        <h4>${this.currentFriend.name} offers:</h4>
                        <div style="display: flex; justify-content: center; gap: 10px; margin: 10px 0;">
                            ${this.currentFriend.offering.map(candy => 
                                `<div style="background: rgba(255,255,255,0.2); padding: 10px; border-radius: 8px;">
                                    <div style="font-size: 2em;">${candy.emoji}</div>
                                    <div>${candy.name}</div>
                                </div>`
                            ).join('')}
                        </div>
                        
                        ${!this.usedRerolls.has(this.currentFriend.name) ? 
                            `<button onclick="gameApp.getCurrentGame().handleReroll()" 
                                     style="background: #444; color: white; border: none; padding: 8px 16px; 
                                            border-radius: 5px; margin: 10px 5px; cursor: pointer;">
                                "What else you got?" 🔄
                            </button>` : ''
                        }
                    </div>

                    <!-- Trading Interface -->
                    <div style="margin: 20px 0;">
                        <h4>Select candy to offer:</h4>
                        <div id="candy-selection" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin: 15px 0;">
                            ${this.playerCandy.map(candy => 
                                `<label style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 8px; cursor: pointer; display: block;">
                                    <input type="checkbox" value="${candy.id}" style="margin-right: 8px;">
                                    <span>${candy.emoji} ${candy.name}</span>
                                </label>`
                            ).join('')}
                        </div>
                        
                        <div style="margin-top: 20px;">
                            <button onclick="gameApp.getCurrentGame().handleTrade()" 
                                    style="background: #28a745; color: white; border: none; padding: 12px 24px; 
                                           border-radius: 8px; font-size: 1.1em; cursor: pointer; margin: 0 10px;">
                                Make Trade 🤝
                            </button>
                            <button onclick="gameApp.getCurrentGame().handleSkip()" 
                                    style="background: #6c757d; color: white; border: none; padding: 12px 24px; 
                                           border-radius: 8px; font-size: 1.1em; cursor: pointer; margin: 0 10px;">
                                Skip Trade ⏭️
                            </button>
                        </div>
                    </div>

                    <div id="trade-result" style="margin-top: 15px; font-size: 1.1em; min-height: 25px;"></div>
                </div>
            </div>
        `;
    }

    renderGameOver() {
        const candyCounts = {};
        const candyValues = {};
        
        this.playerCandy.forEach(candy => {
            candyCounts[candy.name] = (candyCounts[candy.name] || 0) + 1;
            if (!candyValues[candy.name]) {
                candyValues[candy.name] = {
                    emoji: candy.emoji,
                    value: this.calculateCandyValue(candy, this.playerPreferences)
                };
            }
        });

        return `
            <div class="game-screen">
                <h2>🎉 Trading Complete! 🎉</h2>
                <div style="text-align: center; padding: 20px;">
                    <h3 style="color: #ffaa66; font-size: 2em;">Final Score: ${this.score}</h3>
                    
                    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">
                        <h4>Your Final Collection:</h4>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin: 15px 0;">
                            ${Object.entries(candyCounts).map(([name, count]) => {
                                const candy = candyValues[name];
                                const totalValue = candy.value * count;
                                return `<div style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 8px;">
                                    <div>${candy.emoji} ${name}</div>
                                    <div>×${count} = ${totalValue} pts</div>
                                </div>`;
                            }).join('')}
                        </div>
                    </div>

                    <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h4>Your Preferences Were:</h4>
                        ${this.playerPreferences.map(pref => 
                            `<div style="margin: 5px 0;">• ${pref.text} ${pref.tag}</div>`
                        ).join('')}
                    </div>

                    <button onclick="gameApp.getCurrentGame().startNewGame()" 
                            style="background: #ff6600; color: white; border: none; padding: 15px 30px; 
                                   border-radius: 8px; font-size: 1.2em; cursor: pointer; margin: 10px;">
                        Play Again! 🔄
                    </button>
                </div>
            </div>
        `;
    }

    handleReroll() {
        if (this.rerollFriendOffer()) {
            this.updateGameDisplay();
        }
    }

    handleTrade() {
        const checkboxes = document.querySelectorAll('#candy-selection input[type="checkbox"]:checked');
        const selectedIds = Array.from(checkboxes).map(cb => cb.value);
        
        if (selectedIds.length === 0) {
            this.showTradeResult("Please select some candy to offer!");
            return;
        }
        
        const result = this.makeTrade(selectedIds);
        this.showTradeResult(result.message);
        
        if (result.success) {
            setTimeout(() => {
                this.nextRound();
                this.updateGameDisplay();
            }, 2000);
        }
    }

    handleSkip() {
        const result = this.skipTrade();
        this.showTradeResult(result.message);
        setTimeout(() => {
            this.nextRound();
            this.updateGameDisplay();
        }, 1500);
    }

    showTradeResult(message) {
        const resultDiv = document.getElementById('trade-result');
        if (resultDiv) {
            resultDiv.textContent = message;
            resultDiv.style.color = message.includes('agrees') ? '#90EE90' : 
                                  message.includes("doesn't") ? '#FFB6C1' : '#FFFFE0';
        }
    }

    updateGameDisplay() {
        const gameContent = document.getElementById('game-content');
        if (gameContent) {
            gameContent.innerHTML = this.render();
        }
    }

    start() {
        this.isRunning = true;
        console.log('Candy Swap game started!');
    }

    stop() {
        this.isRunning = false;
        console.log('Candy Swap game stopped!');
    }

    getScore() {
        return this.score;
    }
}