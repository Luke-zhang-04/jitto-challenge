import {BarGraph} from "./components/bar-graph"
import styles from "./App.module.scss"
import {useState} from "react"

/**
 * Standard Normal variate using Box-Muller transform.
 * https://stackoverflow.com/a/36481059/12370337
 */
const randnBM = (): number => {
    let u = 0
    let v = 0

    while (u === 0) u = Math.random() // Converting [0,1) to (0,1)
    while (v === 0) v = Math.random()

    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
    num = num / 10.0 + 0.5 // Translate to 0 -> 1

    if (num > 1 || num < 0) return randnBM() // resample between 0 and 1

    return num
}

const presetData: {
    [key: string]: () => {
        data: number[]
        labels?: string[]
        title?: string
    }
} = {
    // https://seattlecentral.edu/qelp/sets/057/057.html
    normal: () => ({
        data: [2, 4, 10, 15, 19, 19, 15, 10, 4, 2],
        labels: [
            "36-38",
            "38-40",
            "40-42",
            "42-44",
            "44-46",
            "46-48",
            "48-50",
            "50-52",
            "52-54",
            "54-56",
        ],
        title: "Normally Distributed Housefly Wing Lengths",
    }),
    ece106: () => ({
        data: [3, 0, 0, 0, 0, 0, 2, 2, 4, 14, 18, 31, 35, 30, 29, 32, 23, 17, 12, 4, 0],
        labels: Array(20)
            .fill(undefined)
            .map((_, index) => `${index * 5}%`),
        title: "ECE 106 Spring 2023 Final Exam Score Distribution",
    }),
    rand: () => ({
        data: Array(1_000)
            .fill(undefined)
            .map(() => Math.random() * 1000),
        title: "Random Data",
    }),
    randNormal: () => {
        // Fill with data from 0-1
        const rawData = Array(100_000)
            .fill(undefined)
            .map(() => randnBM())
        const ranges = 1000
        const occurences = Array(ranges).fill(0)

        // Add data for occurences of each range
        for (const data of rawData) {
            occurences[Math.round(data * ranges)]++
        }

        const mean = rawData.reduce((prev, cur) => prev + cur) / rawData.length
        const stdDev = Math.sqrt(
            rawData.map((val) => Math.pow(val - mean, 2)).reduce((prev, cur) => prev + cur) /
                rawData.length,
        )

        const labels = Array(ranges).fill(undefined)

        labels[Math.round(mean * ranges)] = "Mean"
        for (let i = 1; i <= 3; i++) {
            labels[Math.round((mean + stdDev * i) * ranges)] = `${i}σ`
            labels[Math.round((mean - stdDev * i) * ranges)] = `-${i}σ`
        }

        return {
            data: occurences,
            labels,
            title: "Random Normally Distributed Data",
        }
    },
}

export const App: React.FC = () => {
    const [preset, setPreset] = useState("randNormal")
    const [customData, setCustomData] = useState("")
    const [customLabels, setCustomLabels] = useState("")
    const [data, setData] = useState(presetData.randNormal())

    return (
        <>
            <div className={styles.contentContainer}>
                <p>Please ignore how ugly this form is I have to study for midterms</p>
                <form
                    onSubmit={(event) => {
                        event.preventDefault()
                        setData(presetData[preset]())
                    }}
                >
                    <label htmlFor="presets">Preset</label>
                    <select
                        name="presets"
                        id="presets"
                        onChange={(event) => {
                            setPreset(event.target.value)
                        }}
                    >
                        <option value="randNormal">Random Normally Distributed Data</option>
                        <option value="normal">Normal/Gaussian Distribution</option>
                        <option value="ece106">ECE 106 Final Grade Distribution</option>
                        <option value="rand">Random Data</option>
                    </select>
                    <br />
                    <button type="submit">Submit</button>
                </form>
                <form
                    onSubmit={(event) => {
                        event.preventDefault()
                        setData({
                            data: customData.split(",").map((str) => {
                                const num = Number(str)

                                return isNaN(num) ? 0 : num
                            }),
                            labels: customLabels ? customLabels.split(",") : undefined,
                            title: "Custom Data",
                        })
                    }}
                >
                    <label htmlFor="data">Custom Data</label>
                    <input
                        name="data"
                        id="data"
                        placeholder="Comma separated numbers"
                        onChange={(event) => setCustomData(event.target.value)}
                    ></input>
                    <br />
                    <label htmlFor="labels">Optional Labels</label>
                    <input
                        name="labels"
                        id="labels"
                        placeholder="Comma separated labels"
                        onChange={(event) => setCustomLabels(event.target.value)}
                    ></input>
                    <br />
                    <button type="submit">Submit</button>
                </form>
                <BarGraph title={data.title} data={data.data} labels={data.labels} />
            </div>
        </>
    )
}

export default App
