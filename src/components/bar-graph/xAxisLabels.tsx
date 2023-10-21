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
    key: string
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
    key,
    label,
    labelAxisPadding,
}) => {
    const labelX =
        xAxisPadding +
        barSpacing +
        barWidth / 2 +
        ((width - xAxisPadding - barSpacing) / dataLength) * index
    const labelY = height - yAxisPadding + labelAxisPadding

    return (
        <text
            key={key}
            className={styles.axisLabel}
            textAnchor="end"
            x={labelX}
            y={labelY}
            transform={`rotate(270, ${labelX}, ${labelY})`}
        >
            {label}
        </text>
    )
}
