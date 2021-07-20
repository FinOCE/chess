import Piece, {Team} from './Piece'
import {read_fen} from './FEN'

export type RowPosition = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
export type ColPosition = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'
export enum Col {
    'a' = 0,
    'b' = 1,
    'c' = 2,
    'd' = 3,
    'e' = 4,
    'f' = 5,
    'g' = 6,
    'h' = 7
}

export type Position = `${ColPosition}${RowPosition}`

export function indexToPosition(i: number): Position {
    return `${Col[i % 8 + 1]}${8 - Math.round(i/8)}` as Position
}

export default class Board {
    public state: Array<Piece | null>
    public active: Team
    public half_moves_counter: number
    public moves: number

    constructor() {
        this.state = Array(64)
        this.active = 'White'
        this.half_moves_counter = 0
        this.moves = 0

        this.create_from_fen('rnb1kb1r/pppp1ppp/8/4N3/5P1q/3B1Q2/PPPP3P/RNB1K2n w Qkq - 0 8')//'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
    }

    /**
     * Set the board for a new game.
     */
    public create_from_fen(fen: string): void {
        let data = read_fen(fen)
        this.state = data.state
        this.active = data.active
        this.half_moves_counter = data.half_move_counter
        this.moves = data.moves
    }

    /**
     * Remove all pieces from the board.
     */
    public clear_board(): void {
        this.state = Array(64)
    }

    /**
     * Get the data from the piece at the given position.
     * 
     * Returns with the piece if it exists.
     */
    private get_piece(i: number): Piece | null {
        return this.state[i]
    }

    /**
     * Remove a piece.
     */
    private remove_piece(i: number): Piece | null {
        let piece = this.get_piece(i)
        this.state[i] = null
        return piece
    }

    /**
     * Place a piece at the given position.
     * 
     * Returns with the replaced piece if something is taken.
     */
    private place_piece(i: number, piece: Piece): Piece | null {
        let piece_replaced = this.remove_piece(i)
        this.state[i] = piece
        return piece_replaced
    }

    /**
     * Move a piece.
     * 
     * Returns with the replaced piece if something is taken.
     */
    public move_piece(i: number, ii: number) {
        let old_piece = this.get_piece(i)
        if (!old_piece) throw 'There is no piece to move!'

        let new_piece = this.get_piece(ii)
        if (new_piece?.team !== old_piece.team) {
            this.remove_piece(i)
            this.place_piece(ii, old_piece)
            this.active = this.active === 'White' ? 'Black' : 'White'
        } else throw 'You cannot take your own piece!'
    }
}