import Piece, {Team} from '../Piece'

export interface PawnData {
    can_be_en_passant: boolean
}

export default class Pawn extends Piece {
    public can_be_en_passant: boolean
    public has_moved: boolean

    constructor(team: Team, i: number, data: PawnData) {
        super('Pawn', team, i)

        this.can_be_en_passant = data.can_be_en_passant
        this.has_moved = this.team === 'White'
            ? Math.floor(i / 8) !== 6
            : Math.floor(i / 8) !== 1
    }

    public get_legal_moves(state: Array<Piece | null>, i: number): number[] {
        return (
            this.has_moved
                ? this.team === 'White' ? [-8] : [8]
                : this.team === 'White' ? [-16, -8] : [8, 16]
        )
            .map(move => i + move)
            .filter(i => (i >= 0 && i < 64 && this.is_empty(state, i)))
    }
}