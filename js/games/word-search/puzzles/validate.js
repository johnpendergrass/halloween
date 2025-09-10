
const fs = require('fs');
const path = require('path');

// Get the content of ./puzzle.csv
const csvPath = path.join(__dirname, 'partial-2.csv');
const csvInput = fs.readFileSync(csvPath, 'utf8');
console.log( csvInput)

const process = (input) => {
  const result = input.split(/\r?\n/);
  return result.map((row) => row.split(','));
}
const processedCsv = process(csvInput);

const word1 = 'EERIE';

function findWord(grid, word) {
  let found = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const usedLetter = new Array(grid.length).fill(null).map((foo) => (new Array(grid[0].length).fill(false)));
      const firstChar = word.charAt(0);
      const rest = word.slice(1);
      const foundHere = search(grid, firstChar, rest, row, col, usedLetter);
      found += foundHere;
    }
  }
  console.log('word', word, 'found', found, 'time(s)')
  return found;
}

const search = (grid, firstChar, rest, row, col, usedLetter) => {
  // Searching out of bounds
  if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
    return 0;
  }
  // Can't use the place we've been sent in the word
  if (firstChar !== grid[row][col] || usedLetter[row][col]) {
    return 0;
  }

  const nextFirstChar = rest.charAt(0);
  const nextRest = rest.slice(1);
  if (nextFirstChar === '') {
    return 1;
  }

  usedLetter[row][col] = true;
  return search(grid, nextFirstChar, nextRest, row - 1, col - 1, usedLetter)
    + search(grid, nextFirstChar, nextRest, row - 1, col, usedLetter)
    + search(grid, nextFirstChar, nextRest, row - 1, col + 1, usedLetter)
    + search(grid, nextFirstChar, nextRest, row, col - 1, usedLetter)
    + search(grid, nextFirstChar, nextRest, row, col + 1, usedLetter)
    + search(grid, nextFirstChar, nextRest, row + 1, col - 1, usedLetter)
    + search(grid, nextFirstChar, nextRest, row + 1, col, usedLetter)
    + search(grid, nextFirstChar, nextRest, row + 1, col + 1, usedLetter);
}

findWord(processedCsv, 'EERIE')
findWord(processedCsv, 'JACKOLANTERN')
findWord(processedCsv, 'COBWEB')
findWord(processedCsv, 'BANSHEE')
findWord(processedCsv, 'WRAITH')
findWord(processedCsv, 'SHROUD')
findWord(processedCsv, 'GARGOYLE')
findWord(processedCsv, 'COFFIN')