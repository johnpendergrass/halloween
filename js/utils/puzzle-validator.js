/**
 * Word Search Puzzle Validator
 * 
 * Validates that a word search puzzle is solvable by checking:
 * 1. Each target word can be found exactly once in the grid
 * 2. Total length of all words equals the grid size
 */

/**
 * Validates a word search puzzle
 * @param {string[][]} grid - 2D array of letters
 * @param {string[]} targetWords - Array of words to find
 * @returns {object} Validation result
 */
function validateWordSearchPuzzle(grid, targetWords) {
    const result = {
        isValid: false,
        totalWordLength: 0,
        gridSize: 0,
        lengthsMatch: false,
        solution: null,
        errors: []
    };

    // Calculate grid size and total word length
    result.gridSize = grid.length * (grid[0]?.length || 0);
    result.totalWordLength = targetWords.reduce((sum, word) => sum + word.length, 0);
    result.lengthsMatch = result.totalWordLength === result.gridSize;

    // Check 1: Total word lengths must equal grid size
    if (!result.lengthsMatch) {
        result.errors.push(`Total word length (${result.totalWordLength}) does not equal grid size (${result.gridSize})`);
        return result;
    }

    // Check 2: Find all possible placements and attempt to solve
    const wordPlacements = {};
    
    // Find all possible placements for each word
    for (const word of targetWords) {
        const placements = findWordPlacements(grid, word);
        wordPlacements[word] = placements;
    }

    // Use backtracking to find a valid solution
    const solution = findValidSolution(wordPlacements, grid);
    
    if (solution) {
        result.isValid = true;
        result.solution = solution;
    } else {
        result.errors.push('No valid solution found - some words may not exist in grid or placement conflicts prevent solution');
    }

    return result;
}

/**
 * Finds all possible placements of a word in the grid
 * @param {string[][]} grid - 2D array of letters
 * @param {string} word - Word to find
 * @returns {object[]} Array of placement objects
 */
function findWordPlacements(grid, word) {
    const placements = [];
    const rows = grid.length;
    const cols = grid[0].length;
    
    // 8 directions: right, left, down, up, down-right, down-left, up-right, up-left
    const directions = [
        [0, 1],   // right
        [0, -1],  // left
        [1, 0],   // down
        [-1, 0],  // up
        [1, 1],   // down-right
        [1, -1],  // down-left
        [-1, 1],  // up-right
        [-1, -1]  // up-left
    ];

    // Try each starting position
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Try each direction
            for (let [dRow, dCol] of directions) {
                const placement = tryPlaceWord(grid, word, row, col, dRow, dCol);
                if (placement) {
                    placements.push(placement);
                }
            }
        }
    }

    return placements;
}

/**
 * Tries to place a word at a specific position and direction
 * @param {string[][]} grid - 2D array of letters
 * @param {string} word - Word to place
 * @param {number} startRow - Starting row
 * @param {number} startCol - Starting column
 * @param {number} dRow - Row direction
 * @param {number} dCol - Column direction
 * @returns {object|null} Placement object or null if invalid
 */
function tryPlaceWord(grid, word, startRow, startCol, dRow, dCol) {
    const rows = grid.length;
    const cols = grid[0].length;
    const positions = [];

    for (let i = 0; i < word.length; i++) {
        const row = startRow + i * dRow;
        const col = startCol + i * dCol;

        // Check bounds
        if (row < 0 || row >= rows || col < 0 || col >= cols) {
            return null;
        }

        // Check letter match
        if (grid[row][col].toUpperCase() !== word[i].toUpperCase()) {
            return null;
        }

        positions.push({ row, col });
    }

    return {
        word: word.toUpperCase(),
        positions,
        direction: { dRow, dCol },
        start: { row: startRow, col: startCol }
    };
}

/**
 * Finds a valid solution using backtracking
 * @param {object} wordPlacements - Map of words to their possible placements
 * @param {string[][]} grid - 2D array of letters
 * @returns {object|null} Valid solution or null
 */
function findValidSolution(wordPlacements, grid) {
    const words = Object.keys(wordPlacements);
    const usedCells = new Set();
    const solution = {};

    function backtrack(wordIndex) {
        // Base case: all words placed successfully
        if (wordIndex === words.length) {
            return true;
        }

        const word = words[wordIndex];
        const placements = wordPlacements[word];

        // Try each possible placement for this word
        for (const placement of placements) {
            // Check if this placement conflicts with already used cells
            const conflicts = placement.positions.some(pos => 
                usedCells.has(`${pos.row},${pos.col}`)
            );

            if (!conflicts) {
                // Try this placement
                placement.positions.forEach(pos => {
                    usedCells.add(`${pos.row},${pos.col}`);
                });
                solution[word] = placement;

                // Recursively try to place remaining words
                if (backtrack(wordIndex + 1)) {
                    return true;
                }

                // Backtrack: remove this placement
                placement.positions.forEach(pos => {
                    usedCells.delete(`${pos.row},${pos.col}`);
                });
                delete solution[word];
            }
        }

        return false;
    }

    if (backtrack(0)) {
        return solution;
    }
    return null;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        validateWordSearchPuzzle,
        findWordPlacements,
        tryPlaceWord
    };
} else if (typeof window !== 'undefined') {
    // Browser global
    window.validateWordSearchPuzzle = validateWordSearchPuzzle;
}