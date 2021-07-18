import Board from '../utils/Board'

export default function Page() {
    let board = new Board()

    return (
        <pre><code>{JSON.stringify(board, null, 4)}</code></pre>
    )
}