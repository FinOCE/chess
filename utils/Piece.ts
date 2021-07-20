import {RookData} from './pieces/Rook'
import {PawnData} from './pieces/Pawn'

export type PieceType = 'King' | 'Queen' | 'Bishop' | 'Knight' | 'Rook' | 'Pawn'
export type Team = 'White' | 'Black'

export default abstract class Piece {
    public type: PieceType
    public team: Team

    constructor(type: PieceType, team: Team, i: number, data?: RookData | PawnData) {
        this.type = type
        this.team = team
    }

    public abstract get_legal_moves(state: Array<Piece | null>, i: number): number[]

    public is_legal(state: Array<Piece | null>, i: number): boolean {
        // Prevent taking own pieces
        if (state[i]?.team === this.team) return false

        return true
    }

    public is_within_bounds(ii: number) {
        return ii >= 0 && ii < 64
    }

    public goes_over_edge(i: number, ii: number, mm: number): boolean {
        return [((i+mm) % 8)-2, ((i+mm) % 8)-1, ((i+mm) % 8), ((i+mm) % 8)+1, ((i+mm) % 8)+2].indexOf((ii % 8)) === -1
    }

    public get_all_moves(state: Array<Piece | null>, i: number, m: number) {
        let ii = i + m
        let mm = 0
        let moves = []
        let search = true

        while (this.is_within_bounds(ii) && !this.goes_over_edge(i, ii, mm) && this.is_legal(state, ii) && search) {
            if (state[ii]?.type) search = false
            ii += m
            mm += m
            moves.push(mm)
        }

        return moves
    }

    public can_capture(state: Array<Piece | null>, i: number, target: number): boolean {
        return this.get_legal_moves(state, i).indexOf(target) === -1
    }
}