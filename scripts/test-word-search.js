#!/usr/bin/env node

/**
 * Puzzle Validation Script
 * 
 * Usage: npm run test-puzzle puzzlename.js
 * Example: npm run test-puzzle word-search-1.js
 */

const fs = require('fs');
const path = require('path');
const { validateWordSearchPuzzle } = require('../js/games/word-search/validator');

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

function printHeader(puzzleName) {
    console.log(colorize(`Testing puzzle: ${puzzleName}`, 'cyan'));
    printSeparator();
}

function printResults(result, executionTime) {
    // Status
    if (result.isValid) {
        console.log(colorize('✅ VALID PUZZLE', 'green'));
    } else {
        console.log(colorize('❌ INVALID PUZZLE', 'red'));
    }
    
    console.log();
    
    // Details - we need to get actual grid dimensions from the puzzle
    // For now, just show the total size without trying to calculate dimensions
    console.log(`${colorize('Grid Size:', 'white')} ${result.gridSize} cells`);
    console.log(`${colorize('Total Word Length:', 'white')} ${result.totalWordLength}`);
    console.log(`${colorize('Lengths Match:', 'white')} ${result.lengthsMatch ? '✅' : '❌'}`);
    
    // Errors
    if (result.errors && result.errors.length > 0) {
        console.log();
        console.log(colorize('Errors:', 'red'));
        result.errors.forEach(error => {
            console.log(`${colorize('•', 'red')} ${error}`);
        });
    }
    
    // Solution summary
    if (result.solution) {
        console.log();
        console.log(colorize('Solution Found:', 'green'));
        const wordCount = Object.keys(result.solution).length;
        console.log(`${colorize('•', 'green')} Successfully placed ${wordCount} words`);
        
        // Show first few word placements as examples
        const words = Object.keys(result.solution).slice(0, 3);
        words.forEach(word => {
            const placement = result.solution[word];
            const startPos = `(${placement.start.row},${placement.start.col})`;
            const direction = getDirectionName(placement.direction);
            console.log(`${colorize('•', 'green')} ${word}: ${startPos} ${direction}`);
        });
        
        if (Object.keys(result.solution).length > 3) {
            console.log(`${colorize('•', 'green')} ... and ${Object.keys(result.solution).length - 3} more`);
        }
    }
    
    console.log();
    console.log(colorize(`Completed in ${executionTime}ms`, 'dim'));
}

function getDirectionName(direction) {
    const { dRow, dCol } = direction;
    
    if (dRow === 0 && dCol === 1) return '→ (horizontal)';
    if (dRow === 0 && dCol === -1) return '← (horizontal reverse)';
    if (dRow === 1 && dCol === 0) return '↓ (vertical)';
    if (dRow === -1 && dCol === 0) return '↑ (vertical reverse)';
    if (dRow === 1 && dCol === 1) return '↘ (diagonal)';
    if (dRow === 1 && dCol === -1) return '↙ (diagonal)';
    if (dRow === -1 && dCol === 1) return '↗ (diagonal)';
    if (dRow === -1 && dCol === -1) return '↖ (diagonal)';
    
    return `(${dRow},${dCol})`;
}

function printError(message) {
    console.error(colorize(`❌ Error: ${message}`, 'red'));
}

function printUsage() {
    console.log(colorize('Usage:', 'yellow'));
    console.log('  npm run test-word-search <puzzlename.js>');
    console.log();
    console.log(colorize('Examples:', 'yellow'));
    console.log('  npm run test-word-search word-search-1.js');
    console.log('  npm run test-word-search test-basic.js');
}

function loadPuzzle(puzzleName) {
    const puzzlePath = path.resolve(__dirname, '..', 'js', 'games', 'word-search', 'puzzles', puzzleName);
    
    // Check if file exists
    if (!fs.existsSync(puzzlePath)) {
        throw new Error(`Puzzle file not found: ${puzzlePath}`);
    }
    
    // Load the puzzle
    delete require.cache[require.resolve(puzzlePath)]; // Clear cache
    const puzzleData = require(puzzlePath);
    
    // Validate puzzle format
    if (!puzzleData.grid || !puzzleData.words) {
        throw new Error('Invalid puzzle format: must have "grid" and "words" properties');
    }
    
    if (!Array.isArray(puzzleData.grid) || !Array.isArray(puzzleData.words)) {
        throw new Error('Invalid puzzle format: "grid" and "words" must be arrays');
    }
    
    return puzzleData;
}

function main() {
    const startTime = Date.now();
    
    // Parse command line arguments
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        printError('No puzzle file specified');
        console.log();
        printUsage();
        process.exit(1);
    }
    
    const puzzleName = args[0];
    
    try {
        // Load puzzle
        const puzzle = loadPuzzle(puzzleName);
        
        // Print header
        printHeader(puzzleName);
        
        // Run validation
        const result = validateWordSearchPuzzle(puzzle.grid, puzzle.words);
        
        // Calculate execution time
        const executionTime = Date.now() - startTime;
        
        // Print results
        printResults(result, executionTime);
        
        // Exit with appropriate code
        process.exit(result.isValid ? 0 : 1);
        
    } catch (error) {
        printError(error.message);
        
        if (error.message.includes('not found')) {
            console.log();
            console.log(colorize('Available puzzles:', 'yellow'));
            
            try {
                const puzzlesDir = path.resolve(__dirname, '..', 'js', 'games', 'word-search', 'puzzles');
                const files = fs.readdirSync(puzzlesDir)
                    .filter(file => file.endsWith('.js'))
                    .sort();
                
                files.forEach(file => {
                    console.log(`  ${file}`);
                });
            } catch (dirError) {
                console.log('  (Could not list puzzle files)');
            }
        }
        
        process.exit(1);
    }
}

// Run the script
if (require.main === module) {
    main();
}