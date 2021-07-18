import {BoardState, Col, Position} from './Board'
import Piece, {Team} from './Piece'

export interface FENData {
    state: BoardState
    active: Team
    half_move_counter: number
    moves: number
}

/**
 * Check if a rook can castle.
 * 
 * Returns boolean representing its ability to castle.
 */
function can_castle(position: Position, castling: string): boolean {
    if (position === 'a1' && castling.indexOf('Q')) return true
    if (position === 'h1' && castling.indexOf('K')) return true
    if (position === 'a8' && castling.indexOf('q')) return true
    if (position === 'h8' && castling.indexOf('k')) return true
    return false
}

/**
 * Check if a pawn can be en passanted.
 * 
 * Returns boolean representing its ability to be en passanted.
 */
function can_be_en_passant(position: Position, team: Team, en_passanting: string): boolean {
    let position_behind = `${position.split('')[0]}${Number(position.split('')[1]) + team === 'White' ? -1 : 1}`
    return position_behind === en_passanting
}

/**
 * Read a FEN string.
 * 
 * Returns with a BoardState for the given FEN.
 */
export function read_fen(fen: string): FENData {
    let properties = fen.split(' ')
    let cells: Array<string | null>[] = properties[0].split('/').map(row => row.split(''))
    let castling = properties[2]
    let en_passanting = properties[3]

    cells.map((row, x) => row.map((cell, y, a) => {
        if (cell!.match(/[1-8]/)) {
            // Cell represents a number of empty cells
            a.splice(y, 0, ...Array.from(Array(Number(cell)-1).keys(), () => null))
            return null
        } else {
            // Cell represents a piece
            let team: Team = cell!.toUpperCase() === cell ? 'White' : 'Black'
            let position = `${Col[8-y]}${x+1}` as Position

            if (cell!.match(/k/i)) {
                // Cell represents a king
                return new Piece('King', team, position)
            } else if (cell!.match(/q/i)) {
                // Cell represents a queen
                return new Piece('Queen', team, position)
            } else if (cell!.match(/b/i)) {
                // Cell represents a bishop
                return new Piece('Bishop', team, position)
            } else if (cell!.match(/n/i)) {
                // Cell represents a knight
                return new Piece('Knight', team, position)
            } else if (cell!.match(/r/i)) {
                // Cell represents a rook
                return new Piece('Rook', team, position, {
                    can_castle: can_castle(position, castling)
                })
            } else if (cell!.match(/p/i)) {
                // Cell represents a pawn
                return new Piece('Pawn', team, position, {
                    can_be_en_passant: can_be_en_passant(position, team, en_passanting)
                })
            }
        }

        throw 'There was an error reading the FEN'
    }))

    return {
        state: cells as BoardState,
        active: (properties[1] === 'w' ? 'White' : 'Black') as Team,
        half_move_counter: Number(properties[4]),
        moves: Number(properties[5])
    }
}