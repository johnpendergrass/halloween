#!/usr/bin/env node

/**
 * Word Search Puzzle Creator Script
 * 
 * Usage: npm run create-word-search <word1> <word2> <word3> ...
 * Example: npm run create-word-search foo bar baz
 */

const { createWordSearchPuzzle } = require('../js/games/word-search/creator');

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

function printHeader(words) {
    console.log(colorize(`Creating word search puzzle with: ${words.join(', ')}`, 'cyan'));
    printSeparator();
}

function printGrid(grid) {
    console.log(colorize('Generated Grid:', 'white'));
    console.log();
    
    // Print column headers
    const colHeaders = '  ' + Array.from({length: grid[0].length}, (_, i) => i).join(' ');
    console.log(colorize(colHeaders, 'dim'));
    
    grid.forEach((row, rowIndex) => {
        const rowStr = rowIndex + ' ' + row.join(' ');
        console.log(rowStr);
    });
}

function printPuzzleInfo(puzzle, dimensions) {
    console.log();
    console.log(colorize('Puzzle Information:', 'white'));
    console.log(`${colorize('Dimensions:', 'white')} ${dimensions.rows}×${dimensions.cols} (${puzzle.gridSize} cells)`);
    console.log(`${colorize('Words:', 'white')} ${puzzle.words.join(', ')}`);
    console.log(`${colorize('Total Letters:', 'white')} ${puzzle.totalWordLength}`);
}

function printPuzzleAsCode(puzzle, words) {
    console.log();
    console.log(colorize('Puzzle as JavaScript Code:', 'yellow'));
    console.log();
    
    const gridStr = puzzle.grid.map(row => 
        "        ['" + row.join("', '") + "']"
    ).join(',\n');
    
    const wordsStr = words.map(word => `'${word.toUpperCase()}'`).join(', ');
    
    console.log(`module.exports = {
    name: "Generated Puzzle",
    description: "Auto-generated word search puzzle",
    
    grid: [
${gridStr}
    ],
    
    words: [${wordsStr}],
    
    gridSize: ${puzzle.gridSize},
    totalWordLength: ${puzzle.totalWordLength}
};`);
}


function printError(message) {
    console.error(colorize(`❌ Error: ${message}`, 'red'));
}

function printUsage() {
    console.log(colorize('Usage:', 'yellow'));
    console.log('  npm run create-word-search -- --dimensions <rows> <cols> --words <word1> <word2> ...');
    console.log();
    console.log(colorize('Examples:', 'yellow'));
    console.log('  npm run create-word-search -- --dimensions 1 9 --words foo bar baz');
    console.log('  npm run create-word-search -- --dimensions 3 5 --words hello world party');
    console.log('  npm run create-word-search -- --dimensions 4 4 --words halloween spooky fun scary');
    console.log();
    console.log(colorize('Required Arguments:', 'yellow'));
    console.log('  --dimensions <rows> <cols>  Grid dimensions (must match total word length)');
    console.log('  --words <word1> <word2>     Words to place in puzzle');
}

function parseArguments() {
    // Remove any standalone -- arguments that npm adds
    const args = process.argv.slice(2).filter(arg => arg !== '--');
    
    // Both --dimensions and --words are required
    const dimensionsIndex = args.indexOf('--dimensions');
    const wordsIndex = args.indexOf('--words');
    
    if (dimensionsIndex === -1) {
        throw new Error('Missing required argument: --dimensions <rows> <cols>');
    }
    
    if (wordsIndex === -1) {
        throw new Error('Missing required argument: --words <word1> <word2> ...');
    }
    
    // Parse dimensions
    if (dimensionsIndex + 2 >= args.length) {
        throw new Error('--dimensions requires two arguments: <rows> <cols>');
    }
    
    const rows = parseInt(args[dimensionsIndex + 1]);
    const cols = parseInt(args[dimensionsIndex + 2]);
    
    if (isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0) {
        throw new Error('Dimensions must be positive integers');
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
    
    return {
        words,
        dimensions: { rows, cols }
    };
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
    
    const { words, dimensions } = config;
    
    try {
        // Calculate total length and validate against dimensions
        const totalLength = words.reduce((sum, word) => sum + word.length, 0);
        const gridSize = dimensions.rows * dimensions.cols;
        
        if (totalLength !== gridSize) {
            printError(`Total word length (${totalLength}) does not match grid size (${gridSize})`);
            console.log();
            console.log(colorize('Valid dimensions for these words:', 'yellow'));
            
            // Show all valid dimension options
            const validOptions = [];
            for (let rows = 1; rows <= totalLength; rows++) {
                if (totalLength % rows === 0) {
                    const cols = totalLength / rows;
                    validOptions.push(`${rows}×${cols}`);
                }
            }
            
            console.log(`• ${validOptions.join(', ')}`);
            process.exit(1);
        }
        
        // Print header
        printHeader(words);
        
        console.log(`${colorize('Total Letters:', 'white')} ${totalLength}`);
        console.log(`${colorize('Grid Dimensions:', 'white')} ${dimensions.rows}×${dimensions.cols} = ${dimensions.rows * dimensions.cols}`);
        console.log();
        
        // Create the puzzle
        const result = createWordSearchPuzzle(words, dimensions);
        
        if (result.success) {
            console.log(colorize('✅ SUCCESS: Puzzle created!', 'green'));
            console.log();
            
            printGrid(result.puzzle.grid);
            printPuzzleInfo(result.puzzle, dimensions);
            printPuzzleAsCode(result.puzzle, words);
            
        } else {
            console.log(colorize('❌ FAILED: Could not create puzzle', 'red'));
            console.log();
            console.log(colorize('Reason:', 'red'));
            console.log(`• ${result.error}`);
            
            if (result.error.includes('does not equal grid size')) {
                console.log();
                console.log(colorize('Suggestion:', 'yellow'));
                console.log('• Try adding or removing letters to make the total match a perfect square');
                console.log(`• Current total: ${totalLength} letters`);
                console.log(`• Next perfect square: ${Math.ceil(Math.sqrt(totalLength)) ** 2} letters`);
                console.log(`• Previous perfect square: ${Math.floor(Math.sqrt(totalLength)) ** 2} letters`);
            }
        }
        
        // Calculate execution time
        const executionTime = Date.now() - startTime;
        console.log();
        console.log(colorize(`Completed in ${executionTime}ms`, 'dim'));
        
        // Exit with appropriate code
        process.exit(result.success ? 0 : 1);
        
    } catch (error) {
        printError(`Unexpected error: ${error.message}`);
        process.exit(1);
    }
}

// Run the script
if (require.main === module) {
    main();
}