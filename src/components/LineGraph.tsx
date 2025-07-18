'use client'

import {LineGraphInterface} from "@/util/interfaces/LineGraphInterface";

export default function LineGraph({dataPoints, label, maxPoints = 100, upperRange = 100}: LineGraphInterface) {
    const data = dataPoints.slice(-maxPoints);

    const width = 450;
    const height = 200;
    const padding = 12;

    const graphHeight = height - (2 * padding);
    const graphTopY = padding;
    const graphBottomY = height - padding;

    const points = data.length > 1
        ? data
            .map((value, i) => {
                const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
                const y = graphBottomY - (value / upperRange) * graphHeight;
                return `${x},${y}`;
            })
            .join(' ')
        : data.length === 1
            ? `${width / 2},${height / 2}`
            : "";

    const gridLineColor = "#666";
    const textColor = "#444";
    const fontSize = "11";

    const getGridY = (percentage: number) => {
        const valueAtPercentage = (percentage / 100) * upperRange;
        return graphBottomY - (valueAtPercentage / upperRange) * graphHeight;
    };

    return (
        <div className="line-graph" style={{maxWidth: width, width: '100%'}}>
            {label && <h3 style={{marginBottom: 4}}>{label}</h3>}
            <svg
                viewBox={`0 0 ${width} ${height}`}
                width="100%"
                height={height}
                style={{display: "block"}}
            >
                {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((percentage) => {
                    const lineY = getGridY(percentage);
                    return (
                        <line
                            key={`grid-line-${percentage}`}
                            x1="0"
                            y1={lineY}
                            x2={width}
                            y2={lineY}
                            stroke={gridLineColor}
                            strokeWidth="1"
                            strokeDasharray="4 2"
                        />
                    );
                })}

                <text
                    x={padding + 3}
                    y={getGridY(100) - 3}
                    fill={textColor}
                    fontSize={fontSize}
                    dominantBaseline="auto"
                >
                    {upperRange}
                </text>
                <text
                    x={width - padding - 3}
                    y={getGridY(100) - 3}
                    fill={textColor}
                    fontSize={fontSize}
                    dominantBaseline="auto"
                    textAnchor="end"
                >
                    {upperRange}
                </text>

                <text
                    x={padding + 3}
                    y={getGridY(0) + 12}
                    fill={textColor}
                    fontSize={fontSize}
                    dominantBaseline="hanging"
                >
                    0
                </text>
                <text
                    x={width - padding - 3}
                    y={getGridY(0) + 12}
                    fill={textColor}
                    fontSize={fontSize}
                    dominantBaseline="hanging"
                    textAnchor="end"
                >
                    0
                </text>

                <polyline
                    fill="none"
                    stroke="#000"
                    strokeWidth="2"
                    points={points}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
}