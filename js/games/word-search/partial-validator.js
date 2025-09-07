/**
 * Partial Word Search Puzzle Validator
 * 
 * Validates partial/incomplete word search puzzles by checking:
 * 1. Each target word can be found exactly once (not 0, not >1)
 * 2. Grid can be larger than needed (allows empty cells)
 * 3. Treats empty strings as null cells
 */

/**
 * Validates a partial word search puzzle
 * @param {string[][]} grid - 2D array of letters (can contain "" for empty cells)
 * @param {string[]} targetWords - Array of words to find
 * @returns {object} Validation result with detailed error reporting
 */
function validatePartialWordSearchPuzzle(grid, targetWords) {
    const result = {
        isValid: true,
        problems: [],
        summary: {
            totalWords: targetWords.length,
            validWords: 0,
            errorWords: 0
        }
    };

    // Normalize grid - convert empty strings to null
    const normalizedGrid = grid.map(row => 
        row.map(cell => (cell === "" || cell === null || cell === undefined) ? null : cell.toString().toUpperCase())
    );

    // Validate grid dimensions
    const rows = normalizedGrid.length;
    const cols = normalizedGrid[0]?.length || 0;
    
    if (rows === 0 || cols === 0) {
        result.isValid = false;
        result.problems.push({
            word: "GRID",
            count: 0,
            error: "Grid is empty or invalid"
        });
        return result;
    }

    // Check if grid is large enough for the longest word
    const longestWordLength = Math.max(...targetWords.map(word => word.length));
    if (Math.max(rows, cols) < longestWordLength) {
        result.isValid = false;
        result.problems.push({
            word: "GRID",
            count: 0,
            error: `Grid too small: longest word is ${longestWordLength} letters, but max grid dimension is ${Math.max(rows, cols)}`
        });
        return result;
    }

    // For each target word, find all possible placements
    for (const word of targetWords) {
        const upperWord = word.toUpperCase();
        const placements = findAllWordPlacements(normalizedGrid, upperWord);
        const count = placements.length;

        if (count === 0) {
            result.isValid = false;
            result.problems.push({
                word: upperWord,
                count: 0,
                error: "Word not found in grid"
            });
            result.summary.errorWords++;
        } else if (count === 1) {
            result.summary.validWords++;
        } else {
            result.isValid = false;
            result.problems.push({
                word: upperWord,
                count: count,
                error: `Word found multiple times (${count})`
            });
            result.summary.errorWords++;
        }
    }

    return result;
}

/**
 * Finds all possible placements for a word in the grid
 * @param {string[][]} grid - Normalized 2D array of letters
 * @param {string} word - Word to find (uppercase)
 * @returns {Array} Array of placement objects
 */
function findAllWordPlacements(grid, word) {
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
                const placement = tryFindWord(grid, word, row, col, direction.dRow, direction.dCol);
                if (placement) {
                    placements.push(placement);
                }
            }
        }
    }

    return placements;
}

/**
 * Tries to find a word at a specific position and direction
 * @param {string[][]} grid - 2D array of letters
 * @param {string} word - Word to find
 * @param {number} startRow - Starting row
 * @param {number} startCol - Starting column
 * @param {number} dRow - Row direction
 * @param {number} dCol - Column direction
 * @returns {object|null} Placement object or null if not found
 */
function tryFindWord(grid, word, startRow, startCol, dRow, dCol) {
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

        // Check if cell is empty (null) or doesn't match
        const cellValue = grid[row][col];
        if (cellValue === null || cellValue !== word[i]) {
            return null;
        }

        positions.push({ row, col });
    }

    return {
        word: word,
        startRow: startRow,
        startCol: startCol,
        endRow: startRow + (word.length - 1) * dRow,
        endCol: startCol + (word.length - 1) * dCol,
        direction: { dRow, dCol },
        positions: positions
    };
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        validatePartialWordSearchPuzzle,
        findAllWordPlacements,
        tryFindWord
    };
} else if (typeof window !== 'undefined') {
    // Browser global
    window.validatePartialWordSearchPuzzle = validatePartialWordSearchPuzzle;
}