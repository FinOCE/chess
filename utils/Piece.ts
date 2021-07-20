export type PieceType = 'King' | 'Queen' | 'Bishop' | 'Knight' | 'Rook' | 'Pawn'
export type Team = 'White' | 'Black'

export interface RookData {
    can_castle: boolean
}

export interface PawnData {
    can_be_en_passant: boolean
}

export default class Piece {
    public type: PieceType
    public team: Team
    public can_castle?: boolean
    public can_be_en_passant?: boolean
    public has_moved?: boolean

    constructor(type: PieceType, team: Team, i: number, data?: RookData | PawnData) {
        this.type = type
        this.team = team

        // Add unique properties to required pieces
        if (this.type === 'Rook') this.can_castle = (data as RookData).can_castle
        if (this.type === 'Pawn') {
            this.can_be_en_passant = (data as PawnData).can_be_en_passant
            this.has_moved = this.team === 'White'
                ? Math.floor(i / 8) !== 6
                : Math.floor(i / 8) !== 1
        }
    }

    public get_legal_moves(state: Array<Piece | null>, i: number): number[] {
        switch (this.type) {
            case 'King':
                return [-9, -8, -7, -1, 1, 7, 8, 9]
                    .map(move => i + move)
                    .filter(i => i >= 0 && i < 64 && this.is_empty(state, i))
            case 'Queen':
                return [
                    ...this.get_all_moves(state, i, -9),
                    ...this.get_all_moves(state, i, -8),
                    ...this.get_all_moves(state, i, -7),
                    ...this.get_all_moves(state, i, -1),
                    ...this.get_all_moves(state, i, 1),
                    ...this.get_all_moves(state, i, 7),
                    ...this.get_all_moves(state, i, 8),
                    ...this.get_all_moves(state, i, 9)
                ].map(move => i + move)
            case 'Bishop':
                return [
                    ...this.get_all_moves(state, i, -9),
                    ...this.get_all_moves(state, i, -7),
                    ...this.get_all_moves(state, i, 7),
                    ...this.get_all_moves(state, i, 9)
                ].map(move => i + move)
            case 'Knight':
                return [-17, -15, -10, -6, 6, 10, 15, 17]
                    .map(move => i + move)
                    .filter(i => (i >= 0 && i < 64 && this.is_empty(state, i)))
            case 'Rook':
                return [
                    ...this.get_all_moves(state, i, -8),
                    ...this.get_all_moves(state, i, -1),
                    ...this.get_all_moves(state, i, 1),
                    ...this.get_all_moves(state, i, 8)
                ].map(move => i + move)
            case 'Pawn':
                return (
                    this.has_moved
                        ? this.team === 'White' ? [-8] : [8]
                        : this.team === 'White' ? [-16, -8] : [8, 16]
                )
                    .map(move => i + move)
                    .filter(i => (i >= 0 && i < 64 && this.is_empty(state, i)))
            default:
                throw 'Attempted to check legal moves of unknown piece!'
        }
    }

    private is_empty(state: Array<Piece | null>, i: number) {
        return state[i] === null
    }

    private get_all_moves(state: Array<Piece | null>, i: number, m: number) {
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