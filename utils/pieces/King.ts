import Piece, {Team} from '../Piece'

export default class King extends Piece {
    constructor(team: Team, i: number) {
        super('King', team, i)
    }

    public get_legal_moves(state: Array<Piece | null>, i: number): number[] {
        return [-9, -8, -7, -1, 1, 7, 8, 9]
            .map(move => i + move)
            .filter(i => i >= 0 && i < 64 && this.is_empty(state, i))
    }
}