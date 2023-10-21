import {BarGraph} from "./components/bar-graph"
import styles from "./App.module.scss"

const data = [5, 10, 15, 20, 3, 40, 50, 2, 3, 5, 105, 2, 3, 4, 5, 6, 7, 8, 10]

export const App: React.FC = () => {
    return (
        <div className={styles.contentContainer}>
            <BarGraph data={data} labels={data.map((_, index) => `Label ${index}`)} />
        </div>
    )
}

export default App
