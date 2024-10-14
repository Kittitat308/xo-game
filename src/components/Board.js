// Board.js
import React, { useState, useEffect, useCallback } from 'react';
import './Board.css';

const Square = ({ value, onClick, isWinningSquare }) => {
  return (
    <button 
      className={`square ${value === 'X' ? 'x' : value === 'O' ? 'o' : ''}`} // กำหนดสีให้ X และ O
      onClick={onClick} 
      style={{ 
        width: '100px', 
        height: '100px', 
        fontSize: '2rem', 
        borderColor: isWinningSquare ? 'red' : 'white' // เปลี่ยนสีพื้นหลังเมื่อชนะ
      }}
    >
      {value}
    </button>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i]; // ส่งกลับ array ของช่องที่ชนะ
    }
  }
  return null;
};

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winningSquares = calculateWinner(squares); // เก็บช่องที่ชนะ
  const winner = winningSquares ? squares[winningSquares[0]] : null;
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const isDraw = !winner && !squares.includes(null); // ตรวจสอบว่าเสมอ

  const handleClick = (index) => {
    const newSquares = [...squares];
    if (newSquares[index] || winner) return;
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);

    // ตรวจสอบผู้ชนะและอัปเดตคะแนน
    if (calculateWinner(newSquares)) {
      if (isXNext) {
        setPlayerScore(playerScore + 1);
      } else {
        setComputerScore(computerScore + 1);
      }
    }
  };

  const aiPlay = useCallback(() => {
    const emptySquares = squares.map((square, index) => (square === null ? index : null)).filter(index => index !== null);
    if (emptySquares.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      const aiMove = emptySquares[randomIndex];
      const newSquares = [...squares];
      newSquares[aiMove] = 'O'; // AI ใช้ 'O'
      setSquares(newSquares);
      setIsXNext(true); // เปลี่ยนกลับเป็นผู้เล่น X

      // ตรวจสอบผู้ชนะและอัปเดตคะแนน
      if (calculateWinner(newSquares)) {
        setComputerScore(computerScore + 1);
      }
    }
  }, [squares, computerScore]);

  useEffect(() => {
    if (!winner && squares.includes(null) && !isXNext) {
      aiPlay();
    }
  }, [squares, isXNext, winner, aiPlay]);

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (i) => {
    const isWinningSquare = winningSquares ? winningSquares.includes(i) : false; // ตรวจสอบว่าช่องนี้ชนะไหม
    return <Square value={squares[i]} onClick={() => handleClick(i)} isWinningSquare={isWinningSquare} />;
  };

  return (
    <div className="board-container">
      <div className="score-card player-card">
        <h3>Player</h3>
        <p>Score: {playerScore}</p>
      </div>
      <div className="board">
        <h2>
          {winner ? 'Winner: ' + winner : isDraw ? 'เสมอ' : 'Player: ' + (isXNext ? 'X' : 'O')}
        </h2>
        <div className="row">
          {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
        </div>
        <div className="row">
          {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
        </div>
        <div className="row">
          {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
        </div>
        <button className="btn btn-danger mt-3" onClick={resetGame}>Restart Game</button>
      </div>
      <div className="score-card computer-card">
        <h3>Computer</h3>
        <p>Score: {computerScore}</p>
      </div>
    </div>
  );
};

export default Board;
