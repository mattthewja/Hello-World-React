import './Board.css'

function Square() {
    return (
        <button className="square">X</button>
    )
}

export default function board() {
    return (
        <>
            <Square />
        </>
    )
}