/**
 * Halloween Word Search Puzzle #1
 * 
 * A 7x8 grid containing Halloween-themed words
 */

module.exports = {
    name: "Halloween Word Search",
    description: "Find Halloween words hidden in the letter grid!",
    
    // 7 rows x 8 columns grid
    grid: [
        ['S', 'H', 'E', 'E', 'C', 'O', 'R', 'E'],
        ['N', 'E', 'L', 'Y', 'O', 'F', 'I', 'E'],
        ['A', 'H', 'T', 'R', 'G', 'F', 'E', 'N'],
        ['B', 'I', 'J', 'A', 'I', 'N', 'R', 'S'],
        ['A', 'C', 'A', 'N', 'G', 'E', 'D', 'H'],
        ['R', 'K', 'L', 'A', 'T', 'O', 'U', 'R'],
        ['W', 'O', 'B', 'E', 'W', 'B', 'C', 'O']
    ],
    
    // Target words to find (total length should equal grid size: 7*8 = 56)
    words: [
        'EERIE',       // 5 letters
        'JACKOLANTERN', // 12 letters
        'COBWEB',      // 6 letters
        'BANSHEE',     // 7 letters
        'WRAITH',      // 6 letters
        'SHROUD',      // 6 letters
        'GARGOYLE',    // 8 letters
        'COFFIN'       // 6 letters
    ],
    // Total: 5+12+6+7+6+6+8+6 = 56 letters ✓
    
    gridSize: 56,
    totalWordLength: 56
};