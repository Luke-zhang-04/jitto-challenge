import {BarGraph} from "./components/bar-graph"
import styles from "./App.module.scss"

export const App: React.FC = () => {
    return (
        <div className={styles.contentContainer}>
            <BarGraph
                data={[5, 10, 15, 20]}
                labels={["label 3", "label 4", "label 2", "label 1"]}
            />
        </div>
    )
}

export default App
