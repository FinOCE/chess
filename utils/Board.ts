import Piece from './Piece'

export default class Board {
    public state: Array<Piece | null>[]

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
    public remove_piece(column: number, row: number): void {
        this.state[column][row] = null
    }

    /**
     * Place a piece at the given position.
     * 
     * Returns with the replaced piece if something is taken.
     */
    public place_piece(column: number, row: number, piece: Piece): Piece | null {
        let piece_replaced = this.state[column][row]
        this.state[column][row] = piece
        return piece_replaced
    }

    /**
     * Get the data from the piece at the given position.
     * 
     * Returns with the piece if it exists.
     */
    public get_piece(column: number, row: number): Piece | null {
        return this.state[column][row]
    }

    /**
     * Move a piece.
     * 
     * Returns with the replaced piece if something is taken.
     */
    public move_piece([oy, ox]: [number, number], [ny, nx]: [number, number]) {
        let old_piece = this.get_piece(oy, ox)

        if (!old_piece) throw 'There is no piece to move!'

        let new_piece = this.get_piece(ny, nx)

        if (new_piece?.team !== old_piece.team) {
            this.remove_piece(oy, ox)
            this.place_piece(ny, nx, old_piece)
        } else throw 'You cannot take your own piece!'
    }
}