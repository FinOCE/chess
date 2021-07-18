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
export type BoardState = Array<Piece | null>[]

export default class Board {
    public state: BoardState
    public active: Team
    public half_moves_counter: number
    public moves: number

    constructor() {
        this.state = []
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
        this.state = data.state
        this.active = data.active
        this.half_moves_counter = data.half_move_counter
        this.moves = data.moves
    }

    /**
     * Remove all pieces from the board.
     */
    public clear_board(): void {
        this.state = Array.from(Array(8), () => Array(8))
    }

    /**
     * Remove a piece.
     */
    public remove_piece(row: number, column: number): void {
        this.state[row][column] = null
    }

    /**
     * Place a piece at the given position.
     * 
     * Returns with the replaced piece if something is taken.
     */
    public place_piece(row: number, column: number, piece: Piece): Piece | null {
        let piece_replaced = this.state[row][column]
        piece.set_position(row, column)
        this.state[row][column] = piece
        return piece_replaced
    }

    /**
     * Get the data from the piece at the given position.
     * 
     * Returns with the piece if it exists.
     */
    public get_piece(row: number, column: number): Piece | null {
        return this.state[row][column]
    }

    /**
     * Move a piece.
     * 
     * Returns with the replaced piece if something is taken.
     */
    public move_piece([ox, oy]: [number, number], [nx, ny]: [number, number]) {
        let old_piece = this.get_piece(ox, oy)

        if (!old_piece) throw 'There is no piece to move!'

        let new_piece = this.get_piece(nx, ny)

        if (new_piece?.team !== old_piece.team) {
            this.remove_piece(ox, oy)
            this.place_piece(nx, ny, old_piece)
        } else throw 'You cannot take your own piece!'
    }
}