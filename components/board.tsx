import {useState} from 'react'
import Board, {Col} from '../utils/Board'
import Piece from '../components/piece'
import styles from '../styles/board.module.sass'

interface Move {
    cell: number
    can_capture: boolean
}

export default function board() {
    let board = new Board()
    let colors = ['#4b4b4b', '#3d3d3d']

    let [selected, setSelected] = useState<Move[]>([])

    return (
        <div id={styles.board}>
            {board.state.map((cell, i) => (
                <div
                    key={i}
                    className={styles.checker}
                    style={{background: colors[(i + Math.floor(i/8)) % 2]}}
                    onClick={() => {
                        if (!cell) return setSelected([])
                        if (cell.team !== board.active) return setSelected([])
                        setSelected(
                            cell.get_legal_moves(board.state, i).map(pos => {
                                return {
                                    cell: pos,
                                    can_capture: cell.can_capture(board.state, i, pos)
                                }
                            })
                        )
                    }}
                >
                    {selected.some(pos => pos.cell === i) && cell?.team && board.active !== cell?.team && !selected.find(pos => pos.cell === i)?.can_capture && (
                        <div className={styles.potentialCapture}></div>
                    )}
                    {selected.some(pos => pos.cell === i) && !cell?.team && (
                        <div className={styles.potentialMove}></div>
                    )}
                    {cell && (<span className={styles.icon}>
                        <Piece data={cell} />
                    </span>)}
                    {i >= 56 ? (
                        <span className={[
                            styles.label,
                            styles.labely
                        ].join(' ')}>
                            {Col[i - 56].toUpperCase()}
                        </span>
                    ) : ''}
                    {i % 8 === 0 ? (
                        <span className={[
                            styles.label,
                            styles.labelx
                        ].join(' ')}>
                            {8 - Math.floor(i / 8)}
                        </span>
                    ) : ''}
                </div>
            ))}
        </div>
    )
}