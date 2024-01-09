import { useState } from 'react'
import './App.css'
import Board from './Board'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Tic Tac Toe Game</h1>
      <Board />
    </>
  );
}

export default App
