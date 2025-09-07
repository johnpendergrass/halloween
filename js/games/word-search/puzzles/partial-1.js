/**
 */

module.exports = {
    name: "Halloween Word Search (Partial)",
    description: "Find Halloween words hidden in the letter grid!",

    // 7 rows x 8 columns grid
    grid: [
        ['E', 'E', 'R', 'I', '', '', '', ''],
        ['', '', '', 'E', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
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