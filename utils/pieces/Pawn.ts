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
        let moves = (
            this.has_moved
                ? this.team === 'White' ? [-8] : [8]
                : this.team === 'White' ? [-8, -16] : [8, 16]
        )
            .map(move => i + move)
        let legal = moves.filter(i => (i >= 0 && i < 64 && this.is_legal(state, i)))
        
        return 1 in legal
            ? legal
            : 0 in legal
                ? legal[0] === moves[0]
                    ? [moves[0]]
                    : []
                : []
    }

    public can_capture(state: Array<Piece | null>, i: number, target: number): boolean {
        return (this.team === 'White' ? [-7, -9] : [7, 9])
            .map(move => i + move)
            .filter(i => (i >= 0 && i < 64 && this.is_legal(state, i)))
            .indexOf(target) === -1
    }
}