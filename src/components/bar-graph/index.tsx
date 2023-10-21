import styles from "./index.module.scss"

export interface BarGraphProps {
    data: number[]
    labels?: string[]
}

const width = 750
const height = 500
const axisPadding = 50
const topPadding = 50

export const BarGraph: React.FC<BarGraphProps> = ({data}) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const barWidth = (width - axisPadding) / data.length

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <line
                x1={axisPadding}
                y1={0}
                x2={axisPadding}
                y2={width}
                className={styles.axis}
            ></line>
            <line
                x1={0}
                y1={height - axisPadding}
                x2={width}
                y2={height - axisPadding}
                className={styles.axis}
            ></line>
            {data.map((value, index) => {
                const barHeight = (height - axisPadding - topPadding) * (value / max)
                const barX = axisPadding + ((width - axisPadding) / data.length) * index

                return (
                    <rect
                        x={barX}
                        y={height - barHeight - axisPadding}
                        width={barWidth}
                        height={barHeight}
                        className={styles.bar}
                    ></rect>
                )
            })}
        </svg>
    )
}

export default BarGraph
