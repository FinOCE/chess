import Board, {Col} from '../utils/Board'
import Piece from '../components/piece'
import styles from '../styles/board.module.sass'

export default function board() {
    let board = new Board()

    let cells = Array.from(Array(8).keys(), () => Array.from(Array(8).keys()), () => undefined)
    let colors = ['#3d3d3d', '#4b4b4b']

    return (
        <div id={styles.board}>
            {cells.map((a, x) => {
                return (
                    <>
                        {a.map((b, y) => (
                            <div className={styles.checker} style={{background: colors[(x + y) % 2]}}>
                                {x === 7 ? (
                                    <span className={[
                                        styles.label,
                                        styles.labely
                                    ].join(' ')}>
                                        {Col[y].toUpperCase()}
                                    </span>
                                ) : ''}
                                {y === 0 ? (
                                    <span className={[
                                        styles.label,
                                        styles.labelx
                                    ].join(' ')}>
                                        {8-x}
                                    </span>
                                ) : ''}
                            </div>
                        ))}
                    </>
                )
            })}
            {board.pieces.map((piece, i) => {
                let top = (7 - (piece.position.charCodeAt(0) - 97)) * 100
                let left = (Number(piece.position.split('')[1]) - 1)*100
                return (
                    <Piece key={i} data={piece} style={{left, top}} />
                )
            })}
        </div>
    )
}