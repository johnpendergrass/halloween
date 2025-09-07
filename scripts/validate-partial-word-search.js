#!/usr/bin/env node

/**
 * Partial Word Search Puzzle Validator Script
 * 
 * Usage: npm run validate-partial-word-search -- --puzzle <puzzle-file-path>
 * Example: npm run validate-partial-word-search -- --puzzle js/games/word-search/puzzles/word-search-1.js
 */

const { validatePartialWordSearchPuzzle } = require('../js/games/word-search/partial-validator');

// ANSI color codes for console output
const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    reset: '\x1b[0m'
};

function colorize(text, color) {
    return `${colors[color]}${text}${colors.reset}`;
}

function printSeparator() {
    console.log(colorize('━'.repeat(60), 'dim'));
}

function printHeader(puzzle) {
    console.log(colorize(`Validating partial word search puzzle: ${puzzle.name}`, 'cyan'));
    console.log(colorize(`Description: ${puzzle.description}`, 'white'));
    console.log(colorize(`Words to find: ${puzzle.words.join(', ')}`, 'white'));
    console.log(colorize(`Grid size: ${puzzle.grid.length}×${puzzle.grid[0]?.length || 0}`, 'white'));
    printSeparator();
}

function printGrid(grid) {
    console.log(colorize('Grid:', 'white'));
    console.log();
    
    // Print column headers
    const colHeaders = '  ' + Array.from({length: grid[0]?.length || 0}, (_, i) => i).join(' ');
    console.log(colorize(colHeaders, 'dim'));
    
    grid.forEach((row, rowIndex) => {
        const formattedRow = row.map(cell => cell === null || cell === "" ? '·' : cell).join(' ');
        console.log(`${rowIndex} ${formattedRow}`);
    });
    console.log();
}

function printResults(result) {
    if (result.isValid) {
        console.log(colorize('✅ VALIDATION PASSED', 'green'));
        console.log();
        console.log(colorize('Summary:', 'white'));
        console.log(`• Total words: ${result.summary.totalWords}`);
        console.log(`• Valid words: ${result.summary.validWords}`);
        console.log(`• Problem words: ${result.summary.errorWords}`);
    } else {
        console.log(colorize('❌ VALIDATION FAILED', 'red'));
        console.log();
        console.log(colorize('Problems found:', 'red'));
        
        result.problems.forEach(problem => {
            if (problem.word === 'GRID') {
                console.log(`• ${colorize(problem.error, 'red')}`);
            } else if (problem.count === 0) {
                console.log(`• ${colorize(problem.word, 'yellow')}: ${colorize(problem.error, 'red')}`);
            } else {
                console.log(`• ${colorize(problem.word, 'yellow')}: ${colorize(problem.error, 'red')}`);
            }
        });
        
        console.log();
        console.log(colorize('Summary:', 'white'));
        console.log(`• Total words: ${result.summary.totalWords}`);
        console.log(`• Valid words: ${result.summary.validWords}`);
        console.log(`• Problem words: ${result.summary.errorWords}`);
    }
}

function loadPuzzleFile(filePath) {
    // Resolve relative path from current working directory
    const path = require('path');
    const resolvedPath = path.resolve(filePath);
    
    try {
        // Clear require cache to ensure fresh load
        delete require.cache[resolvedPath];
        const puzzle = require(resolvedPath);
        
        // Validate puzzle structure
        if (!puzzle.grid || !Array.isArray(puzzle.grid)) {
            throw new Error('Puzzle file must export an object with a "grid" array');
        }
        if (!puzzle.words || !Array.isArray(puzzle.words)) {
            throw new Error('Puzzle file must export an object with a "words" array');
        }
        
        return puzzle;
    } catch (error) {
        if (error.code === 'MODULE_NOT_FOUND') {
            throw new Error(`Puzzle file not found: ${filePath}`);
        }
        throw new Error(`Error loading puzzle file: ${error.message}`);
    }
}

function parseArguments() {
    // Remove any standalone -- arguments that npm adds
    const args = process.argv.slice(2).filter(arg => arg !== '--');
    
    const puzzleIndex = args.indexOf('--puzzle');
    
    if (puzzleIndex === -1) {
        throw new Error('Missing required argument: --puzzle <puzzle-file-path>');
    }
    
    if (puzzleIndex + 1 >= args.length) {
        throw new Error('--puzzle requires a file path');
    }
    
    const puzzleFilePath = args[puzzleIndex + 1];
    
    try {
        const puzzle = loadPuzzleFile(puzzleFilePath);
        return { puzzle };
    } catch (error) {
        throw new Error(error.message);
    }
}

function printUsage() {
    console.log(colorize('Usage:', 'yellow'));
    console.log('  npm run validate-partial-word-search -- --puzzle <puzzle-file-path>');
    console.log();
    console.log(colorize('Puzzle File Format:', 'yellow'));
    console.log('  The puzzle file should export an object with:');
    console.log('  • grid: 2D array of letters [["A", "B"], ["C", "D"]]');
    console.log('  • words: Array of target words ["AB", "CD"]');
    console.log('  • name: (optional) Puzzle name');
    console.log('  • description: (optional) Puzzle description');
    console.log();
    console.log(colorize('Examples:', 'yellow'));
    console.log('  npm run validate-partial-word-search -- --puzzle js/games/word-search/puzzles/word-search-1.js');
    console.log('  npm run validate-partial-word-search -- --puzzle path/to/my-puzzle.js');
    console.log();
    console.log(colorize('Features:', 'yellow'));
    console.log('  • Accepts grids larger than word list');
    console.log('  • Treats empty cells ("") as null');
    console.log('  • Reports words found 0 times or multiple times as errors');
    console.log('  • Each word must be found exactly once');
}

function printError(message) {
    console.error(colorize(`❌ Error: ${message}`, 'red'));
}

function main() {
    const startTime = Date.now();
    
    let config;
    try {
        config = parseArguments();
    } catch (error) {
        printError(error.message);
        console.log();
        printUsage();
        process.exit(1);
    }
    
    const { puzzle } = config;
    
    try {
        // Print header
        printHeader(puzzle);
        
        // Show the grid
        printGrid(puzzle.grid);
        
        // Validate the puzzle
        const result = validatePartialWordSearchPuzzle(puzzle.grid, puzzle.words);
        
        // Print results
        printResults(result);
        
        // Calculate execution time
        const executionTime = Date.now() - startTime;
        console.log();
        console.log(colorize(`Completed in ${executionTime}ms`, 'dim'));
        
        // Exit with appropriate code
        process.exit(result.isValid ? 0 : 1);
        
    } catch (error) {
        printError(`Unexpected error: ${error.message}`);
        process.exit(1);
    }
}

// Run the script
if (require.main === module) {
    main();
}