const { createWordSearchPuzzle, createEmptyGrid, findValidPlacements, canPlaceWord, fillEmptySpaces } = require('./creator');

describe('Word Search Puzzle Creator', () => {

  describe('Input Validation', () => {
    test('should reject when word length does not match grid size', () => {
      const words = ['AB', 'CD']; // Total length: 4
      const dimensions = { rows: 3, cols: 2 }; // Grid size: 6
      
      const result = createWordSearchPuzzle(words, dimensions);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Total word length (4) does not equal grid size (6)');
      expect(result.puzzle).toBeNull();
    });

    test('should accept when word length matches grid size', () => {
      const words = ['AB', 'CD']; // Total length: 4
      const dimensions = { rows: 2, cols: 2 }; // Grid size: 4
      
      const result = createWordSearchPuzzle(words, dimensions);
      
      expect(result.success).toBeDefined();
      expect(result.error).toBeNull();
    });
  });

  describe('Simple Puzzle Creation', () => {
    test('should create valid 2x2 puzzle with horizontal words', () => {
      const words = ['AB', 'CD'];
      const dimensions = { rows: 2, cols: 2 };
      
      const result = createWordSearchPuzzle(words, dimensions);
      
      expect(result.success).toBe(true);
      expect(result.puzzle).toBeDefined();
      expect(result.puzzle.grid).toHaveLength(2);
      expect(result.puzzle.grid[0]).toHaveLength(2);
      expect(result.puzzle.words).toEqual(['AB', 'CD']);
      expect(result.puzzle.gridSize).toBe(4);
      expect(result.puzzle.totalWordLength).toBe(4);
    });

    test('should create valid 3x3 puzzle', () => {
      const words = ['CAT', 'DOG', 'RAT'];
      const dimensions = { rows: 3, cols: 3 };
      
      const result = createWordSearchPuzzle(words, dimensions);
      
      expect(result.success).toBe(true);
      expect(result.puzzle).toBeDefined();
      expect(result.puzzle.grid).toHaveLength(3);
      expect(result.puzzle.grid[0]).toHaveLength(3);
      expect(result.puzzle.words).toEqual(['CAT', 'DOG', 'RAT']);
    });
  });

  describe('Helper Functions', () => {
    test('createEmptyGrid should create correct dimensions', () => {
      const grid = createEmptyGrid(3, 4);
      
      expect(grid).toHaveLength(3);
      expect(grid[0]).toHaveLength(4);
      expect(grid[2][3]).toBeNull();
    });

    test('canPlaceWord should check boundaries correctly', () => {
      const grid = createEmptyGrid(2, 2);
      
      // Should fit horizontally
      expect(canPlaceWord(grid, 'AB', 0, 0, 0, 1)).toBe(true);
      
      // Should not fit (goes out of bounds)
      expect(canPlaceWord(grid, 'ABC', 0, 0, 0, 1)).toBe(false);
      
      // Should fit vertically
      expect(canPlaceWord(grid, 'AB', 0, 0, 1, 0)).toBe(true);
    });

    test('canPlaceWord should handle existing letters', () => {
      const grid = [['A', 'B'], [null, null]];
      
      // Should allow placing same letters
      expect(canPlaceWord(grid, 'AB', 0, 0, 0, 1)).toBe(true);
      
      // Should reject conflicting letters
      expect(canPlaceWord(grid, 'XY', 0, 0, 0, 1)).toBe(false);
    });

    test('findValidPlacements should find all possible positions', () => {
      const grid = createEmptyGrid(2, 2);
      const placements = findValidPlacements(grid, 'AB');
      
      // Should find multiple valid placements in different positions and directions
      expect(placements.length).toBeGreaterThan(0);
      
      // Check that all placements are valid
      placements.forEach(placement => {
        expect(canPlaceWord(grid, 'AB', placement.startRow, placement.startCol, placement.dRow, placement.dCol)).toBe(true);
      });
    });

    test('fillEmptySpaces should fill all null cells', () => {
      const grid = [[null, 'A'], ['B', null]];
      fillEmptySpaces(grid);
      
      // All cells should now have letters
      for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
          expect(grid[row][col]).toMatch(/[A-Z]/);
        }
      }
      
      // Original letters should be preserved
      expect(grid[0][1]).toBe('A');
      expect(grid[1][0]).toBe('B');
    });
  });

  describe('Complex Scenarios', () => {
    test('should handle single letter words', () => {
      const words = ['A', 'B', 'C', 'D'];
      const dimensions = { rows: 2, cols: 2 };
      
      const result = createWordSearchPuzzle(words, dimensions);
      
      expect(result.success).toBe(true);
      expect(result.puzzle.grid).toHaveLength(2);
    });

    test('should reject impossible arrangements', () => {
      // Create a scenario that should be impossible
      // All words need the same starting letter but only one position available
      const words = ['AAAA']; // 4 A's in a row
      const dimensions = { rows: 2, cols: 2 }; // But grid is only 2x2
      
      const result = createWordSearchPuzzle(words, dimensions);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Cannot create puzzle - no valid arrangement found for given words');
    });

    test('should handle overlapping words correctly', () => {
      // Words that can share letters
      const words = ['AB', 'AC']; // Both start with 'A'
      const dimensions = { rows: 2, cols: 2 };
      
      const result = createWordSearchPuzzle(words, dimensions);
      
      // This might succeed if the algorithm can find a way to overlap the 'A'
      // or fail if no valid arrangement exists - both are acceptable
      expect(result.success).toBeDefined();
      if (result.success) {
        expect(result.puzzle).toBeDefined();
      } else {
        expect(result.error).toBe('Cannot create puzzle - no valid arrangement found for given words');
      }
    });
  });

  describe('Result Format', () => {
    test('should return correct success format', () => {
      const words = ['AB', 'CD'];
      const dimensions = { rows: 2, cols: 2 };
      
      const result = createWordSearchPuzzle(words, dimensions);
      
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('puzzle');
      expect(result).toHaveProperty('error');
      
      if (result.success) {
        expect(result.puzzle).toHaveProperty('name');
        expect(result.puzzle).toHaveProperty('description');
        expect(result.puzzle).toHaveProperty('grid');
        expect(result.puzzle).toHaveProperty('words');
        expect(result.puzzle).toHaveProperty('gridSize');
        expect(result.puzzle).toHaveProperty('totalWordLength');
      }
    });
  });
});