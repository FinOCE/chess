import Piece, {Team} from '../Piece'

export interface RookData {
    can_castle: boolean
}

export default class Rook extends Piece {
    public can_castle?: boolean

    constructor(team: Team, i: number, data: RookData) {
        super('Rook', team, i)

        this.can_castle = data.can_castle
    }

    public get_legal_moves(state: Array<Piece | null>, i: number): number[] {
        return [
            ...this.get_all_moves(state, i, -8),
            ...this.get_all_moves(state, i, -1),
            ...this.get_all_moves(state, i, 1),
            ...this.get_all_moves(state, i, 8)
        ].map(move => i + move)
    }
}