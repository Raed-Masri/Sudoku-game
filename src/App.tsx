// src/App.tsx
import React from "react";
import SudokuBoard from "./SudokuBoard";
import "./App.css";
const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Sudoku Game</h1>
      <SudokuBoard />
    </div>
  );
};

export default App;
