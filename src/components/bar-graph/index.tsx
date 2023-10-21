import React from "react"
import styles from "./index.module.scss"
import {Bar} from "./bar"
import YAxisLabels from "./yAxisLabels"
import {XAxisLabels} from "./xAxisLabels"

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
    const yLabels = Array(yLabelCount)
        .fill(undefined)
        .map((_, index) => (graphMax / 10) * (index + 1))
    const yLabelSpacing = (height - yAxisPadding - topPadding) / yLabelCount

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            {yLabels.map((label, index) => (
                <YAxisLabels
                    canvasHeight={height}
                    canvasWidth={width}
                    key={`yLabel-${label}`}
                    {...{
                        xAxisPadding,
                        yAxisPadding,
                        yLabelSpacing,
                        label,
                        index,
                        labelAxisPadding,
                    }}
                />
            ))}
            {data.map((value, index) => (
                <Bar
                    canvasHeight={height}
                    canvasWidth={width}
                    key={`bar-${value}-${index}`}
                    barTopPadding={topPadding}
                    barValue={value}
                    maxValue={graphMax}
                    dataLength={data.length}
                    {...{yAxisPadding, xAxisPadding, barSpacing, barWidth, index}}
                />
            ))}
            {/* Will always display labels if they are specified, no matter the number of bars. Assumes that the number of labels = length of data. */}
            {xLabels?.map((label, index) => (
                <XAxisLabels
                    key={`xLabel-${label}-${index}`}
                    canvasHeight={height}
                    canvasWidth={width}
                    dataLength={data.length}
                    {...{
                        barSpacing,
                        barWidth,
                        yAxisPadding,
                        xAxisPadding,
                        yLabelSpacing,
                        index,
                        labelAxisPadding,
                        label,
                    }}
                />
            ))}
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
