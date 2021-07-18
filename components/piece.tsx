import {Properties} from 'csstype'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChessKing, faChessQueen, faChessBishop, faChessKnight, faChessRook, faChessPawn} from '@fortawesome/free-solid-svg-icons'
import Piece from '../utils/Piece'
import styles from '../styles/piece.module.sass'

export interface PieceProps {
    data: Piece
    style: Properties<string | number, string & {}>
}

export default function piece(props: PieceProps) {
    let types = {
        'King': faChessKing,
        'Queen': faChessQueen,
        'Bishop': faChessBishop,
        'Knight': faChessKnight,
        'Rook': faChessRook,
        'Pawn': faChessPawn
    }
    let colors = {
        'White': '#fff',
        'Black': '#000'
    }

    return (
        <div className={styles.piece} style={Object.assign(props.style, {color: colors[props.data.team]})}>
            <FontAwesomeIcon icon={types[props.data.type]} />
        </div>
    )
}