#!/usr/bin/env node

/**
 * Partial Word Search Puzzle Validator Script
 * 
 * Usage: npm run validate-partial-word-search -- --grid <grid-data> --words <word1> <word2> ...
 * Example: npm run validate-partial-word-search -- --grid "ABC,DEF,GHI" --words CAT DOG
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

function printHeader(grid, words) {
    console.log(colorize(`Validating partial word search puzzle`, 'cyan'));
    console.log(colorize(`Words to find: ${words.join(', ')}`, 'white'));
    console.log(colorize(`Grid size: ${grid.length}×${grid[0]?.length || 0}`, 'white'));
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

function parseGridString(gridString) {
    // Parse grid format like "ABC,DEF,GHI" or "A B C,D E F,G H I"
    const rows = gridString.split(',');
    return rows.map(row => {
        // Split by spaces if present, otherwise split each character
        if (row.includes(' ')) {
            return row.trim().split(/\s+/);
        } else {
            return row.trim().split('');
        }
    });
}

function parseArguments() {
    // Remove any standalone -- arguments that npm adds
    const args = process.argv.slice(2).filter(arg => arg !== '--');
    
    const gridIndex = args.indexOf('--grid');
    const wordsIndex = args.indexOf('--words');
    
    if (gridIndex === -1) {
        throw new Error('Missing required argument: --grid <grid-data>');
    }
    
    if (wordsIndex === -1) {
        throw new Error('Missing required argument: --words <word1> <word2> ...');
    }
    
    // Parse grid
    if (gridIndex + 1 >= args.length) {
        throw new Error('--grid requires grid data (e.g., "ABC,DEF,GHI")');
    }
    
    const gridString = args[gridIndex + 1];
    let grid;
    try {
        grid = parseGridString(gridString);
    } catch (error) {
        throw new Error(`Invalid grid format: ${error.message}`);
    }
    
    // Parse words
    if (wordsIndex + 1 >= args.length) {
        throw new Error('--words requires at least one word');
    }
    
    const wordsStart = wordsIndex + 1;
    const words = [];
    
    // Collect all words after --words (until end or next flag)
    for (let i = wordsStart; i < args.length; i++) {
        if (args[i].startsWith('--')) break;
        words.push(args[i]);
    }
    
    if (words.length === 0) {
        throw new Error('No words provided after --words flag');
    }
    
    return { grid, words };
}

function printUsage() {
    console.log(colorize('Usage:', 'yellow'));
    console.log('  npm run validate-partial-word-search -- --grid <grid-data> --words <word1> <word2> ...');
    console.log();
    console.log(colorize('Grid Format:', 'yellow'));
    console.log('  • Comma-separated rows: "ABC,DEF,GHI"');
    console.log('  • Space-separated cells: "A B C,D E F,G H I"');
    console.log('  • Empty cells as spaces: "A  C,D E F" (double space for empty)');
    console.log();
    console.log(colorize('Examples:', 'yellow'));
    console.log('  npm run validate-partial-word-search -- --grid "CAT,DOG,RAT" --words CAT DOG RAT');
    console.log('  npm run validate-partial-word-search -- --grid "C A T,D O G,R A T" --words CAT DOG');
    console.log('  npm run validate-partial-word-search -- --grid "HELLO,WORLD" --words HELLO WORLD');
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
    
    const { grid, words } = config;
    
    try {
        // Print header
        printHeader(grid, words);
        
        // Show the grid
        printGrid(grid);
        
        // Validate the puzzle
        const result = validatePartialWordSearchPuzzle(grid, words);
        
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