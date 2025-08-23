# Candy Swap - Game Design Document

## High Level Vision
A Halloween-themed trading game where players, as kids after trick-or-treating, negotiate candy trades with NPC friends to maximize their candy collection's value based on personal preferences.

## Core Metrics
- **Session Length:** 3-5 minutes per game
- **Mastery Time:** 30-60 minutes total
- **Replayability:** High due to randomized friend order and starting conditions

## Game Flow Overview
1. Player starts with 5 random candies and 3 random preferences
2. Meet 4 fixed friends in random order (one per round)
3. Each friend offers 1-3 candies and player negotiates what to offer in return
4. Optional "What else you got?" button (once per friend) to completely reroll their offering
5. Game ends after 4 rounds, score revealed based on final candy collection value

## Core Mechanics

### Round Structure
- **Sequential Trading:** Deal with one friend at a time across 4 rounds
- **Fixed Characters:** 4 unique kids with fixed names, personalities, and preferences
- **Random Order:** Friends appear in randomized sequence each game
- **Round Display:** Current round number (1-4) shown at top of screen
- **Skip Option:** Players can choose to skip trading with any friend

### Trading System
- **Friend Attributes:** Each friend has fixed name, personality, and 3 preferences
- **Offering:** Each friend presents 1-3 candies they want to trade
- **Player Response:** Choose what candies to offer in return
- **Agreement System:** Friend responds "Agree" or "Disagree" based on their preferences
- **Immediate Trades:** Each trade executes immediately, allowing use of new candy in subsequent trades
- **Reroll Option:** "What else you got?" button usable once per friend to completely change their offering using same generation logic

### Candy System
- **Total Candies:** ~30 different types
- **Tags:** ~10 categories (peanut, caramel, crunchy, nougat, chocolate, sour, fruity, minty, etc.)
- **Base Value:** Each candy has inherent desirability rating (1-10 scale)
- **Tag System:** Each candy has 1+ tags that interact with preferences

### Preference System
- **Player Preferences:** 3 random preferences at game start
- **Friend Preferences:** 3 fixed preferences per friend (consistent across games)
- **Types:** 
  - Positive: "Loves chocolate" (+bonus value)
  - Negative: "Hates nuts" (major penalty/won't accept)
  - Neutral: "Prefers crunchy" (small bonus)

### Scoring
- **Hidden During Play:** Player doesn't see total value until game end
- **Final Score:** Sum of (base candy value × quantity × preference multipliers)
- **Breakdown:** Show final inventory with value per candy type

## Character Profiles

### The Four Friends
1. **Friend A:** [Name TBD] - Balanced trader
2. **Friend B:** [Name TBD] - Generous personality 
3. **Friend C:** [Name TBD] - Picky/demanding
4. **Friend D:** [Name TBD] - Wild card preferences

*Stretch Goal: Implement personality traits affecting trading behavior (stinginess, generosity, etc.)*

## Technical Requirements

### Game State
- Player candy inventory (type and quantity)
- Player preferences
- Current round number
- Friend sequence for this game
- Used "What else you got?" buttons per friend

### UI Elements
- Round counter at top
- Friend portrait/name
- Friend's candy offering
- Player's candy selection interface
- Trade confirmation
- "What else you got?" button (disabled after use)
- "Skip" option

## Questions for Next Phase

1. **Friend Names/Themes:** What should the 4 friends be called and what should their personality themes be?

2. **Candy Categories:** Which 10 tags should we use for the candy system?

3. **Value Scaling:** What should the base value range be, and how should preferences modify values?

4. **Art Style:** What visual style should we use for the friends and candy icons?

## Next Steps
1. **Define Characters:** Create the 4 friends with names, personalities, and preferences
2. **Create Candy Database:** Define 30 candies with tags and base values  
3. **Build Prototype:** Implement core trading loop
4. **Balance Pass:** Test and adjust values for optimal gameplay