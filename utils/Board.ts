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

export default class Board {
    public pieces: Piece[]
    public active: Team
    public half_moves_counter: number
    public moves: number

    constructor() {
        this.pieces = []
        this.active = 'White'
        this.half_moves_counter = 0
        this.moves = 0

        this.create()
    }

    /**
     * Set the board for a new game.
     */
     public create(): void {
        let data = read_fen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
        this.pieces = data.pieces
        this.active = data.active
        this.half_moves_counter = data.half_move_counter
        this.moves = data.moves
    }

    /**
     * Remove all pieces from the board.
     */
    public clear_board(): void {
        this.pieces = []
    }

    /**
     * Get the data from the piece at the given position.
     * 
     * Returns with the piece if it exists.
     */
     public get_piece(position: Position): Piece | null {
        return this.pieces.find(p => p.position === position) ?? null
    }

    /**
     * Remove a piece.
     */
    public remove_piece(position: Position): Piece | null {
        let piece = this.get_piece(position)
        this.pieces = this.pieces.filter(p => !(p.position === position))
        return piece
    }

    /**
     * Place a piece at the given position.
     * 
     * Returns with the replaced piece if something is taken.
     */
    public place_piece(position: Position, piece: Piece): Piece | null {
        let piece_replaced = this.remove_piece(position)
        piece.set_position(position)
        this.pieces.push(piece)
        return piece_replaced
    }

    /**
     * Move a piece.
     * 
     * Returns with the replaced piece if something is taken.
     */
    public move_piece(old_position: Position, new_position: Position) {
        let old_piece = this.get_piece(old_position)
        if (!old_piece) throw 'There is no piece to move!'

        let new_piece = this.get_piece(new_position)
        if (new_piece?.team !== old_piece.team) {
            this.remove_piece(old_position)
            this.place_piece(new_position, old_piece)
        } else throw 'You cannot take your own piece!'
    }
}