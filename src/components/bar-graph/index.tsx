import React from "react"
import styles from "./index.module.scss"

export interface BarGraphProps {
    data: number[]
    labels?: string[]
}

// There are probably better ways to pick a tick range, but for the purposes of this challenge, this will suffice
const getMaxForYAxis = (num: number): number => {
    if (num < 5) {
        return num
    }

    const rounded = Math.round(num / 10) * 10

    return rounded < num ? rounded + 10 : rounded
}

const width = 750
const height = 500
const xAxisPadding = 50
const yAxisPadding = 100
const topPadding = 20
const labelAxisPadding = 10

export const BarGraph: React.FC<BarGraphProps> = ({data, labels: xLabels}) => {
    const dataMax = Math.max(...data)
    const graphMax = getMaxForYAxis(dataMax)
    const barSpacing = (() => {
        const spacing = (width - xAxisPadding) / (data.length + 1) / data.length

        return spacing < 5 ? 0 : spacing
    })()
    const barWidth = (width - xAxisPadding - barSpacing) / data.length - barSpacing
    const yLabelCount = 10

    // TODO: make labels nice whole numbers
    const yLabels = Array(yLabelCount)
        .fill(undefined)
        .map((_, index) => (graphMax / 10) * (index + 1))

    const yLabelSpacing = (height - yAxisPadding - topPadding) / yLabelCount

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            {yLabels.map((label, index) => {
                const labelY = height - yAxisPadding - yLabelSpacing * (1 + index)

                return (
                    <React.Fragment key={`yLabel-${label}`}>
                        <text
                            className={styles.axisLabel}
                            textAnchor="end"
                            dominantBaseline="middle"
                            x={xAxisPadding - labelAxisPadding}
                            y={labelY}
                        >
                            {label}
                        </text>
                        <line
                            x1={xAxisPadding}
                            y1={labelY}
                            x2={width}
                            y2={labelY}
                            className={styles.gridLine}
                        ></line>
                        <line
                            x1={xAxisPadding}
                            y1={labelY + yLabelSpacing / 2}
                            x2={width}
                            y2={labelY + yLabelSpacing / 2}
                            className={styles.gridLineMinor}
                        ></line>
                    </React.Fragment>
                )
            })}
            {data.map((value, index) => {
                const barHeight = (height - yAxisPadding - topPadding) * (value / graphMax)
                const barX =
                    xAxisPadding +
                    barSpacing +
                    ((width - xAxisPadding - barSpacing) / data.length) * index

                return (
                    <rect
                        key={`bar-${value}-${index}`}
                        x={barX}
                        y={height - barHeight - yAxisPadding}
                        width={barWidth}
                        height={barHeight}
                        className={styles.bar}
                    ></rect>
                )
            })}
            {/* Will always display labels if they are specified, no matter the number of bars. Assumes that the number of labels = length of data. */}
            {xLabels?.map((label, index) => {
                const labelX =
                    xAxisPadding +
                    barSpacing +
                    barWidth / 2 +
                    ((width - xAxisPadding - barSpacing) / data.length) * index
                const labelY = height - yAxisPadding + labelAxisPadding

                return (
                    <text
                        className={styles.axisLabel}
                        textAnchor="end"
                        x={labelX}
                        y={labelY}
                        transform={`rotate(270, ${labelX}, ${labelY})`}
                    >
                        {label}
                    </text>
                )
            }) ?? []}
            <line
                x1={xAxisPadding}
                y1={0}
                x2={xAxisPadding}
                y2={width}
                className={styles.axis}
            ></line>
            <line
                x1={0}
                y1={height - yAxisPadding}
                x2={width}
                y2={height - yAxisPadding}
                className={styles.axis}
            ></line>
        </svg>
    )
}

export default BarGraph
