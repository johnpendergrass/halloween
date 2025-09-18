/**
 * With this validator we are going for a shaky sort of validation. It is not a complete picture of whether a given word search
 * puzzle is valid but merely a helpful tool. It prints the number of times each word can be found in a given puzzle,
 * independently of the other words. This can be helpful because it clues you in to when you add multiple ways to find the
 * same word accidentally from when words overlap each other. Finding all words in the puzzle exactly once isn't a guarantee
 * it's valid (and having some of them found more than once doesn't mean the puzzle isn't valid either), but it's a start.
 *
 * Usage:
 * - Replace txtInput with grid to test
 * - Replace words at bottom with target words
 * - Run with command like `node js/games/word-search/puzzles/validate.js`
 */

const processedGrid = require('./hard');

function findWord(grid, word) {
  let found = 0;
  // Find the maximum column length for the usedLetter array
  const maxCols = Math.max(...grid.map(row => row.length));

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const usedLetter = new Array(grid.length).fill(null).map((foo) => (new Array(maxCols).fill(false)));
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
  if (row < 0 || row >= grid.length || col < 0 || !grid[row] || col >= grid[row].length) {
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

findWord(processedGrid, 'EERIE')
findWord(processedGrid, 'JACKOLANTERN')
findWord(processedGrid, 'COBWEB')
findWord(processedGrid, 'BANSHEE')
findWord(processedGrid, 'WRAITH')
findWord(processedGrid, 'SHROUD')
findWord(processedGrid, 'GARGOYLE')
findWord(processedGrid, 'COFFIN')