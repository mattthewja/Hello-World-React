import './Board.css'

type SquareProps = {
    value: string
};

function Square(Props : SquareProps) {
    function handleClickSquare() {
        // do something
    }

    return (
        <button className="square" onClick={handleClickSquare}>{Props.value}</button>
    )
}

export default function Board() {
    return (
        <>
            <div className="board-row">
                <Square value="X"/>
                <Square value="Y"/>
                <Square value="Z"/>
            </div>
            <div className="board-row">
                <Square value="X"/>
                <Square value="Y"/>
                <Square value="Z"/>
            </div>
            <div className="board-row">
                <Square value="X"/>
                <Square value="Y"/>
                <Square value="Z"/>
            </div>
        </>
    )
}