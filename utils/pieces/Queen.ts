import Piece, {Team} from '../Piece'

export default class Queen extends Piece {
    constructor(team: Team, i: number) {
        super('Queen', team, i)
    }

    public get_legal_moves(state: Array<Piece | null>, i: number): number[] {
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
    }
}