'use client'

import {LineGraphInterface} from "@/util/interfaces/LineGraphInterface";

export default function LineGraph({dataPoints, label, maxPoints = 100, upperRange = 100}: LineGraphInterface) {
    const data = dataPoints.slice(-maxPoints);

    const width = 300;
    const height = 100;
    const padding = 12;

    const points = data.length > 1
        ? data
            .map((value, i) => {
                const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
                const y = height - padding - (value / upperRange) * (height - 2 * padding);
                return `${x},${y}`;
            })
            .join(' ')
        : data.length === 1
            ? `${width / 2},${height / 2}`
            : "";

    const upperRangeY = padding;
    const lowerRangeY = height - padding;

    const gridLineColor = "#666";
    const textColor = "#444";
    const fontSize = "9";

    return (
        <div className="line-graph" style={{maxWidth: width, width: '100%'}}>
            {label && <h3 style={{marginBottom: 4}}>{label}</h3>}
            <svg
                viewBox={`0 0 ${width} ${height}`}
                width="100%"
                height={height}
                style={{display: "block"}}
            >
                <line
                    x1="0"
                    y1={upperRangeY}
                    x2={width}
                    y2={upperRangeY}
                    stroke={gridLineColor}
                    strokeWidth="1"
                    strokeDasharray="4 2"
                />

                <text
                    x={padding + 3}
                    y={upperRangeY - 3}
                    fill={textColor}
                    fontSize={fontSize}
                    dominantBaseline="auto"
                >
                    {upperRange}
                </text>
                <text
                    x={width - padding - 3}
                    y={upperRangeY - 3}
                    fill={textColor}
                    fontSize={fontSize}
                    dominantBaseline="auto"
                    textAnchor="end"
                >
                    {upperRange}
                </text>

                <line
                    x1="0"
                    y1={lowerRangeY}
                    x2={width}
                    y2={lowerRangeY}
                    stroke={gridLineColor}
                    strokeWidth="1"
                    strokeDasharray="4 2"
                />

                <text
                    x={padding + 3}
                    y={lowerRangeY + 12}
                    fill={textColor}
                    fontSize={fontSize}
                    dominantBaseline="hanging"
                >
                    0
                </text>
                <text
                    x={width - padding - 3}
                    y={lowerRangeY + 12}
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