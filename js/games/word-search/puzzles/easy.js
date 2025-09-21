/**
 * Easy Halloween Word Search Puzzle
 * 
 * A 6x6 grid with simple, short Halloween words
 * Perfect for beginners or quick games
 */

module.exports = {
    name: "Easy Halloween Puzzle",
    description: "Find simple spooky words in this beginner-friendly grid!",
    
    // 6 rows x 6 columns grid
    grid: [
        ['G', 'H', 'O', 'S', 'T', 'M'],
        ['O', 'A', 'R', 'A', 'N', 'U'],
        ['B', 'T', 'I', 'C', 'K', 'M'],
        ['L', 'K', 'N', 'G', 'L', 'M'],
        ['I', 'C', 'A', 'T', 'S', 'Y'],
        ['N', 'E', 'B', 'A', 'T', 'S']
    ],
    
    // Target words to find - all simple, short Halloween words
    words: [
        'GHOST',    // 5 letters - horizontal, top row
        'HAT',      // 3 letters - vertical, column 2
        'CATS',     // 4 letters - horizontal, row 5
        'BATS',     // 4 letters - horizontal, bottom row
        'TRICK'     // 5 letters - vertical, columns scattered
    ],
    
    gridSize: 36,           // 6 * 6 = 36
    totalWordLength: 21     // 5+3+4+4+5 = 21
};