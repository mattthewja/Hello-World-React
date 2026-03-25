import './Board.css'
import { useState } from 'react';

type SquareProps = {
    value: (string | null);
    onSquareClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function Square(Props: SquareProps) {
    return (
        <button className="square" onClick={Props.onSquareClick}>{Props.value}</button>
    )
}

type BoardProps = {
    xIsNext: boolean;
    squares: (string | null)[];
    onPlay: (nextSquares: (string | null)[]) => void;
}

function Board(Props: BoardProps) {
    function handleClick(i: number) {
        if (Props.squares[i] || calculateWinner(Props.squares)) return;

        const nextSquares = Props.squares.slice();

        if (Props.xIsNext) {
            nextSquares[i] = "X"
        } else {
            nextSquares[i] = "O"
        }

        // setSquares(nextSquares);
        // setXIsNext(!xIsNext);
        Props.onPlay(nextSquares);
    }

    const winner = calculateWinner(Props.squares);
    let status: string;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next play: " + (Props.xIsNext ? "X" : "O");
    }

    return (
        <>
        <div className="status">{status}</div>
        <div className="board">
            <div className="board-row">
                <Square value={Props.squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={Props.squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={Props.squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className="board-row">
                <Square value={Props.squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square value={Props.squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square value={Props.squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className="board-row">
                <Square value={Props.squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={Props.squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={Props.squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
        </div>
        </>
    )
}

function calculateWinner(squares : (string | null)[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i< lines.length; ++i) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}


export default function Game() {
    const [xIsNext, setXIsNext] = useState<boolean>(true);
    const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)]); // this is just weird...
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares: (string | null)[]) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        setXIsNext(!xIsNext);
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
        setXIsNext(nextMove % 2 === 0);
    }

    const moves = history.map((squares, move) => {
        let description: string;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    )
}