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

    public is_empty(state: Array<Piece | null>, i: number) {
        return state[i] === null
    }

    public get_all_moves(state: Array<Piece | null>, i: number, m: number) {
        let ii = i + m
        let mm = m
        let moves = []

        while (ii >= 0 && ii < 64 && this.is_empty(state, ii)) {
            moves.push(mm)
            ii += m
            mm += m
        }

        return moves
    }
}