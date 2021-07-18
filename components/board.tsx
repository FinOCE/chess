import Board, {Col} from '../utils/Board'
import Piece from '../components/piece'
import styles from '../styles/board.module.sass'

export default function board() {
    let board = new Board()

    let cells = Array.from(Array(8).keys(), () => Array.from(Array(8).keys()), () => undefined)
    let colors = ['#4b4b4b', '#3d3d3d']

    return (
        <div id={styles.board}>
            {cells.map((a, x) => a.map((b, y) => {
                let piece = board.pieces.find(piece => piece.position === `${Col[7-x]}${y+1}`)

                return (
                    <div key={y} className={styles.checker} style={{background: colors[(x + y) % 2]}}>
                        {piece && (<span className={styles.icon}>
                            <Piece data={piece} />
                        </span>)}
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
                )
            }))}
        </div>
    )
}