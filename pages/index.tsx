import Board from '../components/board'
import styles from '../styles/index.module.sass'

export default function index() {
    return (
        <div id={styles.index}>
            <Board />
        </div>
    )
}