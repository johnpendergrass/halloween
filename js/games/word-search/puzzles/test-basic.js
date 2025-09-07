/**
 * Basic Test Puzzles for Word Search Validator
 * 
 * Simple 2x2 grids for testing validation logic
 */

module.exports = {
    // Valid test cases
    valid: [
        {
            name: "Horizontal Words",
            description: "Two horizontal words, no conflicts",
            grid: [['a', 'b'], ['c', 'd']],
            words: ['ab', 'cd'],
            expected: true
        },
        {
            name: "Vertical Words", 
            description: "Two vertical words, no conflicts",
            grid: [['a', 'b'], ['c', 'd']],
            words: ['ac', 'bd'],
            expected: true
        },
        {
            name: "Diagonal Words",
            description: "Two diagonal words, no conflicts", 
            grid: [['a', 'b'], ['c', 'd']],
            words: ['ad', 'bc'],
            expected: true
        }
    ],
    
    // Invalid test cases
    invalid: [
        {
            name: "Word Not Found",
            description: "Word 'aa' cannot be found in grid",
            grid: [['a', 'b'], ['c', 'd']],
            words: ['aa', 'cd'],
            expected: false,
            expectedError: 'Word "aa" cannot be found in the grid'
        },
        {
            name: "Wrong Total Length",
            description: "Total word length (3) ≠ grid size (4)",
            grid: [['a', 'b'], ['c', 'd']],
            words: ['ab', 'c'],
            expected: false,
            expectedError: 'Total word length (3) does not equal grid size (4)'
        },
        {
            name: "Conflicting Placements",
            description: "Words share the 'a' cell - impossible to place both",
            grid: [['a', 'b'], ['c', 'd']],
            words: ['ab', 'ac'],
            expected: false,
            expectedError: 'No valid solution found - words have conflicting placements'
        }
    ],
    
    // Edge cases
    edge: [
        {
            name: "Empty Grid",
            description: "Empty grid with no words",
            grid: [],
            words: [],
            expected: true
        },
        {
            name: "Single Cell",
            description: "Single cell grid with one letter word",
            grid: [['x']],
            words: ['x'],
            expected: true
        },
        {
            name: "Case Insensitive",
            description: "Uppercase grid with lowercase words",
            grid: [['A', 'B'], ['C', 'D']],
            words: ['ab', 'cd'],
            expected: true
        }
    ],
    
    // Complex test case
    complex: {
        name: "3x3 Grid",
        description: "Larger grid with multiple words",
        grid: [
            ['c', 'a', 't'],
            ['d', 'o', 'g'], 
            ['r', 'a', 't']
        ],
        words: ['cat', 'dog', 'rat'],
        // This may or may not be valid - depends on word placement conflicts
        expected: null // To be determined by validation
    }
};