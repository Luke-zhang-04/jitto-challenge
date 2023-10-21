import styles from "./index.module.scss"

export interface XAxisLabelsProps {
    xAxisPadding: number
    yAxisPadding: number
    barSpacing: number
    barWidth: number
    canvasWidth: number
    canvasHeight: number
    dataLength: number
    index: number
    label: string
    labelAxisPadding: number
}

export const XAxisLabels: React.FC<XAxisLabelsProps> = ({
    canvasHeight: height,
    canvasWidth: width,
    xAxisPadding,
    yAxisPadding,
    barSpacing,
    barWidth,
    index,
    dataLength,
    label,
    labelAxisPadding,
}) => {
    const shouldRotate = width / dataLength < label.length * 12
    const labelY = height - yAxisPadding + labelAxisPadding + (shouldRotate ? 0 : labelAxisPadding)
    const labelX =
        xAxisPadding +
        barSpacing +
        (shouldRotate ? barWidth / 2 : 0) +
        ((width - xAxisPadding - barSpacing) / dataLength) * index

    return (
        <text
            className={styles.axisLabel}
            textAnchor={shouldRotate ? "end" : "start"}
            x={labelX}
            y={labelY}
            transform={shouldRotate ? `rotate(270, ${labelX}, ${labelY})` : undefined}
        >
            {label}
        </text>
    )
}
