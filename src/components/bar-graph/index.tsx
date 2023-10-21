import styles from "./index.module.scss"

export interface BarGraphProps {
    data: number[]
    labels?: string[]
}

const width = 750
const height = 500
const axisPadding = 50
const topPadding = 20
const labelAxisPadding = 10

export const BarGraph: React.FC<BarGraphProps> = ({data}) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const barSpacing = (() => {
        const spacing = (width - axisPadding) / (data.length + 1) / data.length

        return spacing < 5 ? 0 : spacing
    })()
    const barWidth = (width - axisPadding - barSpacing) / data.length - barSpacing
    const yLabelCount = Math.min(Math.max(5, max / 10), 10)

    // TODO: make labels nice whole numbers
    const yLabels = Array(yLabelCount)
        .fill(undefined)
        .map((_, index) => (max / 10) * (index + 1))

    const yLabelSpacing = (height - axisPadding - topPadding) / yLabelCount

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            {yLabels.map((label, index) => {
                const labelY = height - axisPadding - yLabelSpacing * (1 + index)

                return (
                    <>
                        <text
                            className={styles.axisLabel}
                            textAnchor="end"
                            dominantBaseline="middle"
                            x={axisPadding - labelAxisPadding}
                            y={labelY}
                        >
                            {label}
                        </text>
                        <line
                            x1={axisPadding}
                            y1={labelY}
                            x2={width}
                            y2={labelY}
                            className={styles.gridLine}
                        ></line>
                        <line
                            x1={axisPadding}
                            y1={labelY + yLabelSpacing / 2}
                            x2={width}
                            y2={labelY + yLabelSpacing / 2}
                            className={styles.gridLineMinor}
                        ></line>
                    </>
                )
            })}
            {data.map((value, index) => {
                const barHeight = (height - axisPadding - topPadding) * (value / max)
                const barX =
                    axisPadding +
                    barSpacing +
                    ((width - axisPadding - barSpacing) / data.length) * index

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
        </svg>
    )
}

export default BarGraph
