export type PieceType = 'King' | 'Queen' | 'Bishop' | 'Knight' | 'Rook' | 'Pawn'
export type Team = 'White' | 'Black'

export default class Piece {
    public type: PieceType
    public team: Team
    public position: [number, number]

    constructor(type: PieceType, team: Team, position: [number, number]) {
        this.type = type
        this.team = team
        this.position = position
    }
}