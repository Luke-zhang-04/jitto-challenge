import React from "react"
import styles from "./index.module.scss"

export interface YAxisLabelsProps {
    canvasHeight: number
    canvasWidth: number
    yAxisPadding: number
    xAxisPadding: number
    yLabelSpacing: number
    index: number
    label: number
    labelAxisPadding: number
    key: string
}

export const YAxisLabels: React.FC<YAxisLabelsProps> = ({
    canvasHeight: height,
    canvasWidth: width,
    yAxisPadding,
    xAxisPadding,
    yLabelSpacing,
    index,
    labelAxisPadding,
    label,
    key,
}) => {
    const labelY = height - yAxisPadding - yLabelSpacing * (1 + index)

    return (
        <React.Fragment key={key}>
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
}

export default YAxisLabels
