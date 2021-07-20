import Board from '../utils/Board'
import styles from '../styles/status.module.sass'

export interface StatusProps {
    board: Board
}

export default function Status(props: StatusProps) {
    let {only_white, only_black} = props.board.find_piece_difference()
    
    return (
        <div id={styles.status}>
            <div className={styles.player}>
                Player 1 (White)
                <div className={styles.taken}>
                    {only_white.map(piece => piece.type)}
                </div>
            </div>
            <div className={styles.info}>
                {props.board.active} to move...
            </div>
            <div className={styles.player}>
                Player 2 (Black)
                <div className={styles.taken}>
                    {only_black.map(piece => piece.type)}
                </div>
            </div>
        </div>
    )
}