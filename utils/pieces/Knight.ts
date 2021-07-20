import Piece, {Team} from '../Piece'

export default class Knight extends Piece {
    constructor(team: Team, i: number) {
        super('Knight', team, i)
    }

    public get_legal_moves(state: Array<Piece | null>, i: number): number[] {
        return [-17, -15, -10, -6, 6, 10, 15, 17]
            .map(move => i + move)
            .filter(i => (i >= 0 && i < 64 && this.is_legal(state, i)))
    }
}