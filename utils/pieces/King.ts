import Piece, {Team} from '../Piece'

export default class King extends Piece {
    constructor(team: Team, i: number) {
        super('King', team, i)
    }

    public get_legal_moves(state: Array<Piece | null>, i: number): number[] {
        return [-9, -8, -7, -1, 1, 7, 8, 9]
            .filter(m => this.is_within_bounds(i+m) && !this.goes_over_edge(i, i+m, 0) && this.is_legal(state, i+m))
            .map(move => i + move)
    }
}