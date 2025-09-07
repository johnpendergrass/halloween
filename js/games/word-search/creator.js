/**
 * Word Search Puzzle Creator
 * 
 * Creates valid word search puzzles from a word list and dimensions
 */

/**
 * Creates a word search puzzle from given words and dimensions
 * @param {string[]} words - Array of words to place in the puzzle
 * @param {object} dimensions - {rows: number, cols: number}
 * @returns {object} Success/error result with puzzle data
 */
function createWordSearchPuzzle(words, dimensions) {
    const result = {
        success: false,
        puzzle: null,
        error: null
    };

    // Input validation
    const gridSize = dimensions.rows * dimensions.cols;
    const totalWordLength = words.reduce((sum, word) => sum + word.length, 0);

    if (totalWordLength !== gridSize) {
        result.error = `Total word length (${totalWordLength}) does not equal grid size (${gridSize})`;
        return result;
    }

    // Create empty grid
    const grid = createEmptyGrid(dimensions.rows, dimensions.cols);
    
    // Try to place all words using backtracking
    const solution = backtrackSolve(grid, words, 0);
    
    if (solution) {
        // Fill any remaining empty cells with random letters
        fillEmptySpaces(solution);
        
        result.success = true;
        result.puzzle = {
            name: "Generated Puzzle",
            description: "Auto-generated word search puzzle",
            grid: solution,
            words: words.map(word => word.toUpperCase()),
            gridSize: gridSize,
            totalWordLength: totalWordLength
        };
    } else {
        result.error = "Cannot create puzzle - no valid arrangement found for given words";
    }

    return result;
}

/**
 * Creates an empty grid filled with null values
 * @param {number} rows - Number of rows
 * @param {number} cols - Number of columns
 * @returns {Array} 2D grid array
 */
function createEmptyGrid(rows, cols) {
    return Array(rows).fill(null).map(() => Array(cols).fill(null));
}

/**
 * Uses backtracking to place all words in the grid
 * @param {Array} grid - 2D grid array
 * @param {string[]} words - Words to place
 * @param {number} wordIndex - Current word index
 * @returns {Array|null} Completed grid or null if impossible
 */
function backtrackSolve(grid, words, wordIndex) {
    // Base case: all words placed successfully
    if (wordIndex === words.length) {
        return grid;
    }

    const word = words[wordIndex].toUpperCase();
    const placements = findValidPlacements(grid, word);

    // Try each possible placement for this word
    for (const placement of placements) {
        // Make the placement
        const originalCells = [];
        let canPlace = true;

        for (let i = 0; i < word.length; i++) {
            const row = placement.startRow + i * placement.dRow;
            const col = placement.startCol + i * placement.dCol;
            
            originalCells.push(grid[row][col]);
            
            // Check if cell is empty or already has the correct letter
            if (grid[row][col] !== null && grid[row][col] !== word[i]) {
                canPlace = false;
                break;
            }
            
            grid[row][col] = word[i];
        }

        if (canPlace) {
            // Recursively try to place remaining words
            const result = backtrackSolve(grid, words, wordIndex + 1);
            if (result) {
                return result;
            }
        }

        // Backtrack: restore original cell values
        for (let i = 0; i < word.length; i++) {
            const row = placement.startRow + i * placement.dRow;
            const col = placement.startCol + i * placement.dCol;
            grid[row][col] = originalCells[i];
        }
    }

    return null; // No valid placement found
}

/**
 * Finds all valid placements for a word in the current grid
 * @param {Array} grid - 2D grid array
 * @param {string} word - Word to place
 * @returns {Array} Array of valid placement objects
 */
function findValidPlacements(grid, word) {
    const placements = [];
    const rows = grid.length;
    const cols = grid[0].length;
    
    // 8 directions: right, left, down, up, down-right, down-left, up-right, up-left
    const directions = [
        { dRow: 0, dCol: 1 },   // right
        { dRow: 0, dCol: -1 },  // left
        { dRow: 1, dCol: 0 },   // down
        { dRow: -1, dCol: 0 },  // up
        { dRow: 1, dCol: 1 },   // down-right
        { dRow: 1, dCol: -1 },  // down-left
        { dRow: -1, dCol: 1 },  // up-right
        { dRow: -1, dCol: -1 }  // up-left
    ];

    // Try each starting position
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Try each direction
            for (const direction of directions) {
                if (canPlaceWord(grid, word, row, col, direction.dRow, direction.dCol)) {
                    placements.push({
                        startRow: row,
                        startCol: col,
                        dRow: direction.dRow,
                        dCol: direction.dCol
                    });
                }
            }
        }
    }

    return placements;
}

/**
 * Checks if a word can be placed at a specific position and direction
 * @param {Array} grid - 2D grid array
 * @param {string} word - Word to place
 * @param {number} startRow - Starting row
 * @param {number} startCol - Starting column
 * @param {number} dRow - Row direction
 * @param {number} dCol - Column direction
 * @returns {boolean} True if word can be placed
 */
function canPlaceWord(grid, word, startRow, startCol, dRow, dCol) {
    const rows = grid.length;
    const cols = grid[0].length;

    for (let i = 0; i < word.length; i++) {
        const row = startRow + i * dRow;
        const col = startCol + i * dCol;

        // Check bounds
        if (row < 0 || row >= rows || col < 0 || col >= cols) {
            return false;
        }

        // Check if cell is empty or already has the correct letter
        const cellValue = grid[row][col];
        if (cellValue !== null && cellValue !== word[i]) {
            return false;
        }
    }

    return true;
}

/**
 * Fills empty cells in the grid with random letters
 * @param {Array} grid - 2D grid array (modified in place)
 */
function fillEmptySpaces(grid) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === null) {
                grid[row][col] = alphabet[Math.floor(Math.random() * alphabet.length)];
            }
        }
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        createWordSearchPuzzle,
        createEmptyGrid,
        findValidPlacements,
        canPlaceWord,
        fillEmptySpaces
    };
} else if (typeof window !== 'undefined') {
    // Browser global
    window.createWordSearchPuzzle = createWordSearchPuzzle;
}