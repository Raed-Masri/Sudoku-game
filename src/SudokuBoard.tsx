// src/components/SudokuBoard.tsx
import React, { useState } from "react";
import "./SudokuBoard.css";

type BoardState = {
  value: number;
  isValid: boolean;
};

const SudokuBoard: React.FC = () => {
  // Initialize a 9x9 board with each cell having value = 0 and isValid = true
  const [board, setBoard] = useState<BoardState[][]>(
    Array(9).fill(Array(9).fill({ value: 0, isValid: true }))
  );

  // Helper to check duplicates in an array (ignores zeros)
  const hasDuplicates = (arr: number[]) => {
    const filtered = arr.filter((num) => num !== 0);
    return new Set(filtered).size !== filtered.length;
  };

  // Validates a single cell against Sudoku rules
  const validateCell = (row: number, col: number, board: BoardState[][]): boolean => {
    const value = board[row][col].value;
    if (value === 0) return true;

    // Validate row
    const rowValues = board[row].map((cell) => cell.value);
    if (hasDuplicates(rowValues)) return false;

    // Validate column
    const colValues = board.map((row) => row[col].value);
    if (hasDuplicates(colValues)) return false;

    // Validate 3x3 grid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    const gridValues = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        gridValues.push(board[startRow + i][startCol + j].value);
      }
    }
    if (hasDuplicates(gridValues)) return false;

    return true;
  };

  // Validates the entire board
  const validateBoard = (board: BoardState[][]): BoardState[][] => {
    return board.map((row, rowIndex) =>
      row.map((cell, colIndex) => ({
        value: cell.value,
        isValid: validateCell(rowIndex, colIndex, board),
      }))
    );
  };

  // Handles input changes and validates dynamically
  const handleInputChange = (row: number, col: number, value: string) => {
    const numericValue = parseInt(value) || 0;

    const newBoard = board.map((rowArr, rowIndex) =>
      rowArr.map((cell, colIndex) =>
        rowIndex === row && colIndex === col
          ? { ...cell, value: numericValue }
          : cell
      )
    );

    setBoard(validateBoard(newBoard));
  };

  // Trigger validation for the entire board
  const handleCheckSolution = () => {
    setBoard(validateBoard(board));
  };

  return (
    <div>
      <div className="sudoku-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                maxLength={1}
                className={`sudoku-cell ${!cell.isValid ? "invalid" : ""}`}
                value={cell.value !== 0 ? cell.value : ""}
                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
              />
            ))}
          </div>
        ))}
      </div>
      <button className="check-solution" onClick={handleCheckSolution}>
        Check Solution
      </button>
    </div>
  );
};

export default SudokuBoard;
