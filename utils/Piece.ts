import {Col, Position} from './Board'

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
    public position: Position
    public can_castle?: boolean
    public can_be_en_passant?: boolean

    constructor(type: PieceType, team: Team, position: Position, data?: RookData | PawnData) {
        this.type = type
        this.team = team
        this.position = position

        // Add unique properties to required pieces
        if (this.type === 'Rook') this.can_castle = (data as RookData).can_castle
        if (this.type === 'Pawn') this.can_be_en_passant = (data as PawnData).can_be_en_passant
    }

    public set_position(row: number, column: number): void {
        this.position = `${Col[8-column]}${row+1}` as Position
    }
}