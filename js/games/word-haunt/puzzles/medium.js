/**
 * Medium Halloween Word Haunt Puzzle
 * 
 * A 7x7 grid with moderate difficulty Halloween words
 * Mix of horizontal, vertical, and diagonal placements
 */

module.exports = {
    name: "Medium Halloween Haunt",
    description: "Find spooky words with moderate challenge!",
    
    // 7 rows x 7 columns grid
    grid: [
        ['W', 'I', 'T', 'C', 'H', 'E', 'S'],
        ['A', 'R', 'A', 'M', 'U', 'N', 'P'],
        ['R', 'D', 'K', 'G', 'M', 'M', 'I'],
        ['L', 'C', 'A', 'N', 'D', 'Y', 'D'],
        ['O', 'A', 'S', 'T', 'L', 'E', 'R'],
        ['C', 'U', 'L', 'D', 'R', 'O', 'N'],
        ['K', 'S', 'P', 'O', 'O', 'K', 'Y']
    ],
    
    // Target words to find - mix of lengths and orientations
    words: [
        'WITCHES',  // 7 letters - horizontal, top row
        'SPOOKY',   // 6 letters - horizontal, bottom row
        'CANDY',    // 5 letters - horizontal, row 4
        'CASTLE',   // 6 letters - vertical, column 6
        'CAULDRON', // 8 letters - diagonal, scattered
        'WARD'      // 4 letters - vertical, column 1
    ],
    
    gridSize: 49,           // 7 * 7 = 49
    totalWordLength: 36     // 7+6+5+6+8+4 = 36
};