import React, {useState, useEffect} from "react";
import Square from "./Square";

const winningCombinations = [
// Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
// Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
// Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(squares) {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]; //return X or O
        }
    }
    return null; //no winner
}

function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [countdown, setCountdown] = useState(null);

    function handleClick (index) {
        //if specified square already has X or O or if game is won, function returns early
        if (squares[index] || calculateWinner(squares)) return;

        const newSquares = [...squares]; //to avoid mutating original state
        newSquares[index] = isXNext ? "X" : "O";
        setSquares(newSquares); // copy of current squares (avoid mutation) after the click
        setIsXNext(!isXNext); //toggle to next player
    }

    const winner = calculateWinner(squares);
    const draw = !winner && squares.every(square => square !== null);
    let gameStatus;
    if (winner) {
        gameStatus = `The Winner is: ${winner} 🎉`;
    } else if (draw) {
        gameStatus = `It's a draw! 🤝`;
    } else {
        gameStatus = `Next player: ${isXNext ? 'X' : 'O'}`;
    }

    useEffect(() => {
        let timer;
        let interval;

        if (winner || draw) {
            setCountdown(10);
            interval = setInterval(() => {
                setCountdown(prev => Math.max(prev - 1, 0));
            }, 1000);
            timer = setTimeout(() => {
                resetGame();
                clearInterval(interval);
            }, 10000);
        }
        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [winner, draw]);

    function resetGame() {
        setSquares(Array(9).fill(null));
        setIsXNext(true);
        setCountdown(null);
    }

    return (
        <>
            <h1>{gameStatus}</h1>
            <div className="board">
                {squares.map((square, index) => (
                    <Square key={index} value={square} onClick={() => handleClick(index)}/>
                ))}
            </div>
            <button onClick={resetGame} className="reset-button">
                Restart {countdown !== null && `(${countdown}s)`}
            </button>
        </>
    );
}

export default Board;