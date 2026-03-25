import { useState } from 'react'
import './App.css'
import Game from './components/objects/board/Board.tsx';

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Game />
    </div>
  );
  
}

