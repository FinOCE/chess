import {Properties} from 'csstype'
import Piece from '../utils/Piece'
import styles from '../styles/piece.module.sass'

export interface PieceProps {
    data: Piece
    style: Properties<string | number, string & {}>
}

export default function piece(props: PieceProps) {
    return (
        <div className={styles.piece} style={props.style}>
            {props.data.team} {props.data.type}
        </div>
    )
}