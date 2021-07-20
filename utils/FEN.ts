import {indexToPosition} from './Board'
import Piece, {Team} from './Piece'

export interface FENData {
    state: Array<Piece | null>
    active: Team
    half_move_counter: number
    moves: number
}

/**
 * Check if a rook can castle.
 * 
 * Returns boolean representing its ability to castle.
 */
function can_castle(i: number, castling: string): boolean {
    if (i === 56 && castling.indexOf('Q')) return true
    if (i === 63 && castling.indexOf('K')) return true
    if (i === 0 && castling.indexOf('q')) return true
    if (i === 7 && castling.indexOf('k')) return true
    return false
}

/**
 * Check if a pawn can be en passanted.
 * 
 * Returns boolean representing its ability to be en passanted.
 */
function can_be_en_passant(i: number, team: Team, en_passanting: string): boolean {
    return indexToPosition(i + team === 'White' ? -8 : 8) === en_passanting
}

/**
 * Creates a Piece class for the given cell.
 * 
 * Returns with the Piece.
 */
function create_piece(cell: string | null, i: number, castling: string, en_passanting: string): Piece | null {
    if (cell && !cell.match(/[1-8]/)) {
        // Cell represents a piece
        let team: Team = cell!.toUpperCase() === cell ? 'White' : 'Black'

        if (cell!.match(/k/i)) {
            // Cell represents a king
            return new Piece('King', team)
        } else if (cell!.match(/q/i)) {
            // Cell represents a queen
            return new Piece('Queen', team)
        } else if (cell!.match(/b/i)) {
            // Cell represents a bishop
            return new Piece('Bishop', team)
        } else if (cell!.match(/n/i)) {
            // Cell represents a knight
            return new Piece('Knight', team)
        } else if (cell!.match(/r/i)) {
            // Cell represents a rook
            return new Piece('Rook', team, {
                can_castle: can_castle(i, castling)
            })
        } else if (cell!.match(/p/i)) {
            // Cell represents a pawn
            return new Piece('Pawn', team, {
                can_be_en_passant: can_be_en_passant(i, team, en_passanting)
            })
        } else throw 'Unknown piece!'
    } else return null
}

/**
 * Read a FEN string.
 * 
 * Returns with a BoardState for the given FEN.
 */
export function read_fen(fen: string): FENData {
    // Get raw data from FEN
    let properties = fen.split(' ')
    let state: Array<string | null> = properties[0].replace(/\//g, '').split('')
    let castling = properties[2]
    let en_passanting = properties[3]

    // Replace numbers with nulls
    for (let i = 0; i < state.length; i++) {
        let val = state[i]
        if (val && val.match(/[1-8]/)) {
            state.splice(i, 1, ...Array.from(Array(Number(val)).keys(), () => null))
        }
    }

    // Return with data
    return {
        state: state.map((cell, i) => create_piece(cell, i, castling, en_passanting)),
        active: (properties[1] === 'w' ? 'White' : 'Black') as Team,
        half_move_counter: Number(properties[4]),
        moves: Number(properties[5])
    }
}