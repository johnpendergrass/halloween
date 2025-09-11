// No longer need fs and path since we're using inline data

// Sample puzzle data from Google Sheets copy/paste format
const txtInput = `
R	I	E	L	A	N	T	E
E			O				R
E		C	K				N
J	A
B
E	B	O
W			C
`;
console.log( txtInput)

const process = (input) => {
  // Parse tab-separated format from Google Sheets copy/paste
  // Format: characters separated by tabs, rows separated by newlines
  // Filters out empty cells and empty rows that may result from sparse data
  const result = input.split(/\r?\n/);
  return result
    .filter(row => row.trim() !== '')
    .map((row) => row.split('\t').filter(cell => cell !== ''));
}
const processedGrid = process(txtInput);

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

findWord(processedGrid, 'EERIE')
findWord(processedGrid, 'JACKOLANTERN')
findWord(processedGrid, 'COBWEB')
findWord(processedGrid, 'BANSHEE')
findWord(processedGrid, 'WRAITH')
findWord(processedGrid, 'SHROUD')
findWord(processedGrid, 'GARGOYLE')
findWord(processedGrid, 'COFFIN')