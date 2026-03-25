import './Board.css'
import { useState } from 'react';

type SquareProps = {
    value: string
};

function Square() {
    const [value, setValue] = useState<string | null>(null);

    function handleClickSquare() {
        setValue('X');
    }

    return (
        <button className="square" onClick={handleClickSquare}>{value}</button>
    )
}

export default function Board() {
    return (
        <div className="board">
            <div className="board-row">
                <Square />
                <Square />
                <Square />
            </div>
            <div className="board-row">
                <Square />
                <Square />
                <Square />
            </div>
            <div className="board-row">
                <Square />
                <Square />
                <Square />
            </div>
        </div>
    )
}