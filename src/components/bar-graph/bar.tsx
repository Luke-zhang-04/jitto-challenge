import styles from "./index.module.scss"

export interface BarProps {
    canvasHeight: number
    canvasWidth: number
    yAxisPadding: number
    xAxisPadding: number
    barTopPadding: number
    barValue: number
    maxValue: number
    barSpacing: number
    barWidth: number
    dataLength: number
    index: number
    key: string
}

export const Bar: React.FC<BarProps> = ({
    canvasHeight: height,
    canvasWidth: width,
    yAxisPadding,
    xAxisPadding,
    barTopPadding: topPadding,
    barValue: value,
    maxValue: max,
    barSpacing,
    barWidth,
    dataLength,
    index,
    key,
}) => {
    const barHeight = (height - yAxisPadding - topPadding) * (value / max)
    const barX =
        xAxisPadding + barSpacing + ((width - xAxisPadding - barSpacing) / dataLength) * index

    return (
        <rect
            key={key}
            x={barX}
            y={height - barHeight - yAxisPadding}
            width={barWidth}
            height={barHeight}
            className={styles.bar}
        ></rect>
    )
}
