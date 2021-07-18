import Piece from './Piece'

export type BoardState = Array<Piece | null>[]

export default class Board {
    public state: BoardState

    constructor() {
        this.state = []
        this.create()
    }

    /**
     * Remove all pieces from the board.
     */
    public clear_board(): void {
        this.state = Array.from(Array(8), () => Array(8))
    }

    /**
     * Set the board for a new game.
     */
    public create(): void {}

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